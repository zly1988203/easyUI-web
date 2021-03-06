<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>供应商进销存月报表</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
    <script  src="${ctx}/static/js/views/report/supplier/monthList.js?V=${versionNo}"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
   <div class="ub ub-ver ub-f1 umar-4 upad-4">
	<form id="queryForm" action="" method="post">
		<div class="ub ub-ac">
            <div class="ubtns">
                <div class="ubtns-item" onclick="queryForm()">查询</div>
                <div class="ubtns-item" onclick="exportData()">导出</div>
                <div class="ubtns-item" onclick="printReport()">打印</div>
                <input type="hidden" id="startCount" name="startCount" />
						<input type="hidden" id="endCount" name="endCount" />
                <div class="ubtns-item" id="set" onclick="gFunRefresh()" >重置</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
            <div class="ub ub-ac umar-l20">
				<div class="umar-r10 uw-70 ut-r">分析月份:</div>
		   		<input class="Wdate"  readonly="readonly" name="startTime" id="txtStartDate" onfocus="updateWdatePicker()" value='<c:out value="${startTime }"></c:out>'/>
			</div>
		</div>
		<div class="ub uline umar-t8"></div>
		<div class="ub umar-t8">
			<div class="ub ub-ac">
				<div class="umar-r10 uw-70 ut-r">机构名称:</div>
				<input type="hidden" id="createBranchId" name="branchId" value='<c:out value="${branchId}"></c:out>' />
				<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" value='<c:out value="${branchName}"></c:out>'  readonly="readonly" maxlength="50"/>
				<div class="uinp-more" onclick="selectBranches()" >...</div>
			</div>
			<div class="ub ub-ac umar-l40">
				<div class="umar-r10 uw-70 ut-r">供应商:</div>
				<input class="uinp" name="supplierId" id="supplierId" type="hidden">
                <input class="uinp" id="supplierName" name="supplierName" type="text" maxlength="50" readonly="readonly">
                <div class="uinp-more" onclick="selectSupplier()">...</div>
			</div>
			<!-- <div class="ub ub-ac umar-l40">
                <div class="umar-r10 uw-60 ut-r">经营方式:</div>
                <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" name="saleWay" id="saleWay_1" value="A"><label for="status_1">购销 </label>
                </div>
                <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" name="saleWay" id="saleWay_2" value="B"><label for="status_2">代销 </label>
                </div>
                <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" name="saleWay" id="saleWay_5" value="C"><label for="status_5">联营 </label>
                </div>
                <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" name="saleWay" id="saleWay_3" value="D"><label for="status_3">扣率代销</label>
                </div>
                <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" name="saleWay" id="saleWay_4" value="" checked="checked"><label for="status_4">全部</label>
                </div>
            </div> -->
		</div>
      	</form>
	    <div class="ub ub-f1  umar-t8 umar-b8">
			<table id="yueGYJXCList"></table>
		</div>
   </div>

</body>
</html>
