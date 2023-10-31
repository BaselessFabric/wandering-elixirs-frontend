import { Box, Paper, Typography } from "@mui/material";
// import chefImage from "../../assets/a.jpeg";
// import foodImage1 from "../../assets/b.jpg";
// import foodImage2 from "../../assets/a.jpeg";

const Bio = () => {
    return (
        <Box width="80%" margin="80px auto">
            <Box mt={10} mb={15}>
                <Typography variant="h2" align="center" mb={5}>
                    Delivery Information
                </Typography>
                <Paper
                    elevation={0}
                    sx={{ padding: "30px", borderRadius: "10px" }}
                >
                    <Typography variant="h4" mb={2} align="center">
                        {/* Executive Chef, Jane Doe */}
                    </Typography>
                    <Typography>
                        {/* Jane Doe is an experienced chef, having worked in some
                        of the finest restaurants in the world. She is
                        passionate about creating dishes that are not only
                        delicious but also visually stunning. */}
                    </Typography>
                </Paper>
            </Box>
            <Box mt={10} mb={15}>
                <Typography variant="h2" align="center" mb={5}>
                    DISCLAIMER
                </Typography>
                <Paper
                    elevation={0}
                    sx={{ padding: "30px", borderRadius: "10px" }}
                >
                    <Typography>
                        I am a healer constantly in training. Working with the
                        fungi and plants and resources available to me. I am not
                        a medical professional and should in no way my words or
                        products be used or referred to in place of professional
                        medical advice and treatment. I work with organic
                        systems of growth, harvest and extraction, to create
                        folk-elixirs from safe mushrooms and plants intended to
                        be taken as food supplements alongside a healthy diet
                        and lifestyle. Everything I write is my own copyright
                        and words, and comes from extensive research I’ve done,
                        much of which has been available to me through open
                        resources and is accessible online. I am dedicated to
                        providing accessible, affordable, and ethical products
                        that make a difference Please do your own research for
                        your personal needs and always professional advice when
                        using medications.
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
};

export default Bio;
