

// 「#」ハッシュタグのように、色々ステータスつけちゃって見やすくしましょう。
// ================================================================ //
// #未解決 #調査済


/*
 * jQuery - New Wave Javascript
 *
 * Copyright (c) 2006 John Resig (jquery.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt) 
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * $Date: 2006-10-27 23:14:48 -0400 (Fri, 27 Oct 2006) $
 * $Rev: 509 $
 */

// デバッガーね。全てのステップで一旦止まります。
// debugger;


// なんで、同じもんいれるんやろ。
// これって、どうも古代の遺物的なものらしい。
// ECMAScript3(2015年)でやっと、もともと実装されたんだってさ。↑これ2006年だよ。
// 昔はグローバルなundefinedが宣言されていない事があったので、こういう宣言の仕方をしてるらしい。
// 最近は…以下のようになるらしいす。
/* =================================
(function(window, undefined) {
	...
})(window);
================================== */
// Global undefined variable
window.undefined = window.undefined;
// jQueryって関数やったんか！
function jQuery(a, c) {

	// if、省略の使い方ね。
	// a.constructor コンストラクタ？なにそれ 
	// -> なんかですね、この例で言うと「a.constructor」はArray、Function、String、Object、Numberとかの型が入ってます。
	// Function ん？これ変数？
	// -> これはFunctionオブジェクトです。 a.constructorがFunctionなのか（関数なのか）どうかを調べてるっぽいです。
	// jQuery.fn.ready んーなんだろ。 fnってよく見るよね #未解決
	// Shortcut for document ready (because $(document).each() is silly)
	if(a && a.constructor == Function && jQuery.fn.ready)
		// 関数(引数).オブジェクト(引数) とかかな？ #未解決
		return jQuery(document).ready(a);

	// なんだよこれ！！何がしたいんだよ！ #未解決
	// a = a か jQuery.context か document。それがどうしたんだよ！
	// Make sure that a selection was provided
	a = a || jQuery.context || document;

	// a.jqueryがtrueなら。かな？ なんでここだけ「jquery」？ #未解決
	// Watch for when a jQuery object is passed as the selector
	if(a.jquery)
		// 初めて「$」出てきた！
		// マージ？gitのと同じ意味かな？ #未解決
		return $(jQuery.merge(a, []));

	// c でもって c.jquery がtrueなら。
	// Watch for when a jQuery object is passed at the context
	if(c && c.jquery)
		// $(c)の中にaがあるか調べて、あるなら値、ないならundefined。
		return $(c).find(a);

	// window と this（どれ指してる？）が同じなら。 #未解決
	// consoleでthis出してみたら、windowが出てきたよ。 #調査済
	// If the context is global, return a new object
	if(window == this)
		// 出たな「new」！インスタンスの生成の事らしいです。
		// で、インスタンスって何？ #未解決
		return new jQuery(a, c);

	// 正規表現っぽいね。「<」「>」で挟まれてるやつって感じっぽいね。
	// HTMLタグって事っぽいね。 #未解決
	// ####.exec(#)は、#の中に####があるかどうか調べるだよ。
	// Handle HTML strings
	var m = /^[^<]*(<.+>)[^>]*$/.exec(a);
	// if(#) # = #; はif文のワンライナーだよ。
	// mがtrueなら、aにjQuery.clean([m[1]])を代入…。うーん。 #未解決
	if(m) a = jQuery.clean([m[1]]);

	// this(どれーー！)。 んー全体的によくわからん。 #未解決
	// a.length = ? #未解決
	// !a.nodeType = ? nodeTypeは「ELEMENT_NODE」「TEXT_NODE」「PROCESSING_INSTRUCTION_NODE」「COMMENT_NODE」「DOCUMENT_NODE」「DOCUMENT_TYPE_NODE」「DOCUMENT_FRAGMENT_NODE」が返ってくるはず。
	// ## ? ### : #### は if(##) { ### }else { #### }って事。 #未解決
	// Watch for when an array is passed in
	this.get(a.constructor == Array || a.length && !a.nodeType && a[0] != undefined && a[0].nodeType ?
		// またマージきた。 #未解決
		// Assume that it is an array of DOM Elements
		jQuery.merge(a, []) :
		// んー、find(a, c)だとどうなるんだろ。 #未解決
		// Find the matching elements and save them for later
		jQuery.find(a, c));

	// arguments.length で、関数に渡された引数の数を調べるらしいです。
	// See if an extra function was provided
	var fn = arguments[arguments.length - 1];

	// ↑で調べた数があって、なおかつfn.constructorが関数だった場合
	// If so, execute it in context
	if(fn && fn.constructor == Function)
		this.each(fn);
}

