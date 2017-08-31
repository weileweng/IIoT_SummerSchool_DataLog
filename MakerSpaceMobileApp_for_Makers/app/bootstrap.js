'use strict';

(function(window) {

    require.config({
        baseUrl: "app",
        paths: {
            'jasmine_f': '../libs/jasmine/lib/jasmine-core',
            'specs': '../test/specs',
            'angular-mocks': '../libs/angular-mocks/angular-mocks',
            'mocks': '../test/mocks',
            '$Libs': '../libs',
            '$App': '../libs/apperyio',
            '$Screens': 'pages',
            '$Modals': 'modals',
            '$Services': 'services',
            "navigateTo": "services/navigateTo",
            "backButton": "services/backButton",
            "text": "../libs/text",
            "require": "../libs/requirejs/require",
            "angular": "../libs/angular/angular.min",
            "angular-touch": "../libs/angular-touch/angular-touch.min",
            "angular-route": "../libs/angular-route/angular-route.min",
            "ionic": "../libs/ionic/ionic.bundle",
            "appery-ui": "../libs/appery-ui/appery-ui",
            "lodash": "../libs/lodash/dist/lodash.min",
            "gmaps": "../libs/angular-google-maps/angular-google-maps.min",
            "Apperyio": "../libs/apperyio/Apperyio",
            "q": "../libs/ms_sdk_bundle/q/q",
            "localforage": "../libs/ms_sdk_bundle/localforage/dist/localforage",
            "EventEmitter": "../libs/ms_sdk_bundle/EventEmitter.js/EventEmitter",
            "tv4": "../libs/ms_sdk_bundle/tv4/tv4",
            "ms-client-sdk": "../libs/ms_sdk_bundle/client-sdk",
            "CryptoJS": "../libs/ms_sdk_bundle/crypto-js-md5/crypto-js-md5",
            "moment": "../libs/ms_sdk_bundle/moment/moment",
            "cordova": "../libs/cordova",
            "x2js": "../libs/x2js/xml2json",
            "$App/crouterconfig": "../libs/apperyio/crouterconfig",
            "LoginUser_service": "services/LoginUser_service",
            "RegisterNewUser_service": "services/RegisterNewUser_service",
            "dataStorage": "services/dataStorage",
            "loadMachinesScript_service": "services/loadMachinesScript_service",
            "Barcode": "services/Barcode",
            "Machine_search_service": "services/Machine_search_service",
            "chart": "services/chart",
            "angular-chart": "services/angular-chart",
            "PushRegisterDeviceImpl": "services/PushRegisterDeviceImpl",
            "PushUnregisterDevice": "services/PushUnregisterDevice",
            "PushUpdateDeviceImpl": "services/PushUpdateDeviceImpl",
            "PushSendImpl": "services/PushSendImpl",
            "DatePicker": "services/DatePicker",
            "UserDB_MachineState_query_service": "services/UserDB_MachineState_query_service",
            "JavaScript1": "services/JavaScript1",
            "Logging_update_service": "services/Logging_update_service",
            "weatherAPI_conditions_weather_get": "services/weatherAPI_conditions_weather_get",
            "Predix_REST_API_service": "services/Predix_REST_API_service",
            '$Charts_update': 'pages/Charts_update',
            '$MachineOverview': 'pages/MachineOverview',
            '$Account': 'pages/Account',
            '$Charts': 'pages/Charts',
            '$Login': 'pages/Login',
            '$MachineList': 'pages/MachineList',
            '$Menu': 'pages/Menu',
            '$Register': 'pages/Register',
            '$Scan': 'pages/Scan'
        },
        waitSeconds: 100,
        shim: {
            "angular": {
                exports: "angular"
            },
            "angular-touch": {

                deps: ["angular"]
            },
            "angular-route": {

                deps: ["angular"]
            },
            "ionic": {

                deps: ["angular", "cordova"]
            },
            "appery-ui": {

                deps: ["angular"]
            },
            "lodash": {
                exports: "_"
            },
            "gmaps": {

                deps: ["angular"]
            },
            "CryptoJS": {
                exports: "CryptoJS"
            },
            "x2js": {
                exports: "X2JS"
            },

            'jasmine_f/boot': {
                deps: ['jasmine_f/jasmine-html']
            },
            'jasmine_f/jasmine-html': {
                deps: ['jasmine_f/jasmine']
            },
            'angular-mocks': {
                deps: ['angular', 'jasmine_f/boot']
            }
        }
    });

    define('angular', [], function() {
        return window.angular;
    });

    window.__APPLICATION_NAME = "AppModule_MakerSpace_Makers";

    if (window.location.href.indexOf('tests.html') > -1) {
        require(["require", "angular", "app", '../test/tests_asset'], function() {});
    } else {
        require(["require", "angular", "app", "ionic", "appery-ui"], function(require, angular) {
            // Run APP
            angular.bootstrap(document.documentElement, [window.__APPLICATION_NAME]);
        });
    }
})(this);