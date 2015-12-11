let TourService = function(UserService, $stateParams, $http, devURL, SERVER) {
  
  this.areaTours = areaTours;
  this.markerData = {};
  this.tourStartObj = {};
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

    // Get file field
    var fileField = document.getElementById('siteImage');

    // Get file
    var imageFile = fileField.files[0];
    console.log(imageFile);

    // Create an instance of FormData
    var formData = new FormData();

    // Add image
    formData.append('image', imageFile);

    // Add lat/lon to s
    for (var latitude in c) { s[latitude] = c[latitude]; }
    for (var longitude in c) { s[longitude] = c[longitude]; }
    console.log(s);

    // Add other data to FormData
    formData.append('title', s.title);
    formData.append('description', s.description);
    formData.append('latitude', s.latitude);
    formData.append('longitude', s.longitude);
    formData.append('id', s.id);



    // Set up server to accept image

    // var url = 'https://fathomless-savannah-6575.herokuapp.com';
    // var config = {
    //   headers: {
    //     'Content-Type': undefined
    //   }
    // };

    // return $http.post(url + '/tours/' + c.id + '/sites', formData, config);

    SERVER.CONFIG.headers['Content-Type'] = undefined;

    return $http.post(SERVER.URL + '/tours/' + c.id + '/sites', formData, SERVER.CONFIG);
  }

  function submitTourForm (tourObj) {
    let t = new tour(tourObj);
    console.log(t);
    return $http.post(SERVER.URL + '/tours', t, SERVER.CONFIG);
  }

  function newTourStart () {
    let c = this.markerData;
    let t = this.tourStartObj;
    console.log(t);
    return $http.patch(SERVER.URL + '/tours/' + c.id, t, SERVER.CONFIG);  
  }
};

TourService.$inject = ['UserService', '$stateParams', '$http', 'devURL', 'SERVER'];

export default TourService;