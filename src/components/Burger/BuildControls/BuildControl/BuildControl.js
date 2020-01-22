import React from 'react';
import classes from './BuildControl.module.css';
import PropTypes, { bool } from 'prop-types';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{ props.label }</div>
        <button 
            className={classes.Less}
            onClick={props.substracted}
            disabled={props.disable}>Less</button>
        <button 
            className={classes.More}
            onClick={props.added}>More</button>
    </div>
)

buildControl.propTypes = {
    label: PropTypes.string,
    substracted: PropTypes.func,
    disable: bool,
    added: PropTypes.func
} 

export default buildControl;