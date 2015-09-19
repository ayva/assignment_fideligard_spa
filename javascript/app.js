var tradeApp = angular.module('tradeApp', ['ui.router']);


tradeApp.config(function(
                          $stateProvider,
                          $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
  .state('index',{
    url: '/',
    
    views:{
        'stocks': {
        templateUrl: 'javascript/templates/stocks.html',
        controller: 'tradeCtrl',
        }
      }
  })
  .state('report',{
    //controller: 'portfolioCtrl',
    url: '/report',
    resolve: {
      stockData : ['tradeYahooService',
      function(tradeYahooService){
        tradeYahooService.getStock(365);}]
    },
    views: {
      '': {
          templateUrl: 'javascript/templates/report.html'
        },
      'stocks': {
        templateUrl: 'javascript/templates/stocks.html',
        controller: 'tradeCtrl',
        },
      'portfolio': {
        controller: 'portfolioCtrl',
        templateUrl: 'javascript/templates/portfolio.html'
      }
    }
  })
  .state('report.transactions',{
    controller: 'transactionCtrl',
    url: '/transactions',
    templateUrl: 'javascript/templates/portfolio-transaction.html'
    
  })
  .state('report.trade',{
    controller: 'tradeFormCtrl',
    url: '/trade',
    templateUrl: 'javascript/templates/portfolio-trade.html'

    
  });

});

tradeApp.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});
