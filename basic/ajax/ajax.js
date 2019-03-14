function ajax(option){
        option = option||{};
        option.type = option.type||'GET';
        option.dataType = option.dataType||'text';
        option.data=option.data||{};
        //数据组装
        let arr = []
        for(let key in  option.data){
            let name = key;
            let value = option.data[name];
            arr.push(`${name}=${value}`);       
        }
        let arrStr = arr.join('&');
        let xhr = new XMLHttpRequest();
        if(option.type == 'post'){
            xhr.open('POST',option.url,true);
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send(arrStr);
        }else{
            xhr.open('GET', options.url+'?'+strData, true);
            xhr.send();
        }
        xhr.onreadystatechange=function(){
            if(xhr.readyState ==4){
                if((xhr.status >=200&&xhr.status<300)||xhr.status == 304){
                    option.succsss&&option.success(xhr.responseText);
                }else{
                    option.error&&option.error("失败");
                }
            }
        }
}