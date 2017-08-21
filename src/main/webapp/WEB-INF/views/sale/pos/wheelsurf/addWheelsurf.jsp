<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>新增pos客屏活动</title>

    <%@ include file="/WEB-INF/views/include/header.jsp"%>

</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<input type='hidden' id="cascadeGoods" name="cascadeGoods" value="">
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<div class="ub ub-ac upad-4">
			<div class="ubtns">
				<div class="ubtns-item" onclick="selectPrize()">奖品选择</div>
				<div class="ubtns-item" onclick="uploadPic()">上传图片</div>
				<div class="ubtns-item" onclick="saveWheelsurf()">保存</div>
				<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
				<div class="ubtns-item" onclick="toClose()">关闭</div>
			</div>
		</div>
		<form id="formAdd">
			<div class="ub ub-ver ">
				<div class="ub umar-t8">
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">活动时间:</div>
						<input id="actStarTime" class="Wdate easyui-validatebox"
						data-options="required:true" type="text"
						onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" />
	至
						<input id="actEndTime" class="Wdate easyui-validatebox"
						data-options="required:true" type="text"
						onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" />
					</div>
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">奖品有效期:</div>
						<input id="prizeStarTime" class="Wdate easyui-validatebox"
							data-options="required:true" type="text"
							onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" />
	至
						<input id="prizeEndTime" class="Wdate easyui-validatebox"
						data-options="required:true" type="text"
						onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" />
					</div>

				</div>
				<div class="ub umar-t8">
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-60 ut-r">活动名称:</div>
						<input id="branchName" class="uinp"  type="text">
					</div>
					<div class="ub ub-ac umar-r80">
						<div class="umar-r10 uw-70 ut-r">活动类型:</div>
						<select class="uselect easyui-combobox" name="activityType"
						data-options="editable:false">
						<option value="">全部</option>
						<option value="1">抽奖</option>
						</select>

					</div>

				</div>
				<div class="ub umar-t8">
					<div class="ub ub-ac umar-r40" id="branchTemp">
					<div class="umar-r10 uw-60 ut-r">活动机构:</div>
					<input class="uinp ub ub-f1" type="hidden" id="branchId"
					name="branchId"> <input class="uinp ub ub-f1" type="text"
					id="branchName" name="branchName">
					<div class="uinp-more">...</div>
					</div>
					<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">抽奖次数:</div>
					<input class="uinp" name="activityNo" id="activityNo" type="text">
					</div>
				</div>
			</div>
		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridAddPosAct"></table>
		</div>
	</div>

</body>
</html>