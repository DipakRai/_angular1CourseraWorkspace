(function () {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      errorMessage:'<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
  list.displayList = function(){
    if(list.found.length>0){
      return true;
    }
    return false;
  };
}

  NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var menu = this;
      menu.searchTerm="";
      menu.found=[];
      menu.errorMessage=false;
      var origTitle = "Restaurant Menu List";
      menu.title = origTitle + " (" + menu.found.length + " items )";
      menu.getMatchedMenuItems = function () {
        //alert('menu.searchTerm ='+menu.searchTerm);
        var promise = MenuSearchService.getMatchedMenuItems();
        if(menu.searchTerm.trim()===""){
          menu.found=[];
          menu.title = origTitle + " (" + menu.found.length + " items )";
          menu.errorMessage=true;
          console.log("@# menu.errorMessage ="+menu.errorMessage);
        } else {
            promise.then(function (response) {
            if(null!=response && null!=response.data.menu_items){
            menu.found=response.data.menu_items;
            var matchFoundFlag=false;
            for (var i in menu.found) {
              console.log(menu.found[i].name);
              if(menu.found[i].description.indexOf(menu.searchTerm)!==-1){
                matchFoundFlag=true;
                menu.found.splice(i,1);
              }
            }
            alert(matchFoundFlag);
            if(matchFoundFlag){
              menu.errorMessage=false;
            } else {
              menu.errorMessage=true;
              menu.found=[];
            }
          }
          menu.title = origTitle + " (" + menu.found.length + " items )";
        })
        .catch(function (error) {
            console.dir("Something went terribly wrong."+error);
            menu.found=[];
          });
        }
      };

      menu.removeItem = function (index){
        menu.found.splice(index,1);
        this.title = origTitle + " (" + menu.found.length + " items )";
      };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    });
    return response;
  };
  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };
}

})();
