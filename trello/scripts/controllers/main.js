'use strict'; /** * @ngdoc function * @name trello.controller:MainCtrl * @description * # MainCtrl * The main controller for the trello board which binds all the tasks and lists together
*/
angular.module('trello')
.controller('MainCtrl', function ($scope,storage,$filter,$rootScope,sortable) {
  $scope.inputFlags = {};
  $scope.newItemObj = {};
  $scope.searchObj = {}
  $scope.newListObject = {};

  //Vertical List Object. 
  $scope.lists = new storage('lists',{dependency:'items',protectedAttributes:'items'});
  //Tasks stored in Lists
  $scope.items = new storage('items');

  //Order the lists and items based on the 'order' attribute. See sortable factory for explanations
  $scope.lists.data = $filter('orderBy')($scope.lists.data,'order',true);

  //Crud UI Operation for List and Item
  $scope.addList = function(){
    $scope.lists.create($scope.newListObject);
    $scope.newListObject = {};
  }

  $scope.addItem = function(listId){
    var item = $scope.items.create($scope.newItemObj,listId);
    $rootScope.$broadcast("itemAdded",item);
    $scope.newItemObj = {};
    $scope.inputFlags = {};
  }

  $scope.newItem  = function(id){
    $scope.inputFlags = {};
    $scope.newItemObj = {};
    $scope.inputFlags.addItemListId = id;
  }

  $scope.editItem = function(id){
    $scope.inputFlags = {};
    $scope.inputFlags.itemEditId = id;
    $scope.newItemObj = _.cloneDeep($scope.items.find(id));
  }

  $scope.updateItem = function(id){
    var item = $scope.items.update(id,$scope.newItemObj);
    $rootScope.$broadcast("itemUpdated",item);
    $scope.inputFlags = {}
    $scope.newItemObj = {};
  }

  $scope.editList = function(id){
    $scope.inputFlags = {};
    $scope.inputFlags.editList = id;
    $scope.editListObject = _.cloneDeep($scope.lists.find(id));
  }

  $scope.updateList = function(id){
    $scope.lists.update(id,$scope.editListObject);
    $scope.newListObject = {};
    $scope.inputFlags = {};
  }

  $scope.cancelOperation = function(){
    $scope.inputFlags = {};
  }

  $scope.deleteItem = function(id){
    var item = $scope.items.deleteRecord(id);
    $rootScope.$broadcast("itemDeleted",item);
  }

  $scope.deleteList = function(id){
    $scope.lists.deleteRecord(id);
  }
  //End Crud 
  
  //Computed method for changing class of the items which have a search match
  $scope.isSearched = function(id){
    return _.contains($scope.searchResultItemIds,id);
  }

  //Group Items by List Id so that it can be easily Displayed
  $scope.$watch("items.data",function(){
    var groupedItems = _.groupBy($scope.items.data, function(tuple) { return tuple.dependent; });
    _.map($scope.lists.data,function(tuple){
      tuple.items = $filter('orderBy')(groupedItems[tuple.id]||[],'order',true);
    });
  },true);


  $scope.sortableItemsOptions = {
    placeholder: "item",
    connectWith: ".items",
    update:function(e,ui){
      if (ui.sender !== null) {
        var itemsInCurrentList = ui.item.sortable.droptarget.scope().list.items;
        var currentListId = ui.item.sortable.droptarget.scope().list.id;
        var movedItem = sortable.moveToDiffrentList(ui.item.sortable,itemsInCurrentList,currentListId);
        $scope.items.update(movedItem.id,movedItem);

      } else if(ui.item.sortable.droptarget[0] === ui.item.parent()[0]) {
        if(ui.item.sortable.dropindex == ui.item.sortable.index){
          return;
        }
        var itemsInCurrentList  =  ui.item.parent().scope().list.items
        var movedItem =  sortable.sortWithin(ui.item.sortable,itemsInCurrentList)
        $scope.items.update(movedItem.id,movedItem);
      }
    }
  };

  $scope.sortableListOptions = {
    update : function(e,ui){
      if(ui.item.sortable.dropindex == ui.item.sortable.index){
        return;
      }
      var movedList = sortable.sortWithin(ui.item.sortable,$scope.lists.data);
      $scope.lists.update(movedList.id,movedList);
      $scope.lists.data = $filter('orderBy')($scope.lists.data,'order',true);
    }
  };


  //Disable Sortable if Input boxes are open
  //Hack for Fixing issue with the Library
  $scope.$watch("inputFlags",function(){
    if(_.keys($scope.inputFlags).length==0){
      $scope.sortableListOptions.disabled = false;
      $scope.sortableItemsOptions.disabled = false;
    }
    else{
      $scope.sortableListOptions.disabled = true;
      $scope.sortableItemsOptions.disabled = true;
    }
  });

  // Watch for Search query and Update Results array
  $scope.$watch("searchObj.query",function(){
    if($scope.searchObj.query){
      var tokens = _.map($scope.searchObj.query.split(" "),function(token){
        return token.toLowerCase();
      });
      var searchResults = $rootScope.indexObj.find(tokens);
      if(searchResults.length){
        $scope.searchResultItemIds = _.pluck(searchResults,'item');
      }
      else{
        $scope.searchResultItemIds = [];
      }
    }
  });

});
