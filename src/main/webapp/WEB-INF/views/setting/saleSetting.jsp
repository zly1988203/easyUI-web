<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>销售设置</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<shiro:hasPermission name="JxcSaleSetting:save">
				<div id="btnSave" class="ubtns-item">保存</div>
			</shiro:hasPermission>
			<div class="ubtns-item" onclick="toClose()">关闭</div>
		</div>
	</div>
	<div class="ub ub-ver ub-f1 umar-4 ubor upad-10">
		<div class="ub ub-ver">
			<div class="ub ub-f1 umar-t8 umar-b8">
				<div id="tabs" class="easyui-tabs"
					style="width: 100%; height: 500px;">
					<div title="销售设置" id="orderSpec"  style="padding: 20px 10px;">
						<div class="ub ub-ver ub-f1 uw uh ufs-14 uc-black">

							<div class="ub ub-ac upad-b16 ">
								<div class="umar-r10 uw-120 ut-r">抹零设置:</div>
								<div class="ub uw-110 ub-ac umar-r10">
									<label><input class="" type="radio" id="centComputeType0" name="centComputeType" value="0" /><span>四舍五入到角</span></label>
								</div>
								<div class="ub uw-110 ub-ac umar-r10">
									<label><input class="" type="radio" id="centComputeType1" name="centComputeType" value="1" /><span>角以下抹去</span></label>
								</div>
							</div>

							<div class="ub ub-ac">
								<div class="umar-r10 uw-120 ut-r">线上订单确认收货:</div>
								<div class="ub uw-110 ub-ac umar-r10">
									<label><input type="radio" id="receivingSetting0" name="receivingSetting" value="0" /><span>启用</span></label>
								</div>
								<div class="ub uw-110 ub-ac umar-r10">
									<label> <input type="radio" id="receivingSetting1" name="receivingSetting" value="1" /><span>不启用</span></label>
								</div>
							</div>

						</div>

					</div>
					<div title="门店销售设置" id="branchSpec" style="padding: 20px;">
						<div class="ub ub-ver ub-f1 uw uh ufs-14 uc-black">
							<div class="ub upad-4">
								<div class="ub ub-ac uw-320 umar-l20">
									<div class="umar-r10 uw-80 ut-r">机构名称:</div>
									<div class="ub ub-ac umar-r10">
										<input class="uinp" type="hidden" id="specBranchId"
											name="specBranchId" /> <input class="ub" type="hidden"
											id="branchId" name="branchId" /> <input class="uinp"
											type="text" id="branchName" name="branchName" />
										<div class="uinp-more" onclick="selectBranches()">...</div>
									</div>
								</div>
							</div>

							<div class="ub upad-4">
								<div class="ub ub-ac uw-320">
									<div class="umar-r10 uw-100 ut-r">小票电话设置:</div>
									<div class="ub ub-ac umar-r10">
										<input class="uinp" type="text" id="receiptMobile"
											name="receiptMobile" />
									</div>
								</div>
							</div>

						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</body>

<script type="text/javascript">
	$(function() {
		//初始页面
		$.ajax({
			url : contextPath + "/branchSetting/getSetting",
			type : "POST",
			success : function(result) {
				if (result.code == 0) {
					init(result.data);
				} else {
					disableSaveBtn();
					successTip(result.message);
				}
			},
			error : function(result) {
				disableSaveBtn();
				successTip("请求发送失败或服务器处理失败");
			}
		});
		loadTabs();
		//保存事件
		$("#btnSave").click(function() {
			save();
		});
	});
	var indexTab = 0;
	//初始页面
	function init(data) {
		//获取值
		var centComputeType = data.centComputeType;
		var receivingSetting = data.receivingSetting;
		$("#branchId").val(data.branchId);
		//页面赋值
		if (centComputeType == 0) {
			$("#centComputeType0").attr("checked", "true");
		} else {
			$("#centComputeType1").attr("checked", "true");
		}
		
		if(receivingSetting == 0){
			$("#receivingSetting0").attr("checked","true");
		}else{
			$("#receivingSetting1").attr("checked","true");
		}
		indexTab = 0;
	}

	//禁用保存
	function disableSaveBtn() {
		$("#btnSave").removeClass("ubtns-item").addClass("ubtns-item-disabled")
				.unbind("click");
	}

	//保存
	function save() {
		var obj = {};
		var url = "";
		if (indexTab == 0) {
			obj.branchId = $("#branchId").val();
			obj.centComputeType = $('input:radio:checked').val();
			url = contextPath + "/branchSetting/save";
		} else if (indexTab == 1) {
			var specBranchId = $("#specBranchId").val();
			if (specBranchId == "") {
				messager("请先选择机构");
				return;
			}
			var receiptMobile = $("#receiptMobile").val();
			if (receiptMobile == "") {
				messager("请输入电话号码");
				return;
			}
			obj.branchId = specBranchId;
			obj.receiptMobile = receiptMobile;
			url = contextPath
					+ "/pos/posReceiptSetting/saveOrUpdatePosReceiptSetting";
		}

		$.ajax({
			url : url,
			type : "POST",
			data : obj,
			success : function(result) {
				if (result['code'] == 0) {
					messager("保存成功！");
				} else {
					successTip(result['message']);
				}
			},
			error : function(result) {
				successTip("请求发送失败或服务器处理失败");
			}
		});
	}

	function selectBranches() {
		var specBranchId = "";
		new publicAgencyService(
				function(data) {
					specBranchId = data.branchesId;
					$("#specBranchId").val(specBranchId);
					branchName = data.branchName;
					$("#branchName").val(
							"[" + data.branchCode + "]" + data.branchName);
					getReceiptMobile(specBranchId);
				}, '', $("#branchId").val());
	}
	function getReceiptMobile(specBranchId) {
		$
				.ajax({
					url : contextPath
							+ "/pos/posReceiptSetting/queryPosReceiptSettingByBranchId",
					type : "POST",
					data : {
						'branchId' : specBranchId
					},
					success : function(result) {
						if (result != null) {
							$("#receiptMobile").val(result.receiptMobile);
						}
					},
					error : function(result) {
						successTip("请求发送失败或服务器处理失败");
					}
				});
	}
	// 加载选项卡
	function loadTabs() {
		$('#tabs').tabs(
				{
					border : false,
					onSelect : function(title) {
						// 获取选项卡下标
						indexTab = $('#tabs').tabs('getTabIndex',
								$('#tabs').tabs('getSelected'));
					}
				});
	}
</script>
</html>