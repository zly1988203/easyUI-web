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
            	<div class="ubtns-item" onclick="addChainForm()">新增</div>
                <div class="ubtns-item" onclick="saveChainForm()">保存</div>
                <div class="ubtns-item-disabled">审核</div>
                <div class="ubtns-item" onclick="initChainFormDetail()">计算账款</div>
                <div class="ubtns-item-disabled" onclick="delSupJonAccount()" >删除</div>
                <div class="ubtns-item-disabled" >导出</div>
                <div class="ubtns-item-disabled" >打印</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub uline umar-t8"></div>
        <input type="hidden" id="oldTime">
        <form id="chainForm" class="ub uw ub-ver">
        <input type='hidden' id="operateType" name="operateType" value="add">
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-328 umar-l10">
                <div class="umar-r10 uw-100 ut-r">机构:</div>
                <div class="ub ub-f1">
                    <input type="hidden" id="branchId" name="branchId"/>
                    <input type="hidden" id="branchCode" name="branchCode"/>
                    <input type="hidden" id="isContainChildren" name="isContainChildren"/>
                    <input type="hidden" id="branchCompleCode" name="branchCompleCode"/>
                    <input class="uinp ub ub-f1" type="text" id="targetBranchName" readonly="readonly" onclick="selectBranches()" />
                    <div class="uinp-more" onclick="selectBranches()">...</div>
                </div>
                <i class="ub ub-ac uc-red">*</i>
            </div>
            <div class="ub ub-ac uw-328 umar-l12">
				<div class="umar-r10 uw-100 ut-r">供应商:</div>
                <div class="ub ub-f1">
                	<input class="uinp" name="supplierId" id="supplierId"type="hidden">
					<input class="uinp ub ub-f1" readonly="readonly" id="supplierName" type="text"  onclick="selectSupplier()">
					<div class="uinp-more" onclick="selectSupplier()">...</div>
                </div>
                <i class="ub ub-ac uc-red">*</i>
            </div>
            
            <div class="ub ub-ac umar-l24">
                <div class="umar-r10 uw-70 ut-r">制单人:</div>
                <div class="utxt"><%=UserUtil.getCurrentUser().getUserName() %></div>
            </div>
            <div class="ub ub-ac umar-l50">
                <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                <div class="utxt" id="createTime"></div>
            </div>
         </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-320 umar-l10">
                   <div class="umar-r10 uw-100 ut-r">联系人:</div>
                   <input class="uinp ub ub-f1 uinp-no-more" type="text" id="supplierContcat" readonly='readonly'  name="supplierContcat">
               </div>
               <div class="ub ub-ac uw-320 umar-l20">
               	   <div class="umar-r10 uw-100 ut-r">联系电话:</div>
                   <input type="hidden" id="supplierPhone" name="supplierPhone">
                   <input type="hidden" id="supplierMobile" name="supplierMobile">
                   <input class="uinp ub ub-f1 uinp-no-more " type="text" id="linkTel" readonly='readonly'  name="linkTel">
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-80 ut-r">修改人:</div>
                   <div class="utxt"></div>
               </div>
               <div class="ub ub-ac umar-l50">
                   <div class="umar-r10 uw-60 ut-r">修改时间:</div>
                   <div class="utxt"></div>
               </div>
           </div>
           <div class="ub umar-t8">
           		<div class="ub ub-ac uw-316 umar-l20">
           			<div class="umar-r10 uw-90 ut-r">计算时间:</div>
           			<input id="beginDate" name="beginDate" class="Wdate ub ub-f1" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true,maxDate:'#F{$dp.$D(\'endDate\');}'})" />
           				&nbsp;至&nbsp;
           			<input id="endDate" name="endDate" class="Wdate ub ub-f1" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true,minDate:'#F{$dp.$D(\'beginDate\');}'})" />
           			<i class="ub ub-ac uc-red">*</i>
           		</div>
           		<div class="ub ub-ac uw-328 umar-l12">
           			<div class="umar-r10 uw-100 ut-r">付款日期:</div>
	                <div class="ub ub-f1">
	                   <input id="payMoneyTime" name = "payTime" class="Wdate ub ub-f1" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" pattern="yyyy-MM-dd"/>
	                </div>
	                <i class="ub ub-ac uc-red">*</i>
           		</div>
           		<div class="ub ub-ac umar-l24">
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
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="sumSaleAmount" readonly="readonly"   name="sumSaleAmount">
           		</div>
           		<div class="ub ub-ac uw-330 umar-l10">
           			<div class="umar-r10 uw-110 ut-r">供应商货款:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="sumSupplierAmount" readonly="readonly"   name="sumSupplierAmount">
           			 <input type="hidden" id="divideAmount">
           		</div>
           		<div class="ub ub-ac uw-320">
           			<div class="umar-r10 uw-100 ut-r">保底金额:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="supplierMinAmount"  readonly="readonly"  name="supplierMinAmount">
           		</div>	
           		<div class="ub ub-ac uw-320">
           			<div class="umar-r10 uw-100 ut-r">汇总税额:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="sumTaxAmount" readonly="readonly"  name="sumTaxAmount">
           		</div>
           </div>
           <div class="ub umar-t8">
           		<div class="ub ub-ac uw-330">
           			<div class="umar-r10 uw-110 ut-r">供应商承担比例:</div>
           			 <input class="uinp easyui-numberbox" style="width:210px" value="100" data-options="min:0,precision:2,suffix:'%',onChange:changeRate" type="text" id="supplierRate"   name="supplierRate">
           		</div>
           		<div class="ub ub-ac uw-330 umar-l10">
           			<div class="umar-r10 uw-110 ut-r">供应商承担税额:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="supplierTaxAmount" readonly="readonly"   name="supplierTaxAmount">
           		</div>
           		<div class="ub ub-ac uw-320">
           			<div class="umar-r10 uw-100 ut-r">其他扣款:</div>
           			 <input class="uinp easyui-numberbox" style="width:210px" value="0.00" data-options="min:0,precision:2,onChange:changeOtAmount"  type="text" id="otherAmount"   name="otherAmount">
           		</div>	
           		<div class="ub ub-ac uw-320">
           			<div class="umar-r10 uw-100 ut-r">实际应付款:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text"  value="0.00" id="actualAmount" readonly="readonly"   name="actualAmount">
           		</div>
           </div>
           
           <div class="ub umar-t8">
               <div class="ub ub-ac umar-l40 uw-500 " style='width:630px;'>
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp ub ub-f1" type="text" id="remark" maxlength="20"  name="remark">
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
