import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import PropTypes from 'prop-types';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl 
                label={control.label} 
                key={control.type}
                added={() => props.ingredientAdded(control.type)}
                substracted={() => props.ingredientSubstracted(control.type)}
                disable={props.disable[control.type]}/>
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
);

buildControls.propTypes = {
    price: PropTypes.number,
    ingredientAdded: PropTypes.func,
    ingredientSubstracted: PropTypes.func,
    disable: PropTypes.object,
    purchasable: PropTypes.bool,
    ordered: PropTypes.func
}

export default buildControls;