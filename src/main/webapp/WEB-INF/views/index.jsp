<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html> 
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>友门鹿·零售管理系统V1.2.0_DEV161027</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/index.js"></script>
</head>
<body>

<!--mleft-menu-two-->
<div id="left_menu_two"></div>
<!--end left-menu-two-->

<div class="basic-header">
	<div class="logo">
		<a href="javascript:void(0);">
			<img src="${ctx}/static/images/okdeer_logo.png">
			<span style="font-size: 20px;">零售管理系统</span>
		</a>
	</div><!--end logo -->
    
    <div class="header-load">
    	<a class="header-load-link"><span class="name">  ${user.userName }, 您好 </span> <i class="iconfont">&#xe606;</i></a>
        <div class="linkdiv">
        	<a href="${ctx}/system/logout">退出</a>
        </div><!--end linkdiv -->
    </div><!--end header-load -->
</div><!--end header -->

<div class="basic-body">
	<div class="left-big-menu">
    	<div class="scroll-y-box" id="leftMenuContent"></div><!--end scroll-y-box -->
    </div><!--end left-big-menu-->
    
    <div class="basic-right">
        <div class="sma-menu-switch" id="collapseIcon">
            <span class="bg">&nbsp;</span>
            <div class="con">
                <i class="iconfont switch-ico-left">&#xe60c;</i>
                <i class="iconfont switch-ico-right">&#xe60d;</i>
            </div><!--end con -->
        </div><!--end big-menu-switch -->
        
        <div class="basic-main">
            <div class="scroll-y-box basic-main-content">
            
				<!--start内容区 -->
            	<div id="component-content" class="easyui-tabs" fit="true" border="false">
                	
                    <%--<div title="首页" data-options="closable:false" >--%>
						<%--<iframe scrolling="auto" frameborder="0"  src="${ctx}/purchase/paymentOrder/index" style="width:100%;height:100%;"></iframe>--%>
                    <%--</div>--%>
                </div>  
				<!--end 内容区 -->
                

                
            </div><!--end scroll-y-box -->
        </div><!--end basic-main -->
	</div><!--end basic-right -->    
</div><!--end basic-body -->

<div id="mm" class="easyui-menu" style="width:120px;">
	<div id="mm-tabupdate">刷新</div>
	<!-- <div id="mm-tabrepeat">复制</div> -->
	<div class="menu-sep"></div>
	<div id="mm-tabclose">关闭</div>
	<div id="mm-tabcloseall">全部关闭</div>
	<div id="mm-tabcloseother">关闭其它</div>
	<div class="menu-sep"></div>
	<div id="mm-tabcloseright">关闭右侧</div>
	<div id="mm-tabcloseleft">关闭左侧</div>
	<div class="menu-sep"></div>
	<div id="mm-exit">退出</div>
</div><!--end menu -->
	
</body>
</html>

