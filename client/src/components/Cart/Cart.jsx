import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.css";
import { createOrder, removeFromCart } from "../../redux/actions/cart.actions";
import CartElement from "./CartElement";

function Cart() {
  const cart = useSelector((store) => store.cart);
  const userId = useSelector((store) => store.user[0]);
  const [order, setOrder] = useState(false);

  const sum = cart.reduce((acc, a) => {
    return acc + Number(a.price);
  }, 0);

  return (
    <>
      <div className={style.cart}>
        <ul className={style.list}>
          {cart.length ? (
            cart.map((item) => <CartElement {...item} key={item.id} />)
          ) : (
            <p>Your cart still empty</p>
          )}
        </ul>
        {cart.length ? (
          <>
            <strong> Total: ${sum}</strong>
            <Button
              sx={{
                margin: "10px auto",
                width: "100px",
                border: "none",
                color: "#2b256f",
                textAlign: "center",
                ":hover": {
                  border: "none",
                  bgcolor: "#eba7d0",
                  color: "#fff", // theme.palette.primary.main
                },
              }}
              onClick={() => {
                createOrder(userId, cart);
                setOrder(true);
              }}
            >
              Buy
            </Button>
          </>
        ) : null}
        {order ? (
          <p className={style.textOrder}>
            Thank you for being our valued customer. We hope our products will
            meet your expectations. Let us know if you have any questions.
          </p>
        ) : null}
      </div>
    </>
  );
}

export default Cart;
