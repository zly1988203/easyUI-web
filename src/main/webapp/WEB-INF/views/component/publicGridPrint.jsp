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
</html>