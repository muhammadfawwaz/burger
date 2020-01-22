import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => (
    <ul className={classes.NavigationItem}>
        <li style={{ listStyleType: 'none' }}>
            <NavLink 
                to={ props.link }
                activeClassName={classes.active}
                exact={props.exact}>{ props.children }</NavLink>
        </li>
    </ul>
)

export default navigationItem;