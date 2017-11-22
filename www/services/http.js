import $ from 'jquery';
import config from '../../appseed.config.js';

module.exports = {
  testHello: () => "..this works!!",

  fetchDataTest: () => { // eslint-disable-line arrow-body-style
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: `${config.baseUrl}/api/test`,
        success: (data) => {
          resolve(data);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }


};