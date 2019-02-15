(function(){
'use strict';
angular.module('LunchCheckApp',[])
.controller('LunchCheckController',LunchCheckController);
LunchCheckController.$inject=['$scope'];
function LunchCheckController($scope){
$scope.items="";
$scope.message="";
$scope.checkItems = function(){

  var words = $scope.items.split(',');
  console.info(words);
  var new_words = words.filter(function(item) {
  return item != ""
})

// if filtered array is not empty, there are empty strings
  console.log(new_words);
  console.log(new_words.length === 0);
    if(new_words.length>0){
      if(new_words.length > 3){
        $scope.message="Too much!";
      } else {
        $scope.message="Enjoy!";
      }
    } else {
    $scope.message="Enter data first";
  }
  console.info('@#$ new_words.length=',new_words.length, " ", $scope.message);
};
}
})();
