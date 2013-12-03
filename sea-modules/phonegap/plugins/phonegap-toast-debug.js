//http://blog.sina.com.cn/s/blog_c2918c770101bf1u.html
//window.plugins.ToastPlugin.ShowToast('通讯录',3000);
//第一个参数为显示的内容，第二个参数是显示的时间，单位ms
define('sea-modules/phonegap/plugins/phonegap-toast-debug',['sea-modules/phonegap/cordova/cordova-debug'],function(require,exports,module){
	var cordova = require('sea-modules/phonegap/cordova/cordova-debug');
	var toast = function(){};
	toast.prototype = {
	        ShowToast:function(content,length){
	        	length = length || 3000;
	            return cordova.exec(null, null,"ToastPlugin","toast",[content,length]);
	        }
	};
	cordova.addConstructor(function(){
		if (cordova.addPlugin) {
            cordova.addPlugin("ToastPlugin", new toast());
        }else{
    		if(!cordova.plugins){
    			cordova.plugins = {};        	
    		}
    		cordova.plugins.ToastPlugin = new toast();  
        }    
	});
	module.exports = cordova;
})