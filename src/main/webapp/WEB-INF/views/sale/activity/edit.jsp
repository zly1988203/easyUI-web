<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>促销活动设置-编辑</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/sale/activity/edit.js"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	             <div class="ubtns-item" id="SelectGoods" onclick="selectGoods()">商品选择</div>
	             <div class="ubtns-item" id="GoodsType" onclick="getGoodsType()">类别选择</div>
	             <div class="ubtns-item" onclick="saveActivity()">保存</div>
	             <div class="ubtns-item" onclick="check()">审核</div>
	             <div class="ubtns-item" onclick="toClose()">关闭</div>
	             </div>
            </div> 
 			<input type="hidden"  name="activityId" id="activityId" value="${activityId}">
	        <div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
	           <!--  <div class="ub ub-ac ">
	                <div class="umar-r10 uw-80 ut-r">活动编号:</div>
	                <input class="uinp ub ub-f1" type="text" name="formNo" id="formNo">
	            </div> -->
	            <div class="ub ub-ac ">
                    <div class="umar-r10 uw-80 ut-r">活动名称:</div>
                    <input class="uinp" type="text" name="activityName" id="activityName" value="">
                </div>
                <div class="ub ub-ac uselectw umar-l00">
                    <div class="umar-r10 uw-70 ut-r">活动类型:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" name="activityType" id="activityType" data-options="editable:false,onChange:onChangeSelect">
							    <option value="1">特价</option> 
								<option value="2" >折扣</option> 
								<option value="3">偶数特价</option> 
								<option value="4">换购</option> 
								<option value="5">满减</option> 
								<option value="6">组合特价</option>
				        </select>
                </div>
                <div class="ub ub-ac umar-l40  discountTypechoose unhide">
                        <div class="ub ub-ac umar-r10">
	                        <input class="ub disradio" id="disradio0" type="radio" name="disstatus" value="0" checked="checked" /><span>单品折扣</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub disradio" id="disradio1" type="radio" name="disstatus"  value="1" /><span>类别折扣</span>
	                    </div> 
	                     <input class="uinp" type="hidden" id="activityScopedis" value="0"  name="activityScopedis">
	            </div>
                <div class="ub ub-ac umar-l40  mjTypechoose unhide">
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub mjradio" id="mjradio0" type="radio" name="mjstatus" value="0" checked="checked" /><span>商品</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub mjradio" id="mjradio1" type="radio" name="mjstatus" value="1" /><span>类别</span>
	                    </div>
	                    
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub mjradio" id="mjradio2"  type="radio" name="mjstatus"  value="2" /><span>全场</span>
	                    </div>
	                     <input class="uinp" type="hidden" id="activityScopemj" value="0"  name="activityScopemj">
	            </div>
	           
            </div>
	          <div class="ub umar-t8">
	             <div class="ub ub-ac">
	             	<div class="umar-r10 uw-80 ut-r">活动时间:</div>
	              	<input class="Wdate"  readonly="readonly" name="startTime" id="startTime" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'endTime\');}'})" />&nbsp;至&nbsp;
                    <input class="Wdate"  readonly="readonly" name="endTime" id="endTime" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'startTime\');}'})" /> 
	              </div>
	              <div class="ub ub-ac">
	             	<div class="umar-r10 uw-80 ut-r">活动时段:</div>
	              	<input class="Wdate"  readonly="readonly" name="dailyStartTime" id="dailyStartTime" onclick="WdatePicker({dateFmt:'HH:mm:ss',minDate:'00:00:00',maxDate:'#F{$dp.$D(\'dailyEndTime\');}'})" />&nbsp;至&nbsp;
                    <input class="Wdate"  readonly="readonly" name="dailyEndTime" id="dailyEndTime" onclick="WdatePicker({dateFmt:'HH:mm:ss',minDate:'#F{$dp.$D(\'dailyStartTime\');}'})" /> 
	              </div>
	              <div class="ub ub-ac" id="weekday">
	               <div class="umar-r10 uw-80 ut-r">活动日:</div>
	               <div class="ub ub-ac umar-l10 ubcheckweek">
                        <input class="ub" id="weekcheckbox1" type="checkbox" name="weekcheckbox" value="1" checked="checked" /><span class="umar-l10">一</span>
                   </div>
                   <div class="ub ub-ac umar-l10 ubcheckweek">
                        <input class="ub" id="weekcheckbox2" type="checkbox" name="weekcheckbox" value="2" checked="checked" /><span class="umar-l10">二</span>
                   </div>
                   <div class="ub ub-ac umar-l10 ubcheckweek">
                        <input class="ub" id="weekcheckbox3" type="checkbox" name="weekcheckbox" value="3" checked="checked" /><span class="umar-l10">三</span>
                   </div>
                    <div class="ub ub-ac umar-l10 ubcheckweek">
                        <input class="ub" id="weekcheckbox4" type="checkbox" name="weekcheckbox" value="4" checked="checked" /><span class="umar-l10">四</span>
                   </div>
                    <div class="ub ub-ac umar-l10 ubcheckweek">
                        <input class="ub" id="weekcheckbox5" type="checkbox" name="weekcheckbox" value="5" checked="checked" /><span class="umar-l10">五</span>
                   </div>
                    <div class="ub ub-ac umar-l10 ubcheckweek">
                        <input class="ub " id="weekcheckbox6" type="checkbox" name="weekcheckbox" value="6" checked="checked" /><span class="umar-l10">六</span>
                   </div>
                    <div class="ub ub-ac umar-l10 ubcheckweek">
                        <input class="ub " id="weekcheckbox7" type="checkbox" name="weekcheckbox" value="7" checked="checked" /><span class="umar-l10">日</span>
                   </div>
                    <input class="uinp ub ub-f1" type="hidden" id="weeklyActivityDay" name="weeklyActivityDay" value=" ">
                  </div>
	          </div>
	          <div class="ub umar-t8">
	             <div class="ub  ub-ac">
	                   <div class="umar-r10 uw-80 ut-r">活动分店:</div>
		                    <input class="uinp ub ub-f1" type="hidden" id="branchIds" name="branchIds" value=" ">
	                        <input class="uinp ub ub-f1 uw-400" type="text" id="branchName" readonly="readonly" value=" " name="branchName" onclick="selectBranch()">
	                   <div class="uinp-more" onclick="selectBranch()">...</div>
	             </div>
	              <div class="ub ub-ac uw-200 umar-l10 special">
					<div class="umar-r10 uw-100 ut-r">批量特价:</div>
					<input class="uinp ub ub-f1 deal" type="number"
						onkeyup="if(isNaN(value))execCommand('undo')"
						onafterpaste="if(isNaN(value))execCommand('undo')" id="special">
						<div class="umar-l10">元</div>
				  </div>
				   <div class="ub ub-ac uw-200 umar-l10 discount unhide">
					<div class="umar-r10 uw-100 ut-r">批量折扣:</div>
					<input class="uinp ub ub-f1 deal" type="number"
						onkeyup="if(isNaN(value))execCommand('undo')"
						onafterpaste="if(isNaN(value))execCommand('undo')" id="discount">
						<div class="umar-l10">折</div>
				  </div>
				  <div class="ub ub-ac uw-200 umar-l10 oddprice unhide">
					<div class="umar-r10 uw-100 ut-r">批量偶数特价:</div>
					<input class="uinp ub ub-f1 deal" type="number"
						onkeyup="if(isNaN(value))execCommand('undo')"
						onafterpaste="if(isNaN(value))execCommand('undo')" id="batchcount">
						<div class="umar-l10">折</div>
				   </div>
	          </div>
       	</form>
           
      
      <div id="consaleadd" class="ub uw ub-f1 umar-t20" style="min-height:50%;">
			 <table id="saleMangeadd"></table>
		</div>
		 
      <div id="consalesetmj" class="ub uw ub-f1 umar-t20  unhide ">
			 <table id="salesetmj"></table>
	  </div>
    </div>

</body>
</html>