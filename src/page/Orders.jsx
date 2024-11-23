import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [refresh, setRefresh] = useState(false);
  const [userId, setUserId] = useContext(UserContext);
  const [orders, setOrders] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if (userId == null) {
      console.log("User is not signed in.")
      navigate("/login")
      return;
    }

    axios
      .get(`http://localhost:3000/api/order/${userId}`)
      .then((res) => {
        console.log(res.data)
        setOrders(res.data)
      })
      .catch((error) => {
        alert("An error happened. Please check console");
        console.log(error);
      });
  }, [userId, refresh])

  const handleDeleteOrder = (id) => {
    axios
      .delete(`http://localhost:3000/api/order/${userId}/delete_order/${id}`)
      .then(() => {
        console.log("Delete Order: ", id)
        setRefresh(!refresh);
      })
      .catch((error) => {
        alert("An error happened. Please check console");
        console.log(error);
      });
  }

  return <div>
    <h3>ORDERS</h3>
    <hr />
    {orders.map(order => {
      return (
        <div>
          <h4>Order #{order._id}</h4>
          <p><b>Products: </b></p>
          {order.prodcutInstances.map(product_instance => {
            return (
              <li>
                <div>{product_instance.product}</div>
                <div>{product_instance.quantity}</div>
              </li>
            )
          })}
          <p><b>Total:</b> {order.total}</p>
          <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
          <br />
        </div>
      )
    })}
  </div>
}

export default Orders
