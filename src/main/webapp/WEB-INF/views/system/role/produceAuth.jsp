<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>分配权限</title>
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<!-- <script type="text/javascript" src="http://aui.github.io/artTemplate/dist/template.js"></script> -->
	<script  src="${ctx}/static/js/views/system/role/produceAuth.js"></script>
	<style>
		.table-tree{width:1000px;margin-top:10px;}
		.table-tree *{box-sizing:border-box !important;}
		.bor-left{border-left: 1px solid #c9c9c9;}
        .bor-right{border-right: 1px solid #c9c9c9;}
        .bor-top{border-top: 1px solid #c9c9c9;}
        .bor-bottom{border-bottom: 1px solid #c9c9c9;}
        .bor-rb{border-bottom: 1px solid #c9c9c9;border-right: 1px solid #c9c9c9;}
        .bor-lt{border-left: 1px solid #c9c9c9;border-top: 1px solid #c9c9c9;}
        .label-item{display:inline-block}
	</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver  ub-f1 umar-4 upad-4">
	    <div class="ub ub-ac">
            <div class="ubtns">
                <div class="ubtns-item" onclick="saveRoleAuth()">保存</div>
                <div class="ubtns-item" onclick="window.top.refreshCurrTab()" >重置</div>
                <div class="ubtns-item" onclick="toClose()">退出</div>
            </div>
            <div class="ub ub-ac umar-l20 uc-black ufs-16 ufw-b">角色名称：${role.roleName }</div>
		</div>
		<input type="hidden" name="roleId" id="roleId" value="${role.id }" />
		<div class="ub uline umar-t8"></div>
		<div class="ub ub-f1 ub-ver table-tree"> 
		    <div class="ub ub-ac  uh-30 font-14">
		        <span class="ub uh ub-ac ub-pc uw-128 bor-lt bor-rb">一级</span>
		        <span class="ub uh ub-ac ub-pc uw-128 bor-top bor-rb">二级</span>
		        <span class="ub uh ub-ac ub-pc uw-150 bor-top bor-rb">三级</span>
		        <span class="ub uh ub-ac ub-pc uw-500 bor-top bor-rb">权限配置细则</span>
		    </div>
		    <!--一级start-->
		    <ul class="uw ub ub-ver" id="content">
		    	<c:forEach var="i1" items="${authList }">
				<li class="ub">
		            <div class="ub level">
		                <div class="ub ub-ac ub-pc uw-128 bor-rb bor-left">
		                    <label >
		                    	<input type="checkbox" id="${i1.id }" level="${i1.level }" 
		                        	class="parentNode oneNode" <c:if test="${i1.checked eq true }"> checked=checked </c:if> />${i1.name }
		                    </label>
		                </div>
		            </div>
		            <ul class="ub ub-ver levelContent two">
		            	<c:forEach var="i2" items="${i1.child }">
		                <li class="ub ">
		                    <div class="ub level">
		                        <div class="ub ub-ac ub-pc uw-128 bor-rb">
		                            <label>
		                            	<input type="checkbox" id="${i2.id }" parentId="${i2.parentId }" level="${i2.level }" 
		                            		class="parentNode twoNode" <c:if test="${i2.checked eq true }"> checked=checked </c:if> />${i2.name }
		                            </label>
		                        </div>
		                    </div>
		                    <ul class="ub ub-ver levelContent three">
		                        <c:forEach var="i3" items="${i2.child }">
		                        <li class="ub">
		                            <div class="ub ub-ac ub-pc uw-150 bor-rb level">
		                                <label>
		                                	<input type="checkbox" id="${i3.id }" parentId="${i3.parentId }" level="${i3.level }" 
		                            			class="parentNode threeNode" <c:if test="${i3.checked eq true }"> checked=checked </c:if> />${i3.name }
		                                </label>
		                            </div>
		                            <div class="ub bor-rb uw-500 upad-l10 upad-t10 upad-r10 levelContent">
		                                <div class="ub ub-ac">
		                                    <c:forEach var="i4" items="${i3.child }">
		                                        <label class="label-item umar-r10 umar-b10">
		                                        	<input type="checkbox" id="${i4.id }" parentId="${i4.parentId }" level="${i4.level }" 
		                            					class="treeItem" <c:if test="${i4.checked eq true }"> checked=checked </c:if> />${i4.name }
		                                        </label>
		                                    </c:forEach>
		                                </div><!--四级 end-->
		                            </div>
		                        </li>
		                        </c:forEach>
		                    </ul><!--三级 end-->
		                </li>
		                </c:forEach>
		            </ul><!--二级 end-->
		        </li>
		        </c:forEach>
		    </ul><!--一级 end-->
		</div>
	</div>
</body>
</html>