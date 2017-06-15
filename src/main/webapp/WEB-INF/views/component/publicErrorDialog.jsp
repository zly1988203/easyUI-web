<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/component/publicErrorDialog.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.min.js" ></script>
<style>
	
	.dialog-button { text-align:center;background-color:rgb(255,255,255);margin:auto; }
	.window .window-body {
		border-width: 0px;
	}
	.error-content{word-break: break-all; word-wrap:break-word;overflow-y: auto;  box-sizing: border-box !Important;padding-right: 2px;}
	.error-content::-webkit-scrollbar{width:8px;}
	.error-content::-webkit-scrollbar-track{background-color:#efefef;}
	.error-content::-webkit-scrollbar-thumb{background-color:#BCBCBC;}
	
	.error-content::-moz-scrollbar{width:8px;}
	.error-content::-moz-scrollbar-track{background-color:#efefef;}
	.error-content::-moz-scrollbar-thumb{background-color:#BCBCBC;}

	.error-content::-o-scrollbar{width:8px;}
	.error-content::-o-scrollbar-track{background-color:#efefef;}
	.error-content::-o-scrollbar-thumb{background-color:#BCBCBC;}

	.error-content::-ms-scrollbar{width:8px;}
	.error-content::-ms-scrollbar-track{background-color:#efefef;}
	.error-content::-ms-scrollbar-thumb{background-color:#BCBCBC;}
	
</style>

<div class="uw uh ubor-none ufs-12" style="overflow: hidden" >
	<div class="ub uh upad-t16 upad-l12 upad-r4">
		<div class="error-content uw uh-120" id="content"></div>
	</div>
</div>



