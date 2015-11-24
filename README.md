Say Hello Using Twilio & Meteor

Getting Started:

1) Install Meteor
2) Get Twilio Account info

```sh
git clone https://github.com/jhgaylor/hello-twilio-meteor.git
cd hello-twilio-meteor
meteor
```

To Run with Twilio

```sh
TWILIO_SID=<YOUR_SID> TWILIO_AUTH_TOKEN=<YOUR_AUTH_TOKEN> TWILIO_NUMBER=<YOUR_TWILIO_NUMBER meteor
```

To Run without Twilio

```sh
meteor
```

To Run with a different database

```sh
MONGO_URL=mongodb://remoteDBServer:27017/foo_db meteor
```
