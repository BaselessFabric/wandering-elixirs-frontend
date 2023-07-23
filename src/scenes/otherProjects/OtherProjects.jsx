import { Box, Grid, Typography, Modal } from "@mui/material";
import { useState } from "react";
import chefImage from "../../assets/a.jpeg";
import foodImage1 from "../../assets/b.jpg";
import foodImage2 from "../../assets/a.jpeg";

const OtherProjects = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const images = [chefImage, foodImage1, foodImage2];

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
                    {images.map((image, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <img
                                src={image}
                                alt={`Project ${index + 1}`}
                                style={{
                                    width: "100%",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() => openLightbox(image)}
                            />
                            <Typography variant="h4" align="center" mt={2}>
                                Dish Example {index + 1}
                            </Typography>
                            <Typography align="center">
                                This is a sample dish created by Executive Chef
                                Jane Doe. It showcases her culinary expertise
                                and attention to detail.
                            </Typography>
                        </Grid>
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
