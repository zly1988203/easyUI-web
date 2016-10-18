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
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
    	<form id="queryForm">
	        <div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="query()">查询</div>
	                <div class="ubtns-item" onclick="resetForm()">重置</div>
	                <div class="ubtns-item" onclick="importShow(0)">条码导入</div>
					<div class="ubtns-item" onclick="importShow(1)">货号导入</div>
	                <shiro:hasPermission name="JxcGoodsIntroduce:enabled">
	                <div class="ubtns-item ub-enable hide" id="important_div" onclick="enable()">启用</div>
	                </shiro:hasPermission>
	                
	                <shiro:hasPermission name="JxcGoodsIntroduce:eliminate">
	                   <div class="ubtns-item ub-eliminate" id="eliminate_div" onclick="eliminate()">淘汰</div>
	                </shiro:hasPermission>
	               <!--  <div class="ubtns-item ub-recovery" id="recovery_div" onclick="recovery()">恢复</div> -->
	            </div>
	        </div>
	        <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">机构:</div>
	                <input class="uinp" name="branchId" id="branchId" type="hidden">
	                <input id="branchName" name="branchName" class="uinp" readonly="readonly" type="text" onclick="selectBranch()" >
	                <div class="uinp-more" onclick="selectBranch()">...</div>
	            </div>
	            <div class="ub ub-ac umar-r40 ">
	                <div class="umar-r10 uw-60 ut-r">商品过滤:</div>
	                <div class="ub ub-ac umar-r10  checkstatue">
	                    <label for="status_0"><input class="ub radioItem" type="radio" name="status" value="0" id="status_0" checked="checked"/>机构已有商品</label>
	                </div>
	                <div class="ub ub-ac umar-r10 checkstatue">
	                    <label for="status_1"><input class="ub radioItem" type="radio" name="status" value="1" id="status_1"/>机构未引入商品</label>
	                </div>
	                <div class="ub ub-ac umar-r10 checkstatue">
	                    <label for="status_2"><input class="ub radioItem" type="radio" name="status" value="2" id="status_2"/>所有</label>
	                </div>
	            </div>
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

 <!-- 导入弹框 -->
     <div class="uabs uatk">
     	<div class="uatit">导入文件选择</div>
     	<form id="uploadForm" method="post" enctype="multipart/form-data">
     	<input type="hidden" name="branchId" id="uploadFormBranchId">
		<input type="hidden" name="type" id="uploadFormType">
         <div class="uacon">
			 <input class="uinp ub" id="filename" type="text">
			 <label class="ualable">选择文件
				 <input type="file" class="uafile" value=""  name="file" id="excelFile" />
			 </label>
		 </div>
         <div class="uabtns ">
     	 	<button class="uabtn umar-r30" onclick="importListHandel()">导入</button>
     	 	<div class="uabtn" onclick="importClose()" >取消</div>
     	 </div>
     	 </form>
     </div>
    </div>
</body>
</html>