// _$ これなんだ？ #未解決
// Map over the $ in case of overwrite
if($)
	jQuery._$ = $;

// jQueryに詰め込んでる色々を$に移してるね。
// Map the jQuery namespace to the '$' one
var $ = jQuery;


// ===================================================== //
//
// すごい事分かってきたんだけどさ、
// jQueryってもしかして、こっから下のjQuery.fnに
// オブジェクトをガンガンガンガン追加して
// ぜーんぶひとまとめにしてるから名前空間を汚さないって事かな？
//
// ===================================================== //

// プロトタイプね。プロトタイプ。知らないけど。 #未解決
// これ、jQuery.fn.jqueryでバージョン情報返します。
jQuery.fn = jQuery.prototype = {
	// "$Rev: 509 $" なんだこれ！！
	// この文字列の意味は分からないけど、v1.0って事らしいです。
	jquery: "$Rev: 509 $",

	// size？
	// -> jQuery.fn.sizeで実行出来るね。要素の個数を返すらしいです。
	// ただ、jQuery.fn.sizeの使い方が分かりません。
	// -> あー！配列持ちの変数をjQuery.fn.size(##)として入れたら、配列の数返ってきた！ #調査済
	size: function() {
		return this.length;
	},

	// jQuery.fn.getか！でも、これも使い方が分かりません！
	// -> こっちも、配列持ちの変数をjQuery.fn.get(##)として入れたら、配列返ってきた！ #調査済
	get: function(num) {
		// もし、numがtrueかつ、numのコンストラクタがArray型の場合ね。
		// Watch for when an array (of elements) is passed in
		if(num && num.constructor == Array) {

			// これ、なに？ #未解決
			// -> トリッキーなハックを使って、jQueryオブジェクトを作成する…だそうです。
			// -> 配列のようなもんだ。との事です。
			// Use a tricky hack to make the jQuery object
			// look and feel like an array
			this.length = 0;
			// .push.apply(##, ###)ってのは##の配列に ###の配列を追加する。
			// ## = [1,2]、### = [3,4]だった時は 1,2,3,4 が返ってくる。
			[].push.apply(this, num);

			// ↑を返す。
			return this;
		}else
			// 配列でなかった場合はこっちに来て処理。
			// numがundefinedなら…
			return num == undefined ?

				// jQuery.mapは後述らしいよ。とりあえず置きで。 #未解決
				// Return a 'clean' array
				jQuery.map(this, function(a) { return a }) :

				this[num];
	},
	// jQuery.fn.each(fn, args)
	each: function(fn, args) {
		// jQuery.eachが後述なのでまた。 #未解決
		return jQuery.each(this, fn, args);
	},

	// jQuery.fn.index(obj)
	index: function(obj) {
		var pos = -1;
		// jQuery.eachが後述なのでまた。 #未解決
		this.each(function(i) {
			if(this == obj) pos = i;
		});
		return pos;
	},

	// jQuery.fn.attr(key, value, type)
	attr: function(key, value, type) {
		// keyのコンストラクタがString型じゃない、又はvalueがundefinedでない場合。
		// Check to see if we're setting style values
		return key.constructor != String || value != undefined ?
			// jQuery.eachが後述なのでまた。 #未解決
			this.each(function() {
				// value が undefinedの場合。
				// See if we're setting a hash of styles
				if(value == undefined)
					// Set all the styles
					for(var prop in key)
						jQuery.attr(
							type ? this.style : this,
							prop, key[prop]
						);

				// value が undefined じゃない場合。
				// See if we're setting a single key/value style
				else
					jQuery.attr(
						type ? this.style : this,
						key, value
					);
			}) :

			// Look for the case where we're accessing a style value
			jQuery[type || "attr"](this[0], key);
	},

	// jQuery.fn.css(key, value)
	css: function(key, value) {
		// curCSSってのも後述されるが、なぜ文字列？ #未解決
		return this.attr(key, value, "curCSS");
	},
	// jQuery.fn.text(e)
	// e.constructor == HTMLCollectionなものがいれれるみたいです。
	// 例えば、document.getElementByTagName("h2"); とか。
	// eに入ってるnodeをぜーんぶくっつけて文字列で返すらしいです。
	text: function(e) {
		// thisってなんなんほんま #未解決
		e = e || this;
		var t = "";
		for(var j = 0; j < e.length; j++) {
			var r = e[j].childNodes;
			for(var i = 0; i < r.length; i++)
				// nodeをがんがんくっつける。
				t += r[i].nodeType != 1 ?
					r[i].nodeValue :
					jQuery.fn.text([r[i]]);
		}
		return t;
	},
	// jQuery.fn.wrap()
	wrap: function() {
		// jQuery.cleanは後述。
		// The elements to wrap the target around
		var a = jQuery.clean(arguments);

		// Wrap each of the matched elements individually
		return this.each(function() {
			// b に a[0]に入っているnodeを複製して代入
			// Clone the structure that we're using to wrap
			var b = a[0].cloneNode(true);

			// Insert it before the element to be wrapped
			this.parentNode.insertBefore(b, this);

			// Find he deepest point in the wrap structure
			while(b.firstChild)
				b = b.firstChild;

			// Move the matched element to within the wrap structure
			b.appendChild(this);
		});
	},
	// jQuery.fn.append()
	append: function() {
		return this.domManip(arguments, true, 1, function(a) {
			this.appendChild(a);
		});
	},
	// jQuery.fn.prepend()
	prepend: function() {
		return this.domManip(arguments, true, -1, function(a) {
			this.insertBefore(a, this.firstChild);
		});
	},
	// jQuery.fn.before()
	before: function() {
		return this.domManip(arguments, false, 1, function(a) {
			this.parentNode.insertBefore(a, this);
		});
	},
	// jQuery.fn.after()
	after: function() {
		return this.domManip(arguments, false, -1, function(a) {
			this.parentNode.insertBefore(a, this.nextSibling);
		});
	},
	// jQuery.fn.end()
	end: function() {
		return this.get(this.stack.pop());
	},
	// jQuery.fn.find()
	find: function(t) {
		return this.pushStack(jQuery.map(this, function(a) {
			return jQuery.find(t, a);
		}), arguments);
	},

	// jQuery.fn.clone()
	clone: function(deep) {
		return this.pushStack(jQuery.map(this, function(a) {
			return a.cloneNode(deep != undefined ? deep : true);
		}), arguments);
	},

	// jQuery.fn.filter()
	filter: function(t) {
		return this.pushStack(
			t.constructor == Array &&
			jQuery.map(this, function(a) {
				for(var i = 0; i < t.length; i++) 
					if(jQuery.filter(t[i], [a]).r.length)
						return a;
			}) ||

			t.constructor == Boolean &&
			(t ? this.get() : []) ||

			t.constructor == Function &&
			jQuery.grep(this, t) ||

			jQuery.filter(t, this).r, arguments);
	},

	// jQuery.fn.not()
	not: function(t) {
		return this.pushStack(t.constructor == String ?
			jQuery.filter(t, this, false).r :
			jQuery.grep(this, function(a) { return a != t; }), arguments);
	},

	// jQuery.fn.add()
	add: function(t) {
		return this.pushStack(jQuery.merge(this, t.constructor == String ?
			jQuery.find(t) : t.constructor == Array ? t : [t]), arguments);
	},
	// jQuery.fn.is()
	is: function(expr) {
		return expr ? jQuery.filter(expr, this).r.length > 0 : this.length > 0;
	},
	// jQuery.fn.domManip()
	domManip: function(args, table, dir, fn){
		var clone = this.size() > 1;
		var a = jQuery.clean(args);
		
		return this.each(function(){
			var obj = this;
			
			if (table && this.nodeName == "TABLE" && a[0].nodeName != "THEAD") {
				var tbody = this.getElementsByTagName("tbody");

				if (!tbody.length) {
					obj = document.createElement("tbody");
					this.appendChild(obj);
				} else
					obj = tbody[0];
			}

			for (var i = (dir < 0 ? a.length - 1 : 0);
				i != (dir < 0 ? dir : a.length); i += dir) {
					fn.apply(obj, [clone ? a[i].cloneNode(true) : a[i]]);
			}
		});
	},
	// jQuery.fn.pushStack()
	pushStack: function(a, args) {
		var fn = args && args[args.length-1];

		if (!fn || fn.constructor != Function) {
			if (!this.stack) this.stack = [];
			this.stack.push(this.get());
			this.get(a);
		} else {
			var old = this.get();
			this.get(a);
			if (fn.constructor == Function)
				return this.each(fn);
			this.get(old);
		}

		return this;
	}
};

