// YOUR CODE HERE:

$(document).ready(function(){
  var ajaxData;
  var counter = 0;

  $('.refreshData').hide();

  var message = {
    'username': 'shawndrost',
    'text': 'trololo',
    'roomname': '4chan'
  };

  var ajaxRequest = function(){
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message Received');
        console.log(data);
        var newData = data.results.sort(function(a,b){
          return parseInt(a.updatedAt) - parseInt(b.updatedAt);
        });
        console.log(newData);
        // var msgs = [];
        for(var i = counter; i < data.results.length; i++){
          $('.messages').append('<ul id="listStyle"><li>' + data.results[counter].username + ': ' + data.results[counter].text + '</li></ul>');
          counter++;
        }
          // if(counter===data.results.length){
          //   counter = 0;
          // }
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };

  $('.updateData').on('click', function(){
    ajaxRequest();
  });
});






