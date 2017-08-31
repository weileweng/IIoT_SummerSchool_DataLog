var datepickerQuery = function(columnName, value){
   var today = new Date(value);
   var todayTimeOffset = today.getTimezoneOffset() / (-60);
   var todayLocalDate = new Date(today.getTime() + todayTimeOffset * 3600000);
   var todayDateText = todayLocalDate.toISOString().replace(/T.*/gi, "");
   var tomorrowLocalDate = new Date(today.getTime() + todayTimeOffset * 3600000 + 86400000);
   var tomorrowDateText = tomorrowLocalDate.toISOString().replace(/T.*/gi, "");
 
   if ((columnName === "_createdAt") || (columnName === "_updatedAt")) {
      return '{"$and":[{"'+columnName+'":{"$gte": {"$date":"'+todayDateText+'"}}}, {"'+columnName+'":{"$lt": {"$date": "'+
tomorrowDateText+'"}}}]}}';
 
   } else {
      return '{"$and":[{"'+columnName+'":{"$gte": "'+todayDateText+'"}}, {"'+columnName+'":{"$lt": "'+
         tomorrowDateText+'"}}]}}';
   }
};