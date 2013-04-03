/**
 * Copyright (C) 2012 KO GmbH <jos.van.den.oever@kogmbh.com>
 * @licstart
 * The JavaScript code in this page is free software: you can redistribute it
 * and/or modify it under the terms of the GNU Affero General Public License
 * (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 * the License, or (at your option) any later version.  The code is distributed
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.
 *
 * As additional permission under GNU AGPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * As a special exception to the AGPL, any HTML file which merely makes function
 * calls to this code, and for that purpose includes it by reference shall be
 * deemed a separate work for copyright law purposes. In addition, the copyright
 * holders of this code give you permission to combine this code with free
 * software libraries that are released under the GNU LGPL. You may copy and
 * distribute such a system following the terms of the GNU AGPL for this code
 * and the LGPL for the libraries. If you modify this code, you may extend this
 * exception to your version of the code, but you are not obligated to do so.
 * If you do not wish to do so, delete this exception statement from your
 * version.
 *
 * This license applies to this entire compilation.
 * @licend
 * @source: http://www.webodf.org/
 * @source: http://gitorious.org/webodf/webodf/
 */
/*global odf, runtime, xmldom*/

runtime.loadClass("xmldom.XPath");
/**
 * @constructor
 */
odf.StyleInfo = function StyleInfo() {
    "use strict";
    // helper constants
    var chartns = "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
        dbns = "urn:oasis:names:tc:opendocument:xmlns:database:1.0",
        dr3dns = "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
        drawns = "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
        fons = "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
        formns = "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
        numberns = "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
        officens = "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
        presentationns = "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
        stylens = "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
        svgns = "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
        tablens = "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
        textns = "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
        xmlns = "http://www.w3.org/XML/1998/namespace",
        /**@const@type{!Object.<string,string>}*/ nsprefixes = {
            "urn:oasis:names:tc:opendocument:xmlns:chart:1.0": "chart:",
            "urn:oasis:names:tc:opendocument:xmlns:database:1.0": "db:",
            "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0": "dr3d:",
            "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0": "draw:",
            "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0": "fo:",
            "urn:oasis:names:tc:opendocument:xmlns:form:1.0": "form:",
            "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0": "number:",
            "urn:oasis:names:tc:opendocument:xmlns:office:1.0": "office:",
            "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0": "presentation:",
            "urn:oasis:names:tc:opendocument:xmlns:style:1.0": "style:",
            "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0": "svg:",
            "urn:oasis:names:tc:opendocument:xmlns:table:1.0": "table:",
            "urn:oasis:names:tc:opendocument:xmlns:text:1.0": "chart:",
            "http://www.w3.org/XML/1998/namespace": "xml:"
        },
        /**
         * Data about the styles.
         * ens: element namespace, en: element name, ans: attribute namespace, a: attribute
         * @type {!Object.<string,Array.<Object.<string,string>>>}
         */
        elementstyles = {
            "text": [
                { ens: stylens, en: 'tab-stop', ans: stylens, a: 'leader-text-style'},
                { ens: stylens, en: 'drop-cap', ans: stylens, a: 'style-name'},
                { ens: textns, en: 'notes-configuration', ans: textns, a: 'citation-body-style-name'},
                { ens: textns, en: 'notes-configuration', ans: textns, a: 'citation-style-name'},
                { ens: textns, en: 'a', ans: textns, a: 'style-name'},
                { ens: textns, en: 'alphabetical-index', ans: textns, a: 'style-name'},
                { ens: textns, en: 'linenumbering-configuration', ans: textns, a: 'style-name'},
                { ens: textns, en: 'list-level-style-number', ans: textns, a: 'style-name'},
                { ens: textns, en: 'ruby-text', ans: textns, a: 'style-name'},
                { ens: textns, en: 'span', ans: textns, a: 'style-name'},
                { ens: textns, en: 'a', ans: textns, a: 'visited-style-name'},
                { ens: stylens, en: 'text-properties', ans: stylens, a: 'text-line-through-text-style'},
                { ens: textns, en: 'alphabetical-index-source', ans: textns, a: 'main-entry-style-name'},
                { ens: textns, en: 'index-entry-bibliography', ans: textns, a: 'style-name'},
                { ens: textns, en: 'index-entry-chapter', ans: textns, a: 'style-name'},
                { ens: textns, en: 'index-entry-link-end', ans: textns, a: 'style-name'},
                { ens: textns, en: 'index-entry-link-start', ans: textns, a: 'style-name'},
                { ens: textns, en: 'index-entry-page-number', ans: textns, a: 'style-name'},
                { ens: textns, en: 'index-entry-span', ans: textns, a: 'style-name'},
                { ens: textns, en: 'index-entry-tab-stop', ans: textns, a: 'style-name'},
                { ens: textns, en: 'index-entry-text', ans: textns, a: 'style-name'},
                { ens: textns, en: 'index-title-template', ans: textns, a: 'style-name'},
                { ens: textns, en: 'list-level-style-bullet', ans: textns, a: 'style-name'},
                { ens: textns, en: 'outline-level-style', ans: textns, a: 'style-name'}
            ],
            "paragraph": [
                { ens: drawns, en: 'caption', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'circle', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'connector', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'control', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'custom-shape', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'ellipse', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'frame', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'line', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'measure', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'path', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'polygon', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'polyline', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'rect', ans: drawns, a: 'text-style-name'},
                { ens: drawns, en: 'regular-polygon', ans: drawns, a: 'text-style-name'},
                { ens: officens, en: 'annotation', ans: drawns, a: 'text-style-name'},
                { ens: formns, en: 'column', ans: formns, a: 'text-style-name'},
                { ens: stylens, en: 'style', ans: stylens, a: 'next-style-name'},
                { ens: tablens, en: 'body', ans: tablens, a: 'paragraph-style-name'},
                { ens: tablens, en: 'even-columns', ans: tablens, a: 'paragraph-style-name'},
                { ens: tablens, en: 'even-rows', ans: tablens, a: 'paragraph-style-name'},
                { ens: tablens, en: 'first-column', ans: tablens, a: 'paragraph-style-name'},
                { ens: tablens, en: 'first-row', ans: tablens, a: 'paragraph-style-name'},
                { ens: tablens, en: 'last-column', ans: tablens, a: 'paragraph-style-name'},
                { ens: tablens, en: 'last-row', ans: tablens, a: 'paragraph-style-name'},
                { ens: tablens, en: 'odd-columns', ans: tablens, a: 'paragraph-style-name'},
                { ens: tablens, en: 'odd-rows', ans: tablens, a: 'paragraph-style-name'},
                { ens: textns, en: 'notes-configuration', ans: textns, a: 'default-style-name'},
                { ens: textns, en: 'alphabetical-index-entry-template', ans: textns, a: 'style-name'},
                { ens: textns, en: 'bibliography-entry-template', ans: textns, a: 'style-name'},
                { ens: textns, en: 'h', ans: textns, a: 'style-name'},
                { ens: textns, en: 'illustration-index-entry-template', ans: textns, a: 'style-name'},
                { ens: textns, en: 'index-source-style', ans: textns, a: 'style-name'},
                { ens: textns, en: 'object-index-entry-template', ans: textns, a: 'style-name'},
                { ens: textns, en: 'p', ans: textns, a: 'style-name'},
                { ens: textns, en: 'table-index-entry-template', ans: textns, a: 'style-name'},
                { ens: textns, en: 'table-of-content-entry-template', ans: textns, a: 'style-name'},
                { ens: textns, en: 'table-index-entry-template', ans: textns, a: 'style-name'},
                { ens: textns, en: 'user-index-entry-template', ans: textns, a: 'style-name'},
                { ens: stylens, en: 'page-layout-properties', ans: stylens, a: 'register-truth-ref-style-name'}
            ],
            "chart": [
                { ens: chartns, en: 'axis', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'chart', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'data-label', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'data-point', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'equation', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'error-indicator', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'floor', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'footer', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'grid', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'legend', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'mean-value', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'plot-area', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'regression-curve', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'series', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'stock-gain-marker', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'stock-loss-marker', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'stock-range-line', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'subtitle', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'title', ans: chartns, a: 'style-name'},
                { ens: chartns, en: 'wall', ans: chartns, a: 'style-name'}
            ],
            "section": [
                { ens: textns, en: 'alphabetical-index', ans: textns, a: 'style-name'},
                { ens: textns, en: 'bibliography', ans: textns, a: 'style-name'},
                { ens: textns, en: 'illustration-index', ans: textns, a: 'style-name'},
                { ens: textns, en: 'index-title', ans: textns, a: 'style-name'},
                { ens: textns, en: 'object-index', ans: textns, a: 'style-name'},
                { ens: textns, en: 'section', ans: textns, a: 'style-name'},
                { ens: textns, en: 'table-of-content', ans: textns, a: 'style-name'},
                { ens: textns, en: 'table-index', ans: textns, a: 'style-name'},
                { ens: textns, en: 'user-index', ans: textns, a: 'style-name'}
            ],
            "ruby": [
                { ens: textns, en: 'ruby', ans: textns, a: 'style-name'}
            ],
            "table": [
                { ens: dbns, en: 'query', ans: dbns, a: 'style-name'},
                { ens: dbns, en: 'table-representation', ans: dbns, a: 'style-name'},
                { ens: tablens, en: 'background', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'table', ans: tablens, a: 'style-name'}
            ],
            "table-column": [
                { ens: dbns, en: 'column', ans: dbns, a: 'style-name'},
                { ens: tablens, en: 'table-column', ans: tablens, a: 'style-name'}
            ],
            "table-row": [
                { ens: dbns, en: 'query', ans: dbns, a: 'default-row-style-name'},
                { ens: dbns, en: 'table-representation', ans: dbns, a: 'default-row-style-name'},
                { ens: tablens, en: 'table-row', ans: tablens, a: 'style-name'}
            ],
            "table-cell": [
                { ens: dbns, en: 'column', ans: dbns, a: 'default-cell-style-name'},
                { ens: tablens, en: 'table-column', ans: tablens, a: 'default-cell-style-name'},
                { ens: tablens, en: 'table-row', ans: tablens, a: 'default-cell-style-name'},
                { ens: tablens, en: 'body', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'covered-table-cell', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'even-columns', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'covered-table-cell', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'even-columns', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'even-rows', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'first-column', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'first-row', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'last-column', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'last-row', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'odd-columns', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'odd-rows', ans: tablens, a: 'style-name'},
                { ens: tablens, en: 'table-cell', ans: tablens, a: 'style-name'}
            ],
            "graphic": [
                { ens: dr3dns, en: 'cube', ans: drawns, a: 'style-name'},
                { ens: dr3dns, en: 'extrude', ans: drawns, a: 'style-name'},
                { ens: dr3dns, en: 'rotate', ans: drawns, a: 'style-name'},
                { ens: dr3dns, en: 'scene', ans: drawns, a: 'style-name'},
                { ens: dr3dns, en: 'sphere', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'caption', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'circle', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'connector', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'control', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'custom-shape', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'ellipse', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'frame', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'g', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'line', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'measure', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'page-thumbnail', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'path', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'polygon', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'polyline', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'rect', ans: drawns, a: 'style-name'},
                { ens: drawns, en: 'regular-polygon', ans: drawns, a: 'style-name'},
                { ens: officens, en: 'annotation', ans: drawns, a: 'style-name'}
            ],
            "presentation": [
                { ens: dr3dns, en: 'cube', ans: presentationns, a: 'style-name'},
                { ens: dr3dns, en: 'extrude', ans: presentationns, a: 'style-name'},
                { ens: dr3dns, en: 'rotate', ans: presentationns, a: 'style-name'},
                { ens: dr3dns, en: 'scene', ans: presentationns, a: 'style-name'},
                { ens: dr3dns, en: 'sphere', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'caption', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'circle', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'connector', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'control', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'custom-shape', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'ellipse', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'frame', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'g', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'line', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'measure', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'page-thumbnail', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'path', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'polygon', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'polyline', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'rect', ans: presentationns, a: 'style-name'},
                { ens: drawns, en: 'regular-polygon', ans: presentationns, a: 'style-name'},
                { ens: officens, en: 'annotation', ans: presentationns, a: 'style-name'}
            ],
            "drawing-page": [
                { ens: drawns, en: 'page', ans: drawns, a: 'style-name'},
                { ens: presentationns, en: 'notes', ans: drawns, a: 'style-name'},
                { ens: stylens, en: 'handout-master', ans: drawns, a: 'style-name'},
                { ens: stylens, en: 'master-page', ans: drawns, a: 'style-name'}
            ],
            "list-style": [
                { ens: textns, en: 'list', ans: textns, a: 'style-name'},
                { ens: textns, en: 'numbered-paragraph', ans: textns, a: 'style-name'},
                { ens: textns, en: 'list-item', ans: textns, a: 'style-override'},
                { ens: stylens, en: 'style', ans: stylens, a: 'list-style-name'},
                { ens: stylens, en: 'style', ans: stylens, a: 'data-style-name'},
                { ens: stylens, en: 'style', ans: stylens, a: 'percentage-data-style-name'},
                { ens: presentationns, en: 'date-time-decl', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'creation-date', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'creation-time', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'database-display', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'date', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'editing-duration', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'expression', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'meta-field', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'modification-date', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'modification-time', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'print-date', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'print-time', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'table-formula', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'time', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'user-defined', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'user-field-get', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'user-field-input', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'variable-get', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'variable-input', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'variable-set', ans: stylens, a: 'data-style-name'}
            ],
            "data": [
                { ens: stylens, en: 'style', ans: stylens, a: 'data-style-name'},
                { ens: stylens, en: 'style', ans: stylens, a: 'percentage-data-style-name'},
                { ens: presentationns, en: 'date-time-decl', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'creation-date', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'creation-time', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'database-display', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'date', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'editing-duration', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'expression', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'meta-field', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'modification-date', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'modification-time', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'print-date', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'print-time', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'table-formula', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'time', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'user-defined', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'user-field-get', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'user-field-input', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'variable-get', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'variable-input', ans: stylens, a: 'data-style-name'},
                { ens: textns, en: 'variable-set', ans: stylens, a: 'data-style-name'}
            ],
            "page-layout": [
                { ens: presentationns, en: 'notes', ans: stylens, a: 'page-layout-name'},
                { ens: stylens, en: 'handout-master', ans: stylens, a: 'page-layout-name'},
                { ens: stylens, en: 'master-page', ans: stylens, a: 'page-layout-name'}
            ]
        },
        /**
         * Inversion of elementstyles, created with "inverse(elementstyles);" in init section
         * Map with element name as primary key, element namespace as secondary key,
         * then an array of {ns: namespace of attribute, localname: name of attribute, keyname: keyname});
         * @type {!Object.<string,Object.<string,Array.<Object.<string,string>>>>}
         */
        elements,
        xpath = new xmldom.XPath();

    /**
     * Return if a particular element is the parent style for any other style of the same family.
     * @param {!Element} odfbody
     * @param {!Function} nsResolver
     * @param {!Node} styleElement
     * @return {boolean}
     */
    function hasDerivedStyles(odfbody, nsResolver, styleElement) {
        var nodes,
            xp,
            stylens = nsResolver('style'),
            styleName = styleElement.getAttributeNS(stylens, 'name'),
            styleFamily = styleElement.getAttributeNS(stylens, 'family');

        xp = "//style:*[@style:parent-style-name='" + styleName + "'][@style:family='" + styleFamily + "']";
        nodes = xpath.getODFElementsWithXPath(odfbody, xp, nsResolver);
        if (nodes.length) {
            return true;
        }
        return false;
    }

    /**
     * Return if a particular element can have a style for a particular family.
     * @param {!string} family
     * @param {!Element} element
     * @return {!boolean}
     */
    function canElementHaveStyle(family, element) {
        var elname = elements[element.localName],
            elns = elname && elname[element.namespaceURI],
            length = elns ? elns.length : 0,
            i;
        return length > 0;
    }

    /**
     * @param {!string} family
     * @param {!Element} element
     * @return {{name:string,family:string}|null}
     */
    function getStyleRef(family, element) {
        var elname = elements[element.localName],
            elns = elname && elname[element.namespaceURI],
            length = elns ? elns.length : 0,
            i, attr;
        for (i = 0; i < length; i += 1) {
            attr = element.getAttributeNS(elns[i].ns, elns[i].localname);
/*
            if (attr) { // a style has been found!
                return attr;
            }
*/
        }
        return null;
    }

    /**
     * Prefixes all style ids used to refer to styles in the given DOM element
     * tree with the given prefix.
     * @param {!Element} styleUsingElementsRoot  root element of tree of elements using styles
     * @param {!string} prefix
     * @return {undefined}
     */
    function prefixUsedStyleNames(styleUsingElementsRoot, prefix) {
        var elname = elements[styleUsingElementsRoot.localName],
            elns = elname && elname[styleUsingElementsRoot.namespaceURI],
            length = elns ? elns.length : 0,
            i, stylename, e;
        // prefix any used style ids
        for (i = 0; i < length; i += 1) {
            stylename = styleUsingElementsRoot.getAttributeNS(elns[i].ns, elns[i].localname);
            if (stylename) { // a style reference has been found!
                styleUsingElementsRoot.setAttributeNS(elns[i].ns, nsprefixes[elns[i].ns]+elns[i].localname, prefix+stylename);
            }
        }
        // continue prefixing with all child elements
        i = styleUsingElementsRoot.firstChild;
        while (i) {
            if (i.nodeType === 1) {
                e = /**@type{!Element}*/(i);
                prefixUsedStyleNames(e, prefix);
            }
            i = i.nextSibling;
        }
    }
    /**
     * Prefixes the id of the style defined in the given DOM element with the
     * given prefix.
     * @param {!Element} styleElement
     * @param {!string} prefix
     * @return {undefined}
     */
    function prefixStyleName(styleElement, prefix) {
        var stylename = styleElement.getAttributeNS(drawns, "name"),
            ns;
        if (stylename) {
            ns = drawns;
        } else {
            stylename = styleElement.getAttributeNS(stylens, "name");
            if (stylename) {
                ns = stylens;
            }
        }

        if (ns) {
            styleElement.setAttributeNS(ns, nsprefixes[ns]+"name", prefix+stylename);
        }
    }

    /**
     * Prefixes all style ids with the given prefix. This will affect all style
     * ids as set in the style definitions by the child elements of
     * styleElementsRoot and all style ids used to refer to styles, both in
     * these style definitions and in the given DOM element tree
     * styleUsingElementsRoot.
     * @param {?Element} styleElementsRoot  root element with styles nodes as childs
     * @param {!string} prefix
     * @param {?Element} styleUsingElementsRoot  root element of tree of elements using styles
     */
    function prefixStyleNames(styleElementsRoot, prefix, styleUsingElementsRoot) {
        var s;
        if (styleElementsRoot) {
            // prefix all set style ids
            s = styleElementsRoot.firstChild;
            while (s) {
                if (s.nodeType === 1) {
                    prefixStyleName(/**@type{!Element}*/(s), prefix);
                }
                s = s.nextSibling;
            }
            // prefix all ids in style references
            prefixUsedStyleNames(styleElementsRoot, prefix);
            if (styleUsingElementsRoot) {
                prefixUsedStyleNames(styleUsingElementsRoot, prefix);
            }
        }
    }

    /**
     * @param {!Element} styleUsingElementsRoot  root element of tree of elements using styles
     * @param {!RegExp} regExp
     * @return {undefined}
     */
    function removeRegExpFromUsedStyleNames(styleUsingElementsRoot, regExp) {
        var elname = elements[styleUsingElementsRoot.localName],
            elns = elname && elname[styleUsingElementsRoot.namespaceURI],
            length = elns ? elns.length : 0,
            i, stylename, e;
        // remove prefix from any used style id
        for (i = 0; i < length; i += 1) {
            stylename = styleUsingElementsRoot.getAttributeNS(elns[i].ns, elns[i].localname);
            if (stylename) { // a style reference has been found!
                stylename = stylename.replace(regExp, '');
                styleUsingElementsRoot.setAttributeNS(elns[i].ns, nsprefixes[elns[i].ns]+elns[i].localname, stylename);
            }
        }
        // continue removal with all child elements
        i = styleUsingElementsRoot.firstChild;
        while (i) {
            if (i.nodeType === 1) {
                e = /**@type{!Element}*/(i);
                removeRegExpFromUsedStyleNames(e, regExp);
            }
            i = i.nextSibling;
        }
    }
    /**
     * Remove the given regular expression from the id of the style defined in
     * the given DOM element.
     * @param {!Element} styleElement
     * @param {!RegExp} regExp
     * @return {undefined}
     */
    function removeRegExpFromStyleName(styleElement, regExp) {
        var stylename = styleElement.getAttributeNS(drawns, "name"),
            ns;
        if (stylename) {
            ns = drawns;
        } else {
            stylename = styleElement.getAttributeNS(stylens, "name");
            if (stylename) {
                ns = stylens;
            }
        }

        if (ns) {
            stylename = stylename.replace(regExp, '');
            styleElement.setAttributeNS(ns, nsprefixes[ns]+"name", stylename);
        }
    }

    /**
     * Removes the given prefix from all style ids. This will affect all style
     * ids as set in the style definitions by the child elements of
     * styleElementsRoot and all style ids used to refer to styles, both in
     * these style definitions and in the given DOM element tree
     * styleUsingElementsRoot.
     * @param {?Element} styleElementsRoot root element with styles nodes as childs
     * @param {!string} prefix
     * @param {?Element} styleUsingElementsRoot  root element of tree of elements using styles
     */
    function removePrefixFromStyleNames(styleElementsRoot, prefix, styleUsingElementsRoot) {
        var s,
            regExp = new RegExp("^"+prefix);

        if (styleElementsRoot) {
            // remove prefix from all set style ids
            s = styleElementsRoot.firstChild;
            while (s) {
                if (s.nodeType === 1) {
                    removeRegExpFromStyleName(/**@type{!Element}*/(s), regExp);
                }
                s = s.nextSibling;
            }
            // remove prefix from all ids in style references
            removeRegExpFromUsedStyleNames(styleElementsRoot, regExp);
            if (styleUsingElementsRoot) {
                removeRegExpFromUsedStyleNames(styleUsingElementsRoot, regExp);
            }
        }
    }

    /**
     * Determines all stylenames that are referenced in the passed element tree
     * @param {!Element} styleUsingElementsRoot  root element of tree of elements using styles
     * @param {!Object.<string,Object.<string,number>>} usedStyles  map of used stylesnames, grouped by keyname
     * @return {undefined}
     */
    function determineUsedStyles(styleUsingElementsRoot, usedStyles) {
        var elname = elements[styleUsingElementsRoot.localName],
            elns = elname && elname[styleUsingElementsRoot.namespaceURI],
            length = elns ? elns.length : 0,
            i, stylename, keyname, map, e;
        // check if any styles are referenced
        for (i = 0; i < length; i += 1) {
            stylename = styleUsingElementsRoot.getAttributeNS(elns[i].ns, elns[i].localname);
            if (stylename) { // a style has been found!
                keyname = elns[i].keyname;
                map = usedStyles[keyname] = usedStyles[keyname] || {};
                map[stylename] = 1;
            }
        }
        // continue determination with all child elements
        i = styleUsingElementsRoot.firstChild;
        while (i) {
            if (i.nodeType === 1) {
                e = /**@type{!Element}*/(i);
                determineUsedStyles(e, usedStyles);
            }
            i = i.nextSibling;
        }
    }

    /**
     * Creates the elements data from the elementstyles data.
     * @param {!Object.<Array.<Object.<string,string>>>} elementstyles
     * @return {!Object.<string,Object.<string,Array.<Object.<string,string>>>>}
     */
    function inverse(elementstyles) {
        var keyname, i, l,
            /**@type {Array.<Object.<string,string>>}*/list,
            /**@type {Object.<string,string>}*/item,
            /**@type {!Object.<string,Object.<string,Array.<Object.<string,string>>>>}*/elements = {},
            map, array;
        for (keyname in elementstyles) {
            if (elementstyles.hasOwnProperty(keyname)) {
                list = elementstyles[keyname];
                l = list.length;
                for (i = 0; i < l; i += 1) {
                    item = list[i];
                    map = elements[item.en] = elements[item.en] || {};
                    array = map[item.ens] = map[item.ens] || [];
                    array.push(
                        {ns: item.ans, localname: item.a, keyname: keyname});
                }
            }
        }
        return elements;
    }

    /**
     * Object which collects all style names that are used in the passed element tree
     * @constructor
     * @param {!Element} styleUsingElementsRoot  root element of tree of elements using styles
     */
    this.UsedStyleList = function (styleUsingElementsRoot) {
        // usedStyles stores all style names used in the passed element tree.
        // As styles from different types can have the same names,
        // all styles are grouped by:
        // * family attribute for style:style
        // * "data" for all number:* (boolean-style,currency-style,date-style,
        //   number-style,percentage-style,text-style,time-style)
        // * localName for text:list-style, style:page-layout
        var /** @type !Object.<string,Object.<string,number>> */usedStyles = {};

        /**
         * Checks whether the passed style is referenced by anything
         * @param {!Element} element  odf style describing element
         * @return {!boolean}
         */
        this.uses = function (element) {
            var localName = element.localName,
                name = element.getAttributeNS(drawns, "name") ||
                        element.getAttributeNS(stylens, "name"),
                keyName, map;
            if (localName === "style") {
                keyName = element.getAttributeNS(stylens, "family");
            } else if (element.namespaceURI === numberns) {
                keyName = "data";
            } else {
                keyName = localName; // list-style or page-layout
            }
            map = usedStyles[keyName];
            return map ? (map[name] > 0) : false;
        };

        determineUsedStyles(styleUsingElementsRoot, usedStyles);
    };

    this.canElementHaveStyle = canElementHaveStyle;
    this.hasDerivedStyles = hasDerivedStyles;
    this.prefixStyleNames = prefixStyleNames;
    this.removePrefixFromStyleNames = removePrefixFromStyleNames;


    // init
    elements = inverse(elementstyles);
};
