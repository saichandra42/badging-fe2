import { createMuiTheme } from "@material-ui/core/styles";

const OVERRIDES = {
  MuiAppBar: {
    root: {
      backgroundColor: "#141414 !important",
    },
  },
  MuiOutlinedInput: {
    input: {
      fontSize: "0.75rem",
    },
  },
};

const EY_TYPOGRAPHY = {
  body1: {
    color: "#fff",
  },
  h4: {
    fontSize: "2rem",
    fontWeight: "100",
  },
};

const outerTheme = createMuiTheme({
  overrides: OVERRIDES,
  typography: EY_TYPOGRAPHY,
});

const theme = {
  ...outerTheme,
};

export default theme;
