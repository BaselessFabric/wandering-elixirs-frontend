import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Badge,
    Box,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider
} from "@mui/material";
import {
    ShoppingBagOutlined,
    Menu as MenuIcon,
    Close as CloseIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { setIsCartOpen } from "../../state";
import logo from "../../images/logo3.png";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isNonMobile = useMediaQuery("(min-width: 768px)"); // Adjusted breakpoint for tablet sizes
    const theme = useTheme();
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

    const navLinks = [
        { text: "About Me", path: "/bio" },
        { text: "Other Projects", path: "/otherprojects" },
        { text: "Delivery", path: "/delivery" },
    ];

    return (
        <Box
            display="flex"
            alignItems="center"
            width="100%"
            height="70px"
            backgroundColor={theme.palette.neutral.light}
            color={theme.palette.neutral.dark}
            position="fixed"
            top="0"
            left="0"
            zIndex="1"
            sx={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
        >
            <Box
                width={isNonMobile ? "80%" : "90%"}
                margin="auto"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box
                    onClick={() => navigate("/")}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                >
                    <img
                        src={logo}
                        alt="Wandering Elixirs Logo"
                        width={isNonMobile ? "250px" : "180px"}
                        height="auto"
                    />
                </Box>
                
                {/* DESKTOP NAV */}
                {isNonMobile ? (
                    <Box display="flex" justifyContent="space-between" alignItems="center" columnGap="30px" zIndex="2">
                        {navLinks.map(link => (
                            <Typography
                                key={link.text}
                                variant="h6"
                                onClick={() => navigate(link.path)}
                                sx={{
                                    cursor: "pointer",
                                    color: theme.palette.neutral.dark,
                                    "&:hover": { color: theme.palette.primary.main },
                                }}
                            >
                                {link.text}
                            </Typography>
                        ))}
                        <Badge
                            badgeContent={cart.length}
                            color="secondary"
                            invisible={cart.length === 0}
                            sx={{ "& .MuiBadge-badge": { right: 5, top: 5, padding: "0 4px", height: "18px", minWidth: "18px", fontSize: "0.75rem" } }}
                        >
                            <IconButton onClick={() => dispatch(setIsCartOpen({}))} sx={{ color: theme.palette.neutral.dark }}>
                                <ShoppingBagOutlined />
                            </IconButton>
                        </Badge>
                    </Box>
                ) : (
                /* MOBILE NAV */
                    <Box>
                        <IconButton onClick={() => setIsMobileMenuToggled(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                )}

                {/* MOBILE MENU DRAWER */}
                <Drawer
                    anchor="right"
                    open={isMobileMenuToggled}
                    onClose={() => setIsMobileMenuToggled(false)}
                >
                    <Box
                        width="250px"
                        role="presentation"
                        textAlign="center"
                        sx={{ backgroundColor: theme.palette.neutral.light, height: '100%'}}
                    >
                        <Box display="flex" justifyContent="flex-end" p="1rem">
                            <IconButton onClick={() => setIsMobileMenuToggled(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <Divider />
                        <List>
                            {navLinks.map(link => (
                                <ListItem key={link.text} disablePadding>
                                    <ListItemText 
                                        primary={link.text} 
                                        onClick={() => {
                                            navigate(link.path);
                                            setIsMobileMenuToggled(false);
                                        }}
                                        sx={{ textAlign: 'center', cursor: 'pointer', '& .MuiListItemText-primary': { fontWeight: 'bold', color: theme.palette.neutral.dark } }}
                                    />
                                </ListItem>
                            ))}
                            <ListItem disablePadding>
                                 <ListItemText 
                                    primary={`Shopping Bag (${cart.length})`}
                                    onClick={() => {
                                        dispatch(setIsCartOpen({}));
                                        setIsMobileMenuToggled(false);
                                    }}
                                    sx={{ textAlign: 'center', cursor: 'pointer', '& .MuiListItemText-primary': { fontWeight: 'bold', color: theme.palette.neutral.dark } }}
                                />
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
            </Box>
        </Box>
    );
};

export default NavBar;
