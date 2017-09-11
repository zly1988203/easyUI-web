<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>采购促销活动列表</title>

    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    <%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
    <script src="${ctx}/static/js/views/purchase/activity/activityList.js?V=${versionNo}"></script>
    <style>
        .datagrid-header-row .datagrid-cell {
            text-align: center !important;
        }
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
<div class="ub ub-ver ub-f1 umar-4 upad-4">
    <form id="queryForm">
        <div class="ub ub-ac">
            <div class="ubtns">
                <shiro:hasPermission name="purchaseActivity:search">
                    <div class="ubtns-item" onclick="query()">查询</div>
                </shiro:hasPermission>
                <shiro:hasPermission name="purchaseActivity:append">
                    <div class="ubtns-item" onclick="add()">新增</div>
                </shiro:hasPermission>
                <%-- <shiro:hasPermission name="purchaseActivity:copy">
                     <div class="ubtns-item" onclick="actCopy()">复制</div>
                 </shiro:hasPermission>--%>
                <shiro:hasPermission name="purchaseActivity:delete">
                    <div class="ubtns-item" onclick="actDelete()">删除</div>
                </shiro:hasPermission>
                <shiro:hasPermission name="purchaseActivity:export">
                    <div class="ubtns-item" onclick="exportData()">导出</div>
                </shiro:hasPermission>
                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>

            <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
        </div>

        <div class="ub umar-t8">
            <div class="ub ub-ac umar-r40" id="targetBranch">
                <div class="umar-r10 uw-60 ut-r">机构:</div>
                <input class="uinp ub ub-f1" type="hidden" id="branchId"
                       name="branchId">
                <input class="uinp ub ub-f1" type="text"
                       id="branchName" name="branchName">
                <div class="uinp-more">...</div>
            </div>
            <div class="ub ub-ac umar-r40" id="supplierSelect">
                <div class="umar-r10 uw-60 ut-r">供应商:</div>
                <input class="uinp" name="supplierId" id="supplierId"type="hidden">
                <input class="uinp ub ub-f1" id="supplierName" type="text">
                <div class="uinp-more">...</div>
            </div>
            <div class="ub ub-ac umar-r40">
                <div class="umar-r10 uw-60 ut-r">单据编号:</div>
                <input class="uinp" name="formNo" id="formNo" type="text">
            </div>

        </div>
        <div class="ub umar-t8">
            <div class="ub ub-ac umar-r40" id="operateorSelect">
                <div class="umar-r10 uw-60 ut-r">制单人:</div>
                <input class="uinp" name="createUserId" id="createUserId" type="hidden">
                <input class="uinp" id="createUserName" name="createUserName"
                       type="text" maxlength="50">
                <div class="uinp-more">...</div>
            </div>
            <div class="ub ub-ac umar-r40">
                <div class="umar-r10 uw-60 ut-r">审核状态:</div>
                <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" name="status" id="status_no"
                           value="0" checked="checked" /><label for="status_no">未审核
                </label>
                </div>
                <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" name="status"
                           id="status_yes" value="1" /><label for="status_yes">已审核
                </label>
                </div>
                <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" id="status_over" name="status" value="2"/><label
                        for="status_over">已终止
                </label>
                </div>
                <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" name="status"
                           id="status_all" value="" /><label for="status_all">全部</label>
                </div>
            </div>
        </div>

    </form>
    <div class="ub uw umar-t8 ub-f1">
        <table id="gridActivityList"></table>
    </div>

</div>
</body>
</html>
