import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import style from './style.css';

export default class Task extends Component {
    getDate() {
        return moment(this.props.created).format("HH:MM:SS (DD MMM)");
    }
    render() {
        return (
            <li className = {style.container}>
                <input type = "checkbox"
                    checked = {this.props.checked}
                    onChange = {(e) => this.props.onChange(this.props.id, e.target.checked)}/>
                <span className = {style.text}>{this.props.task.text}</span>
                <span className = {style.date}>{this.getDate()}</span>
                <button onClick = {() => this.props.onRemove(this.props.id)}>X</button>
            </li>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
};
