<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>新品销售分析</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/goods/newGoodsSaleAnalysis.js?1=1"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="purchaseTotalCx()">查询</div>
	                <input type="hidden" id="startCount" name="startCount" />
					<input type="hidden" id="endCount" name="endCount" />
	                <div class="ubtns-item" onclick="exportData()">导出</div>
	                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	             <!-- 引入时间选择控件 -->
	           <div class="ub ub-ac">
	            	<div class="umar-r10 uw-80 ut-r">日期:</div>
	       			<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	           </div>
            </div>
	        <div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
               	 <div class="ub ub-ac">
                 	<div class="umar-r10 uw-70 ut-r">店铺名称:</div>
                    <input class="uinp" type="hidden" id="branchId" name="branchId">
			        <input class="uinp" type="hidden" id="branchCompleCode" name="branchCompleCode">
			        <input class="uinp" type="text" id="branchName" name="branchName">
			        <div class="uinp-more" id="branchSelect" onclick="searchBranch()">...</div>
                 </div>
                 <div class="ub ub-ac umar-l40">
					<div class="umar-r10 uw-70 ut-r">货号/条码:</div>
					<input type="text" name="skuCodeOrBarCode" id="skuCodeOrBarCode" class="uinp" placeholder="输入货号、条码" maxlength="20"/>
				 </div>
                 <div class="ub ub-ac umar-l20">
					<div class="umar-r10 uw-60 ut-r">店铺类型:</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="branchesType" id="allType" value="-1" checked="checked"><label for="allType">所有 </label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="branchesType" id="OWN_STORE" value="3"><label for="OWN_STORE">直营店 </label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="branchesType" id="FRANCHISE_STORE_B" value="4"><label for="FRANCHISE_STORE_B">B加盟店 </label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="branchesType" id="FRANCHISE_STORE_C" value="5"><label for="FRANCHISE_STORE_C">C加盟店</label>
					</div>
				</div>
            </div>
            <div class="ub umar-t8">
	              <div class="ub ub-ac">
					  <div class="umar-r10 uw-70 ut-r">商品名称:</div>
					  <input type="text" name="skuName" id="skuName" class="uinp" placeholder="输入商品名称" maxlength="20"/>
				   </div>
				   <div class="ub ub-ac umar-l40">
					    <div class="umar-r10 uw-70 ut-r">商品类别:</div>
					    <input type="hidden" name="categoryCode" id="categoryCode" class="uinp" />
			        	<input type="text" name="categoryName" id="categoryName" class="uinp " readonly="readonly" maxlength="50" />
					    <div class="uinp-more" id="categorySelect" onclick="searchCategory()">...</div>
				   </div>
                   <div class="ub ub-ac  umar-l20">
	                    <div class="umar-r10 uw-30 ut-r">最近</div>
	                    <input class="uinp uw-30 easyui-numberbox" type="text" data-options="min:0" name="dayNum" id="dayNum" value="7">
	                    <div class="umar-l10  ut-r">天引入的商品视为新品</div>
	               </div> 
             </div>
       	</form>
        <div class="ub ub-f1 umar-t20">
			 <table id="newgoodsTotalAnalysi"></table>
		</div>
    </div>
</body>
</html>