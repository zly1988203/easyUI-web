<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>促销活动设置</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/sale/activity/add.js"></script>
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
	              <div class="ubtns-item" onclick="addsaveOrder()">保存</div>
	             <div class="ubtns-item" onclick="stop()">终止</div>
	            <!--  <div class="ubtns-item" onclick="gFunRefresh()">重置</div> -->
	             <div class="ubtns-item" onclick="costcheck()">审核</div>
	             <div class="ubtns-item" onclick="toBack()">返回</div>
	             </div>
            </div>

	        <div class="ub uline umar-t8"></div>
	        <div class="ub umar-t8">
	            <div class="ub ub-ac ">
	                <div class="umar-r10 uw-80 ut-r">活动编号:</div>
	                <input class="uinp ub ub-f1" type="text" name="formNo" id="formNo">
	            </div>
	            <div class="ub ub-ac ">
                    <div class="umar-r10 uw-80 ut-r">活动名称:</div>
                    <input class="uinp" type="text" name="skuName" id="skuName">
                </div>
                <div class="ub ub-ac uselectw umar-l00">
                    <div class="umar-r10 uw-70 ut-r">调整原因:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" name="priceType" id="priceType" data-options="editable:false,onChange:onChangeSelect">
							    <option value="1">特价</option> 
								<option value="2">折扣</option> 
								<option value="3">偶数特价</option> 
								<option value="4">换购</option> 
								<option value="5">满减</option> 
								<option value="6">组合特价</option>
				        </select>
                </div>
                <div class="ub ub-ac umar-l40  discountTypechoose unhide">
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub disradio" type="radio" name="disstatus"  value="0" checked="checked"/><span>类别折扣</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub disradio" type="radio" name="disstatus" value="1" /><span>单品折扣</span>
	                    </div>
	            </div>
                <div class="ub ub-ac umar-l40  mjTypechoose unhide">
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub mjradio" type="radio" name="mjstatus"  value="0" checked="checked"/><span>全场</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub mjradio" type="radio" name="mjstatus" value="1" /><span>类别</span>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <input class="ub mjradio" type="radio" name="mjstatus" value="2" /><span>商品</span>
	                    </div>
	            </div>
            </div>
	          <div class="ub umar-t8">
	             <div class="ub ub-ac">
	             	<div class="umar-r10 uw-80 ut-r">活动时间:</div>
	              	<input class="Wdate"  readonly="readonly" name="beginDate" id="txtStartDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'txtEndDate\');}'})" />&nbsp;至&nbsp;
                    <input class="Wdate"  readonly="readonly" name="endDate" id="txtEndDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'txtStartDate\');}'})" /> 
	              </div>
	              <div class="ub ub-ac">
	             	<div class="umar-r10 uw-80 ut-r">活动时段:</div>
	              	<input class="Wdate"  readonly="readonly" name="beginDate" id="txtStartTime" onclick="WdatePicker({dateFmt:'HH:mm:ss',minDate:'00:00:00',maxDate:'#F{$dp.$D(\'txtEndTime\');}'})" />&nbsp;至&nbsp;
                    <input class="Wdate"  readonly="readonly" name="endDate" id="txtEndTime" onclick="WdatePicker({dateFmt:'HH:mm:ss',minDate:'#F{$dp.$D(\'txtStartTime\');}'})" /> 
	              </div>
	              <div class="ub ub-ac">
	               <div class="umar-r10 uw-80 ut-r">活动日:</div>
	               <div class="ub ub-ac umar-l10 ">
                        <input class="ub" type="checkbox" name="weekcheckbox" checked="checked" onclick="toChangeDate(0);"/><span class="umar-l10">一</span>
                   </div>
                   <div class="ub ub-ac umar-l10">
                        <input class="ub" type="checkbox" name="weekcheckbox" checked="checked" onclick="toChangeDate(0);"/><span class="umar-l10">二</span>
                   </div>
                   <div class="ub ub-ac umar-l10">
                        <input class="ub" type="checkbox" name="weekcheckbox" checked="checked" onclick="toChangeDate(0);"/><span class="umar-l10">三</span>
                   </div>
                    <div class="ub ub-ac umar-l10">
                        <input class="ub" type="checkbox" name="weekcheckbox" checked="checked" onclick="toChangeDate(0);"/><span class="umar-l10">四</span>
                   </div>
                    <div class="ub ub-ac umar-l10">
                        <input class="ub" type="checkbox" name="weekcheckbox" checked="checked" onclick="toChangeDate(0);"/><span class="umar-l10">五</span>
                   </div>
                    <div class="ub ub-ac umar-l10">
                        <input class="ub" type="checkbox" name="weekcheckbox" checked="checked" onclick="toChangeDate(0);"/><span>六</span>
                   </div>
                    <div class="ub ub-ac umar-l10">
                        <input class="ub" type="checkbox" name="weekcheckbox" checked="checked" onclick="toChangeDate(0);"/><span>日</span>
                   </div>
                  </div>
	          </div>
	          <div class="ub umar-t8">
	             <div class="ub  ub-ac">
	                   <div class="umar-r10 uw-80 ut-r">活动分店:</div>
		                    <input class="uinp ub ub-f1" type="hidden" id="branchId" name="branchId">
	                        <input class="uinp ub ub-f1 uw-400" type="text" id="branchName" readonly="readonly" name="branchName" onclick="searchBranch()">
	                   <div class="uinp-more" onclick="searchBranch()">...</div>
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
						onafterpaste="if(isNaN(value))execCommand('undo')" id="discount">
						<div class="umar-l10">折</div>
				   </div>
	          </div>
       	</form>
           
      
      <div id="item1" class="ub ub-f1  umar-t20" style="min-height:300px;">
			 <table id="saleMangeadd"></table>
		</div>
		 
      <div id="consalesetmj" class="ub  umar-t20 unhide"  >
			 <table id="salesetmj"></table>
	  </div>
    </div>

</body>
</html>