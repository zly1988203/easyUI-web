<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>采购成本调价查询列表</title>

    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    <%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
    <script src="${ctx}/static/js/views/purchase/cost/reportList.js?V=${versionNo}"></script>
    <style>
        .datagrid-header-row .datagrid-cell {
            text-align: center !important;
        }
    </style>
    <%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
<div class="ub ub-ver ub-f1 umar-4 upad-4">
    <form id="queryForm" action="" method="post">
        <div class="ub ub-ac">
            <div class="ubtns">
                <shiro:hasPermission name="purchaseCostFormQuery:search">
                    <div class="ubtns-item" onclick="query()">查询</div>
                </shiro:hasPermission>
                <shiro:hasPermission name="purchaseCostFormQuery:export">
                    <div class="ubtns-item" onclick="exportData()">导出</div>
                </shiro:hasPermission>
                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
            <input type="hidden" id="startCount" name="startCount" />
            <input type="hidden" id="endCount" name="endCount" />
            <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
        </div>

        <div class="ub umar-t8">
            <div class="ub ub-ac umar-r40" id="targetBranch">
                <div class="umar-r10 uw-60 ut-r">店铺名称:</div>
                <input class="uinp ub ub-f1" type="hidden" id="branchId"
                       name="branchId">
                <input class="uinp ub ub-f1" type="text"
                                               id="branchName" name="branchName">
                <div class="uinp-more">...</div>
            </div>
            <div class="ub ub-ac umar-r40">
                <div class="umar-r10 uw-80 ut-r">单据编号:</div>
                <input class="uinp" name="formNo" id="formNo" type="text">
            </div>
            <div class="ub ub-ac umar-r40">
                <div class="umar-r10 uw-70 ut-r">引用单号:</div>
                <input class="uinp" name="refFormNo" id="refFormNo" type="text">
            </div>
        </div>
        <div class="ub umar-t8">
            <div class="ub ub-ac umar-r40">
                <div class="umar-r10 uw-60 ut-r">商品名称:</div>
                <input class="uinp" name="skuName" id="skuName" type="text">
            </div>
            <div class="ub ub-ac umar-r40">
                <div class="umar-r10 uw-80 ut-r">货号/条码:</div>
                <input class="uinp" name="skuCode" id="skuCode" type="text">
            </div>
            <div class="ub ub-ac umar-r40" id="supplierSelect">
                <div class="umar-r10 uw-70 ut-r">供应商:</div>
                <input class="uinp" name="supplierId" id="supplierId"type="hidden">
                <input class="uinp ub ub-f1" id="supplierName" type="text">
                <div class="uinp-more">...</div>
            </div>
        </div>

    </form>
    <div class="ub uw umar-t8 ub-f1">
        <table id="gridReportList"></table>
    </div>

</div>
</body>
</html>
