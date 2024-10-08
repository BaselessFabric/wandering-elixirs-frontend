import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  // const {
  //     palette: { neutral },
  // } = useTheme();
  const { category, price, name, image, stockLevel } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  let isInStock;

  if (stockLevel > 0) {
    isInStock = true;
  } else {
    isInStock = false;
  }

  // const discountedPrice = (price - price * 0.3).toFixed(2);

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={item.name}
          width="300px"
          height="400px"
          src={url}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            {/* AMOUNT */}
            <Box
              style={{ display: isInStock ? "flex" : "none" }}
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* BUTTON */}
            <Button
              style={{ display: isInStock ? "" : "none" }}
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{
                backgroundColor: shades.primary[300],
                color: "white",
              }}
            >
              Add to Cart
            </Button>
            <Button
              style={{ display: !isInStock ? "" : "none" }}
              sx={{
                backgroundColor: shades.primary[300],
                color: "white",
              }}
            >
              Out of Stock
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        {category && (
          <Typography variant="subtitle2" color={shades.neutral.dark}>
            {category
              .replace(/([A-Z])/g, " $1")
              .replace(/&/g, " & ")
              .replace(/^./, (str) => str.toUpperCase())}
          </Typography>
        )}
        <Typography>{name}</Typography>
        {/* non discounted code */}
        <Typography fontWeight="bold">£{price}</Typography>

        {/* discounted code */}
        {/* <Typography
          fontWeight="bold"
          style={{ textDecoration: "line-through", color: "red" }}
        >
          £{price}
        </Typography>
        <Typography fontWeight="bold" style={{ marginLeft: 8 }}>
          £{discountedPrice}
        </Typography> */}
        
      </Box>
    </Box>
  );
};

export default Item;
