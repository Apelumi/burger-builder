import React from "react";

import classes from "./DrawerToggle.module.css"

const drawerToggle = (props) => (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        {/* all these will create lines that'll act like the menu bar */}
        <div></div> 
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;