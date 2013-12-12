/*global module, config*/

/**
 * Configuration for running tests in PhantomJS with Karma.
 *
 * To run these tests, install karma with
 *     npm install karma-coverage karma-junit-reporter
 * Then run 'node ../node_modules/.bin/karma start tools/karma.conf.js' from
 * the directory 'webodf' that contains the 'tools' directory.
 * This results in a folder called 'coverage' with the coverage information of
 * the tests.
 */

module.exports = function (config) {
    "use strict";
    config.set({
        basePath: '..',
        autoWatch: true,
        frameworks: ['webodf'],
        files: [
            'lib/runtime.js',
            'lib/core/Async.js',
            'lib/core/Base64.js',
            'lib/core/ByteArray.js',
            'lib/core/ByteArrayWriter.js',
            'lib/core/CSSUnits.js',
            'lib/core/DomUtils.js',
            'lib/core/EventNotifier.js',
            'lib/core/LoopWatchDog.js',
            'lib/core/PositionIterator.js',
            'lib/core/RawInflate.js',
            'lib/core/ScheduledTask.js',
            'lib/core/UnitTester.js',
            'lib/core/Utils.js',
            'lib/core/Zip.js',
            'lib/gui/Avatar.js',
            'lib/gui/EditInfoHandle.js',
            'lib/gui/KeyboardHandler.js',
            'lib/odf/Namespaces.js',
            'lib/odf/OdfUtils.js',
            'lib/ops/Server.js',
            'lib/xmldom/LSSerializerFilter.js',
            'lib/xmldom/XPath.js',
            'lib/core/Cursor.js',
            'lib/core/PositionFilter.js',
            'lib/core/PositionFilterChain.js',
            'lib/gui/AnnotationViewManager.js',
            'lib/gui/SelectionMover.js',
            'lib/odf/OdfNodeFilter.js',
            'lib/odf/Style2CSS.js',
            'lib/odf/StyleInfo.js',
            'lib/odf/TextSerializer.js',
            'lib/ops/TextPositionFilter.js',
            'lib/xmldom/LSSerializer.js',
            'lib/gui/Clipboard.js',
            'lib/odf/OdfContainer.js',
            'lib/odf/FontLoader.js',
            'lib/odf/ObjectNameGenerator.js',
            'lib/odf/Formatting.js',
            'lib/odf/OdfCanvas.js',
            'lib/odf/TextStyleApplicator.js',
            'lib/gui/StyleHelper.js',
            'lib/core/RawDeflate.js',
            'lib/gui/ImageSelector.js',
            'lib/odf/CommandLineTools.js',
            'lib/ops/Member.js',
            'lib/ops/StepsTranslator.js',
            'lib/xmldom/RelaxNGParser.js',
            'lib/ops/OdtCursor.js',
            'lib/ops/OdtDocument.js',
            'lib/ops/Operation.js',
            'lib/xmldom/RelaxNG.js',
            'lib/xmldom/RelaxNG2.js',
            'lib/gui/Caret.js',
            'lib/gui/EventManager.js',
            'lib/gui/ShadowCursor.js',
            'lib/gui/UndoManager.js',
            'lib/gui/UndoStateRules.js',
            'lib/ops/EditInfo.js',
            'lib/ops/OpAddAnnotation.js',
            'lib/ops/OpAddCursor.js',
            'lib/ops/OpAddMember.js',
            'lib/ops/OpAddStyle.js',
            'lib/ops/OpApplyDirectStyling.js',
            'lib/ops/OpInsertImage.js',
            'lib/ops/OpInsertTable.js',
            'lib/ops/OpInsertText.js',
            'lib/ops/OpMoveCursor.js',
            'lib/ops/OpRemoveAnnotation.js',
            'lib/ops/OpRemoveBlob.js',
            'lib/ops/OpRemoveCursor.js',
            'lib/ops/OpRemoveMember.js',
            'lib/ops/OpRemoveStyle.js',
            'lib/ops/OpRemoveText.js',
            'lib/ops/OpSetBlob.js',
            'lib/ops/OpSetParagraphStyle.js',
            'lib/ops/OpSplitParagraph.js',
            'lib/ops/OpUpdateMember.js',
            'lib/ops/OpUpdateMetadata.js',
            'lib/ops/OpUpdateParagraphStyle.js',
            'lib/ops/OperationFactory.js',
            'lib/ops/OperationRouter.js',
            'lib/ops/OperationTransformMatrix.js',
            'lib/ops/OperationTransformer.js',
            'lib/ops/TrivialOperationRouter.js',
            'lib/gui/EditInfoMarker.js',
            'lib/gui/PlainTextPasteboard.js',
            'lib/gui/SelectionView.js',
            'lib/gui/SelectionViewManager.js',
            'lib/gui/TrivialUndoManager.js',
            'lib/ops/Session.js',
            'lib/gui/AnnotationController.js',
            'lib/gui/DirectParagraphStyler.js',
            'lib/gui/DirectTextStyler.js',
            'lib/gui/ImageManager.js',
            'lib/gui/TextManipulator.js',
            'lib/gui/SessionController.js',
            'lib/gui/CaretManager.js',
            'lib/gui/SessionView.js',
            'tests/*/*.js',
            'tests/tests.js',
            { pattern: 'lib/manifest.json', included: false, watched: false, served: true },
            { pattern: 'tests/manifest.json', included: false, watched: false, served: true },
            { pattern: 'tests/**', served: true, included: false }
        ],
        browsers: ['PhantomJS', 'Chrome', 'Firefox'],
        reporters: ['progress', 'coverage', 'junit'],
        preprocessors: {
            'lib/*.js': ['coverage'],
            'lib/*/*.js': ['coverage'],
            'tests/tests.js': ['coverage'],
            'tests/*/*.js': ['coverage']
        },
        urlRoot: '/base/',
        singleRun: true
    });
};
