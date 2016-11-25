import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Messages } from '../../api';
import Message from '../Message';

import styles from './style.css';

class App extends Component {

    constructor() {
        super();
        this._scrollDown = this._scrollDown.bind(this);
    }

    startChat() {
        return Session.set("user", this.refs.userName.value.trim());
    }

    onFormSubmit(event) {
        if (event) event.preventDefault();
        let input = ReactDOM.findDOMNode(this.refs.newMessage);
        if (!(input.value.trim().length)) return;

        Meteor.call('messages.insert', input.value.trim(), this.props.user);

        input.value = "";
    }

    renderLoader() {
        return (
            <div className = {styles.loader}></div>
        );
    }

    renderIntroduce() {
        return (
            <div className = {styles.introduce}>
                <div>What is your name?</div>
                <input type = "text"
                    maxLength = {10}
                    ref = "userName"
                    onKeyUp = {this._applyUserName.bind(this)}/>
                <button onClick = {this.startChat.bind(this)}>Enter chat!</button>
            </div>
        );
    }

    renderMessage() {
        return (
            <div className = {styles.message}>
                We don't have messages :(
            </div>
        );
    }

    renderMessages() {
        return this.props.messages.map((message) => (
            <Message key = {message._id}
                my = {message.user == this.props.user}
                user = {message.user}
                created = {message.created}
                text = {message.text}/>
        ));
    }

    renderContent() {
        if (!this.props.ready) return this.renderLoader();
        if (this.props.messages.length) return this.renderMessages();
        if (!this.props.messages.length) return this.renderMessage();
    }

    render() {
        if (!this.props.user) return this.renderIntroduce();
        return (
            <div className = {styles.container}>
                <header>
                    <h3>Messages</h3>
                </header>

                <ul ref = "list">
                    {this.renderContent()}
                </ul>

                <form onSubmit = {this.onFormSubmit.bind(this)} ref = "form" autoComplete = "off">
                    <textarea name = "todo"
                        autoFocus = {true}
                        placeholder = "Write a message..."
                        type = "text"
                        ref = "newMessage"
                        onKeyDown = {this._checkEnter.bind(this)}
                        onFocus = {this._scrollDown}
                        autoComplete = "off"/>
                    <input type = "submit" value = "send"/>
                </form>
            </div>
        );
    }

    componentDidUpdate() {
        this._scrollDown();
    }

    _checkEnter(event) {
        if (event.keyCode == 13) {
            if (this.refs.newMessage.value.length) this.onFormSubmit();
            event.preventDefault();
        }
    }

    _applyUserName(event) {
        if (event.keyCode == 13) this.startChat();
    }

    _scrollDown() {
        if (!this.refs.list) return;
        let element = this.refs.list;
        element.scrollTop = element.scrollHeight;
    }

}

App.propTypes = {
    ready: PropTypes.bool,
    messages: PropTypes.array.isRequired
};

export default createContainer(() => {
    let subscribe = Meteor.subscribe('messages');
    return {
        user: Session.get("user"),
        ready: subscribe.ready(),
        messages: Messages.find({}, {
            sort: {
                created: 1
            }
        }).fetch()
    };
}, App);
