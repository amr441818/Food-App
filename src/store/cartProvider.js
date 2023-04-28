import { useReducer } from "react";
import cartContext from "./cart-context";

const defaultCartData = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existigeItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingItem = state.items[existigeItemIndex];

    let updatedCartItems = [];
    if (existingItem) {
      let newItem = {};
      newItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedCartItems = [...state.items];
      updatedCartItems[existigeItemIndex] = newItem;
    } else {
      updatedCartItems = state.items.concat(action.item);
    }

    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // we make our cart removable from out cart
  if (action.type === "REMOVE") {
    const selectItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    let selectedItem = state.items[selectItemIndex];
    let newTotalAmount = state.totalAmount - selectedItem.price;

    let updatedCartItems = [...state.items];

    if (selectedItem.amount === 1) {
      updatedCartItems = state.items.filter((item) => item.id !== action.id);
    } else {
      selectedItem = {
        ...selectedItem,
        amount: selectedItem.amount - 1,
      };
      updatedCartItems[selectItemIndex] = selectedItem;
    }

    return {
      items: updatedCartItems,
      totalAmount: newTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartData;
  }
  return defaultCartData;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartData
  );
  const addItemHandler = (item) => {
    dispatchCartState({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };
  const clearItemsHandler = () => {
    dispatchCartState({ type: "CLEAR" });
  };

  const cartData = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItems: clearItemsHandler,
  };

  return (
    <cartContext.Provider value={cartData}>
      {props.children}
    </cartContext.Provider>
  );
};
export default CartProvider;
