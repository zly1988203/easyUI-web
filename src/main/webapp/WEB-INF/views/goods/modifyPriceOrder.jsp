<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>档案-调价单</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/goods/modifyPriceOrder.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 upad-8">
		<form action="" class="umar-t12" id="searchForm" method="post">
        <div class="ub ub-ac">
            <!--buttons-->
            <div class="ubtns">
            	<shiro:hasPermission name="JxcPriceAdjust:search">
                	<div class="ubtns-item" onclick="modifyPriceOrderCx();">查询</div>
                </shiro:hasPermission>
                <shiro:hasPermission name="JxcPriceAdjust:add">
					  <div class="ubtns-item" onclick="addModifyDataGrid();">新增</div>
			   	</shiro:hasPermission>
                <shiro:hasPermission name="JxcPriceAdjust:delete">
	                <div class="ubtns-item" onclick="delModifyOrderDialog();">删单</div>
	            </shiro:hasPermission>
	            <div class="ubtns-item" onclick="resetForm()">重置</div>
	            <div class="ubtns-item" onclick="window.parent.closeTab()">退出</div>
            </div>
			<div class="ub">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">日期:</div>
					<input class="Wdate"  readonly="readonly" name="startTime" id="txtStartDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'txtEndDate\');}'})" />&nbsp;至&nbsp;
					<input class="Wdate"  readonly="readonly" name="endTime" id="txtEndDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'txtStartDate\');}'})" />
					<div class="ub ub-ac umar-l10">
						<label><input  type="radio" name="dateradio" onclick="toChangeDate(0);"/><span>今天</span></label>
					</div>
					<div class="ub ub-ac umar-l10">
						<label><input  type="radio" name="dateradio" onclick="toChangeDate(1);"/><span>昨天</span></label>
					</div>
					<div class="ub ub-ac umar-l10">
						<label><input  type="radio" name="dateradio" onclick="toChangeDate(2);"/><span>本周</span></label>
					</div>
					<div class="ub ub-ac umar-l10">
						<label><input  type="radio" name="dateradio" onclick="toChangeDate(3);"/><span>上周</span></label>
					</div>
					<div class="ub ub-ac umar-l10">
						<label><input  type="radio" name="dateradio" onclick="toChangeDate(4);"/><span>本月</span></label>
					</div>
					<div class="ub ub-ac umar-l10">
						<label><input  type="radio" name="dateradio" onclick="toChangeDate(5);"/><span>上月</span></label>
					</div>
					<div class="ub ub-ac umar-l10">
						<label><input  type="radio" name="dateradio" onclick="toChangeDate(6);"/><span>本季</span></label>
					</div>
					<div class="ub ub-ac umar-l10">
						<label><input  type="radio" name="dateradio" onclick="toChangeDate(7);"/><span>上季</span></label>
					</div>
					<div class="ub ub-ac umar-l10">
						<label><input  type="radio" name="dateradio" onclick="toChangeDate(8);"/><span>今年</span></label>
					</div>
				</div>
			</div>
        </div>
        <div class="ub umar-t8 uc-black"></div>
        <div class="ub uline umar-t8"></div>

        <div class="ub ub-ver ub-f1 ">


	            <div class="ub umar-t8">
	                <div class="ub ub-ac">
	                    <div class="umar-r10 uw-70 ut-r">单据编号:</div>
	                    <input class="uinp" name="formNo" type="text">
	                </div>
	                <div class="ub ub-ac uw-300 umar-l20">
	                    <div class="umar-r10 uw-70 ut-r">操作员:</div>
	                    <input class="uinp ub ub-f1" name="createUserId"  id="createUserId" type="hidden" >
	                    <input class="uinp ub ub-f1"  type="text"  id="createUserName" readOnly  >
	                    <div class="uinp-more" onclick="selectOperator();">...</div>
	                </div>
	                <div class="ub ub-ac uw-300 umar-l40">
	                    <div class="umar-r10 uw-70 ut-r" >制单机构:</div>
	                    <input class="uinp ub ub-f1" name="createBranchId" type="hidden" id="createBranchId" >
	                    <input class="uinp ub ub-f1"  type="text" id="createBranchName"  readOnly>
	                    <div class="uinp-more" onclick="selectBranch();">...</div>
	                </div>
	            </div>
	            <div class="ub umar-t8">
	                <div class="ub ub-ac uw-610" style="width: 603px;">
	                    <div class="umar-r10 uw-70 ut-r">备注:</div>
	                    <input class="uinp ub ub-f1" name="remark" type="text">
	                </div>
	                <!--input-checkbox-->
	                <div class="ub ub-ac umar-l40">
	                    <div class="umar-r10 uw-70 ut-r">审核状态:</div>
	                    <div class="ub ub-ac umar-r10">
	                         <label><input  type="radio" value="0" name="status" checked="checked"/><span>未审核</span></label>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                         <label><input  type="radio" value="1" name="status"/><span>审核</span></label>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                         <label><input  type="radio" value="" name="status"/><span>全部</span></label>
	                    </div>
	                </div>
           		 </div>

        </div>
		</form>
		<div class="ub umar-t8 umar-b8">【单据信息】</div>
		<div class="ub ub-f1">
			<table id="modifyPriceGrid"></table>
		</div>
    </div>


</body>
</html>