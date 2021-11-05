import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Products.css'
import Rating from 'react-rating';

const Products = (props) => {
    // console.log(props)
    const {name, img, price, seller, stock, star} = props.product;
    const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />;
    return (
        <div className="products">
            <img src={img} alt="" />
            <div className="products-detail">
                <h2>{name}</h2>
                <p>by <small>{seller}</small> </p>
                <p>$ {price}</p>
                <p>only {stock} left in stock - order soon</p>
                <Rating
                    initialRating={star}
                    readonly
                    emptySymbol="far fa-star icon-color"
                    fullSymbol="fas fa-star icon-color"
                ></Rating> <br/>
                <button onClick={()=> props.handleAddToCart(props.product)}>{cartIcon} Add to cart</button>
            </div>
        </div>
    );
};

export default Products;