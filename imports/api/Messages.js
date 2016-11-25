import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

const Messages = new Mongo.Collection('messages');

export default Messages;

if (Meteor.isServer) {
    Meteor.publish('messages', () => Messages.find());
}

Meteor.methods({
    'messages.insert'(text, user) {
        check(text, String);

        Messages.insert({
            text,
            user,
            created: new Date()
        });
    },
    'messages.remove'(messageId) {
        check(messageId, String);

        Messages.remove(messageId);
    }
});
