<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>供应商区域列表(总部)</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/supplier/area/supplierAreaList.js"></script>
</head>
<body class="uw uh ufs-14 upad-8 uc-black box-border">
<div class="ub uh ub-f1">
    <!--left-->
    <div class="ub ub-ver ubor">
        <div class="ubor-b "></div>
        <div class="ub upad-4 ub-f1 uscroll" style="min-width: 240px">
            <div class="zTreeDemoBackground left">
                <ul id="treeArchives" class="ztree"></ul>
            </div>
        </div>
    </div><!--left end-->
    <div class="ub ub-ver ub-f1 upad-4">
        <form action="" id="formList" method="post">
            <div class="ub umar-t4">
                <div class="ub ub-ac umar-r10">
                    <div class="umar-r10  ut-r">关键字:</div>
                    <input class="uinp uw-400" type="text"  name="codeOrName" id="codeOrName" placeholder="输入编号、名称进行查询">
                </div>
                <input type="button" class="ubtn  umar-r10" value="查询" onclick="searchHandel()">
            </div>
        </form>
        <div class="ub umar-t10 ub-f1">
            <table id="gridSupplierAreaList" ></table>
        </div>
    </div>
</div>
</body>
</html>