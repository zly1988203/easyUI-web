<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>日进销存报表</title> 
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="queryForm()">查询</div>
					<input type="hidden" id="startCount" name="startCount" /> 
					<input type="hidden" id="endCount" name="endCount" />
					<div class="ubtns-item" onclick="exportData()">导出</div>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">退出</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub uline umar-t8"></div>
			
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300 " id="branchComponents">
					<div class="umar-r10 uw-70 ut-r">机构名称:</div>
					<input type="hidden" id="branchId" name="branchId" value="${branchId}" /> 
					<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" value="${branchName}" />
					<div class="uinp-more">...</div>
				</div>

				<div class="ub ub-ac  umar-l20">
					<div class="umar-r10 uw-70 ut-r">货号/条码:</div>
					<input class="uinp ub ub-f1" type="text" name="skuCodeOrBarCode" id="skuCodeOrBarCode">
				</div>
			</div>
		</form>


		<div class="ub ub-f1 umar-t20">
			<table id="daySumReport"></table>
		</div>
	</div>

	<script type="text/javascript">
		$(function() {
			//初始化默认条件
			initConditionParams();
			initDatagridDay();
			
			//机构选择初始化
			$('#branchComponents').branchSelect({
				param:{
					formType:'BF'
				}
			});
			
		});

		//初始化默认条件
		function initConditionParams() {
			$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
			$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
		}

		var gridHandel = new GridClass();
		var gridName = "daySumReport";
		//初始化表格
		function initDatagridDay() {
			gridHandel.setGridName("daySumReport");
			dg = $("#daySumReport").datagrid({
				method : 'post',
				align : 'center',
				singleSelect : false, //单选  false多选
				rownumbers : true, // 序号
				pagination : true, // 分页
				fitColumns : true, // 每列占满
				showFooter : true,
				pageSize : 50,
				height : '100%',
				width : '100%',
				columns : [ ${columns} ],
				onLoadSuccess : function() {
					gridHandel.setDatagridHeader("center");
				}
			});
			
			
		}

		function queryForm() {
			$("#startCount").attr("value", null);
			$("#endCount").attr("value", null);
			var fromObjStr =  $("#queryForm").serializeObject();
			fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1);
			
			$("#daySumReport").datagrid("options").queryParams =fromObjStr;
			$("#daySumReport").datagrid("options").method = "post";
			$("#daySumReport").datagrid("options").url = contextPath + '/report/day/list';
			$("#daySumReport").datagrid("load");

		}

		var dg;
		/**
		 * 导出
		 */
		function exportData() {
			var length = $('#daySumReport').datagrid('getData').total;
			if (length == 0) {
				$_jxc.alert("无数据可导");
				return;
			}
			$('#exportWin').window({
				top : ($(window).height() - 300) * 0.5,
				left : ($(window).width() - 500) * 0.5
			});
			$("#exportWin").show();
			$("#totalRows").html(dg.datagrid('getData').total);
			$("#exportWin").window("open");
		}

		/**
		 * 导出
		 */
		function exportExcel() {
			var length = $("#daySumReport").datagrid('getData').total;
			if (length == 0) {
				$_jxc.alert("没有数据");
				return;
			}
			$("#queryForm").attr("action",
					contextPath + "/report/day/export");

			$("#queryForm").submit();
		}
		/**
		 * 重置
		 */
		function resetForm() {
			$("#queryForm").form('clear');
		};
	</script>
</body>
</html>