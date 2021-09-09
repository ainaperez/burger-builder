import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import  BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.5,
    meat: 2, 
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0, 
            cheese: 0, 
            meat: 0,
              
        },
        price: 2,
        purchasable: false,
        purchasing: false,
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    updatePurchase = (ingredients) => {

        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        const bool = sum > 0

        this.setState({purchasable : bool});
        
    }

    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type]; 

        const updatedCount = oldCount + 1;
    
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice + priceAddition;
        this.setState({price: newPrice, ingredients: updatedIngredients});
        this.updatePurchase(updatedIngredients);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type]; 

        if(oldCount<=0){
            return;
        }

        const updatedCounted = oldCount -1;

        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCounted;
        const priceSubstraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice - priceSubstraction;
        this.setState({price: newPrice, ingredients: updatedIngredients})
        this.updatePurchase(updatedIngredients);
    }

    purchaseCanceledHandler = () => {
        this.setState({purchasing: false})
    }
    
    purchaseContinueHandler = () => {
        alert('You continue de purchse')
    }

    

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
        disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        return(
            <Aux>
                
                <Modal show={this.state.purchasing}
                        modalClosed={this.purchaseCanceledHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                    price={this.state.price} 
                    purchaseCanceled={this.purchaseCanceledHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
               
                
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable = {this.state.purchasable}
                    price={this.state.price}
                    ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;