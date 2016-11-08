import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../../api';
import Task from '../Task';

import styles from './style.css';

class App extends Component {

    onFormSubmit(event) {
        event.preventDefault();
        let input = ReactDOM.findDOMNode(this.refs.newTodo);
        if (!(input.value.trim().length)) return;

        Meteor.call('tasks.insert', input.value.trim());
        document.activeElement.blur();

        input.value = "";
    }

    removeTask(_id) {
        Meteor.call('tasks.remove', _id);
    }

    checkTask(_id, value) {
        Meteor.call('tasks.setChecked', _id, value);
    }

    renderLoader() {
        return (
            <div className = {styles.loader}></div>
        );
    }

    renderMessage() {
        return (
            <div className = {styles.message}>
                We don't have tasks :(
            </div>
        );
    }

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key = {task._id}
                checked = {task.checked}
                onChange = {this.checkTask.bind(this)}
                onRemove = {this.removeTask.bind(this)}
                id = {task._id}
                task = {task}/>
        ));
    }

    renderContent() {
        if (!this.props.ready) return this.renderLoader();
        if (this.props.tasks.length) return this.renderTasks();
        if (!this.props.tasks.length) return this.renderMessage();
    }

    render() {
        return (
            <div className = {styles.container}>
                <header>
                    <h1>Todo-todo {this.props.ready ? `(${this.props.tasks.length})` : null}</h1>
                </header>

                <ul>
                    {this.renderContent()}
                </ul>

                <form onSubmit = {this.onFormSubmit.bind(this)} autoComplete = "off">
                    <input name = "todo"
                        placeholder = "New todo..."
                        type = "text"
                        ref = "newTodo"
                        autoComplete = "off"/>
                    <input type = "submit" value = "+"/>
                </form>
            </div>
        );
    }

}

App.propTypes = {
    ready: PropTypes.bool,
    tasks: PropTypes.array.isRequired
};

export default createContainer(() => {
    let subscribe = Meteor.subscribe('tasks');
    return {
        ready: subscribe.ready(),
        tasks: Tasks.find({}).fetch()
    };
}, App);
