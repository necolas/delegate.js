/*! delegate.js v0.0.0 - MIT license */

;(function (global) { function moduleDefinition(matches) {

// ---------------------------------------------------------------------------

var elem;

/**
 * Specify the event delegate element
 *
 * @param {Element} node
 * @return {delegate}
 * @api public
 */

function delegate(node) {
    if (!_isElem(node)) {
        throw new Error('delegate(): The argument must be an Element or Document Node');
    }
    elem = node;
    return delegate;
}

/**
 * Determine is a Node is an Element or Document
 *
 * @param {Node} node
 * @return {Boolean}
 * @api private
 */

function _isElem(node) {
    if (node && node.nodeName && (node.nodeType == Node.ELEMENT_NODE || node.nodeType == Node.DOCUMENT_NODE)) {
        return true;
    }
    return false;
}

/**
 * Expose delegate
 */

return delegate;

// ---------------------------------------------------------------------------

} if (typeof exports === 'object') {
    // node export
    module.exports = moduleDefinition(require('matches'));
} else if (typeof define === 'function' && define.amd) {
    // amd anonymous module registration
    define(['matches'], moduleDefinition);
} else {
    // browser global
    global.delegate = moduleDefinition(global.matches);
}}(this));
