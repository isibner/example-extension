/**
 * A few notes (yes I did have to research some of this!)
 *  - jQuery's .contents() function is necessary if we want text nodes
 *  - A node has nodeType === 1 if it's an element, === 3 if it's text
 *  - An element node has tagName indicating its tagname (useful for not hitting scripts)
 *  - $.filter operates with the dom node as it's 'this' context
 *  - $.replaceWith can take a function that dictates what text to change,
 *    also with a DOM node 'this' context
**/

var makeRegex = function (matchText) {
  return new RegExp('\\b' + matchText, 'ig');
}

var replaceText = function ($matchingTextNodes, replacementText, regex) {
  $matchingTextNodes.replaceWith(function () {
    return $(this).text().replace(regex,
        '<span class="series-of-tubes">' + replacementText + '</span>');
  });
};


var walk = function($nodes, matchText, replacementText) {
  var $contents = $nodes.contents();
  var regex = makeRegex(matchText);
  var $matchingTextNodes = $contents.filter(function () {
    return this.nodeType === 3 &&
           $(this).text().match(regex);
  });
  var $elementNodes = $contents.filter(function () {
    return this.nodeType === 1
            && this.tagName.toLowerCase() !== 'script'
            && this.tagName.toLowerCase() !== 'style';
  });
  replaceText($matchingTextNodes, replacementText, regex);
  if ($elementNodes.length > 0) {
    walk($elementNodes, matchText, replacementText);
  }
};

var walkAllPairs = function() {
  chrome.storage.sync.get('replacementPairs', function (result) {
    var replacementPairs = result.replacementPairs;
    for (var i = 0; i < replacementPairs.length; i+=2) {
      var matchText = replacementPairs[i];
      var replacementText = replacementPairs[i + 1];
      walk($('body'), matchText, replacementText);
    }
  });
};

window.walkAllPairs = walkAllPairs;
walkAllPairs();
