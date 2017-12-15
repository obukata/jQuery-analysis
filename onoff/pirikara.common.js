(function () {
	!function () {
		var a, b;
		return Polaris.ua.iphone || Polaris.ua.androidmobile ? void 0 : (
				a = $("link[rel=alternate]").attr("href"),
				b = Polaris.util.parseURI(a),
				location.href = b.path
			)
	}(),
	$(document).on("click", "a.bookmark", function (a) {
		var b, c, d;
		b = a.currentTarget.href,
		b && b.match(/\/(story_[0-9]+)\//) && (
			c = RegExp.$1,
			d = Polaris.cookie.read(
				c + "-read",
				null
			),
			null !== d && 0 !== d && (a.preventDefault(), location.href = "/mokuji/" + c + "/" + d)
		)
	}),
	function () {
		var a, b, c;
		return c = null,
		a = function () {
			var a, b, d, e;
			d = $("header .nav_item"),
			a = 0,
			b = 200,
			e = -8,
			c = Polaris.util.onFrame(function (c, f, g) {
				var h;
				return a += Math.min(f, 50),
				h = a > 3e3 ? 0 : b > a ? e : e * Math.exp(-2.5 * (a - b) / 1e3) * Math.cos(9 * (a - b) / 1e3),
				d.css({
					transform: "rotate(" + h + "deg)"
				}),
				a > 3e3 ? !1 : void 0
			})
		},
		b = function () {
			Polaris.util.offFrame(c)
		},
		$(document).on("click", "header .nav_btn", function (b) {
			return b.preventDefault(),
			$("header .nav_body").addClass("is--nav-open"),
			a()
		}),
		$(document).on("click", "header .nav_close_btn", function (a) {
			return a.preventDefault(),
			$("header .nav_body").removeClass("is--nav-open"),
			b()
		})
	}(),
	$(function () {
		var a,
			b,
			c;
		return c = $("link[rel=alternate]")
			.attr("href")
			.replace("http://pirikara.jp/pc/", "http://pirikara.jp/"),
		b        = document.title,
		a        = $("meta[name=description]").attr("content"),
		$(".nav_sns_list .fb").attr(
			"href",
			"http://www.facebook.com/sharer.php?u=" + c
		),
		$(".nav_sns_list .tw").attr(
			"href",
			"https://twitter.com/share?url=" + encodeURIComponent(c) + "&text=" +
					encodeURIComponent(b) + " " + encodeURIComponent(a)
		)
	}),
	$(function () {
		return $(".reason_map").each(function (a, b) {
			var c,
				d,
				e,
				f,
				g,
				h;
			return f = $(b).attr("data-lat"),
			g        = $(b).attr("data-lng"),
			h        = $(b).attr("data-zoom"),
			d        = $(b)
				.find("img")
				.attr("width"),
			c        = $(b)
				.find("img")
				.attr("height"),
			e        = "AIzaSyDBHvI9LI0WpguUxVy9wRr0gHdMtp84bsQ",
			$(this)
				.find("img")
				.attr(
					"data-src",
					"https://maps.googleapis.com/maps/api/staticmap?center=" + f + "," + g +
							"&size=" + d + "x" + c + "&sensor=false&key=" + e + "&zoom=" + h + "&markers=si" +
							"ze:mid|" + f + "," + g
				)
		}),
		$(window).on("load", function () {
			return $(".googlemap--wrap").each(function (a, b) {
				var c,
					d,
					e,
					f,
					g,
					h,
					i;
				return f = $(b).attr("data-lat"),
				g        = $(b).attr("data-lng"),
				i        = $(b).attr("data-zoom"),
				d        = $(b).width() || 291,
				c        = $(b).height() || 285,
				e        = "AIzaSyDBHvI9LI0WpguUxVy9wRr0gHdMtp84bsQ",
				h        = "https://maps.googleapis.com/maps/api/staticmap?center=" + f + "," + g + "&" +
						"size=" + d + "x" + c + "&sensor=false&key=" + e + "&zoom=" + i + "&markers=siz" +
						"e:mid|" + f + "," + g,
				$(this).html(
					'<img src="' + h + '" width="' + d + '" height="' + c + '" alt="" />'
				)
			})
		})
	}),
	function () {
		var a;
		return a = function () {
			function a() {
				var a,
					c,
					d,
					e,
					f,
					g;
				this.x         = 0,
				this.main      = $("main"),
				this.inner     = this
					.main
					.find(".page_inner"),
				this.winW      = 0,
				this.winH      = 0,
				this.innerW    = 0,
				this.listeners = {},
				this.useNative = !Polaris.ua.android,
				this.timer     = null,
				Polaris
					.util
					.onResize(function (a) {
						return function (b, c) {
							return a.winW = b,
							a.winH        = c,
							a.innerW      = a
								.inner
								.width()
						}
					}(this)),
				this.useNative
					? this
						.main
						.on("scroll", function (a) {
							return function () {
								return a.x = a.innerW - a.winW - a
									.main[0]
									.scrollLeft,
								b.call(a)
							}
						}(this))
					: (
						this.main.addClass("polyfill"),
						d         = a     = c = 0,
						g         = function (a) {
							return function (b) {
								Polaris
									.util
									.offFrame(a.timer),
								c = b.timeStamp,
								d = b
									.originalEvent
									.touches[0]
									.clientX
							}
						}(this),
						f         = function (e) {
							return function (f) {
								var g,
									h;
								1 === f.originalEvent.touches.length && f.preventDefault(),
								h         = 0,
								g         = e.innerW - e.winW,
								a         = f
									.originalEvent
									.touches[0]
									.clientX - d,
								c         = f.timeStamp,
								d         = f
									.originalEvent
									.touches[0]
									.clientX,
								e.x >= h && e.x <= g && 1 > g
									? e.x += a
									: e.x += .5 * a,
								b.call(e)
							}
						}(this),
						e         = function (d) {
							return function (e) {
								var f,
									g;
								f       = e.timeStamp - c,
								g       = 200 > f
									? a
									: 0,
								d.timer = Polaris
									.util
									.onFrame(function (a, c, e) {
										var f,
											h;
										return g *= .92,
										d.x      += g,
										h        = 0,
										f        = d.innerW - d.winW,
										d.x < h && (d.x -= (d.x - h) * c * .007),
										d.x > f && (d.x -= (d.x - f) * c * .007),
										b.call(d),
										d.x >= h && d.x <= f && Math.abs(g) < 1
											? !1
											: void 0
									})
							}
						}(this),
						this.main.on("touchstart", g),
						this.main.on("touchmove", f),
						this.main.on(
							"touchend",
							e
						),
						this.main.on("touchcancel", e)
					),
				this.set(0)
			}
			var b;
			return a.prototype.set = function (a) {
				return this.x = a,
				this.useNative && (this.main[0].scrollLeft = this.innerW - this.winW - this.x),
				b.call(this),
				this
			},
			a.prototype.on         = function (a) {
				var b;
				return b          = Polaris
					.util
					.unique(10),
				this.listeners[b] = a,
				a(this.x, this.x + this.winW),
				b
			},
			a.prototype.off        = function (a) {
				delete this.listeners[a]
			},
			b                      = function () {
				var a,
					b,
					c;
				this.useNative || this
					.inner
					.css({
						transform: "translate3d(" + (
							this.x + this.winW - this.innerW
						) + "px,0,0)"
					}),
				c = this.listeners;
				for (a in c) 
					(b = c[a])(this.x, this.x + this.winW)
			},
			a
		}(),
		$(function () {
			return window.scroller = new a
		})
	}(),
	$(function () {
		var a,
			b;
		return a = null,
		b        = $("header .page_head"),
		window
			.scroller
			.on(function (c) {
				var d;
				d = c > 0,
				d !== a && (
					a = d,
					a
						? b.addClass("is--scrolled")
						: b.removeClass("is--scrolled")
				)
			})
	}),
	function () {
		return $(document).on("click", ".open_modal", function (a) {
			var b,
				c,
				d;
			return a.preventDefault(),
			d = $(a.currentTarget.getAttribute("data-for")),
			d.get(0)
				? (
					c = [],
					b = d.find("img").filter(function (a, b) {
						var c;
						return b.getAttribute("data-src")
							? (
								c         = new jQuery.Deferred,
								b.onload   = function () {
									c.resolve()
								},
								b.onerror = function () {
									c.resolve()
								},
								b.src         = b.getAttribute("data-src"),
								b.removeAttribute("data-src"),
								!0
							)
							: void 0
					}),
					jQuery.when.apply(window, c).done(function () {
						d.addClass("is--modal-open"),
						d.css({display: "block", opacity: 0}),
						d
							.stop(!0)
							.delay(20)
							.transit({
								opacity: 1
							}, 500, "iX2"),
						$(".spot_inner, .totteoki_list")
							.stop(!0)
							.transit({
								opacity: 0
							}, 500, "oX2")
					})
				)
				: void 0
		}),
		$(document).on("click", ".modal_close_btn", function (a) {
			var b;
			a.preventDefault(),
			b = $(".is--modal-open").removeClass("is--modal-open"),
			b
				.stop(!0)
				.transit({
					opacity: 0
				}, 500, "oX2", function () {
					return b.removeAttr("style")
				}),
			$(".spot_inner, .totteoki_list")
				.stop(!0)
				.transit({
					opacity: 1
				}, 500, "iX2")
		})
	}()
}).call(this);
(function () {
	!function () {
		var a,
			b;
		return Polaris.ua.iphone || Polaris.ua.androidmobile
			? void 0
			: (
				a             = $("link[rel=alternate]").attr("href"),
				b             = Polaris.util.parseURI(a),
				location.href = b.path
			)
	}(),
	$(document).on("click", "a.bookmark", function (a) {
		var b,
			c,
			d;
		b = a.currentTarget.href,
		b && b.match(/\/(story_[0-9]+)\//) && (
			c = RegExp.$1,
			d = Polaris.cookie.read(
				c + "-read",
				null
			),
			null !== d && 0 !== d && (a.preventDefault(), location.href = "/mokuji/" + c + "/" + d)
		)
	}),
	function () {
		var a,
			b,
			c;
		return c = null,
		a        = function () {
			var a,
				b,
				d,
				e;
			d = $("header .nav_item"),
			a = 0,
			b = 200,
			e = -8,
			c = Polaris
				.util
				.onFrame(function (c, f, g) {
					var h;
					return a += Math.min(f, 50),
					h        = a > 3e3
						? 0
						: b > a
							? e
							: e * Math.exp(-2.5 * (a - b) / 1e3) * Math.cos(9 * (a - b) / 1e3),
					d.css({
						transform: "rotate(" + h + "deg)"
					}),
					a > 3e3
						? !1
						: void 0
				})
		},
		b        = function () {
			Polaris
				.util
				.offFrame(c)
		},
		$(document).on("click", "header .nav_btn", function (b) {
			return b.preventDefault(),
			$("header .nav_body").addClass("is--nav-open"),
			a()
		}),
		$(document).on("click", "header .nav_close_btn", function (a) {
			return a.preventDefault(),
			$("header .nav_body").removeClass("is--nav-open"),
			b()
		})
	}(),
	$(function () {
		var a,
			b,
			c;
		return c = $("link[rel=alternate]")
			.attr("href")
			.replace("http://pirikara.jp/pc/", "http://pirikara.jp/"),
		b        = document.title,
		a        = $("meta[name=description]").attr("content"),
		$(".nav_sns_list .fb").attr(
			"href",
			"http://www.facebook.com/sharer.php?u=" + c
		),
		$(".nav_sns_list .tw").attr(
			"href",
			"https://twitter.com/share?url=" + encodeURIComponent(c) + "&text=" +
					encodeURIComponent(b) + " " + encodeURIComponent(a)
		)
	}),
	$(function () {
		return $(".reason_map").each(function (a, b) {
			var c,
				d,
				e,
				f,
				g,
				h;
			return f = $(b).attr("data-lat"),
			g        = $(b).attr("data-lng"),
			h        = $(b).attr("data-zoom"),
			d        = $(b)
				.find("img")
				.attr("width"),
			c        = $(b)
				.find("img")
				.attr("height"),
			e        = "AIzaSyDBHvI9LI0WpguUxVy9wRr0gHdMtp84bsQ",
			$(this)
				.find("img")
				.attr(
					"data-src",
					"https://maps.googleapis.com/maps/api/staticmap?center=" + f + "," + g +
							"&size=" + d + "x" + c + "&sensor=false&key=" + e + "&zoom=" + h + "&markers=si" +
							"ze:mid|" + f + "," + g
				)
		}),
		$(window).on("load", function () {
			return $(".googlemap--wrap").each(function (a, b) {
				var c,
					d,
					e,
					f,
					g,
					h,
					i;
				return f = $(b).attr("data-lat"),
				g        = $(b).attr("data-lng"),
				i        = $(b).attr("data-zoom"),
				d        = $(b).width() || 291,
				c        = $(b).height() || 285,
				e        = "AIzaSyDBHvI9LI0WpguUxVy9wRr0gHdMtp84bsQ",
				h        = "https://maps.googleapis.com/maps/api/staticmap?center=" + f + "," + g + "&" +
						"size=" + d + "x" + c + "&sensor=false&key=" + e + "&zoom=" + i + "&markers=siz" +
						"e:mid|" + f + "," + g,
				$(this).html(
					'<img src="' + h + '" width="' + d + '" height="' + c + '" alt="" />'
				)
			})
		})
	}),
	function () {
		var a;
		return a = function () {
			function a() {
				var a,
					c,
					d,
					e,
					f,
					g;
				this.x         = 0,
				this.main      = $("main"),
				this.inner     = this
					.main
					.find(".page_inner"),
				this.winW      = 0,
				this.winH      = 0,
				this.innerW    = 0,
				this.listeners = {},
				this.useNative = !Polaris.ua.android,
				this.timer     = null,
				Polaris
					.util
					.onResize(function (a) {
						return function (b, c) {
							return a.winW = b,
							a.winH        = c,
							a.innerW      = a
								.inner
								.width()
						}
					}(this)),
				this.useNative
					? this
						.main
						.on("scroll", function (a) {
							return function () {
								return a.x = a.innerW - a.winW - a
									.main[0]
									.scrollLeft,
								b.call(a)
							}
						}(this))
					: (
						this.main.addClass("polyfill"),
						d         = a     = c = 0,
						g         = function (a) {
							return function (b) {
								Polaris
									.util
									.offFrame(a.timer),
								c = b.timeStamp,
								d = b
									.originalEvent
									.touches[0]
									.clientX
							}
						}(this),
						f         = function (e) {
							return function (f) {
								var g,
									h;
								1 === f.originalEvent.touches.length && f.preventDefault(),
								h         = 0,
								g         = e.innerW - e.winW,
								a         = f
									.originalEvent
									.touches[0]
									.clientX - d,
								c         = f.timeStamp,
								d         = f
									.originalEvent
									.touches[0]
									.clientX,
								e.x >= h && e.x <= g && 1 > g
									? e.x += a
									: e.x += .5 * a,
								b.call(e)
							}
						}(this),
						e         = function (d) {
							return function (e) {
								var f,
									g;
								f       = e.timeStamp - c,
								g       = 200 > f
									? a
									: 0,
								d.timer = Polaris
									.util
									.onFrame(function (a, c, e) {
										var f,
											h;
										return g *= .92,
										d.x      += g,
										h        = 0,
										f        = d.innerW - d.winW,
										d.x < h && (d.x -= (d.x - h) * c * .007),
										d.x > f && (d.x -= (d.x - f) * c * .007),
										b.call(d),
										d.x >= h && d.x <= f && Math.abs(g) < 1
											? !1
											: void 0
									})
							}
						}(this),
						this.main.on("touchstart", g),
						this.main.on("touchmove", f),
						this.main.on(
							"touchend",
							e
						),
						this.main.on("touchcancel", e)
					),
				this.set(0)
			}
			var b;
			return a.prototype.set = function (a) {
				return this.x = a,
				this.useNative && (this.main[0].scrollLeft = this.innerW - this.winW - this.x),
				b.call(this),
				this
			},
			a.prototype.on         = function (a) {
				var b;
				return b          = Polaris
					.util
					.unique(10),
				this.listeners[b] = a,
				a(this.x, this.x + this.winW),
				b
			},
			a.prototype.off        = function (a) {
				delete this.listeners[a]
			},
			b                      = function () {
				var a,
					b,
					c;
				this.useNative || this
					.inner
					.css({
						transform: "translate3d(" + (
							this.x + this.winW - this.innerW
						) + "px,0,0)"
					}),
				c = this.listeners;
				for (a in c) 
					(b = c[a])(this.x, this.x + this.winW)
			},
			a
		}(),
		$(function () {
			return window.scroller = new a
		})
	}(),
	$(function () {
		var a,
			b;
		return a = null,
		b        = $("header .page_head"),
		window
			.scroller
			.on(function (c) {
				var d;
				d = c > 0,
				d !== a && (
					a = d,
					a
						? b.addClass("is--scrolled")
						: b.removeClass("is--scrolled")
				)
			})
	}),
	function () {
		return $(document).on("click", ".open_modal", function (a) {
			var b,
				c,
				d;
			return a.preventDefault(),
			d = $(a.currentTarget.getAttribute("data-for")),
			d.get(0)
				? (
					c = [],
					b = d.find("img").filter(function (a, b) {
						var c;
						return b.getAttribute("data-src")
							? (
								c         = new jQuery.Deferred,
								b.onload   = function () {
									c.resolve()
								},
								b.onerror = function () {
									c.resolve()
								},
								b.src         = b.getAttribute("data-src"),
								b.removeAttribute("data-src"),
								!0
							)
							: void 0
					}),
					jQuery.when.apply(window, c).done(function () {
						d.addClass("is--modal-open"),
						d.css({display: "block", opacity: 0}),
						d
							.stop(!0)
							.delay(20)
							.transit({
								opacity: 1
							}, 500, "iX2"),
						$(".spot_inner, .totteoki_list")
							.stop(!0)
							.transit({
								opacity: 0
							}, 500, "oX2")
					})
				)
				: void 0
		}),
		$(document).on("click", ".modal_close_btn", function (a) {
			var b;
			a.preventDefault(),
			b = $(".is--modal-open").removeClass("is--modal-open"),
			b
				.stop(!0)
				.transit({
					opacity: 0
				}, 500, "oX2", function () {
					return b.removeAttr("style")
				}),
			$(".spot_inner, .totteoki_list")
				.stop(!0)
				.transit({
					opacity: 1
				}, 500, "iX2")
		})
	}()
}).call(this);