// extendメソッドはjQueryオブジェクトを拡張するメソッドらしいです。
// jQuery.extend(target, object1, [objectN])で、targetのプロパティをobjectNのプロパティで上書きするらしいです。
// jQuery内でプラグインを自作する場合は jQuery.fnオブジェクトを拡張するといいらしいです。
jQuery.extend = jQuery.fn.extend = function(obj, prop) {
	if(!prop) { prop = obj; obj = this; }
	for(var i in prop) obj[i] = prop[i];
	return obj;
};

jQuery.extend({
	init: function() {
		jQuery.initDone = true;

		jQuery.each(jQuery.macros.axis, function(i, n) {
			jQuery.fn[i] = function(a) {
				var ret = jQuery.map(this, n);
				if(a && a.constructor == String)
					ret = jQuery.filter(a, ret).r;
				return this.pushStack(ret, arguments);
			};
		});

		jQuery.each(jQuery.macros.to, function(i, n) {
			jQuery.fn[i] = function() {
				var a = arguments;
				return this.each(function() {
					for(var j = 0; j < a.length; j++)
						$(a[j])[n](this);
				});
			};
		});

		jQuery.each(jQuery.macros.each, function(i, n) {
			jQuery.fn[i] = function() {
				return this.each(n, arguments);
			};
		});

		jQuery.each(jQuery.macros.filter, function(i, n) {
			jQuery.fn[n] = function(num, fn) {
				return this.filter(":" + n + "(" + num + ")" , fn);
			};
		});

		jQuery.each(jQuery.macros.attr, function(i, n) {
			n = n || i;
			jQuery.fn[i] = function(h) {
				return h == undefined ?
					this.length ? this[0][n] : null :
					this.attr(n, h);
			};
		});

	},
	each: function(obj, fn, args) {
		if(obj.length == undefined)
			for(var i in obj)
				fn.apply(obj[i], args || [i, obj[i]]);
		else
			for(var i = 0; i < obj.length; i++)
				fn.apply(obj[i], args || [i, obj[i]]);
		return obj;
	},

	className: {
		add: function(o, c) {
			if(jQuery.className.has(o, c)) return;
			o.className += (o.className ? " " : "") + c;
		},
		remove: function(o, c) {
			o.className = !c ? "" :
				o.className.replace(
					new RegExp("(^|\\s*\\b[^-])"+c+"($|\\b(?=[^-]))", "g"), "");
		},
		has: function(e, a) {
			if(e.className != undefined)
				e = e.className;
			return new RegExp("(^|\\s)" + a + "(\\s|$)").test(e);
		}
	},
	swap: function(e, o, f) {
		for(var i in o) {
			e.style["old" + i] = e.style[i];
			e.style[i] = o[i];
		}
		f.apply(e, []);
		for(var i in o)
			e.style[i] = e.style["old" + i];
	},

	css: function(e, p) {
		if(p == "height" || p == "width") {
			var old = {}, oHeight, oWidth, d = ["Top", "Bottom", "Right", "Left"];

			for(var i in d) {
				old["padding" + d[i]] = 0:
				old["border" + d[i] + "Width"] = 0;
			}

			jQuery.swap(e, old, function() {
				if(jQuery.css(e, "display") != "none") {
					oHeight = e.offsetHeight;
					oWidth = e.offsetWidth;
				}else {
					e = $(e.cloneNode(true)).css({
						visibility: "hidden", position: "absolute", display: "block"
					}).prependTo("body")[0];

					oHeight = e.clientHeight;
					oWidth = e.clientWidth;

					e.parentNode.removeChild(e);
				}
			});

			return p == "height" ? oHeight : oWidth;
		}else if(p == "opacity" && jQuery.browser.msie)
			returnparseFloat(jQuery.curCSS(e, "filter").replace(/[^0-9.]/, "")) || 1;

		return jQuery.curCSS(e, p);
	}
});