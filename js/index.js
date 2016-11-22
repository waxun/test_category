/*
* @Author: Administrator
* @Date:   2016-11-17 09:02:00
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-18 08:54:46
*/

'use strict';
// 动态设置topbar的透明度
/* 思路：
	（1）给window绑定scroll事件
	（2）获取被卷去的头部 / 设定的最大滚动值 = 透明度
*/
var jd_header = document.querySelector('.jd_header');
window.addEventListener('scroll',function(){
	// 实时获取被卷曲的头部
	var _scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	if(_scrollTop > 600){
		jd_header.style.backgroundColor = 'rgba(209,56,68,1)';
	}else{
		jd_header.style.backgroundColor = 'rgba(209,56,68,'+ _scrollTop/600+')';
	}
});


// 设置京东快报的小轮播效果
/*轮播的原理 
（1）克隆第0个li元素 追加到scroll_news里面去
（2）添加一个index信号量 自动累加
（3）在过渡的结束的时候去判断当前的index值，如果超出最后一张，立马瞬移会第0张，同时设置index的值为0
（4）过渡的时间设置尽量小于定时器的时间设置
*/

//（1）克隆第0个li元素 追加到scroll_news里面去
var scroll_news = document.querySelector('.scroll_news');
var scroll_list = scroll_news.querySelectorAll('li');
// 声明一个index信号量
var index = 0;
scroll_news.appendChild(scroll_list[0].cloneNode(true));
// （2）添加一个index信号量 自动累加
var newsTimer = setInterval(function(){
	// 自动累加
	index++
	// 让scroll_news走起来，走的距离就是一个LI的高度*index
	// 同时给scroll_news添加过渡
	if(!scroll_news.classList.contains('transitionAll')){
		scroll_news.classList.add('transitionAll');
	}
	scroll_news.style.webkitTransform = 'translateY('+-index*scroll_list[0].offsetHeight+'px)';
}, 2000);
//过渡结束事件
scroll_news.addEventListener('transitionend',function (argument) {
	// 当超过最后一张立马回头
	if(index > scroll_list.length - 1){
		// 移除过渡
		if(scroll_news.classList.contains('transitionAll')){
			scroll_news.classList.remove('transitionAll');
		}
		scroll_news.style.webkitTransform = 'translateY(0px)';
		// 还原index值
		index = 0;
	}
})

/**
 * 手机轮播：
 * 主要思路：其实本质上就是让三个位置的图片实现轮转
 *
 * 
 */
var course = document.querySelector('.course');
var course_wrap = course.querySelector('.course_wrap');
var course_list = course_wrap.querySelectorAll('li');
var screenWidth = document.documentElement.offsetWidth;
//  获取LI的高度赋值给ul 
course_wrap.style.height = course_list[0].offsetHeight +'px';
var points_wrap = course.querySelector('.points_wrap');
// 自动生成小圆点
// 根据多少个li自动生成多少个小圆点，追加到points_wrap里面
for(var i = 0; i < course_list.length; i++){
	var li = document.createElement('li');
	if(i == 0){
		li.classList.add('active');
	}
	points_wrap.appendChild(li);
}
// 初始化
var left,right,center;
center = 0;
right = 1;
left = course_list.length - 1;
// 最开始的三张图片先就位
course_list[center].style.webkitTransform = 'translateX(0px)';
course_list[left].style.webkitTransform = 'translateX('+-screenWidth+'px)';
course_list[right].style.webkitTransform = 'translateX('+screenWidth+'px)';
window.addEventListener('resize',function(){
	screenWidth = document.documentElement.offsetWidth;
	//  获取LI的高度赋值给ul 
	course_wrap.style.height = course_list[0].offsetHeight +'px';
})
var carourTimer = setInterval(function(){
	// 看到下一张的逻辑
	nextShow();
}, 1000);
// 滑动设置图片的位置
// 主要思路：
/*
	（1）或者手指的滑动距离
	（2）直接让获得的距离和默认的位置相加
	（3）在滑动结束后去判断有没有滑动成功，如果滑动成功则看到下一张或者上一张，没有成功，返回当前原点
 */
