import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import CreatePlaylistButton from "./CreatePlaylitButton";
import CreatePlaylist from "./flow/flow";

function LoginButton() {

  useEffect(() => {
    const querystring = window.location.search;
    const urlParams = new URLSearchParams(querystring);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');

    console.log(accessToken);
    console.log(refreshToken);
    
  }, [])

  const querystring = window.location.search;
  const urlParams = new URLSearchParams(querystring);
  const accessToken = urlParams.get('access_token');

  const buttonSX = {
    mt: 5,
    background: '#1ed760',
    width: 230,
    "&:hover": {
      color: '#1ed760',
      backgroundColor: '#faf9f7'
    },
  }
  
  return (
    <Grid textAlign='center'>     
      <Button 
      href="https://liked-to-playlist.herokuapp.com/login"
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
        {accessToken ? 'Logged in' : 'Login to Spotify'}
      </Button>
      
      <CreatePlaylistButton
        click={CreatePlaylist}
        name={accessToken ? 'Create Playlist' : 'Please Log in'}
      />
    </Grid>
  );
};

export default LoginButton;