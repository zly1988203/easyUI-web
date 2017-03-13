<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>采购向导——条件筛选</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
     <script  src="${ctx}/static/js/views/purchase/guide/guideForm.js"></script>
    
</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4  ubor">
	<div class="ub ub-ac upad-4">
        <div class="ubtns umar-l20 umar-t10">
            <div id="btnNext" class="ubtns-item" onclick="nextStep()">下一步</div>
			<div class="ubtns-item" onclick="toClose()">关闭</div>
        </div>
    </div>
    <input type="hidden" name="formData" id="formData" value='${formData}' />
    <form id="addForm" action="" method="post">
    <div class="ub ub-ver umar-l20">
    	<div class="ub umar-t20">
    			<div class="ub ub-ac uw-520">
					<div class="umar-r10 uw-70 ut-r">采购机构:</div>
					<input type="hidden" id="branchId" name="branchId" />
					<input type="hidden" id="branchCode" name="branchCode" />
					<input type="hidden" id="branchCompleCode" name="branchCompleCode" />
					<input type="hidden" id="branchType" name="branchType" />
					<input class="uinp ub ub-f1 easyui-validatebox" type="text" id="branchCodeName" name="branchCodeName" maxlength="50" readOnly data-options="required:true"/>
					<div class="uinp-more" onclick="selectBranches()" >...</div>
					<i class="uc-red">*</i>
				</div>
    	</div>
    	
    	<div class="ub umar-t20">
    		<div class="ub ub-ac uw-520">
					<div class="umar-r10 uw-70 ut-r">商品类别:</div>
					<input type="hidden" id="categoryCode" name="categoryCode" />
					<input class="uinp ub ub-f1 easyui-validatebox" type="text" id="categoryCodeName" name="categoryCodeName" maxlength="50" readOnly data-options="required:true"/>
					<div class="uinp-more" onclick="searchCategory()" >...</div>
					<i class="uc-red">*</i>
				</div>
    	</div>
    	
    	<div class="ub umar-t20">
    	    	<div class="ub ub-ac uw-520">
					<div class="umar-r10 uw-70 ut-r">供应商:</div>
					<input type="hidden" id="supplierId" name="supplierId" />
					<input class="uinp ub ub-f1 easyui-validatebox" type="text" id="supplierCodeName" name="supplierCodeName" maxlength="50" readOnly data-options="required:true"/>
					<div class="uinp-more" onclick="selectSupplier()" >...</div>
					<i class="uc-red">*</i>
				</div>
    	</div>
    	
    	<div class="ub umar-t20">
	    	<div class="ub ub-ac uw-516">
					<div class="umar-r10 uw-70 ut-r">要货日期:</div>

					<input class="Wdate uw-300 uinp-no-more"  readonly="readonly" disabled="disabled" name="startTime" id="startTime" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'endTime\');}'})" />
					&nbsp;至&nbsp;
                    <input class="Wdate uw-300 uinp-no-more"  readonly="readonly" disabled="disabled" name="endTime" id="endTime" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'startTime\');}'})" /> 
					<i class="uc-red">*</i>
					<div class="umar-l20">
						<input type="checkbox" id="ignore" disabled="disabled">忽略已经执行过向导的要货单
					</div>
			</div>
    	</div>
    	
    	<input type="hidden" id="guideType" name="guideType" value="1">
    	<div class="ub umar-t20">
    		<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">选择模式:</div>
					<input type="radio" class="radioItem" name="guideType" value="1" checked>[常规商品]按库存存量指标采购	
			</div>
    	</div>
    	
    	<div class="ub umar-t20">
			<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r"></div>
					<input type="radio" class="radioItem" name="guideType" value="2">[常规商品]按安全库存采购
			</div>
		</div>
    	
    	<div class="ub umar-t20">
						<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r"></div>
					<input type="radio" class="radioItem" name="guideType" value="3">[常规商品]按门店要货单采购
			
			</div>
		</div>
		
		<div class="ub umar-t20">
			<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r"></div>
					<input type="radio" class="radioItem" name="guideType" value="4">[直送商品]按门店直送要货单汇总采购
			
			</div>
		</div>
		
		<div class="ub umar-t20">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r"></div>
					<input type="radio" class="radioItem" name="guideType" value="5">[直送商品]按门店直送要货单分别采购(按门店生产订货)
			
				</div>
			</div>
	
    </div>
    </form>
    
	</div>
</body>
</html>