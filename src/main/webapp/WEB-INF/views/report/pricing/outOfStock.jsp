<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>配送缺货率分析</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/report/pricing/outOfStock.js"></script>
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
	                <div class="ubtns-item" onclick="exportExcel()">导出</div>
	            </shiro:hasPermission>
	              	<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	            	<div class="ubtns-item" onclick="window.parent.closeTab()">退出</div>
	            </div>
	           	<!-- 引入时间选择控件 -->
	             <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
            </div>
	        <div class="ub uline umar-t8"></div>
	       	
	       	<div class="ub umar-t8">
	            <div class="ub ub-ac umar-l20">
	                <div class="umar-r10 uw-70 ut-r">查询类型:</div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="ub radioItem" type="radio" name="type" id="deal0" value="0" checked="checked"/><label for="deal0">明细表 </label>
	                </div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="ub radioItem" type="radio" name="type" id="deal2" value="1"/><label for="deal2">汇总表</label>
	                </div>
	            </div>
	        </div>
	        
	        <div class="ub umar-t8">
                <div class="ub  ub-ac umar-l20">
                   <div class="umar-r10 uw-70 ut-r">要货机构:</div>
	                    <input class="uinp ub ub-f1" type="hidden" id="targetBranchId" name="targetBranchId">
                        <input class="uinp ub ub-f1" type="text" id="targetBranchName" readonly="readonly" name="targetBranchName" onblur="cleanBranchCode();">
                   <div class="uinp-more" onclick="searchBranch(0)">...</div>
                </div>
                
                <div class="ub  ub-ac umar-l20">
                   <div class="umar-r10 uw-70 ut-r">发货机构:</div>
	                    <input class="uinp ub ub-f1" type="hidden" id="sourceBranchId" name="sourceBranchId">
                        <input class="uinp ub ub-f1" type="text" id="sourceBranchName" readonly="readonly" name="sourceBranchName" onblur="cleanBranchCode();">
                   <div class="uinp-more uinp-sourceName"  onclick="searchBranch(1)">...</div>
                </div>
                
                <div class="ub  ub-ac umar-l20">
                    <div class="umar-r10 uw-70 ut-r">单据编号:</div>
                    <input class="uinp" type="text" name="formNo" id="formNo">
                </div>
                
          </div> 
                         
          <div class="ub umar-t8">
          		<div class="ub ub-ac umar-l20">
                    <div class="umar-r10 uw-70 ut-r">商品名称:</div>
                    <input class="uinp ub ub-f1" type="text" name="skuName" id="skuName">
               </div> 
              
               <div class="ub ub-ac umar-l20">
                    <div class="umar-r10 uw-70 ut-r">货号/条码:</div>
                    <input class="uinp ub ub-f1" type="text" name="skuCode" id="skuCode">
               </div>  
              
               <div class="ub  ub-ac">
                   <div class="ub ub-ac umar-l20">
						<div class="umar-r10 uw-70 ut-r">商品类别:</div>
						<input id="goodsCategoryId" name="goodsCategoryId" class="uinp" type="hidden"> 
						<input id="categoryCode" name="categoryCode" class="uinp" type="hidden"> 
					    <input id="categoryName" name="categoryName" class="uinp" type="text" readonly="readonly" data-options="required:true">
						<div class="uinp-more new-right" onclick="getGoodsType()">...</div>
					</div>
               </div>
       	</div>
     </form>
       	
        <div class="ub ub-f1 umar-t20">
			 <table id="marketWater"></table>
		</div>
    </div>
</body>
</html>