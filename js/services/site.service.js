let SiteService = function(UserService, $stateParams, $http, SERVER) {
  
  this.getSites = getSites;

  function getSites(id) {
    let getURL = SERVER.URL + '/tours/' + id + '/sites';
    return $http({
      method: 'GET',
      url: getURL
    });
  }

};

SiteService.$inject = ['UserService', '$stateParams', '$http', 'SERVER'];

export default SiteService;