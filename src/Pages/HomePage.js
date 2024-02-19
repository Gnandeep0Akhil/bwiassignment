import React, { useState } from "react";
import NavigationBar from "../Components/NavigationBar";
import { Outlet } from "react-router-dom";

function HomePage() {
  const [cart, setCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);

  const updateBadge = (item) => {
    setCart([...cart, item]);
    setCartPrice(cartPrice + item.price);
  };

  return (
    <>
      <NavigationBar cartcount={cart.length} cartPrice={cartPrice} />
      <Outlet context={[updateBadge]} />
    </>
  );
}

export default HomePage;
