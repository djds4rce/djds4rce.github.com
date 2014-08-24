'use strict';

/**
 * @ngdoc function
 * @name trello.service:storage
 * @description
 * # Storage Service
 * The wrapper for CRUD data into localstorage
 */
angular.module('trello')
.factory('storage',function($filter,$rootScope){

  var guid = function(){
    return 'xxxxxxxxxxx'.replace(/[x]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  function Store(model,params){
    params = params || {};
    this.data = JSON.parse(localStorage.getItem("trello-store-"+model)||"[]");
    this.type = model;
    //Dependent destory flag. Eg dependent items get deleted when lists get deleted
    this.dependency = params.dependency;
    //Does not get stored to local storage
    this.protectedAttributes = params.protectedAttributes;
    var that = this;
    $rootScope.$on("deleted-"+this.type,function(event,data){
      var recordsToBeDeleted = that.where({dependent:data});
      _.map(recordsToBeDeleted,function(tuple){
        that.deleteRecord(tuple.id);
      });
    });
  }

  Store.prototype.create = function(record,dependent){
    record.id = guid();
    var lastRecord;
    //Add dependent varaible eg:items is dependent on list
    if(dependent){
      var dependentRecords = $filter('orderBy')(this.where(dependent),'order',true);
      lastRecord = dependentRecords[dependentRecords.length-1];
      record.dependent = dependent;
    }
    else{
      lastRecord = this.data[this.data.length-1];
    }
    //Add Order value based on the position in the list. For exaplanation check Sortable factory
    if(lastRecord){
      record.order = lastRecord.order - Math.pow(2,20);;
    }
    else{
      record.order = Math.pow(2,50);
    }
    this.data.push(record);
    this.persistRecords()
    return record;
  }

  Store.prototype.find = function(id){
    return _.find(this.data,function(record){ return record.id == id});
  }

  Store.prototype.update = function(id,attributes){
    var record= this.find(id);
    record = _.assign(record,attributes);
    this.persistRecords()
    return record;
  }

  Store.prototype.where = function(condition){
    return _.where(this.data,condition);
  }

  Store.prototype.deleteRecord = function(id){
    var record = this.find(id);
    this.data  = _.reject(this.data,function(tuple){ return tuple.id == id;});
    this.persistRecords();
    if(this.dependency){
      //Send Delete event to the request to delete dependent models
      $rootScope.$broadcast("deleted-"+this.dependency,record.id);
    }
    return record;
  }

  //Save to local storage
  Store.prototype.persistRecords = function(){
    var that = this;
    var cleansedRecords = _.map(this.data,function(tuple){ return _.omit(tuple,that.protectedAttributes)});;
    localStorage.setItem("trello-store-"+this.type,JSON.stringify(cleansedRecords));
  }

  return Store;
});
