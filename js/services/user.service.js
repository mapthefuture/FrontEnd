let UserService = function($http, SERVER, $cookies, $state) {

  console.log(SERVER);
  
  this.checkAuth = function () {

    let token = $cookies.get('authToken');

    SERVER.CONFIG.headers['X-AUTH-TOKEN'] = token;
    
    if (token) {
      return $http.get(SERVER.URL + 'check', SERVER.CONFIG);
    } else {
      // $state.go('root.login');
    }

  };

  this.sendLogin = function (userObj) {
    console.log(userObj);
    return $http.post(SERVER.URL + '/user/show', userObj, SERVER.CONFIG);
  };

  this.sendSignup = function (userObj) {
    return $http.post(SERVER.URL + '/signup', userObj, SERVER.CONFIG);
  };

  this.loginSuccess = function (res) {
    $cookies.put('authToken', res.data.auth_token);
    SERVER.CONFIG.headers['X-AUTH-TOKEN'] = res.data.auth_token;
    $state.go('root.home');
  };

  this.signupSuccess = function (res) {
    $cookies.put('authToken', res.data.auth_token);
    SERVER.CONFIG.headers['X-AUTH-TOKEN'] = res.data.auth_token;
    $state.go('root.home');
  };

  this.logout = function () {
    $cookies.remove('authToken');
    SERVER.CONFIG.headers['X-AUTH-TOKEN'] = null;
    $state.go('root.login');
  };

};

UserService.$inject = ['$http', 'SERVER', '$cookies', '$state'];

export default UserService;