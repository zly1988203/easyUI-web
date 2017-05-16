<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>商品引入</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
 
	<script src="${ctx}/static/js/views/goods/branchgoods/list.js"></script>
    <style>
    .ubtns .hide{display:none!important;}
    .show{display:block!important;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
      <div class="ub  ub-f1 umar-4 upad-4">
          <!--left start-->
		    <div class="ub ub-ver ubor">
		        <div class="upad-4">
		            <select id="goodsType" class="easyui-combobox uselect" data-options="editable:false"></select>
		        </div>
		        <div class="ubor-b "></div>
		        <div class="ub upad-4 ub-f1 uscroll">
		            <div class="zTreeDemoBackground left">
		                <ul id="treeArchives" class="ztree"></ul>
		            </div>
		        </div>
		    </div>
		   <!--left end-->
		   
     <div class="ub ub-ver ub-f1 upad-4">
    	<form id="queryForm" action="" method="post">
	        <div class="ub ub-ac">
	            <div class="ubtns">
	                <shiro:hasPermission name="JxcGoodsIntroduce:search">
	                 <div class="ubtns-item" onclick="query()">查询</div>
	                </shiro:hasPermission>
	                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <shiro:hasPermission name="JxcGoodsIntroduce:importBySkuCode">
	                  <div class="ubtns-item" onclick="toImportproduct(0)">导入货号</div>
					 <!--  <div class="ubtns-item" onclick="importShow(0)">导入货号</div> -->
					</shiro:hasPermission>
					
					<shiro:hasPermission name="JxcGoodsIntroduce:importByBarCode">
		            <div class="ubtns-item" onclick="toImportproduct(1)">导入条码</div>
	               <!--  <div class="ubtns-item" onclick="importShow(1)">导入条码</div> -->
	                </shiro:hasPermission>
	                 
	                 
	                 
	                <shiro:hasPermission name="JxcGoodsIntroduce:enabled">
	                <div class="ubtns-item ub-enable" id="important_div" onclick="enable()">引入</div>
	                </shiro:hasPermission>
	                
	                <shiro:hasPermission name="JxcGoodsIntroduce:eliminate">
	                   <div class="ubtns-item ub-eliminate" id="eliminate_div" onclick="eliminate()">淘汰</div>
	                </shiro:hasPermission>
	               <!--  <div class="ubtns-item ub-recovery" id="recovery_div" onclick="recovery()">恢复</div> -->
	            </div>
	        </div>
	        <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	                <!-- 隐藏类别编号 -->
	                <input class="uinp" name="categoryCode" id="categoryCode" type="hidden">
	                <input class="uinp" name="brandId" id="brandId" type="hidden">
	                <input class="uinp" name="supplierId" id="supplierId" type="hidden">
	                <input class="uinp" name="branchType" id="branchType" type="hidden">
	                
	                <div class="umar-r10 uw-60 ut-r">机构:</div>
	                <input class="uinp" name="branchId" id="branchId" type="hidden">
	                <input id="branchName" name="branchName" class="uinp"  type="text">
	                <div class="uinp-more" onclick="selectBranch()">...</div>
	            </div>
	            <div class="ub ub-ac umar-r40 ">
	                <div class="umar-r10 uw-60 ut-r">商品过滤:</div>
	                <div class="ub ub-ac umar-r10  checkstatue">
	                    <label for="status_0"><input class="radioItem" type="radio" name="status" value="0" id="status_0" />机构已有商品</label>
	                </div>
	                <div class="ub ub-ac umar-r10 checkstatue">
	                    <label for="status_1"><input class="radioItem" type="radio" name="status" value="1" id="status_1" checked="checked"/>机构未引入商品</label>
	                </div>
	                <div class="ub ub-ac umar-r10 checkstatue">
	                    <label for="status_2"><input class="radioItem" type="radio" name="status" value="2" id="status_2"/>所有</label>
	                </div>
					<input type="hidden"  id="status_3" value="1">
	        </div>
	        <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">条码:</div>
	                <input class="uinp" name=barCode id="barCode" type="text">
	            </div>
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">货号:</div>
	                <input class="uinp" name=skuCode id="skuCode" type="text">
	            </div>
	           	<div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">商品名称:</div>
	                <input class="uinp" name="skuName" id="skuName" type="text">
	            </div>
	        </div>
        </form>
        <div class="ub umar-t8 ub-f1">
            <table id="gridOrders"></table>
        </div>
       </div>

    </div>
</body>
</html>