var trash=document.getElementsByClassName('trash');//垃圾桶

var ok=document.getElementsByClassName('ok')[0];//弹窗确认删除按钮
var cancel=document.getElementsByClassName('cancel')[0];//弹窗取消删除按钮

var delwindow=document.getElementById('del-window');//弹窗，包含遮罩层
var delbox=delwindow.getElementsByClassName('del-box')[0];//弹窗盒子


var deltop=null;//垃圾桶盖
//垃圾桶的单击事件
for(var i=0,len=trash.length;i<len;i++){
    trash[i].onclick=function(){

        //显示弹窗
        delwindow.style.display='block';
        delbox.className='del-box out';

        //垃圾桶盖
        deltop=this.getElementsByClassName('del-top')[0];
        
        //打开垃圾盖
        deltop.style.transition='.5s';
        deltop.style.transform='translateY(-4px) translateX(-2px) rotate(-30deg)';

    }
}

//弹窗取消按钮单击事件
cancel.onclick=function(){
    
     //隐藏弹窗
    delwindow.style.display='none';
    delbox.className='del-box';

    //关闭垃圾盖
    deltop.style.transform='translateY(0px) translateX(0px) rotate(0deg)';

}


//复选框单击事件
var checkbox=document.getElementsByClassName('checkbox');

for(var i=0,len=checkbox.length-1;i<len;i++){

    checkbox[i].onclick=function(){

        if(this.getAttribute('checked')){
           this.removeAttribute('checked');
        }else{
           this.setAttribute('checked','true');
        }

        //判断如果全选了就勾选全选按钮，否则取消全选按钮
        var sign=0;
        for(var j=0;j<len;j++){

            if(checkbox[j].getAttribute('checked')){
                sign+=1;
            }

        }
        if(sign==len){
            checkbox[len].setAttribute('checked','true');
        }else{
            checkbox[len].removeAttribute('checked');
        }
    }
}

//结算全选按钮单击事件
checkbox[len].onclick=function(){
    if(this.getAttribute('checked')){
        for(var i=0,len=checkbox.length;i<len;i++){
            checkbox[i].removeAttribute('checked');
        }
    }else{
        for(var i=0,len=checkbox.length;i<len;i++){
            checkbox[i].setAttribute('checked','true');
        }
    }
}