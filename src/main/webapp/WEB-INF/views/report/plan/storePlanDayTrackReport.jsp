<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>门店计划日跟踪表</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/plan/storePlanDayTrackReport.js?V=${versionNo}"></script>
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
	              	<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	              	<div class="ubtns-item" onclick="exportData()">导出</div>
	              	<div class="ubtns-item">打印</div>
	                <div class="ubtns-item" onclick="toClose()">关闭</div>
	                <input type="hidden" id="startCount" name="startCount" />
					<input type="hidden" id="endCount" name="endCount" />
	            </div>
	           	<!-- 引入时间选择控件 -->
	           <div class="ub ub-ac umar-l20">
	              	<input class="Wdate"  readonly="readonly" name="rptDate" id="rptDate" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'%y-%M-{%d-1}',readOnly:true})"/>
	           </div>
            </div>
	        <div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
                <div class="ub ub-ac" id="branchSelect">
                   <div class="umar-r10 uw-80 ut-r">机　　构:</div>
                   <input type="hidden" id="branchCompleCode" name="branchCompleCode">
                   <input class="uinp " style="width:262px;" type="text" id="branchCodeName" name="branchCodeName"
                   		readonly="readonly">
                   <div class="uinp-more">...</div>
                </div>
                <div class="ub  ub-ac umar-l30">
                   <div class="umar-r10 uw-80 ut-r">月目标销额:</div>
                   <select class="uinp  easyui-combobox uw-110"  name="targetSaleAmountOpType" data-options="editable:false,panelHeight:120,">
                   	   <option value="1"> &lt; </option>
                   	   <option value="2"> &gt; </option>
                   	   <option value="3"> &lt;= </option>
                   	   <option value="4"> &gt;= </option>
                   	   <option value="5"> = </option>
                   </select>
                   <input class="uinp ut-r uw-152" onblur='$_jxc.checkNUM(this)' name="targetSaleAmount" type="text" >
                </div>
                <div class="ub  ub-ac umar-l20">
                   <div class="umar-r10 uw-80 ut-r">总完成率:</div>
                   <select class="uinp easyui-combobox uw-110" name="totalComplePercentOpType" data-options="editable:false,panelHeight:120,">
                   	   <option value="1"> &lt; </option>
                   	   <option value="2"> &gt; </option>
                   	   <option value="3"> &lt;= </option>
                   	   <option value="4"> &gt;= </option>
                   	   <option value="5"> = </option>
                   </select>
                   <input class="uinp ut-r uw-152" onblur='$_jxc.checkNUM(this)' name="totalComplePercent" type="text" >%
                </div>
                
            </div>
            <div class="ub umar-t8">
            	<div class="ub ub-ac ">
                   <div class="umar-r10 uw-80 ut-r">其他销额:</div>
                   <select class="uinp easyui-combobox uw-110" name="otherSaleAmountType" data-options="editable:false,panelHeight:120,">
                   	   <option value="1"> 线下目标销额 </option>
                   	   <option value="2"> 线上目标销额 </option>
                   </select>
                   <select class="uinp easyui-combobox uw-50" name="otherSaleAmountOpType" data-options="editable:false,panelHeight:120,">
                   	   <option value="1"> &lt; </option>
                   	   <option value="2"> &gt; </option>
                   	   <option value="3"> &lt;= </option>
                   	   <option value="4"> &gt;= </option>
                   	   <option value="5"> = </option>
                   </select>
                   <input class="uinp ut-r uw-100" onblur='$_jxc.checkNUM(this)' name="otherSaleAmount" type="text" >
                </div>
                <div class="ub  ub-ac umar-l30">
                   <div class="umar-r10 uw-80 ut-r">其他完成率:</div>
                    <select class="uinp easyui-combobox uw-110"  name="otherComplePercentType" data-options="editable:false,panelHeight:120,">
                   	   <option value="1"> 线下完成率 </option>
                   	   <option value="2"> 线上完成率 </option>
                   </select>
                   <select class="uinp easyui-combobox uw-50" name="otherComplePercentOpType" data-options="editable:false,panelHeight:120,">
                   	   <option value="1"> &lt; </option>
                   	   <option value="2"> &gt; </option>
                   	   <option value="3"> &lt;= </option>
                   	   <option value="4"> &gt;= </option>
                   	   <option value="5"> = </option>
                   </select>
                   <input class="uinp ut-r uw-100" onblur='$_jxc.checkNUM(this)' name="otherComplePercent" type="text" >%
                </div>
                <div class="ub  ub-ac" style="margin-left:100px;">
                	<input type="checkbox" name="isShowZero" value="1" id="isShowZero" checked="checked" >
                    <label for="isShowZero">显示计划为0的数据</label>
                </div>
            </div>
       	</form>
        <div class="ub ub-f1 umar-t20">
			 <table id="storePlanFlowList"></table>
		</div>
    </div>

</body>
</html>