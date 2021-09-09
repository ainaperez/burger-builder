import React, { Component } from 'react'; 
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false});
            console.log(this.state.showSideDrawer)
    }

    burgerMenuClickedHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
       
    }

    render () {
        return(
            <Aux>
                <Sidedrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <Toolbar burgerMenuClicked={this.burgerMenuClickedHandler}  />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
    </Aux>
        )
    }
    
}

export default Layout;