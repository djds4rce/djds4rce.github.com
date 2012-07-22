$(document).ready(function() {
  $('#in').focus();
  $('#commandin').submit(function(event){
    event.preventDefault();
    var command = $('#in').val();
    var command_object= new commandHandler(command);
    command_object.get_text(); 
    window.scrollBy(0, 122500);                                              
    $('#in').val('');
    $('#in').focus();
  });
});

function commandHandler(command) {
  this.command = command;
  this.get_text = function() {
    text = getOutput(this.command); 
    $('#stdout-executed').append("<p>daya-interwebs:~/"+this.command+"</p>");
    $('#stdout-executed').append(text);
  }
  
  this.open_tab = function () {
   var url = get_url(command)

  }
 }
