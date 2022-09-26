import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    backgroundColor: "#3f51b5",
    position: "fixed",
    bottom: 0,
  },
}));

export const Footer = () => {
  const classes = useStyles();
  return <Box className={classes.root}>copyright 島津昌樹</Box>;
};
