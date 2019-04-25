(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);
CategoriesController.$inject = ['MenuSearchService', 'items'];
function CategoriesController(MenuSearchService, items) {
  var mainList = this;
  console.dir('@# items.data ' +items.data);
  console.dir('@# items.data[0].name ' +items.data[0]);
  mainList.items = items.data;
}
})();
