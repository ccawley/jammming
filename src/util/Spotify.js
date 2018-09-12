let usersAccessToken;
const clientId = 'client_id=e1544d3bed444788bb6a705c22207d64';
const redirectUri = '&redirect_uri=http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (usersAccessToken) {
      return usersAccessToken
    }
    let accessToken = window.location.href.match(/access_token=([^&]*)/);
    let tokenExpiration = window.location.href.match(/expires_in=([^&]*)/);
    if (accessToken && tokenExpiration) {
      usersAccessToken = accessToken[1];
      let expirationTime = Number(tokenExpiration[1]);
      window.setTimeout(() => usersAccessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');
      return usersAccessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?${clientId}&response_type=token&scope=playlist-modify-public&${redirectUri}`;
    }
  },

  async search(searchTerm) {
    let token = Spotify.getAccessToken();
    let headersObj = {
      headers: {Authorization: `Bearer ${token}`}
    };
    let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, headersObj);
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      };
  },

  async savePlaylist(playlistName, trackUrisArr) {
    if (playlistName && trackUrisArr) {
      let accessToken = Spotify.getAccessToken();
      let headers = {
        headers: {Authorization: `Bearer ${accessToken}`}
      };
      let userId;
      let playlistId;
      let response = await fetch(`https://api.spotify.com/v1/me`, headers);
      if (response.ok) {
        let jsonResponse = await response.json();
        userId = jsonResponse.body.id;

        let secondResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': `application/json`
          },
          body: {
            name: playlistName
          }
        })
        if (secondResponse.ok) {
          let jsonResponse = await response.json();
          playlistId = jsonResponse.body.id;

          let thirdResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': `application/json`
            },
            body: {
              uris: trackUrisArr
            }
          })
          if (thirdResponse.ok) {
            let jsonResponse = await response.json();
            playlistId = jsonResponse.body.id;
          }
        }
      }
      throw new Error('Request failed');
    } else {
      return;
    }
  }
  // ORIGINAL ATTEMPT/THOUGHT PROCESS BELOW, REFACTORED ABOVE BUT STILL NOT WORKING :(
  // savePlaylist(playlistName, trackUrisArr) {
  //   if (playlistName && trackUrisArr) {
  //     return async() => {
  //       try {
  //         let accessToken = usersAccessToken;
  //         let headers = {
  //           headers: {Authorization: `Bearer ${accessToken}`}
  //         };
  //         let userId;
  //         let playlistId;
  //         let response = await fetch(`https://api.spotify.com/v1/me`, headers);
  //         if (response.ok) {
  //           let jsonResponse = await response.json();
  //           userId = jsonResponse.body.id;
  //         }
  //         let secondResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
  //           method: 'POST',
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             'Content-Type': `application/json`
  //           },
  //           body: {
  //             name: playlistName
  //           }
  //         })
  //         if (secondResponse.ok) {
  //           let jsonResponse = await response.json();
  //           playlistId = jsonResponse.body.id;
  //         }
  //         let thirdResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
  //           method: 'POST',
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             'Content-Type': `application/json`
  //           },
  //           body: {
  //             uris: trackUrisArr
  //           }
  //         })
  //         if (thirdResponse.ok) {
  //           let jsonResponse = await response.json();
  //           playlistId = jsonResponse.body.id;
  //         }
  //         throw new Error('Request failed');
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   } else {
  //     return;
  //   }
  // }

};

export default Spotify;
