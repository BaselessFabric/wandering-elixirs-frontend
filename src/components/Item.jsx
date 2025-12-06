import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme(); // Access the theme

  const { category, price, name, image, stockLevel } = item.attributes;
  
  // Safely access the image url using optional chaining to prevent crashes
  const url = image?.data?.attributes?.formats?.medium?.url;

  const isInStock = stockLevel > 0;

  return (
    <Box
      width={width}
      onClick={() => navigate(`/item/${item.id}`)}
      sx={{
        cursor: 'pointer',
        border: `1px solid ${theme.palette.neutral[300]}`,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
            boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
        }
    }}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        sx={{
            cursor: "pointer",
            height: '300px', // Fixed height for image container
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.neutral[200], // Add a fallback background
        }}
      >
        {url ? (
            <img
              alt={item.name}
              src={url}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensure image covers the area
                transition: 'transform 0.3s ease-in-out',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
        ) : (
            // Fallback content if no image is available
            <Typography variant="body2" color={theme.palette.neutral[600]}>
                No Image
            </Typography>
        )}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="100%"
          padding="10px"
          sx={{
            backgroundColor: 'rgba(255,255,255,0.8)',
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            opacity: isHovered ? 1 : 0,
            transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          {/* AMOUNT */}
          {isInStock ? (
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={theme.palette.neutral[200]}
              borderRadius="4px"
            >
              <IconButton onClick={(e) => { e.stopPropagation(); setCount(Math.max(count - 1, 1)); }}>
                <RemoveIcon sx={{ color: theme.palette.neutral[700] }} />
              </IconButton>
              <Typography color={theme.palette.neutral[900]}>{count}</Typography>
              <IconButton onClick={(e) => { e.stopPropagation(); setCount(count + 1); }}>
                <AddIcon sx={{ color: theme.palette.neutral[700] }} />
              </IconButton>
            </Box>
          ) : (
            <Typography variant="body2" color={theme.palette.secondary.main} fontWeight="bold">
                Out of Stock
            </Typography>
          )}

          {/* BUTTON */}
          {isInStock && (
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigating to item details
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                borderRadius: "4px",
                padding: "8px 15px",
                fontSize: "0.8rem",
                '&:hover': {
                    backgroundColor: theme.palette.primary[700],
                },
              }}
            >
              Add to Cart
            </Button>
          )}
        </Box>
      </Box>

      <Box mt="15px" px="15px" pb="15px">
        {category && (
          <Typography variant="body2" color={theme.palette.neutral[600]} mb="5px">
            {category
              .replace(/([A-Z])/g, " $1")
              .replace(/&/g, " & ")
              .replace(/^./, (str) => str.toUpperCase())}
          </Typography>
        )}
        <Typography variant="h6" fontWeight="bold" color={theme.palette.neutral[900]}>
            {name}
        </Typography>
        <Typography variant="body1" fontWeight="bold" color={theme.palette.primary.main} mt="5px">
            £{price}
        </Typography>
      </Box>
    </Box>
  );
};

export default Item;
