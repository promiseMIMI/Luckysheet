import locale from '../locale/locale';
import luckysheetConfigsetting from './luckysheetConfigsetting';

import { getObjType, camel2split } from '../utils/util';
import { createUnfoldToolbarHtml } from './toolbarUnfold'
import Store from '../store';

// 默认的工具栏按钮
export const defaultToolbar = [
    'undo',
    'redo',
    'paintFormat',
    '|',

    'font',
    'fontSize',
    'textColor',
    'fillColor',
    'bold',
    'strikethrough',
    'italic',
    'underline',
    '|',

    'border',
    'mergeCell',
    '|',
    
    'textRotateMode',
    'horizontalAlignMode',
    'verticalAlignMode',
    'textWrapMode',
    '|',

    'moreFormats',
    'currencyFormat',
    'percentageFormat',
    'numberDecrease',
    'numberIncrease',
    '|',

    'image',
    'link',
    'chart',
    'postil',
    'pivotTable',
    'function',
    '|',

    'frozenMode',
    'sortAndFilter',
    'conditionalFormat',
    'dataVerification',
    'splitColumn',
    'screenshot',
    'findAndReplace',
    'protection',
    'print',
    '|',
    
    'fullScreen',
    'exitFullScreen',
    'eraser',
    'saveData',
];

// 工具栏按钮 id 关系
export const toolbarIdMap = {
    undo: '#luckysheet-icon-undo', //Undo redo
    redo: '#luckysheet-icon-redo',
    paintFormat: ['#luckysheet-icon-paintformat'], //Format brush
    currencyFormat: '#luckysheet-icon-currency', //currency format
    percentageFormat: '#luckysheet-icon-percent', //Percentage format
    numberDecrease: '#luckysheet-icon-fmt-decimal-decrease', //'Decrease the number of decimal places'
    numberIncrease: '#luckysheet-icon-fmt-decimal-increase', //'Increase the number of decimal places
    moreFormats: '#luckysheet-icon-fmt-other', //'More Formats'
    font: '#luckysheet-icon-font-family', //'font'
    fontSize: '#luckysheet-icon-font-size', //'Font size'
    bold: '#luckysheet-icon-bold', //'Bold (Ctrl+B)'
    italic: '#luckysheet-icon-italic', //'Italic (Ctrl+I)'
    strikethrough: '#luckysheet-icon-strikethrough', //'Strikethrough (Alt+Shift+5)'
    underline: '#luckysheet-icon-underline', //'Underline (Alt+Shift+6)'
    textColor: ['#luckysheet-icon-text-color', '#luckysheet-icon-text-color-menu'], //'Text color'
    fillColor: ['#luckysheet-icon-cell-color', '#luckysheet-icon-cell-color-menu'], //'Cell color'
    border: ['#luckysheet-icon-border-all', '#luckysheet-icon-border-menu'], //'border'
    mergeCell: ['#luckysheet-icon-merge-button', '#luckysheet-icon-merge-menu'], //'Merge cells'
    horizontalAlignMode: ['#luckysheet-icon-align', '#luckysheet-icon-align-menu'], //'Horizontal alignment'
    verticalAlignMode: ['#luckysheet-icon-valign', '#luckysheet-icon-valign-menu'], //'Vertical alignment'
    textWrapMode: ['#luckysheet-icon-textwrap', '#luckysheet-icon-textwrap-menu'], //'Wrap mode'
    textRotateMode: ['#luckysheet-icon-rotation', '#luckysheet-icon-rotation-menu'], //'Text Rotation Mode'
    image: '#luckysheet-insertImg-btn-title', //'Insert link'
    link: '#luckysheet-insertLink-btn-title', //'Insert picture'
    chart: '#luckysheet-chart-btn-title', //'chart' (the icon is hidden, but if the chart plugin is configured, you can still create a new chart by right click)
    postil: '#luckysheet-icon-postil', //'comment'
    pivotTable: ['#luckysheet-pivot-btn-title'], //'PivotTable'
    function: ['#luckysheet-icon-function', '#luckysheet-icon-function-menu'], //'formula'
    frozenMode: ['#luckysheet-freezen-btn-horizontal', '#luckysheet-icon-freezen-menu'], //'freeze mode'
    sortAndFilter: '#luckysheet-icon-autofilter', //'sort and filter'
    conditionalFormat: '#luckysheet-icon-conditionformat', //'Conditional Format'
    dataVerification: '#luckysheet-dataVerification-btn-title', // 'Data Verification'
    splitColumn: '#luckysheet-splitColumn-btn-title', //'Split column'
    screenshot: '#luckysheet-chart-btn-screenshot', //'screenshot'
    findAndReplace: '#luckysheet-icon-seachmore', //'Find and Replace'
    protection: '#luckysheet-icon-protection', // 'Worksheet protection'
    print: '#luckysheet-icon-print', // 'print'
    fullScreen: '#luckysheet-icon-fullscreen',
    exitFullScreen: '#luckysheet-icon-exit-fullscreen',
    eraser: '#luckysheet-icon-eraser',
    saveData: '#luckysheet-icon-save-data',
};

