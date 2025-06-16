import {createContext, useReducer} from 'react';
import {DUMMY_PRODUCTS} from "../dummy-products.js";

export const CartContext = createContext({
    items: [],
    addItem: () => {
    },
    updateQuantity: () => {
    }
});

function addItem(state, id) {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex((cartItem) => cartItem.id === id);
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
        const updatedItem = {
            ...existingCartItem, quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
    } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
            id: id, name: product.title, price: product.price, quantity: 1,
        });
    }

    return {
        ...state,
        items: updatedItems,
    };
}

function updateQuantity(state, {id, amount}) {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex((item) => item.id === id);

    const updatedItem = {
        ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += amount;

    if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
    } else {
        updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
        ...state,
        items: updatedItems,
    };
}

function cartReducer(state, action) {
    let newState;
    switch (action.type) {
        case 'ADD':
            newState = addItem(state, action.payload);
            break;
        case 'UPDATE':
            newState = updateQuantity(state, action.payload);
            break;
        default:
            newState = [...state];
    }
    return newState;
}

export default function CartContextProvider({children}) {

    const [shoppingCart, cartDispatch] = useReducer(cartReducer, {
        items: [],
    });

    function handleAddItemToCart(id) {
        cartDispatch({type: 'ADD', payload: id});
    }

    function handleUpdateCartItemQuantity(id, amount) {
        cartDispatch({type: 'UPDATE', payload: {id, amount}});
    }

    const initCtxValue = {
        items: shoppingCart.items, addItem: handleAddItemToCart, updateQuantity: handleUpdateCartItemQuantity
    };

    return (
        <CartContext value={initCtxValue}>
            {children}
        </CartContext>
    )

}