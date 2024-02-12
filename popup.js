// popup.js
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    var site = document.getElementById('site').value;
    chrome.storage.sync.set({[site]: true}, function() {
      document.getElementById('site').value = '';
      addSiteToTable(site);
    });
  });
  
  function addSiteToTable(site) {
    var table = document.getElementById('table');
    var row = document.createElement('tr');
    var cell = document.createElement('td');
    cell.textContent = site;
    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
      chrome.storage.sync.remove(site, function() {
        table.removeChild(row);
      });
    });
    row.appendChild(cell);
    row.appendChild(removeButton);
    table.appendChild(row);
  }
  
  window.onload = function() {
    chrome.storage.sync.get(null, function(items) {
      for (var site in items) {
        addSiteToTable(site);
      }
    });
  };