import {useContext} from "react";
import {CartContext} from "../store/cart-context.jsx";

export default function Cart() {

    const {items, updateQuantity} = useContext(CartContext);
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

    return (
        <div id="cart">
            {items.length === 0 && <p>No items in cart!</p>}
            {items.length > 0 && (
                <ul id="cart-items">
                    {items.map((item) => {
                        const formattedPrice = `$${item.price.toFixed(2)}`;

                        return (
                            <li key={item.id}>
                                <div>
                                    <span>{item.name}</span>
                                    <span> ({formattedPrice})</span>
                                </div>
                                <div className="cart-item-actions">
                                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
            <p id="cart-total-price">
                Cart Total: <strong>{formattedTotalPrice}</strong>
            </p>
        </div>
    );
}
