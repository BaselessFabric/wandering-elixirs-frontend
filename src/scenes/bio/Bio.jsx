import { Box, Grid, Paper, Typography } from "@mui/material";
import chefImage from "../../assets/profile.jpg";
// import foodImage1 from "../../assets/b.jpg";
// import foodImage2 from "../../assets/a.jpeg";

const Bio = () => {
    return (
        <Box width="80%" margin="80px auto">
            <Box mt={10} mb={15}>
                <Typography variant="h2" align="center" mb={5}>
                    About The Maker
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Grid container>
                            <img
                                src={chefImage}
                                alt="Chef"
                                style={{ width: "100%", borderRadius: "10px" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    padding: "30px",
                                    borderRadius: "10px",
                                    display: "flex",
                                }}
                            >
                                <Typography textAlign="center">
                                    Contact me at:
                                    <a
                                        href="mailto:Rosy@WanderingElixirs.com"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Rosy@WanderingElixirs.com
                                    </a>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Paper
                            elevation={0}
                            sx={{ padding: "30px", borderRadius: "10px" }}
                        >
                            <Typography variant="h4" mb={2}>
                                My Mushroom Journey
                            </Typography>
                            <Typography>
                                My inspiration for Wandering Elixirs started at
                                the roots, through a fascination with decay and
                                rebirth, which, through artistic exploration,
                                and inquisition into the natural world lead me
                                to the realm of fungi. Through connecting on a
                                deeper level with fungal organisms, immersing
                                myself in their life cycle, I became fascinated
                                with their abilities of transformation. I was
                                already engaged in the study of permaculture and
                                herbal medicine, learning more about the
                                medicinal properties of mushrooms was a step
                                towards my future.
                                <br />
                                <br /> My father was diagnosed with throat
                                cancer four years ago, and my dive into
                                medicinal mushroom therapy got deeper. I have
                                been foraging, growing, and extracting from
                                mushrooms ever since. They are part of me and my
                                family’s daily routine as preventative
                                supplements and immune system regulators. I am
                                happy to say that through using complementary
                                mushroom therapy along side radiotherapy, and
                                fantastic NHS care, my father has now made a
                                full recovery and is still using our native
                                fungal species to boost his resilience daily.
                                <br />
                                <br /> I believe the plant and fungal allies
                                that aid us are also there to teach us, and if
                                we open ourselves to their wisdom we can find
                                simple, effective ways of balancing our bodies
                                back into harmony with our environment. I want
                                to be able to offer people an alternative, a way
                                of learning about and experiencing these
                                mushrooms in a safe and considered space. Caring
                                for our environment as we do our bodies,
                                re-learning the respect for our physical being
                                and how to nourish and cherish our entire
                                microbiome.
                                <br />
                                <br /> I have worked as an educator, giving
                                workshops in medicinal mushrooms, mushroom
                                cultivation, foraging, and sensory exploration
                                with fungi. These have had an impact on people,
                                bringing together those in the community looking
                                for a natural way to improve their health, and
                                seeking a deeper understanding of such a
                                misunderstood part of our environment.
                                <br /> Mushrooms play a vital role in our
                                eco-system and in our bodies, research and
                                historical use has shown a range of beneficial
                                and preventative compounds within many species
                                common to the UK. Shown to have positive effects
                                on the immune system as an immunomodulator, and
                                containing compounds such as flavonoids,
                                terpenes, and anti-oxidants, they are able to
                                target free radicals in the body and improve and
                                aid inflammation, digestion, stress, anxiety and
                                hormonal difficulties.
                                <br /> Thank-you for visiting my website. If
                                you’d like to know more about me and my
                                inquiries into the fungal realm, please get in
                                touch. I love to collaborate with researchers,
                                artists, and wild- crafters. I’m available to
                                offer surveys and workshops, please take a look
                                at my other projects.
                                <br /> Love and thanks, Rosy Mushroom
                                <br /> rosy@wanderingelixirs.com
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Bio;
