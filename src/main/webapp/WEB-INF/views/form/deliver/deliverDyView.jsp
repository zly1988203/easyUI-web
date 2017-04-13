<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>要货单-查看</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/deliver/deliverDyView.js"></script>
	<script src="${ctx}/static/js/views/deliver/deliverExport.js"></script>
    <%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<input type="hidden" id="close" value="${close}"/>
            	<shiro:hasPermission name="JxcDeliverDY:add">
            		<div class="ubtns-item" id="addButton" onclick="addDeliverForm()">新增</div>
            	</shiro:hasPermission>
            	<shiro:hasPermission name="JxcDeliverDY:terminate">
            		<div class="ubtns-item" onclick="stop()">终止</div>
            	</shiro:hasPermission>
            	<shiro:hasPermission name="JxcDeliverDY:print">
            		<div class="ubtns-item" onclick="printChoose('DY','/form/deliverForm/')">打印</div>
            	</shiro:hasPermission>
            	<div class="ubtns-item"  onclick="exportData('DY','gridViewRequireOrder')">导出明细</div>
            	<div class="ubtns-item"  onclick="exportData('DY','gridViewRequireOrder',1)">导出货号</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
<!--                 <div class="ubtns-item" onclick="addDeliverForm()">新增</div> -->
<!-- 				<div class="ubtns-item-disabled" >保存</div> -->
<!-- 				<div class="ubtns-item-disabled" >审核</div> -->
<!-- 				<div class="ubtns-item-disabled" >终止</div> -->
<!-- 				<div class="ubtns-item-disabled" >商品选择</div> -->
<!-- 				<div class="ubtns-item-disabled init" >建议订货商品</div> -->
<!-- 				<div class="ubtns-item-disabled" >导入货号</div> -->
<!-- 				<div class="ubtns-item-disabled" >导入条码</div> -->
<!-- 				<div class="ubtns-item" onclick="delDeliverForm()">删除</div> -->
<!-- 				<div class="ubtns-item"  onclick="exportData('DY','gridViewRequireOrder')">导出明细</div> -->
<!--             	<div class="ubtns-item"  onclick="exportData('DY','gridViewRequireOrder',1)">导出货号</div> -->
<!-- 				<div class="ubtns-item" onclick="printChoose('DY','/form/deliverForm/')">打印</div> -->
<!-- 				<div class="ubtns-item-disabled">设置</div> -->
<!-- 				<div class="ubtns-item" onclick="toClose()">关闭</div> -->
            </div>
        </div>
        <div class="ub umar-t8 uc-black">【单号】:${form.formNo}</div>
        <div class="ub uline umar-t8"></div>
        <input type="hidden" id="formId" value="${form.deliverFormId}">
        <input type="hidden" id="formNo" value="${form.formNo}">
        <input type="hidden" id="type" value="${type}">
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-300">
                <div class="umar-r10 uw-60 ut-r">要货机构:</div>
                <div class="ub">
                    <input class="uinp" name="targetBranchId" id="targetBranchId" type="hidden" value="${form.targetBranchId}">
                    <input class="uinp" id="targetBranchName" name="targetBranchName" type="text" readonly="readonly" value="${form.targetBranchName}" />
                    <div class="uinp-more"></div>
                </div>
            </div>
            <div class="ub uw-330">&nbsp;</div>
            <div class="ub ub-ac uw-300  umar-l80">
				<div class="umar-r10 uw-80 ut-r">制单人员:</div>
				<div class="utxt">${form.createUserName}</div>
			</div>
            <div class="ub ub-ac umar-l10">
				<div class="umar-r10 uw-60 ut-r">制单时间:</div>
				<div class="utxt" id="createTime"<fmt:formatDate value="${form.createTime}" pattern="yyyy-MM-dd HH:mm"/>></div>
			</div>
        </div>
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-300 ">
                <div class="umar-r10 uw-60 ut-r">发货机构:</div>
                <div class="ub">
                    <input class="uinp" name="sourceBranchId" id="sourceBranchId" type="hidden" value="${form.sourceBranchId}">
                    <input class="uinp" id="sourceBranchName" name="sourceBranchName" type="text" readonly="readonly"  value="${form.sourceBranchName}">
                    <div class="uinp-more" ></div>
                </div>
            </div>
<!--             <div class="ub ub-ac umar-l40"> -->
<!--                 <div class="umar-r10 uw-60 ut-r">数量处理:</div> -->
<!--                 <div class="ub ub-ac umar-r10"> -->
<!--                     <input class="radioItem" type="radio" name="numDeal" id="status_1" value="0"><label for="status_1">设置为建议订货数量 </label> -->
<!--                 </div> -->
<!--                 <div class="ub ub-ac umar-r10"> -->
<!--                     <input class="radioItem" type="radio" name="numDeal" id="status_2" value="1"><label for="status_2">重新归零 </label> -->
<!--                 </div> -->
<!--             </div> -->
            <div class="ub ub-ac uw-300 umar-l70">
				<div class="umar-r10 uw-420 ut-r">最后修改人:</div>
				<div class="utxt"></div>
			</div>
			<div class="already-examine" id="already-examine"><span>${status}</span></div>
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-410 ut-r">修改时间:</div>
				<div class="utxt"></div>
			</div>
        </div>
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-630">
				<div class="uw-60 umar-r10 ut-r">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</div>
				<input class="uinp ub ub-f1" type="text" id="remark" name="remark" value="${form.remark}" readonly="readonly" >
			</div>
			<div class="ub ub-ac uw-300 umar-l80">
				<div class="umar-r10 uw-80 ut-r">审核人员:</div>
				<div class="utxt">${form.validUserName}</div>
			</div>
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-70 ut-r">审核时间:</div>
				<div class="utxt"><fmt:formatDate value="${form.validTime}" pattern="yyyy-MM-dd HH:mm"/></div>
			</div>
        </div>
        <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="gridViewRequireOrder" ></table>
        </div>
    </div>
	
</body>
</html>