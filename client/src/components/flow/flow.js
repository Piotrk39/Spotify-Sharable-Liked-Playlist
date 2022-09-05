import axios from 'axios';

const querystring = window.location.search;
const urlParams = new URLSearchParams(querystring);
const accessToken = urlParams.get('access_token');

const CreatePlaylist = () => {
    const tracksURIS = [];
    const tracksURIS1 = [];
    const tracksURIS2 = [];

    const configGetUsersData = {
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: { 
        'Authorization': 'Bearer ' + accessToken, 
      }
    };

    const dataCreatePlaylist = JSON.stringify({
      "name": "Playlist from liked songs1",
      "description": "Test playlist to add and remove songs",
      "public": true
    });

    axios(configGetUsersData)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      console.log(JSON.stringify(response.data.id));
      console.log(JSON.stringify(response.data.display_name));
      const userID = response.data.id;
      return axios({
        method: 'post',
        url: `https://api.spotify.com/v1/users/${userID}/playlists`,
        headers: { 
          'Authorization': "Bearer " + accessToken, 
          'Content-Type': 'application/json', 
        },
        data : dataCreatePlaylist
      })
      .then(function (res) {
        console.log(JSON.stringify(res.data));
        console.log(JSON.stringify(res.data.id));
        const playlistID = res.data.id;
        return axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/me/tracks?market=PL&limit=50&offset=0',
          headers: { 
            'Authorization': "Bearer " + accessToken, 
            'Content-Type': 'application/json', 
          },
        })
        .then(function(resp) {
          for (let i = 0; i < 50; i++) {tracksURIS.push(resp.data.items[i].track.uri)}
          console.log(tracksURIS);
          return axios({
            method: 'post',
            url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${tracksURIS}`,
            headers: { 
              'Authorization': "Bearer " + accessToken, 
              'Content-Type': 'application/json', 
            },
          })
          .then(function (resp) {
            return axios({
              method: 'get',
              url: 'https://api.spotify.com/v1/me/tracks?market=PL&limit=50&offset=51',
              headers: { 
                'Authorization': "Bearer " + accessToken, 
                'Content-Type': 'application/json', 
              },
            })
            .then(function (resp){
              for (let i = 0; i < 50; i++) {tracksURIS1.push(resp.data.items[i].track.uri)}
              console.log(tracksURIS1)
              return axios({
                method: 'post',
                url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${tracksURIS1}`,
                headers: { 
                  'Authorization': "Bearer " + accessToken, 
                  'Content-Type': 'application/json', 
                },
              })
              .then(function (resp){
                return axios({
                  method: 'get',
                  url: 'https://api.spotify.com/v1/me/tracks?market=PL&limit=50&offset=101',
                  headers: { 
                    'Authorization': "Bearer " + accessToken, 
                    'Content-Type': 'application/json', 
                  },
                })
                .then(function (resp){
                  for (let i = 0; i < 50; i++) {tracksURIS2.push(resp.data.items[i].track.uri)}
                  console.log(tracksURIS2)
                  return axios({
                    method: 'post',
                    url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${tracksURIS2}`,
                    headers: { 
                      'Authorization': "Bearer " + accessToken, 
                      'Content-Type': 'application/json', 
                    },
                  })
                  .then(function (resp){
                    console.log(resp);
                  })
                })
              })
            })
          })
        })
      })
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default CreatePlaylist;