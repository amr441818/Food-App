import React, { useContext, useState } from "react";
import cartContext from "../../store/cart-context";
import Modal from "../Ui/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
// [{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }]
const Cart = (props) => {
  const [isShowingUp, setIsShowingUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmitt] = useState(false);
  const cartCtx = useContext(cartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const addItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const onShowingUp = () => {
    setIsShowingUp(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://reacthttp-15a58-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmitt(true);
    cartCtx.clearItems();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={removeItemHandler.bind(null, item.id)}
          onAdd={addItemHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const buttons = (
    <div className={classes.actions}>
      <button onClick={props.hideCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button onClick={onShowingUp} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const content = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isShowingUp ? (
        <Checkout onConfirm={submitOrderHandler} onClose={props.hideCart} />
      ) : (
        ""
      )}
      {!isShowingUp ? buttons : ""}
    </React.Fragment>
  );
  const submitMessage = <p> Order is submiting....</p>;

  const submittedMessage = (
    <React.Fragment>
      <p>Order submitted succsffuly</p>
      <div className={classes.actions}>
        <button onClick={props.hideCart} className={classes.button}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal hideCart={props.hideCart}>
      {!isSubmitting && !didSubmit && content}
      {isSubmitting && submitMessage}
      {!isSubmitting && didSubmit && submittedMessage}
    </Modal>
  );
};

export default Cart;
