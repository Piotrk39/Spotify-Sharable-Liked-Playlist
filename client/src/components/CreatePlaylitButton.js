import React from "react";
import { Button, Grid } from "@mui/material";

function CreatePlaylistButton(props) {

    const buttonSX = {
        mt: 10,
        mb: 5,
        background: '#1ed760',
        width: 230,
        "&:hover": {
          color: '#1ed760',
          backgroundColor: '#faf9f7'
        },
      }
    
    return (
      <Grid >     
        <Button
        onClick={props.click}
        size="large"
        variant='contained' 
        sx={buttonSX}
        >
          <img 
            className="icon" 
            src={require('./icons/spotify.png')}
            alt="logo"
          >
          </img>
          {props.name}
        </Button>  
      </Grid>
    );
  };
  
  export default CreatePlaylistButton;