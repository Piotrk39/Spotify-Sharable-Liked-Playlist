// eslint-disable-next-line

import React from "react";
import { Grid } from '@mui/material';
import DrawerAppBar from "./components/Header"
import Footer from "./components/Footer";
import LoginButton from './components/LoginButton';
import Title from "./components/Title";

const App = () => {
    return (
      <Grid>
        <DrawerAppBar />
        <Title />
        <LoginButton />
        <Footer />
      </Grid>
    );
  };
  
  export default App;