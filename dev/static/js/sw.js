"use strict";

var checkCache = (function() {
	var ref = _asyncToGenerator(
		regeneratorRuntime.mark(function _callee4(req) {
			var cachedResponse;
			return regeneratorRuntime.wrap(
				function _callee4$(_context4) {
					while (1) {
						switch ((_context4.prev = _context4.next)) {
							case 0:
								_context4.next = 2;
								return caches.match(req);

							case 2:
								cachedResponse = _context4.sent;
								return _context4.abrupt(
									"return",
									cachedResponse || checkOnline(req)
								);

							case 4:
							case "end":
								return _context4.stop();
						}
					}
				},
				_callee4,
				this
			);
		})
	);

	return function checkCache(_x4) {
		return ref.apply(this, arguments);
	};
})();

var checkOnline = (function() {
	var ref = _asyncToGenerator(
		regeneratorRuntime.mark(function _callee5(req) {
			var cache, res, cachedRes;
			return regeneratorRuntime.wrap(
				function _callee5$(_context5) {
					while (1) {
						switch ((_context5.prev = _context5.next)) {
							case 0:
								_context5.next = 2;
								return caches.open(dynamicCacheName);

							case 2:
								cache = _context5.sent;
								_context5.prev = 3;
								_context5.next = 6;
								return fetch(req);

							case 6:
								res = _context5.sent;
								_context5.next = 9;
								return cache.put(req, res.clone());

							case 9:
								return _context5.abrupt("return", res);

							case 12:
								_context5.prev = 12;
								_context5.t0 = _context5["catch"](3);
								_context5.next = 16;
								return cache.match(req);

							case 16:
								cachedRes = _context5.sent;

								if (!cachedRes) {
									_context5.next = 21;
									break;
								}

								return _context5.abrupt("return", cachedRes);

							case 21:
								if (!(req.url.indexOf(".html") !== -1)) {
									_context5.next = 25;
									break;
								}

								return _context5.abrupt("return", caches.match("./index.html"));

							case 25:
								return _context5.abrupt(
									"return",
									caches.match("./images/no-image.jpg")
								);

							case 26:
							case "end":
								return _context5.stop();
						}
					}
				},
				_callee5,
				this,
				[[3, 12]]
			);
		})
	);

	return function checkOnline(_x5) {
		return ref.apply(this, arguments);
	};
})();

function _asyncToGenerator(fn) {
	return function() {
		var gen = fn.apply(this, arguments);
		return new Promise(function(resolve, reject) {
			function step(key, arg) {
				try {
					var info = gen[key](arg);
					var value = info.value;
				} catch (error) {
					reject(error);
					return;
				}
				if (info.done) {
					resolve(value);
				} else {
					return Promise.resolve(value).then(
						function(value) {
							return step("next", value);
						},
						function(err) {
							return step("throw", err);
						}
					);
				}
			}
			return step("next");
		});
	};
}

var staticCacheName = "static-cache-v0";
var dynamicCacheName = "dynamic-cache-v0";

var staticAssets = [
	"/",
	"/index.html",
	"/static/images/favicon/icon-128x128.png",
	"/static/images/favicon/icon-192x192.png",
	// "/offline.html",
	"/static/css/styles.min.css",
	"/static/js/jquery-3.3.1.min.js",
	"/static/js/libs.min.js",
	"/static/js/main.min.js"
];

self.addEventListener(
	"install",
	(function() {
		var ref = _asyncToGenerator(
			regeneratorRuntime.mark(function _callee(event) {
				var cache;
				return regeneratorRuntime.wrap(
					function _callee$(_context) {
						while (1) {
							switch ((_context.prev = _context.next)) {
								case 0:
									_context.next = 2;
									return caches.open(staticCacheName);

								case 2:
									cache = _context.sent;
									_context.next = 5;
									return cache.addAll(staticAssets);

								case 5:
									console.log("Service worker has been installed");

								case 6:
								case "end":
									return _context.stop();
							}
						}
					},
					_callee,
					undefined
				);
			})
		);

		return function(_x) {
			return ref.apply(this, arguments);
		};
	})()
);

self.addEventListener(
	"activate",
	(function() {
		var ref = _asyncToGenerator(
			regeneratorRuntime.mark(function _callee3(event) {
				var cachesKeys, checkKeys;
				return regeneratorRuntime.wrap(
					function _callee3$(_context3) {
						while (1) {
							switch ((_context3.prev = _context3.next)) {
								case 0:
									_context3.next = 2;
									return caches.keys();

								case 2:
									cachesKeys = _context3.sent;
									checkKeys = cachesKeys.map(
										(function() {
											var ref = _asyncToGenerator(
												regeneratorRuntime.mark(function _callee2(key) {
													return regeneratorRuntime.wrap(
														function _callee2$(_context2) {
															while (1) {
																switch ((_context2.prev = _context2.next)) {
																	case 0:
																		if (
																			[
																				staticCacheName,
																				dynamicCacheName
																			].includes(key)
																		) {
																			_context2.next = 3;
																			break;
																		}

																		_context2.next = 3;
																		return caches.delete(key);

																	case 3:
																	case "end":
																		return _context2.stop();
																}
															}
														},
														_callee2,
														undefined
													);
												})
											);

											return function(_x3) {
												return ref.apply(this, arguments);
											};
										})()
									);
									_context3.next = 6;
									return Promise.all(checkKeys);

								case 6:
									console.log("Service worker has been activated");

								case 7:
								case "end":
									return _context3.stop();
							}
						}
					},
					_callee3,
					undefined
				);
			})
		);

		return function(_x2) {
			return ref.apply(this, arguments);
		};
	})()
);

self.addEventListener("fetch", function(event) {
	console.log("Trying to fetch " + event.request.url);
	event.respondWith(checkCache(event.request));
});
