import { Box, Grid, Paper, Typography, useTheme, Link } from "@mui/material";
import chefImage from "../../images/profile.jpg";

const Bio = () => {
    const theme = useTheme();
    const paragraphs = [
        "My inspiration for Wandering Elixirs started at the roots, through a fascination with decay and rebirth, which, through artistic exploration, and inquisition into the natural world lead me to the realm of fungi. Through connecting on a deeper level with fungal organisms, immersing myself in their life cycle, I became fascinated with their abilities of transformation. I was already engaged in the study of permaculture and herbal medicine, learning more about the medicinal properties of mushrooms was a step towards my future.",
        "My father was diagnosed with throat cancer four years ago, and my dive into medicinal mushroom therapy got deeper. I have been foraging, growing, and extracting from mushrooms ever since. They are part of me and my family’s daily routine as preventative supplements and immune system regulators. I am happy to say that through using complementary mushroom therapy along side radiotherapy, and fantastic NHS care, my father has now made a full recovery and is still using our native fungal species to boost his resilience daily.",
        "I believe the plant and fungal allies that aid us are also there to teach us, and if we open ourselves to their wisdom we can find simple, effective ways of balancing our bodies back into harmony with our environment. I want to be able to offer people an alternative, a way of learning about and experiencing these mushrooms in a safe and considered space. Caring for our environment as we do our bodies, re-learning the respect for our physical being and how to nourish and cherish our entire microbiome.",
        "I have worked as an educator, giving workshops in medicinal mushrooms, mushroom cultivation, foraging, and sensory exploration with fungi. These have had an impact on people, bringing together those in the community looking for a natural way to improve their health, and seeking a deeper understanding of such a misunderstood part of our environment.",
        "Mushrooms play a vital role in our eco-system and in our bodies, research and historical use has shown a range of beneficial and preventative compounds within many species common to the UK. Shown to have positive effects on the immune system as an immunomodulator, and containing compounds such as flavonoids, terpenes, and anti-oxidants, they are able to target free radicals in the body and improve and aid inflammation, digestion, stress, anxiety and hormonal difficulties.",
        "Thank-you for visiting my website. If you’d like to know more about me and my inquiries into the fungal realm, please get in touch. I love to collaborate with researchers, artists, and wild- crafters. I’m available to offer surveys and workshops, please take a look at my other projects.",
        "Love and thanks, Rosy Mushroom",
        "rosy@wanderingelixirs.com"
    ];

    return (
        <Box width="80%" margin="auto" pt="100px" pb="80px"> {/* Added top/bottom padding */}
            <Typography variant="h2" align="center" mb={6} color={theme.palette.neutral[900]}>
                About The Maker
            </Typography>
            <Grid container spacing={5}>
                <Grid item xs={12} md={4}>
                    <Box sx={{ position: 'sticky', top: '100px' }}> {/* Makes the image stick on scroll */}
                        <img
                            src={chefImage}
                            alt="Rosy Mushroom"
                            style={{ width: "100%", borderRadius: "8px", boxShadow: '0px 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Typography textAlign="center" mt={3} variant="h6">
                            Contact me at:
                            <Link
                                href="mailto:Rosy@WanderingElixirs.com"
                                underline="hover"
                                sx={{ 
                                    display: 'block', 
                                    mt: 1, 
                                    color: theme.palette.primary.main, 
                                    fontWeight: 'bold' 
                                }}
                            >
                                Rosy@WanderingElixirs.com
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper
                        elevation={0}
                        sx={{ 
                            padding: { xs: "20px", md: "40px" }, 
                            borderRadius: "8px", 
                            backgroundColor: theme.palette.neutral[100],
                            border: `1px solid ${theme.palette.neutral[200]}`
                        }}
                    >
                        <Typography variant="h3" mb={4} color={theme.palette.neutral[900]}>
                            My Mushroom Journey
                        </Typography>
                        {paragraphs.map((p, index) => (
                            <Typography key={index} variant="body1" mb={3} sx={{ lineHeight: 1.8, color: theme.palette.neutral[800] }}>
                                {p}
                            </Typography>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Bio;

