var cate = document.getElementsByClassName('cate')[0];//列表盒子aside
var cateH=cate.offsetHeight;//列表盒子高

var topsearch=document.getElementById('top-search');//顶部搜索section

var cateList = document.getElementsByClassName('cate-list')[0];//列表ul
var lis=cateList.getElementsByTagName('li');//列表ul的li
var cateLH=cateList.offsetHeight+topsearch.offsetHeight; //列表ul高+顶部搜索高

var startY=endY=curY=moveY=0,max=130;
var startTime=0,endTime;
//列表ul开始触屏事件
cateList.addEventListener('touchstart',function(ev){

    //按下的时间
    startTime=new Date().getTime();
    //当前按下点与顶部的距离
    startY=ev.targetTouches[0].clientY;

},false);

//触屏移动事件
cateList.addEventListener('touchmove',function(ev){

    endY=ev.targetTouches[0].clientY;//移动过程中的顶部距离

    moveY=startY-endY;/*向下滑动的时候是负数，向上滑动的时候是正数*/
    
    var cy=curY-moveY;//curY初始0，0-moveY，负变正，正变负，然后在结束时记录当前滑动的距离，curY就变上一次滑动的距离了

    /* 
    cateLH=ul高+顶部搜索高
    cateH=列表盒子高
    cateLH-cateH剩下cateLH-cateH，由于向上滑动是负数了，所以得加负号，而有一个最大距离限制，所以得加上，因为是负数，所以用减号
    */
    if(cy<max && cy>-(cateLH-cateH)-max){
        cateList.style.transition='none';
        cateList.style.webKitTransition='none';
        addTransform(cy);
    }


},false);

//触屏结束事件
cateList.addEventListener('touchend',function(ev){

    //抬起的时间
    endTime=new Date().getTime();

    //如果时间小于150认为是点击
    var time=endTime-startTime;

    if(time<150){

        //清除所有active，并加上索引
        for(var i=0,len=lis.length;i<len;i++){
            lis[i].className='';
            lis[i].index=i;
        }

        //找当前目标元素[a]的父元素[li]
        var aParent=ev.target.parentNode;

        //给li加上active
        aParent.className='active';

        var listTop=-aParent.index*aParent.offsetHeight+aParent.offsetHeight;//当前li与顶部的距离
        
        if(listTop>=0){//距离大于0时，位置不变，指的是前面两个li
            addTransiton();
            addTransform(0);
        }else if(listTop<=-(cateLH-cateH)){//到达最底部时，位置不变
            addTransiton();
            addTransform(-(cateLH-cateH));
        }else{//其他情况
            addTransiton();
            addTransform(listTop);
        }

        

    }


    curY=curY-moveY;//记录移动的距离

    //为什么这里不判断curY>0 && curY<max因为touchmove已经做了限制，如果在这里加判断，反而会有偏差造成不能执行
    if(curY>0){
        addTransiton();
        addTransform(0);
        curY=0;//注意这里需回到 addTransform(0);的位置，也就是0
    }

    //-(cateLH-cateH)再加上max就是能拉动的最大距离
    if(curY<-(cateLH-cateH)-max){
        addTransiton();
        addTransform(-(cateLH-cateH));
        curY=-(cateLH-cateH);//注意这里需回到 addTransform(-(cateLH-cateH));的位置，也就是cateLH-cateH
    }


    

},false);

function addTransiton(){
    cateList.style.transition='0.3s';
    cateList.style.webKitTransition=' 0.3s';
}
function removeTransition(){
    cateList.style.transition='none';
    cateList.style.webKitTransition='none';
    cateList.style.transform='none';
    cateList.style.webKitTransform='none';
}
function addTransform(num){
    cateList.style.transform='translateY('+num+'px)';
    cateList.style.webKitTransform='translateY('+num+'px)';
}

