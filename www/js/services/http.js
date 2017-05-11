import $ from 'jquery';
import config from '../../../config';

console.log(config);


module.exports = {
  testHello: () => "..this works!!",

  getSampleData: () => { // eslint-disable-line arrow-body-style
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8083/api/testJsonApi',
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