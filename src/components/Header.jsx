import {useContext, useRef} from 'react';

import CartModal from './CartModal.jsx';
import {CartContext} from "../store/cart-context.jsx";

export default function Header() {
    const modal = useRef();

    const {items} = useContext(CartContext);

    const cartQuantity = items.length;

    function handleOpenCartClick() {
        modal.current.open();
    }

    let modalActions = <button>Close</button>;

    if (cartQuantity > 0) {
        modalActions = (
            <>
                <button>Close</button>
                <button>Checkout</button>
            </>
        );
    }

    return (
        <>
            <CartModal ref={modal} title="Your Cart" actions={modalActions}/>
            <header id="main-header">
                <div id="main-title">
                    <h1>Orange Delights</h1>
                </div>
                <p>
                    <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
                </p>
            </header>
        </>
    );
}
