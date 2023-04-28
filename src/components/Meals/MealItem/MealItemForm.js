import { useRef, useState } from "react";
import Input from "../../Ui/Input/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const [valditeData, setValidateData] = useState(true);
  const amountRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const amountWithNumber = +enteredAmount; // this plus sign for convert string to num because any value in refs object is string even it was a number
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setValidateData(false);
      return;
    }
    props.onAddItem(amountWithNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "Amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add </button>
      {!valditeData ? "please add amount between (1 - 5) " : ""}
    </form>
  );
};
export default MealItemForm;
