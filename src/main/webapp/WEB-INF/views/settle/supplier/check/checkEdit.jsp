<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>供应商对账</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/settle/supplier/check/check.js?V=2.6.0"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
    <script>
        var _comboV = '${checkVo.payType}';
    </script>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<input type='hidden' id="operateType" value="edit">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<div class="ubtns-item" onclick="addSupChkForm()">新增</div>
                <div class="ubtns-item" onclick="saveSupChkForm()">保存</div>
                <div class="ubtns-item" onclick="auditSupChkForm()">审核</div>
                <div class="ubtns-item" onclick="delSupChkAccount()">删除</div>
                <div class="ubtns-item" >导出明细</div>
                <div class="ubtns-item-disabled" >打印</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
         <div class="ub umar-t8 uc-black">【单号】:<span>${checkVo.formNo}</span></div>
        <div class="ub uline umar-t8"></div>
        <form id="checkForm">
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-296 umar-l10">
                <div class="umar-r10 uw-70 ut-r">机构:</div>
                <div class="ub ub-f1">
                    <input type="hidden" id="formId" name="id" value="${checkVo.id}"/>
                    <input type="hidden" id="branchId" name="branchId" value="${checkVo.branchId}"/>
                    <input type="hidden" id="branchCode" name="branchCode" value="${checkVo.branchCode}" />
                    <input class="uinp ub ub-f1" type="text" id="targetBranchName" readonly="readonly" value="[${checkVo.branchCode}]${checkVo.branchName}"/>
                </div>
                 <i class="ub ub-ac uc-red">*</i>
            </div>
            
            <div class="ub ub-ac uw-296 umar-l20">
				<div class="umar-r10 uw-70 ut-r">供应商:</div>
                <div class="ub ub-f1">
                	<input class="uinp" name="supplierId" id="supplierId" value="${checkVo.supplierId}" type="hidden">
					<input class="uinp ub ub-f1" readonly="readonly" id="supplierName" type="text" value="${checkVo.supplierName}" >
                </div>
                <i class="ub ub-ac uc-red">*</i>
            </div>
            
            <div class="ub ub-ac umar-l30">
                <div class="umar-r10 uw-70 ut-r">制单人:</div>
                <div class="utxt">${checkVo.createUserName}</div>
            </div>
            <div class="ub ub-ac umar-l50">
                <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                <div class="utxt" id="createTime"><fmt:formatDate value="${checkVo.createTime}" pattern="yyyy-MM-dd HH:mm"/></div>
            </div>
         </div>
         <div class="ub umar-t8">
             <div class="ub ub-ac uw-290 umar-l10">
                 <div class="umar-r10 uw-70 ut-r">开户银行:</div>
                 <input class="uinp ub ub-f1 uinp-no-more" type="text" id="openAccountBank" readonly='readonly'  name="openAccountBank" value="${checkVo.openAccountBank}" >
             </div>
             <div class="ub ub-ac uw-292 umar-l24">
             	   <div class="umar-r12 uw-70 ut-r">银行账号:</div>
                 <input class="uinp ub ub-f1 uinp-no-more " type="text" id="bankAccount" readonly='readonly'  name="bankAccount" value="${checkVo.bankAccount}" >
             </div>
             <div class="ub ub-ac umar-l28">
                 <div class="umar-r10 uw-80 ut-r">最后修改人:</div>
                 <div class="utxt">${checkVo.updateUserName}</div>
             </div>
             <div class="ub ub-ac umar-l50">
                 <div class="umar-r10 uw-60 ut-r">修改时间:</div>
                 <div class="utxt"><fmt:formatDate value="${checkVo.updateTime}" pattern="yyyy-MM-dd HH:mm"/></div>
             </div>
         </div>
         <div class="ub umar-t8">
             <div class="ub ub-ac uw-290 umar-l10">
                 <div class="umar-r10 uw-70 ut-r">办公地址:</div>
                 <input class="uinp ub ub-f1 uinp-no-more" type="text" id="officeAddress" readonly='readonly'  name="officeAddress" value="${checkVo.officeAddress}" >
             </div>
             <div class="ub ub-ac uw-312 umar-l4">
             	 <div class="umar-r10 uw-92 ut-r">国税登记号:</div>
                 <input class="uinp ub ub-f1 uinp-no-more " type="text" id="nationalTaxRegNum" readonly='readonly'  name="nationalTaxRegNum" value="${checkVo.nationalTaxRegNum}" >
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
	             <input class="uinp ub ub-f1 uinp-no-more" type="text" id="linkTel" readonly='readonly'  name="tel" value="${checkVo.phone}/${checkVo.mobile}" >
	         </div>
	         <div class="ub ub-ac uw-290 umar-l24">
             	 <div class="umar-r12 uw-70 ut-r">支付方式:</div>
                 <select class='uinp easyui-combobox' value="${checkVo.payType}" style="width:212px;" id="payType" name="payType">
<!--                  	<option value='1'>人民币付款</option> -->
<!--                  	<option value='2'>现金</option> -->
<!--                  	<option value='3'>支票</option> -->
<!--                  	<option value='4'>银行转账</option> -->
<!--                  	<option value='5'>支付宝</option> -->
<!--                  	<option value='6'>微信</option> -->
                 </select>
             </div>
         </div>
         <div class="ub umar-t8">
             <div class="ub ub-ac umar-l10 uw-600 " style="width:606px;" >
                 <div class="umar-r10 uw-70 ut-r">备注:</div>
                 <input class="uinp ub ub-f1" type="text" id="remark" maxlength="20"  name="remark" value="${checkVo.remark}" >
             </div>               
         </div>
         </form>
           <%--datagrid-edit--%>
           <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="supplierChkAccountAdd" ></table>
        </div>
    </div>

</body>
</html>
