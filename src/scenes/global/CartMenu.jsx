import { Box, Button, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import {
    increaseCount,
    decreaseCount,
    removeFromCart,
    setIsCartOpen,
} from "../../state";
import { loadStripe } from "@stripe/stripe-js";

const FlexBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// Using environment variable for Stripe public key
const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_LIVE_KEY || "pk_live_51MrQRHKzKPb7wLmLJVz21u5NeEIDBvw0UyuCsl6hIOWAJeB0teoHfBPZIbnj7nlugmRJqGWYfXOShF6VxhnwaUuF009anJYUMM"
);

const CartMenu = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);
    const theme = useTheme(); // Access the new theme

    async function makePayment() {
        const stripe = await stripePromise;
        const requestBody = {
            products: cart.map(({ id, count }) => ({
                id,
                count,
            })),
        };

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/orders`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            }
        );
        const session = await response.json();
        await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    }

    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.attributes.price;
    }, 0);

    return (
        <Box //overlay
            display={isCartOpen ? "block" : "none"}
            backgroundColor="rgba(0,0,0,0.4)"
            position="fixed"
            zIndex={10}
            width="100%"
            height="100%"
            left="0"
            top="0"
            overflow="auto"
            onClick={() => dispatch(setIsCartOpen({}))} // Close on overlay click
        >
            {/* MODAL */}
            <Box
                position="fixed"
                right="0"
                bottom="0"
                width="max(400px, 30%)"
                height="100%"
                backgroundColor={theme.palette.neutral.light} // Use new light neutral
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <Box padding="30px" overflow="auto" height="100%">
                    {/* HEADER */}
                    <FlexBox mb="15px">
                        <Typography variant="h3" color={theme.palette.neutral[900]}>
                            SHOPPING BAG ({cart.length})
                        </Typography>
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))} sx={{ color: theme.palette.neutral[700] }}>
                            <CloseIcon />
                        </IconButton>
                    </FlexBox>
                    {/* CART LIST */}
                    <Box>
                        {cart.map((item) => (
                            <Box key={`${item.attributes.name}-${item.id}`}>
                                <FlexBox p="15px 0">
                                    {/* Flex shorthand, always use flex basis over width percentage */}
                                    <Box flex="1 1 40%">
                                        <img
                                            alt={item?.name}
                                            width="123px"
                                            height="164px"
                                            src={
                                                item?.attributes?.image?.data
                                                    ?.attributes?.formats
                                                    ?.medium?.url
                                            }
                                            style={{ objectFit: "cover" }}
                                        />
                                    </Box>
                                    <Box flex="1 1 60%" pl="20px"> {/* Added left padding */}
                                        {/* ITEM NAME */}
                                        <FlexBox mb="5px">
                                            <Typography fontWeight="bold" color={theme.palette.neutral[900]}>
                                                {item.attributes.name}
                                            </Typography>
                                            <IconButton
                                                onClick={() =>
                                                    dispatch(
                                                        removeFromCart({
                                                            id: item.id,
                                                        })
                                                    )
                                                }
                                                sx={{ color: theme.palette.neutral[700] }}
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </FlexBox>
                                        <Typography variant="body2" color={theme.palette.neutral[700]}>
                                            {item.attributes.shortDescription}
                                        </Typography>

                                        {/* AMOUNT */}
                                        <FlexBox mt="15px"> {/* Changed mg to mt */}
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                border={`1.5px solid ${theme.palette.neutral[500]}`}
                                                borderRadius="4px"
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        dispatch(
                                                            decreaseCount({
                                                                id: item.id,
                                                            })
                                                        )
                                                    }
                                                    sx={{ color: theme.palette.neutral[700] }}
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography color={theme.palette.neutral[900]}>
                                                    {item.count}
                                                </Typography>
                                                <IconButton
                                                    onClick={() =>
                                                        dispatch(
                                                            increaseCount({
                                                                id: item.id,
                                                            })
                                                        )
                                                    }
                                                    sx={{ color: theme.palette.neutral[700] }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            {/* PRICE */}
                                            <Typography fontWeight="bold" color={theme.palette.primary.main}>
                                                £{item.attributes.price}
                                            </Typography>
                                        </FlexBox>
                                    </Box>
                                </FlexBox>
                                <Divider sx={{ borderColor: theme.palette.neutral[300] }}/>
                            </Box>
                        ))}
                    </Box>

                    {/* ACTIONS */}
                    <Box m="20px 0">
                        <FlexBox m="20px 0">
                            <Typography fontWeight="bold" color={theme.palette.neutral[900]}>SUBTOTAL</Typography>
                            <Typography fontWeight="bold" color={theme.palette.primary.main}>
                                £{totalPrice}
                            </Typography>
                        </FlexBox>
                        <Button
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: "white",
                                borderRadius: "4px", // Subtle rounded corners
                                minWidth: "100%",
                                padding: "15px 40px", // Reduced vertical padding slightly
                                margin: "20px 0",
                                '&:hover': {
                                    backgroundColor: theme.palette.primary[700],
                                },
                            }}
                            onClick={() => {
                                // navigate("/checkout"); // Removed commented out navigate
                                makePayment();
                                dispatch(setIsCartOpen());
                            }}
                        >
                            CHECKOUT
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CartMenu;
