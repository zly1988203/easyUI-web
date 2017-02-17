<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>角色列表</title>
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script  src="${ctx}/static/js/views/system/role/roleList.js"></script>
	
</head>
<body class="ub uw uh ufs-14 uc-black">
<div class="ub  ub-f1 umar-4 upad-4">
	<!--left-->
	<div class="ub ub-ver ubor">
		<div class="ub upad-4 ub-f1 uscroll">
			<div class="zTreeDemoBackground left">
				<ul id="treeBranchRoles" class="ztree"></ul>
			</div>
		</div>
	</div><!--left end-->
	<div class="ub ub-ver ub-f1 upad-4">
		<div class="ub ub-ac">
			<div class="ubtns">
				<button class="ubtns-item" onclick="queryRoleList()">查询</button>
				<shiro:hasPermission name="JxcRoleManager:add" >
					<button class="ubtns-item" onclick="toAddRole()">新增</button>
				</shiro:hasPermission>
				<shiro:hasPermission name="JxcRoleManager:produceAuth" >
					<button class="ubtns-item" onclick="toProduceAuth()">分配权限</button>
				</shiro:hasPermission>
				<shiro:hasPermission name="JxcRoleManager:delete" >
					<button class="ubtns-item" onclick="deleteRole()">删除</button>
				</shiro:hasPermission>
				<button class="ubtns-item" onclick="toClose()">退出</button>
				<div id="updatePermission" class="none">
					<shiro:hasPermission name="JxcRoleManager:update" >修改</shiro:hasPermission>
				</div>
			</div>
		</div>
		<form action="" id="queryForm" method="post">
			<div class="ub umar-t4">
				<input type="hidden" name="branchCompleCode" id="selectBranchCompleCode" />
				<input type="hidden" name="roleId" id="selectRoleId" />
					
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">关键字:</div>
					<input class="uinp" type="text" name="nameOrCode" id="roleNameOrCode" placeholder="输入角色编码、名称进行查询">
				</div>
				<div class="ub ub-ac umar-r80">
					<div class="umar-r10  ut-r">创建时间:</div>
					<input class="Wdate"  readonly="readonly" name="startTime" id="txtStartDate" 
				           onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'txtEndDate\');}'})" />&nbsp;至&nbsp;
					<input class="Wdate"  readonly="readonly" name="endTime" id="txtEndDate" 
				           onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'txtStartDate\');}'})" />
				</div>
				
			</div>
		</form>
		<div class="ub umar-t10 ub-f1">
			<table id="dg" ></table>
		</div>
	</div>
</div>
</body>
</html>