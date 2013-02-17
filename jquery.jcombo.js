// jCombo v2.0
// Carlos De Oliveira cardeol@gmail.com (c) Feb 2013
;(function ($, window, document, undefined) {
	$.fn.jCombo = function(url, opt) {		
		var defaults = {
				parent: null,
				first_optval : "__jcombo__",
				selected_value : "0",
				initial_text: "-- Please Select --",
				method: "GET",
				dataType: "jsonp"								
		};				
		var opt = $.extend( defaults, opt) ;
		var obj = $(this);
		if(opt.parent!=null) {
			var $parent = $(opt.parent);			
			$parent.removeAttr("disabled","disabled");
			$parent.bind('change',  function(e) {
				obj.attr("disabled","disabled");
				if($(this).val()!=opt.first_optval) obj.removeAttr("disabled");
				__render(	obj, { 
					url: url, 
					id: $(this).val(),
					first_optval: opt.first_optval, 
					initext: opt.initial_text, 
					inival: opt.selected_value,
					method: opt.method,
					dataType: opt.dataType
				});
			});
		} else __render(obj,{ 
			url: url,
			id: "",
			first_optval: opt.first_optval,
			initext: opt.initial_text,
			inival: opt.selected_value,
			method: opt.method,
			dataType: opt.dataType
		});					
		function __render($obj,$options) {			
			if($options.id==null) return false;
			$.ajax({
				type: $options.method,
				dataType: $options.dataType,					
				url: $options.url + $options.id,
				success: function(data){
					var response = '<option value="' + $options.first_optval + '">' + $options.initext + '</option>';
					var selected;
					for(var index in data) {
						selected = (index==$options.inival)?' selected="selected"':'';
						response += '<option value="' + index + '"' + selected + '>' + data[index] + '</option>';
					}
					$obj.html(response);					           										
					$obj.trigger("change");
				}
			});					
		}
	}
})( jQuery, window, document );