define(function(require,exports,module){
    var BB = require('backbone');
    var baseUrl = window.appConfig.appHost+'/journallist';
    var titleModel = BB.Model.extend({
        idAttribute:'_id',
        urlRoot:baseUrl,
        url:baseUrl
    });
    module.exports = titleModel;
});