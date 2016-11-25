import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import style from './style.css';

export default class Message extends Component {
    getDate() {
        return moment(this.props.created).format("HH:MM");
    }
    render() {
        let containerClassName = style.container;
        if (this.props.my) containerClassName += ` ${style.my}`;
        return (
            <li className = {containerClassName}>
                <div className = {style.info}>
                    <span className = {style.user}>{this.props.user}</span>
                    <span className = {style.date}>{this.getDate()}</span>
                </div>
                <div className = {style.text}>{this.props.text}</div>
            </li>
        );
    }
}

Message.propTypes = {
    user: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};
