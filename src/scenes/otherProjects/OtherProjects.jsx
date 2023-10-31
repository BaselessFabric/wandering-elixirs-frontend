import { Box, Grid, Typography, Modal } from "@mui/material";
import { useState } from "react";
import chefImage from "../../assets/a.jpeg";
import foodImage1 from "../../assets/b.jpg";
// import foodImage2 from "../../assets/a.jpeg";

// Create a new component for displaying each project
const Project = ({ project, openLightbox }) => {
    const { image, title, description } = project;

    return (
        <Grid item xs={12} md={6}>
            <img
                src={image}
                alt={title}
                style={{
                    width: "100%",
                    borderRadius: "10px",
                    cursor: "pointer",
                }}
                onClick={() => openLightbox(image)}
            />
            <Typography variant="h4" align="center" mt={2}>
                {title}
            </Typography>
            <Typography align="center">{description}</Typography>
        </Grid>
    );
};

const OtherProjects = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const projects = [
        {
            image: chefImage,
            title: "Field Mycology – Fungal biodiversity Surveys",
            description:
                "Please get in touch if you would like to talk about having a Fungal Diversity survey on your land. Knowing what fungi are growing on your land and how they are interacting with the trees and plants you work or live with is key to growing biodiversity and understanding the potential threats and allies to your growing projects. Be part of helping understand the UK’s fungal networks and learn about the networks beneath your feet. Contribute to important citizen science and become acquainted with your local fungal friends.",
        },
        {
            image: foodImage1,
            title: "Workshops and Talks",
            description: (
                <>
                    "I offer workshops at events and nature centres in the UK.
                    Please get in touch if you’d be interested in hosting or
                    collaborating with one of the following workshops or talks.
                    <br />
                    <br /> Healing Fungi – A comprehensive introduction to
                    medicinal mushrooms native to the UK, and how to identify,
                    process and produce a healing elixir with them. Attendees of
                    this workshop will learn how to make a dual extraction and
                    take a bottle home. All participants must be over the age of
                    16 unless accompanied by an adult <br />
                    <br /> Meeting Mushrooms – A interactive sensory talk with
                    fresh and dried mushrooms specimens that hold potent
                    knowledge and stories. Learning to identify and notice the
                    smaller aspects and unseen clues the forest provides.
                    Includes; understanding identification, honouring the fungal
                    landscape, ethical harvesting, lifecycle and wider
                    ecological impacts of fungi. <br /> <br /> Myco-Immersive
                    foray – A foray with a difference. Includes a planned 1.5
                    hour walk to look at the native fungal species, collect
                    potentially edible species to sample, and learn the key
                    factors to identification, harvesting, and intentional
                    journeying in the forest. Includes chai and cake in the
                    break! All participants must be over the age of 16 unless
                    accompanied by an adult."
                </>
            ),
        },
        // {
        //     image: foodImage2,
        //     title: "Tasty Treat",
        //     description:
        //         "Indulge in the flavors of this amazing dish prepared with love and care by our talented chefs.",
        // },
    ];

    const openLightbox = (image) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <Box width="80%" margin="80px auto">
            <Box mt={10} mb={15}>
                <Typography variant="h2" align="center" mb={5}>
                    Other Projects by Rosy
                </Typography>
                <Grid container spacing={3}>
                    {projects.map((project, index) => (
                        <Project
                            key={index}
                            project={project}
                            openLightbox={openLightbox}
                        />
                    ))}
                </Grid>
            </Box>
            <Modal open={selectedImage !== null} onClose={closeLightbox}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "80%",
                        maxHeight: "80%",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={selectedImage}
                        alt="Selected Project"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

export default OtherProjects;
