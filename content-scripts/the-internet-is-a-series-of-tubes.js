/**
 * A few notes (yes I did have to research some of this!)
 *  - jQuery's .contents() function is necessary if we want text nodes
 *  - A node has nodeType === 1 if it's an element, === 3 if it's text
 *  - An element node has tagName indicating its tagname (useful for not hitting scripts)
 *  - $.filter operates with the dom node as it's 'this' context
 *  - $.replaceWith can take a function that dictates what text to change,
 *    also with a DOM node 'this' context
**/

var internetRegex = /\binternet/ig;

var replaceText = function ($matchingTextNodes) {
  $matchingTextNodes.replaceWith(function () {
    return $(this).text().replace(internetRegex,
        '<span class="series-of-tubes">series of tubes</span>');
  });
};


var walk = function($nodes) {
  var $contents = $nodes.contents();
  var $matchingTextNodes = $contents.filter(function () {
    return this.nodeType === 3 &&
           $(this).text().match(internetRegex);
  });
  var $elementNodes = $contents.filter(function () {
    return this.nodeType === 1
            && this.tagName.toLowerCase() !== 'script'
            && this.tagName.toLowerCase() !== 'style';
  });
  replaceText($matchingTextNodes);
  if ($elementNodes.length > 0) {
    walk($elementNodes);
  }
};

walk($('body'));

// we'll need to add code here to walk all word/replacement pairs
