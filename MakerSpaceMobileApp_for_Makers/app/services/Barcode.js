define(['require', 'lodash'],

    function (require, _) {

        return [{
            type: 'service',
            name: 'Barcode_scan',
            deps: ['Apperyio', scan]
        }];

        function scan(Apperyio) {
            var $q = Apperyio.get('$q');

            return function (config) {
                var deferred = $q.defer(),
                    serviceSettings = Apperyio.EntityAPI("Barcode_scan");

                if (_.isUndefined(serviceSettings.echo)) {
                    if (!window.cordova == undefined || window.cordova.plugins == undefined || window.cordova.plugins.barcodeScanner == undefined) {
                        deferred.reject('BarcodeScanner not found');
                    } else {
                        cordova.plugins.barcodeScanner.scan(deferred.resolve, deferred.reject);
                    }
                } else {
                    deferred.resolve(JSON.parse(serviceSettings.echo));
                }
                return deferred.promise;
            };
        }
    });

