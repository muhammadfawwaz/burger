import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.purchasing !== this.props.purchasing
    }
    
    componentDidUpdate() {
        console.log('[OrderSummary] componentDidUpdate')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ikey => {
            return (
            <li key={ikey}>
                <span 
                    style={{textTransform: 'capitalize'}}>{ikey}
                </span>: {this.props.ingredients[ikey]}
            </li>
            )
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>These ingredients: </p>
                <ul>
                    { ingredientSummary }
                </ul>
                <p><strong>Total Price: { this.props.totalPrice.toFixed(2) }</strong></p>
                <p>Continue to checkout?</p>
                <Button
                    clicked={this.props.purchaseCancelled}
                    btnType='Danger'>CANCEL</Button>
                <Button
                    clicked={this.props.purchaseContinued}
                    btnType='Success'>CONTINUE</Button>
            </Aux>
        )
    }
}


export default OrderSummary;