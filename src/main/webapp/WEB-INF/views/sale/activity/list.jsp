<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>促销管理</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/sale/activity/list.js"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="queryForm()">查询</div>
					<div class="ubtns-item" onclick="addActivity()">新增</div>
					<div class="ubtns-item" onclick="delActivity()">删除</div>
	                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>

            </div>
	        <div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
	               <div class="ub  ub-ac">
	                   <div class="umar-r10 uw-80 ut-r">活动店铺:</div>
		                    <input class="uinp ub ub-f1" type="hidden" id="branchId" name="branchId">
	                        <input class="uinp ub ub-f1" type="text" id="branchName" readonly="readonly" name="branchName" onclick="searchBranch()">
	                   <div class="uinp-more" onclick="searchBranch()">...</div>
	                </div>
	                 <div class="ub ub-ac uw-330">
	                    <div class="umar-r10 uw-80 ut-r">活动编号:</div>
	                    <input class="uinp ub ub-f1" type="text" name="activityCode" id="activityCode">
	                 </div>
	                 <div class="ub ub-ac umar-l40 uw-300">
	                    <div class="umar-r10 uw-70 ut-r">活动类型:</div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="activityType" value="" checked="checked" /><span>全部</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="activityType"  value="1" /><span>特价</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="activityType" value="2" /><span>折扣</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="activityType" value="3"  /><span>偶数特价</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="activityType" value="4"  /><span>换购</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="activityType" value="5"  /><span>满减</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="activityType" value="6"  /><span>组合特价</span>
	                    </div>
	                </div>
            </div>
	        <div class="ub umar-t8">
	            <div class="ub ub-ac">
                    <div class="umar-r10 uw-80 ut-r">活动名称:</div>
                    <input class="uinp" type="text" name="activityName" id="activityName">
                </div>
<!-- 				<div class="ub ub-ac ">
					<div class="umar-r10 uw-80 ut-r">商品名称:</div>
					<input class="uinp" type="text" name="skuName" id="skuName">
				</div> -->
                <div class="ub ub-ac umar-r10 uw-300">
	                    <div class="umar-r10 uw-80 ut-r">活动状态:</div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="activityStatus" value=""/><span>全部</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="activityStatus" value="0" checked="checked" /><span>未审核</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="activityStatus" value="1" /><span>已审核</span>
	                    </div>
	                <div class="ub ub-ac umar-r10">
	                        <input class="ub" type="radio" name="activityStatus" value="2"  /><span>已终止</span>
	                    </div>
	                 </div>
	            
	        </div>
       	</form>
           
      
      <div class="ub ub-f1 umar-t20">
			 <table id="saleMange"></table>
		</div>
    </div>

</body>
</html>