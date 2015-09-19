tradeApp.controller('tradeFormCtrl',
                    ['$scope', 'tradeYahooService', 'tradePortfolioService',
                      function($scope, tradeYahooService,tradePortfolioService){
  console.log("tradeForm ctrl run");
  //Tracks data for form
  $scope.tradeForm = tradePortfolioService.tradeForm;
  $scope.availableCash = tradePortfolioService.getCash();
  console.log($scope.availableCash)
  $scope.quantity = 0;
  $scope.valid = function(){
    if(Number($scope.tradeForm.price)*Number($scope.tradingFormFill.quantity)<$scope.availableCash) {
      $scope.valid = true
      return true}
      else {
      $scope.valid = false
        return false}
  }
  
  // $scope.validForm = function(){
  //   console.log((Number($scope.tradeForm.price) * Number($scope.quantity)));
  //   console.log($scope.tradingFormFill.type);
  //   if($scope.tradingFormFill.type == "Buy" && $scope.availableCash < (Number($scope.tradeForm.price) * Number($scope.quantity))){

  //     return true;
  //   } else {
  //     return false;
  //   }
    
  // };
  //tradePortfolioService.validForm();


  $scope.updatePortfolio = function(date, name, type, quantity, price){ 
    tradePortfolioService.addTransaction(date, name, type, quantity, price);
  };
  $scope.transactions = tradePortfolioService.getTransactions();

  


}]);