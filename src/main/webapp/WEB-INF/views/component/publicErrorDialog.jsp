<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/component/publicErrorDialog.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.min.js" ></script>
<style>
	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
	::-webkit-scrollbar
	{
	width: 10px;
	height: 106px;
	background-color: #c9c9c9;
	}

	/*定义滚动条轨道 内阴影+圆角*/
	::-webkit-scrollbar-track
	{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: rgb(255,255,255);
	}

	/*定义滑块 内阴影+圆角*/
	::-webkit-scrollbar-thumb
	{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #c6c6c6;
	}
	.dialog-button { text-align:center;background-color:rgb(255,255,255); }
	.window .window-body {
	border-width: 0px;
	}
	</style>

	<div class="umar-l20 umar-r20 umar-t20 umar-b10" style="border:none;">
	<div class="ub ub-ac">
	<div class="ub uh-200"  style="word-break: break-all; word-wrap:break-word;" id="content"></div>
	</div>

	</div>



	<%--<div class="ub ub-ac ub-pc">--%>
	<%--<div class="ubtn umar-r20" onclick="closeErrorDialog();">关闭</div>--%>
	<%--</div>--%>


