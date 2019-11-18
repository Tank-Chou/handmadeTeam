import React, { useEffect } from "react";
import MemberOrder from "../components/member/member_order/MemberOrder";
import MemberSideBar from "../components/member/MemberSideBar";
import MemberEdit from "../components/member/MemberEdit";
import MemberPasswordEdit from "../components/member/MemberPasswordEdit";
import Cart from "./Cart";
import { Route, Switch } from "react-router-dom";
const Member = ({ login }) => {
  if (!localStorage.getItem("member_id")) {
    window.location = "http://localhost:3000/handmade";
    return;
  }
  console.log(login.login);
  return (
    <>
      <div className="d-flex">
        <MemberSideBar />
        <Switch>
          <Route
            exact
            path={`/handmade/member/order`}
            component={MemberOrder}
          />
          <Route exact path={`/handmade/member/cart`} component={Cart} />
          <Route
            exact
            path={`/handmade/member/passwordEdit`}
            component={MemberPasswordEdit}
          />
          <Route path={`/handmade/member/:edit?`} component={MemberEdit} />
        </Switch>
      </div>
    </>
  );
};

export default Member;
