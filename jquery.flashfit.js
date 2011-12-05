/*!
 * FlashFit by Jakub Przyborowski
 * http://github.com/przyb/jquery.flashfit.js
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function($) {
	var methods = {
		init : function(options) {
			var overall = $('<div></div>'),
				$this = $(this);
			
			methods._html = $('html');
			methods._body = $('body');
			methods._w = $(window);
				
			overall.appendTo($this.parent());
			overall.append($this);
			
			methods._fit(overall, options);
			methods._w.bind('resize', { t: overall, o: options } , function(e){
				methods._fit(e.data.t, e.data.o);
			});
		},
		
		_fit : function(target, options) {
			var liquid = true,
				isXStatic = false,
				isYStatic = false,
				$target = $(target),
				widthParam='width',
				heightParam='height',
				valueAuto='auto',
				value100Percent='100%';
				
			if (methods._w.width()<=options.minWidth) {
				liquid = false;
				isXStatic = true;	
			}
			
			if (methods._w.height()<=options.minHeight) {
				liquid = false;
				isYStatic = true;	
			}
			
			$target.css(widthParam, isXStatic ? options.minWidth+'px' : value100Percent);
			$target.css(heightParam, isYStatic ? options.minHeight+'px' : value100Percent);
			
			methods._html
				.css('overflow', liquid ? 'hidden' : valueAuto)
				.css(widthParam, liquid ? value100Percent : valueAuto)
				.css(heightParam, liquid ? value100Percent : valueAuto);
				
			methods._body
				.css(widthParam, liquid ? value100Percent : valueAuto)
				.css(heightParam, liquid ? value100Percent : valueAuto);
		}
 	};

	$.fn.flashfit = function(opts) {
		return methods.init.call(this, opts);
	};
})(jQuery);