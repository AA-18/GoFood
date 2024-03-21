import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, actions) => {
  switch (actions.type) {
    case "ADD":
      return [
        ...state,
        {
          id: actions.id,
          name: actions.name,
          qty: actions.qty,
          size: actions.size,
          price: actions.price,
          img: actions.img,
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(actions.index, 1);
      return newArr;
    case "DROP":
      let empArray = [];
      return empArray;
    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === actions.id) {
          console.log(
            food.qty,
            parseInt(actions.qty),
            actions.price + food.price
          );
          arr[index] = {
            ...food,
            qty: parseInt(actions.qty) + parseInt(food.qty),
            price: actions.price + food.price,
          };
        }
        return arr;
      });
      return arr;
    default:
      console.log("Error in reducer");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
