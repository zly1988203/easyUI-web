$.fn.datagrid.defaults.baseOnCheck = $.fn.datagrid.defaults.onCheck;
$.fn.datagrid.defaults.baseOnUncheck = $.fn.datagrid.defaults.onUncheck;
$.fn.datagrid.defaults.baseOnCheckAll = $.fn.datagrid.defaults.onCheckAll;
$.fn.datagrid.defaults.baseOnUncheckAll = $.fn.datagrid.defaults.onUncheckAll;
$.extend($.fn.datagrid.defaults, {
	rowHeight: 25,
	maxDivHeight: 10000000,
	onBeforeFetch: function(page){},
	onFetch: function (page, rows) { },
	onCheck: function (index, row) {
	    var bakOnCheck = $.fn.datagrid.defaults.baseOnCheck;
	    if (bakOnCheck && $.isFunction(bakOnCheck)) {
	        bakOnCheck.call(this, index, row);
	    }

	    if (!row || row == null) return;
	    var state = $.data(this, "datagrid");
	    if (!state) return;
	    var opts = state.options;
	    $(this).datagrid("addCheckedRow", row);
	},
	onUncheck: function (index, row) {
	    var bakOnUncheck = $.fn.datagrid.defaults.baseOnUncheck;
	    if (bakOnUncheck && $.isFunction(bakOnUncheck)) {
	        bakOnUncheck.call(this, index, row);
	    }

	    if (!row || row == null) return;
	    var state = $.data(this, "datagrid");
	    if (!state) return;
	    var opts = state.options;
	    $(this).datagrid("removeCheckedRow", row);
	},
	onCheckAll: function (rows) {
	    var bakOnCheckAll = $.fn.datagrid.defaults.baseOnCheckAll;
	    if (bakOnCheckAll && $.isFunction(bakOnCheckAll)) {
	        bakOnCheckAll.call(this, rows);
	    }
	    var that = this;
	    var dc = $(this).data("datagrid");
	    if (!dc) return;
	    var opts = dc.options;
	    var allRows = $(this).datagrid("getCacheRows");
	    $(this).datagrid("addCheckedRows", allRows);
	},
	onUncheckAll: function (rows) {
	    var bakOnUncheckAll = $.fn.datagrid.defaults.baseOnUncheckAll;
	    if (bakOnUncheckAll && $.isFunction(bakOnUncheckAll)) {
	        bakOnUncheckAll.call(this, rows);
	    }
	    var state = $.data(this, "datagrid");
	    if (!state) return;
	    state.data.svCheckedRows = [];
	},
	loader: function (param, success, error) {
	    var that = this;
		var opts = $(this).datagrid('options');
		if (!opts.url) return false;
		if (opts.view.type == 'scrollview'){
			param.page = param.page || 1;
			param.rows = param.rows || opts.pageSize;
			param.loadAll = true;
		}		

		$.ajax({
			type: opts.method,
			url: opts.url,
			data: param,			
			dataType: 'json',
			success: function (data) {			    
			    success.call(that, data);				
			},
			error: function(){
				error.apply(this, arguments);
			}
		});
	}
});
$.extend($.fn.datagrid.defaults.finder, {
	getRow: function(target, p){	// p can be row index or tr object
		var index = (typeof p == 'object') ? p.attr('datagrid-row-index') : p;
		var opts = $(target).datagrid('options');
		if (opts.view.type == 'scrollview'){
			index -= opts.view.index;
		}
		return $.data(target, 'datagrid').data.rows[index];
	}
});

