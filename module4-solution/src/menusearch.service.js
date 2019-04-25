(function () {
'use strict';

angular.module('Data')
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getItemsForCategory = function (shortName) {
    alert('shortName');
    console.dir('inside getItemsForCategory shortName =',shortName);
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });
    console.dir('getItemsForCategory ='+response.data);
    return response;
  };

  service.getAllCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });
    console.dir('getAllCategories ='+response.data);
    return response;
  };

}

})();
