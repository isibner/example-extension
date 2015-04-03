console.log('Hello from the Chrome extension!');

chrome.storage.sync.clear();
chrome.storage.sync.set({'replacementPairs': ['internet', 'series of tubes']});

// when the extention is installed...
chrome.runtime.onInstalled.addListener(function() {

  // replace all existing rules...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {

    // with these new rules:
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: '.*' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
