import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Tab, Tabs, useMediaQuery } from "@mui/material";
import Item from "../../components/Item";
import { setItems } from "../../state";

const ShoppingList = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("all");
    const items = useSelector((state) => state.cart.items);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getItems() {
        const items = await fetch(
            `${process.env.REACT_APP_API_URL}/api/items?populate=image`,
            { method: "GET" }
        );
        const itemsJson = await items.json();
        dispatch(setItems(itemsJson.data));
    }

    useEffect(() => {
        getItems();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const mushroomExtractsItems = items ? items.filter(
        (item) => item.attributes.category === "mushroomExtracts"
    ) : [];
    
    const seasonalSpecialsItems = items ? items.filter(
        (item) => item.attributes.category === "seasonalSpecials"
    ) : [];
    
    // const lotionsnPotionsItems = items ? items.filter(
    //     (item) => item.attributes.category === "lotionsnPotions"
    // ) : [];

    return (
        <Box width="80%" margin="80px auto" textAlign="center">
            {/* <Typography variant="h3" margin="0% 31%">
                I am currently away at Bimble Festival, any purchases made will
                be processed on
            </Typography> */}

            <Typography variant="h3" margin="0% 31%">
                Join The Fungal REVOLUTION!
            </Typography>
            <Tabs
                textColor="primary"
                indicatorColor="primary"
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{
                    sx: { display: isNonMobile ? "block" : "none" },
                }}
                sx={{
                    m: "25px",
                    "& .MuiTabs-flexContainer": {
                        flexWrap: "wrap",
                    },
                }}
            >
                <Tab label="ALL" value="all" />
                <Tab label="SEASONAL SPECIALS" value="seasonalSpecials" />
                {/* <Tab label="LOTIONS & POTIONS" value="lotionsnPotions" /> */}
                <Tab label="MUSHROOM EXTRACTS" value="mushroomExtracts" />
            </Tabs>
            <Box
                margin="0 auto"
                display="grid"
                gridTemplateColumns="repeat(auto-fill, 300px)"
                justifyContent="space-around"
                rowGap="20px"
                columnGap="1.33%"
            >
                {value === "all" &&
                    items.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`} />
                    ))}
                {/* {value === "lotionsnPotions" &&
                    lotionsnPotionsItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`} />
                    ))} */}
                {value === "seasonalSpecials" &&
                    seasonalSpecialsItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`} />
                    ))}
                {value === "mushroomExtracts" &&
                    mushroomExtractsItems.map((item) => (
                        <Item item={item} key={`${item.name}-${item.id}`} />
                    ))}
            </Box>
        </Box>
    );
};

export default ShoppingList;
