
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>一卡通设置</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/finance/iccard/iccardSetting.js?v=2"></script>

<style>
.datagrid-header .datagrid-cell {
	text-align: center !important;
	font-weight: bold;
}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="saveForm">
			<div class="ub ub-ac upad-8">
				<div class="ubtns">
					<button class="ubtns-item" onclick="saveCardSetting()" id="saveBtn">保存</button>
					<button class="ubtns-item" onclick="toClose()">关闭</button>
				</div>
			</div>

			<div class="ub uline"></div>

			<div class="ub upad-4 umar-t10 umar-l50">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-100 ut-r">使用一卡通:</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="status" id="status1"
							value="1" /><label for="status1">启用 </label>
					</div>

					<div class="ub ub-ac umar-r10 umar-l50">
						<input class="radioItem" type="radio" name="status" id="status2"
							value="2" checked /><label for="status2">不启用 </label>
					</div>
					<input id="queryType" type="hidden" value="1">

				</div>
			</div>

			<div class="ub ub-ver upad-4 umar-l44">
				<div class="ub upad-4 umar-t10">
					<div class="ub ub-ac">
						<div class="umar-r10 uw-100 ut-r">账户保底金额:</div>
						<input class="uinp ub ub-f1" type="text" id="financeCode"
							name="financeCode"
							maxlength="50" />
					</div>
				</div>
			</div>

    </form>
			<div class="ub upad-4 umar-t10 umar-l50">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-100 ut-r">一卡通列表:</div>
					<div class="ub ub-ac umar-r10">
						<div class="ubtns">
							<button class="ubtns-item" onclick="addCard()" id="btnAdd">添加一卡通</button>
						</div>

					</div>

					<div class="ub ub-ac umar-l40">
						<div class="ubtns">
							<button class="ubtns-item" onclick="delCard()" id="saveBtn">删除</button>
						</div>

					</div>

				</div>
			</div>

		<div class="ub upad-4 umar-t10 umar-l50">
			<div class="ub ub-ac">
				<div class="umar-r10 uw-100 ut-r"></div>
                <div class="ub ub-ac umar-r10 ub-f1">
                <table id="gridCardSetting"></table>
                </div>

			</div>
		</div>
	</div>
</body>
</html>