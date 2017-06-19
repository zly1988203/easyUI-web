<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>类别销售汇总</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/retail/categorySaleReport.js?V=${versionNo}"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	            <shiro:hasPermission name="categorySaleReport:search">
	                <div class="ubtns-item" onclick="queryForm()">查询</div>
	            </shiro:hasPermission>
	            <shiro:hasPermission name="categorySaleReport:export">
	            <input type="hidden" id="startCount" name="startCount" />
				<input type="hidden" id="endCount" name="endCount" />
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
                <div class="ub ub-ac uw-300 ">
	                    <div class="umar-r10 uw-70 ut-r">机构名称:</div>
	                    <input type="hidden" id="branchId" name="branchId" />
	                    <input class="uinp ub ub-f1" type="text" id="branchName" name="branchName"/>
	                    <div class="uinp-more" onclick="selectBranches()" >...</div>
	                </div>
	                <div class="ub ub-ac  umar-l20">
						<div class="umar-r10 uw-70 ut-r">商品类别:</div>
						<input class="uinp ub ub-f1" type="text" name="categoryName" id="categoryName">
                	</div>
					<div class="ub ub-ac">
						<div class="umar-r10 uw-80 ut-r">汇总类型:</div>
						<div class="ub ub-ac umar-r10 ">
							<label>
								<input class="radioItem" id="bigCategory" type="radio" name="categoryLevel" value="1" checked="checked" onclick="queryForm()" />大类汇总
							</label>
						</div>
						<div class="ub ub-ac  uh-36">
							<label class="umar-r10">
								<input class=" radioItem" id="medCategory" type="radio" name="categoryLevel" value="2" onclick="queryForm()" />中类汇总
							</label>
						</div>
						<div class="ub ub-ac umar-r10">
							<label>
								<input class="radioItem" id="smallCategory" type="radio" name="categoryLevel" value="3" onclick="queryForm()" />小类汇总
							</label>
						</div>
					</div>
            </div>
	
       	</form>
           
      
      <div class="ub ub-f1 umar-t20">
			 <table id="categorySale"></table>
		</div>
    </div>

</body>
</html>