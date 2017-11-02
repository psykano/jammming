/* Config.js: contains Spotify application private info
const Config = {
  clientId: '', // Client ID
  redirectUri: '' // Redirect URI
}
export default Config;
*/
import Config from './Config';

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const url = window.location.href;
    const urlAccessToken = url.match(/access_token=([^&]*)/);
    const urlExpiresIn = url.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      const expiresIn = urlExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const redirectUrl = 'https://accounts.spotify.com/authorize?client_id=' + Config.clientId + '&response_type=token&scope=playlist-modify-public&redirect_uri=' + Config.redirectUri;
      window.location = redirectUrl;
    }
  },

  search(term) {
    const searchUrl = 'https://api.spotify.com/v1/search?type=track&q=' + term;
    const accessToken = Spotify.getAccessToken();
    const authorization = {
      headers: {Authorization: `Bearer ${accessToken}`}
    };
    return fetch(searchUrl, authorization).then(response => {
      return response.json();
    }).then(response => {
      if (!response.tracks) {
        return [];
      }
      return response.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  }
};

export default Spotify;
