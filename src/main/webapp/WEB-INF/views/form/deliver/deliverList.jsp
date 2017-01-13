<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>要货申请</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/deliver/deliverList.js"></script>
    
</head>
<body class="ub uw uh ufs-14 uc-black">

    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	            	<shiro:hasPermission name="JxcDeliverDA:search">
						<div class="ubtns-item" onclick="queryForm()">查询</div>
				   	</shiro:hasPermission>
	            	<shiro:hasPermission name="JxcDeliverDA:add">
						<div class="ubtns-item" onclick="addDeliverForm()">新增</div>
				   	</shiro:hasPermission>
	            	<shiro:hasPermission name="JxcDeliverDA:delete">
						<div class="ubtns-item" onclick="delDeliverForm()">删单</div>
				   	</shiro:hasPermission>
	            	<shiro:hasPermission name="JxcDeliverDA:setting">
						<div class="ubtns-item-disabled">设置</div>
				   	</shiro:hasPermission>
				   	<div id="updatePermission" class="none">
						<shiro:hasPermission name="JxcDeliverDA:update">修改</shiro:hasPermission>
					</div>
	                <div class="ubtns-item" id="set" onclick="gFunRefresh()" >重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	        	<div class="ub ub-ac umar-l20">
	        	<%-- 引入时间选择控件 --%>
	            <%@ include file="/WEB-INF/views/component/dateSelectHour.jsp"%>
	            </div>
			</div>
	            <div class="ub umar-t8">
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r">单据编号:</div>
	                    <input type="hidden" id="deliverType" name="deliverType" value="DA" />
	                    <input class="uinp" type="text" id="formNo" name="formNo">
	                </div>
	                <div class="ub ub-ac uw-300 umar-l20">
	                    <div class="umar-r10 uw-70 ut-r">制单人员:</div>
	                    <input type="hidden" id="operateUserId" name="operateUserId" />
	                    <input class="uinp ub ub-f1" type="text" id="operateUserName" name="operateUserName" type="text" />
	                    <div class="uinp-more" onclick="selectOperator()">...</div>
	                </div>
	                <div class="ub ub-ac uw-300 umar-l40">
	                    <div class="umar-r10 uw-70 ut-r">要货机构:</div>
	                    <input type="hidden" id="targetBranchId" name="targetBranchId" value="${targetBranchId}"/>
	                    <input class="uinp ub ub-f1" type="text" id="targetBranchName" name="targetBranchName" />
	                    <div class="uinp-more" onclick="selectBranches()" >...</div>
	                </div>
	                
	            </div>
	            <div class="ub umar-t8">
	                <div class="ub ub-ac ">
	                    <div class="umar-r10 uw-70 ut-r">备注:</div>
	                    <input class="uinp" type="text" id="remark" name="remark">
	                </div>
	                <div class="ub ub-ac uw-300 umar-l20">
	                    <div class="umar-r10 uw-70 ut-r">业务人员:</div>
	                    <input class="uinp ub ub-f1" type="text" id="salesman" name="salesman">
	                </div>

	                <!--input-checkbox-->
	                <div class="ub ub-ac umar-l40 uw-300">
	                    <div class="umar-r10 uw-70 ut-r">审核状态:</div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="deliverAuditStatus" value="0" checked="checked" onclick="queryForm()"/><span>未审核</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="deliverAuditStatus" value="1" onclick="queryForm()"/><span>已审核</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="deliverAuditStatus" value=""  onclick="queryForm()"/><span>全部</span>
	                    </div>
	                </div>

	                <div class="ub ub-ac umar-l20">
	                    <div class="umar-r10 uw-70 ut-r">单据状态:</div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="deliverStatus" value="0" onclick="queryForm()"/><span>待处理</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="deliverStatus" value="1" onclick="queryForm()"/><span>部分发货</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="deliverStatus" value="2" onclick="queryForm()"/><span>全部发货</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="deliverStatus" value="3" onclick="queryForm()"/><span>终止</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="deliverStatus" value="" checked="checked" onclick="queryForm()"/><span>全部</span>
	                    </div>
	                </div>
	            </div>
	        
       	</form>
        <div class="ub ub-f1  umar-t8 umar-b8">
			<table id="deliverFormList"></table>
		</div>
    </div>

</body>
</html>
