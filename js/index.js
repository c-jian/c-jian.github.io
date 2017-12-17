
var swrap=document.getElementsByClassName('s-wrap')[0];//顶部搜索div

var carousel=document.getElementsByClassName('carousel')[0];//轮播区域section

var totalH=carousel.offsetHeight-swrap.offsetHeight;/*变化总高度*/

window.onscroll=changebg;//滚动条事件 

/*顶部导航背景颜色过渡效果*/
function changebg(){
    var stop=document.body.scrollTop;/*当前高度*/
    var a=0.85*(stop/totalH);
    a=a.toFixed(2);//取两位小数
    swrap.style.background='rgba(201,21,35,'+a+')';
    if(a>0.85){
        swrap.style.background='rgba(201,21,35,0.85)';
    }
}

/*轮播图*/
var list=carousel.getElementsByClassName('list')[0];/*轮播ul*/
var lis=list.getElementsByTagName('li');/*所有li*/
var liw=lis[0].offsetWidth;/*li宽*/
var circleUl=carousel.getElementsByClassName('circle')[0];//小圆点ul
var circleLi=circleUl.getElementsByTagName('li');//小圆点li
var timer=null;//定时器

//添加transiton过渡
function addTransiton(){
    list.style.transition='0.3s';
    list.style.webKitTransition=' 0.3s';
}
//删除相关过渡
function removeTransition(){
    list.style.transition='none';
    list.style.webKitTransition='none';
    list.style.transform='none';
    list.style.webKitTransform='none';
}
//添加transform
function addTransform(num){
    list.style.transform='translateX('+(num)+'px)';
    list.style.webKitTransform='translateX('+(num)+'px)';
}


var iNow=1;//初始展示图片
var preObj=circleLi[0];//初始小圆点对象

run();

function run(){

    //开启定时器
    timer=setInterval(function(){

        iNow++;//变下一张图片

        addCircle();//更改小圆点位置

        addTransiton();//添加过渡
        addTransform(-iNow*liw);//滑动到下一张

    },3000);

    //防止图片滑动过界
    list.addEventListener('transitionEnd',function(){
        judge()
    },false);

    list.addEventListener('webkitTransitionEnd',function(){
        judge(); 
    },false);


}

//判断当前li是否到达最大或最小
function judge(){
    if(iNow>=lis.length-1){
        removeTransition()
        iNow=1;   
    }else if(iNow<=0){
        removeTransition()
        iNow=lis.length-2;
    }
    addTransform(-iNow*liw);//因为上面删除了过渡，所以会瞬间回到想要的位置
}

//给小圆点添加背景
function addCircle(){

    if(iNow-1<0){//解决第一次触摸向左滑动时减出负数的问题
        preObj.className='';
        circleLi[7].className='active';
        preObj=circleLi[7];
    }else{
        preObj.className='';
        circleLi[(iNow-1)%8].className='active';
        preObj=circleLi[(iNow-1)%8];
    }

}

/*移动端事件*/
var timerout=null,startX=startY=endX=endY=0;
var moveX,curX=0;
carousel.addEventListener('touchstart',function(ev){

    startX=ev.targetTouches[0].clientX;//记录起始点

},false);

carousel.addEventListener('touchmove',function(ev){
    
    endX=ev.targetTouches[0].clientX;//终点/移动过程的点

    if(Math.abs(startX-endX)>20){//如果滑动距离大于20，说明是想通过滑动图片切换到下一张
        clearInterval(timer);//此时清掉定时器
        addTransform((endX-startX)-liw*iNow);//让图片跟随滑动
    }
    

},false);

carousel.addEventListener('touchend',function(ev){

    var direction=startX-endX>0?true:false;//判断方向 [ true < ] [ false > ]
    var range=Math.abs(startX-endX);//抬起时与按下时的距离

    if(range>20 && range>liw/3){//如果距离20~到li的3分之一的距离说明是想通过手动滑动切换图片
        
        //清除定时器
        clearInterval(timer); 
        clearTimeout(timerout);

        //判断用户方向操作
        direction?iNow++:iNow--;
        
        //加过渡
        addTransiton();
        //移动
        addTransform(-iNow*liw);

        //同时更改小圆点
        addCircle(); 
        //重新开启定时器
        timerout=setTimeout(run,0);

    }else{
        //如果距离较小，恢复到原来位置
        addTransiton();
        addTransform(-iNow*liw);
        //重新开启定时器
        timerout=setTimeout(run,0);
    }




},false);

