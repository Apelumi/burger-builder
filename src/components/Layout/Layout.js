import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";


// we are turning this to a statful component to manage the sidedrawer showing or not

class Layout extends Component{
    state = {
        showsideDrawer: false
    }

    showSideDrawerClosedHandler = () => {
        this.setState({showsideDrawer: false});
    }

    showsidedrawertogglehandler = () => {
        // this.setState({showsideDrawer: !this.state.showsideDrawer})
        this.setState(( prevState ) => {
            return {showsideDrawer: !prevState.showsideDrawer};
        });
    }
    render(){
        //codes that are here are majorly codes that handle dynamic representation of somthing and somehow conditional in nature
        return (
            <Aux>
                <Toolbar drawertoggle={this.showsidedrawertogglehandler}/>
                <SideDrawer 
                    openShow = {this.state.showsideDrawer}
                    showsideDrawers = {this.showSideDrawerClosedHandler}/>
                {/*  Backdrop */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;