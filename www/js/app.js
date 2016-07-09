// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var facebookExample = angular.module('starter', ['ionic', 'ngStorage', 'ngCordova'])

facebookExample.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

facebookExample.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })


        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController'
        })


        .state('enemy', {
            url: '/enemy',
            templateUrl: 'templates/enemy.html',
            controller: 'EnemyController'
        })

          .state('friend', {
            url: '/friend',
            templateUrl: 'templates/friend.html',
            controller: 'FriendController'
        })

  .state('like', {
            url: '/like',
            templateUrl: 'templates/like.html',
            controller: 'LikeController'
        })


    .state('love', {
            url: '/love',
            templateUrl: 'templates/love.html',
            controller: 'LoveController'
        })
      
       
        .state('feed', {
            url: '/feed',
            templateUrl: 'templates/feed.html',
            controller: 'FeedController'
        });
    $urlRouterProvider.otherwise('/profile');
});
















facebookExample.controller("LoginController", function($scope, $cordovaOauth, $localStorage, $location) {

    $scope.login = function() {
        $cordovaOauth.facebook("XXX_FACEBOOK_APP_ID_XXX", ["email", "user_website", "user_location", "user_relationships","user_friends"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            $location.path("/profile");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };

});







facebookExample.controller("ProfileController", function($scope, $http, $localStorage, $location) {

    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status, friends, email", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;
                

                 var link="localhost/makenewaccount.php";
        $http.post(link, result.data).then(function (res){
        $scope.response = res.data;


        });

            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });


       


        } else {
            // alert("Not signed in");
            $location.path("/login");
        }
    };

});



















facebookExample.controller("EnemyController", function($scope, $http, $localStorage, $location) {

    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status, friends, email", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;

                var myid=result.data.id;
                var umyid='u'+myid;

                var whosefeeling={"id":umyid};
                

                 var link="localhost/getfeelings.php";
        $http.post(link, whosefeeling).then(function (res){
        	
        $scope.feelings = res;


        });

            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });


       


        } else {
            // alert("Not signed in");
            $location.path("/login");
        }
    };

});




facebookExample.controller("FriendController", function($scope, $http, $localStorage, $location) {

    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status, friends, email", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;

                var myid=result.data.id;
                var umyid='u'+myid;

                var whosefeeling={"id":umyid};
                

                 var link="localhost/getfeelings.php";
        $http.post(link, whosefeeling).then(function (res){
        $scope.feelings = res;


        });

            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });


       


        } else {
            // alert("Not signed in");
            $location.path("/login");
        }
    };

});








facebookExample.controller("LikeController", function($scope, $http, $localStorage, $location) {

    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status, friends, email", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;

                var myid=result.data.id;
                var umyid='u'+myid;

                var whosefeeling={"id":umyid};
                

                 var link="localhost/getfeelings.php";
        $http.post(link, whosefeeling).then(function (res){
        $scope.feelings = res;


        });

            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });


       


        } else {
            // alert("Not signed in");
            $location.path("/login");
        }
    };

});









facebookExample.controller("LoveController", function($scope, $http, $localStorage, $location) {

    $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status, friends, email", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;

                var myid=result.data.id;
                var umyid='u'+myid;

                var whosefeeling={"id" : umyid};
                

                 var link="localhost/getfeelings.php";
        $http.post(link, whosefeeling).then(function (result){
        $scope.feelings = result;
        });

            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });


       


        } else {
            // alert("Not signed in");
            $location.path("/login");
        }
    };

});




















facebookExample.controller("FeedController", function($scope, $http, $localStorage, $location) {

 $scope.init = function() {
        if($localStorage.hasOwnProperty("accessToken") === true) {
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status, friends, email", format: "json" }}).then(function(result) {
                $scope.feedData = result.data;


    $scope.hideMe = function (friend, friendid, feeling) {
        friend.hide=true;
        var sendFeelings={"friendid" : friendid, "feeling" : feeling, "myid" : result.data.id, "name" :result.data.name, "picture" : result.data.picture};

          var link="localhost/addnewfeel.php";
        $http.post(link, sendFeelings).then(function (res){
        $scope.response = res.data;


        });


    };


                 
            }, function(error) {
                alert("There was a problem getting your profile.  Check the logs for details.");
                console.log(error);
            });


       


        } else {
            // alert("Not signed in");
            $location.path("/login");
        }
    };

});
