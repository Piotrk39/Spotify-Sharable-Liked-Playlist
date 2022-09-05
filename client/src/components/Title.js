import { Paper, Typography, Box } from '@mui/material';
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Title() {

    const listItems = ['1. Click "Login to Spotify" button', '2. After you finish the process and the app recives the Access Token Press below:', '3. "Create Playlist" Button']

    const paperSX = {
        marginLeft: '15%',
        marginRight: '15%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        position: 'relative',
        boxShadow: '#513573',
        background: '#2b2530',
        elevation: 6,
        "&:hover": {
          // boxShadow: 9,
        },
      };

    const listSX = {
        background: '#2b2530',
    }

    return (
        <Paper elevation={12} sx={paperSX} container
        direction="column"
        alignItems="center"
        justify="center"
        >   
            <Typography sx={{color: '#ccc', mb: 2}} variant='h2' align='center'>Favorite to Playlist</Typography>
            <Typography sx={{color: '#ccc',}}>It is an application based around Spotify API that allows you to easily share your liked songs. The mechanism is simple. App creates new playlist and copies the songs from your "Favorite" Playlist so you can share them all with your favorite people.</Typography>
            <Typography sx={{color: '#ccc', mt: 2}}><strong>To create sharable playlist from Favorite Songs just follow the below steps:</strong></Typography>
            <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
                <List sx={listSX}>
                    {listItems.map((value) => (
                        <ListItem
                        key={value}
                        disableGutters
                        >
                        <ListItemText primary={`${value}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Typography sx={{color: '#ccc'}}><strong> Disclaimer:</strong> Currently the application can copy up to 150 songs. If the playlist will not appear in the firs try please click "Login" again.</Typography>
            <Typography sx={{color: '#ccc'}}>This is the beta version available for testing. It can be run locally or if you'd like just to test it please contact me becouse each user has to be added to the list of users before the roll out.</Typography>   
        </Paper>
    );
}

export default Title;