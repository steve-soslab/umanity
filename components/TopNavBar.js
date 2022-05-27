import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import { Auth } from "aws-amplify";

const TopNavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Image height={25} width={40} src="/BETIA_logo_file.png" alt="logo" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 3 }}>
            RACELAB | Umanity Professional Tips
          </Typography>
          <Button onClick={async () => await Auth.signOut()} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default TopNavBar;
