let TourService = function(UserService, $stateParams, $http, SERVER) {
  
  this.areaTours = areaTours;
  this.submitForm = submitForm;

  function areaTours() {
    let getURL = SERVER.URL + '/tours';
    return $http({
      method: 'GET',
      url: getURL
    });
  }

  function site (siteObj) {
    this.title = siteObj.title;
    this.description = siteObj.description;
  }

  function submitForm (siteObj) {
    let s = new site(siteObj);
    let c = this.markerData;

    for (var latitude in c) { s[latitude] = c[latitude]; }
    for (var longitude in c) { s[longitude] = c[longitude]; }
    console.log(s);
    alert("Submitted");
    return $http.post(SERVER.URL + '/tours/:' + c.id + '/sites', s, SERVER.CONFIG);
  }

  function submitTourForm (tourObj) {

    
  }

};

TourService.$inject = ['UserService', '$stateParams', '$http', 'SERVER'];

export default TourService;