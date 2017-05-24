
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>一卡通交易查询</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/finance/iccard/icCardTradingList.js?v="></script>
<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="query()">查询</div>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="exportData()">导出</div>
					<shiro:hasPermission name="JxcPurchaseOrder:print">
						<div class="ubtns-item" onclick="toPrint()">打印</div>
					</shiro:hasPermission>
					<div class="ubtns-item-disabled">设置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-60 ut-r">机&nbsp;&nbsp;构:</div>
					<input type="hidden" id="branchId" name="branchId" />
					<input type="hidden" id="branchCompleCode" name="branchCompleCode"/>
					<input type="hidden" id="oldBranchName" >
					<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" maxlength="50"/>
					<div id="divBranch" class="uinp-more" onclick="selectListBranches()" >...</div>
				</div>
				<div class="ub ub-ac umar-r20 umar-l20">
					<div class="umar-r10 uw-60 ut-r">收&nbsp;银&nbsp;员:</div>
					<input type="hidden" id="salesmanId" name="salesmanId" />
					<input type="hidden" id="oldsalesmanName" name="oldsalesmanName" />
					<input class="uinp ub ub-f1" type="text" id="salesmanName" name="salesmanName">
					<div id="divsaleman" class="uinp-more" onclick="selectOperator()" >...</div>
				</div>
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-60 ut-r">业务类型:</div>
					<select class="uselect easyui-combobox" style="width: 204px;" data-options="editable:false" name="saleType" id="saleType">
					<option value="">--请选择--</option>
					<option value="C">充值</option>
					<option value="A">消费</option>
					<option value="D">售卡</option>
					<option value="B">退货</option>
					</select>

				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-60 ut-r">单&nbsp;&nbsp;号:</div>
					<input class="uinp" name="orderNo" id="orderNo" type="text">
				</div>

				<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-80 ut-r">一卡通类型:</div>
					<select class="uselect easyui-combobox" style="width: 204px;" data-options="editable:false" name="value" id="value">
					<option value="all">--请选择--</option>
					<option value="DGT">东莞通</option>
					<option value="SZT">深圳通</option>
					<!-- <option value="HFT">合肥通</option> -->
					</select>
				</div>

				<div class="ub ub-ac">
					<div class="umar-r10 uw-60 ut-r">查询类型:</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="queryType"
							id="queryType1" value="1" checked/><label for="queryType1">一卡通交易明细
						</label>
					</div>

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="queryType"
							id="queryType2" value="2" /><label for="queryType2">一卡通交易汇总
						</label>
					</div>
                    <input id="queryType" type="hidden" value="1">

				</div>
			</div>

		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridCardTrading"></table>

		</div>
	</div>
</body>
</html>