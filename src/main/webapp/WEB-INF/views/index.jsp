<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html> 
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>友门鹿·零售管理系统</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/index.js"></script>
	<style>
		.msg-ul{width:100%;overflow:hidden;}
		.msg-li{float:left;width:33.333%;margin-bottom:6px;}
	</style>
</head>
<body>

<iframe width="0" height="0" src="${ctx}/sessionKeeper">
</iframe>

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
    	<span>消息提醒（<a onClick="openMsg()" title="点击查看" class="uc-red" style="color: #ff0000 !important;" id="messageAllCount">36</a>）</span>
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
                
                <!--消息提醒 start-->
			<div id="msgDialog" class="easyui-dialog" title="消息提醒" style="width:600px;height:600px;display: none;"data-options="modal:true,closed:true">   
			   		<div class="ub uh ub-ver ufs-14 ubgc-bg">
			   		
			   			<div class="ub ub-ver ubgc-while">
				   			<p class="ub ufs-16 ufw-b upad-8">异常库存提醒</p>
				   			<p class="ub uline">
				   			<div class="ub upad-t10 upad-b10 upad-8">
				   				<ul class="msg-ul crbox">
				   					<li class="msg-li"><a class="" href="javascript:openNewTab('库存异常查询','stock/exception/list');">异常库存商品（<em class="uc-red" id="oneExceptionCount">0</em>）</a></li>
				   				</ul>
				   			</div>
			   			</div><!-- end 异常库存提醒 -->
			   			
			   			<div class="ub ub-ver umar-t10 ubgc-while">
				   			<p class="ub ufs-16 ufw-b upad-8">收货提醒</p>
				   			<p class="ub uline">
				   			<div class="ub upad-t10 upad-b10 upad-8">
				   				<ul class="msg-ul crbox">
				   					<li class="msg-li"><a class="">采购收货提醒（<em class="uc-red" id="twoPurchaseCount">0</em>）</a></li>
				   					<li class="msg-li"><a class="">配送收货提醒（<em class="uc-red" id="twoDeliverFormCount">0</em>）</a></li>
				   				</ul>
				   			</div>
			   			</div><!-- end 收货提醒 -->
			   			
			   			<div class="ub ub-ver umar-t10 ubgc-while">
				   			<p class="ub ufs-16 ufw-b upad-8">未审核单据</p>
				   			<p class="ub uline">
				   			<div class="ub upad-t10 upad-b10 upad-8">
				   				<ul class="msg-ul crbox">
				   				
				   					<shiro:hasPermission name="JxcPriceAdjust:audit"><li class="msg-li"><a class="">调价单（<em class="uc-red" id="priceAdjustMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcStockLead:audit"><li class="msg-li"><a class="">领用单（<em class="uc-red" id="stockLeadMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcBranchPriceAdjust:audit"><li class="msg-li"><a class="">门店调价单（<em class="uc-red" id="branchPriceAdjustMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcCombineSplit:audit"><li class="msg-li"><a class="">组合拆分单（<em class="uc-red" id="combineSplitMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcPurchaseOrder:audit"><li class="msg-li"><a class="">采购订单（<em class="uc-red" id="purchaseOrderMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="activityList:audit"><li class="msg-li"><a class="">活动管理（<em class="uc-red" id="activityListMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcPurchaseReceipt:audit"><li class="msg-li"><a class="">采购收货（<em class="uc-red" id="purchaseReceiptMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcNewGoodsApply:audit"><li class="msg-li"><a class="">新品审核（<em class="uc-red" id="newGoodsApplyMess">0</em>）</a></li></shiro:hasPermission>
				   					
				   					<shiro:hasPermission name="JxcPurchaseRefund:audit"><li class="msg-li"><a class="">采购退货（<em class="uc-red" id="purchaseRefundMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcDeliverDA:audit"><li class="msg-li"><a class="">要货申请（<em class="uc-red" id="deliverDAMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcCostAdjust:audit"><li class="msg-li"><a class="">成本调价单（<em class="uc-red" id="costAdjustMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcDeliverDR:audit"><li class="msg-li"><a class="">退货申请（<em class="uc-red" id="deliverDRMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcStockReimburse:audit"><li class="msg-li"><a class="">报损单（<em class="uc-red" id="stockReimburseMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcDeliverDI:audit"><li class="msg-li"><a class="">配送入库（<em class="uc-red" id="deliverDIMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcDeliverDO:audit"><li class="msg-li"><a class="">配送出库（<em class="uc-red" id="deliverDOMess">0</em>）</a></li></shiro:hasPermission>
				   					
				   					<shiro:hasPermission name="JxcOverdueApply:audit"><li class="msg-li"><a class="">商品调价单（<em class="uc-red" id="overdueApplyMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcDeliverDD:audit"><li class="msg-li"><a class="">店间配送（<em class="uc-red" id="deliverDDMess">0</em>）</a></li></shiro:hasPermission>
				   					<shiro:hasPermission name="JxcStockAdjust:audit"><li class="msg-li"><a class="">库存调整单（<em class="uc-red" id="stockAdjustMess">0</em>）</a></li></shiro:hasPermission>
				   				</ul>
				   			</div>
			   			</div><!-- end 未审核单据 -->
			   		</div>
			</div> <!--消息提醒  end-->

                
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

<script type="text/javascript">
	document.onkeydown = function(e) {
	    if (event.ctrlKey && event.altKey && 67 == e.keyCode){
	        alert("当前版本:V2.3.0_A30");
	    }
	}
	
	/* -- 消息提醒 start ------- */
	$(function(){
		//$("#msgDialog").dialog("close");//默认关闭 
	});
	
	function openMsg(){
		$("#msgDialog").show().dialog('open');
	}
		
	/* -- 消息提醒 end ------- */
</script>
</body>
</html>

