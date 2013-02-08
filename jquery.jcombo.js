/*!
 * jQuery jCombo Plugin
 * Carlos De Oliveira
 * cardeol@gmail.com
 *
 * Latest Release: Sep 2011 
 */
(function($) {
	$.fn.jCombo = function(url, user_options) {
		var default_options = {
				parent: "",
				selected_value : "0",
				parent_value : "",
				initial_text: "-- Please Select --"
		};				
		var user_options = $.extend( default_options, user_options) ;
		var obj = $(this);
		if(user_options.parent!="") {
			var $parent = $(user_options.parent);			
			$parent.removeAttr("disabled","disabled");
			$parent.bind('change',  function(e) {
				obj.attr("disabled","disabled");
				if($(this).val()!="0" && $(this).val()!="") obj.removeAttr("disabled");
				__fill(	obj,
						url,
						$(this).val(),
						user_options.initial_text,
						user_options.selected_value);				
			});
		} 
		__fill(obj,url,user_options.parent_value,user_options.initial_text,user_options.selected_value);					
		function __fill($obj,$url,$id,$initext,$inival) {			
			$.ajax({
				type: "GET",
				dataType:"jsonp",					
				url: $url + $id,
				success: function(data){
					var response = '<option value="0">' + $initext + '</option>';
					for(var index in data) {
						var selected = (index==$inival)?' selected="selected"':'';
						response += '<option value="' + index + '"' + selected + '>' + data[index] + '</option>';
					}
					$obj.html(response);					           										
					$obj.trigger("change");
				}
			});					
		}
	}
})(jQuery);