<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>加盟店预收款</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/settle/franchise/advance/advanceView.js?V=${versionNo}"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <input type='hidden' id="formId" value="${chargeVo.id}">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
				<shiro:hasPermission name="JxcFranchiseAdvance:add">
                	<div class="ubtns-item" onclick="addSupAdvMonForm()">新增</div>
                </shiro:hasPermission>
				<shiro:hasPermission name="JxcFranchiseAdvance:add">
                	<div class="ubtns-item-disabled">保存</div>
                </shiro:hasPermission>
				<shiro:hasPermission name="JxcFranchiseAdvance:audit">
                	<div class="ubtns-item-disabled">审核</div>
                </shiro:hasPermission>
                <div class="ubtns-item-disabled">费用选择</div>
				<shiro:hasPermission name="JxcFranchiseAdvance:delete">
                	<div class="ubtns-item-disabled" >删除</div>
                </shiro:hasPermission>
				<shiro:hasPermission name="JxcFranchiseAdvance:export">
                	<div class="ubtns-item" onclick="exportOrder()">导出明细</div>
                </shiro:hasPermission>
				<shiro:hasPermission name="JxcFranchiseAdvance:print">
                	<div class="ubtns-item-disabled" >打印</div>
                </shiro:hasPermission>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub umar-t8 uc-black">【单号】:<span>${chargeVo.formNo}</span></div>
        <div class="already-examine" id="already-examine"><span>已审核</span></div>
        <div class="ub uline umar-t8"></div>
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-300">
                <div class="umar-r10 uw-70 ut-r">加盟店:</div>
                <div class="ub">
                    <input type="hidden" id="branchId" name="franchiseBranchId" value="${chargeVo.franchiseBranchId}"/>
                    <input class="uinp ub ub-f1" type="text" id="targetBranchName" readonly="readonly" value="${chargeVo.branchName}"/>
                </div>
            </div>
            <div class="ub ub-ac uw-300 umar-l20">
                <div class="umar-r10 uw-70 ut-r">付款日期:</div>
                <div class="ub">
                   <input id="payMoneyTime" class="uinp ub ub-f1" type="text" value="<fmt:formatDate value="${chargeVo.payTime}" pattern="yyyy-MM-dd"/>" readonly="readonly"/>
                </div>
            </div>
            <div class="ub ub-ac umar-l20">
                <div class="umar-r10 uw-70 ut-r">制单人:</div>
                <div class="utxt">${chargeVo.createUserName}</div>
            </div>
            <div class="ub ub-ac umar-l20">
                <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                <div class="utxt" id="createTime"><fmt:formatDate value="${chargeVo.createTime}" pattern="yyyy-MM-dd HH:mm"/></div>
            </div>
         </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-300">
               </div>
               <div class="ub ub-ac uw-300 umar-l20">
               </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-80 ut-r">修改人:</div>
                   <div class="utxt">${chargeVo.updateUserName}</div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-60 ut-r">修改时间:</div>
                   <div class="utxt"><fmt:formatDate value="${chargeVo.updateTime}" pattern="yyyy-MM-dd HH:mm"/></div>
               </div>
               
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-600">
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                    <input class="uinp ub ub-f1" type="text" id="remark" readonly="readonly" maxLength='20' value="${chargeVo.remark}" name="remark">
               </div>
               <div class="ub ub-ac umar-l40">
                   <div class="umar-r10 uw-70 ut-r">审核人:</div>
                   <div class="utxt">${chargeVo.auditUserName}</div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                   <div class="utxt"><fmt:formatDate value="${chargeVo.auditTime}" pattern="yyyy-MM-dd HH:mm"/></div>
               </div>               
           </div>
           <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="franchiseAdvMoneyListView" ></table>
        </div>
    </div>

</body>
</html>
