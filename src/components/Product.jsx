import {useContext} from "react";
import {CartContext} from "../store/cart-context.jsx";

export default function Product({id, title, price, description}) {

    const {addItem} = useContext(CartContext);

    return (
        <article className="product">
            <div className="product-content">
                <div>
                    <h3>{title}</h3>
                    <p className='product-price'>${price}</p>
                    <p>{description}</p>
                </div>
                <p className='product-actions'>
                    <button onClick={() => addItem(id)}>Add to Cart</button>
                </p>
            </div>
        </article>
    );
}
