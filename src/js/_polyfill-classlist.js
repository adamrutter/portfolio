/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.2.20171210
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/* global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ('document' in self) {
	// Full polyfill for browsers with no classList support
	// Including IE < Edge missing SVGElement.classList
	if (
		!('classList' in document.createElement('_')) ||
		(document.createElementNS &&
			!(
				'classList' in
				document.createElementNS('http://www.w3.org/2000/svg', 'g')
			))
	) {
		(function(view) {
			

			if (!('Element' in view)) return;

			const classListProp = 'classList';
				const protoProp = 'prototype';
				const elemCtrProto = view.Element[protoProp];
				const objCtr = Object;
				const strTrim =
					String[protoProp].trim ||
					function() {
						return this.replace(/^\s+|\s+$/g, '');
					};
				const arrIndexOf =
					Array[protoProp].indexOf ||
					function(item) {
						let i = 0;
							const len = this.length;
						for (; i < len; i++) {
							if (i in this && this[i] === item) {
								return i;
							}
						}
						return -1;
					};
				// Vendors: please allow content code to instantiate DOMExceptions
				const DOMEx = function(type, message) {
					this.name = type;
					this.code = DOMException[type];
					this.message = message;
				};
				const checkTokenAndGetIndex = function(classList, token) {
					if (token === '') {
						throw new DOMEx('SYNTAX_ERR', 'The token must not be empty.');
					}
					if (/\s/.test(token)) {
						throw new DOMEx(
							'INVALID_CHARACTER_ERR',
							'The token must not contain space characters.'
						);
					}
					return arrIndexOf.call(classList, token);
				};
				const ClassList = function(elem) {
					const trimmedClasses = strTrim.call(elem.getAttribute('class') || '');
						const classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [];
						let i = 0;
						const len = classes.length;
					for (; i < len; i++) {
						this.push(classes[i]);
					}
					this._updateClassName = function() {
						elem.setAttribute('class', this.toString());
					};
				};
				const classListProto = (ClassList[protoProp] = []);
				const classListGetter = function() {
					return new ClassList(this);
				};
			// Most DOMException implementations don't allow calling DOMException's toString()
			// on non-DOMExceptions. Error's toString() is sufficient here.
			DOMEx[protoProp] = Error[protoProp];
			classListProto.item = function(i) {
				return this[i] || null;
			};
			classListProto.contains = function(token) {
				return ~checkTokenAndGetIndex(this, token + '');
			};
			classListProto.add = function() {
				const tokens = arguments;
					let i = 0;
					const l = tokens.length;
					let token;
					let updated = false;
				do {
					token = tokens[i] + '';
					if (!~checkTokenAndGetIndex(this, token)) {
						this.push(token);
						updated = true;
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.remove = function() {
				const tokens = arguments;
					let i = 0;
					const l = tokens.length;
					let token;
					let updated = false;
					let index;
				do {
					token = tokens[i] + '';
					index = checkTokenAndGetIndex(this, token);
					while (~index) {
						this.splice(index, 1);
						updated = true;
						index = checkTokenAndGetIndex(this, token);
					}
				} while (++i < l);

				if (updated) {
					this._updateClassName();
				}
			};
			classListProto.toggle = function(token, force) {
				const result = this.contains(token);
					const method = result
						? force !== true && 'remove'
						: force !== false && 'add';
				if (method) {
					this[method](token);
				}

				if (force === true || force === false) {
					return force;
				} 
					return !result;
				
			};
			classListProto.replace = function(token, replacement_token) {
				const index = checkTokenAndGetIndex(token + '');
				if (~index) {
					this.splice(index, 1, replacement_token);
					this._updateClassName();
				}
			};
			classListProto.toString = function() {
				return this.join(' ');
			};

			if (objCtr.defineProperty) {
				const classListPropDesc = {
					get: classListGetter,
					enumerable: true,
					configurable: true
				};
				try {
					objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
				} catch (ex) {
					// IE 8 doesn't support enumerable:true
					// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
					// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
					if (ex.number === undefined || ex.number === -0x7ff5ec54) {
						classListPropDesc.enumerable = false;
						objCtr.defineProperty(
							elemCtrProto,
							classListProp,
							classListPropDesc
						);
					}
				}
			} else if (objCtr[protoProp].__defineGetter__) {
				elemCtrProto.__defineGetter__(classListProp, classListGetter);
			}
		})(self);
	}

	// There is full or partial native classList support, so just check if we need
	// to normalize the add/remove and toggle APIs.

	(function() {
		

		let testElement = document.createElement('_');

		testElement.classList.add('c1', 'c2');

		// Polyfill for IE 10/11 and Firefox <26, where classList.add and
		// classList.remove exist but support only one argument at a time.
		if (!testElement.classList.contains('c2')) {
			const createMethod = function(method) {
				const original = DOMTokenList.prototype[method];

				DOMTokenList.prototype[method] = function(token) {
					let i;
						const len = arguments.length;

					for (i = 0; i < len; i++) {
						token = arguments[i];
						original.call(this, token);
					}
				};
			};
			createMethod('add');
			createMethod('remove');
		}

		testElement.classList.toggle('c3', false);

		// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
		// support the second argument.
		if (testElement.classList.contains('c3')) {
			const _toggle = DOMTokenList.prototype.toggle;

			DOMTokenList.prototype.toggle = function(token, force) {
				if (1 in arguments && !this.contains(token) === !force) {
					return force;
				} 
					return _toggle.call(this, token);
				
			};
		}

		// replace() polyfill
		if (!('replace' in document.createElement('_').classList)) {
			DOMTokenList.prototype.replace = function(token, replacement_token) {
				let tokens = this.toString().split(' ');
					const index = tokens.indexOf(token + '');
				if (~index) {
					tokens = tokens.slice(index);
					this.remove.apply(this, tokens);
					this.add(replacement_token);
					this.add.apply(this, tokens.slice(1));
				}
			};
		}

		testElement = null;
	})();
}
