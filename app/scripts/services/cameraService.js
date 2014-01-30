'use strict';

angular.module('HybridApp')
    .service('Cameraservice', function Cameraservice($q, Notificationservice, CordovaService, server) {
        return {
            getFileURI: function() {
                var deferred = $q.defer();
                CordovaService.ready.then(function() {
                    navigator.camera.getPicture(function(imageURI) {
                        deferred.resolve(imageURI);
                    }, function() {
                        deferred.reject();
                    }, {
                        quality: 50,
                        destinationType: navigator.camera.DestinationType.FILE_URI,
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                    });
                });
                return deferred.promise;
            },
            uploadImage: function(type, id, imageURI) {
                var deferred = $q.defer();
                var options = new FileUploadOptions();
                options.fileKey = "file";
                var imagefilename = "team_" + id + ".jpg";
                options.fileName = imagefilename;
                options.mimeType = "image/jpg";

                var params = new Object();
                params.imageURI = imageURI;

                options.params = params;
                options.chunkedMode = false;
                var ft = new FileTransfer();
                var url = server + "/" + type + "/" + id + "/img";
                ft.upload(imageURI, url, function win(r) {
                    deferred.resolve();
                }, function fail(error) {
                    deferred.reject();
                }, options, true);
                return deferred.promise;
            }
        }
    });
