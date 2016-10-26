<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>采购汇总表</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/report/purchase/total.js"></script>
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
	                <div class="ubtns-item" onclick="resetForm()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
            </div>
	               
	        <div class="ub uline umar-t8">
	        </div>
	         
	      <div class="ub umar-t8">
	           <!-- 引入时间选择控件 -->
	           <div class="ub ub-ac">
	            	<div class="umar-r10 uw-70 ut-r">日期:</div>
	       			<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	           </div>
	      </div>
          <div class="ub umar-t8">
               <div class="ub ub-ac">
                   <div class="umar-r10 uw-70 ut-r">机构名称:</div>
                   <input class="uinp" type="hidden" id="branchId" name="branchId">
                   <input class="uinp" type="text" id="branchName" name="branchName" value="${user.branchName}" readonly="readonly">
                   <div class="uinp-more" id="branchSelect" onclick="searchBranch()">...</div>
               </div>
               <div class="ub ub-ac umar-r40">
				<div class="umar-r10 uw-70 ut-r">供应商:</div>
				<input type="hidden" name="supplierId" id="supplierId" class="uinp" />
				<input type="text" name="supplierName" id="supplierName" class="uinp" readonly="readonly" />
				<div class="uinp-more" id="supplierSelect" onclick="searchSupplier()">...</div>
			  </div>
			  <div class="ub ub-ac umar-r40">
				<div class="umar-r10 uw-70 ut-r">类别:</div>
				<input type="hidden" name="categoryId" id="categoryId" class="uinp" />
				<input type="text" name="categoryName" id="categoryName" class="uinp" readonly="readonly"  />
				<div class="uinp-more" id="categorySelect" onclick="searchCategory()">...</div>
			  </div>
            </div>
            
             <div class="ub umar-t8">
               <div class="ub ub-ac">
                   <div class="umar-r10 uw-70 ut-r">单据类型:</div>
                   <select class="uselect easyui-combobox" name="formType" id="formType" data-options="onChange:onChangeFormType">
                   		<option value="">全部</option>
                   		<option value="PI">采购收货单</option>
                        <option value="PR">采购退货单</option>
                   </select>
               </div>
			  <div class="ub ub-ac umar-r40">
				<div class="umar-r10 uw-70 ut-r">货号/条码:</div>
				<input type="text" name="skuCodeOrBarCode" id="skuCodeOrBarCode" class="uinp" />
			  </div>
            </div>
           
             <div class="ub umar-t8">
                <!--input-checkbox-->
                <div class="ub ub-ac">
                   <div class="umar-r10 uw-70 ut-r">汇总类型:</div>
                    <div class="ub ub-ac umar-r10 ">
                        <input class="ub radioItem" id="goodsTotal" type="radio" name="searchType" value="goodsTotal" checked="checked"/>
                        <label for="goodsTotal">商品汇总</label>
                    </div>
                    <div class="ub ub-ac umar-r10">
                        <input class="ub radioItem" id="supplierTotal" type="radio" name="searchType" value="supplierTotal"  />
                        <label for="supplierTotal">供应商汇总</label>
                    </div>
                   <div class="ub ub-ac umar-r10">
                        <input class="ub radioItem" id="formNoTotal" type="radio" name="searchType" value="formNoTotal" />
                        <label for="formNoTotal">单据汇总</label>
                  </div>
                  <div class="ub ub-ac umar-r10">
                        <input class="ub radioItem" id="categoryTotal" type="radio" name="searchType" value="categoryTotal" />
                        <label for="categoryTotal">类别汇总:</label>
                        <select class="uselect easyui-combobox" name="category" id="category">
	                        <option value="小类">小类</option>
	                        <option value="中类">中类</option>
	                        <option value="大类">大类</option>
                   		</select>
                  </div>
                  
                  
                </div>
            </div>
            
       	</form>
       	<div class="ub umar-t8 umar-b8">【查询结果】</div>
        <div class="ub ub-f1">
			 <table id="purReportTotal"></table>
		</div>
    </div>
</body>
</html>