import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import cartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const [btnState, setBtnState] = useState(false);
  const cartCtx = useContext(cartContext);
  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnState(true);
    const timer = setTimeout(() => {
      setBtnState(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  const btnClasses = ` ${classes.button} ${btnState ? classes.bump : ""}`;
  return (
    <button onClick={props.showCartHandler} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />{" "}
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}> {numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
