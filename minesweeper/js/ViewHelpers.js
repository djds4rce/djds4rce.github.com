Handlebars.registerHelper('get_box_class', function(index,isEngame) {
  var boxStatus = MinsweeperGame.Model.getBombs()[index+1];
  if( boxStatus===undefined || !isEngame){
  	return "alert alert-dark";
  }else if(boxStatus < 0){
  	return "alert alert-danger";
  }else{
  	return "alert alert-success";
  }
});
Handlebars.registerHelper('box_content', function(index,isEndgame) {
  var boxStatus = MinsweeperGame.Model.getBombs()[index+1];
  if( boxStatus===undefined || !isEndgame){
  	return "";
  }else if(boxStatus  > -1){
  	return boxStatus;
  }
});
