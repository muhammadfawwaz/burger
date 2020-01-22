import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';
import * as actionTypes from '../../store/action';
const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json').then(response => {
        //     this.setState({
        //         ingredients: response.data
        //     })
        // }).catch(error => {
        //     this.setState({
        //         error: true
        //     })
        // })
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        console.log(queryString)
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    modalClosedHandler = () => {
        this.setState({ purchasing: false })
    }

    updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ikey => {
                return ingredients[ikey];
            })
            .reduce((prevVal, currentVal) => {
                return prevVal + currentVal;
            }, 0)
        // console.log('sum: ', sum)
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = updateCount;

        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: updatedPrice,
            ingredients: updateIngredients
        })

        this.updatePurchasableState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0) {
            const updateCount = oldCount - 1;
            const updateIngredients = {...this.state.ingredients};
            updateIngredients[type] = updateCount;

            const priceSubstraction = INGREDIENTS_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const updatePrice = oldPrice - priceSubstraction;

            this.setState({
                totalPrice: updatePrice,
                ingredients: updateIngredients
            })

            this.updatePurchasableState(updateIngredients);
        }
    }

    render() {
        const disableButton = {...this.state.ingredients};
        for(let key in disableButton) disableButton[key] = disableButton[key] <= 0
        let orderSummary = null;

        let burger = this.state.error ? <p style={{ textAlign: 'center'}}>The ingredients can't be loaded</p> : <Spinner />
        if(this.state.ingredients) {
            burger = <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientSubstracted={this.removeIngredientHandler}
                    disable={disableButton}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
            </Aux>

            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.modalClosedHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}
                    purchasing={this.state.purchasing}/>
            );
        }

        if(this.state.loading) {
            burger = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngridientAdded: (name) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: name}),
        onIngridientRemoved: (name) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));