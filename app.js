(function () {
  'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;
  toBuyList.itemName = "";
  toBuyList.itemQuantity = "";
  toBuyList.populateToBuyList = function(){
  var itemsToBuy = [
          { itemName: 'Cookies', itemQuantity: 10},
          { itemName: 'Cakes', itemQuantity: 5},
          { itemName: 'Ice-Creams', itemQuantity: 7},
          { itemName: 'Milk', itemQuantity: 8},
          { itemName: 'Bread', itemQuantity: 9}
        ];
        toBuyList.itemsToBuy=itemsToBuy;
  }
  toBuyList.populateToBuyList();

  toBuyList.addItemsToBoughtList = function (item){
    alert('123');
    ShoppingListCheckOffService.addItem(item.itemName,item.itemQuantity);
    alert('1234');
    toBuyList.removeItem(item);
  };

  toBuyList.removeItem = function(item){
    var index = toBuyList.itemsToBuy.indexOf(item);
    toBuyList.itemsToBuy.splice(index, 1);
  };

  toBuyList.errorMessage = function(){
    if(toBuyList.itemsToBuy.length==0){
      alert('toBuyList.errorMessage'+true);
      return true;
    } else {
      return false;
    }
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {

  var boughtList = this;
  boughtList.itemName = "";
  boughtList.itemQuantity = "";
  boughtList.itemsBought=[];
  boughtList.itemsBought = ShoppingListCheckOffService.getItems();

  boughtList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };

  boughtList.errorMessage = function(){
    if(boughtList.itemsBought.length==0){
      alert('boughtList.errorMessage '+true);
      return true;
    } else {
      return false;
    }
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
    alert('12345');
  };
  service.removeItem = function (itemIndex) {
    bought.splice(itemIndex, 1);
  };
  service.getItems = function () {
    return bought;
  };
}
})();
