// YOUR CODE HERE:

$(document).ready(function(){

  var ajaxData;
  var rooms = {};
  var  friends = [];

  $('.refreshData').hide();

  var message = {
    'username': 'Anonymous',
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
        for(var i = 0; i < data.results.length; i++){
          if(!rooms[data.results[i].roomname]){
            rooms[data.results[i].roomname] = data.results[i].roomname;
          }
          $('.messages').append('<ul id="listStyle" class="' + htmlEscape(data.results[i].roomname) +  '"><li><i><a class="friends" href="#">@'+ htmlEscape(data.results[i].username) + '</a></i>' + ': ' + htmlEscape(data.results[i].text) + ': ' + '<b class="' + htmlEscape(data.results[i].roomname) +  '">' + htmlEscape(data.results[i].roomname) + '</b><small><a class='+ htmlEscape(data.results[i].username) +' href="#">'+ "Add Friend" +'</a></small></li></ul>');
        }
        console.log(rooms);
        for(var key in rooms){
          if(rooms[key] !== undefined || rooms[key] !== null){
            $('.dropdown').append('<option class="' + rooms[key] + '"value="' + htmlEscape(rooms[key]) +'"'+ '>'+ htmlEscape(rooms[key]) + '</option>');
          }
        }
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  }

var ajaxPost = function(){

    message.username = prompt('Please pick a username', 'Type here');
    message.text = prompt('Please write a message', 'Type here');
    message.roomname = prompt('Please choose the name of a room', 'Type here');


    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message Received');
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };



  // function displayMessage(msg){
  //   $('.messages').append('<ul id="listStyle"><li>' + data.results[counter].username + ': ' + data.results[counter].text + '</li></ul>');
  // }

  $('.updateData').on('click', function(){
    ajaxRequest();
  });

  $('.postData').on('click', function(){
    ajaxPost();
  });

  $('.dropdown').change(function(){
    var myClass = $(this).val();
    $('ul').closest('.' + myClass).show();
    $('ul').not('.' + myClass).hide();
  })

  $('.showAll').on('click', function(){
    $('ul').show();
  });

  $('.friends').on('click', function(){
    var friendClass = $(this);
    alert(friendClass);
  });



  var htmlEscape = function(str){
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };
});












