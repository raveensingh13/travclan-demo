import superagent from 'superagent';

export default function apiRequest() {
  const _url = 'https://intense-tor-76305.herokuapp.com/merchants';

  const request = superagent('get', _url);

  return request
    .catch((error = {}) => {
      throw (error.response);
    });
}
