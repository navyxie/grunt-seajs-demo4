define(function(require,exports,module){
    var _ = require('underscore');
    var BB = require('backbone');
    var journalModel = require('../models/journal');
    var journalCollection = BB.Collection.extend({
        model:journalModel
    });
    module.exports = journalCollection;
});