let usersAccessToken;
const clientId = 'client_id=e1544d3bed444788bb6a705c22207d64';
const redirectUri = '&redirect_uri=http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (usersAccessToken) {
      return usersAccessToken
    }
    let accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
    let tokenExpiration = window.location.href.match(/expires_in=([^&]*)/)[1];
    if (accessToken && tokenExpiration) {
      usersAccessToken = accessToken;
      let expirationTime = Number(tokenExpiration);
      window.setTimeout(() => usersAccessToken = '', expirationTime * 1000);
      window.history.pushState('Access Token', null, '/');
      return usersAccessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?${clientId}&response_type=token&scope=playlist-modify-public&${redirectUri}`;
    }
  },
  // ORIGINAL ATTEMPT/THOUGHT PROCESS BELOW, REFACTORED ABOVE BUT STILL NOT WORKING :(
  // getAccessToken() {
  //   if (usersAccessToken) {
  //     return usersAccessToken;
  //   } else if (!usersAccessToken) {
  //     window.location.href = `https://accounts.spotify.com/authorize?${clientId}&response_type=token&scope=playlist-modify-public&${redirectUri}`;
  //     let urlResponse = window.location.href;
  //     usersAccessToken = urlResponse.match(/access_token=([^&]*)/)[0];
  //     expirationTime = urlResponse.match(/expires_in=([^&]*)/)[0];
  //     expirationTime = parseInt(expirationTime[0], 0);
  //     if (!usersAccessToken || !expirationTime) {
  //       window.location.href = `https://accounts.spotify.com/authorize?${clientId}&response_type=token&scope=playlist-modify-public&${redirectUri}`;
  //     } else {
  //       window.setTimeout(() => usersAccessToken = '', expirationTime * 1000);
  //       window.history.pushState('Access Token', null, '/');
  //       return usersAccessToken;
  //     }
  //   }
  // },

  async search(searchTerm) {
    try {
      let token = Spotify.getAccessToken();
      let headersObj = {
        headers: {Authorization: `Bearer ${token}`}
      };
      let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, headersObj);
      if (response.ok) {
        let jsonResponse = await response.json();
        return jsonResponse.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          };
        })
      }
      throw new Error('Request failed!');
    } catch (error) {
      console.log(error);
    }
  },
  // ORIGINAL ATTEMPT/THOUGHT PROCESS BELOW, REFACTORED ABOVE BUT STILL NOT WORKING :(
  // search(searchTerm) {
  //   return async() => {
  //     try {
  //       let headersObj = {
  //         headers: {Authorization: `Bearer ${usersAccessToken}`}
  //       };
  //       let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, headersObj);
  //       if (response.ok) {
  //         let jsonResponse = await response.json();
  //         return jsonResponse.map(track => {
  //           return {
  //             id: track.id,
  //             name: track.name,
  //             artist: track.artists[0].name,
  //             album: track.album.name,
  //             uri: track.uri
  //           };
  //         })
  //       }
  //       throw new Error('Request failed!');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // },

  async savePlaylist(playlistName, trackUrisArr) {
    if (playlistName && trackUrisArr) {
      try {
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
        }
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
        }
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
        throw new Error('Request failed');
      } catch (error) {
        console.log(error);
      }
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
