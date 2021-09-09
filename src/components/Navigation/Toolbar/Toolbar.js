import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationsItems from '../NavigationItems/NavigationItems'
import BurgerMenu from '../Sidedrawer/BurgerMenu/BurgerMenu'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
            <BurgerMenu clicked={props.burgerMenuClicked}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
        <nav>
            <NavigationsItems />
        </nav>
    </header>
);

export default toolbar;
