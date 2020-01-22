import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import classes from '../Layout/Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closedSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar clicked={this.sideDrawerHandler}/>
                <SideDrawer 
                    closed={this.sideDrawerHandler}
                    open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    { this.props.children }
                </main>
            </Aux>
        )
    }
}

export default Layout;