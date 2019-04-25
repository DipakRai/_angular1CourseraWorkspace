(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['MenuSearchService', 'items'];

function ItemsController(MenuSearchService, items) {
  var itemsList = this;
  console.log(items.data.menu_items.length);
  console.dir('@# items.data menu_items =' +items.data.menu_items);
  console.dir('@# items.data.menu_items[0] ' +items.data.menu_items[0].name);
  itemsList.items = items.data.menu_items;
  itemsList.categoryName = items.data.category.name;
  itemsList.categoryShortName = items.data.category.short_name;
  }

})();
