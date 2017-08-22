<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>物流系统商品条码导出</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/logistics/goodsBarcode.js?V=${versionNo}"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">

    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
					<shiro:hasPermission name="JxcGoodsBarcodeLogis:search">
						<div class="ubtns-item" onclick="query()">查询</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcGoodsBarcodeLogis:export">
						<div class="ubtns-item" onclick="exportData()">导出</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="resetForm()">重置</div>
					<div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
            </div>
	        <div class="ub umar-t8">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-60 ut-r">机构:</div>
						<input type="text" name="branchName" id="branchName" class="uinp" maxlength="50"/>
						<input type="hidden" name="branchId" id="branchId">
					<div class="uinp-more" onclick="searchBranch()">...</div>
				</div>
                <div class="ub ub-ac">
                    <div class="umar-r10 uw-70 ut-r">关键字:</div>
                    <input type="hidden" name="startCount" id="startCount" value="">
                    <input type="hidden" name="endCount" id="endCount" value="">
                    <input type="text" name="skuCode" id="skuCode" class="uinp" placeholder="输入编号、条码进行查询" maxlength="20"/>
                </div>

            </div>
       	</form>
       	
        <div class="ub ub-f1 umar-t20">
			 <table id="dataList"></table>
		</div>
    </div>
</body>
</html>