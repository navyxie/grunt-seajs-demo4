define(function(require,exports,module){
    var _ = require('underscore'),BB = require('backbone'),UTIL = require('../vendors/util'),$ = require('jquery');
    var waterFallCol = 2,WaterFall = UTIL.WaterFall,DATE = UTIL.Date,LOAD = UTIL.LOAD,setWaterFalColWidth = false,winObj = $(window),winHeight = winObj.height(),headerHeight = $('#index').find('.header').height();
    var itemView = require('./item'),journalModel = require('../models/journal'),getTpl = UTIL.TPL.get,itemCollection = require('../collections/item');
    var journalView = BB.View.extend({
        className:'journalView',
        template:_.template(getTpl.call(UTIL.TPL,'journal')),
        initialize:function(){
            var self = this; 
            self.el = $(self.el);      
            self.itemView = itemView;
            self.journalModel = new journalModel();
            self.journalModel.bind('change',this.render,this);
            self.itemCollection = new itemCollection();          
            self.itemCollection.bind('add',self.addOne,self);
            self.itemCollection.bind('reset',self.addAll,self);           
        },
        events:{          
        },
        fetchData:function(data,cbf){
            var self = this;
            LOAD.show();
            self.journalModel.fetch({
                data:data,
                success:function(model, response, options){
                    cbf(null,arguments);                               
                    LOAD.hide();     
                },
                error:function(){
                    alert('获取数据失败,请检查网络');
                    console.log('+++++++++++++++++++');
                    console.log(window.appConfig.appHost);
                    console.log(JSON.stringify(self.queryObj));
                    console.log(self.journalModel.url);
                    console.log('------------------');
                    cbf({err:'获取数据失败'},arguments);
                    LOAD.hide();     
                }
            }); 
        },
        render:function(){
            var self = this;
            var response = self.journalModel.toJSON();
            //准备banner和标题的数据
            var title = response.tle;
            var dateTime = new Date(DATE.translateIOSDate(response.pubTime ? response.pubTime : response.jd));
            //dateTime这里的时间转化有问题，自行处理
            // var englishM = DATE.getEnglishMonth(dateTime.getMonth());
            var englishM = 1+dateTime.getMonth();
            var tempTitle1 = title;
            var tempTitle2 = title;
            var tempIndex = title.indexOf('】');
            if(tempIndex !== -1){
                tempTitle1 = title.slice(0,tempIndex+1);
                tempTitle2 = title.slice(tempIndex+1);
            }                  
            self.el.append(self.template({banner:response.banner,blogId:response.blogId,bTitle:tempTitle1,sTitle:tempTitle2,month:englishM,date:dateTime.getDate()}));
            //渲染banner和标题的结束
            //准备瀑布流的容器
            self.waterObj = new WaterFall(waterFallCol);
            self.waterFallContainer = self.el.find('.jContent').append(self.waterObj.makeColHtml());
            self.waterFallObj = self.waterFallContainer.find('.waterCol'); 
            if(!setWaterFalColWidth){
                setWaterFalColWidth = true;
                UTIL.setWaterFalColWidth($(self.waterFallObj[0]).width());          
            } 
            //准备瀑布流的容器结束
            self.renderItems(response);    
            return self;
        },
        renderItems:function(response){     
            //set items to itemCollection start
            var items = response.items;
            var self = this;
            var filterItems = _.filter(items,function(item){
                return item['pic_size'];
            });
            self.itemCollection.reset();
            self.itemCollection.add(filterItems);
            //set items to itemCollection end
        },
        addOne:function(model){
            var self = this;
            var initItemView = new self.itemView({model:model});
            $(self.waterFallObj[self.waterObj.getMinIndex()]).append(initItemView.render().el);
            self.waterObj.pushItem(model.toJSON()['pic_size']['rh']);
        },
        addAll:function(){
            var self = this;
            self.itemCollection.each(function(){
                self.addOne.apply(self,arguments);
            });
        }
    });
    module.exports = journalView
});