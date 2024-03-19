import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button } from "@mui/material";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";
import DOMPurify from "dompurify";

function sanitizeHtml(html) {
  return DOMPurify.sanitize(html);
}

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  // const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  // const handleChange = (event, newValue) => {
  //     setValue(newValue);
  // };

  async function getItem() {
    const item = await fetch(
      `${process.env.REACT_APP_API_URL}/api/items/${itemId}?populate=image&populate=image2`,
      { method: "GET" }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  // console.log("ItemID: ", itemId);

  async function getItems() {
    const items = await fetch(
      `${process.env.REACT_APP_API_URL}/api/items?populate=image`,
      { method: "GET" }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  let isInStock;

  if (item?.attributes?.stockLevel > 0) {
    isInStock = true;
  } else {
    isInStock = false;
  }

  // console.log("stockLevel: ", item?.attributes?.stockLevel);
  // console.log("isInStock: ", isInStock);

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          {console.log(item)}
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={
              item?.attributes?.image?.data?.attributes?.formats?.medium?.url
            }
            style={{ objectFit: "contain" }}
          />
          {/* <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={
              item?.attributes?.image2?.data?.attributes?.formats?.medium?.url
            }
            style={{ objectFit: "contain" }}
          /> */}
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          {/* <Box display="flex" justifyContent="space-between">
                        <Box>Home/Item</Box>
                        <Box>Prev Next</Box>
                    </Box> */}

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            {/* non discounted code: */}
            {/* <Typography>£{item?.attributes?.price}</Typography> */}

            {/* discounted code: */}
            <Typography
              style={{ textDecoration: "line-through", color: "red" }}
            >
              £{item?.attributes?.price}
            </Typography>
            <Typography>
              £{(item?.attributes?.price * 0.7).toFixed(2)} - with 30% off
              discount code
            </Typography>
            <Typography
              sx={{ mt: "20px" }}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(item?.attributes?.longDescription),
              }}
            ></Typography>
          </Box>

          {/* COUNT AND BUTTON */}
          <Box display="flex" alignItems="centre" minHeight="50px">
            <Box
              style={{ display: isInStock ? "flex" : "none" }}
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton
                onClick={() =>
                  setCount(Math.min(count + 1, item?.attributes?.stockLevel))
                }
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              style={{ display: isInStock ? "block" : "none" }}
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
            <Box
              style={{ display: !isInStock ? "block" : "none" }}
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
            >
              OUT OF STOCK
            </Box>
          </Box>

          <Box>
            {/* <Box m="20px 0 5px 0" display="flex">
                            <FavoriteBorderOutlinedIcon />

                            <Typography sx={{ ml: "5px" }}>
                                ADD TO WISHLIST
                            </Typography>
                        </Box> */}
            <Typography>
              Amount Left In Stock: {item?.attributes?.stockLevel}
            </Typography>
            {/* <Typography>
                            CATEGORIES: {item?.attributes?.category}
                        </Typography> */}
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      {/* <Box m="20px 0">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="DESCRIPTION" value="description" />
                    <Tab label="REVIEWS" value="reviews" />
                </Tabs>
            </Box>
            <Box display="flex" flexWrap="wrap" gap="15px">
                {value === "description" && (
                    <div>{item?.attributes?.longDescription}</div>
                )}
                {value === "reviews" && <div>reviews</div>}
            </Box> */}

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
