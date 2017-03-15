<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>报损单-详情</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script>
	var edit = '${stockFormVo.status == 1 ? 1 : 0}';
</script>
<script src="${ctx}/static/js/views/stockReimburse/stockReimburseView.js"></script>
<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<form action="" id="queryForm" method="post">
			<input type="hidden" id="formId" name="id" value="${stockFormVo.id}">
			<input type="hidden" id="formNo" name="formNo" value="${stockFormVo.formNo}">
			<input type="hidden" id="formType" name="formType" value="${stockFormVo.formType}">
			<div class="ub ub-ac upad-4">
				<div class="ubtns">
					<shiro:hasPermission name="JxcStockReimburse:add">
						<div class="ubtns-item" onclick="addStockReimburse()">新增</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcStockReimburse:edit">
						<c:choose>
							<c:when test="${stockFormVo.status == 1}">
								<div class="ubtns-item-disabled">保存</div>
							</c:when>
							<c:otherwise>
								<div class="ubtns-item" onclick="updateStockReimburse()">保存</div>
							</c:otherwise>
						</c:choose>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcStockReimburse:audit">
						<c:choose>
							<c:when test="${stockFormVo.status == 1}">
								<div class="ubtns-item-disabled">审核</div>
							</c:when>
							<c:otherwise>
								<div class="ubtns-item" onclick="checkStockReimburse()">审核</div>
							</c:otherwise>
						</c:choose>
					</shiro:hasPermission>
					<c:choose>
						<c:when test="${stockFormVo.status == 1}">
							<div class="ubtns-item-disabled">商品选择</div>
						</c:when>
						<c:otherwise>
							<div class="ubtns-item" onclick="selectGoods()">商品选择</div>
						</c:otherwise>
					</c:choose>
					<shiro:hasPermission name="JxcStockReimburse:import">
						<c:choose>
							<c:when test="${stockFormVo.status == 1}">
								<div class="ubtns-item-disabled">导入货号</div>
								<div class="ubtns-item-disabled">导入条码</div>
							</c:when>
							<c:otherwise>
								<div class="ubtns-item" onclick="importHandel(0)">导入货号</div>
								<div class="ubtns-item" onclick="importHandel(1)">导入条码</div>
							</c:otherwise>
						</c:choose>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcStockReimburse:export">
						<div class="ubtns-item" onclick="exportExcel()">导出</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcStockReimburse:print">
						<div class="ubtns-item" onclick="printChoose('ID','/stock/reimburse/')">打印</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcStockReimburse:setting">
						<div class="ubtns-item-disabled">设置</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="back()">关闭</div>
				</div>
			</div>
			<c:if test="${stockFormVo.status == 1}">
				<div class="already-examine" id="already-examine"><span>已审核</span></div>
			</c:if>
			<div class="ub umar-t8 uc-black">【单号】:<span >${stockFormVo.formNo}</span></div>
			<div class="ub umar-t8 uline"></div>
			<div class="ub umar-t10">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">报损机构:</div>
					<input type="hidden" name="branchId" id="branchId" class="uinp" value="${stockFormVo.branchId}"/>
					<input type="text" name="branchName" id="branchName"class="uinp  ub ub-f1" readonly="readonly"  value="[${stockFormVo.branchCode}]${stockFormVo.branchName}"/>
				</div>
				<div class="ub ub-ac uw-300 umar-l40">&nbsp;</div>
				<div class="ub ub-ac uw-300  umar-l40">
					<div class="umar-r10 uw-80 ut-r">制单人员:</div>
					<div class="utxt">${stockFormVo.createUserName}</div>
				</div>
				<div class="ub ub-ac umar-l10">
					<div class="umar-r10 uw-60 ut-r">制单时间:</div>
					<div class="utxt" id="createTime"><fmt:formatDate value="${stockFormVo.createTime}" pattern="yyyy-MM-dd HH:mm"/></div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-600">&nbsp;</div>
				<div class="ub ub-ac uw-300 umar-l80">
					<div class="umar-r10 uw-80 ut-r">最后修改人:</div>
					<div class="utxt">${stockFormVo.updateUserName}</div>
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">修改时间:</div>
					<div class="utxt"><fmt:formatDate value="${stockFormVo.updateTime}" pattern="yyyy-MM-dd HH:mm"/></div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-600">
					<div class="umar-r10 uw-70 ut-r">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</div>
					<input class="uinp ub ub-f1" type="text" id="remark" name="remark" <c:if test="${stockFormVo.status != 0}">readonly</c:if>  value="${stockFormVo.remark}"/>
				</div>
				<div class="ub ub-ac uw-300 umar-l80">
					<div class="umar-r10 uw-80 ut-r">审核人员:</div>
					<div class="utxt">${stockFormVo.validUserName}</div>
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">审核时间:</div>
					<div class="utxt">${stockFormVo.validTime}</div>
				</div>
			</div>
		</form>
		<!--datagrid-edit-->
		<div class="ub ub-f1 datagrid-edit umar-t8">
			<table id="stockReimburseViewForm"></table>
		</div>
	</div>
	<!-- 导入弹框 -->
	<div class="uabs uatk">
		<div class="uatit">导入文1件选择</div>
		<div class="uacon">
			<input class="uinp ub" id="filename" type="text"><label
				class="ualable">选择文件<input type="file" class="uafile"
				value="" name="xlfile" id="xlf" /></label>
		</div>
		<div class="uabtns">
			<button class="uabtn umar-r30"
				onclick="importHandel('gridEditOrder')">导入数量</button>
			<button class="uabtn" onclick="uaclose()">取消</button>
		</div>
	</div>
</body>

</html>