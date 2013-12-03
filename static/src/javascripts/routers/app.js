define(function(require,exports,module){
    var $ = require('jqmobile');
    var BB = require('backbone');
    var journalView = require('../views/journal');
    var UTIL = require('../vendors/util');
    var os = UTIL.OS.detect(navigator.userAgent);
    var pageTransition = 'flip';
    //判断是否是低于android3.0的系统，低版本的android系统对css动画支持不友好，取消转场效果
    if(os.os['android'] && parseInt(os.os['version'].slice(0,1)) < 3){
        //oldAndroid ,version < 3
        pageTransition = 'none';
    }
    //记录是否已记载过日志的数据及查询条件    
    var loadDataMap = {
        'index':{loaded:false,query:{jd:'2013-10-18',jn:1},el:'#indexContent'},
        'newest':{loaded:false,query:{jd:'2013-10-18',jn:2},el:'#newestContent'},
        'lastest':{loaded:false,query:{jd:'2013-10-18',jn:3},el:'#lastestContent'}
    };
    var workspace = BB.Router.extend({
        initialize:function(options){
            var self = this;
            $('.footer').on('tap','.barNav',function(e){
                var eTarget = $(e.target);
                if(eTarget.hasClass('barNav')){
                    eTarget = eTarget;                   
                }else{
                    eTarget = eTarget.parent();
                }  
                self.navigate(eTarget.attr('klg-page-id'),{trigger: true, replace: true});            
            });
        },
        routes:{
            '':'index',
            'index':'index',
            'newest':'newest',
            'lastest':'lastest'
        },
        index:function(){
            this.showPage('index');
        },
        newest:function(){
            this.showPage('newest');
        },
        lastest:function(){
            this.showPage('lastest');
        },
        start:function(){
            BB.history.start();
            return this;
        },
        showPage:function(pageId){
            if(!loadDataMap[pageId]['loaded']){
                loadDataMap[pageId]['loaded'] = true;
                new journalView({el:loadDataMap[pageId]['el'],query:loadDataMap[pageId]['query']});
            }
            $.mobile.changePage('#'+pageId,{transition: pageTransition});
        }
    }); 
    module.exports = workspace; 
});