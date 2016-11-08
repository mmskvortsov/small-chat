import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

const Tasks = new Mongo.Collection('tasks');

export default Tasks;

if (Meteor.isServer) {
    Meteor.publish('tasks', () => Tasks.find());
}

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        Tasks.insert({
            text,
            checked: false,
            created: new Date()
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        Tasks.remove(taskId);
    },
    'tasks.setChecked'(taskId, checked) {
        check(taskId, String);
        check(checked, Boolean);

        Tasks.update(taskId, { $set: { checked } });
    },
});