var scrollview = $.extend({}, $.fn.datagrid.defaults.view, {
    type: 'scrollview',

    index: 0,

	render: function(target, container, frozen){
		var state = $.data(target, 'datagrid');
		var opts = state.options;
		var rows = this.rows || [];
		if (!rows.length) {
			return;
		}
		var fields = $(target).datagrid('getColumnFields', frozen);
		
		if (frozen){
			if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))){
				return;
			}
		}
		
		var index = this.index;
		var table = ['<div class="datagrid-btable-top"></div>',
		             '<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>'];
		for(var i=0; i<rows.length; i++) {
			var css = opts.rowStyler ? opts.rowStyler.call(target, index, rows[i]) : '';
			var classValue = '';
			var styleValue = '';
			if (typeof css == 'string'){
				styleValue = css;
			} else if (css){
				classValue = css['class'] || '';
				styleValue = css['style'] || '';
			}
			var cls = 'class="datagrid-row ' + (index % 2 && opts.striped ? 'datagrid-row-alt ' : ' ') + classValue + '"';
			var style = styleValue ? 'style="' + styleValue + '"' : '';
			// get the class and style attributes for this row
//			var cls = (index % 2 && opts.striped) ? 'class="datagrid-row datagrid-row-alt"' : 'class="datagrid-row"';
//			var styleValue = opts.rowStyler ? opts.rowStyler.call(target, index, rows[i]) : '';
//			var style = styleValue ? 'style="' + styleValue + '"' : '';
			var rowId = state.rowIdPrefix + '-' + (frozen?1:2) + '-' + index;
			table.push('<tr id="' + rowId + '" datagrid-row-index="' + index + '" ' + cls + ' ' + style + '>');
			table.push(this.renderRow.call(this, target, fields, frozen, index, rows[i]));
			table.push('</tr>');
			
			// render the detail row
			if (opts.detailFormatter){
				table.push('<tr style="display:none;">');
				if (frozen){
					table.push('<td colspan=' + (fields.length+(opts.rownumbers?1:0)) + ' style="border-right:0">');
				} else {
					table.push('<td colspan=' + (fields.length) + '>');
				}
				table.push('<div class="datagrid-row-detail">');
				if (frozen){
					table.push('&nbsp;');
				} else {
					table.push(opts.detailFormatter.call(target, index, rows[i]));
				}
				table.push('</div>');
				table.push('</td>');
				table.push('</tr>');
			}

			index++;
		}
		table.push('</tbody></table>');
		table.push('<div class="datagrid-btable-bottom"></div>');
		
		$(container).html(table.join(''));
	},
	
	renderRow: function(target, fields, frozen, rowIndex, rowData){
		var opts = $.data(target, 'datagrid').options;
		
		var cc = [];
		if (frozen && opts.rownumbers){
			var rownumber = rowIndex + 1;
			if (opts.pagination){
				rownumber += (opts.pageNumber-1)*opts.pageSize;
			}
			cc.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">'+rownumber+'</div></td>');
		}
		for(var i=0; i<fields.length; i++){
			var field = fields[i];
			var col = $(target).datagrid('getColumnOption', field);
			if (col){
				var value = rowData[field];	// the field value
				var css = col.styler ? (col.styler(value, rowData, rowIndex)||'') : '';
				var classValue = '';
				var styleValue = '';
				if (typeof css == 'string'){
					styleValue = css;
				} else if (cc){
					classValue = css['class'] || '';
					styleValue = css['style'] || '';
				}
				var cls = classValue ? 'class="' + classValue + '"' : '';
				var style = col.hidden ? 'style="display:none;' + styleValue + '"' : (styleValue ? 'style="' + styleValue + '"' : '');
				
				cc.push('<td field="' + field + '" ' + cls + ' ' + style + '>');
				
				if (col.checkbox){
					style = '';
				} else if (col.expander){
					style = "text-align:center;height:16px;";
				} else {
					style = styleValue;
					if (col.align){style += ';text-align:' + col.align + ';'}
					if (!opts.nowrap){
						style += ';white-space:normal;height:auto;';
					} else if (opts.autoRowHeight){
						style += ';height:auto;';
					}
				}
				
				cc.push('<div style="' + style + '" ');
				if (col.checkbox){
					cc.push('class="datagrid-cell-check ');
				} else {
					cc.push('class="datagrid-cell ' + col.cellClass);
				}
				cc.push('">');
				
				if (col.checkbox){
					cc.push('<input type="checkbox" name="' + field + '" value="' + (value!=undefined ? value : '') + '">');
				} else if (col.expander) {
					//cc.push('<div style="text-align:center;width:16px;height:16px;">');
					cc.push('<span class="datagrid-row-expander datagrid-row-expand" style="display:inline-block;width:16px;height:16px;cursor:pointer;" />');
					//cc.push('</div>');
				} else if (col.formatter) {
					cc.push(col.formatter(value, rowData, rowIndex));
				} else {
					cc.push(value);
				}
				
				cc.push('</div>');
				cc.push('</td>');
			}
		}
		return cc.join('');
	},
	
	bindEvents: function(target){
		var state = $.data(target, 'datagrid');
		var dc = state.dc;
		var opts = state.options;
		var body = dc.body1.add(dc.body2);
		var clickHandler = ($.data(body[0],'events')||$._data(body[0],'events')).click[0].handler;
		body.unbind('click').bind('click', function(e){
			var tt = $(e.target);
			var tr = tt.closest('tr.datagrid-row');
			if (!tr.length){return}
			if (tt.hasClass('datagrid-row-expander')){
				var rowIndex = parseInt(tr.attr('datagrid-row-index'));
				if (tt.hasClass('datagrid-row-expand')){
					$(target).datagrid('expandRow', rowIndex);
				} else {
					$(target).datagrid('collapseRow', rowIndex);
				}
				$(target).datagrid('fixRowHeight');
				
			} else {
				clickHandler(e);
			}
			e.stopPropagation();
		});
	},
	
	onBeforeRender: function(target){
		var state = $.data(target, 'datagrid');
		var opts = state.options;
		var dc = state.dc;
		var view = this;
		
		var rows = state.data.rows;
		state.data.firstRows = rows.slice(0, rows.length);
		//state.data.cacheRows = state.data.rows;

		this.index = this.index || 0;
		//$(target).datagrid("refreshCacheRows", { startIndex: this.index, rows: state.data.rows });
		state.data.rows = [];

		dc.body1.add(dc.body2).empty();
		this.rows = [];	// the rows to be rendered
		this.r1 = this.r2 = [];	// the first part and last part of rows
		
		init();
		createHeaderExpander();
		
		function init(){
			// erase the onLoadSuccess event, make sure it can't be triggered
			state.onLoadSuccess = opts.onLoadSuccess;
			opts.onLoadSuccess = function(){};
			setTimeout(function(){
				dc.body2.unbind('.datagrid').bind('scroll.datagrid', function(e){
					if (state.onLoadSuccess){
						opts.onLoadSuccess = state.onLoadSuccess;	// restore the onLoadSuccess event
						state.onLoadSuccess = undefined;
					}
					if (view.scrollTimer){
						clearTimeout(view.scrollTimer);
					}
					view.scrollTimer = setTimeout(function(){
						scrolling.call(view);
					}, 50);
				});
				dc.body2.triggerHandler('scroll.datagrid');
			}, 0);
		}
		function scrolling(){
			if (!opts.finder.getRows(target).length){
				reload.call(this);
			} else {
				if (!dc.body2.is(':visible')){return}
				var headerHeight = dc.view2.children('div.datagrid-header').outerHeight();
				
				var topDiv = dc.body2.children('div.datagrid-btable-top');
				var bottomDiv = dc.body2.children('div.datagrid-btable-bottom');
				if (!topDiv.length || !bottomDiv.length){return;}
				var top = topDiv.position().top + topDiv._outerHeight() - headerHeight;
				var bottom = bottomDiv.position().top - headerHeight;

				if (top > dc.body2.height() || bottom < 0){
					reload.call(this);
				} else if (top > 0){
					var page = Math.floor(this.index/opts.pageSize);
					this.getRows.call(this, target, page, function(rows){
						this.r2 = this.r1;
						this.r1 = rows;
						this.index = (page-1)*opts.pageSize;
						this.rows = this.r1.concat(this.r2);
						this.populate.call(this, target);
					});
				} else if (bottom < dc.body2.height()) {				    
				    //if (state.data.rows.length >= state.data.total) return;			    
				    var inx = $(target).datagrid("getIndexOfLastUIRow");
				    if (inx >= state.data.total - 1) return;
				    var page = Math.floor(this.index / opts.pageSize) + 2;
				    //if (state.data.rows.length > opts.pageSize && !this.r2.length) {
				    //    var r2Rows = state.data.rows.slice(opts.pageSize + 1, state.data.rows.length);
				    //    this.r2 = this.r2.concat(r2Rows);
				    //}
				    var incPage = state.data.rows.length > opts.pageSize;
					if (this.r2.length || incPage ) {
					    page++;
					}			
					
					this.getRows.call(this, target, page, function (rows) {					    
					    if (!this.r2.length) {
					        if (!incPage) {
					            this.r2 = rows;
					        } else {
					            this.r1 = state.data.rows.slice(opts.pageSize);
					            this.r2 = rows;
					            this.index += opts.pageSize;
					        }
						} else {
							this.r1 = this.r2;
							this.r2 = rows;
							this.index += opts.pageSize;
					    }
					   
						this.rows = this.r1.concat(this.r2);
						this.populate.call(this, target);
					});
				}
			}
			
			function reload(){
				var top = $(dc.body2).scrollTop();
				var index = Math.floor(top/opts.rowHeight);
				var page = Math.floor(index/opts.pageSize) + 1;
				
				this.getRows.call(this, target, page, function(rows){
					this.index = (page-1)*opts.pageSize;
					this.rows = rows;
					this.r1 = rows;
					this.r2 = [];
					this.populate.call(this, target);
					dc.body2.triggerHandler('scroll.datagrid');
				});
			}
		}
		function createHeaderExpander(){
			if (!opts.detailFormatter){return}
			
			var t = $(target);
			var hasExpander = false;
			var fields = t.datagrid('getColumnFields',true).concat(t.datagrid('getColumnFields'));
			for(var i=0; i<fields.length; i++){
				var col = t.datagrid('getColumnOption', fields[i]);
				if (col.expander){
					hasExpander = true;
					break;
				}
			}
			if (!hasExpander){
				if (opts.frozenColumns && opts.frozenColumns.length){
					opts.frozenColumns[0].splice(0,0,{field:'_expander',expander:true,width:24,resizable:false,fixed:true});
				} else {
					opts.frozenColumns = [[{field:'_expander',expander:true,width:24,resizable:false,fixed:true}]];
				}
				
				var t = dc.view1.children('div.datagrid-header').find('table');
				var td = $('<td rowspan="'+opts.frozenColumns.length+'"><div class="datagrid-header-expander" style="width:24px;"></div></td>');
				if ($('tr',t).length == 0){
					td.wrap('<tr></tr>').parent().appendTo($('tbody',t));
				} else if (opts.rownumbers){
					td.insertAfter(t.find('td:has(div.datagrid-header-rownumber)'));
				} else {
					td.prependTo(t.find('tr:first'));
				}
			}
			
			setTimeout(function(){
				view.bindEvents(target);
			},0);
		}
	},
	
	onAfterRender: function(target){
		$.fn.datagrid.defaults.view.onAfterRender.call(this, target);
		var dc = $.data(target, 'datagrid').dc;
		var footer = dc.footer1.add(dc.footer2);
		footer.find('span.datagrid-row-expander').css('visibility', 'hidden');
		footer.find("td[field='act']").children().css("visibility", "hidden");
		var opts = $.data(target, 'datagrid').options || {};
		if (opts.footerTextField && opts.footerTextField != "") {
		    var str = "td[field='" + opts.footerTextField + "'] div";
		    footer.find(str).css({ 'font-weight': 'bold', 'text-align': 'center' });
		}
	},
	
	getRows: function (target, page, callback) {
		var state = $.data(target, 'datagrid');
		var opts = state.options;
		var index = (page - 1) * opts.pageSize;		

		if (index < 0){return}
		if (opts.onBeforeFetch.call(target, page) == false){return}
		
		var rows = state.data.firstRows.slice(index, index + opts.pageSize);		

		if (rows.length){
			opts.onFetch.call(target, page, rows);
			callback.call(this, rows);
		} else {
			var param = $.extend({}, opts.queryParams, {
				page: page,
				rows: opts.pageSize
			});
			if (opts.sortName){
				$.extend(param, {
					sort: opts.sortName,
					order: opts.sortOrder
				});
			}
			if (opts.onBeforeLoad.call(target, param) == false) return;
			
			$(target).datagrid('loading');
			var result = opts.loader.call(target, param, function (data) {
			    //$.fn.datagrid.methods.refreshCacheRows($(target), opts.view.index, data.rows);
				$(target).datagrid('loaded');
				var data = opts.loadFilter.call(target, data);
				opts.onFetch.call(target, page, data.rows);
				if (data.rows && data.rows.length){
					callback.call(opts.view, data.rows);
				} else {
					opts.onLoadSuccess.call(target, data);
				}
			}, function(){
				$(target).datagrid('loaded');
				opts.onLoadError.apply(target, arguments);
			});
			if (result == false){
				$(target).datagrid('loaded');
				if (!state.data.firstRows.length){
					opts.onFetch.call(target, page, state.data.firstRows);
					opts.onLoadSuccess.call(target, state.data);
				}
			}
		}
	},
	
	populate: function (target) {
	    function doCheckRows() {
	        var onSelect = opts.onSelect;
	        var onCheck = opts.onCheck;
	        opts.onSelect = opts.onCheck = function () {
	        };

	        var ckHeader = dc.header1.add(dc.header2).find("input[type=checkbox]");
	        if (ckHeader.length == 0) return;
	        if (ckHeader.prop("checked") == true) {
	            $(target).datagrid("checkAll");
	        } else {
	            var rows = that.rows;
	            if (!rows) return;
	            var checked = $(target).datagrid("getCheckedScroll");
	            var allRows = $(target).datagrid("getRowsScroll");
	            for (var i = 0; i < rows.length; i++) {
	                var row = rows[i];	               
	                if ($.inArray(row, checked) < 0) continue;
	                var inx = $.inArray(row, allRows);
	                if (inx < 0) continue;
	                $(target).datagrid("checkRow", inx);
	            }
	        }

	        opts.onSelect = onSelect;
	        opts.onCheck = onCheck;
	    }
		var state = $.data(target, 'datagrid');
		var opts = state.options;
		var dc = state.dc;
		var rowHeight = opts.rowHeight;
		var maxHeight = opts.maxDivHeight;
		var that = this;
		
		if (this.rows.length){
			//opts.view.render.call(opts.view, target, dc.body2, false);
		    //opts.view.render.call(opts.view, target, dc.body1, true);
		    this.render.call(this, target, dc.body2, false);
		    this.render.call(this, target, dc.body1, true);
			var body = dc.body1.add(dc.body2);
			// body.children('div.datagrid-btable-top').css('height', this.index*rowHeight);
			// body.children('div.datagrid-btable-bottom').css('height', state.data.total*rowHeight - this.rows.length*rowHeight - this.index*rowHeight);
			fillHeight(body.children('div.datagrid-btable-top'), this.index*rowHeight);
			fillHeight(body.children('div.datagrid-btable-bottom'), state.data.total * rowHeight - this.rows.length * rowHeight - this.index * rowHeight);			
			// var r = [];
			// for(var i=0; i<this.index; i++){
			// 	r.push({});
			// }
			// state.data.rows = r.concat(this.rows);

			state.data.rows = this.rows;
			
			//var spos = dc.body2.scrollTop();
			//$(target).datagrid('setSelectionState');
		    //dc.body2.scrollTop(spos);
			doCheckRows();

			opts.onLoadSuccess.call(target, {
				total: state.data.total,
				rows: this.rows
			});
		}
		function fillHeight(div, height){
			var count = Math.floor(height/maxHeight);
			var leftHeight = height - maxHeight*count;
			var cc = [];
			for(var i=0; i<count; i++){
				cc.push('<div style="height:'+maxHeight+'px"></div>');
			}			
			cc.push('<div style="height:'+leftHeight+'px"></div>');
			$(div).html(cc.join(''));
		}
	},

	updateRow: function (target, rowIndex, row) {
	    var opts = $.data(target, 'datagrid').options;
	    var rows = $(target).datagrid('getRows');
	    var rowData = opts.finder.getRow(target, rowIndex);

	    var oldStyle = _getRowStyle(rowIndex);
	    $.extend(rowData, row);
	    var newStyle = _getRowStyle(rowIndex);
	    var oldClassValue = oldStyle.c;
	    var styleValue = newStyle.s;
	    var classValue = 'datagrid-row ' + (rowIndex % 2 && opts.striped ? 'datagrid-row-alt ' : ' ') + newStyle.c;

	    function _getRowStyle(rowIndex) {
	        var css = opts.rowStyler ? opts.rowStyler.call(target, rowIndex, rowData) : '';
	        var classValue = '';
	        var styleValue = '';
	        if (typeof css == 'string') {
	            styleValue = css;
	        } else if (css) {
	            classValue = css['class'] || '';
	            styleValue = css['style'] || '';
	        }
	        return { c: classValue, s: styleValue };
	    }
	    function _update(frozen) {
	        var fields = $(target).datagrid('getColumnFields', frozen);
	        var tr = opts.finder.getTr(target, rowIndex, 'body', (frozen ? 1 : 2));
	        var checked = tr.find('div.datagrid-cell-check input[type=checkbox]').is(':checked');
	        tr.html(this.renderRow.call(this, target, fields, frozen, rowIndex, rowData));
	        tr.attr('style', styleValue).removeClass(oldClassValue).addClass(classValue);
	        if (checked) {
	            tr.find('div.datagrid-cell-check input[type=checkbox]')._propAttr('checked', true);
	        }
	    }

	    _update.call(this, true);
	    _update.call(this, false);
	    $(target).datagrid('fixRowHeight', rowIndex);    
	},

	insertRow: function (target, index, row) {
	    this.insertUiRow(target, index, row);
	    this.insertRowData(target, index, row);	    
	},
    
	insertRowData: function (target, index, row) {
	    var state = $.data(target, 'datagrid');
	    var opts = state.options;
	    var dc = state.dc;
	    var data = state.data;
	    
	    $(target).datagrid("addCacheRow", { index: index, row: row });//���뻺��
	    data.total += 1;
	},

	insertUiRow: function (target, index, row) {
	    function _incIndex(frozen) {
	        var serno = frozen ? 1 : 2;
	        for (var i = this.index + data.rows.length - 1; i >= index; i--) {
	            var tr = opts.finder.getTr(target, i, 'body', serno);
	            tr.attr('datagrid-row-index', i + 1);
	            tr.attr('id', state.rowIdPrefix + '-' + serno + '-' + (i + 1));
	            if (frozen && opts.rownumbers) {
	                var rownumber = i + 2;
	                if (opts.pagination) {
	                    rownumber += (opts.pageNumber - 1) * opts.pageSize;
	                }
	                tr.find('div.datagrid-cell-rownumber').html(rownumber);
	            }
	            if (opts.striped) {
	                tr.removeClass('datagrid-row-alt').addClass((i + 1) % 2 ? 'datagrid-row-alt' : '');
	            }
	        }
	    }

	    function _insert(frozen) {
	        var serno = frozen ? 1 : 2;
	        var fields = $(target).datagrid('getColumnFields', frozen);
	        var rowId = state.rowIdPrefix + '-' + serno + '-' + index;
	        var tr = '<tr id="' + rowId + '" class="datagrid-row" datagrid-row-index="' + index + '"></tr>';
	        //				var tr = '<tr id="' + rowId + '" class="datagrid-row" datagrid-row-index="' + index + '">' + this.renderRow.call(this, target, fields, frozen, index, row) + '</tr>';
	        if (index >= this.index + data.rows.length) {	// append new row
	            if (data.rows.length) {	// not empty
	                opts.finder.getTr(target, '', 'last', serno).after(tr);
	            } else {
	                var cc = frozen ? dc.body1 : dc.body2;
	                cc.html('<div class="datagrid-btable-top"></div><table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>' + tr + '</tbody></table><div class="datagrid-btable-bottom"></div>');
	            }
	        } else {	// insert new row
	            opts.finder.getTr(target, index + 1, 'body', serno).before(tr);
	        }
	    }

	    var state = $.data(target, 'datagrid');
	    var opts = state.options;
	    var dc = state.dc;
	    var data = state.data;

	    if (index == undefined || index == null) index = data.firstRows.length;
	    if (index > data.firstRows.length) index = data.firstRows.length;

	    _incIndex.call(this, true);
	    _incIndex.call(this, false);
	    _insert.call(this, true);
	    _insert.call(this, false);

	    var tIndex = index - this.index;
	    if (tIndex < 0) tIndex = 0;
	    data.rows.splice(tIndex, 0, row);

	    this.refreshRow.call(this, target, index);
	},

	deleteRow: function (target, index) {	   
	    this.deleteUiRow(target, index);
	    this.deleteRowData(target, index);
	},

	deleteRowData: function (target, index) {
	    var state = $.data(target, 'datagrid');	  
	    var data = state.data;
	    data.total -= 1;
	    $(target).datagrid("removeCacheRow", index);
	},

	deleteUiRow: function (target, index) {
	    var state = $.data(target, 'datagrid');
	    var opts = state.options;
	    var data = state.data;

	    function _decIndex(frozen) {
	        var serno = frozen ? 1 : 2;
	        for (var i = index + 1; i < this.index + data.rows.length; i++) {
	            var tr = opts.finder.getTr(target, i, 'body', serno);
	            tr.attr('datagrid-row-index', i - 1);
	            tr.attr('id', state.rowIdPrefix + '-' + serno + '-' + (i - 1));
	            if (frozen && opts.rownumbers) {
	                var rownumber = i;
	                if (opts.pagination) {
	                    rownumber += (opts.pageNumber - 1) * opts.pageSize;
	                }
	                tr.find('div.datagrid-cell-rownumber').html(rownumber);
	            }
	            if (opts.striped) {
	                tr.removeClass('datagrid-row-alt').addClass((i - 1) % 2 ? 'datagrid-row-alt' : '');
	            }
	        }
	    }

	    opts.finder.getTr(target, index).remove();
	    _decIndex.call(this, true);
	    _decIndex.call(this, false);

	    //index = index - this.index - 1;
	    index = index - this.index ;
	    data.rows.splice(index, 1);
	}    
});

