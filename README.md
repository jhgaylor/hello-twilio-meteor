Say Hello Using Twilio & Meteor

Getting Started:

1) Install Meteor
2) Get Twilio Account info
3) make settings.json look like this

```json
{
  "TWILIO": {
    "FROM": "TWILIO NUMBER",
    "SID": "SID",
    "TOKEN": "AUTH TOKEN"
  }
}
```

```sh
git clone https://github.com/jhgaylor/hello-twilio-meteor.git
cd hello-twilio-meteor
meteor
```

To Run with Twilio

```sh
meteor --settings=settings.json
```

To Run without Twilio

```sh
meteor
```

To Run with a different database

```sh
MONGO_URL=mongodb://remoteDBServer:27017/foo_db meteor
```
