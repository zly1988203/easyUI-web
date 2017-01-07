<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>礼品管理</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/integral/list.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 upad-8">
		<form action="" class="umar-t12" id="searchForm" method="post">
        <div class="ub ub-ac">
            <!--buttons-->
            <div class="ubtns">
            	<shiro:hasPermission name="giftManager:search">
                	<div class="ubtns-item" onclick="queryList();">查询</div>
                </shiro:hasPermission>
                <c:if test="${branchType!=0}">
	                <shiro:hasPermission name="giftManager:append">
						  <div class="ubtns-item" onclick="giftManagerAdd()">新增</div>
				   	</shiro:hasPermission>
			   	</c:if>
                <shiro:hasPermission name="giftManager:delete">
	                <div class="ubtns-item" onclick="deleteData();">删除</div>
	            </shiro:hasPermission>
	            <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	            <div class="ubtns-item" onclick="window.parent.closeTab()">关闭</div>
            </div>
        </div>
        <div class="ub umar-t8 uc-black"></div>
        <div class="ub uline umar-t8"></div>
        <div class="ub ub-ver ub-f1 ">
	            <div class="ub umar-t8">
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r">货号/条码:</div>
	                    <input class="uinp" name="skuCode" type="text" maxlength="20">
	                </div>
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r">礼品名称:</div>
	                    <input class="uinp" name="skuName" type="text" maxlength="20">
	                </div>
	                <div class="ub ub-ac uw-300 umar-l40">
	                    <div class="umar-r10 uw-70 ut-r" >机构选择:</div>
	                    <input class="uinp ub ub-f1"  type="text" name="branchNameOrCode" id="branchNameOrCode"  type="text" maxlength="50">
	                    <div class="uinp-more" onclick="selectBranch();">...</div>
	                </div>
		            <div class="ub ub-ac uw-300 umar-l40">
	                    <div class="umar-r10 uw-70 ut-r">礼品状态:</div>
					        <select class="easyui-combobox uselect uw-300" name="status" id="status" data-options="editable:false">
					            <option value="" selected="selected">全部</option>
					            <option value="0">未生效</option>
					            <option value="1">兑换中</option>
					            <option value="2">已失效</option>
					        </select>
	                </div>  
	            </div>
        </div>
		</form>
		<div class="ub umar-t8 umar-b8"></div>
		<div class="ub ub-f1">
			<table id="dataListGrid"></table>
		</div>
    </div>
</body>
</html>