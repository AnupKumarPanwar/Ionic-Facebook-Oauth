Facebook Oauth + PHP +MySql DB + AdMob in Ionic Framework
==============================


Download this example project from GitHub and run the following commands:

	
1. Go to developers.facebook.com
2. Create a new app
3. Choose website from platfrom
3. Put http://localhost/callback in callback uri
4. Copy the client id

With the client id in hand, open **www/js/app.js** and find the following line (line no 89):

    $cordovaOauth.facebook("XXX_FACEBOOK_APP_ID_XXX", ["email", "read_stream", "user_website", "user_location", "user_relationships"])

Replace "XXX_FACEBOOK_APP_ID_XXX" with Facebook Client Id that you obtained from facebook developer console.


1. Now install WAMP and goto C:\wamp\www
2. Copy the 3 PHP scripts from PHP folder in the project and paste into the C:\wamp\www directory
3. Start the wamp server and open localhost/phpmyadmin in web browser
4. Create a database named test
5. Correct the corresponding database details in 3 PHP scripts present in C:\wamp\www


Run the following command in the project folder

	$cordova platform add android
	$cordova plugin add cordova-plugin-inappbrowser
	$cordova plugin add cordova-plugin-whitelist
	$cordova plugin add cordova-plugin-admobpro
    $ionic run android

The above commands will add the Android build platform and install the required plugins.




Resources
-------------

Ionic Framework - [http://www.ionicframework.com](http://www.ionicframework.com)

AngularJS - [http://www.angularjs.org](http://www.angularjs.org)

Apache Cordova - [http://cordova.apache.org](http://cordova.apache.org)

ngCordova - [http://www.ngcordova.com](http://www.ngcordova.com)

Nic Raboy's Code Blog - [https://blog.nraboy.com](https://blog.nraboy.com)
