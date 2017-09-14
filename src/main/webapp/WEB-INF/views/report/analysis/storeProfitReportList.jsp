
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>门店利润查询报表</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/report/analysis/storeProfitReportList.js?V=${versionNo}"></script>
<style>
.datagrid-header .datagrid-cell {
	text-align: center !important;
	font-weight: bold;
}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
     
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="queryForm()">查询</div>
	                <div class="ubtns-item" onclick="exportData()">导出</div>
	              	<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">关闭</div>
	            </div>
	           	<!-- 引入时间选择控件 -->
	           <div class="ub ub-ac umar-l20">
	           		<div class="umar-r10 uw-70 ut-r">时间:</div>
	              	<input class="Wdate"  readonly="readonly" name="rptDate" id="rptDate" onclick="selectMonth()"  />
	            </div>
            </div>
	        <div class="ub uline umar-t8"></div>
	        
	        <div class="ub umar-t8">
                <div class="ub ub-ac" id="branchSelect">
                   <div class="umar-r10 uw-70 ut-r">机构:</div>
                   <input type="hidden" id="branchCompleCode" name="branchCompleCode">
                   <input class="uinp ub ub-f1" type="text" id="branchCodeName"  name="branchCodeName"
                   		readonly="readonly">
                   <div class="uinp-more">...</div>
                </div>
                
                <div class="ub ub-ac umar-l70">
					<div class="umar-r10 uw-60 ut-r">店铺类型:</div>
					
					<div class="ub ub-ac  uh-36">
						<label class="umar-r10"> <input id="OWN_STORE" 
							type="radio" name="branchType" value="3" />直营店
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<label> <input class="radioItem" id='FRANCHISE_STORE_B'
							type="radio" name="branchType" value="4" />B加盟店
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<label> <input class="radioItem" id='FRANCHISE_STORE_C'
							type="radio" name="branchType" value="5" />C加盟店
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<label> <input class="radioItem" id="allType" 
							type="radio" name="branchType" value=""  checked="checked" /> 所有
						</label>
					</div>
				</div>
            </div>
            
       	</form>
        <div class="ub ub-f1 umar-t20">
			 <table id="gridStoreProfitReport"></table>
		</div>
    </div>

</body>
</html>