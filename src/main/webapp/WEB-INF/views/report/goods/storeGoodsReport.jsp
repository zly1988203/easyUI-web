<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>商品库存查询</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/goods/storeGoodsReport.js?V=${versionNo}"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 upad-8">
		<form id="queryForm" method="post">
			<div class="ub ub-ac">
	            <!--buttons-->
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="query()">查询</div>
	                <div class="ubtns-item">打印</div>
	                <div class="ubtns-item" onclick="reset();">重置</div>
	                <div class="ubtns-item" onclick="exportData()">导出</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	        </div>
	        <div class="ub umar-t8 uc-black">【商品库存查询】</div>
	        <div class="ub uline umar-t8"></div>

        
			
          	<div class="ub umar-t8">
                <div class="ub ub-ac">
                	<div class="umar-r10 uw-70 ut-r">店铺:</div>
                	<input type="hidden" name="startCount" id="startCount" value="">
					<input type="hidden" name="endCount" id="endCount" value="">
                    <input class="uinp ub ub-f1" type="hidden" id="branchId" name="branchId">
                    <input class="uinp ub ub-f1" type="hidden" id="branchCode" name="branchCode">
                    <input class="uinp ub ub-f1" type="text" id="branchNameOrCode" name="branchNameOrCode" onblur="cleanBranchCode();">
                    <div class="uinp-more" onclick="searchBranch()">...</div>
                    
                </div>
                <div class="ub ub-ac uw-300 umar-l20">
                	<div class="umar-r10 uw-70 ut-r">货号/条码:</div>
                    <input class="uinp ub ub-f1" type="text" id="skuCode" name="skuCode" >
                </div>
                <div class="ub ub-ac uw-300 umar-l40">
                   <div class="umar-r10 uw-70 ut-r">库存大于:</div>
                   <input class="uinp" type="text" name="stockBegin" id="stockBegin">
                </div>
            </div>
            <div class="ub umar-t8">
                <div class="ub ub-ac">
                	<div class="umar-r10 uw-70 ut-r">商品名称:</div>
                    <input class="uinp" type="text" name="skuName" id="skuName">
                </div>
                <div class="ub ub-ac uw-300 umar-l20">
                	<div class="umar-r10 uw-70 ut-r">类别:</div>
                    <input class="uinp ub ub-f1" type="hidden" id="categoryCode" name="categoryCode"/>
                    <input class="uinp ub ub-f1" type="text" id="categoryNameCode" name="categoryNameOrCode" onblur="cleanCategoryCode();"/>
                    <div class="uinp-more" onclick="searchCategory()">...</div>
                </div>
                
                 <div class="ub ub-ac uw-300 umar-l40">
                    <div class="umar-r10 uw-70 ut-r">库存小于:</div>
                   <input class="uinp" type="text" name="stockEnd" id="stockEnd">
                </div>
                
               <!--  <div class="ub ub-ac uw-300 umar-l20">
                    <div class="umar-r10 uw-70 ut-r">商品名称:</div>
                    <input class="uinp" type="text" name="skuName" id="skuName">
                </div> -->
                <%-- <div class="ub ub-ac uselectw umar-l40">
                    <div class="umar-r10 uw-70 ut-r">商品状态:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" name="status" id="status" data-options="editable:false,onLoadSuccess:comboboxGoodsStatus">
				    			<option value="">全部</option> 
				           	<c:forEach items="${goodsStatus}" var="goodsStatus">
				    			<option value="${goodsStatus.ordinal}">${goodsStatus.value}</option> 
				    		</c:forEach>
				        </select>
                </div> --%>
            </div>
            
           <!--  <div class="ub umar-t8">
                <div class="ub ub-ac">
                	<div class="umar-r10 uw-70 ut-r">类别:</div>
                    <input class="uinp ub ub-f1" type="hidden" id="categoryCode" name="categoryCode"/>
                    <input class="uinp ub ub-f1" type="text" id="categoryNameCode" name="categoryNameOrCode" onblur="cleanCategoryCode();"/>
                    <div class="uinp-more" onclick="searchCategory()">...</div>
                    
                </div>
                <div class="ub ub-ac uw-300 umar-l20">
                   <div class="umar-r10 uw-70 ut-r">库存大于:</div>
                   <input class="uinp" type="text" name="stockBegin" id="stockBegin">
                </div>
                <div class="ub ub-ac uw-300 umar-l40">
                   <div class="umar-r10 uw-70 ut-r">库存小于:</div>
                   <input class="uinp" type="text" name="stockEnd" id="stockEnd">
                </div>
            </div> -->
            </form>

          	<div class="ub ub-f1 umar-t20">
          	   <!--datagrid-->
               <table id="productInquire"></table>
          	</div>
    </div>
</body>
</html>