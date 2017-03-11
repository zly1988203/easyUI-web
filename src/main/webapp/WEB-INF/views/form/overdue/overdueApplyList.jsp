<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>商品调价订单</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/overdue/overdueApplyList.js"></script>
    <%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
    	<form id="queryForm">
	        <div class="ub ub-ac">
	            <div class="ubtns">
					<div class="ubtns-item" onclick="query()">查询</div>
				<shiro:hasPermission name="JxcOverdueApply:add">
	                <div class="ubtns-item" onclick="orderAdd()">新增</div>
	            </shiro:hasPermission>
	            <shiro:hasPermission name="JxcOverdueApply:delete">
	                <div class="ubtns-item" onclick="orderDelete()">删除</div>
	            </shiro:hasPermission>
	            <shiro:hasPermission name="JxcOverdueApply:print">
	                <div class="ubtns-item" onclick="printReport()">打印</div>
	            </shiro:hasPermission>
	                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	            
	            <!-- 引入时间选择控件 -->
	            <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	        </div>
	
	       <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">申请机构:</div>
	                <input class="uinp" name="branchId" id="branchId" type="hidden">
	                <input class="uinp" id="branchName" name="branchName" type="text" maxlength="50">
	                <div class="uinp-more" onclick="searchBranch()">...</div>
	            </div>
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r" >制单人:</div>
	                <input class="uinp" name="createUserId" id="createUserId" type="hidden">
	                <input class="uinp" id="createUserName" name ="createUserName" type="text"  maxlength="50">
	                <div class="uinp-more" onclick="selectOperator()">...</div>
	            </div>
	        </div>
	        <div class="ub umar-t8">
	        	<div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</div>
	                <input class="uinp" name="formNo" id="formNo" type="text">
	            </div>
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">审核状态:</div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="radioItem" type="radio" name="status" id="status_no" value="0" checked="checked"/><label for="status_no">未审核 </label>
	                </div>
	                <div class="ub ub-ac umar-r10">
	                    <input class="radioItem" type="radio" name="status" id="status_yes" value="1"/><label for="status_yes">已审核 </label>
	                </div>
	                <!-- <div class="ub ub-ac umar-r10">
	                    <input class="ub" type="radio" name="status" value="2"/><span>不通过 </span>
	                </div> -->
	                <div class="ub ub-ac umar-r10">
	                    <input class="radioItem" type="radio" name="status" id="status_all" value=""/><label for="status_all">全部</label>
	                </div>
	            </div>
	        </div>
	       <div class="ub umar-t8">
               <div class="ub ub-ac uw-610" style="width: 624px;">
	                    <div class="umar-r10 uw-60 ut-r">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</div>
	                    <input class="uinp ub ub-f1" name="remark" id="remark" type="text" onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" oncontextmenu = "value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" maxlength="100">
	           </div>
            </div>
        </form>
        <div class="ub uw umar-t8 ub-f1">
            <table id="gridOrders"></table>
        </div>

    </div>
</body>
</html>