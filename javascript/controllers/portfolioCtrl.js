tradeApp.controller('portfolioCtrl',
                    ['$scope', 'tradeYahooService', 'tradePortfolioService',
                      function($scope, tradeYahooService,tradePortfolioService){
  console.log("portfolio ctrl run");
  //Date picker range
  $scope.today = tradeYahooService.today;
  $scope.yearago = tradeYahooService.yearago;

  $scope.foo = "FOO";

  
  //Date picker check
  $scope.datePicker = 365;
  $scope.showPickedData = function(day){
    return new Date(new Date().setDate(new Date().getDate()-(365-day)));
  };
    

  //Tracks stock 
  $scope.stocks = tradeYahooService.getStockData();
  $scope.showPicker = function(day){
    $scope.datePicker = day;
    tradeYahooService.getStock(day);
  };

  //Tracks data for form
  $scope.tradeForm = tradePortfolioService.tradeForm;


}]);