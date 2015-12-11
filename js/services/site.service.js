let SiteService = function(UserService, $stateParams, $http, SERVER) {
  
  function getSites(tour) {
    let getURL = SERVER.URL + 'tours/' + tour.id + '/sites';
    return $http({
      method: 'GET',
      url: getURL
    });
  }

};

SiteService.$inject = ['UserService', '$stateParams', '$http', 'SERVER'];

export default SiteService;