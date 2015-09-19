tradeApp.controller('tradeCtrl',  [ '$scope',
                                    'tradeYahooService',
                                     'tradePortfolioService', function( $scope,
                                            tradeYahooService,
                                            tradePortfolioService){


$scope.tradeForm = tradePortfolioService.tradeForm;
$scope.stocks = tradeYahooService.getStockData();
$scope.tradeSymbol = function(name, price){
  //send info about paper to service

  tradePortfolioService.tradeAction(name, price);
  
};

console.log("trade controller run");
}]);