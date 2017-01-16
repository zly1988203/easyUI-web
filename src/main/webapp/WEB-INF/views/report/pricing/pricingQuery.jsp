<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>调价查询</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/pricing/pricingQuery.js"></script>
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
	                <div class="ubtns-item" onclick="queryForm()">查询</div>
	            </shiro:hasPermission>
	            <shiro:hasPermission name="JxcSaleFlow:export">
	            	<input type="hidden" id="startCount" name="startCount" />
					<input type="hidden" id="endCount" name="endCount" />
	                <div class="ubtns-item" onclick="exportData()">导出</div>
	            </shiro:hasPermission>
	              	<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	            	<div class="ubtns-item" onclick="window.parent.closeTab()">退出</div>
	            </div>
	           	<!-- 引入时间选择控件 -->
	             <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
            </div>
	        <div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
                <div class="ub  ub-ac">
                   <div class="umar-r10 uw-70 ut-r">店铺名称:</div>
	                    <input class="uinp ub ub-f1" type="hidden" id="branchCode" name="branchCode">
                        <input class="uinp ub ub-f1" type="text" id="branchName"  name="branchName">
                   <div class="uinp-more" onclick="searchBranch()">...</div>
                </div>
                <div class="ub ub-ac  umar-l20">
                    <div class="umar-r10 uw-70 ut-r">货号/条码:</div>
                    <input class="uinp ub ub-f1" type="text" name="skuCode" id="skuCode">
                </div>  
                <div class="ub  ub-ac">
                    <div class="umar-r10 uw-70 ut-r">单据编号:</div>
                    <input class="uinp" type="text" name="formNO" id="formNO">
                </div>
            </div>
            
           <div class="ub umar-t8">
                 <div class="ub  ub-ac">
                  <div class="umar-r10 uw-70 ut-r">审核人:</div>
                    <input class="uinp ub ub-f1" type="hidden" id="createUserId" name="createUserId">
                       <input class="uinp ub ub-f1" type="text" id="createUserName"  name="createUserName">
                  <div class="uinp-more" onclick="selectOperator()">...</div>
               </div>
                <div class="ub ub-ac  uselectw umar-l20">
                    <div class="umar-r10 uw-70 ut-r">是否生效:</div>
                       <!--select-->
				        <select class="easyui-combobox   uselect" name="isEffected" id="isEffected" data-options="editable:false">
				            <option value="" selected="selected">全部</option>
				            <option value="0">未生效</option>
				            <option value="1">生效</option>
				        </select>
                </div> 
            </div>
       	</form>
       	
        <div class="ub ub-f1 umar-t20">
			 <table id="marketWater"></table>
		</div>
    </div>
</body>
</html>