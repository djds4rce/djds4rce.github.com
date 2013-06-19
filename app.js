function TerminalCtrl($scope,$http){
  $scope.commands = [];
  var urls = {
    blog: 'http://djds4rce.wordpress.com',
    twitter: 'http://twitter.com/notsosleepy',
    github: 'http://github.com/djds4rce'
  };


  $http.get('text.json').success(function(data) {
    $scope.results = data;
    $scope.enter('whoami');
  });

  $scope.enter = function(comm){
    $scope.comm = '';

    if(comm =="clear"){
      $scope.commands = [];}
      else {
        if(comm in $scope.results){
          output = $scope.results[comm]; }
          else{
            output = ["Command not found"];
          }
          $scope.commands = $scope.commands.concat({'key':comm,'output':output});
      }

        url = urls[comm];
        if (!(url==undefined)){
          window.open(url);
          return false;
        }
  }

  $scope.focus = function(){
    $('#in').focus();
  }

}

