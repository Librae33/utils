var utils = (function() {
	var flag = "getComputedStyle" in window;
	//->listToArray:把类数组集合转换为数组
	function listToArray(likeArr) {
		if(flag) {
			return Array.prototype.slice.call(likeArr, 0);
		}
		var arr = [];

		for(var i = 0, len = likeArr.length; i < len; i++) {
			arr.push(likeArr[i]);
		}
		return arr;
	}
	//->formatJSON:把JSON格式字符串转换为JSON格式对象
	function formatJSON(jsonStr) {
		if(flag) {
			return JSON.parse(jsonStr);
		}
		return eval("(" + jsonStr + ")");
	}
	//->children:获取所有的元素子节点
	function children(curEle, tagName) {
		var ary = [];
		if(!flag) { //非标准浏览器
			var nodeList = curEle.childNodes;
			for(var i = 0, len = nodeList.length; i < len; i++) {
				var curNode = nodeList[i];
				curNode.nodeType === 1 ? ary[ary.length] = curNode : null;
			}
			nodeList = null;
		} else {
			ary = this.listToArray(curEle.children);
		}
		if(typeof tagName === "string") {
			for(var k = 0; k < ary.length; k++) {
				var curEleNode = ary[k];
				if(curEleNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
					ary.splice(k, 1);
					k--;
				}
			}
		}
		return ary;
	}
	//->prev:获取上一个哥哥元素节点
	function prev(curEle) {
		if(flag) {
			return curEle.previousElementSibling;
		}
		var pre = curEle.previousSibling;
		while(pre && pre.nodeType !== 1) {
			pre = curEle.previousSibling;
		}
		return pre;
	}
	//->next:获取下一个弟弟元素节点
	function next(curEle) {
		if(flag) {
			return curEle.nextElementSibling;
		}
		var nex = curEle.nextSibling;
		while(nex && nex.nodeType !== 1) {
			nex = nex.nextSibling;
		}
		return nex;
	}
	//->prevAll:获取所有的哥哥元素节点
	function preAll(curEle) {
		var arr = [];
		var pre = this.prev(curEle);
		while(pre) {
			arr.unshift(pre);
			pre = this.prev(pre);
		}
		return arr;
	}
	//->nextAll:获取所有的弟弟元素节点
	function nextAll(curEle) {
		var arr = [];
		var nex = this.next(curEle);
		while(nex) {
			arr.push(nex);
			nex = this.next(nex);
		}
		return arr;
	}
	//->sibling:获取相邻的两个元素节点
	function sibling(curEle) {
		var pre = this.prev(curEle);
		var nex = this.next(curEle);
		var arr = [];
		pre ? arr.push(pre) : null;
		nex ? arr.push(nex) : null;
		return arr;
	}
	//->siblings:获取所有的兄弟元素节点
	function siblings(curEle) {
		return this.preAll(curEle).concat(this.nextAll(curEle));
	}
	//->index:获取当前元素的索引
	function index(curEle) {
		return this.preAll(curEle).length;
	}
	//->firstChild:获取第一个元素子节点
	function firstChild(curEle) {
		if(flag) {
			return curEle.firstChild;
		}
		var childs = this.children(curEle);
		return childs.length > 0 ? childs[0] : null;

	}
	//->lastChild:获取最后一个元素子节点
	function lastChild(curEle) {
		if(flag) {
			return curEle.lastChild;
		}
		var childs = this.children(curEle);
		return childs.length > 0 ? childs[childs.length - 1] : null;
	}
	//->append:向指定容器的末尾追加元素
	function append(newEle, container) {
		container.appendChild(newEle);

	}
	//->prepend:向指定容器的开头追加元素
	//->把新的元素添加到容器中第一个子元素节点的前面,如果一个元素子节点都没有,就放在末尾即可
	function prepend(newEle, container) {
		var first = this.firstChild(container);
		if(first) {
			container.insertBefore(newEle, first);
		} else {
			container.appendChild(newEle);
		}
	}

	//->insertBefore:把新元素(newEle)追加到指定元素(oldEle)的前面
	function insertBefore(newEle, oldEle) {
		oldEle.parentNode.insertBefore(newEle, oldEle);
	}
	//->insertAfter:把新元素(newEle)追加到指定元素(oldEle)的后面

	function insertAfter(newEle, oldEle) {
		var nex = this.next(oldEle);
		if(nex) {
			//->相当于追加到oldEle弟弟元素的前面
			oldEle.parentNode.insertBefore(newEle, nex);
			return;
		}
		//如果弟弟不存在,也就是当前元素已经是最后一个了,就把新的元素放在最末尾即可
		oldEle.parentNode.appendChild(newEle);
	}
	 return {
        listToArray: listToArray,
        formatJSON: formatJSON,
        children: children,
        prev: prev,
        next: next,
        preAll: preAll,
        nextAll: nextAll,
        sibling: sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
       
    }
})();

