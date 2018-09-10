let usersAccessToken;
let expirationTime;
const clientId = 'client_id=e1544d3bed444788bb6a705c22207d64';
const redirectUri = '&redirect_uri=http://localhost:3000/';

let Spotify = {
  getAccessToken() {
    if (usersAccessToken) {
      console.log(usersAccessToken, '1st');
      return usersAccessToken;
    } else if (!usersAccessToken) {
      window.location.href = `https://accounts.spotify.com/authorize?${clientId}&response_type=token&scope=playlist-modify-public&${redirectUri}`;
      console.log(usersAccessToken, '2nd');
      let urlResponse = window.location.href;
      usersAccessToken = urlResponse.match(/access_token=([^&]*)/)[0];
      expirationTime = urlResponse.match(/expires_in=([^&]*)/);
      expirationTime = parseInt(expirationTime[0], 0);
      console.log(usersAccessToken, '3rd');
      console.log(expirationTime, '1st');
      if (!usersAccessToken || !expirationTime) {
        console.log(usersAccessToken, '4th');
        window.location.href = `https://accounts.spotify.com/authorize?${clientId}&response_type=token&scope=playlist-modify-public&${redirectUri}`;
        console.log(usersAccessToken, '5th');
      } else {
        window.setTimeout(() => usersAccessToken = '', expirationTime * 1000);
        window.history.pushState('Access Token', null, '/');
        console.log(usersAccessToken, '6th');
        return usersAccessToken;
      }
    }
  },

  search(searchTerm) {
    return async() => {
      try {
        let headersObj = {
          headers: {Authorization: `Bearer ${usersAccessToken}`}
        }
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, headersObj);
        if (response.ok) {
          const jsonResponse = await response.json();
          return jsonResponse.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          })
        }
        throw new Error('Request failed!');
      } catch (error) {
        console.log(error)
      }
    }
  }

};

export default Spotify;
