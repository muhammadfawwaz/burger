import React from 'react';
import classes from '../Burger/Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {
    console.log(props)
    let transIngredients = Object.keys(props.ingredients)
    .map(ikey => {
        // console.log('ikey: ', ikey)
        return [...Array(props.ingredients[ikey])].map((_, index) => {
            // console.log('index: ', index)
            return <BurgerIngredient key={ikey+index} type={ikey} />
        })
    }).reduce((prevVal, nextVal) => {
        return prevVal.concat(nextVal)
    }, [])

    if(transIngredients.length === 0) {
        transIngredients = <p>Please add your ingridient</p>
    }

    // console.log(transIngredients)
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
};

export default burger;