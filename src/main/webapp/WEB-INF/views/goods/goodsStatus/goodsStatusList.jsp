<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>商品状态查询</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/goods/goodsStatus/list.js"></script>
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
		<form id="queryForm" method="post">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="query()">查询</div>
					<!-- <div class="ubtns-item" onclick="printReport()">打印</div> -->
					
					<div class="ubtns-item importbtn" id="importSkuCode" onclick="importHandel(0,this)">导入货号</div>
                    <div class="ubtns-item importbtn" id="importBarCode" onclick="importHandel(1,this)">导入条码</div>
					<div class="ubtns-item" id="btn_stop01" onclick="update(0,this)">停购</div>
					<div class="ubtns-item" id="btn_stop02" onclick="update(1,this)">停售</div>
					<div class="ubtns-item" id="btn_weedout01" onclick="update(2,this)">淘汰</div>
					<div class="ubtns-item" id="btn_weedout02" onclick="outGuide(this)">淘汰向导</div>
					<div class="ubtns-item" id="btn_stopout" onclick="stopGuide(this)">停购向导</div>
					<div class="ubtns-item-disabled" id="recover" onclick="update(3,this)">恢复</div>
                                        <div class="ubtns-item" onclick="resetFrom()">重置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>
			</div>
			
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
				     <!-- 隐藏类别 -->
					<input type="hidden" name="startCount" id="startCount" class="uinp" />
					<input type="hidden" name="endCount" id="endCount" class="uinp" />
					
					<input type="hidden" name="categoryCode" id="categoryCode" class="uinp" />
					<div class="umar-r10 uw-60 ut-r">机构:</div>
					<input type="text" name="branchName" id="branchName" class="uinp" value="${branchName}" maxlength="50"/>
					<input type="hidden"  id="oldBranchName" value="${branchName}">
					<input type="hidden" name="branchCode" id="branchCode" value="${branchCode}">
					<input type="hidden" name="branchId" id="branchId" value="${branchId}">
					<div class="uinp-more" onclick="searchBranch()">...</div>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-80 ut-r">货号/条码:</div>
					<input type="text" name="skuBarCode" id="skuBarCode" class="uinp" placeholder="输入货号、条码" maxlength="20"/>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">商品名称:</div>
					<input type="text" name="skuName" id="skuName" class="uinp" maxlength="50"/>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-70 ut-r">商品状态:</div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub radioItem" type="radio" name="status" id="status" value="0" checked="checked"/><span>正常</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub radioItem" type="radio" name="status" id="status" value="2" /><span>停购</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                       <input class="ub radioItem" type="radio" name="status" id="status" value="1" /><span>停售</span>
	                    </div>
	                     <div class="ub ub-ac umar-r10">
	                       <input class="ub radioItem" type="radio" name="status" id="status" value="3" /><span>淘汰</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub radioItem" type="radio" name="status" id="status" value=""  /><span>全部</span>
	                    </div>
				</div>
			</div>
		</form>
		 <div class="ub ">&nbsp;</div>
		 <div class="ub ub-f1">
		 	<table id="goodsStatus"></table>
		 </div>
	 </div>
	</div>
	
	<!-- 淘汰向导 选择页面 -->	
	<div id="outGuideDailog" class="easyui-dialog" title="淘汰向导" style="width:520px;height:280px;" data-options="modal:true,buttons:'#outGdBtn'">
		<div class="ub ub-ver upad-10 ufs-14">
			<div class="ub ub-ver upad-l20 ">
			    <div class="ub ub-ac umar-t10">
			      <c:if test="${branchType == 1 || branchType == 0}">
					<div class="ut-r umar-r10">范围:</div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="ub radioItem" type="radio" name="guideType"  value=0 checked="checked"/><span>当前机构</span>
	                </div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="ub radioItem" type="radio" name="guideType" value=1 /><span>所有自营店</span>
	                </div>
	                <div class="ub ub-ac umar-r10">
	                   <input class="ub radioItem" type="radio" name="guideType" value=2 /><span>所有加盟店</span>
	                </div>
	                </c:if>
				</div>
				<div class="ub ub-ac umar-t10 ">
	                <input class="ub radioItem umar-r8" type="radio" name="guideChoose"  value=0 checked="checked"/><span>选择已经停购，且库存为0的商品。</span>
				</div>
				<div class="ub ub-ac umar-t10 ">
	                <input class="ub radioItem umar-r8" type="radio" name="guideChoose"  value=1 /><span>选择主档已经停购或淘汰且库存为0的商品。</span>
				</div>
				<div class="ub ub-ac umar-t10 ">
	                <input class="ub radioItem umar-r8" type="radio" name="guideChoose"  value=2 />选择
	                <input class="uinp easyui-numberbox" data-options="min:1,max:999,value:15"  style="width:100px;" id="guideDatew" name="guideDate" type="text" > 天内未产生销售，且库存为0的商品。
				</div>
			</div>
			
			<div class="ub ub-ac ub-pe umar-t30">
				<div class="ubtns">
					<div class="ubtns-item" onClick="checkOutGuide()">确定</div>
					<div class="ubtns-item" onClick="closeOutGuideDialog()">取消</div>
				</div>
			</div>
			<div class="ub uc-red umar-t8">注：每次最多只能筛选1000条商品数据。</div>
		</div>
	</div>
	
	<!-- 停购向导 选择页面 -->	
	<div id="stopGuideDailog" class="easyui-dialog" title="停购向导" style="width:520px;height:270px;" data-options="modal:true,buttons:'#outGdBtn'">
		<div class="ub ub-ver upad-10 ufs-14">
			<div class="ub ub-ver upad-l20 umar-t10">
			    <div class="ub ub-ac">
			      <c:if test="${branchType == 1 || branchType == 0}">
					<div class="ut-r umar-r8">范围:</div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="ub radioItem" type="radio" name="stGuideType"  value="0" checked="checked"/><span>当前机构</span>
	                </div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="ub radioItem" type="radio" name="stGuideType" value="2" /><span>所有自营店</span>
	                </div>
	                <div class="ub ub-ac umar-r10">
	                   <input class="ub radioItem" type="radio" name="stGuideType" value="1" /><span>所有加盟店</span>
	                </div>
	                </c:if>
				</div>
				<div class="ub ub-ac umar-t10 ">
	                <input class="ub radioItem umar-r8" type="radio" name="stGuideChoose"  value="0" />
	                                                选择
	                <input class="uinp easyui-numberbox umar-l4" data-options="min:1,max:999,value:15" style="width:100px;" id="stGuideDate" name="stGuideDate" type="text" > 
	                                                天内销售数量小于
	                <input class="uinp easyui-numberbox umar-l4" data-options="min:1,max:999,value:5" style="width:100px;" id="stGuideNum" name="stGuideNum" type="text">
					的商品。
				</div>
				<div class="ub ub-ac umar-t10 ">
	                <input class="ub radioItem umar-r8" type="radio" name="stGuideChoose"  value="1" /><span>选择主档已经停购或淘汰的商品。</span>
				</div>
			</div>
			
			<div class="ub ub-ac ub-pe umar-t30">
				<div class="ubtns">
					<div class="ubtns-item" onClick="checkStopGuide()">确定</div>
					<div class="ubtns-item" onClick="closeStopGuideDialog()">取消</div>
				</div>
			</div>
			<div class="ub uc-red umar-t8">注：每次最多只能筛选1000条商品数据。</div>
		</div>
	</div>
	
</body>
</html>