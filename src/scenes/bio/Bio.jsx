import { Box, Grid, Paper, Typography } from "@mui/material";
import chefImage from "../../assets/a.jpeg";
import foodImage1 from "../../assets/b.jpg";
import foodImage2 from "../../assets/a.jpeg";

const Bio = () => {
    return (
        <Box width="80%" margin="80px auto">
            <Box mt={10} mb={15}>
                <Typography variant="h2" align="center" mb={5}>
                    About The Maker
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <img
                            src={chefImage}
                            alt="Chef"
                            style={{ width: "100%", borderRadius: "10px" }}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper
                            elevation={0}
                            sx={{ padding: "30px", borderRadius: "10px" }}
                        >
                            <Typography variant="h4" mb={2}>
                                Executive Chef, Jane Doe
                            </Typography>
                            <Typography>
                                Jane Doe is an experienced chef, having worked
                                in some of the finest restaurants in the world.
                                She is passionate about creating dishes that are
                                not only delicious but also visually stunning.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Bio;
