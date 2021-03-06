import jquery from 'jquery';


let UserService = function($http, SERVER, $cookies, $state) {
  
  this.checkAuth = function () {

    let token = $cookies.get('authToken');

    SERVER.CONFIG.headers['Access-Token'] = token;
    
    if (!token) {
      $state.go('root.login');
    } 

  };

  this.sendLogin = function (userObj) {
    return $http.post(SERVER.URL + '/user/show', userObj, SERVER.CONFIG);
  };

  this.sendSignup = function (userObj) {
    return $http.post(SERVER.URL + '/signup', userObj, SERVER.CONFIG);
  };

  this.loginSuccess = function (res) {
    $cookies.put('authToken', res.data.user.access_token);
    SERVER.CONFIG.headers['Access-Token'] = res.data.user.access_token;
    console.log(res.data);
    $state.go('root.home');
    jquery('.logout').toggleClass("display");
    jquery('.login').toggleClass("donotdisplay");
    jquery('.signup').toggleClass("donotdisplay");
  };

  this.signupSuccess = function (res) {
    $cookies.put('authToken', res.data.auth_token);
    SERVER.CONFIG.headers['Access-Token'] = res.data.auth_token;
    $state.go('root.home');
  };

  this.logout = function () {
    $cookies.remove('authToken');
    SERVER.CONFIG.headers['Access-Token'] = null;
    jquery('.logout').toggleClass("display");
    jquery('.login').toggleClass("donotdisplay");
    jquery('.signup').toggleClass("donotdisplay");
  };

};

UserService.$inject = ['$http', 'SERVER', '$cookies', '$state'];

export default UserService;