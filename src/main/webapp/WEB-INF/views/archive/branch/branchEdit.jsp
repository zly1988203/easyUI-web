<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/branchManager/editBranch.js?V=2"></script>
<div id="tt" class="easyui-tabs" style="width: 100%; height: 100%;">
	<div title="基本信息" data-options="fit:true,border:false"
		style="width: 100%; padding: 10px; display: none;">
		<div class="ub ub-ver ub-f1 uw uh ufs-14 uc-black">
			<div class="ub ub-ac upad-4">
				<div class="ubtns">
					<button class="ubtns-item" onclick="saveBranch()">保存</button>
					<button class="ubtns-item" onclick="closeDialogHandel()">关闭</button>
				</div>
			</div>
			<div class="ub uline"></div>
			<form id="formEdit" method="post">
				<div class="ub ub-ver upad-4">
					<div class="ub upad-4 umar-l20">
						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">机构编号:</div>
							<input id="branchId" name="branchId" type="hidden" value="${branchId }">
							<input id="branchesId" name="branchesId" type="hidden">
							<input id="branchCode" name="branchCode"
								class="uinp uinp-no-more uw-200" type="text" readonly="readonly">
						</div>
						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">机构名称:</div>
							<input id="branchName" name="branchName"
								class="uinp uinp-no-more" maxlength="50" readonly="readonly">

						</div>
						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">机构类型:</div>
							<select class="uselect easyui-combobox easyui-validatebox uw-204"
								name="branchType" id="branchType"
								data-options="validType:'length[0,10]'">
								<option value="1">直营店</option>
								<option value="2">加盟店</option>
							</select>
						</div>
					</div>

					<div class="ub upad-4 umar-l20">
						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">联系人:</div>
							<input id="contcat" name="contcat"
								class="uinp uinp-no-more uw-200" type="text" readonly="readonly">

						</div>
						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">手机:</div>
							<input id="mobile" name="mobile"
								class="uinp uinp-no-more uw-200"
								readonly="readonly" type="text">
						</div>

						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">邮箱:</div>
							<input id="email" name="email"
								class="uinp uinp-no-more" readonly="readonly">

						</div>
					</div>

					<div class="ub upad-4 umar-l20">
						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">所属区域:</div>
							<input id="area" name="area" type="text"
								class="uinp uinp-no-more" maxlength="50"
								readonly="readonly">

						</div>

						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">详细地址:</div>
							<input id="address" name="address" type="text"
								class="uinp uinp-no-more" readonly="readonly">

						</div>

						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">参考分店:</div>
							<input id="shop" name="shop" type="text"
								class="uinp uinp-no-more" maxlength="50"
								readonly="readonly">

						</div>

					</div>

					<div class="ub upad-4 umar-l20">
						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">所属机构:</div>
							<input id="parentName" name="parentName" type="text"
								class="uinp uinp-no-more" maxlength="50"
								readonly="readonly">

						</div>

						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">配送价格:</div>
							<select class="uselect easyui-combobox easyui-validatebox uw-204"
								name="price" id="price" data-options="validType:'length[0,10]'">
								<option value="1">配送价</option>
								<option value="2">成本价</option>
							</select>

						</div>

						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">加价率:</div>
							<input id="priceprocent" name="priceprocent" type="text"
								class="uinp uinp-no-more" maxlength="50"
								readonly="readonly"><span>%</span>
						</div>

					</div>

					<div class="ub upad-4 umar-l20">
						<div class="ub ub-ac uw-300">
							<div class="umar-r10 uw-80 ut-r">要货机构:</div>
							<input id="sourceBranch" name="sourceBranch" type="text"
								class="uinp uinp-no-more" maxlength="50"
								readonly="readonly">

						</div>

						<div class="ub ub-ac uw-340">
							<div class="umar-r10 uw-100 ut-r">最低进货金额:</div>
							<input id="minPrice" name="minPrice" type="text"
								class="uinp uinp-no-more" maxlength="50"
								readonly="readonly">

						</div>

						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">业务专员:</div>
							<input id="salesman" name="salesman" type="text"
								class="uinp uinp-no-more" maxlength="50"
								readonly="readonly">

						</div>

					</div>

					<div class="ub upad-4">
						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-100 ut-r">线上运营状态:</div>
							<select class="uselect easyui-combobox" style="width: 204px;"
								data-options="editable:false" name="status" id="status">
								<option value="1">运营中</option>
								<option value="2">已关闭</option>
							</select>

						</div>


						<div class="ub ub-ac uw-340">
							<div class="umar-r10 uw-100 ut-r">费用均摊年数:</div>
							<input id="costAvgYear" name="costAvgYear" type="text"
								class="uinp" maxlength="50">

						</div>

						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">店铺面积:</div>
							<input id="areaSize" name="areaSize" type="text"
								class="uinp uinp-no-more" maxlength="50">
							<span>m*2</span>
						</div>
					</div>

					<div class="ub upad-4">

						<div class="ub ub-ac uw-340">
							<div class="umar-r10 uw-100 ut-r">线下运营状态:</div>
							<select class="uselect easyui-combobox" style="width: 204px;"
								data-options="editable:false" name="offlineStatus" id="offlineStatus">
								<c:forEach var="i" items="${OfflineStatusList }">
									<option value="${i.code }">${i.label }</option>
				               	</c:forEach>
							</select>

						</div>

						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">修改人:</div>
							<input id="updateUserName" name="updateUserName" type="text"
								class="uinp uinp-no-more" maxlength="50"
								readonly="readonly">
						</div>

						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">修改时间:</div>
							<input id="createTimeUpdate" name="createTimeUpdate" type="text"
								class="uinp uinp-no-more" maxlength="50"
								readonly="readonly">
						</div>

					</div>

					<div class="ub upad-4 umar-l20">

						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">建档人:</div>
							<input id="createUserName" name="createUserName" type="text"
								class="uinp uinp-no-more" maxlength="50"
								readonly="readonly">
						</div>

						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r">建档时间:</div>
							<input id="createTime" name="createTime" type="text"
								class="uinp uinp-no-more" maxlength="50"
								readonly="readonly">
						</div>
					</div>

					<div class="ub upad-4 umar-l20">
						<div class="ub ub-ac ub-f1 umar-r36">
							<div class="umar-r10 uw-80 ut-r">备注:</div>
							<textarea id="remark" name="remark" class="uh-40 umar-r30 ubor uw-850"
								maxlength="100"></textarea>
						</div>
					</div>
					<div class="ub upad-4">
						<div class="ub ub-ac uw-320">
							<div class="umar-r10 uw-80 ut-r"></div>
							<label><input id="isDirect" name="isDirect"
								type="checkbox"
								<c:if test="${branch.isDirect}">checked="checked"</c:if>>直送供应商</label>
						</div>
					</div>

				</div>
			</form>
		</div>


	</div>

	<div title="机构费用" data-options="fit:true,border:false"
		style="width: 100%; padding: 10px; display: none;">
		<div class="ub ub-ac upad-8">
			<div class="ubtns">
				<button class="ubtns-item" onclick="saveBranch()">保存</button>
				<button class="ubtns-item" onclick="closeDialogHandel()">关闭</button>
			</div>
		</div>
		<div class="ub uline"></div>


		<table id="gridFitmentCost" class="umar-t10 upad-8"></table>
		<table id="gridEquipmentCost" class="umar-t10 upad-8"></table>
		<table id="gridAmortizeCost" class="umar-t10 upad-8"></table>

	</div>

</div>