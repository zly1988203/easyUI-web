<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>有效天数设置页面</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			
			<shiro:hasPermission name="JxcDeliverSet:save">
				<div class="ubtns-item" onclick="save()">保存</div>
		   	</shiro:hasPermission>
			<div class="ubtns-item" onclick="toClose()">关闭</div>
		</div>
	</div>
	<div class="ub ub-ver ub-f1 umar-4 ubor upad-10">
		<!--<div class="upad-10 ubor-b" style="border-color: #0099cc">连锁设置</div>-->
		<div class="ub ub-ver umar-t20">
			<div class="ub ub-ac upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">有效天数:</div>
				<div class="ub ub-ac umar-r10">
					<form id="validityDayForm"
						action="${ctx}/form/deliverConfig/saveValidityDay" method="post">
						<input type="text" value="${validityDay}"
							class="easyui-numberbox " name="validityDay" id="validityDay"
							data-options="min:0,precision:0">
					</form>
				</div>
			</div>
			<!-- <div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">分店间直调必须经过总部审批:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio1" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio1" checked="checked" /><span>不启用</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">分店间直调必须经过区域经理审批:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>不启用</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">直调出库单只可引用一次:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>不启用</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">直调收货必须按单收货:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>不启用</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">直调收货必须按直调出库数量收货:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>不启用</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">总部可直接为门店完成出入库调货:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>不启用</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">直调入库上限控制:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>不启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>仅提示信息</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>提示且不允许入库</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">直调出库下限控制:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>不启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>仅提示信息</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>提示且不允许入库</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">门店要货单只可以引用一次:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>不启用</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">要货申请单明细价格不能修改:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>不启用</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">直调出库单单价为0时消息提示:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>不启用</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">分店要货单、直调出库单显示库存信息:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>不启用</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">分店要货单、直调出库单显示对方机构库存（目标库存）:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>不启用</span>
				</div>
			</div>
			<div class="ub upad-10 ubor-b">
				<div class="umar-r10 uw-280 ut-r">非加盟店正品转试用品申请必须经过总部审核:</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" checked="checked" /><span>启用</span>
				</div>
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="radio" name="radio2" /><span>不启用</span>
				</div>
			</div> -->
		</div>
	</div>
	<!--<div class="ub umar-10">-->
		<!--<input type="button" class="ubtn" value="保存" onclick="save()"/>-->
		<!--<input type="button" class="ubtn" value="退出"/>-->
	<!--</div>-->

</body>
<script type="text/javascript">
		$("#validityDayForm").form({
			onSubmit : function() {
					$.messager.progress({
						msg : '数据正在保存中，请稍后...'
					});
				return true;
			},
			success:function(data){
				var result = JSON.parse(data)
				$.messager.progress('close');
	            if(result['code'] == 0){
	                messager("保存成功！");
	            }else{
	                successTip(result['message']);
	            }
	        } ,error:function(data){
	            successTip("请求发送失败或服务器处理失败");
	        }
		});
	function save(){
		$("#validityDayForm").submit();
	}
</script>
</html>