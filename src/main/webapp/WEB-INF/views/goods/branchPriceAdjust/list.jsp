<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>档案-机构调价单</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/goods/branchPriceAdjust/list.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 upad-8">
		<form action="" class="umar-t12" id="searchForm" method="post">
        <div class="ub ub-ac">
            <!--buttons-->
            <div class="ubtns">
                <div class="ubtns-item" onclick="modifyPriceOrderCx();">查询</div>
            <shiro:hasPermission name="JxcBranchPriceAdjust:append">
				<div class="ubtns-item" onclick="addModifyDataGrid();">新增</div>
            </shiro:hasPermission>
            <shiro:hasPermission name="JxcBranchPriceAdjust:delete">
	            <div class="ubtns-item" onclick="delModifyPriceDialog();">删除</div>
	        </shiro:hasPermission>
	            <div class="ubtns-item" onclick="gFunRefresh()">设置</div>
	            <div class="ubtns-item" onclick="window.parent.closeTab()">关闭</div>
            </div>
			<div class="ub">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">日期:</div>
					<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
				</div>
			</div>
        </div>
        <div class="ub umar-t8 uc-black"></div>
        <div class="ub uline umar-t8"></div>
        <div class="ub ub-ver ub-f1 ">
	            <div class="ub umar-t8">
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r" >机构:</div>
	                    <input class="uinp ub ub-f1" name="branchId" type="hidden" id="branchId" value="${branchId }">
	                    <input class="uinp ub ub-f1" name="branchCode" type="hidden" id="branchCode" value="${branchCode }">
	                    <input class="uinp ub ub-f1" name="oldBranchName" type="hidden" id="oldBranchName" value="${branchName }">
	                    <input class="uinp ub ub-f1"  type="text" id="branchName" name="branchName" value="${branchName }">
	                    <div class="uinp-more" onclick="selectBranch();">...</div>
	                </div>
	                <div class="ub ub-ac uw-300 umar-l20">
	                    <div class="umar-r10 uw-70 ut-r">制单人:</div>
	                    <input class="uinp ub ub-f1" name="createUserId"  id="createUserId" type="hidden" >
	                    <input class="uinp ub ub-f1"  type="hidden"  id="oldCreateUserName" name="oldCreateUserName">
	                    <input class="uinp ub ub-f1"  type="text" name="createUserName" id="createUserName">
	                    <div class="uinp-more" onclick="selectOperator();">...</div>
	                </div>
	                
	            </div>
	            <div class="ub umar-t8">
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r">单号:</div>
	                    <input class="uinp" name="formNo" type="text">
	                </div>
	                <!--input-checkbox-->
	                <div class="ub ub-ac uw-300 umar-l20">
	                    <div class="umar-r10 uw-70 ut-r">审核状态:</div>
	                    <div class="ub ub-ac umar-r10">
	                         <label><input class="radioItem" type="radio" value="0" name="status" checked="checked"/><span>未审核</span></label>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                         <label><input class="radioItem" type="radio" value="1" name="status"/><span>审核</span></label>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                         <label><input class="radioItem"  type="radio" value="" name="status"/><span>全部</span></label>
	                    </div>
	                </div>
           		 </div>
        </div>
		</form>
		<div class="ub umar-t8 umar-b8">【单据信息】</div>
		<div class="ub ub-f1">
			<table id="branchPriceAdjustGrid"></table>
		</div>
    </div>
</body>
</html>