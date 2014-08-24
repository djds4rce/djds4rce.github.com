'use strict';

/**
 * @ngdoc function
 * @name trello.service:sortable
 * @description
 * # Sortable Service
 * Helper methods for sorting and logic
 */
/**
  When a new record is added its gets a order value of 2^50 every subsequent record
  added has a order value = (previous order value) - 2^20. The logic for Moving Items within or outside the list is

  1. Item is moved to the top- Order value of the record is 2^20 more the record after it.
  2. Item is added to the bottom - Order Value is 2^20 lesser than the last but one record.
  3. Item is added in between 2 elements - Order Value is average of the surrounding records.
 **/
angular.module('trello')
.service('sortable',function(){

  return {

    //When the Item is sorted in the same List the Update is called before the record is moved hence we 
    //Find where the record will move to and then decide its order.
    sortWithin : function (sortable,records){
      var indexOfMovedRecord = sortable.dropindex;
      var movedRecord = records[sortable.index];
      var recordsLength= records.length;

      if(indexOfMovedRecord == recordsLength-1){
        movedRecord.order = records[recordsLength-1].order - Math.pow(2,6);
      }
      else if(indexOfMovedRecord == 0){
        movedRecord.order = records[0].order + Math.pow(2,6);
      }
      else {
        if(sortable.index < indexOfMovedRecord){
          movedRecord.order = (records[indexOfMovedRecord+1].order + records[indexOfMovedRecord].order)/2;
        }
        else{
          movedRecord.order = (records[indexOfMovedRecord-1].order + records[indexOfMovedRecord].order)/2;
        }
      }
      return movedRecord;
    },

    //When Moving to a diffrent List the Update event is called after the record has moved to its list.
    moveToDiffrentList:function(sortable,records,currentListId){
      var indexOfMovedRecord = sortable.dropindex;
      var movedRecord = records[indexOfMovedRecord];
      var recordsLength= records.length;

      if(indexOfMovedRecord == 0 && recordsLength == 1){
        movedRecord.order = Math.pow(2,24);
      }
      else if(indexOfMovedRecord == recordsLength-1){
        movedRecord.order = records[recordsLength-2].order - Math.pow(2,6);
      }
      else if(indexOfMovedRecord == 0){
        movedRecord.order = records[1].order + Math.pow(2,6);
      }
      else {
        movedRecord.order = (records[indexOfMovedRecord-1].order + records[indexOfMovedRecord+1].order)/2;
      }
      movedRecord.dependent = currentListId;
      return movedRecord;
    }
  }
});
