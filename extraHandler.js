function extraHandler(command) {

  switch(command){

    case "clear":
      $('#stdout-executed').empty();     
    $('#in').focus('');
    break

  }

}
