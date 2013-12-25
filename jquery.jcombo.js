/*
 * jQuery jCombo Plugin v3.0
 * Carlos De Oliveira
 * cardeol@gmail.com
 * Latest Release: Dic 2013
 */
;(function ( $, window, document, undefined ) {
    var pluginName = "jCombo",
		version = "3.0",
        defaults = {   
            url: null,         
            parent: null,
            first_optval : "__jc__",
            input_param: null,
            data: null,
            selected_value : null,
			onLoad: null,
			onChange: null,
            initial_text: "-- Please Select --",            
            method: "GET",
            dataType: "jsonp"
        };        
    function Plugin( element, options ) {
        this.options = $.extend( {}, defaults, options) ;        
        this.element = element;
        this.init();                        
    };    
    Plugin.prototype = {                      
        _addParameter: function(param,value) {
			if(param==null || value == null) return false;
            this.options.data = param + "=" + value;            
			return true;
        },
        _getJson: function(url,cback) {
            var self = this;           
			var dd = (self.options.orig_data!=null) ? self.options.orig_data : "";
			dd += (self.options.data!=null) ? self.options.data : "";		
			$.ajax({
				url: url,
				data: dd,
				type: self.options.dataType,                
				dataType: "jsonp",
				method: self.options.method,
				success: cback
			});   
        },
		_onLoadCall: function() {
			if(this.options.onLoad != null) {
				var f = this.options.onLoad;
				this.options.onLoad = null;
				f();
			}					
		},
        _getData: function(url,cback) {			
            var self = this;   
            window.__jcombo_data_cache = (typeof window.__jcombo_data_cache === "undefined") ? {} : window.__jcombo_data_cache;
            var cK = JSON.stringify(url + self.options.orig_data + "&" + self.options.data);  
            if (!window.__jcombo_data_cache[cK] || true ) {
                self._getJson(url,function(data) {
                    window.__jcombo_data_cache[cK] = data;   
                    cback(data);					
                });                
            } else setTimeout(function() { 			
				cback(window.__jcombo_data_cache[cK]); 
			},0);
        },
        _renderOption: function(v,t,s) {
            var sel = "";
            if(s==true) sel = ' selected="selected"';
            return '<option value="' + v + '"' + sel + '>' + t + '</option>';
        },
        _firstOption: function() {
            if(this.initial_text == "") return "";
            return this._renderOption(this.options.first_optval,this.options.initial_text,false);
        },
        _renderSelect: function(data, selected_value) {
            var response = [];
            if(typeof selected_value == "undefined") selected_value = this.options.first_optval;
            response.push(this._firstOption());
            for(var index in data) {
                var option = data[index];
                response.push(this._renderOption(option.id,option.value,option.id == selected_value));                
            }
            return response.join("");
        },
		_bindSelect:function (id, value) {
			var self = this;
			var xurl = this.options.url;
			value = (value==null) ? id : value;
			if(this.options.input_param == null) xurl+= (id==null)?"":id;                          			
            else this._addParameter(this.options.input_param,value);
			var xid = $(self.element).attr("id");
			if(value==this.options.first_optval || id==this.options.first_optval) {
				$(this.element).html(this._firstOption());
				$(this.element).attr("disabled","disabled");				
				$(self.element).trigger("change");
				self._onLoadCall();
			} else {				
				this._getData(xurl, function(data) {					
					$(self.element).html(self._renderSelect(data,value));
					self._onLoadCall();					
					if(value!=null || id ==null) {
						$(self.element).trigger("change");
						if(self.options.onChange != null) self.options.onChange(value);												
					} 
					if(data.length>0) $(self.element).removeAttr("disabled");					
				});
			}
		},
        init: function() {                      
            var self = this;            
            this.options.orig_data = this.options.data;
            if(this.options.parent!=null) {
                $(this.options.parent).each(function(index,elem) {                                              
					var pvalue = $(elem).val();
					$(elem).bind("change",function() {
						self._bindSelect($(elem).val(),self.options.selected_value);							
					});
				});
           } else this._bindSelect(null,self.options.selected_value);
        }        
    };
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };
})( jQuery, window, document );
