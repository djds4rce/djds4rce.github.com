'use strict';

/**
 * @ngdoc function
 * @name trello.service:search
 * @description
 * # Search Service
 * Interface for building indexes and searching.
 */
//Primitive Search. Stores indexes and uses reverse look ups to retrive Ids of matched Records.


angular.module('trello')
.factory('search',function(){

  function Search(){
    this.index = JSON.parse(localStorage.getItem("trello-index")||"{}");
    this.keyWordMapping = JSON.parse(localStorage.getItem("trello-keyWordMapping")||"{}");
  }

  Search.prototype.addIndexes = function(tokens,item){
    var that = this;
    _.map(tokens,function(token){
      that.index[token] = that.index[token] || [];
      that.index[token].push({"item":item.id});
    });
    this.keyWordMapping[item.id] = tokens;
  }

  Search.prototype.save =function(){
    localStorage.setItem("trello-index",JSON.stringify(this.index));
    localStorage.setItem("trello-keyWordMapping",JSON.stringify(this.keyWordMapping));
  }

  Search.prototype.RemoveIndexes = function(tokens,item){
    var that = this;
    _.map(tokens,function(token){
      that.index[token] = _.reject(that.index[token],function(tuple){
        return tuple.item === item.id;
      });
    });
    var indexKeys = _.keys(this.index);
    _.each(indexKeys,function(key){
      if(that.index[key].length < 1){
        delete that.index[key];
      }
    });
  }

  Search.prototype.removeId  = function(id){
    delete this.keyWordMapping[id];
  }

  Search.prototype.find = function(tokens){
    var result = [];
    var that = this;
    _.map(tokens,function(token){
      if(that.index[token] && that.index[token].length){
        result.push(that.index[token]);
        result = _.uniq(_.flatten(result));
      }
    });
    return result;
  }

  return Search;

});
