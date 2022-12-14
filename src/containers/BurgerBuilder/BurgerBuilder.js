import React, {Component} from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICES = { //THIS ARE GLOBAL PRICES FOR EACH INGRDIENTS 
    // THAT IS WHY IT IS OUTSIDE THE CLASS SCOPE
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasingItems: false,
        spinnerloading: false,
        error: false
    }

    componentDidMount (){
        axios.get("https://burgerproject-ba62f-default-rtdb.firebaseio.com/Ingredients.json")
        .then(response => {
            this.setState({ingredients: response.data})
        })
        .catch(error => {
            this.setState({error: true})
        })
    }

    updatePurchasable = (ingredients)=>{
        const sum = Object.keys(ingredients)
            .map(igkeys =>{
                return ingredients[igkeys];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0})
    }

    purchasingItemsHandler = () => {
        this.setState({purchasingItems: true})
    }

    purchasingItemsClosed = () => {
        this.setState({purchasingItems: false})
    }

    purchasingItemsContinued = () => {
        //handling requests and making changes by setting the spinner
        // this.setState({spinnerloading: true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customerdata: {
        //         name: 'Ade samuel',
        //         address: {
        //             street: "No1 adeshida road akure",
        //             postalAdd: "PMB4039"
        //         },
        //         email: 'adeyefaoo7@gmail.com',
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post("/orders.json", order)
        // .then(response => {
        //     this.setState({spinnerloading: false, purchasingItems: false})
        // })
        // .catch(error => {
        //     this.setState({spinnerloading: false, purchasingItems: false})
        // });
        // alert("You ordered, proceed to payment")
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push("price=" + this.state.totalPrice)
        const queryStrings = queryParams.join("&")
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryStrings
        }) //basically helps us push a new page to the stack
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchasable(updatedIngredients);

    }

    render(){
        // anything typed here is meainly for checking for something and looping
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null
        let burger = this.state.error? <p>This page has a network error</p>: <Spinner />;
        if (this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients= {this.state.ingredients}/>
                    <BuildControls 
                    addIngredients = {this.addIngredientHandler}
                    removingIngredients = {this.removeIngredientHandler}
                    disabledInfo ={disabledInfo}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchasingItemsHandler}
                    price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients} 
                purchasingCanceled = {this.purchasingItemsClosed}
                purchasingContinue = {this.purchasingItemsContinued}
                price = {this.state.totalPrice}/>
        }
        if (this.state.spinnerloading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasingItems} modalClosed = {this.purchasingItemsClosed}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
};

export default withErrorHandler(BurgerBuilder, axios);