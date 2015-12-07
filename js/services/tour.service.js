let TourService = function(UserService, $stateParams, $http, devURL, SERVER) {
  
  this.areaTours = areaTours;
  this.markerData = {};
  this.submitForm = submitForm;

  function areaTours() {
    let getURL = devURL + 'tours';
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

TourService.$inject = ['UserService', '$stateParams', '$http', 'devURL', 'SERVER'];

export default TourService;