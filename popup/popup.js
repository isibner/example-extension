// nothing yet...
$(function() {
  $('#submit').click(function() {
    var matchText = $('#text').val();
    var replacementText = $('#replacement').val();

    chrome.storage.sync.get('replacementPairs', function (result){
      var replacementPairs = result.replacementPairs;
      replacementPairs.push(matchText);
      replacementPairs.push(replacementText);
      chrome.storage.sync.set({'replacementPairs': replacementPairs}, function () {
        chrome.tabs.executeScript(null, { code: 'window.walkAllPairs()' });
      });
    });
  });
});
