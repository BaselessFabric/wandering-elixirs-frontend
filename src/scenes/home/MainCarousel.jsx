import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
// imports all images from assets folder
const importAll = (r) => {
    return r.keys().reduce((acc, item) => {
        acc[item.replace("./", "")] = r(item);
        return acc;
    }, {});
};

export const heroTextureImports = importAll(
    require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = ({ onShopNowClick }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme(); // Access the new theme

    // Choose one image for the hero section, e.g., 'c1.jpg'
    const heroImage = heroTextureImports['c1.jpg'] || Object.values(heroTextureImports)[0];

    return (
        <Box
            sx={{
                position: 'relative',
                height: '80vh', // Make it prominent
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundImage: `url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Overlay for text readability */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '20px',
                }}
            >
                <Typography
                    variant={isNonMobile ? "h1" : "h2"}
                    color="white"
                    fontWeight="bold"
                    mb="10px"
                    sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
                >
                    Wandering Elixirs
                </Typography>
                <Typography
                    variant={isNonMobile ? "h3" : "h4"}
                    color="white"
                    mb="30px"
                    sx={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
                >
                    Nature's Essence, Bottled
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        padding: '15px 40px',
                        fontSize: '1.2rem',
                        borderRadius: '5px',
                        '&:hover': {
                            backgroundColor: theme.palette.primary[700],
                        },
                    }}
                    onClick={onShopNowClick}
                >
                    Shop Now
                </Button>
            </Box>
        </Box>
    );
};

export default MainCarousel;
