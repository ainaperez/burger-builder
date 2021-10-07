import React, {Component} from 'react';
import axios from '../../axios-orders';
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

    componentDidMount () {
        console.log(this.props); 
        axios.get('https://react-my-burger-95e4a-default-rtdb.europe-west1.firebasedatabase.app/')
        .then(response =>{
            this.setState({ ingredients: response.date}); 
        })
        .catch(error => {
            this.setState({ error: true });
        })
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
        //alert('You continue de purchse'); 
        /*const order = {
            ingredients: this.state.ingredients, 
            price: this.state.price,
            customer: {
                name: 'Laura',
                address: {
                    street: 'test street 1',
                    zipCode: '37839', 
                    country: 'Germany'
                },
                email: 'dhajksh@test.com'
            }, 
            deliveryMethod: 'fastest'
            
        }
        axios.post('/orders.json', order)
         .then(response => console.log(response))
         .catch(error => console.log(error))*/

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }   
        const queryString = queryParams.join('&')      
        this.props.history.push({
             pathname: '/checkout', 
             search: '?' + queryString
         });
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