<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>加盟店合同列表-新增</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script  src="${ctx}/static/js/views/settle/franchise/contract/contract.js?V=${versionNo}"></script>
</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<div class="ub ub-ac upad-4">
			<div class="ubtns">
				<shiro:hasPermission name="JxcFranchiseContract:add">
					<div class="ubtns-item" onclick="saveContract()">保存</div>
				</shiro:hasPermission>
				<shiro:hasPermission name="JxcFranchiseContract:audit">
					<div class="ubtns-item-disabled" >审核</div>
				</shiro:hasPermission>
				<div class="ubtns-item" onclick="toClose()">关闭</div>
			</div>
		</div>
		<div class="ub ub-f1 umar-t8">
			<div id="tt" class="easyui-tabs" data-options="fit:true">
			    <div title="合同信息">
			    	<div class="ub uw uh ub-ver ufs-14">
				        <form id="contractForm">
				        	<input type="hidden" name="contractFormId" id="formId">
				        	<div class="ub ub-ac uw-524 umar-t12 ">
				        		<label class="ub uw-110 ub-pe umar-r8 ">合同编号:</label>
				        		<input class="uinp uinp-no-more ub ub-f1" readonly="readonly" type="text" name="formNo" >
				        	</div>
				        	
				        	<div class="ub ub-ac uw-524 umar-t12 ">
				        		<label class="ub uw-110 ub-pe umar-r8 ">合同名称:</label>
				        		<input class="uinp ub ub-f1" type="text" id="contactName" name="formName" maxlength="30" >
				        		<i class="ub ub-ac uc-red">*</i>
				        	</div>
				        	
				        	<div class="ub ub-ac umar-t12">
				        		<div class="ub ub-ac uw-280">
					        		<label class="ub uw-110 ub-pe umar-r8">有效期起:</label>
					        		<input class="Wdate" style="width: 155px;" readonly="readonly" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd ',maxDate:'#F{$dp.$D(\'endTime\');}'})" type="text" id="startTime" name="validityTimeStart" >
					        		<i class="ub ub-ac uc-red">*</i>
				        		</div>
				        		<div class="ub ub-ac uw-230  umar-l8">
					        		<label class="ub ub-pe umar-r8">有效期止:</label>
					        		<input class="Wdate" style="width: 155px;" readonly="readonly" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd ',minDate:'#F{$dp.$D(\'startTime\');}'})" type="text" id="endTime" name="validityTimeEnd" >
					        		<i class="ub ub-ac uc-red">*</i>
				        		</div>
				        	</div>
				        	
				        	<div class="ub ub-ac uw-524 umar-t12" id="companyA">
				        		<label class="ub uw-110 ub-pe umar-r8 ">甲方(公司):</label>
				        		<input type="hidden" name="targetBranchId" id="branchId">
				        		<input class="uinp ub ub-f1" type="text" id="companyA" name="targetBranchName" >
				        		<div class="uinp-more">...</div>
				        		<i class="ub ub-ac uc-red">*</i>
				        	</div>
				        	
				        	<div class="ub ub-ac umar-t12">
				        		<div class="ub ub-ac uw-280">
					        		<label class="ub uw-110 ub-pe umar-r8">经办人:</label>
					        		<input class="uinp ub ub-f1 uinp-no-more"  type="text" id="contactsA" name="targetAgentName" readonly="readonly" >
				        		</div>
				        		<div class="ub ub-ac uw-230  umar-l8">
					        		<label class="ub ub-pe umar-r8">联系电话:</label>
					        		<input class="uinp ub ub-f1 uinp-no-more" type="text" id="mobileA"  name="targetAgentPhone" readonly="readonly">
				        		</div>
				        	</div>
				        	
				        	<div class="ub ub-ac uw-524 umar-t12 " id="companyB">
				        		<label class="ub uw-110 ub-pe umar-r8 ">乙方(签约机构):</label>
				        		<input type="hidden" name="franchiseBranchId" id="branchIdB">
				        		<input class="uinp ub ub-f1" type="text" name="franchiseBranchName" >
				        		<div class="uinp-more">...</div>
				        		<i class="ub ub-ac uc-red">*</i>
				        	</div>
				        	
				        	<div class="ub ub-ac umar-t12">
				        		<div class="ub ub-ac uw-280">
					        		<label class="ub uw-110 ub-pe umar-r8">经办人:</label>
					        		<input class="uinp ub ub-f1 uinp-no-more"  type="text" readonly="readonly" id="contactsB" name="franchiseAgentName" >
				        		</div>
				        		<div class="ub ub-ac uw-230  umar-l8">
					        		<label class="ub ub-pe umar-r8">联系电话:</label>
					        		<input class="uinp ub ub-f1 uinp-no-more"  type="text" readonly="readonly" id="mobileB" name="franchiseAgentPhone" >
				        		</div>
				        	</div>
				        	
				        	<div class="ub uw-524 umar-t12 " style="width:518px">
				        		<label class="ub uw-110 ub-pe umar-r8 ">备注:</label>
				        		<textarea rows="3" cols="3" name="remark" id="remark" class="uinp ub ub-f1 uh-100"></textarea>
				        	</div>
				        	
				        	<div class="ub umar-t20">
				        		<div class="ub ub-ac ">
					                <div class="ub uw-110 ub-pe umar-r8">建档人:</div>
					                <div class="utxt">许永勤</div>
					            </div>
					            <div class="ub ub-ac">
					                <div class="umar-r10 uw-60 ut-r">建档时间:</div>
					                <div class="utxt" >2017-05-08 15:08:30</div>
					            </div>
				        	</div>
				        	
				        	<div class="ub umar-t20">
				        		<div class="ub ub-ac ">
					                <div class="ub uw-110 ub-pe umar-r8">修改人:</div>
					                <div class="utxt">许永勤</div>
					            </div>
					            <div class="ub ub-ac">
					                <div class="umar-r10 uw-60 ut-r">修改时间:</div>
					                <div class="utxt" >2017-05-08 15:08:30</div>
					            </div>
				        	</div>
				        	
				        	<div class="ub umar-t20">
				        		<div class="ub ub-ac ">
					                <div class="ub uw-110 ub-pe umar-r8">审核人:</div>
					                <div class="utxt">许永勤</div>
					            </div>
					            <div class="ub ub-ac">
					                <div class="umar-r10 uw-60 ut-r">审核时间:</div>
					                <div class="utxt" >2017-05-08 15:08:30</div>
					            </div>
				        	</div>
				        </form>
			    	</div>
			    </div>
			    <div title="毛利分配规则" data-options="closable:true">
			    	<div class="ub ub-ver ufs-14 upad-8 ">
				        <div class="ub uh-200 datagrid-edit">
				        	<table id="taxList"></table>
				        </div>
				        <p class="umar-t10">温馨说明：您好，最后一行的毛利额度止不需要录入，系统会默认为无穷大</p>
			    	</div>
			    </div>
			</div>
		</div>	
	</div>
</body>
</html>