define(function(require,exports,module){
    var BB = require('backbone');
    var baseUrl = window.appConfig.appHost+'/journalinfo';
    var journalModel = BB.Model.extend({
        idAttribute:'blogId',
        urlRoot:baseUrl,
        url:baseUrl,
        parse:function(response){
            return response;
        }
    });
    module.exports = journalModel;
});