import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';

/*
forwardRef is a React utility that allows a component to expose a ref to its parent. Normally, refs only work on DOM
elements. But when you wrap a component in forwardRef, you let the parent directly access internal behavior or state
(usually through an imperative API).
You're enabling a parent component to call methods on the CartModal component, such as open().

useImperativeHandle - This hook lets you customize what is exposed to the parent when the parent uses a ref on this component.
Instead of exposing the dialog DOM element itself, you're exposing a method: open().

useRef - Creates a reference to the <dialog> element so it can be manipulated directly with dialog.current.showModal().

createPortal - createPortal renders the modal outside the normal React component hierarchy (e.g. directly into the DOM at
#modal). This is useful for modals, tooltips, dropdowns, etc., which need to break out of layout constraints like overflow: hidden.
 */

const CartModal = forwardRef(function Modal(
  { cartItems, onUpdateCartItemQuantity, title, actions },
  ref
) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
