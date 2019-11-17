import { createContext } from "react";

const id = localStorage.getItem("member_id");
const ingreCart = localStorage.getItem("ingreCart" + id);
const courseCart = localStorage.getItem("courseCart" + id);

export const CartStoreStatus = {
  id: id,
  step: 0,
  courseCart: courseCart,
  ingreCart: ingreCart,
  courseCartCf: [],
  ingreCartCf: [],
  checkoutFinish: false
};

const CartStore = createContext(CartStoreStatus);

export default CartStore;