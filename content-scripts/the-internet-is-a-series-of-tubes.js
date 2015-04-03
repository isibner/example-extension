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