import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import querystring from 'query-string';
import axios from 'axios';

const app = express();
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

//routes

//GET main route to the Button page

app.get('/', (req, res) => {
    const data = {
        name: 'hello',
        isAwesome: true
    };
    res.json(data);
    console.log('this is the main path');
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
let text = '';
const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
}
return text;
};
  
  
const stateKey = 'spotify_auth_state';

// GET to the login page so user can login to spotify and  get redirected to callback function

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = 'playlist-modify-public playlist-read-private playlist-modify-private user-read-private user-library-read'

    const queryParams = querystring.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        state: state,
        scope: scope
    });

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

// Callback route handler

app.get('/callback', (req, res) => {
    const code = req.query.code || null;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(process.env.SECRET_ID).toString('base64')}`,
      },
    })
    .then(response => {
        if (response.status === 200) {

            const { access_token, refresh_token } = response.data;

            const queryParams = querystring.stringify({
                access_token,
                refresh_token
            })
    
            res.redirect(`https://cozy-kangaroo-1ffee6.netlify.app/?${queryParams}`)
    
        } else {
            res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
          }
        })
        .catch(error => {
          res.send(error);
          console.log(error);
        });
    });

// Refresh Token 

app.get('/refresh_token', (req, res) => {
    const {refresh_token} = req.query;
    
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(process.env.SECRET_ID).toString('base64')}`,
      },
    })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });
});

//Connecting to mongoDB

const CONNECTION_URL = process.env.CONNECTION_URI;
const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log('Server running on port: ' + PORT)))
    .catch((error) => console.log(error.message));
