<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>打印模板设计</title>
    <link rel="stylesheet" href="${ctx}/static/common/printdesign/css/easyui.css" />
    <link rel="stylesheet" href="${ctx}/static/common/printdesign/css/icon.css" />    
    <link rel="stylesheet" href="${ctx}/static/common/printdesign/css/ribbon.css" />
    <link rel="stylesheet" href="${ctx}/static/common/printdesign/css/ribbon-icon.css?v=55" />
</head>
<body>
    <div id="rr"></div>
    <div id="t"></div>

    <script type="text/javascript">
    	var rootPath="${ctx}";
    </script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/jquery.min.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/json2.js"></script>        
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/loader.js"></script>
    
    <link rel="stylesheet" href="${ctx}/static/common/printdesign/css/print.css?ver=4" />
    <link rel="stylesheet" href="${ctx}/static/common/printdesign/css/mediaPrint.css?ver=4" />
    
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/global.js?time="+ $.now()></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/jquery-migrate-1.1.0.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/grid.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/jquery.ribbon.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/jqprint.js?ver="></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/helper.js?ver="></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/control.js?ver=1"></script>
	<script type="text/javascript" src="${ctx}/static/common/printdesign/js/designData.js?ver=1"></script>
	<script type="text/javascript" src="${ctx}/static/common/printdesign/js/defaultData.js?ver=1"></script>
	<script type="text/javascript" src="${ctx}/static/common/printdesign/js/design.js?ver=3"></script>

</body>
</html>
