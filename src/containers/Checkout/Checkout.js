import React, { Component } from "react";

import { Route } from "react-router-dom";

import Checkoutsummarry from "../../components/Order/CheckoutSummarry/CheckoutSummarry";
import ContactData from "./ContactData/ContactData";


class Checkout extends Component{
    // constructor (props) {
    //     super(props) 
    //     this.state = {
    //         ingredients: null,
    //         price: 0
    //     }
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let params of query.entries()){
    //         if ( params[0] === "price") {
    //             price = params[1]
    //         } else {
    //             ingredients[params[0]] = +params[1]
    //         }
            
    //     }
    //     this.setState({ingredients: ingredients})
    // }
    
    state = {
        ingredients: null,
        price: 0
    }

    // we are going to use the queryparams to extract our ingredients here
    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let params of query.entries()){
            if ( params[0] === "price") {
                price = params[1]
            } else {
                ingredients[params[0]] = +params[1]
            }
            
        }
        this.setState({ingredients: ingredients})
    }

    checkoutcancelledhandler = () => {
        this.props.history.goBack("/")
    }

    checkoutcontinuehandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }

    render(){
        return(
            <div>
                <Checkoutsummarry 
                    ingredients={this.state.ingredients}
                    checkoutcancelled ={this.checkoutcancelledhandler}
                    checkoutcontinued={this.checkoutcontinuehandler}/>
                <Route path={this.props.match.path + "/contact-data"} 
                render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;