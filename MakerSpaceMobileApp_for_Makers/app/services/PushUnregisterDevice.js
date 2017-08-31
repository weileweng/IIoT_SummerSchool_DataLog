define(['require', 'lodash', 'angular', 'Apperyio'], function(require, _, angular, Apperyio) {

    return [{
        name: 'PushUnregisterDevice',
        type: 'service',
        deps: ['Apperyio', 'REST', unregisterDevice]
    }];

    function unregisterDevice(Apperyio, REST) {

        var $injector = angular.injector(['ng']),
            $q = $injector.get('$q'),
            restService;

        function generateRestConfig(pushSettings) {
            restConfig = {};

            restConfig.url = pushSettings.url + "/" + encodeURIComponent(pushSettings.deviceId);
            restConfig.method = "delete";
            restConfig.headers = {
                "X-Appery-App-Id": pushSettings.guid
            };
            restConfig.params = {};
            restConfig.aio_config = {
                requestType: "json",
                responseType: "json"
            };
            return restConfig;
        }

        return function(options) {
            var deferred = $q.defer(),
                pushSettings = Apperyio.Config.get('PushNotification');
            if (!pushSettings.registered) {
                pushSettings = JSON.parse(localStorage.getItem("PushNotificationSettings"));
                if (_.isNull(pushSettings) || !pushSettings.registered) {
                    deferred.reject("Device is not registered");
                    return deferred.promise;
                }
            }
            restService = new REST();
            restService.setDefaults(generateRestConfig(pushSettings));
            restService.execute({}).then(
                function(success) {
                    Apperyio.Config.add('PushNotification.registered', false);
                    localStorage.setItem("PushNotificationSettings", JSON.stringify(Apperyio.Config.get('PushNotification')));
                    deferred.resolve(success);
                },
                function(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };
    }
});