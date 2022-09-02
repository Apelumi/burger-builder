import React, {Component} from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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
        ingredients: {
            "salad": 0,
            "bacon": 0,
            "cheese": 0,
            "meat": 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasingItems: false
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
        alert("You ordered, proceed to payment")
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

        return (
            <Aux>
                <Modal show={this.state.purchasingItems} 
                        modalClosed = {this.purchasingItemsClosed}>
                    <OrderSummary ingredients={this.state.ingredients} 
                    purchasingCanceled = {this.purchasingItemsClosed}
                    purchasingContinue = {this.purchasingItemsContinued}
                    price = {this.state.totalPrice}/>
                </Modal>
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
    };
};

export default BurgerBuilder;