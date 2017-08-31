define(['require', 'lodash', 'angular', 'Apperyio'], function (require, _, angular, Apperyio) {

    return [
        {
            name: 'PushSend',
            type: 'service',
            deps: ['Apperyio', 'REST', sendPush("PushSend")]
        },
        {
            name: 'PushSchedule',
            type: 'service',
            deps: ['Apperyio', 'REST', sendPush("PushSchedule")]
        }
    ];

    function sendPush(serviceName) {
        return function (Apperyio, REST) {
            var pushConfig = Apperyio.Config.get('PushNotification'),
                pushSettings = Apperyio.Config.get('PushSettings'),
                serviceSettings = Apperyio.EntityAPI(serviceName),
                restDefaults = serviceSettings.request.data,
                restService,
                $injector = angular.injector(['ng']),
                $q = $injector.get('$q');

            return function (options) {
                var deferred = $q.defer();
                if (_.isUndefined(serviceSettings.echo)) {
                    if (_.isUndefined(restService)) {
                        restService = new REST();
                        initREST(restService, pushConfig, pushSettings, restDefaults);
                    }
                    requestData = {
                        data: options
                    };
                    restService.execute(requestData).then(
                        function (success) {
                            deferred.resolve(success.data);
                        },
                        function (error) {
                            deferred.reject(error);
                        });
                } else {
                    deferred.resolve(JSON.parse(serviceSettings.echo));
                }
                return deferred.promise;
            };
        }
    }

    function initREST(restService, pushConfig, pushSettings, restDefaults) {
        var restConfig = {};
        // As in push constants we store URL for device registration, we should rewrite it for sending push notifications
        restConfig.url = pushConfig.url.replace("reg", "msg");
        restConfig.method = "post";
        restConfig.headers = {
            "X-Appery-Push-API-Key": pushSettings.PushApiKey
        };
        restConfig.params = {};
        restConfig.aio_config = {
            requestType: "json",
            responseType: "json"
        };
        restConfig.data = restDefaults;
        restService.setDefaults(restConfig);
    }

});