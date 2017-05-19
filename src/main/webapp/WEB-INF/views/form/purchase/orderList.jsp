<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>采购订单</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/purchase/orderList.js?v=5"></script>
<%@ include file="/WEB-INF/views/component/publicPrintChoose.jsp"%>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="query()">查询</div>
					<shiro:hasPermission name="JxcPurchaseOrder:add">
						<div class="ubtns-item" onclick="orderAdd()">新增</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcPurchaseOrder:delete">
						<div class="ubtns-item" onclick="orderDelete()">删除</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcPurchaseOrder:print">
						<div class="ubtns-item" onclick="printPreview()">打印</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">退出</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">单据编号:</div>
					<input class="uinp" name="formNo" id="formNo" type="text">
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">供应商:</div>
					<input class="uinp" name="supplierId" id="supplierId" type="hidden">
					<input class="uinp" id="supplierName" name="supplierName"
						type="text" maxlength="50">
					<div class="uinp-more" onclick="selectSupplier()">...</div>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">操作员:</div>
					<input class="uinp" name="operateUserId" id="operateUserId"
						type="hidden"> <input class="uinp" id="operateUserName"
						name="operateUserName" type="text" maxlength="50">
					<div class="uinp-more" onclick="selectOperator()">...</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">审核状态:</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="status" id="status_no"
							value="0" checked="checked" /><label for="status_no">未审核
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="status"
							id="status_yes" value="1" /><label for="status_yes">已审核 </label>
					</div>
					<!-- <div class="ub ub-ac umar-r10">
	                    <input class="ub" type="radio" name="status" value="2"/><span>不通过 </span>
	                </div> -->
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="status"
							id="status_all" value="" /><label for="status_all">全部</label>
					</div>
				</div>
				<div class="ub ub-ac umar-l20">
					<div class="umar-r10 uw-60 ut-r">单据状态:</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="dealStatus" id="deal0"
							value="0" /><label for="deal0">未处理 </label>
					</div>
					<!-- <div class="ub ub-ac umar-r10">
	                    <input class="ub radioItem" type="radio" name="dealStatus" id="deal1" value="1"/><label for="deal1">部分处理  </label>
	                </div> -->
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="dealStatus" id="deal2"
							value="2" /><label for="deal2">处理完成 </label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="dealStatus" id="deal3"
							value="3" /><label for="deal3">终止</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="dealStatus" id="deal4"
							value="" checked="checked" /><label for="deal4">全部 </label>
					</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-610" style="width: 624px;">
					<div class="umar-r10 uw-60 ut-r">备注:</div>
					<input class="uinp ub ub-f1" name="remark" id="remark" type="text"
						onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
						onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
						oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
						maxlength="100">
				</div>
			</div>
		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridOrders"></table>

		</div>
		<div class="ub uw umar-t8 ub-f1">
			<div id="tt" class="easyui-tabs" style="width:100%;height:100%">
				<div title="基本信息" style="padding: 20px; display: none;">
					<div class="ub ub-ver ub-f1 uw uh ufs-14 uc-black">
						<div class="ub ub-ac upad-4">
							<div class="ubtns">
								<button class="ubtns-item" onclick="updateBranch()">保存</button>
								<button class="ubtns-item" onclick="closeDialogHandel()">关闭</button>
							</div>
						</div>
						<div class="ub uline"></div>
						<form id="formEdit" method="post">
							<div class="ub ub-ver upad-4">
								<div class="ub upad-4">
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">机构编号:</div>
										<input id="id" name="id" type="hidden" value="${supplier.id }">
										<input id="supplierCode" name="supplierCode"
											class="uinp uw-200" type="text" readonly="readonly"
											value="${supplier.supplierCode }">
									</div>
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">机构名称:</div>
										<input id="supplierName" name="supplierName" class="uinp"
											maxlength="50" value="${supplier.supplierName }">

									</div>
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">机构类型:</div>
										<input id="branchCodeName" name="branchCodeName"
											class="uinp uw-200" type="text" readonly="readonly"
											value="[${branch.branchCode }]${branch.branchName }">
										<input id="branchId" name="branchId" type="hidden"
											value="${supplier.branchId }">

									</div>
								</div>

								<div class="ub upad-4">
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">联系人:</div>
										<input id="contcat" name="contcat"
											value="${supplier.contcat }" class="uinp uw-200" type="text">

									</div>
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">绑定手机:</div>
										<input id="mobile" name="mobile" value="${supplier.mobile }"
											class="uinp uw-200 easyui-validatebox"
											data-options="validType:'mobile'" type="text">

									</div>
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">固定电话:</div>
										<input id="phone" name="phone" value="${supplier.phone }"
											class="uinp easyui-validatebox"
											data-options="validType:'phone'" maxlength="20">
									</div>
								</div>

								<div class="ub upad-4">
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">绑定邮箱:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">所属区域:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">参考分店:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

								</div>

								<div class="ub upad-4">
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">所属机构:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">配送价格:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">加价率:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

								</div>

								<div class="ub upad-4">
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">要货机构:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">最低进货金额:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">所在地区:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

								</div>

								<div class="ub upad-4">
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">业务专员:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">费用均摊年数:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">店铺面积:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

								</div>

								<div class="ub upad-4">
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">修改人:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">修改时间:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">建档人:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>

								</div>

								<div class="ub upad-4">
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r">建档时间:</div>
										<input id="email" name="email" value="${supplier.email }"
											class="uinp easyui-validatebox" maxlength="50">

									</div>
								</div>



								<div class="ub upad-4">
									<div class="ub ub-ac ub-f1 umar-r36">
										<div class="umar-r10 uw-80 ut-r">备注:</div>
										<input id="remark" name="remark" class="uinp ub ub-f1"
											type="text" value="${supplier.remark }">
									</div>
								</div>
								<div class="ub upad-4">
									<div class="ub ub-ac uw-320">
										<div class="umar-r10 uw-80 ut-r"></div>
										<label><input id="isDirect" name="isDirect"
											type="checkbox"
											<c:if test="${supplier.isDirect}">checked="checked"</c:if>>直送供应商</label>
									</div>
								</div>

							</div>
						</form>
					</div>


				</div>

				<div title="机构费用" style="padding: 20px; display: none;">
					<table id="pg"></table>

				</div>



			</div>
		</div>
	</div>
</body>
</html>