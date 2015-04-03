console.log('Hello from the Chrome extension!');

// when the extention is installed...
chrome.runtime.onInstalled.addListener(function() {

  // replace all existing rules...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {

    // with these new rules:
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
