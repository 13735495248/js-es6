var PubSub = {};
//订阅消息
PubSub.subscribe = function(eventName,callback){
  //如果事件名不存在对象属性中,将属性的值设置为空数组
  if(!(eventName in this)){
     this[eventName] = [];
  }
    //将回调函数存到数组中
    this[eventName].push(callback);
}

//发布消息
PubSub.publish = function(eventName,...args){
    //如果事件不存在,直接return
    if(!this[eventName])return;
    //循环事件数组,取出事件并执行
    for(var event of this[eventName]){
       event(args);
    }
}

//取消订阅
PubSub.remove = function(eventName){
    for (const key in this) {
        if(key === eventName){
            delete this[eventName];
        }
    }
}
