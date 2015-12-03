let NewTourService = function($http) {
  
  // let url = PARSE.URL + 'classes/photo';

  this.submitForm = submitForm;

  function Site (siteObj) {
    this.title = siteObj.title;
    this.description = siteObj.description;
    // this.lat = siteObj.lat;
    // this.lon = siteObj.lon;
  }

  function submitForm (siteObj) {
    let s = new Site(siteObj);
    // return $http.post(url, s, PARSE.CONFIG);
  }

};

NewTourService.$inject = ['$http'];

export default NewTourService;