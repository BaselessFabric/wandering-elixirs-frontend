import { Box, Typography, useTheme } from "@mui/material"; // Import useTheme

const Footer = () => {
  const theme = useTheme(); // Access the new theme
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      width="100%"
      minHeight="80px" // Increased height slightly
      backgroundColor={theme.palette.neutral.light} // Use light neutral for background
      color={theme.palette.neutral.dark} // Use dark neutral for text
      padding="20px 0" // Add vertical padding
      // bottom="0" // Removed: footers usually follow content
      // left="0" // Removed: footers usually follow content
      // zIndex="1" // Removed: footers usually follow content
      sx={{ mt: 'auto' }} // Pushes footer to bottom if content is short
    >
      <Typography
        onClick={() =>
          (window.location.href = "https://github.com/BaselessFabric")
        }
        sx={{ cursor: "pointer", color: theme.palette.neutral.dark, '&:hover': { color: theme.palette.primary.main } }}
        textAlign="center"
      >
        Website Developed by Alex Walls (GitHub)
      </Typography>
    </Box>
  );
};

export default Footer;
