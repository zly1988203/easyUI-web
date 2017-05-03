<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>商品查询</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/goods/goodsReport.js"></script>
</head>
<body class="uw  ufs-14 upad-8 uc-black box-border">
    <div class="ub uh ub-f1 ">
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
		<form id="queryForm" method="post">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="query()">查询</div>
					<!-- <div class="ubtns-item" onclick="printReport()">打印</div> -->
					<div class="ubtns-item" onclick="exportData()">导出</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
					<div class="ubtns-item" onclick="resetFrom()">重置</div>
				</div>
			</div>
			
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
				     <!-- 隐藏类别 -->
					<input type="hidden" name="startCount" id="startCount" class="uinp" />
					<input type="hidden" name="endCount" id="endCount" class="uinp" />
					
					<input type="hidden" name="categoryCode" id="categoryCode" class="uinp" />
					<div class="umar-r10 uw-60 ut-r">机构:</div>
					<input type="text" name="branchName" id="branchName" class="uinp" value="${branchesGrow.branchName}" maxlength="50"/>
					<input type="hidden" name="branchId" id="branchId" value="${branchesGrow.branchesId}">
					<div class="uinp-more" onclick="searchBranch()">...</div>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">货号:</div>
					<input type="text" name="skuCode" id="skuCode" class="uinp" placeholder="输入货号、条码" maxlength="20"/>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">品牌:</div>
					<input type="text" name="brandName" id="brandName" class="uinp" maxlength="50" onblur="brandAutoComple()" onkeyup="brandAutoComple()" />
					<input type="hidden" name="brandId" id="brandId" class="uinp" maxlength="50" />
					<div class="uinp-more" onclick="searchBind()">...</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">零售价:</div>
					<select style="height: 32px;" name="operater" id="operater">
							<option value="0">等于</option>
							<option value="1">大于</option>
							<option value="2">大于等于</option>
							<option value="3">小于</option>
							<option value="4">小于等于</option>
					</select> 
					<input type="text" maxlength = "10" name="operaterNum" id="operaterNum" class="uinp" style="width: 124px;" />
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">商品名称:</div>
					<input type="text" name="skuName" id="skuName" class="uinp" maxlength="50"/>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">供应商:</div>
					<input type="text" name="supplierName" id="supplierName" class="uinp" maxlength="50" onblur="supplierAutoComple()" onkeyup="supplierAutoComple()"/>
					<input type="hidden" name="supplierId" id="supplierId" class="uinp" maxlength="50"/>
					<div class="uinp-more" onclick="searchSupplier()">...</div>
				</div>
				
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">经营方式:</div>
					<select name="saleWay" id="saleWay" class="uselect" style="width: 204px;">
                        <option value="">全部</option>
                        <c:forEach items="${saleWayList}" var="i">
                            <option value="${i.name}">${i.value}</option>
                        </c:forEach>
                    </select>
				</div>
			</div>
			
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">商品类型:</div>
					<select name="type" id="type" class="uselect" style="width: 204px;">
                        <option value="">全部</option>
                        <c:forEach items="${goodsType}" var="type">
                            <option value="${type.name}">${type.value}</option>
                        </c:forEach>
					</select> 
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">计价方式:</div>
					<select name="pricingType" id="pricingType" class="uselect" style="width: 204px;">
                        <option value="">全部</option>
                        <c:forEach items="${pricingType}" var="pricingType">
                            <option value="${pricingType.name}">${pricingType.value}</option>
                        </c:forEach>
                    </select>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">直送商品:</div>
					<select name="fastDeliver" id="fastDeliver" class="uselect" style="width: 204px;">
                        <option value="">全部</option>
                        <option value="1">直送商品</option>
                        <option value="0">常规商品</option>
                    </select>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">商品状态:</div>
					<select name="status" id="status" class="uselect" style="width: 204px;">
                        <option value="">全部</option>
                        <option value="NORMAL">正常</option>
                        <option value="STOPSELLING">停售</option>
                        <option value="STOPBUYING">停购</option>
                    </select>
				</div>
			</div>
		</form>
		 <div class="ub ">&nbsp;</div>
		 <div class="ub ub-f1">
		 	<table id="goodsTab"></table>
		 </div>
	 </div>
	</div>
</body>
</html>