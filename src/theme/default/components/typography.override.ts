import { TypographyOptions } from "@mui/material/styles/createTypography";
import { grey } from "@mui/material/colors";

export const TypographyOverRides: TypographyOptions = {
  fontSize: 12,
  htmlFontSize: 14,
  h1: {
    fontSize: "3rem",
    fontWeight: 800,
  },
  h2: {
    fontSize: "2.8rem",
    fontWeight: 600,
  },
  h3: {
    fontSize: "2.5rem",
    fontWeight: 500,
  },
  h4: {
    fontSize: "2rem",
  },
  h5: {
    fontSize: "1.5rem",
  },
  h6: {
    fontSize: "1rem",
  },
  subtitle1: {
    fontSize: "1rem",
    color: grey[600],
  },
  subtitle2: {
    fontSize: "0.75rem",
    color: grey[600],
  },
};
