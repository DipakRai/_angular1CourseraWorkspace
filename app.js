(function () {
  alert(1);
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;
  var to_buy = [
        { itemName: 'Cookies', itemQuantity: 10},
        { itemName: 'Cakes', itemQuantity: 5},
        { itemName: 'Ice-Creams', itemQuantity: 7},
        { itemName: 'Milk', itemQuantity: 8},
        { itemName: 'Bread', itemQuantity: 9}
      ];
  alert('toBuyList'+toBuyList);
  alert('ShoppingListCheckOffService.getItems(); ='+ShoppingListCheckOffService.getItems());
  toBuyList.populateToBuyList = function(){
    ShoppingListCheckOffService.addItems('Cookies',10);
  }
  toBuyList.itemsToBuy = ShoppingListCheckOffService.getItems();
  alert('toBuyList.itemsToBuy='+toBuyList.itemsToBuy);
  toBuyList.itemName = "";
  toBuyList.itemQuantity = "";
  toBuyList.addItem = function () {
    ShoppingListCheckOffService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
  }
}


AlreadyBougboughtListhtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getItems();
  alert('boughtList.items.length==0'+boughtList.items.length);
  if(boughtList.items.length==0){
    boughtList.errorMessage="Nothing Bought yet.";
  }
  boughtList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var bought = [];

  service.addItem = function (itemName, quantity) {
    var item = {
      itemName: itemName,
      itemQuantity: quantity
    };
    bought.push(item);
  };

  service.removeItem = function (itemIdex) {
    bought.splice(itemIdex, 1);
  };

  service.getItems = function () {
    alert('inside service getItems bought =',bought.length);
    return this.bought;
  };
}
})();
