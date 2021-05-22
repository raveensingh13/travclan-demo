import superagent from 'superagent';
// import getConfig from 'next/config';

// const { publicRuntimeConfig } = getConfig();

export default function apiRequest() {
  // const { api } = publicRuntimeConfig;
  const _url = 'https://intense-tor-76305.herokuapp.com/merchants';

  const request = superagent('get', _url);

  return request
    .catch((error = {}) => {
      throw (error.response);
    });
}
