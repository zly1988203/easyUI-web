<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>抹零设置</title>
	
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
		<div class="ub ub-ver umar-t20">
			<form id="settingForm" action="${ctx}/branchSetting/save" method="post">
				<input type="hidden" id="id" name="id">
				<div class="ub ub-ac upad-16 ">
					<div class="ub uw-110 ut-r">抹零设置:</div>
					<div class="ub uw-110 ub-ac umar-r10">
						<input class="ub" type="radio" id="centComputeType0" name="centComputeType" value="0" /><span>四舍五入到角</span>
					</div>
					<div class="ub uw-110 ub-ac umar-r10">
						<input class="ub" type="radio" id="centComputeType1" name="centComputeType" value="1" /><span>角以下抹去</span>
					</div>
				</div>
			</form>
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
				if(result.code == 0){
					init(result.data);
				}else{
					disableSaveBtn();
					successTip(result.message);
				}
			},
			error : function(result) {
				disableSaveBtn();
				successTip("请求发送失败或服务器处理失败");
			}
		});
		
		//保存事件
		$("#btnSave").click(function (){
			save();
		});
	});
	
	//初始页面
	function init(data){
		//获取值
		var id = data.id;
		var centComputeType = data.centComputeType;
		
		//页面赋值
		$("#id").val(id);
		if(centComputeType == 0){
			$("#centComputeType0").attr("checked","true");
		}else{
			$("#centComputeType1").attr("checked","true");
		}
	}
	
	//禁用保存
	function disableSaveBtn(){
		$("#btnSave").removeClass("ubtns-item").addClass("ubtns-item-disabled").unbind("click");
	}
	
	//保存
	function save() {
		$("#settingForm").form({
			onSubmit : function() {
				gFunStartLoading('正在保存，请稍后...');
				return true;
			},
			success : function(data) {
				var result = JSON.parse(data);
				gFunEndLoading();
				if (result['code'] == 0) {
					messager("保存成功！");
				} else {
					successTip(result['message']);
				}
			},
			error : function(data) {
				successTip("请求发送失败或服务器处理失败");
			}
		});
		$("#settingForm").submit();
	}
</script>
</html>