import locale from '../locale/locale';
const align = locale().align;
const textWrap = locale().textWrap;
export const defaultUnfoldToolbar = [
	[
		{key: 'undo',},
		{key: 'redo',},
		{key: 'paintFormat',},
	],
	{
		top: [
			{key: 'font',},
			{key: 'fontSize',},
			{key: 'textColor',},
			{key: 'fillColor',},
		],
		bottom: [
			{key: 'bold',},
			{key: 'strikethrough',},
			{key: 'italic',},
			{key: 'underline',},
			{key: 'border',},
		]
	},
	{
		top: [
			{key: 'verticalAlignMode', unfold: true},
		],
		bottom: [
			{key: 'horizontalAlignMode', unfold: true},
		]
	},
	{
		top: [
			{key: 'textWrapMode', unfold: true},
		],
		bottom: [
			{key: 'mergeCell', showTips: true},
		]
	},
	{
		top: [
			{key: 'moreFormats'},
		],
		bottom: [
			{key: 'currencyFormat'},
			{key: 'percentageFormat'},
			{key: 'numberDecrease'},
			{key: 'numberIncrease'},
		]
	},
	[
		{key: 'image', tipKey: 'insertImage'},
		{key: 'link', tipKey: 'insertLink'},
		{key: 'pivotTable',},
		{key: 'function', tipKey: 'sum'},
	],
	[
		{key: 'frozenMode', tipKey: 'freezeTopRow'},
		{key: 'sortAndFilter',},
		{key: 'conditionalFormat',},
		{key: 'dataVerification',},
		{key: 'splitColumn',},
		{key: 'findAndReplace',},
	],
	[
		{key: 'exitFullScreen',},
	]
];

function getToolbarHtml(classes = '', id = '', tips = '', iconClass = '', data = '') {
	return `<div class="luckysheet-toolbar-button luckysheet-inline-block disabled ${classes}" data-tips="${tips}"
    id="${id}" role="button" style="user-select: none;" itemvalue="${data}">
        <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block"
        style="user-select: none;">
            <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block"
            style="user-select: none;">
                <div class="luckysheet-icon luckysheet-inline-block " style="user-select: none;">
                    <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img ${iconClass}"
                    style="user-select: none;">
                    </div>
                </div>
            </div>
        </div>
    </div>`
}

const htmlChildrenMap = {
	verticalAlignMode: {
		class: 'shk-vertical-align-mode',
		tools: [{
			classes: 'luckysheet-cols-menuitem  luckysheet-mousedown-cancel',
			id: 'luckysheet-icon-valign-top',
			tips: align.top,
			iconClass: 'newfont ly-a-dingduanduiqi',
			data: 'top',
		},
		{
			classes: 'luckysheet-cols-menuitem  luckysheet-mousedown-cancel',
			id: 'luckysheet-icon-valign-middle',
			tips: align.middle,
			iconClass: 'newfont ly-zhongbuduiqi',
			data: 'middle',
		},
		{
			classes: 'luckysheet-cols-menuitem  luckysheet-mousedown-cancel',
			id: 'luckysheet-icon-valign-bottom',
			tips: align.bottom,
			iconClass: 'newfont ly-diduanduiqi',
			data: 'bottom',
		}]
	},
	horizontalAlignMode: {
		class: 'shk-horizontal-align-mode',
		tools: [{
			classes: 'luckysheet-cols-menuitem  luckysheet-mousedown-cancel',
			id: 'luckysheet-icon-horizontal-left',
			tips: align.left,
			iconClass: 'newfont ly-zuoduiqi',
			data: 'left',
		},
		{
			classes: 'luckysheet-cols-menuitem  luckysheet-mousedown-cancel',
			id: 'luckysheet-icon-horizontal-center',
			tips: align.center,
			iconClass: 'newfont ly-juzhongduiqi',
			data: 'center',
		},
		{
			classes: 'luckysheet-cols-menuitem  luckysheet-mousedown-cancel',
			id: 'luckysheet-icon-horizontal-right',
			tips: align.right,
			iconClass: 'newfont ly-youduiqi',
			data: 'right',
		}]
	},
	textWrapMode: {
		class: 'shk-text-wrap-mode',
		tools: [{
			classes: 'luckysheet-cols-menuitem  luckysheet-mousedown-cancel',
			id: 'luckysheet-icon-textwrap-overflow',
			tips: textWrap.overflow,
			iconClass: 'newfont ly-yichu',
			data: 'overflow',
		},
		{
			classes: 'luckysheet-cols-menuitem  luckysheet-mousedown-cancel',
			id: 'luckysheet-icon-textwrap-clip',
			tips: textWrap.clip,
			iconClass: 'newfont ly-jieduan',
			data: 'clip',
		},
		{
			classes: 'luckysheet-cols-menuitem  luckysheet-mousedown-cancel',
			id: 'luckysheet-icon-textwrap-wrap',
			tips: textWrap.wrap,
			iconClass: 'newfont ly-zidonghuanhang',
			data: 'wrap',
		}]
	},
}

function getMenuListToolsHtml(key) {
	const data = htmlChildrenMap[key]
	// SHK toolbar 改造 TODO 菜单展开
	let hdiv = `<div class="${data.class}">`
	data.tools.forEach(v => {
		const { classes, id, tips, iconClass, data } = v
		hdiv += getToolbarHtml(classes, id, tips, iconClass, data)
	})
	hdiv += '</div>'
	return hdiv
}

export function createUnfoldToolbarHtml(htmlMap) {
	const toolbar = locale().toolbar;
	let unfoldHtml = []
	defaultUnfoldToolbar.forEach((tools, index) => {
		let arrHtml = '<div class="unfold-bar-item">'
		if(Array.isArray(tools)) {
			tools.forEach(tool => {
				let hstr = htmlMap[tool.key]
				if(tool.key === 'exitFullScreen') {
					hstr = hstr.replace(/toolbar-unfold/, 'toolbar-collapse').replace(/ly-xia/, 'ly-shang')
				}
				hstr = hstr.replace(/<!-- tips-slot -->/, `<div class="tool-tips">${tool.tipKey ? toolbar[tool.tipKey] : toolbar[tool.key]}</div>`)
				arrHtml += hstr
			})
		} else {
			arrHtml += '<div class="flex-row">'
			tools.top.forEach(tool => {
				if(tool.unfold) arrHtml += getMenuListToolsHtml(tool.key) 
				else arrHtml += htmlMap[tool.key]
			})
			arrHtml += '</div><div class="flex-row">'
			tools.bottom.forEach(tool => {
				if(tool.unfold) arrHtml += getMenuListToolsHtml(tool.key) 
				else if(tool.showTips) arrHtml += htmlMap[tool.key].replace(/<!-- tips-slot-start -->(.|\n|\r)*<!-- tips-slot-end -->/, tool.tipKey ? toolbar[tool.tipKey] : toolbar[tool.key])
				else arrHtml += htmlMap[tool.key]
			})
			arrHtml += '</div>'
		}
		arrHtml += `</div>${defaultUnfoldToolbar.length !== index + 1 ? '<div class="unfold-tools-split-line"></div>' : ''}`
		unfoldHtml.push(arrHtml)
	})
	return unfoldHtml.join('')
}