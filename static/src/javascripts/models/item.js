define(function(require,exports,module){
    var BB = require('backbone');
    var itemModel = BB.Model.extend({
        idAttribute:'_id',
    });
    module.exports = itemModel;
});