$.fn.datagrid.methods.baseGetRowIndex = $.fn.datagrid.methods.getRowIndex;
$.fn.datagrid.methods.baseScrollTo = $.fn.datagrid.methods.scrollTo;
$.fn.datagrid.methods.baseGotoPage = $.fn.datagrid.methods.gotoPage;
$.extend($.fn.datagrid.methods, {
	getRowIndex: function(jq, id){
		var opts = jq.datagrid('options');
		if (opts.view.type == 'scrollview'){
			return jq.datagrid('baseGetRowIndex', id) + opts.view.index;
		} else {
			return jq.datagrid('baseGetRowIndex', id);
		}
	},
	getRow: function(jq, index){
		return jq.datagrid('options').finder.getRow(jq[0], index);
	},
	gotoPage: function(jq, param){
		return jq.each(function(){
			var target = this;
			var opts = $(target).datagrid('options');
			if (opts.view.type == 'scrollview'){
				var page, callback;
				if (typeof param == 'object'){
					page = param.page;
					callback = param.callback;
				} else {
					page = param;
				}
				opts.view.getRows.call(opts.view, target, page, function(rows){
					this.index = (page-1)*opts.pageSize;
					this.rows = rows;
					this.r1 = rows;
					this.r2 = [];
					this.populate.call(this, target);
					$(target).data('datagrid').dc.body2.scrollTop(this.index * opts.rowHeight);
					if (callback){
						callback.call(target, page);
					}
				});
			} else {
				$(target).datagrid('baseGotoPage', param);
			}
		});
	},
	scrollTo: function(jq, param){
		return jq.each(function(){
			var target = this;
			var opts = $(target).datagrid('options');
			var index, callback;
			if (typeof param == 'object'){
				index = param.index;
				callback = param.callback;
			} else {
				index = param;
			}
			var view = opts.view;
			if (view.type == 'scrollview'){
				if (index >= view.index && index < view.index+view.rows.length){
					$(target).datagrid('baseScrollTo', index);
					if (callback){
						callback.call(target, index);
					}
				} else if (index >= 0){
					var page = Math.floor(index/opts.pageSize) + 1;
					$(target).datagrid('gotoPage', {
						page: page,
						callback: function(){
							setTimeout(function(){
								$(target).datagrid('baseScrollTo', index);
								if (callback){
									callback.call(target, index);
								}
							}, 0);							
						}
					});
				}
			} else {
				$(target).datagrid('baseScrollTo', index);
				if (callback){
					callback.call(target, index);
				}
			}
		});
	}
});

