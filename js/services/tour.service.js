let TourService = function(UserService, MapService, $stateParams, $http, devURL, SERVER) {
  
  this.areaTours = areaTours;
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
    return $http.post(SERVER.URL + '/tours/:' + c.id + '/sites', s, SERVER.CONFIG);
  }

};

TourService.$inject = ['UserService', 'MapService', '$stateParams', '$http', 'devURL', 'SERVER'];

export default TourService;