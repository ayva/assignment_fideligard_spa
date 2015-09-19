tradeApp.factory('tradePortfolioService',
                ['$http', 'tradeYahooService',
                 function($http, tradeYahooService){
var obj={};

var _Cash = 1000000;

obj.getCash = function(){
  return _Cash;
};

obj.transactions = [];

obj.getTransactions = function(){
  return obj.transactions;
};

var _transaction = {
  date : new Date(),
  name: "",
  type: "Buy",
  quantity: 0,
  price: 0
};

obj.validForm = function(){
  //need to check balance for buy and symbol in portfolio for sell
return true;
};
var changeCash = function(type, price, quantity){
    if (type=="Buy"){
    _Cash-=price*quantity;
  } else {
    _Cash+=price*quantity;
  }
};

obj.addTransaction = function(date, name, type, quantity, price){
  changeCash(type,price, quantity);
  _transaction = {
    date : date,
    name: name,
    type: type,
    quantity: quantity,
    price: price
  };
  obj.transactions.push(_transaction);

  console.log("transaction added", _transaction);
  console.log("total transactions", obj.transactions);
};

obj.tradeForm = {
  name: "none",
  price: 0,
  date: new Date()
};

obj.tradeAction = function(name, price){
  //console.log("service got", name, price);
  obj.tradeForm.name = name;
  obj.tradeForm.price = price;
  obj.tradeForm.date = tradeYahooService.choosendate;
  // buildPortfolioSymbol(name, quantity, price);
  // _portfolio.data.push(_portfolioSymbol);
};

var buildPortfolioSymbol = function(name, quantity, price){
  //Overwrite now, find and add/deduct from existing portfolio later
  _portfolioSymbol.name = name;
  _portfolioSymbol.quantity = quantity;
  _portfolioSymbol.price = price;
};

var _portfolioSymbol = {
  name: 'AAPL',
  quantity: 1,
  cost: 1000, //buy price * quantity,
  value: 2000, //current price * quantity,
  balance: 1000, //value-cost
  price: 10, //per symbol
  oneday: 1,
  sevenday: 7,
  month: 30, //value month ago - cost
};

var _portfolio = {
  data : []
};

return obj;
}]);