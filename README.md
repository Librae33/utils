# utils
这是一个使用原生js书写的简易DOM库，仿照jQuery来实现简单的DOM操作，还加入了一些常用的方法

**listToArray**:将类数组转化成数组  

**formatJSON**:将JSON格式的字符串转化为JSON格式的对象

**children**: 获取所有的元素子节点

**prev**:获取上一个哥哥元素节点

**next**: 获取下一个弟弟元素节点

**preAll**: 获取所有的哥哥元素节点

**nextAll**:获取所有的弟弟元素节点 

**sibling**: 获取相邻的两个元素节点 

**siblings**: 获取所有的兄弟元素节点 

**index**:获取当前元素的索引 

**firstChild**: 获取第一个元素子节点

**lastChild**: 获取最后一个元素子节点  

**append**:向指定容器的末尾追加元素 

**prepend**:向指定容器的开头追加元素  

**insertBefore**:把新元素(newEle)追加到指定元素(oldEle)的前面

**insertAfter**:把新元素(newEle)追加到指定元素(oldEle)的后面
## useage
使用单例模式，实现代码的良好的封装性

`var utils=(function(){})();
`       

在使用的使用只需要引入该文件    
如：`<script src="utils.js"></script>`  

如果要获取某一个元素的所有子节点，只需：    
`utils.children(element)`
## 下面是一段测试代码   

<!DOCTYPE html>
<html>

	<head>
		<meta charset="UTF-8">
		<title></title>
		<script src="utils.js"></script>
		<script>
			window.onload = function() {
				var myDiv = document.getElementById("myDiv");
				var myLi = document.getElementById("myLi");
				var myUl = document.getElementById("myUl");
				console.log(utils.children(myUl)); //[li, li#myLi, li]
				console.log(utils.prev(myLi));//<li></li>
				console.log(utils.next(myLi));//<li></li>
				console.log(utils.preAll(myDiv));//[div]
				console.log(utils.nextAll(myDiv));//(4) [div, div, ul#myUl, a]
				console.log(utils.sibling(myUl));//(2) [div, a]
				console.log(utils.siblings(myDiv));//(5) [div, div, div, ul#myUl, a]
				var oLi=document.createElement("li");
				utils.append(oLi,myUl);
				utils.prepend(oLi,myUl);
				utils.insertBefore(oLi,myUl);
				utils.insertAfter(oLi,myUl);
			};
		</script>
	</head>

	<body>
		<div>

			<div></div>
			<div id="myDiv"></div>
			<div></div>
			<div></div>
			<ul id="myUl">
				<li></li>
				<li></li>
				<li id="myLi"></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<a></a>

		</div>
	</body>

</html>



