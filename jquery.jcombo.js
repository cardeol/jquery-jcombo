;(function ( $, window, document, undefined ) {
    var pluginName = "jCombo",
        defaults = {   
            url: null,         
            parent: null,
            first_optval : "__jc__",
            selected_value : null,
            initial_text: "-- Please Select --",            
            method: "GET",
            dataType: "jsonp"
        },
        version = "2.0";
    function Plugin( element, options ) {
        this.options = $.extend( {}, defaults, options) ;
        this.element = element;
        this.init();                        
    };
    
    Plugin.prototype = {      
        _getData: function(url,callback) {
            var self = this;   
            window.__jcombo_data_cache = (typeof window.__jcombo_data_cache === "undefined") ? {} : window.__jcombo_data_cache;
            var cacheKey = JSON.stringify(url);  
            if (!window.__jcombo_data_cache[cacheKey]) {
                $.ajax({
                    type: self.options.method,
                    dataType: self.options.dataType,                    
                    url: url,
                    success: function(data) {
                        window.__jcombo_data_cache[cacheKey] = data;   
                        callback(data);
                    }
                });                 
            } else {
                callback(window.__jcombo_data_cache[cacheKey]);
            }            
        },
        _firstOption: function() {
            if(this.initial_text == "") return "";
            return '<option value="' + this.options.first_optval + '">' + this.options.initial_text + '</option>';
        },
        _renderSelect: function(data, selected_value) {
            var response = [];
            if(typeof selected_value == "undefined") selected_value = this.options.first_optval;
            response.push(this._firstOption());
            var selected;
            for(var index in data) {
                selected = (index == selected_value)?' selected="selected"':'';
                response.push('<option value="' + index + '"' + selected + '>' + data[index] + '</option>');
            }
            return response.join("");
        },        
        init: function() {                      
            var self = this;
            var parent_selected = null;
            if(this.options.selected_value!=null) {
                $(self.element).data("jcombo-selected",this.options.selected_value);                
            } 

            if(this.options.parent!=null) {
                $(this.options.parent).each(function(index,elem) {
                    var psel = $(elem).data("jcombo-selected");
                    if(!(typeof psel === "undefined")) parent_selected = psel;
                    return false;
                });
            }            
            if(this.options.url!=null) {     
                $(this.element).data("jcombo-url",this.options.url);
                var myurl = this.options.url;
                if(this.options.parent!=null) myurl+=parent_selected;
                this._getData(myurl ,function(data) {                                                         
                    var inner = self._renderSelect(data,self.options.selected_value);
                    $(self.element).html(inner);
                });                                    
            }           
            if(this.options.parent!=null) {
                var parents = this.options.parent;
                $(parents).each(function(index,elem) {                          
                    var cselec = $(elem).data("jcombo-children");                    
                    if(!(cselec instanceof Array)) cselec = [];
                    if(cselec.indexOf(self.options.selector)<0) {
                        cselec.push(self.options.selector);
                    }                    
                    $(elem).data("jcombo-children",cselec);
                    $(elem).bind("change",function() {
                        var selectors =$(elem).data("jcombo-children");
                        var value = $(elem).val();
                        for(k in selectors) {                                                        
                            var selector = selectors[k];
                            if(value == self.options.first_optval) {
                                $(selector).html(self._firstOption());
                                $(selector).attr("disabled","disabled");
                            } else {           
                                $(selector).removeAttr("disabled");      
                                $(selector).each(function(index,son) {
                                    var url = $(son).data("jcombo-url");
                                    self._getData(url + value,function(data) {
                                        var inner = self._renderSelect(data);
                                        $(son).html(inner);
                                        $(son).trigger("change");
                                    });
                                });
                            };                            
                        };                        
                    });                      
                });
            };           
        }
        
    };
    $.fn[pluginName] = function ( options ) {
        options.selector = $(this).selector;
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };
})( jQuery, window, document );
