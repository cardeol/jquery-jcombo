jCombo
======


This plugin simplifies the process to populate data into SELECT tags, even if nested or not. The only condition is to put the fields in query consecutively in order to create pairs of [value],[text] inside the Json File. Unobtrusive, without fancy effects, just takes data as fast as possible.

Data Format (server side)
-------------------------

The output must be in json with "id" and "value" attributes to avoid javascript sorting and preserve order.

json response example:
<pre>
[
    {"id":"1","value":"Alto Orinoco"},
    {"id":"2","value":"Atabapo"},
    {"id":"3","value":"Atures"},
    {"id":"4","value":"Autana"},
    {"id":"5","value":"Maroa"}
]
</pre>


Example 1: Simple SELECT
------------------------

<code>
&lt;select name="country"&gt;&lt;/select&gt;
</code>

<code>
$("select[name='country']").jCombo({ url: "getCountries.php" });
</code>


Example 2: Nested Combos
------------------------

<html>
  &lt;select id="list1"&gt;&lt;/select&gt;<br>
  &lt;select id="list2"&gt;&lt;/select&gt;<br>
  &lt;select id="list3"&gt;&lt;/select&gt;<br>
</html>

<pre><code>
$(function() { 
    $("#list1").jCombo({
       url: "getEstados.php",
       selected_value : '15'
    });
    $("#list2").jCombo({
      url: "getMunicipios.php?id=",
      parent: "#list1",
      selected_value: '178'
    });
    $("#list3").jCombo({
      url: "getParroquias.php",
      input_param: "id",
      method: "POST"
      parent: "#list2",
      selected_value: '630'
    });
});
</code></pre>

Options
-------

<b>url</b>: url to retrieve the data, for child selects the url must be formatted to concat the ID (url + id)

<b>input_param</b>: Parameter name attached to the request (POST OR GET). for example "id" or "cityid"

<b>parent</b>: Parent SELECT element from which data is fetched

<b>initial_text</b>: Default message to select an option. if you set an empty value then does not shows any initial text.

<b>selected_value</b>: Sets the default value for select.

<b>method</b>: [ "GET" (default), "POST" ]

<b>dataType</b>: [ "json" , "jsonp" ] is an $.ajax dataType (jsonp as default) 

Events
------

<b>onChange:</b> Event triggered when the parent select has changed.
