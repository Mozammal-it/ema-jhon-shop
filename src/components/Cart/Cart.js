import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const {cart} = props;
    console.log(cart);
    // const totalReducer = (previous, product) => previous + product.price;
    // const total = cart.reduce(totalReducer, 0);
    let total = 0;
    let totalQuantity = 0;
    for(const product of cart){
        // total = total + product.price;
        if(!product.quantity){
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
        totalQuantity = totalQuantity + product.quantity;
    }

    const shipping= 15;
    const tax = (total + shipping) * .10;
    const grandTotal = total + shipping + tax;
    return (
        <div>
            <h2>Order Summary</h2>
            {/* <h3>Items odered: {props.cart.length}</h3>  */}
            <h3>Items odered: {totalQuantity}</h3> 
            <p>Total: {total.toFixed(2)}</p> 
            <p>Shipping: {shipping.toFixed(2)}</p>
            <p>tax: {tax.toFixed(2)}</p>
            <p>Grand Total: {grandTotal.toFixed(2)}</p>
        </div>
    );
};

export default Cart;