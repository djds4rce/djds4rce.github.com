'use strict';

/**
 * @ngdoc overview
 * @name Trello
 * @description
 * # Trello mock
 *
 * Main module of the application.
 */
angular
.module('trello', ['ui.sortable'])
.config(function () {
}).run(function($rootScope,search){

  $rootScope.indexObj = new search();

  $rootScope.$on("itemAdded",function(event,item){
    var tokens = _.map(item.content.split(" "),function(token){
      return token.toLowerCase();
    });
    $rootScope.indexObj.addIndexes(tokens,item);
    $rootScope.indexObj.save();
  });

  $rootScope.$on("itemUpdated",function(event,item){
    var tokens = _.map(item.content.split(" "),function(token){
      return token.toLowerCase();
    });
    var oldTokens = indexObj.keyWordMapping[item.id];
    $rootScope.indexObj.RemoveIndexes(oldTokens,item);
    $rootScope.indexObj.addIndexes(tokens,item);
    $rootScope.indexObj.save();
  });

  $rootScope.$on("itemDeleted",function(event,item){
    var tokens = _.map(item.content.split(" "),function(token){
      return token.toLowerCase();
    });
    $rootScope.indexObj.RemoveIndexes(tokens,item);
    $rootScope.indexObj.removeId(item.id);
    $rootScope.indexObj.save();
  });

});;
