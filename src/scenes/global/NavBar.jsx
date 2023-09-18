import { useDispatch, useSelector } from "react-redux";
import {
    Badge,
    Box,
    IconButton,
    Typography,
    useMediaQuery,
} from "@mui/material";
import {
    // PersonOutline,
    ShoppingBagOutlined,
    // MenuOutlined,
    // SearchOutlined,
} from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import logo from "../../images/logo3.png";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <Box
            display="flex"
            alignItems="center"
            width="100%"
            height="60px"
            backgroundColor="rgba(255, 255, 255, 0.90)"
            color="black"
            position="fixed"
            top="0"
            left="0"
            zIndex="1"
        >
            <Box
                width={isNonMobile ? "80%" : "100%"}
                margin="auto"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box
                    onClick={() => navigate("/")}
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    color={shades.secondary[500]}
                    margin-right="0px"
                >
                    {/* WANDERING ELIXIRS */}
                    <img
                        src={logo}
                        alt="Wandering Elixirs Logo"
                        width={isNonMobile ? "400px" : "220px"}
                    />
                    {/* Wandering */}
                </Box>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    columnGap={isNonMobile ? "20px" : "0px"}
                    zIndex="2"
                >
                    {/* <IconButton sx={{ color: "black" }}>
                        <SearchOutlined />
    </IconButton> */}
                    {/* <IconButton
                        onClick={() => navigate("/bio")}
                        sx={{ color: "black" }}
                    >
                        <PersonOutline />
                    </IconButton> */}
                    {/* <IconButton sx={{ color: "black" }}>
                        <InfoIcon />
                    </IconButton> */}
                    <Typography
                        onClick={() => navigate("/bio")}
                        style={{ cursor: "pointer" }}
                        textAlign="center"
                    >
                        About Me
                    </Typography>
                    <Typography
                        onClick={() => navigate("/otherprojects")}
                        style={{ cursor: "pointer" }}
                        textAlign="center"
                    >
                        Other Projects
                    </Typography>

                    <IconButton
                        onClick={() => navigate("/delivery")}
                        sx={{ color: "black" }}
                    >
                        <InfoIcon />
                    </IconButton>
                    <Badge
                        badgeContent={cart.length}
                        color="secondary"
                        invisible={cart.length === 0}
                        sx={{
                            "& .MuiBadge-badge": {
                                right: 5,
                                top: 5,
                                padding: "0 4px",
                                height: "14px",
                                minWidth: "13px",
                            },
                        }}
                    >
                        <IconButton
                            onClick={() => dispatch(setIsCartOpen({}))}
                            sx={{ color: "black" }}
                        >
                            <ShoppingBagOutlined />
                        </IconButton>
                    </Badge>
                    {/* <IconButton sx={{ color: "black" }}>
                        <MenuOutlined />
                    </IconButton> */}
                </Box>
            </Box>
        </Box>
    );
};

export default NavBar;
