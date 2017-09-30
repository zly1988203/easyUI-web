
        <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
        <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>采购成本调整-编辑</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/purchase/cost/costMain.js?V=${versionNo}"></script>
	<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
            <style>
            .datagrid-header-row .datagrid-cell {
            text-align: center !important;
            }
            </style>
<body class="ub ub-ver uw uh ufs-14 uc-black">
<input type='hidden' id="pageStatus" value="{form.status}">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<shiro:hasPermission name="purchaseCostForm:append">
					<div class="ubtns-item" onclick="add()">新增</div>
				</shiro:hasPermission>
                    <c:choose>
                        <c:when test="${form.status eq '0'}">
                            <div class="ubtns-item" onclick="saveCost()">保存</div>
                        </c:when>
                    </c:choose>
                <shiro:hasPermission name="purchaseCostForm:audit">
                    <c:choose>
                        <c:when test="${form.status eq '0'}">
                            <div class="ubtns-item" onclick="check()">审核</div>
                        </c:when>
                    </c:choose>
                </shiro:hasPermission>
                <shiro:hasPermission name="purchaseCostForm:delete">
                    <c:choose>
                        <c:when test="${form.status eq '0'}">
                            <div class="ubtns-item" onclick="del()">删除</div>
                        </c:when>
                    </c:choose>
			   	</shiro:hasPermission>
                <shiro:hasPermission name="purchaseCostForm:print">
                    <div class="ubtns-item" onclick="printPreview()">打印</div>
                </shiro:hasPermission>
                <shiro:hasPermission name="purchaseCostForm:export">
                    <div class="ubtns-item"  onclick="exportData()">导出明细</div>
                </shiro:hasPermission>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>

            <c:choose>
                <c:when test="${form.status eq '2'}">
                    <div class="already-examine" id="already-examine"><span>已终止</span></div>
                </c:when>
                <c:when test="${form.status eq '1'}">
                    <div class="already-examine" id="already-examine"><span>已审核</span></div>
                </c:when>
            </c:choose>
        <form id="formAdd"  action="" method="post">
        <div class="ub umar-t8 uc-black">【单号】:<span>${form.formNo}</span></div>
            <input type="hidden" id="formNo" name="formNo" value="${form.formNo}">
            <input type="hidden" id="id" name="id" value="${form.id}">
            <div class="ub ub-ver ">
                <div class="ub umar-t8">
                    <div class="ub ub-ac umar-r80">
                        <div class="umar-r10 uw-60 ut-r">收货单号:</div>
                        <input class="uinp" readonly="readonly" id="refFormNo" type="text" name="refFormNo" disabled value="${form.refFormNo}">
                    </div>


                    <div class="ub ub-ac umar-r80">
                        <div class="umar-r10 uw-60 ut-r">收货机构:</div>
                        <input class="uinp" name="branchId" id="branchId" type="hidden" value="${form.branchId}">
                        <input id="branchName" name="branchName" class="uinp" readonly="readonly" type="text" disabled value="${form.branchName}">

                    </div>

                    <div class="ub ub-ac umar-r80">
                        <div class="umar-r10 uw-60 ut-r">制单人员:</div>
                        <div class="utxt"><c:out value="${form.createUserName}"></c:out></div>
                    </div>
                    <div class="ub ub-ac">
                        <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                        <div class="utxt" id="createTime"><fmt:formatDate value="${form.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></div>
                    </div>
                </div>
                <div class="ub umar-t8">

                    <div class="ub ub-ac umar-r80">
                        <div class="umar-r10 uw-60 ut-r">供应商:</div>
                        <input class="uinp" name="supplierId" id="supplierId"type="hidden" value="<c:out value='${form.supplierId}'></c:out>">
                        <input class="uinp" readonly="readonly" id="supplierName" type="text" disabled value="<c:out value='${form.supplierName}'></c:out>">
                    </div>

                    <div class="ub ub-ac umar-r80">
                        <div class="umar-r10 uw-60 ut-r">经营方式:</div>
                        <input class="uinp" name="saleWay" id="saleWay" type="hidden" value="<c:out value='${form.saleWay}'></c:out>">
                        <input class="uinp" id="saleWayName" name="saleWayName"
                               type="text" readonly="readonly" disabled value="<c:out value='${form.saleWayStr}'></c:out>">
                    </div>
                    <div class="ub ub-ac umar-r80">
                        <div class="umar-r10 uw-60 ut-r">修改人员:</div>
                        <div class="utxt"><c:out value="${form.updateUserName}"></c:out></div>
                    </div>
                    <div class="ub ub-ac">
                        <div class="umar-r10 uw-60 ut-r">修改时间:</div>
                        <div class="utxt"><fmt:formatDate value="${form.updateTime}" pattern="yyyy-MM-dd HH:mm:ss"/></div>
                    </div>
                </div>
                <div class="ub umar-t8">
                    <div class="ub ub-ac uw-624 umar-r80">
                        <div class="umar-r10 uw-60 ut-r">备注:</div>
                        <input class="uinp ub ub-f1" name="remark" id="remark" type="text"
                               onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
                               onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
                               oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
                               maxlength="100" value="<c:out value='${form.remark}'></c:out>">
                    </div>

                    <div class="ub ub-ac umar-r80">
                        <div class="umar-r10 uw-60 ut-r">审核人员:</div>
                        <div class="utxt"><c:out value="${form.validUserName}"></c:out></div>
                    </div>
                    <div class="ub ub-ac">
                        <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                        <div class="utxt"><fmt:formatDate value="${form.validTime}" pattern="yyyy-MM-dd HH:mm:ss"/></div>
                    </div>

                </div>
            </div>
        </form>
        <div class="ub uw umar-t8 ub-f1">
            <table id="gridCost"></table>
        </div>
    </div>

</body>
</html>