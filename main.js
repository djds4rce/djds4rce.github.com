$(document).ready(function() {
  $('#commandin').submit(function(event){
    event.preventDefault();
    $('#stdout').append("\nhello");
    $('#stdout').html(txt)
    window.scrollBy(0, 122500);                                              
    $('#in').val('');
    $('#in').focus();
  });
});


