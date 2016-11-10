<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>销售流水</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/report/cash/saleFlowReport.js"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">

    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	            <shiro:hasPermission name="JxcSaleFlow:search">
	                <div class="ubtns-item" onclick="query()">查询</div>
	            </shiro:hasPermission>
	            <shiro:hasPermission name="JxcSaleFlow:print">
	                <div class="ubtns-item" onclick="printReport()">打印</div>
	            </shiro:hasPermission>
	            <shiro:hasPermission name="JxcSaleFlow:export">
	                <div class="ubtns-item" onclick="exportExcel()">导出</div>
	            </shiro:hasPermission>
	              	<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	            
	           	<!-- 引入时间选择控件 -->
	            <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
            </div>
	           
	        <div class="ub umar-t8 uc-black">【销售流水】</div>
	        <div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
                <div class="ub  ub-ac">
                   <div class="umar-r10 uw-70 ut-r">店铺:</div>
	                    <input class="uinp ub ub-f1" type="hidden" id="branchCode" name="branchCode">
                        <input class="uinp ub ub-f1" type="text" id="branchNameOrCode" name="branchNameOrCode" onblur="cleanBranchCode();">
                   <div class="uinp-more" onclick="searchBranch()">...</div>
                </div>
                <div class="ub ub-ac  umar-l20">
                    <div class="umar-r10 uw-70 ut-r">商品名称:</div>
                    <input class="uinp ub ub-f1" type="text" name="skuName" id="skuName">
                </div>  
            </div>
            
	        <div class="ub umar-t8">
                <div class="ub  ub-ac">
                    <div class="umar-r10 uw-70 ut-r">单号:</div>
                    <input class="uinp" type="text" name="orderNo" id="orderNo">
                </div>
                <div class="ub ub-ac  umar-l20">
                    <div class="umar-r10 uw-70 ut-r">货号/条码:</div>
                    <input class="uinp ub ub-f1" type="text" name="skuCode" id="skuCode">
                </div>  
            </div>
            
           <div class="ub umar-t8">
               <div class="ub uselectw ub-ac">
                    <div class="umar-r10  uw-70 ut-r">业务类型:</div>
				        <select class="easyui-combobox uselect" name="businessType" id="businessType" data-options="editable:false">
				            <option value="" selected="selected">全部</option>
				            <option value="A">销售</option>
				            <option value="B">退货</option>
				        </select>
                </div>
                <div class="ub ub-ac  uselectw umar-l20">
                    <div class="umar-r10 uw-70 ut-r">订单类型:</div>
                       <!--select-->
				        <select class="easyui-combobox   uselect" name="orderType" id="orderType" data-options="editable:false">
				            <option value="" selected="selected">全部</option>
				            <option value="0">APP</option>
				            <option value="1">微信</option>
				            <option value="2">POS</option>
				        </select>
                </div> 
                  <!--  <div class="ub ub-ac uselectw  umar-l20">
                    <div class="umar-r10 uw-70 ut-r">统计方式:</div>
                       select
				        <select class="easyui-combobox uselect" name="statisType" id="statisType" data-options="editable:false">
				            <option value="" selected="selected">全部</option>
				            <option value="2">已完成</option>
				            <option value="2">未完成</option>
				        </select>
                </div> -->
            </div>
       	</form>
       	
        <div class="ub ub-f1 umar-t20">
			 <table id="marketWater"></table>
		</div>
    </div>
</body>
</html>