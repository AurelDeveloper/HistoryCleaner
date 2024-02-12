// background.js
chrome.history.onVisited.addListener(function(historyItem) {
    var url = historyItem.url;
    chrome.storage.sync.get(null, function(items) {
      for (var site in items) {
        if (url.includes(site)) {
          chrome.history.deleteUrl({url: url});
        }
      }
    });
  });