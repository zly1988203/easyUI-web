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
<script src="${ctx}/static/js/views/sale/ad/adMain.js?V=${versionNo}4"></script>
	<style>
	.datagrid-header-row .datagrid-cell {
	text-align: center !important;
	}
	img{
		width:200px;
		height:200px;
		border:1px solid;
		cursor:pointer;
	}

	.uploadFile{
		position: absolute;
	}
	</style>

</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<c:choose>
		<c:when test="${form.id != null}">
			<input type='hidden' id="copyId" name="copyId" value="${form.id}">
			<input type='hidden' id="pageStatus" name="pageStatus" value="copy">
		</c:when>
		<c:otherwise>
			<input type='hidden' id="pageStatus" name="pageStatus" value="add">
		</c:otherwise>
	</c:choose>
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<div class="ub ub-ac upad-4">
			<div class="ubtns">
				<shiro:hasPermission name="posADForm:append">
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
						<input class="Wdate newWdate" readonly="readonly" name="beginDate"
							id="beginDate"
							onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-%d'})" value="<fmt:formatDate value="${form.beginDate}" pattern="yyyy-MM-dd" />"/>&nbsp;至&nbsp;
						<input class="Wdate newWdate" readonly="readonly" name="overDate"
							id="overDate"
							onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'beginDate\');}'})" value="<fmt:formatDate value="${form.overDate}" pattern="yyyy-MM-dd" />"/>
					</div>
					<div class="ub ub-ac">
						<div class="umar-r10 uw-60 ut-r">展示时段:</div>
						<input class="Wdate newWdate" readonly="readonly"
							name="beginTime" id="beginTime"
							onclick="WdatePicker({dateFmt:'HH:mm:ss',minDate:'00:00:00',maxDate:'#F{$dp.$D(\'overTime\');}'})" value="<fmt:formatDate value="${form.beginTime}" pattern="HH:mm:ss" />"/>&nbsp;至&nbsp;
						<input class="Wdate newWdate" readonly="readonly"
							name="overTime" id="overTime"
							onclick="WdatePicker({dateFmt:'HH:mm:ss',minDate:'#F{$dp.$D(\'beginTime\');}'})" value="<fmt:formatDate value="${form.overTime}" pattern="HH:mm:ss" />"/>
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
						<input class="uinp ub ub-f1" type="hidden" id="displayDay"
							name="displayDay" value="<c:out value="${form.displayDay}"/>">
					</div>
				</div>
				<div class="ub umar-t8">
					<div class="ub ub-ac umar-r20">
						<div class="umar-r10 uw-60 ut-r">广告名称:</div>
						<input id="adName" name="adName" class="uinp uw-300" type="text" maxLength="20" value="<c:out value="${form.adName}"/>">
					</div>

					<div class="ub ub-ac umar-r40" id="branchTemp">
						<div class="umar-r10 uw-60 ut-r">机构列表:</div>
						<input class="uinp ub ub-f1" type="hidden" id="branchIds"
							name="branchIds" value="<c:out value="${form.branchIds}"/>"> <input class="uinp uw-300" type="text"
							id="branchName" name="branchName" value="<c:out value="${form.branchName}"/>" readonly="readonly">
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
							maxlength="50" value="<c:out value="${form.remark}"/>">
					</div>
				</div>
			</div>

			<div class="ub ub-ver  umar-8 ubor ub-f1">
			<div class="ub umar-10">
				<div class="ub ub-ac umar-r20">
				<div class="umar-r10 uw-60 ut-r">展示时长:</div>
				<c:choose>
					<c:when test="${form.intervalTime != null}">
							<input id="intervalTime" name="intervalTime" class="uinp uw-416 easyui-numberbox easyui-validatebox"
								data-options="min:1,max:999999,precision:0,required:true" type="text" value="<c:out value="${form.intervalTime}"/>"> 秒
							</div>
					</c:when>
					<c:otherwise>
						<input id="intervalTime" name="intervalTime" class="uinp uw-416 easyui-numberbox easyui-validatebox"
						data-options="min:1,max:999999,precision:0,required:true" type="text" value="1"> 秒
						</div>
					</c:otherwise>
				</c:choose>
			</div>

			<div class="ub umar-10 umar-b30">
				<div class="ub ub-ac umar-r20 ">
				<div class="umar-r10 uw-60 ut-r">主图:</div>
				<c:choose>
					<c:when test="${!empty detail[0].picUrl}">
						<img id="mainImg" name="mainImg" src="<c:out value="${detail[0].picUrl}"/>" onclick="imgUpload(event)"/>
					</c:when>
					<c:otherwise>
						<img id="mainImg" name="mainImg" src="${ctx}/static/images/addImg.png" onclick="imgUpload(event)"/>
					</c:otherwise>
				</c:choose>
					<input type="hidden" id="mainImgVal" />

				</div>
			</div>

			<div class="ub umar-10">
				<div class="ub ub-ac umar-r20">
				<div class="umar-r10 uw-60 ut-r">次图:</div>
					<c:choose>
						<c:when test="${!empty detail[1].picUrl}">
							<img id="img1" name="img1" src="<c:out value="${detail[1].picUrl}"/>" onclick="imgUpload(event)"/>
						</c:when>
						<c:otherwise>
							<img id="img1" name="img1" src="${ctx}/static/images/addImg.png" onclick="imgUpload(event)"/>
						</c:otherwise>
					</c:choose>
					<input type="hidden" id="img1Val" />
				</div>

				<div class="ub ub-ac umar-r20">
					<c:choose>
						<c:when test="${!empty detail[2].picUrl}">
							<img id="img2" name="img2" src="<c:out value="${detail[2].picUrl}"/>" onclick="imgUpload(event)"/>
						</c:when>
						<c:otherwise>
							<img id="img2" name="img2" src="${ctx}/static/images/addImg.png" onclick="imgUpload(event)"/>
						</c:otherwise>
					</c:choose>
					<input type="hidden" id="img2Val" />
				</div>

				<div class="ub ub-ac umar-r20">
					<c:choose>
						<c:when test="${!empty detail[3].picUrl}">
							<img id="img3" name="img3" src="<c:out value="${detail[3].picUrl}"/>" onclick="imgUpload(event)"/>
						</c:when>
						<c:otherwise>
							<img id="img3" name="img3" src="${ctx}/static/images/addImg.png" onclick="imgUpload(event)"/>
						</c:otherwise>
					</c:choose>
					<input type="hidden" id="img3Val" />
				</div>

				</div>

		</form>
	</div>

</body>
</html>