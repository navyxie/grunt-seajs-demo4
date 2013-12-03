define(function(require,exports,module){
    var _ = require('underscore'),BB = require('backbone'),UTIL = require('../vendors/util'),$ = require('jquery');
    var getTpl = UTIL.TPL.get;
    var titleView = BB.View.extend({
        className:'navLi',
        tagName:'li',
        template:_.template(getTpl.call(UTIL.TPL,'title')),
        initialize:function(){
            var self = this;
            self.$el = $(this.el);
            self.model.bind('change',this.render,this);
            self.model.bind('destroy',this.remove,this);
        },
        render:function(){
            this.$el.append(this.template(this.model.toJSON()));
            return this;
        },
        remove:function(){
            self.$el.remove();
            return this;
        }
    });
    module.exports = titleView;
});