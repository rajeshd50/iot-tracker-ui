import { createTheme, ThemeOptions } from "@mui/material/styles";
import { ComponentOverrides } from "./components/component.override";
import { PaletteOverRide } from "./components/palette.override";
import { TypographyOverRides } from "./components/typography.override";

const themeOptions: ThemeOptions = {
  palette: PaletteOverRide,
  typography: TypographyOverRides,
  components: ComponentOverrides,
};

const theme = createTheme(themeOptions);

export default theme;
