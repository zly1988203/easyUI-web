<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>日结</title>
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4 ubor uh-200 ubgc-while">
		<div class="ub umar-t10">
			<div class="ub ub-ac">
				<div class="umar-r10 uw-70 ut-r">机&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;构:</div>
				<input type="hidden" id="branchId" name="branchId" /> <input
					class="uinp ub ub-f1" type="text" id="branchName" name="branchName"
					maxlength="50" readonly="readonly" onclick="selectBranches()" />
				<div class="uinp-more" onclick="selectBranches()">...</div>
			</div>
			<div class="ub ub-ac umar-l20">
				<div class="umar-r10 uw-70 ut-r">月结期间:</div>
				<input class="Wdate" readonly="readonly" name="rptDate" id="rptDate"
					onfocus="updateWdatePicker(0)" />
			</div>
		</div>
		<div class="ub ub-ac umar-t10 upad-l10">月结周期： 月结日是每月1日，月结期间由此决定。
		</div>
		<div class="ub ub-ac umar-t10 upad-l10">
			注：上一次月结期间为：
			<div class="utxt" id="maxRptDate">${mReport.maxRptDate}</div>
		</div>
		<div class="ub uw-600 ub-ac ub-pc umar-t20">
			<div class="ubtns ">
				<div class="ubtns-item" onClick="monthStatement()">月结</div>
			</div>
		</div>
	</div>
	
	<script type="text/javascript">
		$(function() {
			$("#branchName").val(sessionBranchName);
			$("#branchId").val(sessionBranchId);
			// 获得上月月结期间
			getUpMonthReportDay(sessionBranchId);
		});
		
		// 上一次月结期间
		function getUpMonthReportDay(branchId) {
			$_jxc.ajax({
				url : contextPath + "/report/monthStatement/getUpMonthReportDay",
				type : "POST",
				data : {
					"branchId" : branchId
				}
			},function(result){
				var maxRptDate = result['data'].maxRptDate;
				if (!maxRptDate) {
					maxRptDate = "该机构尚无月结数据";
				}
				$("#maxRptDate").html(maxRptDate);
			});
		}
		
		// 选择月结期间
		function updateWdatePicker() {
			WdatePicker({
				dateFmt : 'yyyy-MM',
				maxDate : '%y-%M',
				onpicked : function(dp) {
					$("input:radio[name='dateradio']").attr("checked", false);
				}
			});
		}
	</script>
</body>
</html>