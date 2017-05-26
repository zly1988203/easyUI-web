<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>供应商结算</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/settle/supplier/settle/settle.js?V=2.6.0"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<input type='hidden' id="pageStatus" value="add">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<div class="ubtns-item" onclick="addSupAcoSetForm()">新增</div>
                <div class="ubtns-item" onclick="saveSupAcoSet()">保存</div>
                <div class="ubtns-item-disabled">审核</div>
                <div class="ubtns-item-disabled">删除</div>
                <div class="ubtns-item-disabled">导出明细</div>
                <div class="ubtns-item-disabled">打印</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub uline umar-t8"></div>
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-288 umar-l20">
                <div class="umar-r10 uw-70 ut-r">机构:</div>
                <div class="ub ub-f1">
                    <input type="hidden" id="branchId" name="branchId"/>
                    <input type="hidden" id="branchCode" name="branchCode"/>
                    <input class="uinp ub ub-f1" type="text" id="targetBranchName" readonly="readonly" onclick="selectBranches()" />
                    <div class="uinp-more" onclick="selectBranches()">...</div>
                </div>
                 <i class="ub ub-ac uc-red">*</i>
            </div>
            
            <div class="ub ub-ac uw-290 umar-l20">
				<div class="umar-r12 uw-70 ut-r">供应商:</div>
                <div class="ub ub-f1">
                	<input class="uinp" name="supplierId" id="supplierId"type="hidden">
					<input class="uinp ub ub-f1" readonly="readonly" id="supplierName" type="text"  onclick="selectSupplier()">
					<div class="uinp-more" onclick="selectSupplier()">...</div>
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
             <div class="ub ub-ac uw-280 umar-l20">
                 <div class="umar-r10 uw-70 ut-r">开户银行:</div>
                 <input class="uinp ub ub-f1 uinp-no-more" type="text" id="bankName" readonly='readonly'  name="bankName">
             </div>
             <div class="ub ub-ac uw-284 umar-l28">
             	   <div class="umar-r12 uw-70 ut-r">银行账号:</div>
                 <input class="uinp ub ub-f1 uinp-no-more " type="text" id="bankNum" readonly='readonly'  name="bankNum">
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
             <div class="ub ub-ac uw-280 umar-l20">
                 <div class="umar-r10 uw-70 ut-r">办公地址:</div>
                 <input class="uinp ub ub-f1 uinp-no-more" type="text" id="workPlace" readonly='readonly'  name="workPlace">
             </div>
             <div class="ub ub-ac uw-304 umar-l8">
             	 <div class="umar-r10 uw-92 ut-r">国税登记号:</div>
                 <input class="uinp ub ub-f1 uinp-no-more " type="text" id="gtaxNum" readonly='readonly'  name="gtaxNum">
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
	         <div class="ub ub-ac uw-280 umar-l20">
	             <div class="umar-r10 uw-70 ut-r">联系方式:</div>
	             <input class="uinp ub ub-f1 uinp-no-more" type="text" id="tel" readonly='readonly'  name="tel">
	         </div>
	         <div class="ub ub-ac uw-290 umar-l28">
             	 <div class="umar-r12 uw-70 ut-r">支付方式:</div>
                 <select class='uinp easyui-combobox' data-options="editable:false" style="width:204px;">
                 	<option value='1'>人民币付款</option>
                 	<option value='2'>现金</option>
                 	<option value='3'>支票</option>
                 	<option value='4'>银行转账</option>
                 	<option value='5'>支付宝</option>
                 	<option value='6'>微信</option>
                 </select>
             </div>
             <div class="ub ub-ac uw-300 umar-l12">
             	 <div class="umar-r10 uw-90 ut-r">优惠金额汇总:</div>
             	 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="coupon" readonly='readonly'  name="coupon">
             </div>
         </div>
         
         <div class="ub umar-t8">
	         <div class="ub ub-ac uw-300 ">
	             <div class="umar-r10 uw-90 ut-r">应付金额汇总:</div>
	             <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="yfmoney" readonly='readonly'  name="yfmoney">
	         </div>
	         <div class="ub ub-ac uw-300 umar-l10">
	             <div class="umar-r10 uw-90 ut-r">已付金额汇总:</div>
	             <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="yfedmoney" readonly='readonly'  name="yfedmoney">
	         </div>
             <div class="ub ub-ac uw-300 umar-l20">
             	 <div class="umar-r10 uw-90 ut-r">未付金额汇总:</div>
             	 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="wfmoney" readonly='readonly'  name="wfmoney">
             </div>
             <div class="ub ub-ac uw-300 umar-l24">
             	 <div class="umar-r10 uw-90 ut-r">实付金额汇总:</div>
             	 <input class="uinp easyui-numberbox" data-options="min:0,precision:2" value="0" type="text" value="0.00" id="wfmoney"  name="wfmoney">
             </div>
         </div>
         
         <div class="ub umar-t8">
             <div class="ub ub-ac umar-l20 uw-600 " style="width:908px;" >
                 <div class="umar-r10 uw-70 ut-r">备注:</div>
                 <input class="uinp ub ub-f1" type="text" id="remark" maxlength="20"  name="remark">
             </div>               
         </div>
           <%--datagrid-edit--%>
           <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="supplierChkAccountAdd" ></table>
        </div>
    </div>

</body>
</html>
