<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>供应商对账</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/settle/supplier/check/check.js?V=2.6.1"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
    <script>
        var _comboV = '';
    </script>
</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<input type='hidden' id="operateType" value="add">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<shiro:hasPermission name="JxcSupplierChain:add">
            	<div class="ubtns-item" onclick="addSupChkForm()">新增</div>
            	</shiro:hasPermission>
                <div class="ubtns-item" onclick="saveSupChkForm()">保存</div>
                <div class="ubtns-item-disabled">审核</div>
                <div class="ubtns-item-disabled">删除</div>
                <div class="ubtns-item-disabled" >导出明细</div>
                <div class="ubtns-item-disabled" >打印</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub uline umar-t8"></div>
        <form id="checkForm">
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-296 umar-l10" id="branchComponent">
                <div class="umar-r10 uw-70 ut-r">机构:</div>
                <div class="ub ub-f1">
                    <input type="hidden" id="branchId" name="branchId"/>
                    <input type="hidden" id="branchCode" name="branchCode"/>
                    <input type="hidden" id="isContainChildren" name="isContainChildren"/>
                    <input type="hidden" id="branchCompleCode" name="branchCompleCode"/>
                    <input class="uinp ub ub-f1" type="text" id="targetBranchName" readonly="readonly"/>
                    <div class="uinp-more">...</div>
                </div>
                 <i class="ub ub-ac uc-red">*</i>
            </div>
            
            <div class="ub ub-ac uw-296 umar-l20" id="supplierComponent">
				<div class="umar-r10 uw-70 ut-r">供应商:</div>
                <div class="ub ub-f1">
                	<input class="uinp" name="supplierId" id="supplierId"type="hidden">
					<input class="uinp ub ub-f1 " readonly="readonly" id="supplierName" type="text">
					<div class="uinp-more">...</div>
                </div>
                <i class="ub ub-ac uc-red">*</i>
            </div>
            
            <div class="ub ub-ac umar-l30">
                <div class="umar-r10 uw-70 ut-r">制单人:</div>
                <div class="utxt"><%=UserUtil.getCurrentUser().getUserName() %></div>
            </div>
            <div class="ub ub-ac umar-l50">
                <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                <div class="utxt" id="createTime"></div>
            </div>
         </div>
         <div class="ub umar-t8">
             <div class="ub ub-ac uw-290 umar-l10">
                 <div class="umar-r10 uw-70 ut-r">开户银行:</div>
                 <input class="uinp ub ub-f1 uinp-no-more" type="text" id="openAccountBank" readonly='readonly'  name="openAccountBank">
             </div>
             <div class="ub ub-ac uw-292 umar-l24">
             	   <div class="umar-r12 uw-70 ut-r">银行账号:</div>
                 <input class="uinp ub ub-f1 uinp-no-more " type="text" id="bankAccount" readonly='readonly'  name="bankAccount">
             </div>
             <div class="ub ub-ac umar-l28">
                 <div class="umar-r10 uw-80 ut-r">最后修改人:</div>
                 <div class="utxt"></div>
             </div>
             <div class="ub ub-ac umar-l50">
                 <div class="umar-r10 uw-60 ut-r">修改时间:</div>
                 <div class="utxt"></div>
             </div>
         </div>
         <div class="ub umar-t8">
             <div class="ub ub-ac uw-290 umar-l10">
                 <div class="umar-r10 uw-70 ut-r">办公地址:</div>
                 <input class="uinp ub ub-f1 uinp-no-more" type="text" id="officeAddress" readonly='readonly'  name="officeAddress">
             </div>
             <div class="ub ub-ac uw-312 umar-l4">
             	 <div class="umar-r10 uw-92 ut-r">国税登记号:</div>
                 <input class="uinp ub ub-f1 uinp-no-more " type="text" id="nationalTaxRegNum" readonly='readonly'  name="nationalTaxRegNum">
             </div>
             <div class="ub ub-ac umar-l40">
                 <div class="umar-r10 uw-70 ut-r">审核人员:</div>
                 <div class="utxt"></div>
             </div>
             <div class="ub ub-ac umar-l50">
                 <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                 <div class="utxt"></div>
             </div>
         </div>
         <div class="ub umar-t8">
	         <div class="ub ub-ac uw-290 umar-l10">
	             <div class="umar-r10 uw-70 ut-r">联系方式:</div>
                 <input type="hidden" id="phone" name="phone">
                 <input type="hidden" id="mobile" name="mobile">
	             <input class="uinp ub ub-f1 uinp-no-more" type="text" id="linkTel" readonly='readonly'  name="tel">
	         </div>
	         <div class="ub ub-ac uw-290 umar-l24">
             	 <div class="umar-r12 uw-70 ut-r">支付方式:</div>
                 <select class='uinp easyui-combobox' style="width:212px;" id="payType" name="payType" data-options="valueField:'id',textField:'label',loadFilter:loadFilter,url:'${ctx}/archive/financeCode/getDictListByTypeCode?dictTypeCode=101003',editable:false" >
                 </select>
             </div>
         </div>
         <div class="ub umar-t8">
             <div class="ub ub-ac umar-l10 uw-600 " style="width:606px;" >
                 <div class="umar-r10 uw-70 ut-r">备注:</div>
                 <input class="uinp ub ub-f1" type="text" id="remark" maxlength="20"  name="remark">
             </div>               
         </div>
         </form>
           <%--datagrid-edit--%>
    <from id="gridFrom" class="ub ub-ver ub-f1 umar-t8">
    <table id="supplierChkAccountAdd" ></table>
    </from>

    </div>

</body>
</html>
