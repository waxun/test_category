/*
* @Author: Administrator
* @Date:   2016-11-17 17:23:33
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-22 22:33:24
*/

'use strict';

// 拖拽反弹

/*
	思路分析
	（1）首先需要让元素能够被拖拽起来

 */
scrollY('.aside_wrap');
scrollY('.article_wrap');
function scrollY(_id){
	// 获取大容器
	var aside_wrap = document.querySelector(_id);
	// 获取滚动容器
	var aside_scroll_wrap = aside_wrap.querySelector('.scroll_wrap');
	// 获取大容器高度
	var aside_wrap_height = aside_wrap.offsetHeight;
	// 获取滚动容器的高度
	var aside_scroll_wrap_height = aside_scroll_wrap.offsetHeight;
	// 绑定touch
	aside_scroll_wrap.addEventListener('touchstart', touchstartHandler);
	aside_scroll_wrap.addEventListener('touchmove', touchmoveHandler);
	aside_scroll_wrap.addEventListener('touchend', touchendHandler);

	var startY = 0,dy = 0,currentY = 0,maxValue = 100;
	function touchstartHandler(e){
		// e.preventDefault();
		// 在触摸开始的时候获取当前手指在Y轴上的落点
		startY = e.touches[0].pageY;
		aside_scroll_wrap.classList.remove('transitionAll');
	}
	function touchmoveHandler(e){
		e.preventDefault();
		// 获取滑动的距离
		dy = e.touches[0].pageY - startY;
		// 需要在move的时候控制最大值和最小值
		if((currentY + dy) < maxValue && (currentY + dy) > -(aside_scroll_wrap_height - aside_wrap_height + maxValue)){
			// 需要在上一次滑动的位置继续滑动
			aside_scroll_wrap.style.webkitTransform = 'translateY('+(currentY + dy)+'px)';
		}
	}
	function touchendHandler(e){
		// 在滑动结束时记录上一次的滑动的最终位置
		currentY = currentY + dy;
		if(currentY > 0){
			aside_scroll_wrap.classList.add('transitionAll');
			// 同步currentY
			currentY = 0;
			aside_scroll_wrap.style.webkitTransform = 'translateY('+ currentY +'px)';
		}else if(currentY < -(aside_scroll_wrap_height - aside_wrap_height)){
			aside_scroll_wrap.classList.add('transitionAll');
			// 同步currentY
			currentY = -(aside_scroll_wrap_height - aside_wrap_height)
			aside_scroll_wrap.style.webkitTransform = 'translateY('+ currentY+'px)';
		}
	}
	// 如果是左边的元素点击才去执行这个代码
	if(_id == '.aside_wrap'){
		// 点击Li让aside_scroll_wrap滑动到这个LI的顶点
		var aside_scroll_wrap_list = aside_scroll_wrap.querySelectorAll('li');
		for(var i = 0; i < aside_scroll_wrap_list.length; i++){
			// 给每一个li设置index值
			aside_scroll_wrap_list[i].setAttribute('data-index', i)
			aside_scroll_wrap_list[i].addEventListener('click',function (argument) {
				// 获取当前你点击的那个LI的所在位置
				var h = -(this.dataset['index']*aside_scroll_wrap_list[0].offsetHeight);
				if(h < -(aside_scroll_wrap_height - aside_wrap_height)){
					h = -(aside_scroll_wrap_height - aside_wrap_height)
				}
				aside_scroll_wrap.classList.add('transitionAll');
				// 同步currentY
				currentY = h;
				aside_scroll_wrap.style.webkitTransform = 'translateY('+ currentY +'px)';
			})
		}
	}
}
