import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import {addToDb, getStoredCart} from '../../utilities/fakedb.js'
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(()=>{
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setDisplayProducts(data);
        })
    },[]);

    useEffect(()=>{
        if(products.length){
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const key in savedCart){
                const addedProduct = products.find(product => product.key === key);
                if(addedProduct){
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
            }
            setCart(storedCart);
        }
    },[products])

    const handleAddToCart = product => {
        const newCart = [...cart, product];
        setCart(newCart);
        // Add to local storage
        addToDb(product.key)
    }

    const handleSearch = event => {
        const searchText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProducts);
        // console.log(matchedProducts.length);
    }
    return (
        <>
            <div className="search-container">
                <input 
                type="text" 
                placeholder="Search"
                onChange={handleSearch}
                 />
            </div>
            <div className="shop-container">
                <div className="product-conatiner">
                    <h2>Shopping Items: {products.length}</h2>
                    {
                        displayProducts.map(product => <Products 
                            product={product} 
                            key={product.key}
                            handleAddToCart={handleAddToCart}
                            ></Products>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;