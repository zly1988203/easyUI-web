<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>商品销售汇总分析</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/report/goods/goodsTotalAnalysiList.js"></script>
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
	                <div class="ubtns-item" onclick="exportTotal()">导出</div>
	                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	             <!-- 引入时间选择控件 -->
	           <div class="ub ub-ac">
	            	<div class="umar-r10 uw-80 ut-r">日期:</div>
	       			<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	           </div>
            </div>
	        <div class="ub uline umar-t8">
	        </div>
	           <div class="ub umar-t8">
                <!--input-checkbox-->
                <div class="ub ub-ac">
                   <div class="umar-r10 uw-80 ut-r">查询类型:</div>
                    <div class="ub ub-ac umar-r10 ">
                        <label> <input class="ub radioItem" id="goodsTotal"  type="radio" name="searchType" value="goodsTotal" checked="checked"/> 商品汇总</label>
                    </div>
                    <div class="ub ub-ac  uh-36">
                      <label class="umar-r10"><input class="ub radioItem" id="categoryTotal" type="radio" name="searchType" value="categoryTotal" />大类汇总</label>
                      <!-- <div id="categoryTypeDiv">
						  <select class="uselect easyui-combobox" name="categoryType" id="categoryType" data-options="editable:false,onChange:onChangeCategoryType" >
							  <option value="smallCategory">小类</option>
							  <option value="medCategory">中类</option>
							  <option value="bigCategory">大类</option>
						  </select>
					  </div> -->
                  </div>
                    <div class="ub ub-ac umar-r10">
                         <label> <input class="ub radioItem"  type="radio" name="searchType" value="branchTotal"  /> 店铺汇总</label>
                    </div>
                </div>
                 <div class="ub ub-ac umar-r40">
                   <div class="umar-r10 uw-80 ut-r"> 店铺名称:</div>
                   <input class="uinp" type="hidden" id="branchId" name="branchId" >
                   <input class="uinp" type="text" id="branchName" name="branchName"  readonly="readonly">
                   <div class="uinp-more" id="branchSelect" onclick="searchBranch()">...</div>
                   
             	 </div>
             	 
             	  <div class="ub ub-ac umar-r40">
                   <div class="umar-r10 uw-80 ut-r"> 商品名称:</div>
                   		<input type="text" name="skuName" id="skuName" class="uinp" />
             	   </div>
            </div>
	         
          <div class="ub umar-t8">
			  <div id="categoryNameDiv" class="ub ub-ac umar-r40">
				<div class="umar-r10 uw-80 ut-r">商品类别:</div>
				  <input type="hidden" name="categoryId" id="categoryId" class="uinp" />
				  <input type="text" name="categoryName" id="categoryName" class="uinp " readonly="readonly"  />
				  <div class="uinp-more" id="categorySelect" onclick="searchCategory()">...</div>
			  </div>
			  
			   <div class="ub ub-ac umar-r40">
				<div class="umar-r10 uw-84 ut-r" >货号/条码:</div>
				<input type="text" name="skuCodeOrBarCode" id="skuCodeOrBarCode" class="uinp" />
			  </div>
            </div>
       	</form>
        <div class="ub ub-f1 umar-t20">
			 <table id="goodsTotalAnalysi"></table>
		</div>
    </div>
</body>
</html>