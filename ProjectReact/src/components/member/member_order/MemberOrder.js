import React, { useState, useReducer } from "react";
// import store from '../../store'
import MemberOrderList from "./MemberOrderList";
import MemberOrderDetail from "./MemberOrderDetail";
import Store from "./OrderStore";
import {
  courseListReducer,
  ingreListReducer,
  orderDetailReducer,
  orderItemReducer
} from "./OrderReducers";
export const courseInitState = { courseLists: [] };
export const ingreInitState = { ingreLists: [] };
export const orderDetailInitState = { orderDetail: [] };

const MemberOrder = () => {
  const [clState, clDispatch] = useReducer(courseListReducer, courseInitState);
  const [ilState, ilDispatch] = useReducer(ingreListReducer, ingreInitState);
  // const [orderType, setOrderType] = useState(1);
  // const changeOrderType = a => {
  //   setOrderType(a);
  // };

  const [odState, odlDispatch] = useReducer(
    orderDetailReducer,
    orderDetailInitState
  );

  return (
    <Store.Provider
      value={{
        courseLists: clState.courseLists,
        ingreLists: ilState.ingreLists,
        courseIsFetch: Store.courseIsFetch,
        ingreIsFetch: Store.ingreIsFetch,
        orderDetailLists: odState.orderDetailLists,
        orderDetailFetch: Store.orderDetailFetch,
        orderType: odState.orderType || 1,
        clDispatch,
        ilDispatch,
        odlDispatch
      }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 p-0">
            <MemberOrderList style={{ paddingTop: "60px" }} />
          </div>
          <div className="col-8 p-0">
            <MemberOrderDetail style={{ paddingTop: "60px" }} />
          </div>
        </div>
      </div>
    </Store.Provider>
  );
};

export default MemberOrder;
