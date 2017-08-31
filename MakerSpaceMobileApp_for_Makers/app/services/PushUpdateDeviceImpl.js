define(['require', 'lodash', 'angular', 'Apperyio'], function(require, _, angular, Apperyio) {

    return [{
        name: 'PushUpdateDevice',
        type: 'service',
        deps: ['Apperyio', 'REST', updateDevice]
    }];

    function updateDevice(Apperyio, REST) {

        var serviceSettings = Apperyio.EntityAPI("PushUpdateDevice"),
            restDefaults = serviceSettings.request.data,
            $injector = angular.injector(['ng']),
            $q = $injector.get('$q'),
            restService;

        function generateRestConfig(pushSettings, restDefaults) {
            restConfig = {};
            var data = {
                type: pushSettings.platform,
                deviceID: pushSettings.deviceId,
                timeZone: pushSettings.deviceTimeZone,
                token: pushSettings.token
            };

            data = _.extend({}, data, restDefaults);

            restConfig.url = pushSettings.url + "/" + encodeURIComponent(pushSettings.deviceId);
            restConfig.method = "put";
            restConfig.headers = {
                "X-Appery-App-Id": pushSettings.guid
            };
            restConfig.params = {};
            restConfig.aio_config = {
                requestType: "json",
                responseType: "json"
            };
            restConfig.data = data;
            return restConfig;
        }

        return function(options) {
            var deferred = $q.defer(),
                pushSettings = Apperyio.Config.get('PushNotification');
            if (_.isUndefined(serviceSettings.echo)) {
                if (!pushSettings.registered) {
                    pushSettings = JSON.parse(localStorage.getItem("PushNotificationSettings"));
                    if (_.isNull(pushSettings) || !pushSettings.registered) {
                        deferred.reject("Device is not registered");
                        return deferred.promise;
                    }
                }
                restService = new REST();
                restService.setDefaults(generateRestConfig(pushSettings, restDefaults));
                var requestData = {
                    data: options
                };
                restService.execute(requestData).then(
                    function(success) {
                        deferred.resolve(success.data);
                    },
                    function(error) {
                        deferred.reject(error);
                    });
            } else {
                deferred.resolve(JSON.parse(serviceSettings.echo));
            }
            return deferred.promise;
        };
    }
});