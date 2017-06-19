<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>进销存-类别管理</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
    <script  src="${ctx}/static/js/views/categoryManager/categoryList.js?V=${versionNo}"></script>
</head>

<body class="ub uw uh ufs-14 uc-black">
<div class="ub  ub-f1 umar-4 upad-4">
    <!--left-->
    <div class="ub ub-ver ubor" style="width:250px;">
        <div class="ub upad-4 ub-f1 uscroll">
            <div class="zTreeDemoBackground left">
                <ul id="treeArchives" class="ztree"></ul>
            </div>
        </div>
    </div>
   <!--left end-->
    <div class="ub ub-ver ub-f1 upad-4">
        <div class="ub ub-ac">
            <div class="ubtns">
            	<shiro:hasPermission name="JxcCategoryManager:search">
					<button class="ubtns-item" onclick="queryList()">查询</button>
			   	</shiro:hasPermission>
            	<shiro:hasPermission name="JxcCategoryManager:append">
					<button class="ubtns-item" onclick="addCategory()">新增</button>
			   	</shiro:hasPermission>
            	<shiro:hasPermission name="JxcCategoryManager:delete">
					<button class="ubtns-item" onclick="deleteCategory()">删除</button>
			   	</shiro:hasPermission>
			   	<shiro:hasPermission name="JxcCategoryManager:export">
					<button class="ubtns-item" onclick="exportData()">导出</button>
			   	</shiro:hasPermission>
			   	 <div id="updatePermission" class="none">
					<shiro:hasPermission name="JxcCategoryManager:edit" >编辑</shiro:hasPermission>
				</div>
				<div class="ubtns-item" onclick="resetFrom()">重置</div>
	            <div class="ubtns-item" onclick="toClose()">退出</div>
            </div>
        </div>
        <form action="" id="formGoodsCategory" method="post">
            <div class="ub umar-t4">
                <div class="ub ub-ac umar-r10">
                    <div class="umar-r10  ut-r">关键字:</div>
                    <input type="hidden" name="parentId" id="parentId" value="0">
                    <input type="hidden" name="level" id="level" value="">
                    <input type="hidden" name="startCount" id="startCount" value="">
                    <input type="hidden" name="endCount" id="endCount" value="">
                    <input class="uinp uw-400" type="text" name="categoryNameOrCode" maxlength="50" id="categoryNameOrCode" placeholder="输入编号、名称进行查询">
                </div>
            </div>
        </form>

        <div class="ub umar-t10 ub-f1">
            <table id="gridArchives" ></table>
        </div>
    </div>
</div>
</body>
</html>