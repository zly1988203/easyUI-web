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
	<input type='hidden' id="supplierAdvMoneyStatus" value="add">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<div class="ubtns-item" onclick="addSupJonAccount()">新增</div>
                <div class="ubtns-item" onclick="saveSupJonAccount()">保存</div>
                <div class="ubtns-item-disabled">审核</div>
                <div class="ubtns-item">计算账款</div>
                <div class="ubtns-item-disabled" onclick="delSupJonAccount()" >删除</div>
                <div class="ubtns-item-disabled" >导出</div>
                <div class="ubtns-item-disabled" >打印</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub uline umar-t8"></div>
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-320 umar-l10">
                <div class="umar-r10 uw-100 ut-r">机构:</div>
                <div class="ub ub-f1">
                    <input type="hidden" id="targetBranchId" name="targetBranchId"/>
                    <input class="uinp ub ub-f1" type="text" id="targetBranchName" readonly="readonly" onclick="selectBranches()" />
                    <div class="uinp-more" onclick="selectBranches()">...</div>
                </div>
            </div>
            <div class="ub ub-ac uw-320 umar-l20">
				<div class="umar-r10 uw-100 ut-r">供应商:</div>
                <div class="ub ub-f1">
                	<input class="uinp" name="supplierId" id="supplierId"type="hidden">
					<input class="uinp ub ub-f1" readonly="readonly" id="supplierName" type="text"  onclick="selectSupplier()">
					<div class="uinp-more" onclick="selectSupplier()">...</div>
                </div>
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
               <div class="ub ub-ac uw-320 umar-l10">
                   <div class="umar-r10 uw-100 ut-r">联系人:</div>
                   <input class="uinp ub ub-f1 uinp-no-more" type="text" id="linkman" readonly='readonly'  name="linkman">
               </div>
               <div class="ub ub-ac uw-320 umar-l20">
               	   <div class="umar-r10 uw-100 ut-r">联系电话:</div>
                   <input class="uinp ub ub-f1 uinp-no-more " type="text" id="linkTel" readonly='readonly'  name="linkTel">
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-80 ut-r">最后修改人:</div>
                   <div class="utxt"></div>
               </div>
               <div class="ub ub-ac umar-l50">
                   <div class="umar-r10 uw-60 ut-r">修改时间:</div>
                   <div class="utxt"></div>
               </div>
           </div>
           <div class="ub umar-t8">
           		<div class="ub ub-ac uw-310 umar-l20">
           			<div class="umar-r10 uw-90 ut-r">计算时间:</div>
           			<input id="actStartTime" class="Wdate ub ub-f1" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true,maxDate:'#F{$dp.$D(\'actEndTime\');}'})" />
           				&nbsp;至&nbsp;
           			<input id="actEndTime" class="Wdate ub ub-f1" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true,minDate:'#F{$dp.$D(\'actStartTime\');}'})" />
           		</div>
           		<div class="ub ub-ac uw-320 umar-l20">
           			<div class="umar-r10 uw-100 ut-r">付款日期:</div>
	                <div class="ub ub-f1">
	                   <input id="payMoneyTime" class="Wdate ub ub-f1" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" pattern="yyyy-MM-dd"/>
	                </div>
           		</div>
           		<div class="ub ub-ac umar-l30">
                   <div class="umar-r10 uw-70 ut-r">审核人员:</div>
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
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="saleAmount" readonly="readonly"   name="saleAmount">
           		</div>
           		<div class="ub ub-ac uw-330 umar-l10">
           			<div class="umar-r10 uw-110 ut-r">供应商货款:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="suppayMoney" readonly="readonly"   name="suppayMoney">
           		</div>
           		<div class="ub ub-ac uw-320">
           			<div class="umar-r10 uw-100 ut-r">保底金额:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="minmoney"  readonly="readonly"  name="othermoney">
           		</div>	
           		<div class="ub ub-ac uw-320">
           			<div class="umar-r10 uw-100 ut-r">汇总税额:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="actualmoney" readonly="readonly"  name="actualmoney">
           		</div>
           </div>
           <div class="ub umar-t8">
           		<div class="ub ub-ac uw-330">
           			<div class="umar-r10 uw-110 ut-r">供应商承担比例:</div>
           			 <input class="uinp easyui-numberbox" style="width:200px" value="100" data-options="min:0,precision:2" type="text" id="supratio"   name="supratio">%
           		</div>
           		<div class="ub ub-ac uw-330 umar-l10">
           			<div class="umar-r10 uw-110 ut-r">供应商承担税额:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text" value="0.00" id="taxamount" readonly="readonly"   name="taxamount">
           		</div>
           		<div class="ub ub-ac uw-320">
           			<div class="umar-r10 uw-100 ut-r">其他扣款:</div>
           			 <input class="uinp easyui-numberbox" style="width:210px" value="0.00" data-options="min:0,precision:2"  type="text" id="othermoney"   name="othermoney">
           		</div>	
           		<div class="ub ub-ac uw-320">
           			<div class="umar-r10 uw-100 ut-r">实际应付款:</div>
           			 <input class="uinp ub ub-f1 uinp-no-more" type="text"  value="0.00" id="actualmoney" readonly="readonly"   name="actualmoney">
           		</div>
           </div>
           
           <div class="ub umar-t8">
               <div class="ub ub-ac umar-l40 uw-500 " style='width:1270px;'>
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp ub ub-f1" type="text" id="remark" maxlength="20"  name="remark">
               </div>               
           </div>
           <%--datagrid-edit--%>
           <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="supplierJonAccountAdd" ></table>
        </div>
    </div>

</body>
</html>