$.extend($.fn.datagrid.methods, {
	fixDetailRowHeight: function(jq, index){
		return jq.each(function(){
			var opts = $.data(this, 'datagrid').options;
			var dc = $.data(this, 'datagrid').dc;
			var tr1 = opts.finder.getTr(this, index, 'body', 1).next();
			var tr2 = opts.finder.getTr(this, index, 'body', 2).next();
			// fix the detail row height
			if (tr2.is(':visible')){
				tr1.css('height', '');
				tr2.css('height', '');
				var height = Math.max(tr1.height(), tr2.height());
				tr1.css('height', height);
				tr2.css('height', height);
			}
			dc.body2.triggerHandler('scroll');
		});
	},
	getExpander: function(jq, index){	// get row expander object
		var opts = $.data(jq[0], 'datagrid').options;
		return opts.finder.getTr(jq[0], index).find('span.datagrid-row-expander');
	},
	// get row detail container
	getRowDetail: function(jq, index){
		var opts = $.data(jq[0], 'datagrid').options;
		var tr = opts.finder.getTr(jq[0], index, 'body', 2);
		return tr.next().find('div.datagrid-row-detail');
	},
	expandRow: function(jq, index){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var dc = $.data(this, 'datagrid').dc;
			var expander = $(this).datagrid('getExpander', index);
			if (expander.hasClass('datagrid-row-expand')){
				expander.removeClass('datagrid-row-expand').addClass('datagrid-row-collapse');
				var tr1 = opts.finder.getTr(this, index, 'body', 1).next();
				var tr2 = opts.finder.getTr(this, index, 'body', 2).next();
				tr1.show();
				tr2.show();
				$(this).datagrid('fixDetailRowHeight', index);
				if (opts.onExpandRow){
					var row = $(this).datagrid('getRows')[index];
					opts.onExpandRow.call(this, index, row);
				}
			}
		});
	},
	collapseRow: function(jq, index){
		return jq.each(function(){
			var opts = $(this).datagrid('options');
			var dc = $.data(this, 'datagrid').dc;
			var expander = $(this).datagrid('getExpander', index);
			if (expander.hasClass('datagrid-row-collapse')){
				expander.removeClass('datagrid-row-collapse').addClass('datagrid-row-expand');
				var tr1 = opts.finder.getTr(this, index, 'body', 1).next();
				var tr2 = opts.finder.getTr(this, index, 'body', 2).next();
				tr1.hide();
				tr2.hide();
				dc.body2.triggerHandler('scroll');
				if (opts.onCollapseRow){
					var row = $(this).datagrid('getRows')[index];
					opts.onCollapseRow.call(this, index, row);
				}
			}
		});
	},
	getCheckedScroll: function (jq) {
	    var dc = $.data(jq[0], 'datagrid');
	    var checked = dc.data.svCheckedRows || [];
	    return checked;
	},	
	getRowsScroll: function (jq) {
	    var state = $.data(jq[0], 'datagrid');
	    if (!state) return [];
	    var opts = state.options;
	    var data = state.data;
	    var allCacheRows = jq.datagrid("getCacheRows");	    
	    return allCacheRows;
	},
	updateRowScroll: function (jq, param) {
	    if (!param) return;
	    var index = param.index;
	    var row = param.row;
	    if (index == undefined || index < 0) return;
	    var state = jq.data('datagrid');
	    var opts = state.options;

	    var uiRows = jq.datagrid("getRows");
	    if ($.inArray(row, uiRows) < 0) {
	        jq.datagrid("updateRowInCache", param);
	        return;
	    }

	    jq.datagrid("updateRow", { index: index, row: row });
	},
	insertRowScroll: function (jq, param) {
	    if (!param) return;
	    var index = param.index;
	    var row = param.row;
	    if (!row) return;

	    var state = $.data(jq[0], 'datagrid');
	    var data = state.data;
	    var opts = state.options;   

	    var firstUiRowIndex = jq.datagrid("getIndexOfFirstUIRow");
	    var lastUiRowIndex = jq.datagrid("getIndexOfLastUIRow");

	    if (index == undefined || index == null) {
	        index = data.total;
	    } 

	    if (index <= firstUiRowIndex) {
	        if (firstUiRowIndex == 0 && jq.datagrid("getRows").length == 0) {
	            jq.datagrid("insertRow", param);	           
	        }
	    }
	    else if (index <= lastUiRowIndex) {  
	        jq.datagrid("insertRow", param);
	        var uiRows = jq.datagrid("getRows");
	        if (uiRows.length > opts.pageSize * 2) {
	            //����ֻ����120�У�ֻɾ������Ԫ��	
	            var dInx = uiRows.length - 1;
	            jq.datagrid("deleteUiRow", dInx);
	        }	        
	    }
	    else if (index == lastUiRowIndex + 1) {
	        var uiRows = jq.datagrid("getRows");
	        if (uiRows.length >= opts.pageSize * 2) {
	            jq.datagrid("insertRowInCache", { index: index, row: row });
	        } else {	            
	            jq.datagrid("insertRow", param);
	        }
	    }
	    else if (index > lastUiRowIndex) {
	        jq.datagrid("insertRowInCache", { index: index, row: row });
	    }

	    jq.datagrid("fixScrollBar");
	},
	deleteRowScroll: function (jq, index) {   
	    if (index == undefined || index == null) return;

	    var state = $.data(jq[0], 'datagrid');
	    var data = state.data;
	    var opts = state.options;
	    var allRows = jq.datagrid("getRowsScroll");
	    var row = allRows[index];

	    var firstUiRowIndex = jq.datagrid("getIndexOfFirstUIRow");
	    var lastUiRowIndex = jq.datagrid("getIndexOfLastUIRow");

	    if (index < firstUiRowIndex) {
	        jq.datagrid("deleteRowInCache", index);
	        var lastInx = allRows.length - 1;
	        //ɾ���׸�������Ԫ��
	        if (lastInx > firstUiRowIndex) {
	            jq.datagrid("deleteUiRow", firstUiRowIndex);
	        }
	        else if (lastInx == firstUiRowIndex) {
	            if (jq.datagrid("getRows").length > 0) {
	                jq.datagrid("deleteUiRow", firstUiRowIndex);
	                opts.view.index -= 1;
	            } else {
	                opts.view.index -= 1;
	            }
	        }
	        
	        //��������������Ԫ��
	        if (lastUiRowIndex >= firstUiRowIndex && lastInx > lastUiRowIndex) {
	            var r = allRows[lastUiRowIndex];
	            jq.datagrid("insertUiRow", { index: lastUiRowIndex, row: r });
	        }
	        fn();

	    }
	    else if (index <= lastUiRowIndex) {
	        jq.datagrid("deleteRow", index);
	        var lastInx = allRows.length - 1;
	        //��������������Ԫ��
	        if (lastInx >= lastUiRowIndex) {
	            var r = allRows[lastUiRowIndex];
	            jq.datagrid("insertUiRow", { index: lastUiRowIndex, row: r });
	        }
	        fn();
	    }
	    else {
	        jq.datagrid("deleteRowInCache", index);
	        fn();
	    }

	    function fn() {
	        var checkedRows = jq.datagrid("getCheckedScroll");
	        var inx = $.inArray(row, checkedRows);
	        if (inx > -1) {
	            checkedRows.splice(inx, 1);
	        }
	        jq.datagrid("fixScrollBar");	        
	    }
	}
	
});

