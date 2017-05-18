
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<div id="tt" class="easyui-tabs" style="width: 500px; height: 250px;">
	<div title="基本信息" style="padding: 20px; display: none;">
	<div class="ub ub-ver ub-f1 uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
	<div class="ubtns">
	<button class="ubtns-item" onclick="updateBranch()">保存</button>
	<button class="ubtns-item" onclick="closeDialogHandel()">关闭</button>
	</div>
	</div>
	<div class="ub uline"></div>
	<form id="formEdit" method="post">
	<div class="ub ub-ver upad-4">
	<div class="ub upad-4">
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">机构编号:</div>
	<input id="id" name="id" type="hidden" value="${supplier.id }">
	<input id="supplierCode" name="supplierCode" class="uinp uw-200"
	type="text" readonly="readonly" value="${supplier.supplierCode }">
	</div>
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">机构名称:</div>
	<input id="supplierName" name="supplierName" class="uinp"
	maxlength="50" value="${supplier.supplierName }">

	</div>
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">机构类型:</div>
	<input id="branchCodeName" name="branchCodeName"
	class="uinp uw-200" type="text" readonly="readonly"
	value="[${branch.branchCode }]${branch.branchName }"> <input
	id="branchId" name="branchId" type="hidden"
	value="${supplier.branchId }">

	</div>
	</div>

	<div class="ub upad-4">
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">联系人:</div>
	<input id="contcat" name="contcat" value="${supplier.contcat }"
	class="uinp uw-200" type="text">

	</div>
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">绑定手机:</div>
	<input id="mobile" name="mobile" value="${supplier.mobile }"
	class="uinp uw-200 easyui-validatebox"
	data-options="validType:'mobile'" type="text">

	</div>
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">固定电话:</div>
	<input id="phone" name="phone" value="${supplier.phone }"
	class="uinp easyui-validatebox" data-options="validType:'phone'"
	maxlength="20">
	</div>
	</div>

	<div class="ub upad-4">
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">绑定邮箱:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">所属区域:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">参考分店:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	</div>

	<div class="ub upad-4">
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">所属机构:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">配送价格:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">加价率:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	</div>

	<div class="ub upad-4">
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">要货机构:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">最低进货金额:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">所在地区:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	</div>

	<div class="ub upad-4">
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">业务专员:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">费用均摊年数:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">店铺面积:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	</div>

	<div class="ub upad-4">
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">修改人:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">修改时间:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">建档人:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>

	</div>

	<div class="ub upad-4">
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r">建档时间:</div>
	<input id="email" name="email" value="${supplier.email }"
	class="uinp easyui-validatebox" maxlength="50">

	</div>
	</div>



	<div class="ub upad-4">
	<div class="ub ub-ac ub-f1 umar-r36">
	<div class="umar-r10 uw-80 ut-r">备注:</div>
	<input id="remark" name="remark" class="uinp ub ub-f1" type="text"
	value="${supplier.remark }">
	</div>
	</div>
	<div class="ub upad-4">
	<div class="ub ub-ac uw-320">
	<div class="umar-r10 uw-80 ut-r"></div>
	<label><input id="isDirect" name="isDirect"
	type="checkbox"
	<c:if test="${supplier.isDirect}">checked="checked"</c:if>>直送供应商</label>
	</div>
	</div>

	</div>
	</form>
	</div>


	</div>

	<div title="机构费用" style="padding: 20px; display: none;">
	<table id="pg"></table>

	</div>

</div>