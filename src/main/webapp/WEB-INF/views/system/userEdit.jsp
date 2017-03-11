<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/system/user/userEdit.js"></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="editUser()">保存</button>
			<button class="ubtns-item" onclick="closeDialog()">关闭</button>
		</div>
	</div>
	<div class="ub uline "></div>
	<form id="editUserForm" class="uncenter" method="post">
		<div style="display: inline-block;">
			<div class="ub umar-t20">
				<div class="ub ub-ac umar-l20">
					<div class="umar-r10 uw-60 ut-r">用户编码:</div>
					<input id="userCode" name="userCode" value="${user.userCode }"
						class="uinp uw-250" type="text" maxlength="4" readonly="readonly">
					<input id="id" name="id" type="hidden" value="${user.id }" /> <i
						class="uc-red">*</i>
				</div>
			</div>
			<div class="ub umar-t20">
				<div class="ub ub-ac umar-l20">
					<div class="umar-r10 uw-60 ut-r">用户名称:</div>
					<input id="userName" name="userName" value="${user.userName }"
						class="uinp uw-250 easyui-validatebox"
						data-options="required:true,validType:'userName'" type="text">
					<i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub umar-t20">
				<div class="ub ub-ac umar-l20">
					<div class="umar-r10 uw-60 ut-r">手机号:</div>
					<input id="mobile" name="mobile" value="${user.mobile }"
						class="uinp uw-250 easyui-validatebox"
						data-options="required:false,validType:'mobile'" type="text">

				</div>
			</div>
			<div class="ub umar-t20">
				<div class="ub ub-ac umar-l20">
					<div class="umar-r10 uw-60 ut-r">所属机构:</div>
					<input class="uinp" type="hidden" id="opBranchId" name="branchId"
						value="${user.branchId }"> <input class="uinp"
						type="hidden" id="opBranchCode" name="branchCode"
						value="${branch.branchCode }"> <input class="uinp"
						type="hidden" id="opBranchType" name="opBranchType"
						value="${branch.type }"> <input class="uinp" type="hidden"
						id="opBranchCompleCode" name="opBranchCompleCode"
						value="${branch.branchCompleCode }">
					<div class="ub ub-ac">
						<input class="uinp uw-250" type="text" id="branchNameCode"
							name="branchNameCode"
							value="[${branch.branchCode }]${branch.branchName }"
							readonly="readonly" onclick="searchBranchInfo();">
						<div class="uinp-more" onclick="searchBranchInfo()">...</div>
					</div>
					<i class="uc-red">*</i>
				</div>
			</div>
			<div class="ub umar-t20">
				<div class="ub ub-ac umar-l20">
					<div class="umar-r10 uw-60 ut-r">所属角色:</div>
					<input class="uinp" type="hidden" id="opRoleId" name="roleId"
						value="${role.id }"> <input class="uinp" type="hidden"
						id="opRoleCode" name="roleCode" value="${role.roleCode }">
					<input type="hidden" id="roleIdOld" name="roleIdOld"
						value="${role.id }"> <input type="hidden" id="roleCodeOld"
						name="roleCodeOld" value="${role.roleCode }">
					<div class="ub ub-ac">
						<input class="uinp uw-250" type="text" id="roleCodeOrName"
							name="roleCodeOrName" value="${role.roleName }"
							readonly="readonly" onclick="searchRole();">
						<div class="uinp-more" onclick="searchRole()">...</div>
					</div>
					<i class="uc-red">*</i>
				</div>
			</div>
			<div class="ub umar-t20">
				<div class="ub ub-ac umar-l20">
					<div class="umar-r10 uw-60 ut-r">最大折扣比率:</div>
					<input id="maxDiscountRadio" name="maxDiscountRadio" class="uinp uw-230 easyui-numberbox easyui-validatebox" 
						data-options="required:true,min:1,max:100,precision:0" type="text" value="${user.maxDiscountRadio }">
					%
					<i class="uc-red">*</i>
				</div>
			</div>
			<div class="ub umar-t20">
				<div class="ub ub-ac umar-l20">
					<div class="umar-r10 uw-60 ut-r">备注:</div>
					<textarea id="remark" name="remark" class="uh-40 uw-250"
						maxlength="100">${user.remark }</textarea>
				</div>
			</div>
		</div>
	</form>

</div>
