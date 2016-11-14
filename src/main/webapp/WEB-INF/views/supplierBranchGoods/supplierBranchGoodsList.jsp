<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>供应商机构商品关系表</title>
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script  src="${ctx}/static/js/views/supplierBranchGoods/supplierBranchGoodsList.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
<div class="ub  ub-f1 umar-4 upad-4">
	<!--left-->
	<div class="ub ub-ver ubor" style="width:240px;">
	    <div class="upad-4">
            <input class="uinp ub ub-f1" id="supplierNameSearch" name="supplierName" value="" maxlength="30"  
            placeholder="供应商编码、名称" />
            <img style=" z-index:2; position: absolute;top: 10px;right: 40px;" src="${ctx}/static/images/search.png" width="20" onclick="searchTree()">
        </div>
		<div class="ub upad-4 ub-f1 uscroll">
			<div class="zTreeDemoBackground left">
				<ul id="treeArchives" class="ztree"></ul>
			</div>
		</div>
	</div><!--left end-->
	<div class="ub ub-ver ub-f1 upad-4">
		<div class="ub ub-ac">
			<div class="ubtns">
				<shiro:hasPermission name="JxcSupplierGoods:save">
					<button class="ubtns-item" onclick="saveItemHandel()">保存</button>
			   	</shiro:hasPermission>
			   	
				<shiro:hasPermission name="JxcSupplierGoods:selectGoods">
				<button class="ubtns-item" onclick="selectGoods()">选择商品</button>
			   	</shiro:hasPermission>
				
				<shiro:hasPermission name="JxcSupplierGoods:importProduct">
				<div class="ubtns-item" onclick="importShow(0)">导入货号</div>
			   	</shiro:hasPermission>
			   	
				<shiro:hasPermission name="JxcSupplierGoods:importByBarCode">
                <div class="ubtns-item" onclick="importShow(1)">导入条码</div>
			   	</shiro:hasPermission>
			   	
				<shiro:hasPermission name="JxcSupplierGoods:delete">
				<button class="ubtns-item" onclick="orderDelete()">删除</button>
			   	</shiro:hasPermission>
			   	
				<shiro:hasPermission name="JxcSupplierGoods:export">
				<button class="ubtns-item" onclick="exportHandel()">导出</button>
			   	</shiro:hasPermission>
			   	
				<button class="ubtns-item" onclick="toClose()">退出</button>
			</div>
		</div>
		<form action="" id="formList" method="post">
			 <div class="ub umar-t8">
			    <div class="ub  ub-ac umar-r40">
			      <!-- 供应商ID -->
                  <input class="uinp" name="supplierId" id="supplierId" value="" type="hidden">
                  <input class="uinp" name="supplierName" id="supplierName" value="" type="hidden">
                  <div class="umar-r10 uw-70 ut-r">机构名称:</div>
                  <input class="uinp ub ub-f1" type="hidden" id="branchId" name="branchId" value="${branchesGrow.branchesId}"/>
                  <input class="uinp ub ub-f1" type="hidden" id="brancheType" name="brancheType" value="${branchesGrow.type}"/>
                  <input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" value="${branchesGrow.branchName}" onclick="selectBranches()" readonly="readonly"/>
                  <div class="uinp-more" onclick="selectBranches()" >...</div>
	           </div>
	         </div>
		</form>
		<input type="hidden" id="selectBranchId" name="selectBranchId" />
		<div class="ub umar-t10 ub-f1">
			<table id="gridSupplierArchiveList" ></table>
		</div>
	</div>
	<!-- 导入弹框 -->
     <div class="uabs uatk">
     	<div class="ubtn uw-100 umar-10" onclick="exportTemp()" id="temple"></div>
     	<form id="uploadForm" method="post" enctype="multipart/form-data">
		<input type="hidden" name="type" id="uploadFormType">
         <div class="uacon">
			 <input class="uinp ub" id="filename" type="text" readonly="readonly">
			 <label class="ualable">选择文件
				 <input type="file" class="uafile" value=""  name="file" id="excelFile"/>
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