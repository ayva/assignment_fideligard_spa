tradeApp.controller('transactionCtrl',
                    ['$scope', 'tradeYahooService', 'tradePortfolioService',
                      function($scope, tradeYahooService,tradePortfolioService){
  console.log("transaction ctrl run");
  

 
  $scope.transactions = tradePortfolioService.getTransactions();

  


}]);