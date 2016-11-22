<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>打印预览</title>
    <link rel="stylesheet" href="${ctx}/static/common/printdesign/css/easyui.css" />
</head>
<body>
    <div>
        <input id="btnPrint" class='noPrint' type='button' value='打印' />
    </div>
    <div>
        <div id="divPrint"></div>
    </div>    
    <script type="text/javascript">
    	var rootPath="${ctx}";
    </script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/jquery.min.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/json2.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/loader.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/global.js?time="+ $.now()></script>
    <link rel="stylesheet" href="${ctx}/static/common/printdesign/css/preview.css?ver=" />
    <link rel="stylesheet" href="${ctx}/static/common/printdesign/css/mediaPrint.css?ver=" />   
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/jquery-migrate-1.1.0.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/helper.js?ver="></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/jqprint.js?ver="></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/designPrint.js?ver="></script>
     
    <script type="text/javascript">
    	//获取预览页签
    	var options = window.parent['${tabId}'];
    	
        //设置明细列
        options.rows=${jsonDetail};
        
	    //创建打印页
	    options.isPreview = true;
	    
	    //创建预览页面
	    $("#divPrint").createPages(options,${jsonReplace});
	    
	    //打印按钮点击事件
	    $("#btnPrint").click(function () {
	    	options.isPreview = false;  
	        $.sheetDesignPrint(options,${jsonReplace});
	    });
    </script>
    
</body>
</html>
