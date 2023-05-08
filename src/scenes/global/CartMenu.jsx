import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
    increaseCount,
    decreaseCount,
    removeFromCart,
    setIsCartOpen,
} from "../../state";
// import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const FlexBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const stripePromise = loadStripe(
    "pk_test_51MrQRHKzKPb7wLmLZOzsVcuRI9s3R13RaTtyzLhlkFocuqQqysZTuriaIxIQOkKT3jBTpNuYc6xeUWuu2QZ8S36100OfhZAujo"
);

const CartMenu = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector((state) => state.cart.isCartOpen);

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
        >
            {/* MODAL */}
            <Box
                position="fixed"
                right="0"
                bottom="0"
                width="max(400px, 30%)"
                height="100%"
                backgroundColor="white"
            >
                <Box padding="30px" overflow="auto" height="100%">
                    {/* HEADER */}
                    <FlexBox mb="15px">
                        <Typography variant="h3">
                            SHOPPING BAG ({cart.length})
                        </Typography>
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
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
                                        />
                                    </Box>
                                    <Box flex="1 1 60%">
                                        {/* ITEM NAME */}
                                        <FlexBox mb="5px">
                                            <Typography fontWeight="bold">
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
                                            >
                                                <CloseIcon />
                                            </IconButton>
                                        </FlexBox>
                                        <Typography>
                                            {item.attributes.shortDescription}
                                        </Typography>

                                        {/* AMOUNT */}
                                        <FlexBox mg="15px 0">
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                border={`1.5px solid ${shades.neutral[500]}`}
                                            >
                                                <IconButton
                                                    onClick={() =>
                                                        dispatch(
                                                            decreaseCount({
                                                                id: item.id,
                                                            })
                                                        )
                                                    }
                                                >
                                                    <RemoveIcon />
                                                </IconButton>
                                                <Typography>
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
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            {/* PRICE */}
                                            <Typography fontWeight="bold ">
                                                £{item.attributes.price}
                                            </Typography>
                                        </FlexBox>
                                    </Box>
                                </FlexBox>
                                <Divider />
                            </Box>
                        ))}
                    </Box>

                    {/* ACTIONS */}
                    <Box m="20px 0">
                        <FlexBox m="20px 0">
                            <Typography fontWeight="bold">SUBTOTAL</Typography>
                            <Typography fontWeight="bold">
                                £{totalPrice}
                            </Typography>
                        </FlexBox>
                        <Button
                            sx={{
                                backgroundColor: shades.primary[400],
                                color: "white",
                                borderRadius: 0,
                                minWidth: "100%",
                                padding: "20px 40px",
                                margin: "20px 0",
                            }}
                            onClick={() => {
                                // navigate("/checkout");
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
