define(function(require,exports,module){
    var _ = require('underscore');
    var BB = require('backbone');
    var itemModel = require('../models/item');
    var itemCollection = BB.Collection.extend({
        model:itemModel
    });
    module.exports = itemCollection;
});