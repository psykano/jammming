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
  }
};

export default Spotify;
