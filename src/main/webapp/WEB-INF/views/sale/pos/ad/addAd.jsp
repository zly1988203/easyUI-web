<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>新增客屏广告</title>

    <%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>

<script src="${ctx}/static/js/views/sale/ad/adMain.js?V==${versionNo}"></script>
	<style>
	.datagrid-header-row .datagrid-cell {
	text-align: center !important;
	}
	img{
		width:200px;
		height:200px;
		border:1px solid;
	}

	.uploadFile{
		position: absolute;
	}
	</style>

</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<input type='hidden' id="cascadeGoods" name="cascadeGoods" value="">
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<div class="ub ub-ac upad-4">
			<div class="ubtns">
				<shiro:hasPermission name="JxcPurchaseOrder:add">
					<div class="ubtns-item" onclick="saveAd()">保存</div>
				</shiro:hasPermission>
				<div class="ubtns-item-disabled">审核</div>
				<div class="ubtns-item-disabled">终止</div>
				<div class="ubtns-item" onclick="toClose()">关闭</div>
			</div>
		</div>
		<form id="formAdd">
			<div class="ub ub-ver umar-l8">
				<div class="ub umar-t8">
					<div class="ub ub-ac umar-r20">
						<div class="umar-r10 uw-60 ut-r">展示时间:</div>
						<input class="Wdate newWdate" readonly="readonly" name="startTime"
							id="startTime"
							onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'endTime\');}'})" />&nbsp;至&nbsp;
						<input class="Wdate newWdate" readonly="readonly" name="endTime"
							id="endTime"
							onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'startTime\');}'})" />
					</div>
					<div class="ub ub-ac">
						<div class="umar-r10 uw-60 ut-r">展示时段:</div>
						<input class="Wdate newWdate" readonly="readonly"
							name="dailyStartTime" id="dailyStartTime"
							onclick="WdatePicker({dateFmt:'HH:mm:ss',minDate:'00:00:00',maxDate:'#F{$dp.$D(\'dailyEndTime\');}'})" />&nbsp;至&nbsp;
						<input class="Wdate newWdate" readonly="readonly"
							name="dailyEndTime" id="dailyEndTime"
							onclick="WdatePicker({dateFmt:'HH:mm:ss',minDate:'#F{$dp.$D(\'dailyStartTime\');}'})" />
					</div>

					<div class="ub ub-ac " id="weekday">
						<div class="umar-r10 uw-70 ut-r">活动日:</div>
						<div class="ub ub-ac umar-l10 ubcheckweek">
							<label><input class="radioItem" type="checkbox"
								name="weekcheckbox" value="1" checked="checked" /><span
								class="umar-l10">一</span></label>
						</div>
						<div class="ub ub-ac umar-l10 ubcheckweek">
							<label><input class="radioItem " type="checkbox"
								name="weekcheckbox" value="2" checked="checked" /><span
								class="umar-l10">二</span></label>
						</div>
						<div class="ub ub-ac umar-l10 ubcheckweek">
							<label><input class="radioItem " type="checkbox"
								name="weekcheckbox" value="3" checked="checked" /><span
								class="umar-l10">三</span></label>
						</div>
						<div class="ub ub-ac umar-l10 ubcheckweek">
							<label><input class="radioItem " type="checkbox"
								name="weekcheckbox" value="4" checked="checked" /><span
								class="umar-l10">四</span></label>
						</div>
						<div class="ub ub-ac umar-l10 ubcheckweek">
							<label><input class="radioItem " type="checkbox"
								name="weekcheckbox" value="5" checked="checked" /><span
								class="umar-l10">五</span></label>
						</div>
						<div class="ub ub-ac umar-l10 ubcheckweek">
							<label><input class="radioItem " type="checkbox"
								name="weekcheckbox" value="6" checked="checked" /><span
								class="umar-l10">六</span></label>
						</div>
						<div class="ub ub-ac umar-l10 ubcheckweek">
							<label><input class="radioItem " type="checkbox"
								name="weekcheckbox" value="7" checked="checked" /><span
								class="umar-l10">日</span></label>
						</div>
						<input class="uinp ub ub-f1" type="hidden" id="weeklyActivityDay"
							name="weeklyActivityDay" value=" ">
					</div>
				</div>
				<div class="ub umar-t8">
					<div class="ub ub-ac umar-r20">
						<div class="umar-r10 uw-60 ut-r">广告名称:</div>
						<input id="actName" name="actName" class="uinp uw-300" type="text">
					</div>

					<div class="ub ub-ac umar-r40" id="branchTemp">
						<div class="umar-r10 uw-60 ut-r">机构列表:</div>
						<input class="uinp ub ub-f1" type="hidden" id="branchId"
							name="branchId"> <input class="uinp uw-300" type="text"
							id="branchName" name="branchName">
						<div class="uinp-more">...</div>
					</div>

				</div>
				<div class="ub umar-t8">
					<div class="ub ub-ac uw-764">
						<div class="umar-r10 uw-60 ut-r">备注:</div>
						<input class="uinp ub ub-f1" name="remark" id="remark" type="text"
							onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
							onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
							oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
							maxlength="50">
					</div>
				</div>
			</div>
		</form>
	<div class="ub ub-ver  umar-8 ubor ub-f1">
			<div class="ub umar-10">
				<div class="ub ub-ac umar-r20">
				<div class="umar-r10 uw-60 ut-r">展示时长:</div>
				<input id="timeNum" name="timeNum" class="uinp uw-416 easyui-numberbox easyui-validatebox"
					data-options="min:1,max:999999,precision:0" type="text" > 秒
				</div>
			</div>

			<div class="ub umar-10 umar-b30">
				<div class="ub ub-ac umar-r20 ">
				<div class="umar-r10 uw-60 ut-r">主图:</div>
				<input class="uinp ub ub-f1" type="hidden" id="imgVal"
				name="imgVal">
				<img id="mainImg" name="mainImg" src="${ctx}/static/images/addImg.png" onclick="imgUpload(event)"/>
				</div>
			</div>

				<div class="ub umar-10">
				<div class="ub ub-ac umar-r20">
				<div class="umar-r10 uw-60 ut-r">次图:</div>
					<input class="uinp ub ub-f1" type="hidden" id="img1Val"
					name="img1Val">
					<img id="img1"  src="${ctx}/static/images/addImg.png" onclick="imgUpload()"/>
				</div>

				<div class="ub ub-ac umar-r20">
					<input class="uinp ub ub-f1" type="hidden" id="img2Val"
					name="img2Val">
					<img id="img2"  src="${ctx}/static/images/addImg.png" onclick="imgUpload()"/>
				</div>

				<div class="ub ub-ac umar-r20">
					<input class="uinp ub ub-f1" type="hidden" id="img3Val"
					name="img3Val">
					<img id="img3"  src="${ctx}/static/images/addImg.png" onclick="imgUpload()"/>
				</div>

				</div>


	</div>

	</div>

</body>
</html>