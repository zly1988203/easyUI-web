<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="user" value="${sessionScope.session_user}"/>
<script  src="${ctx}/static/js/views/system/role/roleAdd.js?V=${versionNo}"></script>
<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="addRole()">保存</button>
			<button class="ubtns-item" onclick="closeDialog()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="addRoleForm" method="post" >
		<div class="ub ub-ver upad-4">
			<!-- <div class="ub umar-t20">
	            <div class="ub ub-ac umar-l20">
	                <div class="umar-r10 uw-60 ut-r">角色编码:</div>
	                <input  id="roleCode" name="roleCode" class="uinp uw-250 easyui-validatebox" 
	                	data-options="required:true" type="text" maxlength="50">
            	    <i class="uc-red">*</i>
	            </div>
          	</div> -->
          	<div class="ub umar-t20">
	            <div class="ub ub-ac umar-l20">
	                <div class="umar-r10 uw-60 ut-r">角色名称:</div>
	                <input  id="roleName" name="roleName" class="uinp uw-250 easyui-validatebox" 
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
								<input type="radio" name="branchType" value="${i.code }"
								<c:if test="${user.branchType gt 1 }"> checked="checked"</c:if> />
								<span>${i.desc }</span>
							</label>

							
						</div>
	               	</c:forEach>
	            </div>
          	</div>
          	<c:if test="${user.branchType eq 0 }">
          	<div class="ub umar-t20">
	            <div class="ub ub-ac umar-l20">
	               	<div class="umar-r10 uw-60 ut-r">是否通用:</div>
	               	<div class="ub ub-ac umar-r10">
						<label>
							<input  type="radio" name="isCommonRole" value="0" checked="checked" />
							<span>机构角色</span>
						</label>

						
					</div>
					<div class="ub ub-ac umar-r10">
						<label>
						<input  type="radio" name="isCommonRole" value="1"  />
						<span>通用角色</span>
						</label>
					</div>
	            </div>
          	</div>
          	</c:if>
			<div class="ub umar-t20"> 
	            <div class="ub ub-ac umar-l20">
	            	<div class="umar-r10 uw-60 ut-r">所属机构:</div>
	            	
	            	<!-- 总部可以选择机构 -->
	            	<c:if test="${user.branchType eq 0 }">
		            	<input type="hidden" id="opBranchId" name="branchId">
		                <input type="hidden" id="opBranchCode" name="branchCode" >
		                <input type="hidden" id="opBranchType" name="opBranchType">
		                <input type="hidden" id="opBranchCompleCode" name="opBranchCompleCode">
		                <div class="ub ub-ac">
		                	<input class="uinp uw-250" type="text" id="branchNameCode" name="branchNameCode" readonly="readonly" onclick="searchBranchInfo()">
		                	<div class="uinp-more" id="branchNameCodeMore"  onclick="searchBranchInfo()">...</div>
		                </div>
		                <i class="uc-red">*</i>
	            	</c:if>
	            	
	            	<!-- 其它类型默认当前机构 -->
	            	<c:if test="${user.branchType gt 0 }">
		            	<input type="hidden" id="opBranchId" name="branchId" value="${user.branchId }">
		            		<div class="ub ub-ac">
		                	<input class="uinp uw-250" type="text" id="branchNameCode" name="branchNameCode" value="[${user.branchCode }]${user.branchName }" 
		                		readonly="readonly" disabled="disabled" >
		                </div>
		                <i class="uc-red">*</i>
	            	</c:if>
	            </div>
         	</div>
           	<div class="ub umar-t20"> 
             	<div class="ub ub-ac umar-l20">
                	<div class="umar-r10 uw-60 ut-r">备注:</div>
                	<textarea id="remark" name="remark" class="uh-40 uw-250"  maxlength="100"></textarea>
            	</div>
        	</div>
		</div>
	</form>
</div>