//�ڲ���������
$.extend($.fn.datagrid.methods, {   
    //�����е�������
    addCacheRow: function (jq, param) {
        if (!param) return;
        var index = param.index;
        var row = param.row;
        var state = jq.data('datagrid');
        if (!state) return;
        state.data.firstRows = state.data.firstRows || [];
        if (index == undefined || index == null) {
            index = state.data.total;
        }
        if (state.data.firstRows.length > 0 && index > state.data.firstRows.length - 1) {
            var tCount = index - state.data.firstRows.length;
            for (var i = index; i < index + tCount; i++) {
                state.data.firstRows.push(null);
            }
            state.data.firstRows.push(row);

        } else {
            state.data.firstRows.splice(index, 0, row);
        }
    },
    //���������е�������
    addCacheRows: function (jq, param) {
        if (!param) return;
        var startIndex = param.startIndex;
        var rows = param.rows;
        for (var i = 0, j = startIndex; i < rows.length; i++, j++) {
            jq.datagrid("addCacheRow", { index: j, row: rows[i] });
        }
    },
    //ɾ��������
    removeCacheRow: function (jq, index) {      
        var state = jq.data('datagrid');
        if (!state) return;
        state.data.firstRows = state.data.firstRows || [];
        state.data.firstRows.splice(index, 1);
    },
    //��ȡ������
    getCacheRows: function (jq, param) {       
        var state = jq.data('datagrid');
        if (!state) return;
        state.data.firstRows = state.data.firstRows || [];
        var rows = undefined;
        if (!param) {
            return state.data.firstRows;
        }
        else {
            var startIndex = param.startIndex;
            var length = param.length;
            rows = state.data.firstRows.slice(startIndex, startIndex + length);
            return rows;
        }        
    },
    //����ѡ����
    addCheckedRow: function (jq, row) {        
        var state = jq.data("datagrid");
        if (!state) return;
        state.data.svCheckedRows = state.data.svCheckedRows || [];
        if (row) {
            if ($.inArray(row, state.data.svCheckedRows) < 0) {
                state.data.svCheckedRows.push(row);
            }
        }
    },
    //��������ѡ����
    addCheckedRows: function (jq, rows) {       
        for (var i = 0; i < rows.length; i++) {
            jq.datagrid("addCheckedRow", rows[i]);
        }
    },
    //ɾ��ѡ����
    removeCheckedRow: function (jq, row) {       
        var state = jq.data("datagrid");
        if (!state) return;
        state.data.svCheckedRows = state.data.svCheckedRows || [];
        if (row) {
            var index = $.inArray(row, state.data.svCheckedRows);
            if (index > -1) {
                state.data.svCheckedRows.splice(index, 1);
            }
        }
    },
    //�����������߶�
    fixScrollBar: function (jq) {
        function fillHeight(div, height) {
            var count = Math.floor(height / maxHeight);
            var leftHeight = height - maxHeight * count;
            var cc = [];
            for (var i = 0; i < count; i++) {
                cc.push('<div style="height:' + maxHeight + 'px"></div>');
            }
            cc.push('<div style="height:' + leftHeight + 'px"></div>');
            $(div).html(cc.join(''));
        }

        var state = jq.data("datagrid");
        var opts = state.options;
        var dc = state.dc;
        var rowHeight = opts.rowHeight;
        var maxHeight = opts.maxDivHeight;
        var view = opts.view;
        view.rows = view.rows || [];
        if (view.index == undefined) view.index = 0;
        var body = dc.body1.add(dc.body2);
        fillHeight(body.children('div.datagrid-btable-top'), view.index * rowHeight);
        fillHeight(body.children('div.datagrid-btable-bottom'), state.data.total * rowHeight - view.rows.length * rowHeight - view.index * rowHeight);      
    },
    getIndexOfFirstUIRow: function (jq) {
        var state = jq.data("datagrid");
        var opts = state.options;
        var retIndex = 0;
        if (opts.view.index != undefined) {
            retIndex = opts.view.index;
        }
        return retIndex;

    },
    getIndexOfLastUIRow: function (jq) {
        var startIndex = jq.datagrid("getIndexOfFirstUIRow");
        var uiRows = jq.datagrid("getRows");
        var endIndex = startIndex + uiRows.length - 1;
        if (endIndex < 0) endIndex = 0;
        return endIndex;
    },
    //ɾ��������Ԫ��
    deleteUiRow: function (jq, index) {                
        var state = jq.data("datagrid");
        var opts = state.options;
        opts.view.deleteUiRow.call(opts.view, jq[0], index);
    },
    //����������Ԫ��
    insertUiRow: function (jq, param) {
        if (!param) return;
        var index = param.index;
        var row = param.row;
        var state = jq.data("datagrid");
        var opts = state.options;
        opts.view.insertUiRow.call(opts.view, jq[0], index, row);
    },
    //������ִ�в����в���
    insertRowInCache: function (jq, param) {
        if (!param) return;
        var index = param.index;
        var row = param.row;
        var state = jq.data("datagrid");
        var data = state.data;
    
        jq.datagrid("getChanges", "inserted").push(row);
        jq.datagrid("addCacheRow", { index: index, row: row });
        data.total += 1
    },
    //������ִ��ɾ���в���
    deleteRowInCache: function (jq, index) {  
        if (index == undefined || index == null) return;
        var allRows = jq.datagrid("getRowsScroll");

        var state = jq.data("datagrid");
        var data = state.data;
        var row = allRows[index];
        data.total -= 1
        jq.datagrid("getChanges", "deleted").push(row);
        jq.datagrid("removeCacheRow", index);        
    },
    //������ִ�и����в���
    updateRowInCache: function (jq, param) {
        if (!param) return;
        var index = param.index;
        var row = param.row;
        var allRows = jq.datagrid("getRowsScroll");
        if (index == undefined || index == null || !row || !allRows) return;
        
        var rowData = allRows[index] || {};
        $.extend(rowData, row);
    }
});