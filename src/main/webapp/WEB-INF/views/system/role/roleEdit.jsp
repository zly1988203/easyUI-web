<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script  src="${ctx}/static/js/views/system/role/roleEdit.js"></script>
<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="updateRole()">保存</button>
			<button class="ubtns-item" onclick="closeDialog()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="addRoleForm" method="post" >
		<div class="ub ub-ver upad-4">
			<div class="ub umar-t20">
	            <div class="ub ub-ac umar-l20">
	                <div class="umar-r10 uw-60 ut-r">角色编码:</div>
	                <input id="id" name="id" type="hidden" value="${role.id }">
	                <input id="roleCode" name="roleCode" type="text" class="uinp uw-250" disabled="disabled" value="${role.roleCode }">
            	    <i class="uc-red">*</i>
	            </div>
          	</div>
          	<div class="ub umar-t20">
	            <div class="ub ub-ac umar-l20">
	                <div class="umar-r10 uw-60 ut-r">角色名称:</div>
	                <input  id="roleName" name="roleName" class="uinp uw-250 easyui-validatebox" value="${role.roleName }"
	                	data-options="required:true,validType:'userName'" maxlength="20" type="text">
                	<i class="uc-red">*</i>
	            </div>
          	</div>
          	<div class="ub umar-t20">
	            <div class="ub ub-ac umar-l20">
	               	<div class="umar-r10 uw-60 ut-r">角色类型:</div>
	               	<c:forEach var="i" items="${typeList }">
		               	<div class="ub ub-ac umar-r10">
							<label>
								<input class="ub" type="radio" name="branchType" value="${i.code }" disabled="disabled"
									<c:if test="${role.branchType eq i.code }"> checked="checked"</c:if> />${i.desc }
							</label>
						</div>
	               	</c:forEach>
	            </div>
          	</div>
			<div class="ub umar-t20"> 
	            <div class="ub ub-ac umar-l20">
	            	<div class="umar-r10 uw-60 ut-r">所属机构:</div>
	            	<input type="hidden" id="opBranchId" name="branchId" value="${role.branchId }">
	            	<div class="ub ub-ac">
	                	<input class="uinp uw-250" type="text" id="branchNameCode" name="branchNameCode" disabled="disabled" 
	                		<c:if test="${not empty role.branchId }">value="[${branch.branchCode }]${branch.branchName }" </c:if>
	                		<c:if test="${empty role.branchId }">value="[00000]总部" </c:if>
	                		 >
	                </div>
	                <i class="uc-red">*</i>
	            </div>
         	</div>
           	<div class="ub umar-t20"> 
             	<div class="ub ub-ac umar-l20">
                	<div class="umar-r10 uw-60 ut-r">备注:</div>
                	<textarea id="remark" name="remark" class="uh-40 uw-250"  maxlength="100">${role.remark }</textarea>
            	</div>
        	</div>
		</div>
	</form>
</div>