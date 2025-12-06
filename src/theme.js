import { createTheme } from "@mui/material/styles";

export const shades = {
    primary: {
        100: "#d9e8da", // Lightest green
        200: "#b3d9b8",
        300: "#87b38d",
        400: "#5a8c60",
        500: "#386641", // Deep Forest Green
        600: "#2d5234",
        700: "#223e27",
        800: "#172b1a",
        900: "#0c180d",
    },
    secondary: {
        100: "#f5dbdc", // Lightest terracotta accent
        200: "#ebafb0",
        300: "#e28385",
        400: "#d65b5d",
        500: "#bc4749", // Muted Terracotta
        600: "#96393b",
        700: "#712a2c",
        800: "#4b1c1d",
        900: "#260e0e",
    },
    neutral: {
        100: "#fcfcfc", // Warmest light gray
        200: "#eae7e7",
        300: "#d4d0d0",
        400: "#bdb8b8",
        500: "#a29d9d", // Medium Gray
        600: "#827e7e",
        700: "#615f5f",
        800: "#413f3f",
        900: "#201f1f", // Darkest gray
    },
};

export const theme = createTheme({
    palette: {
        primary: {
            main: shades.primary[500],
        },
        secondary: {
            main: shades.secondary[500],
        },
        neutral: { // Corrected "meutral" to "neutral"
            dark: shades.neutral[700],
            main: shades.neutral[500],
            light: shades.neutral[100],
        },
    },
    typography: {
        fontFamily: ["Roboto", "sans-serif"].join(","), // Default body font
        fontSize: 16, // Increased base font size for better readability
        h1: {
            fontFamily: ["Lora", "serif"].join(","),
            fontSize: 60, // Adjusted size for modern feel
        },
        h2: {
            fontFamily: ["Lora", "serif"].join(","),
            fontSize: 48,
        },
        h3: {
            fontFamily: ["Lora", "serif"].join(","),
            fontSize: 32,
        },
        h4: {
            fontFamily: ["Lora", "serif"].join(","),
            fontSize: 24,
        },
        h5: { // Added h5 for more granular control
            fontFamily: ["Lora", "serif"].join(","),
            fontSize: 18,
        },
        h6: { // Added h6
            fontFamily: ["Lora", "serif"].join(","),
            fontSize: 16,
        },
    },
});
