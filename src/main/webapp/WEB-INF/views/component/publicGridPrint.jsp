<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>打印</title>
	
	<!-- 引入 Bootstrap -->
	<link href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
	
	<!-- jQuery (Bootstrap 的 JavaScript 插件需要引入 jQuery) -->
	<script src="https://code.jquery.com/jquery.js"></script>
</head>
<body>
	<table id="printGrid" class="table table-bordered">
	</table>
</body>

<script type="text/javascript">
	var columns = [{"field":"appCode","title":"应用编号","isPrint":true},{"field":"appName","title":"应用名称","isPrint":true}];
	var data = new Array();
	for (var i = 0; i < 3000; i++) {
		data.push({"appCode":"RETAIL"+i,"appName":"零售系统"+i});
	}

	//绘制thead
	$("#printGrid").append("<thead><tr></tr></thead>");
	$.each(columns, function(index, column) {
		if (true == column.isPrint) {
			$("#printGrid thead tr").append("<th>" + column.title + "</th>");
		}
	});

	//绘制tbody
	$("#printGrid").append("<tbody></tbody>");
	$.each(data, function(i, row) {
		var rowHtml = "<tr>";
		$.each(columns, function(j, column) {
			if (true == column.isPrint) {
				rowHtml += "<td>" + data[i][column.field] + "</td>";
			}
		});
		rowHtml+="</tr>";
		$("#printGrid tbody").append(rowHtml);
	});
</script>

<script type="text/javascript">
	//纸张设置
	var paperSetting = {
		paper : {
			id : "A4",
			name : "A4",
			isSys : true,
			//纸张大小
			size : {
				width : 210,
				height : 297
			},
			//边距
			margin : {
				left : 10,
				top : 10,
				right : 10,
				bottom : 10
			},
			//单位：毫米或英寸
			unit : "mm"
		}
	};
	
	//进行打印
	$.sheetDesignPrint = function (options,jsonReplace) {
		var margin = paperSetting.margin;
		var marginLeft = margin.left;
		var marginRight = margin.right;
		var marginTop = margin.top;
		var marginBottom = margin.bottom;

		var strMarginLeft = 'margin-left:' + marginLeft + "in";
		var strMarginRight = 'margin-right:' + marginRight + "in";
		var strMarginTop = 'margin-top:' + marginTop + "in";
		var strMarginBottom = 'margin-bottom:' + marginBottom + "in";

	}
	
	//添加一行
	function insertRow(columns, row) {
		function createTr(columns, row) {
			var tr = $("<tr></tr>");
			//循环所有列
			for (var i = 0; i < columns.length; i++) {
				//第i列
				var column = columns[i];

				//字段名
				var field = column.field;
				//对齐
				var align = column.printAlign;
				//格式化
				var formatter = column.printFormatter;
				//列值
				var value = row[field];

				//是否打印
				var isPrint = column.isPrint;
				if (isPrint == false) {
					continue;
				}

				//创建td
				var td = $("<td></td>");
				td.css("overflow", "hidden");
				td.css("white-space", "nowrap");
				td.css("text-overflow", "ellipsis");
				//对齐
				if (align && align != "") {
					td.css("text-align", align);
				}
				//格式化
				if (formatter && formatter != "") {

				}
				//列值
				td.html(value);

				td.appendTo(tr);
			}
		}
	}

	function createPrint() {

	}
	
	(function ($) {
		$.fn.createPages = function(jqPage) {
			//创建thead
			function createThead(jqPage,columns){
				//创建thead
				var thead = $("<thead></thead>");
				//创建tr
				var tr = $("<tr></tr>").appendTo(thead);
				
				//循环所有列
				var totalWidth = 0;
				for (var i = 0; i < columns.length; i++) {
					//第i列
					var column = columns[i];
					
					//字段名称
					var field = column.field;
					//字段标题
					var tilte =  column.tilte;
					//列宽
					var width = column.printWidth;
					//对齐（表头）
					var halign = column.printHalign;
					//是否打印
					var isPrint = column.isPrint;
					
					//跳过不需要打印的列
					if(isPrint == false){
						continue;
					}
					
					//超过纸张最大显示，后续列不再显示
					totalWidth += width;
					if (totalWidth > jqPage.innerWidth()) {
						break;
					}
					
					//创建th
					var th = $("<th></th>").appendTo(tr);
					th.attr("field", field);
					//列宽
					if (width && width != "") {
						th.css("width", width + "px");
					}
					//对齐（表头）
					if (halign && halign != "") {
						th.css("text-align", halign);
					}
					//字段标题
					th.html(tilte);
				}
				return thead;
			}
			
			//创建新页分隔
			function createPageBreak() {
				//触发新增页事件
				newPageEvent();
				//页面分隔
				var pBreak = $("<div></div>");
				pBreak.addClass(pageBreak);
				return pBreak;
			}
			
			//触发新增页事件
			function newPageEvent() {
				if (onNewPage && $.isFunction(onNewPage)) {
					onNewPage.call(currentPage[0], currentPageNo);
				}
			}
			
			//当前页
			var currentPage = undefined; 
			//当前页码
			var currentPageNo = 0; 
			
			var thead = createThead(jqPage, columns);
			var print = createPrint();
			return print;
		}
	})
</script>
</html>