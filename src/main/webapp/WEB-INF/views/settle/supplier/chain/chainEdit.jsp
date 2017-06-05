<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>联营账款单</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/settle/supplier/chain/chain.js?V=2.6.0"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<shiro:hasPermission name="JxcSupplierChain:add">
            	<div class="ubtns-item" onclick="addChainForm()">新增</div>
            	</shiro:hasPermission>
                <div class="ubtns-item" onclick="saveChainForm()">保存</div>
                <shiro:hasPermission name="JxcSupplierChain:audit">
                <div class="ubtns-item" onclick="auditChargeForm()" >审核</div>
                </shiro:hasPermission>
                <div class="ubtns-item" onclick="initChainFormDetail()">计算账款</div>
                <shiro:hasPermission name="JxcSupplierChain:delete">
                <div class="ubtns-item" onclick="delChainForm()" >删除</div>
                </shiro:hasPermission>
                <shiro:hasPermission name="JxcSupplierChain:exportDetail">
                <div class="ubtns-item" onclick="exportOrder()" >导出明细</div>
                </shiro:hasPermission>
                <div class="ubtns-item-disabled" >打印</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub umar-t8 uc-black">【单号】:<span>${chainVo.formNo}</span></div>
        <div class="ub uline umar-t8"></div>
        <input type="hidden" id="oldTime" value="${chainVo.beginDate}${chainVo.endDate}">
        <form id="chainForm">
        <input type='hidden' id="operateType" name="operateType" value="edit">
        <input type='hidden' id="formId" name="id" value="${chainVo.id}">
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-320 umar-l10">
                <div class="umar-r10 uw-100 ut-r">机构:</div>
                <div class="ub ub-f1">
                    <input type="hidden" id="branchId" name="branchId" value="${chainVo.branchId}" />
                    <input type="hidden" id="branchCode" name="branchCode" value="${chainVo.branchCode}"/>
                    <input class="uinp ub ub-f1" type="text" id="targetBranchName"  value="${chainVo.branchName}" readonly="readonly" />
                </div>
            </div>
            <div class="ub ub-ac uw-320 umar-l20">
				<div class="umar-r10 uw-100 ut-r">供应商:</div>
                <div class="ub ub-f1">
                	<input class="uinp" name="supplierId" id="supplierId" value="${chainVo.supplierId}" type="hidden">
					<input class="uinp ub ub-f1" readonly="readonly" id="supplierName" value="${chainVo.supplierName}" type="text" >
                </div>
            </div>
            <div class="ub ub-ac umar-l30">
                <div class="umar-r10 uw-70 ut-r">制单人:</div>
                <div class="utxt">${chainVo.createUserName}</div>
            </div>
            <div class="ub ub-ac umar-l50">
                <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                <div class="utxt" id="createTime"><fmt:formatDate value="${chainVo.createTime}" pattern="yyyy-MM-dd HH:mm"/></div>
            </div>
         </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-320 umar-l10">
                   <div class="umar-r10 uw-100 ut-r">联系人:</div>
                   <input class="uinp ub ub-f1 uinp-no-more" type="text" id="supplierContcat" readonly='readonly' value="${chainVo.supplierContcat}"  name="supplierContcat">
               </div>
               <div class="ub ub-ac uw-320 umar-l20">
               	   <div class="umar-r10 uw-100 ut-r">联系电话:</div>
                   <input type="hidden" id="supplierPhone" name="supplierPhone" value="${chainVo.supplierPhone}" >
                   <input type="hidden" id="supplierMobile" name="supplierMobile" value="${chainVo.supplierMobile}">
                   <input class="uinp ub ub-f1 uinp-no-more " type="text" id="linkTel" readonly='readonly' value="${chainVo.supplierPhone}/${chainVo.supplierMobile}"  name="linkTel">
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-80 ut-r">最后修改人:</div>
                   <div class="utxt">${chainVo.updateUserName}</div>
               </div>
               <div class="ub ub-ac umar-l50">
                   <div class="umar-r10 uw-60 ut-r">修改时间:</div>
                   <div class="utxt"><fmt:formatDate value="${chainVo.updateTime}" pattern="yyyy-MM-dd HH:mm"/></div>
               </div>
           </div>
           <div class="ub umar-t8">
           		<div class="ub ub-ac uw-310 umar-l20">
           			<div class="umar-r10 uw-90 ut-r">计算时间:</div>
           			<input id="beginDate" name="beginDate" value="${chainVo.beginDate}" class="Wdate ub ub-f1" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true,maxDate:'#F{$dp.$D(\'endDate\')||dateUtil.getCurrDayPreOrNextDay(\'prev\',1)}'})" />
           				&nbsp;至&nbsp;
           			<input id="endDate" name="endDate" value="${chainVo.endDate}" class="Wdate ub ub-f1" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true,minDate:'#F{$dp.$D(\'beginDate\')}',maxDate:'%y-%M-{%d-1}'})" />
           		</div>
           		<div class="ub ub-ac uw-320 umar-l20">
           			<div class="umar-r10 uw-100 ut-r">付款日期:</div>
	                <div class="ub ub-f1">
	                   <input id="payMoneyTime" name = "payTime" value="${chainVo.payTime}" class="Wdate ub ub-f1" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" pattern="yyyy-MM-dd"/>
	                </div>
           		</div>
           		<div class="ub ub-ac umar-l30">
                   <div class="umar-r10 uw-70 ut-r">审核人:</div>
                   <div class="utxt"></div>
               </div>
               <div class="ub ub-ac umar-l50">
                   <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                   <div class="utxt"></div>
               </div>
           </div>
           <div class="ub umar-t8">
           		<div class="ub ub-ac uw-330">
           			<div class="umar-r10 uw-110 ut-r">销售金额:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text"  value="${chainVo.sumSaleAmount}" id="sumSaleAmount" readonly="readonly"   name="sumSaleAmount">
           		</div>
           		<div class="ub ub-ac uw-330 umar-l10">
           			<div class="umar-r10 uw-110 ut-r">供应商货款:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="${chainVo.sumSupplierAmount}" id="sumSupplierAmount" readonly="readonly"   name="sumSupplierAmount">
           			 <input type="hidden" id="divideAmount">
           		</div>
           		<div class="ub ub-ac uw-320">
           			<div class="umar-r10 uw-100 ut-r">保底金额:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="${chainVo.supplierMinAmount}" id="supplierMinAmount"  readonly="readonly"  name="supplierMinAmount">
           		</div>	
           		<div class="ub ub-ac uw-320">
           			<div class="umar-r10 uw-100 ut-r">汇总税额:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="${chainVo.sumTaxAmount}" id="sumTaxAmount" readonly="readonly"  name="sumTaxAmount">
           		</div>
           </div>
           <div class="ub umar-t8">
           		<div class="ub ub-ac uw-330">
           			<div class="umar-r10 uw-110 ut-r">供应商承担比例:</div>
           			 <input class="uinp easyui-numberbox" style="width:210px" value="${chainVo.supplierRate}" data-options="min:0,precision:2,suffix:'%',onChange:changeRate" type="text" id="supplierRate"   name="supplierRate">
           		</div>
           		<div class="ub ub-ac uw-330 umar-l10">
           			<div class="umar-r10 uw-110 ut-r">供应商承担税额:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="${chainVo.supplierTaxAmount}" id="supplierTaxAmount" readonly="readonly"   name="supplierTaxAmount">
           		</div>
           		<div class="ub ub-ac uw-320">
           			<div class="umar-r10 uw-100 ut-r">其他扣款:</div>
           			 <input class="uinp easyui-numberbox" style="width:210px" value="${chainVo.otherAmount}" data-options="min:0,precision:2,onChange:changeOtAmount"  type="text" id="otherAmount"   name="otherAmount">
           		</div>	
           		<div class="ub ub-ac uw-320">
           			<div class="umar-r10 uw-100 ut-r">实际应付款:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text"  value="${chainVo.actualAmount}" id="actualAmount" readonly="readonly"   name="actualAmount">
           		</div>
           </div>
           
           <div class="ub umar-t8">
               <div class="ub ub-ac umar-l40 uw-500 " style='width:1270px;'>
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp ub ub-f1" type="text" id="remark" value="${chainVo.remark}" maxlength="20"  name="remark">
               </div>               
           </div>
           </form>
           <%--datagrid-edit--%>
           <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="supChainAdd" ></table>
        </div>
    </div>

</body>
</html>
