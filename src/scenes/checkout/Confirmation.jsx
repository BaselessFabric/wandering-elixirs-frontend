import { Box, Alert, AlertTitle, useTheme } from "@mui/material";

const Confirmation = () => {
    const theme = useTheme();
    return (
        <Box 
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="80%" 
            margin="auto"
            height="calc(100vh - 150px)" // Full viewport height minus navbar and footer
            pt="80px" // Add padding for navbar
        >
            <Alert 
                severity="success"
                sx={{
                    backgroundColor: theme.palette.primary[100], // Use light primary from theme
                    color: theme.palette.primary[900], // Use dark primary from theme
                    '.MuiAlert-icon': {
                        color: theme.palette.primary.main, // Make the checkmark icon match
                    }
                }}
            >
                <AlertTitle sx={{ fontWeight: 'bold' }}>Success</AlertTitle>
                You have successfully made an Order -{" "}
                <strong>Congratulations on making your purchase!</strong>
            </Alert>
        </Box>
    );
};

export default Confirmation;
