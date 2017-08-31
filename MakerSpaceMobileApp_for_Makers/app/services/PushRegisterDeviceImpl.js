define(['require', 'lodash', 'angular', 'Apperyio'], function(require, _, angular, Apperyio) {

    var addOnPushListener = function(pushNotification) {
        pushNotification.on('notification', function(data) {
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent('push-notification', true, true, data);
            document.dispatchEvent(event);
        });
    };

    var quiteRegister = function() {
        var pushSettings = JSON.parse(localStorage.getItem("PushNotificationSettings"));
        if (_.isNull(pushSettings)) {
            return;
        }
        var pushNotification = PushNotification.init(pushSettings);
        addOnPushListener(pushNotification);
    };

    document.addEventListener("deviceready", quiteRegister);

    return [{
        name: 'PushRegisterDevice',
        type: 'service',
        deps: ['Apperyio', 'REST', registerDevice]
    }];

    function registerDevice(Apperyio, REST) {

        var pushSettings = Apperyio.Config.get('PushNotification'),
            serviceSettings = Apperyio.EntityAPI("PushRegisterDevice"),
            restDefaults = serviceSettings.request.data,
            pushNotificationDeviceID,
            deviceTimeZone,
            pushNotificationToken,
            pushInitialized = false,
            restConfig = {},
            restService,
            $injector = angular.injector(['ng']),
            $q = $injector.get('$q');

        document.removeEventListener("deviceready", quiteRegister);
        document.addEventListener("deviceready", function() {
            var platform = /(A|I|W)/.exec(/(Android|iOS|Win)/.exec(device.platform)[0].toUpperCase())[0];
            Apperyio.Config.add('PushNotification.platform', platform);

            pushNotificationDeviceID = device.uuid;

            Apperyio.Config.add('PushNotification.deviceId', pushNotificationDeviceID);
            var offset = new Date().getTimezoneOffset();
            var hr = parseInt(offset / (-60));
            var min = -offset - hr * 60;
            var tmin = '' + min;
            deviceTimeZone = 'UTC' + (hr > 0 ? '+' + hr : hr) + ':' + (tmin.length > 1 ? tmin : '0' + tmin);
            Apperyio.Config.add('PushNotification.deviceTimeZone', deviceTimeZone);

            var pushNotification = PushNotification.init(pushSettings);
            pushNotification.on('registration', function(status) {
                pushNotificationToken = status.registrationId;
                Apperyio.Config.add('PushNotification.token', pushNotificationToken);
                var data = {
                    type: platform,
                    deviceID: pushNotificationDeviceID,
                    timeZone: deviceTimeZone,
                    token: pushNotificationToken
                };
                data = _.extend({}, data, restDefaults);
                restConfig.url = pushSettings.url;
                restConfig.method = "post";
                restConfig.headers = {
                    "X-Appery-App-Id": pushSettings.guid
                };
                restConfig.params = {};
                restConfig.aio_config = {
                    requestType: "json",
                    responseType: "json"
                };
                restConfig.data = data;

                var event = document.createEvent('Event');
                event.initEvent('pushinit', true, true);
                document.dispatchEvent(event);
            });

            addOnPushListener(pushNotification);

            pushNotification.on('error', function(e) {
                console.log("Error: " + e.message);
            });

        });

        document.addEventListener("pushinit", function() {
            pushInitialized = true;
        });

        return function(options) {
            var deferred = $q.defer();
            if (_.isUndefined(serviceSettings.echo)) {
                requestData = {
                    data: options
                };

                if (pushInitialized) {
                    if (_.isUndefined(restService)) {
                        restService = new REST();
                        restService.setDefaults(restConfig);
                    }
                    sendRest(restService, deferred, requestData, Apperyio);
                } else {
                    document.addEventListener("pushinit", function() {
                        if (_.isUndefined(restService)) {
                            restService = new REST();
                            restService.setDefaults(restConfig);
                        }
                        sendRest(restService, deferred, requestData, Apperyio);
                    });
                }
            } else {
                deferred.resolve(JSON.parse(serviceSettings.echo));
            }
            return deferred.promise;
        };
    }

    function sendRest(restService, deferred, requestData, Apperyio) {
        restService.execute(requestData).then(
            function(success) {
                Apperyio.Config.add('PushNotification.registered', true);
                localStorage.setItem("PushNotificationSettings", JSON.stringify(Apperyio.Config.get('PushNotification')));
                deferred.resolve(success.data);
            },
            function(error) {
                deferred.reject(error);
            });
    }

});