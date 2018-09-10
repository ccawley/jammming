let usersAccessToken;
let expirationTime;
const clientId = 'client_id=e1544d3bed444788bb6a705c22207d64';
const redirectUri = '&redirect_uri=http://localhost:3000/';

let Spotify = {
  getAccessToken() {
    if (usersAccessToken) {
      return usersAccessToken;
    } else if (!usersAccessToken) {
      async() => {
        try {
          const response = await fetch(`https://accounts.spotify.com/authorize?${clientId}&response_type=token&scope=playlist-modify-public&${redirectUri}`)
          if (response.ok) {
            usersAccessToken = window.location.href.match(/access_token=([^&]*)/);
            expirationTime = window.location.href.match(/expires_in=([^&]*)/);
            window.setTimeout(() => usersAccessToken = '', expirationTime * 1000);
            window.history.pushState('Access Token', null, '/');
          }
          throw new Error('Request failed!');
        } catch (error) {
          console.log(error)
        };
      };
    } else {
      window.location(`https://accounts.spotify.com/authorize?${clientId}&response_type=token&scope=playlist-modify-public&${redirectUri}`)
    }
  }

};

export default Spotify;
