import React, { Component, PropTypes } from 'react';

import style from './style.css';

export default class Task extends Component {
    render() {
        return (
            <li className = {style.container}>
                <input type = "checkbox"
                    checked = {this.props.checked}
                    onChange = {(e) => this.props.onChange(this.props.id, e.target.checked)}/>
                <span>{this.props.task.text}</span>
                <button onClick = {() => this.props.onRemove(this.props.id)}>X</button>
            </li>
        );
    }
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
};
