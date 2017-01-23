chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if(changeInfo.status == "complete") {
    active[tab.id] = false;
    setIcon("inactive");
  }
});

chrome.tabs.onActivated.addListener(function(info) {
  if(active[info.tabId]) {
    setIcon("active");
  } else {
    setIcon("inactive");
  }
});

chrome.browserAction.onClicked.addListener(function(tab) {
  var func = "uglifyJson()", iconStatus = "inactive";
  
  active[tab.id] = !active[tab.id];
  
  if(active[tab.id]) {
    func = "beautifyJson()";
    iconStatus = "active";
  }
  
  chrome.tabs.executeScript(null, {code: func});
  setIcon(iconStatus);
});
