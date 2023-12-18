import { Box, Paper, Typography } from "@mui/material";
// import chefImage from "../../assets/a.jpeg";
// import foodImage1 from "../../assets/b.jpg";
// import foodImage2 from "../../assets/a.jpeg";

const Bio = () => {
    return (
        <Box width="80%" margin="80px auto">
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
            <Box mt={10} mb={15}>
                <Typography variant="h2" align="center" mb={5}>
                    Delivery Information
                </Typography>
                <Paper
                    elevation={0}
                    sx={{ padding: "30px", borderRadius: "10px" }}
                >
                    <Typography>
                        <p>1-3 Day processing time Flat Rate</p>
                        <p>£5.99 UK Royal Mail 1st class</p>
                        <p>
                            shipping Subject to weight limits. Very large orders
                            will be individually calculated
                        </p>
                        <p>
                            Unfortunately I’m not currently able to process
                            international orders
                        </p>
                        <p>
                            Thank-You for choosing my little business, I’m
                            working alone and appreciate all the support and
                            encouragement that I’m on the right path. Follow me
                            on instagram for updates and more information. I’m
                            always happy to receive questions and queries.
                            Thanks again, Rosy Mushroom
                        </p>
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
};

export default Bio;
