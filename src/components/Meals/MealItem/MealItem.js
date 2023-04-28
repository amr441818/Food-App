import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import cartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(cartContext)
  const price = `$${props.price.toFixed(2)}`; // toFixed method for two num after sign
const onAddHandler = amount =>{
 cartCtx.addItem({
  id:props.id,
  name:props.name,
  amount: amount,
  price:props.price
 })
}
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddItem={onAddHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
