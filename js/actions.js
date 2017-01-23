var active = {}, library = {};

Storage.prototype.setObj = function(key, obj) {
	return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function(key) {
	return JSON.parse(this.getItem(key));
};

library.json = {
	replacer: function(match, pIndent, pKey, pVal, pEnd) {
	  var key = '<span class=json-key>', val = '<span class=json-value>', 
			str = '<span class=json-string>', nval = '<span class=json-null-value>', 
			r = pIndent || '';
			
	  if (pKey)
	     r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
			 
	  if (pVal)
	     r = r + (pVal[0] == '"' ? str : (pVal == "null" ? nval : val)) + pVal + '</span>';
			 
	  return r + (pEnd || '');
	}, prettyPrint: function(obj) {
	  var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
			
	  return JSON.stringify(obj, null, 3)
	     .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
	     .replace(/</g, '&lt;').replace(/>/g, '&gt;')
	     .replace(jsonLine, library.json.replacer);
	}
};

var uglifyJson = function() {
	var originalJson = localStorage.getObj("originalJson");
	
	document.body.innerHTML = originalJson;
};

var beautifyJson = function() {
	localStorage.setObj("originalJson", document.body.innerHTML);
	
	var html = document.body.innerHTML, regex = /(<([^>]+)>)/igm, 
		stringJson = html.replace(regex, "");	
	if(stringJson) {
		var json = JSON.parse(stringJson);
		
		document.body.innerHTML = "<pre>" + library.json.prettyPrint(json) + "</pre>";
	} else {
		console.log("Invalid error to parse :/");
	}
};

var setIcon = function(icon) {
  chrome.browserAction.setIcon({
    path : {"38": "images/icon-" + icon + "-38.png"}
  });
};
