/*
* @Author: Administrator
* @Date:   2016-11-18 14:30:35
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-18 17:05:35
*/

'use strict';


// 点击checkbox切换类

// 获取所有的checkbox_wrap
var checkbox_wrap  = document.querySelectorAll('.checkbox_wrap');

for(var i = 0; i < checkbox_wrap.length; i++){
	checkbox_wrap[i].addEventListener('click',function (argument) {
		// 点击谁 谁切换类
		this.classList.toggle('jd_icons_checkd');
	})
}

// 全选逻辑
// 获取全选的按钮
var check_all = document.querySelector('.check_all');
var cart_b = document.querySelector('.cart_main_b');
// 选择剩下所有的按钮
var check_wrap_b = cart_b.querySelectorAll('.checkbox_wrap');

// 获取所有的check_wrap_b下面的input
var inputAll = cart_b.querySelectorAll('input[type="checkbox"]');
// 给全选按钮注册点击事件
console.log(check_all);
check_all.addEventListener('click',function (argument) {
	//  先判断全选按钮的状态
	if(this.classList.contains('jd_icons_checkd')){
		for(var i = 0; i < check_wrap_b.length; i++){
			check_wrap_b[i].classList.add('jd_icons_checkd');
			inputAll[i].checked = true;
		}
	}else{
		for(var i = 0; i < check_wrap_b.length; i++){
			check_wrap_b[i].classList.remove('jd_icons_checkd');
			inputAll[i].checked = false;
		}
	}
})

// 垃圾桶动画

// 获取所有的垃圾桶
var del = document.querySelectorAll('.del');
var del_t; 
// 找到模态框
var pop_srceen = document.querySelector('.pop_srceen');
// 找到模态框下面的容器
var pop_info = pop_srceen.querySelector('.pop_info');
for(var i = 0; i < del.length; i++){
	// 给所有的垃圾桶绑定点击事件
	del[i].addEventListener('click',function (argument) {
		// 找到你选择的垃圾桶的盖子
		del_t = this.querySelector('.del_t');
		// 给垃圾桶的盖子做动画
		del_t.style.webkitTransform = 'rotate(-20deg) translateX(-5px)'

		// 弹出模态框
		pop_srceen.style.display = 'block';

		// 给模态框下面的容器添加动画类
		pop_info.classList.add('my_bounceInDown');

	})
}

// 点击取消关闭模态框
var exit = document.querySelector('.exit');
exit.addEventListener('click',function (argument) {
	// 关闭模态框
	pop_srceen.style.display = 'none';
	// 给模态框下面的容器移除动画类
	pop_info.classList.remove('my_bounceInDown');
	// 去掉这个类
	del_t.style.webkitTransform = '';	
})

// 点击加减逻辑
