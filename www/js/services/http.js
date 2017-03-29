import $ from 'jquery';

module.exports = {

  testHello: () => {
    return "..this works!!"
  },

  getSampleData: () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: 'api/testJsonApi',
        success: function(data, status) {
          console.log(data);

          resolve(data);
        },
        error: function(err) {
          reject(err);
        }
      });
    });
  }


};