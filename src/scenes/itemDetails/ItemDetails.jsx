import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, Grid, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const theme = useTheme();

  async function getItem() {
    const item = await fetch(
      `${process.env.REACT_APP_API_URL}/api/items/${itemId}?populate=image&populate=image2`,
      { method: "GET" }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

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
    window.scrollTo(0, 0); // Scroll to top on new item view
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  const isInStock = item?.attributes?.stockLevel > 0;
  const mainImageUrl = item?.attributes?.image?.data?.attributes?.formats?.medium?.url;
  const secondaryImageUrl = item?.attributes?.image2?.data?.attributes?.formats?.medium?.url;

  return (
    <Box width="80%" m="80px auto">
      <Grid container spacing={5}>
        {/* IMAGE SECTION */}
        <Grid item xs={12} md={6}>
          <Box sx={{ border: `1px solid ${theme.palette.neutral[300]}`, borderRadius: '8px', overflow: 'hidden', p: 1 }}>
            <img
              alt={item?.name}
              width="100%"
              height="auto"
              src={mainImageUrl}
              style={{ objectFit: "contain", borderRadius: '8px' }}
            />
          </Box>
          {secondaryImageUrl && (
            <Box sx={{ border: `1px solid ${theme.palette.neutral[300]}`, borderRadius: '8px', overflow: 'hidden', p: 1, mt: 2 }}>
                <img
                  alt={`${item?.name}-2`}
                  width="100%"
                  height="auto"
                  src={secondaryImageUrl}
                  style={{ objectFit: "contain", borderRadius: '8px' }}
                />
            </Box>
          )}
        </Grid>

        {/* INFO & ACTIONS SECTION */}
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" height="100%">
            <Typography variant="h2" fontWeight="bold" mb={2}>
              {item?.attributes?.name}
            </Typography>
            <Typography variant="h3" color={theme.palette.primary.main} mb={3}>
              £{item?.attributes?.price}
            </Typography>
            <Box 
              sx={{ 
                mt: "20px", 
                mb: "30px", 
                lineHeight: 1.7, 
                color: theme.palette.neutral[800],
                '& p': { margin: 0 } 
              }}
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(item?.attributes?.longDescription),
              }}
            />

            {/* COUNT AND BUTTON */}
            <Box display="flex" alignItems="center" minHeight="50px" mt="auto">
              {isInStock ? (
                <>
                  <Box
                    display="flex"
                    alignItems="center"
                    border={`1.5px solid ${theme.palette.neutral[500]}`}
                    borderRadius="4px"
                    mr="20px"
                  >
                    <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ p: "0 10px", userSelect: 'none' }}>{count}</Typography>
                    <IconButton
                      onClick={() =>
                        setCount(Math.min(count + 1, item?.attributes?.stockLevel))
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Button
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: "white",
                      borderRadius: "4px",
                      minWidth: "150px",
                      padding: "15px 40px",
                      fontSize: '1rem',
                      '&:hover': { backgroundColor: theme.palette.primary[700] }
                    }}
                    onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
                  >
                    ADD TO CART
                  </Button>
                </>
              ) : (
                <Button
                  disabled
                  sx={{
                    backgroundColor: theme.palette.neutral[300],
                    color: theme.palette.neutral[700],
                    borderRadius: "4px",
                    minWidth: "150px",
                    padding: "15px 40px",
                    fontSize: '1rem',
                  }}
                >
                  OUT OF STOCK
                </Button>
              )}
            </Box>

            <Box mt={3}>
              <Typography variant="body2" color={theme.palette.neutral[600]}>
                In Stock: {item?.attributes?.stockLevel || 0}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* RELATED ITEMS */}
      <Box mt="80px" width="100%">
        <Typography variant="h2" fontWeight="bold" textAlign="center">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(280px, 1fr))"
          justifyContent="center"
          rowGap="30px"
          columnGap="20px"
        >
          {items.slice(0, 4).map((relatedItem, i) => (
            <Item key={`${relatedItem.name}-${i}`} item={relatedItem} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;

