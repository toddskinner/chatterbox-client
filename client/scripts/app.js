// YOUR CODE HERE:

$(document).ready(function(){
  var ajaxData;

  $('.refreshData').hide();

  var message = {
    'username': 'shawndrost',
    'text': 'trololo',
    'roomname': '4chan'
  };

  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message Received');
      ajaxData = data;
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });

  var displayMessages = function(ajaxArray){
    for(var i = 0; i < ajaxArray.results.length; i++){
      // var msg = document.createElement("li");
      $('.messages').append('<li>' + ajaxArray.results[i].username + ': ' + ajaxData.results[i].text + '</li>');
    }
  };

  $('.showData').on('click', function(){
    displayMessages(ajaxData);
    $('.showData').hide();
    $('.refreshData').show();
  });
});






