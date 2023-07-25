import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubtmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;

  const carItemRemoveHandle = (id) => {
    cartCtx.removeItem(id);
  };

  const carItemAddHandle = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmiting(true);
    fetch(
      "https://reistic-example-483a6-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderItems: cartCtx.items }),
      }
    );
    setIsSubmiting(false);
    setDidSubtmit(true);
    cartCtx.clearCart();
  };

  const carItems = (
    <ul className={classes.items}>
      {cartCtx.items.map((items) => (
        <CartItem
          key={items.id}
          name={items.name}
          price={items.price}
          amount={items.amount}
          onRemove={carItemRemoveHandle.bind(null, items.id)}
          onAdd={carItemAddHandle.bind(null, items)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onClose} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = <p>Successfully sent the order</p>;

  const cartModalContent = (
    <Fragment>
      {carItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>R${totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting && !didSubmit && cartModalContent}
      {isSubmiting && isSubmittingModalContent}
      {!isSubmiting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
