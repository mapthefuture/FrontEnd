let TourService = function(UserService, $stateParams, $http, devURL, SERVER) {
  
  this.areaTours = areaTours;
  this.markerData = {};
  this.submitSiteForm = submitSiteForm;
  this.submitTourForm = submitTourForm;

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

  function tour (tourObj) {
    this.title = tourObj.title;
    this.description = tourObj.description;
  }

  function submitSiteForm (siteObj) {
    let s = new site(siteObj);
    let c = this.markerData;
    console.log(c);

    for (var latitude in c) { s[latitude] = c[latitude]; }
    for (var longitude in c) { s[longitude] = c[longitude]; }
    console.log(s);
    return $http.post(SERVER.URL + '/tours/' + c.id + '/sites', s, SERVER.CONFIG);
  }

  function submitTourForm (tourObj) {
    let t = new tour(tourObj);
    console.log(t);
    return $http.post(SERVER.URL + '/tours', t, SERVER.CONFIG);
  }

};

TourService.$inject = ['UserService', '$stateParams', '$http', 'devURL', 'SERVER'];

export default TourService;