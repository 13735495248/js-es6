
    function get(url){
    return new Promise((resolve,reject)=>{
    axios.get("http://116.62.244.221/"+url).then(function(res){
      resolve(res["data"]);
    }).catch(function(err){
      reject("请求失败");
    })
    })
    }

    function post(url,json){
        return new Promise((resolve,reject)=>{
        axios.post("http://116.62.244.221/"+url,json).then(function(res){
          resolve(res["data"]);
        }).catch(function(err){
          reject("请求失败");
        })
        })
        }