function getDate(dt){
    //获取年
    var year = dt.getFullYear();
    //获取月
    var month = dt.getMonth() + 1;
    //获取日
    var day = dt.getDate();
    //获取小时
    var hour = dt.getHours();
    return year+'年'+month+'月'+day+'日'+" "+hour+"点"
}