import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import Item from "../../components/Item";
import { setItems } from "../../state";

const ShoppingList = React.forwardRef((props, ref) => { // Accept props and ref
    const dispatch = useDispatch();
    const [value, setValue] = useState("all"); // Default to 'all' for tabs
    const items = useSelector((state) => state.cart.items);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getItems() {
        const items = await fetch(
            `${process.env.REACT_APP_API_URL}/api/items?populate=image`,
            {method: "GET"}
        );
        const itemsJson = await items.json();
        // Ensure that we always dispatch an array, even if the API response is malformed
        dispatch(setItems(itemsJson.data || []));
    }

    useEffect(() => {
        getItems();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Add defensive checks to ensure items is an array before filtering
    const mushroomExtractsItems = Array.isArray(items)
        ? items.filter((item) => item.attributes.category === "mushroomExtracts")
        : [];

    const seasonalSpecialsItems = Array.isArray(items)
        ? items.filter((item) => item.attributes.category === "seasonalSpecials")
        : [];

    // Filter out `lotionsnPotionsItems` as they are commented out in existing code.

    // Curated items for the Featured Products section
    const featuredProducts = mushroomExtractsItems.slice(0, isNonMobile ? 4 : 2); // Show 4 on desktop, 2 on mobile

    return (
        <Box ref={ref} width={isNonMobile ? "80%" : "90%"} margin="40px auto" textAlign="center">
            {/* Featured Products Section */}
            <Typography variant="h2" sx={{my: "40px", color: theme.palette.neutral[900]}}>
                Featured Products
            </Typography>
            <Box
                margin="0 auto"
                display={isNonMobile ? "grid" : "flex"}
                flexDirection={isNonMobile ? undefined : "column"}
                alignItems={isNonMobile ? undefined : "center"}
                gridTemplateColumns={isNonMobile ? "repeat(auto-fit, minmax(280px, 1fr))" : undefined}
                justifyContent="center"
                rowGap="30px"
                columnGap="20px"
                sx={{
                    pb: "60px",
                }}
            >
                {/* Add defensive check for featuredProducts */}
                {Array.isArray(featuredProducts) && featuredProducts.map((item) => (
                    <Item item={item} key={`${item.name}-${item.id}`}/>
                ))}
            </Box>

            {/* All Products Tabs */}
            <Typography variant="h2" sx={{my: "40px", color: theme.palette.neutral[900]}}>
                All Products
            </Typography>
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{
                    sx: {display: isNonMobile ? "block" : "none", backgroundColor: theme.palette.primary.main},
                }}
                sx={{
                    m: "25px 0",
                    "& .MuiTabs-flexContainer": {
                        flexWrap: "wrap",
                        justifyContent: "center",
                    },
                    "& .MuiTab-root": {
                        fontSize: "1rem", // Adjust tab font size
                        fontWeight: "bold",
                        color: theme.palette.neutral[700],
                        '&.Mui-selected': {
                            color: theme.palette.primary.main,
                        }
                    }
                }}
            >
                <Tab label="ALL" value="all"/>
                <Tab label="SEASONAL SPECIALS" value="seasonalSpecials"/>
                <Tab label="MUSHROOM EXTRACTS" value="mushroomExtracts"/>
            </Tabs>
            <Box
                margin="0 auto"
                display={isNonMobile ? "grid" : "flex"}
                flexDirection={isNonMobile ? undefined : "column"}
                alignItems={isNonMobile ? undefined : "center"}
                gridTemplateColumns={isNonMobile ? "repeat(auto-fit, minmax(280px, 1fr))" : undefined}
                justifyContent="center"
                rowGap="30px"
                columnGap="20px"
                sx={{
                    mb: "40px",
                }}
            >
                {/* Add defensive checks for all rendering maps */}
                {value === "all" &&
                    Array.isArray(items) && items.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`}/>
                    ))}
                {value === "seasonalSpecials" &&
                    Array.isArray(seasonalSpecialsItems) && seasonalSpecialsItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`}/>
                    ))}
                {value === "mushroomExtracts" &&
                    Array.isArray(mushroomExtractsItems) && mushroomExtractsItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`}/>
                    ))}
            </Box>
        </Box>
    );
}); // Correctly close React.forwardRef and const ShoppingList

export default ShoppingList;
