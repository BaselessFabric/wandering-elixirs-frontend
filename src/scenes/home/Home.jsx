import React, { useRef } from "react"; // Import React and useRef
import { Box } from "@mui/material";
import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";

const Home = () => {
  const shoppingListRef = useRef(null);

  const scrollToShoppingList = () => {
    shoppingListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box className="home">
      <MainCarousel onShopNowClick={scrollToShoppingList} />
      <ShoppingList ref={shoppingListRef} />
    </Box>
  );
};

export default Home;
