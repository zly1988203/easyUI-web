<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/component/publicPrintChoose.js"></script>

<div id="printSet">
	<div class="ub umar-t8 uhide">
		<div class="ub ub-ac uselectws umar-l50 umar-t20">
			<!--select-->
			<select class="easyui-combobox uselect " name="io" id="printTemplateSelect"
				data-options="editable:false">
			</select>
		</div>
	</div>
	<div class="uabtns umar-t20 uhide">
		<button class="uabtn umar-r10 " onclick="toPrintComponentPreview()">预览</button>
		<button class="uabtn umar-r10 " onclick="toPrintComponentSet()">设置</button>
		<button class="uabtn" onclick="toPrintComponentPrint()">打印</button>
	</div>
</div>
<input type="hidden" id="templateCode" />
<input type="hidden" id="controllerUrl" />
<input type="hidden" id="submitFrom" />