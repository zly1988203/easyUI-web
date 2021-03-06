<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>促销活动设置-编辑</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/sale/activity/edit.js?V=${versionNo}"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryFormEditAct" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	             <div class="ubtns-item" id="SelectGoods" onclick="selectGoods()">商品选择</div>
	             <div class="ubtns-item" id="GoodsType" onclick="getGoodsType()">类别选择</div>
	             <div class="ubtns-item importGood unhide" onclick="toImportproduct(0)">导入货号</div>
            	 <div class="ubtns-item importGood unhide" onclick="toImportproduct(1)">导入条码</div>
	             <div class="ubtns-item" onclick="saveActivity()">保存</div>
	             <div class="ubtns-item" onclick="copyActivity()">复制</div>
	             <div class="ubtns-item" onclick="check()">审核</div>
	             <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	             <div class="ubtns-item" onclick="toClose()">关闭</div>
	             </div>
            </div> 
 			<input type="hidden"  name="activityId" id="activityId" value="${activityId}">
	        <div class="ub uline umar-t8"></div>
	       
	       	  <div class="ub umar-t8">
	             <div class="ub ub-ac">
	             	<div class="umar-r10 uw-70 ut-r">活动时间:</div>
	              	<input class="Wdate newWdate"  readonly="readonly" name="startTime" id="startTime" data-check="true" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'endTime\');}'})" />&nbsp;至&nbsp;
                    <input class="Wdate newWdate"  readonly="readonly" name="endTime" id="endTime" data-check="true" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'startTime\');}'})" /> 
	              </div>
	              <i class="ub ub-ac uc-red">*</i>
	              <div class="ub ub-ac">
	             	<div class="umar-r10 uw-110 ut-r">活动时段:</div>
	              	<input class="Wdate newWdate"  readonly="readonly" name="dailyStartTime" data-check="true" id="dailyStartTime" onclick="WdatePicker({dateFmt:'HH:mm:ss',minDate:'00:00:00',maxDate:'#F{$dp.$D(\'dailyEndTime\');}'})" />&nbsp;至&nbsp;
                    <input class="Wdate newWdate"  readonly="readonly" name="dailyEndTime" data-check="true" id="dailyEndTime" onclick="WdatePicker({dateFmt:'HH:mm:ss',minDate:'#F{$dp.$D(\'dailyStartTime\');}'})" /> 
	              </div>
	              <i class="ub ub-ac uc-red">*</i>
	              <div class="ub ub-ac" id="weekday">
	               <div class="umar-r10 uw-70 ut-r">活动日:</div>
	               <div class="ub ub-ac umar-l10 ubcheckweek">
                        <label><input class="radioItem" id="weekcheckbox1" type="checkbox" name="weekcheckbox" value="1" checked="checked" /><span class="umar-l10">一</span></label>
                   </div>
                   <div class="ub ub-ac umar-l10 ubcheckweek">
                        <label><input class="radioItem" id="weekcheckbox2" type="checkbox" name="weekcheckbox" value="2" checked="checked" /><span class="umar-l10">二</span></label>
                   </div>
                   <div class="ub ub-ac umar-l10 ubcheckweek">
                        <label><input class="radioItem" id="weekcheckbox3" type="checkbox" name="weekcheckbox" value="3" checked="checked" /><span class="umar-l10">三</span></label>
                   </div>
                    <div class="ub ub-ac umar-l10 ubcheckweek">
                        <label><input class="radioItem" id="weekcheckbox4" type="checkbox" name="weekcheckbox" value="4" checked="checked" /><span class="umar-l10">四</span></label>
                   </div>
                    <div class="ub ub-ac umar-l10 ubcheckweek">
                        <label><input class="radioItem" id="weekcheckbox5" type="checkbox" name="weekcheckbox" value="5" checked="checked" /><span class="umar-l10">五</span></label>
                   </div>
                    <div class="ub ub-ac umar-l10 ubcheckweek">
                        <label><input class="radioItem " id="weekcheckbox6" type="checkbox" name="weekcheckbox" value="6" checked="checked" /><span class="umar-l10">六</span></label>
                   </div>
                    <div class="ub ub-ac umar-l10 ubcheckweek">
                        <label><input class="radioItem " id="weekcheckbox7" type="checkbox" name="weekcheckbox" value="7" checked="checked" /><span class="umar-l10">日</span></label>
                   </div>
                    <input class="uinp ub ub-f1" type="hidden" id="weeklyActivityDay" data-check="true" name="weeklyActivityDay" value=" ">
                  </div>
	          </div>
	       
	       
	       
	        <div class="ub umar-t8 sale">
	           <!--  <div class="ub ub-ac ">
	                <div class="umar-r10 uw-80 ut-r">活动编号:</div>
	                <input class="uinp ub ub-f1" type="text" name="formNo" id="formNo">
	            </div> -->
	            <div class="ub ub-ac uw-384">
                    <div class="umar-r10 uw-70 ut-r">活动名称:</div>
                    <input class="uinp ub ub-f1" maxLength="20" type="text" name="activityName"  data-check="true" id="activityName" value="">
                </div>
                <i class="ub ub-ac uc-red">*</i>
                <div class="ub ub-ac uselectw umar-r10 activityTypeDv">
                    <div class="umar-r10 uw-110 ut-r">活动类型:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" name="activityType" id="activityType" data-options="editable:false">
							    <option value="1">特价</option> 
								<option value="2" >折扣</option> 
								<option value="3">偶数特价</option> 
								<!-- <option value="4">换购</option>  -->
								<option value="5">满减</option> 
								<option value="6">组合特价</option>
								<option value="10">买满送</option>
				        </select>
                </div>
                <div class="ub ub-ac umar-l10  discountTypechoose unhide">
                		<div class="ub ub-ac umar-r10">
	                        <label><input class="radioItem disradio disstatusChange" type="radio" id="disradio2" name="disstatus"  value="2"/><span>全场折扣</span></label>
	                    </div>
	                    <div class="ub ub-ac umar-r10">
	                        <label><input class="radioItem disradio disstatusChange" id="disradio1" type="radio" name="disstatus"  value="1" checked="checked" /><span>类别折扣</span></label>
	                    </div>
						<div class="ub ub-ac umar-r10">
							<label><input class="radioItem disradio disstatusChange" id="disradio0" type="radio" name="disstatus" value="0" /><span>单品折扣</span></label>
						</div>
	                     <input class="uinp" type="hidden" id="activityScopedis" value="0"  name="activityScopedis">
	            </div>
                <div class="ub ub-ac umar-l10  mjTypechoose unhide">
						<div class="ub ub-ac umar-r10">
							<label><input class="radioItem mjradio" id="mjradio2"  type="radio" name="mjstatus"  value="2" checked="checked" /><span>全场</span></label>
						</div>
	                    <div class="ub ub-ac umar-r10">
	                        <label><input class="radioItem mjradio" id="mjradio1" type="radio" name="mjstatus" value="1" /><span>类别</span></label>
	                    </div>
						<div class="ub ub-ac umar-r10">
							<label><input class="radioItem mjradio" id="mjradio0" type="radio" name="mjstatus" value="0" /><span>商品</span></label>
						</div>
	                    <input class="uinp" type="hidden" id="activityScopemj" value="2"  name="activityScopemj">
	            </div>
	            
	            <!--买满送-->
	            <div class="ub ub-ac umar-l20  mmsTypechoose unhide">
					<div class="ub ub-ac umar-r10">
						<label><input class="radioItem mmradio" type="radio"  name="mmsstatus"  value="2" checked="checked"/><span>全场</span></label>
					</div>
                    <div class="ub ub-ac umar-r10"> 
                        <label><input class="radioItem mmradio" type="radio" name="mmsstatus" value="1" /><span>类别</span></label>
                    </div>
					<div class="ub ub-ac umar-r10">
						<label><input class="radioItem mmradio" type="radio" name="mmsstatus" value="0" /><span>商品</span></label>
					</div>
                    <input class="uinp" type="hidden" id="activityScopemms" value="2"  name="activityScopemms">
	            </div>
	           
            </div>
	         
	          <div class="ub umar-t8">
                 <input class="uinp ub ub-f1" name="branchsFullName" type="hidden" id="branchsFullName"  value="${obj.branchsFullName}">                   
	             <div class="ub  ub-ac uw-390" id="branchComponent">
	                   <div class="umar-r10 uw-70 ut-r">活动分店:</div>
	                    <input class="uinp ub ub-f1" type="hidden" id="branchIds" data-check="true" name="branchIds" value=" ">
                        <input class="uinp ub ub-f1 uw-400" type="text" id="branchName" data-check="true" readonly="readonly" value="${obj.branchsName}" name="branchName"/>
                   		<div class="uinp-more" id="selectBranch">...</div>
						<i class="ub ub-ac uc-red">*</i>
	             </div>

	              <div class="ub ub-ac uw-410 umar-l10 umar-r10 special unhide">
					<div class="umar-r10 uw-100 ut-r">批量特价:</div>
					<input class="uinp uw-300 easyui-numberbox" data-options="min:0,precision:2,onChange:changeSpecNum" type="text"  id="special">
				  </div>

					<div class="ub ub-ac uw-410 umar-l10 topMoney unhide">
					<div class="umar-r10 uw-100 ut-r">最高优惠:</div>
					<input class="uinp uw-304  easyui-numberbox" data-options="min:0,precision:2" type="text"
					id="maxDiscountAmount" name="maxDiscountAmount">
					</div>

				  <div class="ub ub-ac uw-410 umar-l10 oddprice unhide">
					<div class="umar-r10 uw-100 ut-r">批量偶数特价:</div>
					<input class="uinp uw-300 easyui-numberbox" data-options="min:0,precision:2, onChange:changeOddprice" type="text"  id="batchcount">
				   </div>

					<div class="ub ub-ac uw-424 umar-l10 limitCount unhide">
					<div class="umar-r10 uw-100 ut-r">整单组合限量:</div>
					<input class="uinp uw-300 easyui-numberbox" data-options="min:0" type="text"  id="maxDiscountNum" name="maxDiscountNum">
					</div>
				   
				   <!--买满条件 -->
				   <div class="ub ub-ac  umar-l10 mmstype unhide">
					<div class="umar-r10 uw-100 ut-r">活动条件:</div>
					<select class=" easyui-combobox " style="width:302px" name="activitymmsType" id="activitymmsType" data-options="editable:false,disabled:true,value:0">
						    <option value="0">买满金额</option> 
							<option value="1">买满数量</option> 
			        </select>

	          	  </div>

	          </div>

			<div class="ub umar-t8">
			<div class="ub ub-ac uw-390 discount unhide">
			<div class="umar-r10 uw-70 ut-r">批量折扣:</div>
			<input class="uinp uw-300  easyui-numberbox" data-options="min:0,precision:2,onChange:changeDisNum" type="text" id="discount">
			</div>
			</div>
       	</form>
           
      
      <div id="consaleadd" class="ub uw ub-f1 umar-t20" style="min-height:300px;height:50%">
			 <table id="saleMangeadd"></table>
		</div>
		 
      <div id="consalesetmj" class="ub uw ub-f1 umar-t20  unhide " style="height:300px;height:50%">
			 <table id="salesetmj" style="min-height:300px"></table>
	  </div>
	  
	  <!-- 买满送  -->
	  <div id="consolemms" class="ub uw ub-ver ub-f1  unhide" >
	  		<div class="ub uline umar-t10 umar-b10"></div>
	  		<div class="ub unhide" id="mmsTab">
	  			<ul class="tabs" style="height: 26px;">
		  			<li class="tabs-selected" onClick="clickmmsTab(1)">
			  			<a  class="tabs-inner" style="height: 25px; line-height: 23px;">
				  			<span class="tabs-title tabs-closable" id="tabone">类别信息</span>
				  			<span class="tabs-icon"></span>
			  			</a>
		  			</li>
		  			<li class="" onClick="clickmmsTab(2)">
			  			<a  class="tabs-inner" style="height: 25px; line-height: 23px;">
				  			<span class="tabs-title tabs-closable">赠品信息</span>
				  			<span class="tabs-icon"></span>
			  			</a>
		  			</li>
	  			</ul>
	  		</div>
	  		<div class="ub uw ub-f1 unhide umar-t8" id="area1">
	  			 <table id="mmscommonList"></table>
	  		</div>
	  		<div class="ub ub-ver uw ub-f1" id="area2">
				<div id="consolemms01" class="ub uw ub-ver  ub-f1 " >
				    <p class="ub umar-t4 umar-l10">买满条件：</p>
				    <div class="ub uw umar-t8" style="height:300px;width:100%;">
						<table id="mmsgradedList"></table>
				    </div>
				</div>
				<div id="consolemms02" class="ub uw ub-f1 ub-ver  umar-t10 ">
					<!-- upad-t20  -->
					<div class="ub ub-ac umar-t30 umar-l10" id="giftip">
						<span class="ub">赠品信息：</span>
					</div>
					<div class="ub uw  umar-t8" style="height:300px;width:100%;">
						<table id="mmsgoodList"></table>
					</div>
				</div>
	  		</div>
	  </div>
	  
	  
    </div>

</body>
</html>