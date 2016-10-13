<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/system/user/userAdd.js"></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
    <div class="ub ub-ac upad-4">
        <div class="ubtns">
            <button class="ubtns-item" onclick="addUser()">保存</button>
            <button class="ubtns-item" onclick="closeDialog()">返回</button>
        </div>
    </div>
    <div class="ub uline "></div>
    <form id="addUserForm" method="post">
        <div class="ub ub-ver upad-4">
            <div class="ub upad-4 umar-r60">
            	<div class="umar-r10 uw-60 ut-r">用户编码:</div>
                <input id="userCode" name="userCode" class="uinp easyui-validatebox" data-options="required:true" type="text" maxlength="20">
            	<i class="uc-red">*</i>
            </div>
            <div class="ub upad-4 umar-r60">
            	<div class="umar-r10 uw-60 ut-r">用户名称:</div>
                <input id="userName" name="userName" class="uinp easyui-validatebox" data-options="required:true" type="text" maxlength="20">
                <i class="uc-red">*</i>
            </div>
            <div class="ub upad-4 umar-r60">
            	<div class="umar-r10 uw-60 ut-r">登录密码:</div>
                <input id="password" name="password" class="uinp easyui-validatebox" data-options="required:true" type="password" maxlength="20">
                <i class="uc-red">*</i>
            </div>
            <div class="ub upad-4 umar-r60">
            	<div class="umar-r10 uw-60 ut-r">手机号:</div>
                <input id="mobile" name="mobile" class="uinp" data-options="required:true" type="text" maxlength="20">
            </div>
            <div class="ub upad-4 umar-r60">
            	<div class="umar-r10 uw-60 ut-r">所属机构:</div>
                <input class="uinp" type="hidden" id="opBranchId" name="branchId">
                <input class="uinp" type="hidden" id="opBranchType" name="opBranchType">
                <input class="uinp" type="hidden" id="opBranchCompleCode" name="opBranchCompleCode">
                <input class="uinp" type="text" id="branchNameCode" name="branchNameCode" readonly="readonly" onclick="searchBranchInfo();">
                <i class="uc-red">*</i>
            </div>
            <div class="ub upad-4 umar-r60">
            	<div class="umar-r10 uw-60 ut-r">所属角色:</div>
                <input class="uinp" type="hidden" id="opRoleId" name="roleId">
                <input class="uinp" type="hidden" id="opRoleCode" name="roleCode">
                <input class="uinp" type="text" id="roleCodeOrName" name="roleCodeOrName" readonly="readonly" onclick="searchRole();">
                <i class="uc-red">*</i>
            </div>
            <div class="ub upad-4">
                <div class="umar-r10 uw-60 ut-r">备注:</div>
                <textarea id="remark" name="remark" class="uh-40" style="width: 260px;" maxlength="100"></textarea>
            </div>

        </div>
    </form>

</div>
