$(document).ready(function() {
  $('#in').focus();
  typeWriter();
  $('#commandin').submit(handleSubmit);

  $(document).click(function(){
    $('#in').focus();
  });
});

function typeWriter() {
  text = '';
  $(["w","h","o","a","m","i"]).each(function(i,s){
    text += s;
    $('#in').delay(1000).queue(function(){ 
      $(this).val(text);
    });
  });
  //$('#commandin').submit(handleSubmit);
}

function commandHandler(command) {
  this.command = command;

  this.get_text = function() {
    text = getOutput(this.command); 
    $('#stdout-executed').append("<p>daya@interwebs:~/"+this.command+"</p>");
    $('#stdout-executed').append(text);
  }

  this.open_tab = function () {
    url = urls[command];
    if (!(url==undefined)){
      window.open(url);
      return false;
    }
  }

  this.extra_options = function () {
    extraHandler(command)
  }
}

function handleSubmit(event){
  event.preventDefault();
  var command = $('#in').val();
  var command_object= new commandHandler(command);
  command_object.get_text();
  command_object.open_tab();
  command_object.extra_options(); 
  window.scrollBy(0, 122500);                                              
  $('#in').val('');
  $('#in').focus();
}

var urls = {
  blog: 'http://djds4rce.wordpress.com',
  twitter: 'http://twitter.com/notsosleepy',
  github: 'http://github.com/djds4rce'
};
