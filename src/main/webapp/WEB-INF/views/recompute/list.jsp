<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>日结数据修复</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/recompute/list.js?V=${versionNo}"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
    	<form id="queryForm">
	        <div class="ub ub-ac">
	            <div class="ubtns">
	            	<shiro:hasPermission name="JxcRecompute:handler">
						<div class="ubtns-item" onclick="handler()">处理</div>
					</shiro:hasPermission>
	                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	            </div>
	        </div>
	
			<div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
				<div class="ub ub-ac" id="branchSelect">
					<div class="umar-r10 uw-60 ut-r">机构:</div>
					<input type="hidden" id="branchId" name="branchId" />
					<input class="uinp ub ub-f1" type="text" id="branchName" maxlength="50" />
					<div class="uinp-more">...</div>
				</div>
	            <div class="ub ub-ac umar-l60">
	                <div class="umar-r10 uw-60 ut-r">单据编号:</div>
	                <input class="uinp ub ub-f1" name="formNo" id="formNo" type="text">
	            </div>
	            <div class="ub ub-ac umar-l60">
	                <div class="umar-r10 uw-60 ut-r">重算日期:</div>
	                <div class="ub">
	                   <input id="startDate" name="startDate" class="Wdate" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" pattern="yyyy-MM-dd"/>
	                </div>
	            </div>
	       </div>
	       <div class="ub umar-t8">
                <div class="umar-r10 uw-60 ut-r">skuId:</div>
                <textarea style="width: 90%; display: block;" name="skuIds" id="skuIds" rows="5"></textarea>
            </div>
        </form>
        <div class="ub uw umar-t8 ub-f1">
            <textarea style="top:0px; bottom:0px; width:100%; display: block;" name="resultLog" id="resultLog" readonly="readonly"></textarea>
        </div>

    </div>
</body>
</html>