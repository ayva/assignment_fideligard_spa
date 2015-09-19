tradeApp.factory('tradeYahooService', ['$http', '$filter',function($http,$filter){

  var obj={};

  //=[{name: price: oneday : sevenday: month:}]
  var _stockData = {
    data: []
  };
  obj.getStockData =  function(){
    return _stockData;
  };
  

  var _symbolsOfStocksToGet = ['AAPL', 'FB', 'GOOG', 'F', 'SBUX', 'BX','PFE', 'WMB', 'GME', 'ZNGA', 'GRPN', 'LNKD'];

  //"2014-12-31" date format
  obj.today = new Date();
  obj.yearago = new Date(new Date().setDate(new Date().getDate()-365));

  var _dateToday = new Date(new Date().setDate(obj.today.getDate()-60)).toISOString().slice(0,10);
  var _dateHistorical = new Date(new Date().setDate(obj.today.getDate()-120))
                              .toISOString().slice(0,10);

  obj.choosendate = new Date();
                            
  obj.getStock = function(currentday){
    console.log("trade current day", currentday);
    if (_stockData.data.length>0 ) {
      _stockData.data=[];
      console.log("reset stockData");
    }
    obj.choosendate = new Date(new Date().setDate(new Date().getDate()-(365-currentday)));
    var choosenday = obj.choosendate.toISOString().slice(0,10);
    console.log("choosen dat change to", choosenday);

    _dateHistorical = new Date(new Date().setDate(new Date().getDate()-(365-currentday)-120)).toISOString().slice(0,10);
    console.log("end day is", _dateHistorical);

    console.log("started to push new data");
    for(var i = 0; i < _symbolsOfStocksToGet.length ; i++){
      var symbol = _symbolsOfStocksToGet[i];

      $http.get('http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22'+ symbol + '%22%20and%20startDate%20=%20%22'+ _dateHistorical + '%22%20and%20endDate%20=%20%22'+ choosenday + '%22%20&format=json%20&diagnostics=true%20&env=store://datatables.org/alltableswithkeys%20&callback=')
      .then(_responseCallback);
    }
   
  };

  var _responseCallback = function(response){
   
    var stockForSymbol = response.data["query"]["results"]["quote"];
    pushData(stockForSymbol);

  };

  var pushData = function(symbolStock){
    _stockData.data.push({
      name: symbolStock[0].Symbol,
      price: symbolStock[0].Close,
      oneday: symbolStock[0].Close -symbolStock[1].Close,
      sevenday: symbolStock[0].Close -symbolStock[5].Close,
      month: symbolStock[0].Close - symbolStock[21].Close});
  };


  obj.tradeSymbol = function(name){
    console.log(name+"was traded");
  };

  return obj;

}]);