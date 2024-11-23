import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useContext(UserContext)

  useEffect(() => {
    if (userId == null) {
      navigate("/login")
    }
  })
  return <div></div>
}

export default Home
