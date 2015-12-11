let UploadService = function($http, FILESERVER) {
  
  this.upload = upload;

  function upload (file) {

    let formData = new FormData();
    formData.append('upload', file);
    // formData.append('details', JSON.stringify({ name: 'Tim' }));

    return $http.post(FILESERVER.URL, formData, FILESERVER.CONFIG);
  }

};

UploadService.$inject = ['$http', 'FILESERVER'];

export default UploadService;


// refactor into vm