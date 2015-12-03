let NewTourService = function($http, SERVER) {
  
  this.checkAuth = function () {

    let token = $cookies.get('authToken');

    SERVER.CONFIG.headers['X-AUTH-TOKEN'] = token;
    
    if (token) {
      return $http.get(SERVER.URL + 'check', SERVER.CONFIG);
    } else {
      // $state.go('root.login');
    }

  };

  this.submitForm = submitForm;

  function Site (siteObj) {
    this.title = siteObj.title;
    this.description = siteObj.description;
    // this.lat = siteObj.lat;
    // this.lon = siteObj.lon;
  }

  function submitForm (siteObj) {
    console.log(siteObj);
    let s = new Site(siteObj);
    return $http.post(SERVER.URL + '/tours/:id/sites', siteObj, SERVER.CONFIG);
  }

  this.submitFormSuccess = function (res) {
    $cookies.put('authToken', res.data.auth_token);
    SERVER.CONFIG.headers['X-AUTH-TOKEN'] = res.data.auth_token;
  };

};

NewTourService.$inject = ['$http', 'SERVER'];

export default NewTourService;