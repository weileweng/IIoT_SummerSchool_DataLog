define(['require'], function(require) {

    /**
     * Models generated from "Model and Storage" and models extracted from services.
     * To generate entity use syntax:
     * Apperyio.EntityAPI("<model_name>[.<model_field>]");
     */

    var models = {
        "Machine": {
            "type": "object",
            "properties": {
                "login": {
                    "type": "boolean"
                },
                "type": {
                    "type": "string"
                },
                "currentMachineBooker": {
                    "type": "string"
                },
                "booked": {
                    "type": "boolean"
                },
                "currentMachineUser": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                }
            }
        },
        "numberList": {
            "type": "array",
            "items": [{
                "type": "number"
            }]
        },
        "String": {
            "type": "string"
        },
        "Boolean": {
            "type": "boolean"
        },
        "queryTimeSeries": {
            "type": "object",
            "properties": {
                "limit": {
                    "type": "string"
                },
                "order": {
                    "type": "string"
                },
                "start": {
                    "type": "string"
                },
                "tag_name": {
                    "type": "string"
                }
            }
        },
        "stringList": {
            "type": "array",
            "items": [{
                "type": "string"
            }]
        },
        "MachineList": {
            "type": "array",
            "items": [{
                "type": "Machine"
            }]
        },
        "Number": {
            "type": "number"
        },
        "User": {
            "type": "object",
            "properties": {
                "password": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "country": {
                    "type": "string"
                },
                "sessionToken": {
                    "type": "string"
                },
                "username": {
                    "type": "string"
                }
            }
        },
        "dataTimeSeires": {
            "type": "object",
            "properties": {
                "stamps": {
                    "type": "stringList"
                },
                "values": {
                    "type": "numberList"
                }
            }
        },
        "Weather": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string"
                },
                "location": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "temperature": {
                    "type": "string"
                }
            }
        },
        "RegisterNewUser_service": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/code/908ba14b-c979-4626-8d73-d204adc29dac/exec"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "data"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {
                                "email": {
                                    "type": "string",
                                    "default": "joe@appery.io"
                                },
                                "password": {
                                    "type": "string",
                                    "default": "123"
                                },
                                "country": {
                                    "type": "string",
                                    "default": "USA"
                                },
                                "username": {
                                    "type": "string",
                                    "default": "joe"
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "text/plain"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "$": {
                                    "type": "object",
                                    "properties": {
                                        "username": {
                                            "type": "string",
                                            "default": "joe1"
                                        },
                                        "email": {
                                            "type": "string",
                                            "default": "joe@appery.io"
                                        },
                                        "country": {
                                            "type": "string",
                                            "default": "USA"
                                        },
                                        "session": {
                                            "type": "string",
                                            "default": "2c807b66-2474-4570-bc6d-b10266923c42"
                                        }
                                    }
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "loadMachinesScript_service": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/code/15cd52dc-a4bd-4ce6-ad49-2463d0964bb9/exec"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "data"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "text/plain"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "$": {
                                    "type": "array",
                                    "items": [{
                                        "type": "object",
                                        "properties": {
                                            "MachineID": {
                                                "type": "string",
                                                "default": "3DPrinter_3"
                                            },
                                            "MachineType": {
                                                "type": "string",
                                                "default": "3DPrinter"
                                            },
                                            "CurrentUser": {
                                                "type": "string",
                                                "default": "BlueMonkey"
                                            },
                                            "Booking": {
                                                "type": "boolean",
                                                "default": false
                                            },
                                            "_createdAt": {
                                                "type": "object",
                                                "properties": {
                                                    "$date": {
                                                        "type": "string",
                                                        "default": "2017-08-26T11:51:59.491Z"
                                                    }
                                                }
                                            },
                                            "CurrentBooker": {
                                                "type": "string",
                                                "default": "BlueMonkey"
                                            },
                                            "_id": {
                                                "type": "string",
                                                "default": "59a160df0f0d31612a2950d7"
                                            },
                                            "_updatedAt": {
                                                "type": "object",
                                                "properties": {
                                                    "$date": {
                                                        "type": "string",
                                                        "default": "2017-08-26T11:52:07.091Z"
                                                    }
                                                }
                                            },
                                            "Logging": {
                                                "type": "boolean",
                                                "default": false
                                            }
                                        }
                                    }]
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "Predix_REST_API_service": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/code/4f0e8ffd-1613-4a05-a4ff-4f28dd91f120/exec"
                },
                "method": {
                    "type": "string",
                    "default": "get"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {}
                        },
                        "query": {
                            "type": "object",
                            "properties": {
                                "tag_order": {
                                    "type": "string",
                                    "default": "asc"
                                },
                                "start_time": {
                                    "type": "string",
                                    "default": "5mi-ago"
                                },
                                "tag_limit": {
                                    "type": "string",
                                    "default": "20"
                                },
                                "tag_name": {
                                    "type": "string",
                                    "default": "unternehmer-3dprinters-temp-plate1"
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "$": {
                                    "type": "object",
                                    "properties": {
                                        "stamps": {
                                            "type": "array",
                                            "items": [{
                                                "type": "string",
                                                "default": "Thu 31 0:1:16"
                                            }]
                                        },
                                        "values": {
                                            "type": "array",
                                            "items": [{
                                                "type": "number",
                                                "default": 24.99
                                            }]
                                        }
                                    }
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "UserDB_MachineState_query_service": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/db/collections/MachineState"
                },
                "method": {
                    "type": "string",
                    "default": "get"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {}
                        },
                        "query": {
                            "type": "object",
                            "properties": {
                                "where": {
                                    "type": "string"
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "X-Appery-Database-Id": {
                                    "type": "string",
                                    "default": "{UserDB_settings.database_id}"
                                },
                                "X-Appery-Session-Token": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "$": {
                                    "type": "array",
                                    "items": [{
                                        "type": "object",
                                        "properties": {
                                            "_id": {
                                                "type": "string",
                                                "default": "59a160df0f0d31612a2950d7"
                                            },
                                            "Logging": {
                                                "type": "boolean",
                                                "default": false
                                            },
                                            "Booking": {
                                                "type": "boolean",
                                                "default": false
                                            },
                                            "_updatedAt": {
                                                "type": "string",
                                                "default": "2017-08-29 09:51:50.615"
                                            },
                                            "acl": {
                                                "type": "object",
                                                "properties": {
                                                    "*": {
                                                        "type": "object",
                                                        "properties": {
                                                            "write": {
                                                                "type": "boolean",
                                                                "default": true
                                                            },
                                                            "read": {
                                                                "type": "boolean",
                                                                "default": true
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "MachineType": {
                                                "type": "string",
                                                "default": "3DPrinter"
                                            },
                                            "_createdAt": {
                                                "type": "string",
                                                "default": "2017-08-26 11:51:59.491"
                                            },
                                            "Booked": {
                                                "type": "string",
                                                "default": "true"
                                            },
                                            "CurrentUser": {
                                                "type": "string",
                                                "default": "123"
                                            },
                                            "MachineID": {
                                                "type": "string",
                                                "default": "3DPrinter_3"
                                            },
                                            "CurrentBooker": {
                                                "type": "string",
                                                "default": "BlueMonkey"
                                            }
                                        }
                                    }]
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "Logging_update_service": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/code/83ba61f9-96a5-4b0b-9a3c-e07a1f2dc859/exec"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "array",
                            "items": [{
                                "type": "string"
                            }]
                        },
                        "query": {
                            "type": "object",
                            "properties": {
                                "login": {
                                    "type": "string",
                                    "default": "false"
                                },
                                "MachineID": {
                                    "type": "string",
                                    "default": "3DPrinter_2"
                                },
                                "User": {
                                    "type": "string",
                                    "default": "test"
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "application/json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "Booking": {
                                    "type": "boolean",
                                    "default": false
                                },
                                "_id": {
                                    "type": "string",
                                    "default": "59a160c30f0d31612a2950d6"
                                },
                                "MachineType": {
                                    "type": "string",
                                    "default": "3DPrinter"
                                },
                                "_updatedAt": {
                                    "type": "object",
                                    "properties": {
                                        "$date": {
                                            "type": "string",
                                            "default": "2017-08-29T07:34:29.859Z"
                                        }
                                    }
                                },
                                "CurrentUser": {
                                    "type": "string",
                                    "default": "test"
                                },
                                "Logging": {
                                    "type": "boolean",
                                    "default": false
                                },
                                "MachineID": {
                                    "type": "string",
                                    "default": "3DPrinter_2"
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "Machine_search_service": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/code/d8a31a5d-17b3-42c9-b6be-84ba7a9a0ee6/exec"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "data": {
                                    "type": "data"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {
                                "MachineID": {
                                    "type": "string",
                                    "default": "3DPrinter_1"
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "text/plain"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "$": {
                                    "type": "object",
                                    "properties": {
                                        "Booking": {
                                            "type": "boolean",
                                            "default": true
                                        },
                                        "_createdAt": {
                                            "type": "object",
                                            "properties": {
                                                "$date": {
                                                    "type": "string",
                                                    "default": "2017-08-26T11:50:54.626Z"
                                                }
                                            }
                                        },
                                        "_id": {
                                            "type": "string",
                                            "default": "59a1609e0f0d31612a2950d5"
                                        },
                                        "CurrentUser": {
                                            "type": "string",
                                            "default": "BlueMonkey"
                                        },
                                        "CurrentBooker": {
                                            "type": "string",
                                            "default": "BlueMonkey"
                                        },
                                        "_updatedAt": {
                                            "type": "object",
                                            "properties": {
                                                "$date": {
                                                    "type": "string",
                                                    "default": "2017-08-26T11:51:23.136Z"
                                                }
                                            }
                                        },
                                        "Logging": {
                                            "type": "boolean",
                                            "default": true
                                        },
                                        "MachineType": {
                                            "type": "string",
                                            "default": "3DPrinter"
                                        },
                                        "MachineID": {
                                            "type": "string",
                                            "default": "3DPrinter_1"
                                        }
                                    }
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "weatherAPI_conditions_weather_get": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/apiexpress/api/conditions/weather"
                },
                "method": {
                    "type": "string",
                    "default": "get"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {}
                        },
                        "query": {
                            "type": "object",
                            "properties": {
                                "location": {
                                    "type": "string"
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "X-Appery-Api-Express-Api-Key": {
                                    "type": "string",
                                    "default": "{weatherAPI_settings.API_EXPRESS_API_KEY}"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "$": {
                                    "type": "object",
                                    "properties": {
                                        "BODY": {
                                            "type": "object",
                                            "properties": {
                                                "city": {
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "type": "number",
                                                            "default": 6940463
                                                        },
                                                        "name": {
                                                            "type": "string",
                                                            "default": "Altstadt"
                                                        },
                                                        "country": {
                                                            "type": "string",
                                                            "default": "DE"
                                                        },
                                                        "coord": {
                                                            "type": "object",
                                                            "properties": {
                                                                "lon": {
                                                                    "type": "number",
                                                                    "default": 11.5752
                                                                },
                                                                "lat": {
                                                                    "type": "number",
                                                                    "default": 48.137
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                "cnt": {
                                                    "type": "number",
                                                    "default": 40
                                                },
                                                "cod": {
                                                    "type": "string",
                                                    "default": "200"
                                                },
                                                "message": {
                                                    "type": "number",
                                                    "default": 0.0045
                                                },
                                                "list": {
                                                    "type": "array",
                                                    "items": [{
                                                        "type": "object",
                                                        "properties": {
                                                            "weather": {
                                                                "type": "array",
                                                                "items": [{
                                                                    "type": "object",
                                                                    "properties": {
                                                                        "id": {
                                                                            "type": "number",
                                                                            "default": null
                                                                        },
                                                                        "icon": {
                                                                            "type": "string"
                                                                        },
                                                                        "description": {
                                                                            "type": "string"
                                                                        },
                                                                        "main": {
                                                                            "type": "string"
                                                                        }
                                                                    }
                                                                }]
                                                            },
                                                            "clouds": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "all": {
                                                                        "type": "number",
                                                                        "default": null
                                                                    }
                                                                }
                                                            },
                                                            "dt": {
                                                                "type": "number",
                                                                "default": null
                                                            },
                                                            "sys": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "pod": {
                                                                        "type": "string"
                                                                    }
                                                                }
                                                            },
                                                            "main": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "temp_max": {
                                                                        "type": "number",
                                                                        "default": null
                                                                    },
                                                                    "temp_kf": {
                                                                        "type": "number",
                                                                        "default": null
                                                                    },
                                                                    "humidity": {
                                                                        "type": "number",
                                                                        "default": null
                                                                    },
                                                                    "pressure": {
                                                                        "type": "number",
                                                                        "default": null
                                                                    },
                                                                    "temp": {
                                                                        "type": "number",
                                                                        "default": null
                                                                    },
                                                                    "grnd_level": {
                                                                        "type": "number",
                                                                        "default": null
                                                                    },
                                                                    "sea_level": {
                                                                        "type": "number",
                                                                        "default": null
                                                                    },
                                                                    "temp_min": {
                                                                        "type": "number",
                                                                        "default": null
                                                                    }
                                                                }
                                                            },
                                                            "dt_txt": {
                                                                "type": "string"
                                                            },
                                                            "wind": {
                                                                "type": "object",
                                                                "properties": {
                                                                    "deg": {
                                                                        "type": "number",
                                                                        "default": null
                                                                    },
                                                                    "speed": {
                                                                        "type": "number",
                                                                        "default": null
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }]
                                                }
                                            }
                                        },
                                        "HTTP_RESPONSE_HEADERS": {
                                            "type": "object",
                                            "properties": {
                                                "Date": {
                                                    "type": "string",
                                                    "default": "Tue, 29 Aug 2017 12:33:57 GMT"
                                                },
                                                "X-Cache-Key": {
                                                    "type": "string",
                                                    "default": "/data/2.5/forecast?q=munich"
                                                },
                                                "Server": {
                                                    "type": "string",
                                                    "default": "openresty"
                                                },
                                                "Content-Type": {
                                                    "type": "string",
                                                    "default": "application/json; charset=utf-8"
                                                },
                                                "Connection": {
                                                    "type": "string",
                                                    "default": "keep-alive"
                                                },
                                                "Access-Control-Allow-Credentials": {
                                                    "type": "string",
                                                    "default": "true"
                                                },
                                                "Content-Length": {
                                                    "type": "string",
                                                    "default": "14487"
                                                },
                                                "Access-Control-Allow-Origin": {
                                                    "type": "string",
                                                    "default": "*"
                                                },
                                                "Access-Control-Allow-Methods": {
                                                    "type": "string",
                                                    "default": "GET, POST"
                                                }
                                            }
                                        },
                                        "HTTP_RESPONSE_CODE": {
                                            "type": "number",
                                            "default": 200
                                        }
                                    }
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        "LoginUser_service": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/code/ece8a746-e40b-4c77-8a0d-c6f1d8eef6a5/exec"
                },
                "method": {
                    "type": "string",
                    "default": "get"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {}
                        },
                        "query": {
                            "type": "object",
                            "properties": {
                                "password": {
                                    "type": "string",
                                    "default": "123"
                                },
                                "username": {
                                    "type": "string",
                                    "default": "joe"
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "$": {
                                    "type": "object",
                                    "properties": {
                                        "session": {
                                            "type": "string",
                                            "default": "2f981112-b457-43e3-96d0-f883dcddf250"
                                        },
                                        "username": {
                                            "type": "string",
                                            "default": "joe"
                                        },
                                        "email": {
                                            "type": "string",
                                            "default": "joe@appery.io"
                                        },
                                        "country": {
                                            "type": "string",
                                            "default": "USA"
                                        }
                                    }
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "Barcode_scan": {
            "type": "object",
            "properties": {
                "request": {
                    "type": "object",
                    "properties": {
                        "data": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "data": {
                            "type": "object",
                            "properties": {
                                "text": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    return models;

});