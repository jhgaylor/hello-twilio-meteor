// Create handle to sms collection in database.
SMS = new Mongo.Collection('sms');

// Configure the Twilio client
var twilioClient = new Twilio({
  from: Meteor.settings.TWILIO.FROM,
  sid: Meteor.settings.TWILIO.SID,
  token: Meteor.settings.TWILIO.TOKEN
});
var getTwilioMessages = Meteor.wrapAsync(twilioClient.client.messages.list, twilioClient.client.messages);

Meteor.methods({
  'sendSMS': function (opts) {
    console.log("Attempting to send message with options", opts);
    try {
      var result = twilioClient.sendSMS({
        to: opts.to,
        body: opts.message
      });
    } catch (err) {
      throw new Meteor.error(err);      
    }
    result.type = "outgoing";
    var smsId = SMS.insert(result);
    result._id = smsId;
    console.log("New message sent:", result);
    return result;
  }
});

function updateMessages () {
  getTwilioMessages(function (err, data) {
    if (err) {
      console.warn("There was an error getting data from twilio", err);
      return
    }
    data.messages.forEach(function (message) {
      if (SMS.find({sid: message.sid}).count() > 0) {
        return;
      }
      if (message.from === Meteor.settings.TWILIO.FROM) {
        message.type = "outgoing";
      } else {
        message.type = "incoming";
      }
      SMS.insert(message);
    });
  });
}

updateMessages();
Meteor.setInterval(updateMessages, 60000);
