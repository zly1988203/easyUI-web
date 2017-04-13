<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>直送要货单-新增</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <!-- new java.util.Date().getTime()  -->
	<script src="${ctx}/static/js/views/deliver/deliverDy.js?v=1"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
<input type='hidden' id="deliverStatus" value="add">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
				<div class="ubtns-item" onclick="addDeliverForm()">新增</div>
				<div class="ubtns-item" onclick="saveOrder()">保存</div>
				<div class="ubtns-item-disabled">审核</div>
				<div class="ubtns-item-disabled">终止</div>
				<div class="ubtns-item" onclick="selectGoods()">商品选择</div>
				<div class="ubtns-item init" onclick="suggestSelectGoods()">建议订货商品</div>
				<div class="ubtns-item" onclick="toImportproduct(0)">导入货号</div>
				<div class="ubtns-item" onclick="toImportproduct(1)">导入条码</div>
				<div class="ubtns-item-disabled">导出</div>
				<div class="ubtns-item-disabled">打印</div>
				<div class="ubtns-item-disabled">设置</div>
				<div class="ubtns-item" onclick="back()">关闭</div>
            </div>
        </div>
        <div class="ub umar-t8 uline"></div>
          <div class="ub umar-t10">
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-70 ut-r">要货机构:</div>
				<input type="hidden" name="targetBranchId" id="targetBranchId" class="uinp" value="${branchesGrow.targetBranchId}" />
				<input type="hidden" id="targetBranchType" name="targetBranchType"  value="${branchesGrow.targetBranchType}" />
				<input type="hidden" id="minAmount" name="minAmount" value="${branchesGrow.minAmount}"  />
				<input type="text" name="targetBranchName" id="targetBranchName"class="uinp  ub ub-f1" readonly="readonly" />
				<div class="uinp-more" onclick="selectTargetBranch()">...</div>
			</div>
			<div class="ub uw-330">&nbsp;</div>
			<div class="ub ub-ac uw-300  umar-l80">
				<div class="umar-r10 uw-80 ut-r">制单人员:</div>
				<div class="utxt"><%=UserUtil.getCurrentUser().getUserName()%></div>
			</div>
			<div class="ub ub-ac umar-l10">
				<div class="umar-r10 uw-60 ut-r">制单时间:</div>
				<div class="utxt" id="createTime"></div>
			</div>
		</div>
		<div class="ub umar-t8">
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-70 ut-r">发货机构:</div>
				<!--注意修改收货机构的name id-->
				<input type="hidden" name="sourceBranchId" id="sourceBranchId" class="uinp"  value="${branchesGrow.sourceBranchId}" />
				<input type="text" name="sourceBranchName" id="sourceBranchName"class="uinp  ub ub-f1" value="${branchesGrow.sourceBranchName}" readonly="readonly" />
				<div class="uinp-more" onclick="selectSourceBranch()">...</div>
			</div>
			<div class="ub ub-ac umar-l40">
                <div class="umar-r10 uw-60 ut-r">数量处理:</div>
                <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" name="numDeal" id="status_1" value="0"><label for="status_1">设置为建议订货数量 </label>
                </div>
                <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" name="numDeal" id="status_2" value="1"><label for="status_2">重新归零 </label>
                </div>
            </div>
			<div class="ub ub-ac uw-300 umar-l70">
				<div class="umar-r10 uw-80 ut-r">最后修改人:</div>
				<div class="utxt"></div>
			</div>
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-70 ut-r">修改时间:</div>
				<div class="utxt"></div>
			</div>
		</div>
		<div class="ub umar-t8">
			<div class="ub ub-ac uw-630">
				<div class="umar-r10 uw-70 ut-r">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</div>
				<input class="uinp ub ub-f1" type="text" id="remark" name="remark">
			</div>
			<div class="ub ub-ac uw-300 umar-l80">
				<div class="umar-r10 uw-80 ut-r">审核人员:</div>
				<div class="utxt"></div>
			</div>
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-70 ut-r">审核时间:</div>
				<div class="utxt"></div>
			</div>
		</div>
        <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="gridRequireOrder" ></table>
        </div>
    </div>

</body>
</html>