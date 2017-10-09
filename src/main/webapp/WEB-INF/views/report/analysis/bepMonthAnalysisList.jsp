
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>月盈亏平衡点</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script
	src="${ctx}/static/js/views/report/analysis/bepMonthAnalysisList.js?V=${versionNo}"></script>
<style>
.datagrid-header .datagrid-cell {
	text-align: center !important;
	font-weight: bold;
}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" method="post">
			<div class="ub ub-ac">
				<div class="ubtns umar-r20">
					<div class="ubtns-item" onclick="queryMonthAnalysis()">查询</div>
					<shiro:hasPermission name="JxcBepMonthAnalysis:export">
						<div class="ubtns-item" onclick="exportData()">导出</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>

				<div class="ub ub-ac umar-l20">
	               <div class="ub ub-ac umar-l20 umar-r20 ">
	                    <input class="Wdate"  readonly="readonly" name="txtStartDate" id="txtStartDate" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'txtEndDate\');}',dateFmt:'yyyy-MM',readOnly:true})"  />
	               </div>至
	               <div class="ub ub-ac umar-l20">
	                    <input class="Wdate"  readonly="readonly" name="txtEndDate" id="txtEndDate" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'txtStartDate\');}',dateFmt:'yyyy-MM',readOnly:true})"  />
	               </div>
				<!--     <div class="ub ub-ac umar-l10">
				        <input class="ub" type="radio" name="dateradio" id="this_month" onclick="toChangeDate(4,'yyyy-MM');"/><label for="this_month">本月</label>
				    </div> -->
				    <div class="ub ub-ac umar-l10">
				        <input class="ub" type="radio" name="dateradio" id="last_month" onclick="toChangeDate(5,'yyyy-MM');"/><label for="last_month">上月</label>
				    </div>
				    <div class="ub ub-ac umar-l10">
				        <input class="ub" type="radio" name="dateradio" id="this_season" onclick="toChangeDate(6,'yyyy-MM');"/><label for="this_season">本季</label>
				    </div>
				    <div class="ub ub-ac umar-l10">
				        <input class="ub" type="radio" name="dateradio" id="last_season" onclick="toChangeDate(7,'yyyy-MM');"/><label for="last_season">上季</label>
				    </div>
				    <div class="ub ub-ac umar-l10">
				        <input class="ub" type="radio" name="dateradio" id="this_year" onclick="toChangeDate(8,'yyyy-MM');"/><label for="this_year">今年</label>
				    </div>
				</div>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">机构名称:</div>
					<input name="branchId" id="branchId" type="hidden"> <input
						name="branchCompleCode" id="branchCompleCode" type="hidden">
					<input class="uinp" id="branchCodeName" name="branchCodeName"
						type="text" readonly="readonly" onclick="selectListBranches()">
					<div class="uinp-more" onclick="selectListBranches()">...</div>

					<input type="hidden" id="startCount" name="startCount"> <input
						type="hidden" id="endCount" name="endCount">

				</div>

				<div class="ub ub-ac umar-r40">
					<div class="ub ub-ac umar-r10">
						<input class="radioItem costType" type="radio" name="costType"
							id="status_no" value="0" checked="checked" /><label
							for="status_no">含折旧费用 </label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem costType" type="radio" name="costType"
							id="status_yes" value="1" /><label for="status_yes">不含折旧费用
						</label>
					</div>
				</div>

				
			</div>
			
			<div class="ub umar-t8">
					<div class="ub ub-ac">
						<div class="umar-r10 uw-60 ut-r">店铺类型:</div>
						
						<div class="ub ub-ac  uh-36">
							<label class="umar-r10"> <input class=" radioItem"
								id="OWN_STORE" type="radio" checked="checked" name="branchType" value="3" />直营店
							</label>
						</div>
						<div class="ub ub-ac umar-r10">
							<label> <input class="radioItem" id='FRANCHISE_STORE_B'
								type="radio" name="branchType" value="4" />加盟店
							</label>
						</div>
						<div class="ub ub-ac umar-r10">
							<label> <input class="radioItem" id='FRANCHISE_STORE_C'
								type="radio" name="branchType" value="5" />合作店
							</label>
						</div>
						<div class="ub ub-ac umar-r10">
							<label> <input class="radioItem" id="allType"
								type="radio" name="branchType"  value="" />
								所有
							</label>
						</div>
					</div>
				</div>
			

		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridMonthAnalysis"></table>
		</div>

	</div>
</body>
<script>
    function updateWdatePicker(type){
    	
    	if(type==0){
   		 WdatePicker({
   	                	dateFmt:'yyyy-MM',
   	                	maxDate:'#F{$dp.$D(\'txtStartDate\');}',
   	                    onpicked:function(dp){
   	                        $("input:radio[name='dateradio']").attr("checked",false);
   	                    }
   	                })
	   	}else{
	   		 WdatePicker({
		   	                	dateFmt:'yyyy-MM',
		   	                	maxDate:'#F{$dp.$D(\'txtStartDate\')}',
		   	                    onpicked:function(dp){
		   	                        $("input:radio[name='dateradio']").attr("checked",false);
		   	                    }
		   	                })
	   	}
    	
    }
    
    

    
</script>
</html>