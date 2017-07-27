<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>门店分组</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/branchManager/branchGroup.js?V=${versionNo}"></script>  
</head>
<body class="ub uw  ufs-14 uc-black box-border">
    <div class="ub ub-ver ub-f1  upad-8 box-border">
    	<form id="queryForm">
	        <div class="ub ub-ac">
	            <div class="ubtns">
					<div class="ubtns-item" onclick="query()">查询</div>
					<div class="ubtns-item" onclick="addStoreComp()">新增</div>
					<div class="ubtns-item" onclick="updateStoreComp()">编辑</div>
					<div class="ubtns-item" onclick="delStoreComp()">删除</div>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">关闭</div>
	            </div>
	        </div>
	        <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">关键字:</div>
	                <input class="uinp uninputs" name="groupInfo" id="groupInfo" type="text" placeholder="输入门店名称查询"> 
	            </div>
	        </div>
        </form>
		<div class="ub umar-t8">
			<table id="gridBranchComponentsList"></table>
		</div>
		<div class="ub  umar-t10 umar-b10">
			<div class="ub ub-ac">
				<span class="ubspan">机构信息:</span>
				<div class="ubtns">
					<div class="ubtns-item" onclick="saveBranchsView()">保存</div>
					<div class="ubtns-item" onclick="selectBranchs()">机构选择</div>
				</div>
			</div>
		</div>
		<div class="ub">
			<table id="gridBranchComponentsView"></table>
		</div>
    </div>
    
    <!-- 机构组合新增修改弹窗 -->
    <div id="branchDialog" >
    	<div class="uw uh ufs-14 uc-black none" id="branchDialog-area">
	    	<div class="ub ub-ver uw upad-4 box-border " >
	    		<div class="ub uw ">
	    			<div class="ubtns">
						<div class="ubtns-item" onclick="saveBranchComMsg()">保存</div>
		                <div class="ubtns-item" onclick="closeBranchComMsg()">关闭</div>
		            </div>
	    		</div>
	    		<div class="ub uline umar-t8"></div>
	    		<!-- 后台记得修改name值  并记得修改 js 逻辑-->
	    		<form class="ub ub-f1 ub-ver ub-ac umar-t8" id="branchForm">
	    		    <input type="hidden" name="id" id="id">
	    			<div class="ub ub-ac  umar-t20" id="branchComponent">
		                <div class="umar-r10 uw-80 ut-r">所属分公司:</div>
		                <div class="ub ub-ac">
			                <input type="hidden" name="branchId" id="branchId" type="text" > 
			                <input class="uinp ub ub-f1" name="branchName" id="branchName" type="text"  readonly="readonly"> 
			                <div class="uinp-more" id="umore">...</div>
		                </div>
		                <div class="ub ub-ac uc-red">*</div>
		            </div>
		            
		            <div class="ub ub-ac  umar-t20" style="margin-left:-19px;">
		                <div class="umar-r10 uw-90 ut-r">机构组合编号:</div>
		                <input class="uinp ub ub-f1 uinp-no-more" readonly="readonly" name="groupNo" id="groupNo" type="text" > 
		            </div>
		            <div class="ub ub-ac  umar-t20" style="margin-left:-12px;">
		                <div class="umar-r10 uw-90 ut-r">机构组合名称:</div>
		                <div class="ub ub-ac">
			                <input class="uinp ub ub-f1" name="groupName" id="groupName" maxlength="20" type="text" > 
		                </div>
			            <div class="ub ub-ac uc-red">*</div>
		            </div>
		            <div class="ub ub-ac  umar-t20" style="margin-left:-9px;">
		                <div class="umar-r10 uw-80 ut-r">备注:</div>
		                <input class="uinp ub ub-f1" name="remark" id="remark" maxlength="50" type="text" > 
		            </div>
	    		</form>			
	    	</div>
    	</div>
    </div>
</body>
</html>