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
<iframe id="${sheetNo}" scrolling="auto" frameborder="0" src="/okdeerjxc/printdesign/design?page=${page}&amp;controller=${controllerUrl}&amp;template=-1&amp;sheetNo=${sheetNo}&amp;gridFlag=PAGrid" style="width:0;height:0;"></iframe>
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
    <link rel="stylesheet" href="${ctx}/static/common/printdesign/css/mediaPrint.css?ver=" >   
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/jquery-migrate-1.1.0.js"></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/helper.js?ver="></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/jqprint.js?ver="></script>
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/designPrint.js?ver="></script>
     
    <script type="text/javascript" src="${ctx}/static/common/printdesign/js/control.js?ver="></script>
	<script type="text/javascript" src="${ctx}/static/common/printdesign/js/designData.js?ver="></script>
	<script type="text/javascript" src="${ctx}/static/common/printdesign/js/defaultData.js?ver="></script>
	<script type="text/javascript" src="${ctx}/static/common/printdesign/js/design.js?ver="></script>
     
     
     
    <script type="text/javascript">
    	//获取预览页签
   		function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
   		var form = getUrlParam("form");
   		if(form=="list"){
   		  $("#${sheetNo}").on("load",function(){
   			  setTimeout(function(){
   			      //加载完成，需要执行的代码
   	   			var ifra = form=="list"?window.frames["${sheetNo}"]:window.parent['${tabId}'];
   	        	ifra.contentWindow.refreshPreviewOptions();
   	        	var options = ifra.contentWindow.document;
   	        	initHandel(options);
   			  },100)
   	    
   	      });
   		}
   		else if(form=="print"){
   		$("#${sheetNo}").on("load",function(){
     	   setTimeout(function(){
   			 var ifra =window.frames["${sheetNo}"];
   			 ifra.contentWindow.refreshPreviewOptions();
	         var options = ifra.contentWindow.document;
	         initHandelprint(options);
     		},100)
     	   	    
 	        });
   		}
   		else{
   			var options = window.parent['${tabId}'];
   			initHandel(options);
   		}
    	
    	function initHandel(argoptions){
    		var options = argoptions;
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
    	}
    	
    	function initHandelprint(argoptions){
    		var options = argoptions;
    		 //设置明细列
            options.rows=${jsonDetail};
            
    	    //创建打印页
    	   // options.isPreview = true;
    	    
    	    //创建预览页面
    	   // $("#divPrint").createPages(options,${jsonReplace});
    	    
    	    //打印按钮点击事件
    	    //$("#btnPrint").click(function () {
    	    	options.isPreview = false;  
    	        $.sheetDesignPrint(options,${jsonReplace});
    	    //});
    	}
    </script>
</body>
</html>