// 创建工具栏按钮的html
export function createToolbarHtml() {
    const toolbar = locale().toolbar;
    const fontarray = locale().fontarray;
    const defaultFmtArray = locale().defaultFmt;
    const htmlMap = {
        undo: `<div class="luckysheet-toolbar-button luckysheet-inline-block disabled" data-tips="${toolbar.undo}"
        id="luckysheet-icon-undo" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-undo newfont ly-chexiao"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
        </div>`,
        redo: `<div class="luckysheet-toolbar-button luckysheet-inline-block disabled" data-tips="${toolbar.redo}"
        id="luckysheet-icon-redo" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-redo newfont ly-huifu"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
        </div>`,
        paintFormat: `<div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="${toolbar.paintFormat}"
        id="luckysheet-icon-paintformat" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img newfont ly-geshishua"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
        </div>`,
        currencyFormat: `<div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="${toolbar.currencyFormat}"
        id="luckysheet-icon-currency" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img newfont ly-huobigeshi"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
        percentageFormat: `<div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="${toolbar.percentageFormat}"
        id="luckysheet-icon-percent" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img newfont ly-baifenbigeshi"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>`, //Percentage format
        numberDecrease: `<div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="${toolbar.numberDecrease}"
        id="luckysheet-icon-fmt-decimal-decrease" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block toolbar-decimal-icon"
                    style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-decimal-decrease iconfont luckysheet-iconfont-jianxiaoxiaoshuwei"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>`, //'Decrease the number of decimal places'
        numberIncrease: `<div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="${toolbar.numberIncrease}"
        id="luckysheet-icon-fmt-decimal-increase" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block toolbar-decimal-icon"
                    style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-decimal-increase iconfont luckysheet-iconfont-zengjiaxiaoshuwei"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>`, //'Increase the number of decimal places
        moreFormats: `<div class="luckysheet-toolbar-select luckysheet-toolbar-menu-button luckysheet-inline-block" data-tips="${toolbar.moreFormats}"
        id="luckysheet-icon-fmt-other" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        ${defaultFmtArray[0].text}
                    </div>
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
        </div>`, //'More Formats'
        font: `<div class="luckysheet-toolbar-select luckysheet-toolbar-menu-button luckysheet-inline-block"
        data-tips="${toolbar.font}" id="luckysheet-icon-font-family" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        ${fontarray[0]}
                    </div>
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
        </div>`, //'font'
        fontSize: `<div class="luckysheet-toolbar-select luckysheet-toolbar-zoom-combobox luckysheet-toolbar-combo-button luckysheet-inline-block"
        data-tips="${toolbar.fontSize}" id="luckysheet-icon-font-size" style="user-select: none;">
            <div class="luckysheet-toolbar-combo-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-combo-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div aria-posinset="4" aria-setsize="7" class="luckysheet-inline-block luckysheet-toolbar-combo-button-caption"
                    style="user-select: none;">
                        <input aria-label="${toolbar.fontSize}" class="luckysheet-toolbar-combo-button-input luckysheet-toolbar-textinput"
                        role="combobox" style="user-select: none;" tabindex="-1" type="text" value="10"
                        />
                    </div>
                    <div class="luckysheet-toolbar-combo-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
        </div>`, //'Font size'
        bold: `<div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="${toolbar.bold}"
        id="luckysheet-icon-bold" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-bold newfont ly-jiacu"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>`, //'Bold (Ctrl+B)'
        italic: `<div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="${toolbar.italic}"
        id="luckysheet-icon-italic" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-italic newfont ly-xieti"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>`, //'Italic (Ctrl+I)'
        strikethrough: `<div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="${toolbar.strikethrough}"
        id="luckysheet-icon-strikethrough" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-strikethrough newfont ly-shanchuxian"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>`, //'Strikethrough (Alt+Shift+5)'
        underline: `<div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="${toolbar.underline}"
        id="luckysheet-icon-underline" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-underline newfont ly-xiahuaxian"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>`, //'Underline (Alt+Shift+6)'
        textColor: `<div><div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block luckysheet-icon-text-color"
        data-tips="${toolbar.textColor}" id="luckysheet-icon-text-color" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-color-menu-button-indicator" style="border-bottom-color: rgb(0, 0, 0); user-select: none;">
                            <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                                <div aria-hidden="true" style="color:${luckysheetConfigsetting.defaultTextColor}" class="text-color-bar luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-text-color newfont ly-wenziyanse"
                                style="user-select: none;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="luckysheet-toolbar-button-split-right luckysheet-toolbar-menu-button luckysheet-inline-block"
        data-tips="${toolbar.chooseColor}..." id="luckysheet-icon-text-color-menu" role="button"
        style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
        </div></div>`, //'Text color'
        fillColor: `<div><div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block luckysheet-icon-cell-color"
        data-tips="${toolbar.fillColor}" id="luckysheet-icon-cell-color" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-color-menu-button-indicator" style="border-bottom-color: rgb(255, 255, 255); user-select: none;">
                            <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                                <div aria-hidden="true" style="color:${luckysheetConfigsetting.defaultCellColor}" class="text-color-bar luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-cell-color newfont ly-beijingyanse"
                                style="user-select: none;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="luckysheet-toolbar-button-split-right luckysheet-toolbar-menu-button luckysheet-inline-block"
        data-tips="${toolbar.chooseColor}..." id="luckysheet-icon-cell-color-menu" role="button"
        style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
        </div></div>`, //'Cell color'
        border: `<div><div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block luckysheet-icon-border-all"
        data-tips="${toolbar.border}" id="luckysheet-icon-border-all" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-border-all newfont ly-biankuang"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="luckysheet-toolbar-button-split-right luckysheet-toolbar-menu-button luckysheet-inline-block"
        data-tips="${toolbar.borderStyle}..." id="luckysheet-icon-border-menu" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
        </div></div>`, //'border'
        mergeCell: `<div><div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block luckysheet-icon-merge-button"
        data-tips="${toolbar.mergeCell}" id="luckysheet-icon-merge-button" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-merge newfont ly-hebingdanyuange"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="luckysheet-toolbar-button-split-right luckysheet-toolbar-menu-button luckysheet-inline-block"
        data-tips="${toolbar.chooseMergeType}..." id="luckysheet-icon-merge-menu" role="button" style="user-select: none;">
            <!-- tips-slot-start -->
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
            <!-- tips-slot-end -->
        </div></div>`, //'Merge cells'
        horizontalAlignMode: `<div><div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block luckysheet-icon-align"
        data-tips="${toolbar.horizontalAlign}" id="luckysheet-icon-align" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-align-left newfont ly-zuoduiqi"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="luckysheet-toolbar-button-split-right luckysheet-toolbar-menu-button luckysheet-inline-block"
        data-tips="${toolbar.alignment}..." id="luckysheet-icon-align-menu" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
        </div></div>`, //'Horizontal alignment'
        verticalAlignMode: `<div><div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block luckysheet-icon-valign"
        data-tips="${toolbar.verticalAlign}" id="luckysheet-icon-valign" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-valign-bottom newfont ly-diduanduiqi"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="luckysheet-toolbar-button-split-right luckysheet-toolbar-menu-button luckysheet-inline-block"
        data-tips="${toolbar.alignment}..." id="luckysheet-icon-valign-menu" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
        </div></div>`, //'Vertical alignment'
        textWrapMode: `<div><div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block luckysheet-icon-textwrap"
        data-tips="${toolbar.textWrap}" id="luckysheet-icon-textwrap" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-textwrap-clip newfont ly-jieduan"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="luckysheet-toolbar-button-split-right luckysheet-toolbar-menu-button luckysheet-inline-block"
        data-tips="${toolbar.textWrapMode}..." id="luckysheet-icon-textwrap-menu" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
        </div></div>`, //'Wrap mode'
        textRotateMode: `<div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block luckysheet-icon-rotation"
        data-tips="${toolbar.textRotate}" id="luckysheet-icon-rotation" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none iconfont luckysheet-iconfont-wuxuanzhuang"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="luckysheet-toolbar-button-split-right luckysheet-toolbar-menu-button luckysheet-inline-block"
        data-tips="${toolbar.textRotateMode}..." id="luckysheet-icon-rotation-menu" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
        </div>`, //'Text Rotation Mode'
        image: `<div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block"
        data-tips="${toolbar.insertImage}" id="luckysheet-insertImg-btn-title" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none newfont ly-image-outlined"
                            style="user-select: none;">
                                <input id="luckysheet-imgUpload" type="file" accept="image/*" style="display:none;"></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
        </div>`, // 'Insert picture'
        link: `<div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block"
        data-tips="${toolbar.insertLink}" id="luckysheet-insertLink-btn-title" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none newfont ly-chaolianjie"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
        </div>`, // 'Insert link'(TODO)
        chart: `<div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block"
        data-tips="${toolbar.chart}" id="luckysheet-chart-btn-title" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none iconfont luckysheet-iconfont-tubiao"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`, //'chart' (the icon is hidden, but if the chart plugin is configured, you can still create a new chart by right click)
        postil: `<div class="luckysheet-toolbar-select luckysheet-toolbar-menu-button luckysheet-inline-block" data-tips="${toolbar.postil}"
        id="luckysheet-icon-postil" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon-img-container luckysheet-toolbar-menu-button-caption luckysheet-inline-block iconfont luckysheet-iconfont-zhushi"
                    style="user-select: none;">
                    </div>
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
        </div>`, //'comment'
        pivotTable: `<div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block"
        data-tips="${toolbar.pivotTable}" id="luckysheet-pivot-btn-title" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none newfont ly-toushibiao"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
        </div>`, //'PivotTable'
        function: `<div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block"><div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block luckysheet-icon-function"
            data-tips="${toolbar.autoSum}" id="luckysheet-icon-function" role="button" style="user-select: none;">
                <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-function newfont ly-gongshi"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="luckysheet-toolbar-button-split-right luckysheet-toolbar-menu-button luckysheet-inline-block"
            data-tips="${toolbar.moreFunction}..." id="luckysheet-icon-function-menu" role="button" style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
        </div>`, //'formula'
        frozenMode: `<div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block"><div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block luckysheet-freezen-btn-horizontal"
            data-tips="${toolbar.freezeTopRow}" id="luckysheet-freezen-btn-horizontal" role="button" style="user-select: none;">
                <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none newfont ly-donjiediyihang"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="luckysheet-toolbar-button-split-right luckysheet-toolbar-menu-button luckysheet-inline-block"
            data-tips="${toolbar.moreOptions}..." id="luckysheet-icon-freezen-menu" role="button" style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
        </div>`, //'freeze mode'
        sortAndFilter: `<div id="luckysheet-icon-autofilter" style="display: inline-block;"><div class="luckysheet-toolbar-select luckysheet-toolbar-menu-button luckysheet-inline-block" data-tips="${toolbar.sortAndFilter}"
        role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-autofilter newfont ly-shaixuan"
                        style="user-select: none;">
                        </div>
                    </div>
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;margin-left: 0px;margin-right: 4px;">
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
          </div>
        </div>`, //'Sort and filter'
        conditionalFormat: `<div id="luckysheet-icon-conditionformat" style="display: inline-block;"><div class="luckysheet-toolbar-select luckysheet-toolbar-menu-button luckysheet-inline-block" data-tips="${toolbar.conditionalFormat}"
        role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">

                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-autofilter newfont ly-tiaojiangeshi"
                        style="user-select: none;">
                        </div>
                    </div>
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
          </div>
        </div>`, //'Conditional Format'
        dataVerification: `<div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block"
        data-tips="${toolbar.dataVerification}" id="luckysheet-dataVerification-btn-title" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none newfont ly-shujuyanzheng"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
        </div>`, // 'Data Verification'
        splitColumn: `<div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block"
        data-tips="${toolbar.splitColumn}" id="luckysheet-splitColumn-btn-title" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none newfont ly-fenlie"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
        </div>`, //'Split column'
        screenshot: `<div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block"
        data-tips="${toolbar.screenshot}" id="luckysheet-chart-btn-screenshot" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none iconfont luckysheet-iconfont-jieping"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`, //'screenshot'
        findAndReplace: `<div id="luckysheet-icon-seachmore" style="display: inline-block;"><div class="luckysheet-toolbar-select luckysheet-toolbar-menu-button luckysheet-inline-block" data-tips="${toolbar.findAndReplace}"
         role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">

                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-autofilter newfont ly-chazhao"
                        style="user-select: none;">
                        </div>
                    </div>
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;margin-left: 0px;margin-right: 4px;">
                    </div>
                </div>
            </div>
            <!-- tips-slot -->
        </div></div>`, //'Find and Replace'
        protection: `<div class="luckysheet-toolbar-button-split-left luckysheet-toolbar-button luckysheet-inline-block"
        data-tips="${toolbar.protection}" id="luckysheet-icon-protection" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-menu-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none iconfont luckysheet-iconfont-biaogesuoding"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`, // 'Worksheet protection'
        print: `<div class="luckysheet-toolbar-select luckysheet-toolbar-menu-button luckysheet-inline-block" data-tips="${toolbar.print}"
        id="luckysheet-icon-print" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">

                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-autofilter iconfont luckysheet-iconfont-dayin"
                        style="user-select: none;">
                        </div>
                    </div>
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige"
                    style="user-select: none;margin-left: 0px;margin-right: 4px;">
                    </div>
                </div>
            </div>
        </div>`, // 'print'
        fullScreen: `<div class="luckysheet-toolbar-select luckysheet-toolbar-menu-button luckysheet-inline-block" data-tips="全屏"
        id="luckysheet-icon-fullscreen" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img newfont ly-quanping"
                        style="user-select: none;">
                        </div>
                    </div>
                </div>
            </div>
        </div>`, // 'print'
        exitFullScreen: `<div class="luckysheet-toolbar-select luckysheet-toolbar-menu-button luckysheet-inline-block"
        id="luckysheet-icon-exit-fullscreen" role="button" style="user-select: none;">
            <div aria-hidden="true" id="toolbar-unfold" class="luckysheet-icon-img-container luckysheet-icon-img newfont ly-xia"
            style="user-select: none;">
            </div>
            <div aria-hidden="true" id="toolbar-collapse" style="display: none;" class="luckysheet-icon-img-container luckysheet-icon-img newfont ly-shang"
            style="user-select: none;">
            </div>
           <div class="btn-exit">
                <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                    style="user-select: none;">
                        <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                            <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img newfont ly-tuichuquanping"
                            style="user-select: none;">
                            </div>
                        </div>
                    </div>
                </div>
                <span style="">退出</span>
           </div>
        </div>`, // 'print'
        eraser: `<div class="luckysheet-toolbar-select luckysheet-toolbar-menu-button luckysheet-inline-block" data-tips="清除格式"
        id="luckysheet-icon-eraser" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        清除
                    </div>
                </div>
            </div>
        </div>`, // 'print'
        saveData: `<div class="luckysheet-toolbar-select luckysheet-toolbar-menu-button luckysheet-inline-block" data-tips="保存数据"
        id="luckysheet-icon-save-data" role="button" style="user-select: none;">
            <div class="luckysheet-toolbar-menu-button-outer-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
                style="user-select: none;">
                    <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                        保存
                    </div>
                </div>
            </div>
        </div>`, // 'save'
    };
    if(Store.toolbarUnfold) return createUnfoldToolbarHtml(htmlMap)
    const showtoolbar = luckysheetConfigsetting.showtoolbar;
    const showtoolbarConfig = luckysheetConfigsetting.showtoolbarConfig;

    const buttonHTML = ['<div class="luckysheet-toolbar-left-theme"></div>'];

    // 数组形式直接生成
    if (getObjType(showtoolbarConfig) === 'array') {
        // 此时不根据 showtoolbar=false，showtoolbarConfig为某几个进行适配，此时showtoolbarConfig本身就是全部要显示的按钮
        if (!showtoolbar) {
            return '';
        }
        let i = 0;
        showtoolbarConfig.forEach(function(key, i) {
            if (key === '|') {
                const nameKeys = showtoolbarConfig[i - 1]
                if(nameKeys !== '|') {
                    buttonHTML.push(
                        `<div id="toolbar-separator-${camel2split(nameKeys)}" class="luckysheet-toolbar-separator luckysheet-inline-block" style="user-select: none;"></div>`
                        );
                }
            } else {
                buttonHTML.push(htmlMap[key]);
            }
        });
        return buttonHTML.join('');
    }

    const config = defaultToolbar.reduce(function(total, curr) {
        if (curr !== '|') {
            total[curr] = true;
        }
        return total;
    }, {});

    if (!showtoolbar) {
        for (let s in config) {
            config[s] = false;
        }
    }

    // 对象模式 则从里面挑选 true 保留 false 删掉
    if (JSON.stringify(showtoolbarConfig) !== '{}') {
        if(showtoolbarConfig.hasOwnProperty('undoRedo')){
            config.undo = config.redo = showtoolbarConfig.undoRedo;
        }
        Object.assign(config, showtoolbarConfig);
    }
    for (let i = 0; i < defaultToolbar.length; i++) {
        let key = defaultToolbar[i];
        if (!config[key] && key !== '|') continue;
        if (key === '|') {
            if(buttonHTML[buttonHTML.length - 1].includes('<div id="toolbar-separator-') || buttonHTML.length === 1) continue;
            const nameKeys = defaultToolbar[i - 1]
            if(nameKeys !== '|') {
                buttonHTML.push(
                    `<div id="toolbar-separator-${camel2split(nameKeys)}" class="luckysheet-toolbar-separator luckysheet-inline-block" style="user-select: none;"></div>`
                );
            }
        } else {
            buttonHTML.push(htmlMap[key]);
        }
    }
    return buttonHTML.join('');
}
