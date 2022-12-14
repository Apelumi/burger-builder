import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const sideDrawer = (props) => {
    //...some instructional logics here
    // logics to show the sidedrawwer when the backdrop was closed
    let attachedclassesforsidedrawer = [classes.SideDrawer, classes.Close]
    if (props.openShow) {
        attachedclassesforsidedrawer = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show = {props.openShow} clicked = {props.showsideDrawers}/>
            <div className={attachedclassesforsidedrawer.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>

    );
};

export default sideDrawer;