course.addEventListener('touchstart',touchstartHandler);
course.addEventListener('touchmove',touchmoveHandler);
course.addEventListener('touchend',touchendHandler);
var startX = 0,startTime,dx = 0;
function touchstartHandler(e){
	// 获取手指的X坐标
	startX = e.touches[0].pageX;
	// 获取手指滑动开始的时间
	startTime = new Date();
	//　停止定时器
	clearInterval(carourTimer);
	// 清除过渡
	setTransition(false,false,false);
};
function touchmoveHandler(e){
	// 获取滑动的距离
	dx = e.touches[0].pageX - startX;

	// 重置去设置li的位置
	setTranslateX(dx);
};
function touchendHandler(e){
	var t = new Date() - startTime;
	// 在结束的时候重新获取滑动的距离
	var dx = e.changedTouches[0].pageX - startX
	// 当dx为一个大于屏幕1/3的值的时候或者滑动的时间小于500毫秒滑动的区间大于30像素，则判定滑动成功，需要看到上一张 
	// 当dx为一个小于-屏幕1/3的值的时候或者滑动的时间小于500毫秒滑动的区间大于30像素，则判定滑动成功，需要看到下一张
	if(dx < -(screenWidth/3) || (t < 500 && dx < -30)){
		nextShow();
	}else if(dx > screenWidth/3 ||  (t < 500 && dx > 30)){
		prevShow();
	}else{
		// 添加过渡
		setTransition(true,true,true);
		// 回归原位
		setTranslateX();
	}
	// 重新启动定时器
	carourTimer = setInterval(function(){
		// 看到下一张的逻辑
		nextShow();
	}, 1000);
};
// 封装下一张的逻辑
function nextShow(){
	// 轮转
	left = center;
	center = right;
	right ++;

	// 极值判断
	if(right > course_list.length - 1){
		right = 0;
	}
	// 添加过渡
	// 因为right是替补的图片，所以不需要添加过渡
	setTransition(true,true,false);
	// 真正的轮转
	setTranslateX();
	// 设置小圆点
	setPoints();
}
// 封装上一张的逻辑
function prevShow(){
	// 轮转
	right = center;
	center = left;
	left --;
	// 极值判断
	if(left < 0){
		left = course_list.length - 1;
	}
	// 添加过渡
	// 因为left是替补的图片，所以不需要添加过渡
	setTransition(false,true,true);
	// 真正的轮转
	setTranslateX();
	// 设置小圆点
	setPoints();
}
// 获取小圆点，注意：小圆点的获取一定是在创建的后面
var points = points_wrap.querySelectorAll('li');
function setPoints(){
	for(var i = 0; i < course_list.length; i++){
		points[i].classList.remove('active');
	}
	points[center].classList.add('active');
}
// 封装过渡的设置
function setTransition(a,b,c){
	if(a){
		course_list[left].classList.add('transitionAll');
	}else{
		course_list[left].classList.remove('transitionAll');
	}
	if(b){
		course_list[center].classList.add('transitionAll');
	}else{
		course_list[center].classList.remove('transitionAll');
	}
	if(c){
		course_list[right].classList.add('transitionAll');
	}else{
		course_list[right].classList.remove('transitionAll');
	}
}
// 封装移动
function setTranslateX(dx){
	dx = dx || 0;
	course_list[center].style.webkitTransform = 'translateX('+ (0 + dx) +'px)';
	course_list[left].style.webkitTransform = 'translateX('+ (-screenWidth + dx)+'px)';
	course_list[right].style.webkitTransform = 'translateX('+(screenWidth + dx) +'px)';
}

// 倒计时的逻辑

// 首先声明，倒计时的是需要后台返回给你一个时间戳，因为前台的时间不安全

// 拿到当前时间
var nowTime = new Date();
// 拿到未来时间
var newTime = new Date('Nov 17 2016 18:20:36');
// 将获取到的时间转换成秒
var t = Math.floor((newTime - nowTime)/1000);

/**
 * 公式：
 * 天数 ： t/86400
 * 小时：t%86400/3600
 * 分：t%3600/60
 * 秒：t%60
 */
var span = document.querySelectorAll('.count_wrap span');
var countTime = setInterval(function(){
	t--;
	if(t < 0){
		clearInterval(countTime);	
	}
	// 将所有的描述转换成小时 分钟 秒的公式
	var h = Math.floor(t%86400/3600);
	var m = Math.floor(t%3600/60);
	var s = Math.floor(t%60);
	// 拿到对应位数上的值
	span[0].innerHTML = Math.floor(h/10);
	span[1].innerHTML = Math.floor(h%10);
	span[3].innerHTML = Math.floor(m/10);
	span[4].innerHTML = Math.floor(m%10);
	span[6].innerHTML = Math.floor(s/10);
	span[7].innerHTML = Math.floor(s%10);

}, 1000);




