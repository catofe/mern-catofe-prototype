import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoCart, IoCartSharp } from "react-icons/io5";
import '../styles/Cart.css'

function Cart() {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useContext(UserContext);
  const [cart, setCart] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if (userId == null) {
      console.log("User is not signed in.")
      navigate("/login")
      return;
    }

    axios
      .get(`http://localhost:3000/api/cart/${userId}`)
      .then((res) => {
        console.log("Fetched User Cart")
        console.log(res.data)
        setCart(res.data)
      })
      .catch((error) => {
        alert("An error happened. Please check console");
        console.log(error);
      });
  }, [userId])

  const handleCartCheckout = () => {
    axios
      .put(`http://localhost:3000/api/order/${userId}/generate_order`)
      .then((res) => {
        console.log("Order Generated")
        console.log(res.data)
        setCart(res.data)
        navigate("/orders")
      })
      .catch((error) => {
        alert("An error happened. Please check console");
        console.log(error);
      });
  }

  return <div>
    <div className="cart-container">
      <div className="cart-header"><IoCart className="cart-icon" /> <b>Cart</b></div>
      <hr />
      {cart.map(item => {
        return (
          <div className="cart-item">
            <p><b>Product:</b> {item.product}</p>
            <p><b>Quantity:</b> {item.quantity}</p>
          </div>
        )
      })}
      <button onClick={() => handleCartCheckout()}>Checkout</button>
    </div>
  </div>
}

export default Cart
