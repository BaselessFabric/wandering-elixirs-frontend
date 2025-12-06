import { Box, Paper, Typography, useTheme } from "@mui/material";

const Delivery = () => {
    const theme = useTheme();

    const disclaimerText = "I am a healer constantly in training. Working with the fungi and plants and resources available to me. I am not a medical professional and should in no way my words or products be used or referred to in place of professional medical advice and treatment. I work with organic systems of growth, harvest and extraction, to create folk-elixirs from safe mushrooms and plants intended to be taken as food supplements alongside a healthy diet and lifestyle. Everything I write is my own copyright and words, and comes from extensive research I’ve done, much of which has been available to me through open resources and is accessible online. I am dedicated to providing accessible, affordable, and ethical products that make a difference Please do your own research for your personal needs and always professional advice when using medications.";
    
    const deliveryParagraphs = [
        "1-3 Day processing time Flat Rate",
        "£5.99 UK Royal Mail 1st class",
        "Shipping subject to weight limits. Very large orders will be individually calculated.",
        "Unfortunately I’m not currently able to process international orders.",
        "Thank-You for choosing my little business, I’m working alone and appreciate all the support and encouragement that I’m on the right path. Follow me on instagram for updates and more information. I’m always happy to receive questions and queries. Thanks again, Rosy Mushroom"
    ];

    const Section = ({ title, children }) => (
        <Box mb={8}>
            <Typography variant="h2" align="center" mb={5} color={theme.palette.neutral[900]}>
                {title}
            </Typography>
            <Paper
                elevation={0}
                sx={{
                    padding: { xs: "20px", md: "40px" },
                    borderRadius: "8px",
                    backgroundColor: theme.palette.neutral[100],
                    border: `1px solid ${theme.palette.neutral[200]}`
                }}
            >
                {children}
            </Paper>
        </Box>
    );

    return (
        <Box width="80%" margin="auto" pt="100px" pb="80px">
            <Section title="DISCLAIMER">
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: theme.palette.neutral[800] }}>
                    {disclaimerText}
                </Typography>
            </Section>

            <Section title="Delivery Information">
                {deliveryParagraphs.map((text, index) => (
                    <Typography key={index} variant="body1" mb={2} sx={{ lineHeight: 1.8, color: theme.palette.neutral[800] }}>
                        {text}
                    </Typography>
                ))}
            </Section>
        </Box>
    );
};

export default Delivery;

