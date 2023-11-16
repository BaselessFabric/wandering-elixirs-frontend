import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            margin="auto"
            width="100%"
            height="60px"
            backgroundColor="rgba(255, 255, 255, 0.90)"
            color="black"
            bottom="0"
            left="0"
            zIndex="1"
        >
            <Typography
                onClick={() => (window.location.href = "https://alexwalls.com")}
                style={{ cursor: "pointer" }}
                textAlign="center"
            >
                Website Developed by AlexWalls.com
            </Typography>
        </Box>
    );
};

export default Footer;
