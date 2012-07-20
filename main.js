$(document).ready(function() {
  $('#commandin').submit(function(event){
    event.preventDefault();
    $('#stdout-executed').append("<p>#"+$('#in').val());
    $('#stdout-executed').append("<p>hello</p>");
    window.scrollBy(0, 122500);                                              
    $('#in').val('');
    $('#in').focus();
  });
});


