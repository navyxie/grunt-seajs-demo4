define(function(require){
    var $ = require('jqmobile');
    $(function(){
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        var UTIL = require('./vendors/util');
        var TPL = UTIL.TPL;
        TPL.loadTemplates(['title','item','journal'],function(){        
            var BB = require('backbone');
            var appView = require('./views/app');            
            new appView();
            if(!window.appConfig.debug){
                //require.async 实际上调用的是seajs.use 方法
                seajs.use(['cordova','message','toast'],function(cordova,message,toast){
                    var exitFlag = 0;
                    document.addEventListener("deviceready", onDeviceReady, false);
                    function onDeviceReady() {
                    // 注册回退按钮事件监听器
                        document.addEventListener("backbutton", onBackKeyDown, false); //返回键
                    } 
                    function onBackKeyDown(){
                        if($.mobile.activePage.is('#index')){
                            if(exitFlag < 1){
                                toast.plugins.ToastPlugin.ShowToast('再按一次退出程序',3000);
                                exitFlag++;
                            }else if(exitFlag === 1){
                                onConfirm();
                            }                    
                        }else{
                            exitFlag = 0;
                            if (typeof (navigator.app) !== "undefined") {
                                navigator.app.backHistory();
                            } else {
                                window.history.back();
                            }
                        } 
                    }
                    function onConfirm(){
                        navigator.app.exitApp(); //退出app
                    }  
                });
            }
        });
    });
});