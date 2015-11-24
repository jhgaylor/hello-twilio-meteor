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
    try {
      var result = twilioClient.sendMessage({
        to: opts.to,
        body: opts.message
      });
    } catch (err) {
      throw new Meteor.error(err);
    }
    return result;
  }
});