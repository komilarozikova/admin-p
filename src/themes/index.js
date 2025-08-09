// src/theme/index.js
import { createTheme } from "@mui/material/styles";
import colors from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.app_color,
    },
    secondary: {
      main: colors.primary_turquoise,
    },
    error: {
      main: colors.color_red,
    },
    success: {
      main: colors.color_green,
    },
    neutral: {
      main: colors,
      light: colors.neutral_grey_1,
      medium: colors.neutral_grey_2,
      dark: colors.neutral_grey_3,
    },
  },
});

export default theme;
