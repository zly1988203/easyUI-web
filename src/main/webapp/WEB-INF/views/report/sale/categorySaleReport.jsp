<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>品类销售报表</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/sale/categorySaleReport.js?V=${versionNo}"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="purchaseTotalCx()">查询</div>
				    <div class="ubtns-item" >打印</div>
	                <div class="ubtns-item" onclick="exportData()">导出</div>
	                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">关闭</div>
	                 <input type="hidden" id="startCount" name="startCount" />
				<input type="hidden" id="endCount" name="endCount" />
	            </div>
	             <!-- 引入时间选择控件 -->
	           <div class="ub ub-ac">
	            	<div class="umar-r10 uw-80 ut-r">日期:</div>
	       			<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	           </div>
            </div>
	        <div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
			    <div class="ub ub-ac umar-r40" id="branchSelects">
			        <div class="umar-r10 uw-70 ut-r">机构名称:</div>
			        <input class="uinp" type="hidden" id="branchId" name="branchId">
			        <input class="uinp" type="text" id="branchName" name="branchName">
			        <input class="uinp" type="hidden" id="branchCompleCode" name="branchCompleCode">
			        <div class="uinp-more">...</div>
			    </div>
			    <div id="categoryNameDiv" class="ub ub-ac umar-r40">
			        <div class="umar-r10 uw-70 ut-r">商品类别:</div>
			        <input  name="categoryCode" id="categoryCode" class="uinp " maxlength="50" type='hidden'/>
			        <input type="text" name="categoryName" id="categoryName" class="uinp " maxlength="50"/>
			        <div class="uinp-more" id="categorySelect">...</div>
			    </div>
			    <div id="categoryNameDiv" class="ub ub-ac umar-r40">
			        <div class="umar-r10 uw-70 ut-r">报表类型:</div>
			        <!-- 修改name value 记得修改对应js逻辑 -->
                    <div class="ub ub-ac umar-r10">
						<label>
							<input type="radio" name="reportType" value="1" checked="checked"/><span>大类</span>
						</label>
                    </div>
                    <div class="ub ub-ac umar-r10">
						<label>
							<input type="radio" name="reportType" value="2" /><span>中类</span>
						</label>
                    </div>
                    <div class="ub ub-ac umar-r10">
						<label>
							<input  type="radio" name="reportType" value="3" /><span>小类</span>
						</label>
                    </div>
			    </div>
			</div>
       	</form>
        <div class="ub ub-f1 umar-t20">
			 <table id="goodsCategoryReport"></table>
		</div>
    </div>
</body>
</html>