// Create handle to sms collection in database.
var SMS = new Mongo.Collection('sms');

// Configure the Twilio client
var twilioClient = new Twilio({
  from: Meteor.settings.TWILIO.FROM,
  sid: Meteor.settings.TWILIO.SID,
  token: Meteor.settings.TWILIO.TOKEN
});

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