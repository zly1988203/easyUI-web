<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<title></title>
	<%@ include file="/WEB-INF/views/include/header.jsp" %>

	<style type="text/css">
		.form-row{
			margin: 5px 10px;
			display: block;
		}
		.form-row .form-row-left{
			display: inline-block;
			text-align: left;
			width: 100px;
		}
		.form-row .form-row-right{
			display: inline-block;
			text-align: left;
		}

	</style>
</head>
<body style="font-family: '微软雅黑'">

<div class="easyui-panel">
	<form id="editPwd_mainform" action="">
		<div class="umar-t18">
			<div class="form-row">
				<span class="form-row-left" >旧密码:</span>
				<span class="form-row-right"><input type="password" id="oldPass" name="oldPass" class="easyui-validatebox" data-options="required:true,validType:'length[8,18]'"/></span>
			</div>
			<div class="form-row">
				<span class="form-row-left">新密码:</span>
				<span class="form-row-right"><input type="password" id="newPass" name="newPass" class="easyui-validatebox" data-options="required:true,validType:'length[8,18]'"/></span>
			</div>
			<div class="form-row">
				<span class="form-row-left">确认新密码:</span>
				<span class="form-row-right"><input type="password" id="againNewPass" name="againNewPass" class="easyui-validatebox" data-options="required:true,validType:'length[8,18]'"/></span>
			</div>
			<div class="form-row">
				<!-- <a href="javascript:void(0);" class="easyui-linkbutton" plain="true" iconCls="icon-ok"
				   id="formSubmit">提交</a>&nbsp;&nbsp; -->
				   <input type="button" class="ubtn usure" value="提交"  id="formSubmit">
			</div>
			<div class="form-row">
				<span class="uc-red ufs-12">注:密码长度为8-18位，字母+数字，不能是纯数字。</span>
			</div>
		</div>
	</form>
</div>

<script>
	$(function(){
		$("#formSubmit").click(function(){
			var oldPass = $("#oldPass").val();
			var newPass = $("#newPass").val();
			var againNewPass = $("#againNewPass").val();

			if(!oldPass || !newPass || !againNewPass){
				$.messager.alert("提示", "密码不能为空");
				return ;
			}

			if(newPass !== againNewPass){
				$.messager.alert("提示", "两次密码输入不一致");
				return ;
			}

			if(/^\d+$/.test(newPass)){
				$.messager.alert("提示", "密码不能是全数字");
				return ;
			}
			var regex = /^[A-Za-z0-9]{8,18}$/;
			if(!regex.test(newPass)){
				$.messager.alert("提示", "密码长度为8-18位，字母+数字，不能是纯数字");
				return ;
			}

			$.post(
					"${ctx}/system/updatePwd",
					{
						oldPass:oldPass,
						newPass:newPass
					},
					function(data){
						if(data=='success'){
							$.messager.alert("提示", "修改成功");
						}else{
							$.messager.alert("提示", data);
						}
					}
			);
		});
	});
</script>

</body>
</html>