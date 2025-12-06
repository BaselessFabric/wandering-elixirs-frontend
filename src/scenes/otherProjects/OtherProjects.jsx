import { Box, Grid, Typography, Modal, useTheme, Paper } from "@mui/material";
import { useState } from "react";
import chefImage from "../../images/fungalsurv.jpg";
import foodImage1 from "../../images/workshop.jpg";

// Standalone Project component for better structure and readability
const Project = ({ project, openLightbox }) => {
    const theme = useTheme();
    const { image, title, description } = project;

    // Helper to render description content which can be a string or an array of strings
    const renderDescription = () => {
        if (Array.isArray(description)) {
            return description.map((text, index) => (
                <Typography key={index} variant="body1" sx={{ lineHeight: 1.8, color: theme.palette.neutral[800] }} mb={2}>
                    {text}
                </Typography>
            ));
        }
        return (
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: theme.palette.neutral[800] }}>
                {description}
            </Typography>
        );
    };

    return (
        <Grid item xs={12} md={6}>
            <Paper 
                elevation={0}
                sx={{
                    padding: { xs: "20px", md: "30px" },
                    borderRadius: "8px",
                    backgroundColor: theme.palette.neutral[100],
                    border: `1px solid ${theme.palette.neutral[200]}`,
                    height: '100%'
                }}
            >
                <Box
                    onClick={() => openLightbox(image)}
                    sx={{
                        cursor: "pointer",
                        overflow: "hidden",
                        borderRadius: "8px",
                        mb: 3,
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.08)'
                    }}
                >
                    <img
                        src={image}
                        alt={title}
                        style={{
                            width: "100%",
                            display: "block",
                            transition: 'transform 0.3s ease-in-out',
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </Box>
                <Typography variant="h3" align="left" mb={2} color={theme.palette.neutral[900]}>
                    {title}
                </Typography>
                {renderDescription()}
            </Paper>
        </Grid>
    );
};

const OtherProjects = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const theme = useTheme();

    const projects = [
        {
            image: chefImage,
            title: "Field Mycology – Fungal Biodiversity Surveys",
            description: "Please get in touch if you would like to talk about having a Fungal Diversity survey on your land. Knowing what fungi are growing on your land and how they are interacting with the trees and plants you work or live with is key to growing biodiversity and understanding the potential threats and allies to your growing projects. Be part of helping understand the UK’s fungal networks and learn about the networks beneath your feet. Contribute to important citizen science and become acquainted with your local fungal friends.",
        },
        {
            image: foodImage1,
            title: "Workshops and Talks",
            description: [
                "I offer workshops at events and nature centres in the UK. Please get in touch if you’d be interested in hosting or collaborating with one of the following workshops or talks.",
                "Healing Fungi – A comprehensive introduction to medicinal mushrooms native to the UK, and how to identify, process and produce a healing elixir with them. Attendees of this workshop will learn how to make a dual extraction and take a bottle home. All participants must be over the age of 16 unless accompanied by an adult.",
                "Meeting Mushrooms – A interactive sensory talk with fresh and dried mushrooms specimens that hold potent knowledge and stories. Learning to identify and notice the smaller aspects and unseen clues the forest provides. Includes; understanding identification, honouring the fungal landscape, ethical harvesting, lifecycle and wider ecological impacts of fungi.",
                "Myco-Immersive foray – A foray with a difference. Includes a planned 1.5 hour walk to look at the native fungal species, collect potentially edible species to sample, and learn the key factors to identification, harvesting, and intentional journeying in the forest. Includes chai and cake in the break! All participants must be over the age of 16 unless accompanied by an adult."
            ],
        },
    ];

    const openLightbox = (image) => setSelectedImage(image);
    const closeLightbox = () => setSelectedImage(null);

    return (
        <Box width="80%" margin="auto" pt="100px" pb="80px">
            <Typography variant="h2" align="center" mb={6} color={theme.palette.neutral[900]}>
                Other Projects by Rosy
            </Typography>
            <Grid container spacing={4}>
                {projects.map((project, index) => (
                    <Project
                        key={index}
                        project={project}
                        openLightbox={openLightbox}
                    />
                ))}
            </Grid>
            <Modal open={selectedImage !== null} onClose={closeLightbox}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "90vw",
                        maxHeight: "90vh",
                        bgcolor: 'background.paper',
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: 24,
                    }}
                >
                    <img
                        src={selectedImage}
                        alt="Selected Project"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                        }}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

export default OtherProjects;
