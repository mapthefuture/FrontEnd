let NewTourService = function($http, SERVER, $cookies) {

  this.markerData = {};
  
  this.checkAuth = function () {

    let token = $cookies.get('authToken');
    console.log(token);

    SERVER.CONFIG.headers['X-AUTH-TOKEN'] = token;
    
    if (token) {
      return $http.get(SERVER.URL + 'check', SERVER.CONFIG);
    } else {
      $state.go('root.login');
    }

  };

  this.submitForm = submitForm;

  function site (siteObj) {
    this.title = siteObj.title;
    this.description = siteObj.description;
  }

  function submitForm (siteObj) {
    let s = new site(siteObj);
    let c = this.markerData;

    for (var latitude in c) { s[latitude] = c[latitude]; }
    for (var longitude in c) { s[longitude] = c[longitude]; }

    return $http.post(SERVER.URL + '/tours/:' + c.id + '/sites', s, SERVER.CONFIG);
  }

};

NewTourService.$inject = ['$http', 'SERVER', '$cookies'];

export default NewTourService;