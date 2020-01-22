import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let element = null;
    const inputClasses = [classes.InputElement];
    if(props.touched && props.invalid && props.shouldValidate) {
        inputClasses.push(classes.Invalid);
    }
    switch(props.elementType) {
        case('input'):
            element = <input 
                {...props.elementConfig} 
                value={props.value} 
                className={inputClasses.join(' ')}
                onChange={props.changed}/>
            break;
        case('txtarea'):
            element = <textarea 
                {...props.elementConfig} 
                value={props.value} 
                className={inputClasses.join(' ')}
                onChange={props.changed}/>
            break;
        case('select'):
            element = (
                <select  
                    value={props.value} 
                    className={inputClasses.join(' ')}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option 
                                value={option.value}
                                key={option.value}>{option.displayValue}</option>
                        ))}
                </select>
            );
            break;
        default:
            element = <input 
                {...props.elementConfig} 
                value={props.value} 
                className={inputClasses.join(' ')}
                onChange={props.changed}/>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {element}
        </div>
    )
};

export default Input;