SMS = new Mongo.Collection('sms');
Template.sendSMS.helpers({
});

Template.sendSMS.events({
  'click button': function (event, template) {
    // build the options POJO expected by the call to sendSMS.
    var smsOptions =  {
      to: template.$('.to').val(),
      message: template.$('.message').val()
    };
    // make a call to the server method named `sendSMS` and register a
    // callback to fire when the server has finished its task.
    Meteor.call('sendSMS', smsOptions, function (err, result) {
      // handle any errors returned by the server by informing the user of
      // the error and logging out any information that may be helpful in 
      // diagnosing the issue and then returning. the return in the if block
      // prevents the need for an else block to protect to following code.
      if (err) {
        alert("There was an error sending the message. See the console for more info");
        console.warn("There was an error sending the message.", smsOptions, err);
        return;
      }
      // inform the user that the message was sent correctly.
      alert("Message sent successfully. See the console for more info.");
      // log out the db object that was created.
      console.log("Message sent. Result: ", result);
    });
  }
});

Template.smsLog.helpers({
  sms: function () {
    return SMS.find({}, {sort: {dateCreated: -1}});
  },
  isOutgoing: function () {
    return this.type === "outgoing"
  }
});