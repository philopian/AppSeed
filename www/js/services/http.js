import $ from 'jquery';
import config from '../../../config';

module.exports = {
  testHello: () => "..this works!!",

  getSampleData: () => { // eslint-disable-line arrow-body-style
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: `http://localhost:${config.portAPI}/api/testJsonApi`,
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