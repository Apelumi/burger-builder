import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked = {props.drawertoggle}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}> {/*this style is used as a conditional statement 
        for this to display on desktop devices */}
            <NavigationItems />
        </nav>
    </header>
    
);

export default toolbar;
