import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const handlePageChangeGitHub = () => {
        window.open("https://github.com/Piotrk39/Spotify-Sharable-Liked-Playlist", "_blank");
     }
 
     const handlePageChangeLinkedIn = () => {
         window.open("https://www.linkedin.com/in/piotrk39/", "_blank");
     }
 
     const handleEmail = () => {
         window.open('mailto:piotrk39@gmail.com?subject=Subject&body=Body%20goes%20here');
     }
 
     const actionButtonSX = {
         color: "#1ed760",
         paddingLeft: 4,
         paddingRight: 4,
         "&:hover": {
             color: '#332f2f',
         },
     }

    return (
        <footer>
            <p>Piotr Krajewski © {currentYear}</p>
            
              <GitHubIcon className="icon" sx={actionButtonSX} onClick={handlePageChangeGitHub}></GitHubIcon> 
              <LinkedInIcon className="icon" sx={actionButtonSX} onClick={handlePageChangeLinkedIn}></LinkedInIcon> 
              <EmailIcon className="icon" sx={actionButtonSX} onClick={handleEmail}></EmailIcon>
        </footer>
    );
};

export default Footer;