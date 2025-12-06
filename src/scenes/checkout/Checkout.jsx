import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { loadStripe } from "@stripe/stripe-js";

// Use environment variable for Stripe public key
const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_TEST_KEY || "pk_test_51MrQRHKzKPb7wLmLZOzsVcuRI9s3R13RaTtyzLhlkFocuqQqysZTuriaIxIQOkKT3jBTpNuYc6xeUWuu2QZ8S36100OfhZAujo"
);

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const cart = useSelector((state) => state.cart.cart);
    const theme = useTheme();
    const isFirstStep = activeStep === 0;
    const isSecondStep = activeStep === 1;

    const handleFormSubmit = async (values, actions) => {
        setActiveStep(activeStep + 1);

        // this copies the billing address onto shipping address
        if (isFirstStep && values.shippingAddress.isSameAddress) {
            actions.setFieldValue("shippingAddress", {
                ...values.billingAddress,
                isSameAddress: true,
            });
        }

        if (isSecondStep) {
            makePayment(values);
        }

        actions.setTouched({});
    };

    async function makePayment(values) {
        const stripe = await stripePromise;
        const requestBody = {
            userName: [values.firstName, values.lastName].join(" "),
            email: values.email,
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

    return (
        <Box width="80%" m="100px auto">
            <Typography variant="h2" align="center" mb={4}>Checkout</Typography>
            <Stepper activeStep={activeStep} sx={{ 
                m: "20px 0",
                "& .MuiStepIcon-root.Mui-active": { color: theme.palette.primary.main },
                "& .MuiStepIcon-root.Mui-completed": { color: theme.palette.primary.main },
             }}>
                <Step>
                    <StepLabel>Billing</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Payment</StepLabel>
                </Step>
            </Stepper>
            <Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema[activeStep]}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            {isFirstStep && (
                                <Shipping
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            {isSecondStep && (
                                <Payment
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                gap="50px"
                                mt="30px"
                            >
                                {!isFirstStep && (
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            backgroundColor: theme.palette.neutral[400],
                                            boxShadow: "none",
                                            color: "white",
                                            borderRadius: "4px",
                                            padding: "15px 40px",
                                            '&:hover': { backgroundColor: theme.palette.neutral[600] }
                                        }}
                                        onClick={() =>
                                            setActiveStep(activeStep - 1)
                                        }
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button
                                    fullWidth
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        boxShadow: "none",
                                        color: "white",
                                        borderRadius: "4px",
                                        padding: "15px 40px",
                                        '&:hover': { backgroundColor: theme.palette.primary[700] }
                                    }}
                                >
                                    {!isSecondStep ? "Next" : "Place Order"}
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

const initialValues = {
    billingAddress: {
        firstName: "",
        lastName: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zipCode: "",
    },
    shippingAddress: {
        isSameAddress: true,
        firstName: "",
        lastName: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        zipCode: "",
    },
    email: "",
    phoneNumber: "",
};

const checkoutSchema = [
    yup.object().shape({
        billingAddress: yup.object().shape({
            firstName: yup.string().required("required"),
            lastName: yup.string().required("required"),
            country: yup.string().required("required"),
            street1: yup.string().required("required"),
            street2: yup.string(),
            city: yup.string().required("required"),
            state: yup.string().required("required"),
            zipCode: yup.string().required("required"),
        }),
        shippingAddress: yup.object().shape({
            isSameAddress: yup.boolean(),
            firstName: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            lastName: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            country: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            street1: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            street2: yup.string(),
            city: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            state: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
            zipCode: yup.string().when("isSameAddress", {
                is: false,
                then: yup.string().required("required"),
            }),
        }),
    }),
    yup.object().shape({
        email: yup.string().required("required"),
        phoneNumber: yup.string().required("required"),
    }),
];

export default Checkout;
