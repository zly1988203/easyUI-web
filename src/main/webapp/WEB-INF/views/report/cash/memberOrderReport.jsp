<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>会员消费查询</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/cash/memberOrderReport.js?V=${versionNo}"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	            <shiro:hasPermission name="JxcMemberOrderReport:search">
	                <div class="ubtns-item" onclick="query()">查询</div>
                </shiro:hasPermission>
                <shiro:hasPermission name="JxcMemberOrderReport:print">
	                <div class="ubtns-item" onclick="printReport()">打印</div>
                </shiro:hasPermission>
                <shiro:hasPermission name="JxcMemberOrderReport:export">
	                <div class="ubtns-item" onclick="exportData()">导出</div>
                </shiro:hasPermission>
	                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
                </div>
	           	<!-- 引入时间选择控件 -->
	            <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
            </div>

	        <div class="ub uline umar-t8"></div>

          <div class="ub umar-t8">
               <div class="ub ub-ac">
                   <div class="umar-r10 uw-70 ut-r">机构:</div>
                   <input type="hidden" name="startCount" id="startCount" value="" />
				   <input type="hidden" name="endCount" id="endCount" value="" />
                   <input class="uinp" type="hidden" id="branchCode" name="branchCode" />
                   <input class="uinp" type="hidden" id="branchId" name="branchId" value="${branchId}" />
                   <input class="uinp" type="text" id="branchNameOrCode" name="branchNameOrCode" onblur="clearBranchCode()" />
                   <div class="uinp-more" onclick="searchBranch()">...</div>
               </div>
               <div class="ub ub-ac umar-r40">
				<div class="umar-r10 uw-60 ut-r">会员:</div>
				<input type="text" name="buyerUserName" id="buyerUserName" class="uinp" placeholder="输入手机号"/>
			  </div>
			  <div class="ub ub-ac umar-r40">
			  	<div class="umar-r10 uw-60 ut-r">订单号:</div>
				<input type="text" name="orderNo" id="orderNo" class="uinp" placeholder="输入订单号"/>
			  </div>
            </div>

            <div class="ub umar-t8">
                <!--input-checkbox-->
                <div class="ub ub-ac">
                   <div class="umar-r10 uw-70 ut-r">汇总类型:</div>
                    <div class="ub ub-ac umar-r10 ">
                        <input class="radioItem" id="buyerUserReport" type="radio" name="queryType" value="memberOrderAll" checked="checked"/>
                        <label for="buyerUserReport">汇总统计</label>
                    </div>
                    <div class="ub ub-ac umar-r10">
                        <input class="radioItem" id="buyerUserReportList" type="radio" name="queryType" value="memberOrderList"  />
                        <label for="buyerUserReportList">消费明细</label>
                    </div>
                </div>
            </div>
       	</form>
        <div class="ub ub-f1 umar-t20">
			 <table id="memberOrderData"></table>
		</div>
    </div>
</body>
</html>