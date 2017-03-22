<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>档案-新增调价单</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    
	<script  src="${ctx}/static/js/views/goods/branchPriceAdjust/addModifyBranchPrice.js?1=1"></script>
    
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 upad-8">
        <div class="ub ub-ac">
            <!--buttons-->
            <div class="ubtns">
               <shiro:hasPermission name="JxcPriceAdjust:add">
				  	<div class="ubtns-item"onclick="addModifyDataGrid();">新增</div>
			   </shiro:hasPermission>
			   
			   <shiro:hasPermission name="JxcBranchPriceAdjust:save">
	                <c:choose>
					   <c:when test="${empty goodsPriceForm.formNo}">
					    	<div class="ubtns-item" id="saveModifyPriceOrder" onclick="saveModifyPriceOrder();">保存</div>
					   </c:when>
					   <c:otherwise>
					   	  <c:if test="${goodsPriceForm.status !=1 }">
							<div class="ubtns-item" id="saveModifyPriceOrder" onclick="updateModifyPriceOrder();">保存</div>
						  </c:if>
						  <c:if test="${goodsPriceForm.status ==1 }">
						  	<div class="ubtns-item-disabled">保存</div>
						  </c:if>
					   </c:otherwise>
					</c:choose>
			   </shiro:hasPermission>
				
		       <shiro:hasPermission name="JxcBranchPriceAdjust:delete">
	          		 <c:choose>
	      			 	<c:when test="${empty goodsPriceForm.formNo || goodsPriceForm.status ==1 }">
		 	 				<div class="ubtns-item-disabled">删单</div>
		 				</c:when>
		 				<c:otherwise>
		 					<c:if test="${goodsPriceForm.status !=1 }">
		 	 					<div class="ubtns-item" id="delModifyOrderDialog" onclick="delModifyOrderDialog();">删单</div>
		 	 				</c:if>
					   </c:otherwise>
	      			 </c:choose>
	          </shiro:hasPermission>
	          
			  <shiro:hasPermission name="JxcBranchPriceAdjust:audit">
			 	 <c:choose>
      			 	<c:when test="${empty goodsPriceForm.formNo || goodsPriceForm.status == 1}">
						 <div class="ubtns-item-disabled">审核</div>
		 			</c:when>
		 			<c:otherwise>
		 				 <div class="ubtns-item" id="check" onclick="check();">审核</div>
	       			 </c:otherwise>	
          		</c:choose>
		 	 </shiro:hasPermission>
		 	 
		 	 <c:choose>
		 	 	<c:when test="${goodsPriceForm.status != 1}">
		 	 		<div class="ubtns-item" id="selectGoodsDialog" onclick="selectGoodsDialog();">商品选择</div>
		 	 	</c:when>
		 	 	<c:otherwise>
		 	 		<div class="ubtns-item-disabled">商品选择</div>
		 	 	</c:otherwise>
		 	 </c:choose>
		 	 
	       	 <shiro:hasPermission name="JxcBranchPriceAdjust:importDetail">
	       		<c:if test="${goodsPriceForm.status !=1 }">
	         		<div class="ubtns-item" id="importdetail" onclick="toImportproduct(0)">导入货号</div>
	        		<div class="ubtns-item" id="importdetail" onclick="toImportproduct(1)">导入条码</div>
	       		</c:if>
	       		<c:if test="${goodsPriceForm.status ==1 }">
	       			<div class="ubtns-item-disabled" >导入货号</div>
	        		<div class="ubtns-item-disabled" >导入条码</div>
	       		</c:if>
	       	 </shiro:hasPermission>
	       	 
	       	 <shiro:hasPermission name="JxcBranchPriceAdjust:exportDetail">
				 <c:if test="${goodsPriceForm.status ==1 || goodsPriceForm.status ==0}">
				 	<div class="ubtns-item"  onclick="exportData();">导出</div>
				 </c:if>
				 <c:if test="${empty goodsPriceForm.formNo}">
				 	<div class="ubtns-item-disabled">导出</div>
				 </c:if>
			 </shiro:hasPermission>
			 
			 <div class="ubtns-item-disabled">打印</div>
			 
       		 <div class="ubtns-item-disabled" >设置</div>
       		 
             <div class="ubtns-item" id="toBackByJSButton" onclick="back()">关闭</div>
             
             <input type="hidden" id="close" value="${close}"/>
            </div>
        </div>
        <form action="" id="searchForm" method="post">
        <div class="ub ub-ac umar-t8">
          	 <div class="ub  uc-black" >【单号】:</div>
          	 <div class="ub " id="formNo">${goodsPriceForm.formNo}</div>
          	 <input value="${goodsPriceForm.status}" type="hidden" id="status"/>
          	 <input id="formId" name="formId" value="${goodsPriceForm.id}" type="hidden">
        </div>
       	 <div class="ub uline umar-t8" ></div>
       	 
       	 <input id="formNoInput" name="formNo" value="${goodsPriceForm.formNo}" type="hidden">
		 <input id="formNoInput" name="formNoInput" value="${goodsPriceForm.formNo}" type="hidden">
		 <input id="id" name="id" value="${goodsPriceForm.id}" type="hidden">
        <div class="ub ub-ver umar-t12">
            <div class="ub">
            	<div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-70 ut-r">机构列表:</div>
                    <input class="uinp ub ub-f1" name="branchId" type="hidden" id="branchId"  value="${branchId}">
                    <input class="uinp ub ub-f1" name="branchName" type="text" id="branchName" value="${branchName}" onmouseout="this.title=this.value"  onclick="selectBranch();" id="branchShopName" readonly>
                    <div class="uinp-more" onclick="selectBranch();">...</div>
                </div>
                <div class="ub ub-ac uw-300 umar-l20">
                    <div class="umar-r10 uw-70 ut-r">生效日期:</div>
                    <c:if test="${goodsPriceForm.effectDate ==null }">
                    	 <input class="Wdate" name="effectDate" id="effectDate" readonly="readonly" value="<fmt:formatDate value='${now}' pattern='yyyy-MM-dd' />" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
                    </c:if>
                    <c:if test="${goodsPriceForm.effectDate !=null }">
                    	  <input class="Wdate" name="effectDate" id="effectDate" readonly="readonly" value="<fmt:formatDate value='${goodsPriceForm.effectDate}' pattern='yyyy-MM-dd' />" onclick="WdatePicker({dateFmt:'yyyy-MM-dd'})"/>
                    </c:if>
                </div>
                <div class="ub ub-ac umar-l20 uw-200">
                    <div class="umar-r10 uw-70 ut-r">制单人员:</div>
                    <div class="utxt"  id="createUserName">${goodsPriceForm.createUserName}</div>
                </div>
                <div class="ub ub-ac umar-l50 uw-200" >
                    <div class="umar-r10 uw-70 ut-r" >制单时间:</div>
                    <div class="utxt" id="createUserDate"><fmt:formatDate value='${goodsPriceForm.createTime}' pattern='yyyy-MM-dd HH:mm' /></div>
                </div>
            </div>
            <div class="ub">
            <div class="ub umar-t8">
                <div class="ub ub-ac uw-600">
                    <div class="umar-r10 uw-70 ut-r">备注:</div>
                    <input class="uinp ub ub-f1" name="remark" value="${goodsPriceForm.remark}" type="text" id="remark">
                </div>
                 <div class="ub ub-ac umar-l20 uw-200">
                    <div class="umar-r10 uw-90 ut-r" >最后修改人:</div>
                    <div class="utxt" id="checkUser">${goodsPriceForm.updateUserName}</div>
                </div>
                <div class="ub ub-ac umar-l70  uw-200">
                    <div class="umar-r10 uw-70 ut-r" >修改时间:</div>
                    <div class="utxt" id="checkDate"><fmt:formatDate value='${goodsPriceForm.updateTime}' pattern='yyyy-MM-dd HH:mm' /></div>
                </div>
            </div>
            </div>
            <div class="ub">
            <div class="ub ub-ac umar-l40" id="checkBoxPrice">
                    <div class="umar-r10 uw-70 ut-r">调价设置:</div>
                     <!-- 如果价格设置不是为空 -->
	                    <div class="ub ub-ac umar-r30">
								  <label><input class="priceItem"  type="checkbox" name="isModifySalePrice" <c:if test="${empty goodsPriceForm.formNo ||  goodsPriceForm.isModifySalePrice == 1}"> checked="checked" </c:if> id="retailPrice"/><span>零售价</span></label>
	                    </div>
	                    <div class="ub ub-ac umar-r30">
								 <label><input class="priceItem"  type="checkbox" name="isModifyVipPrice" <c:if test="${empty goodsPriceForm.formNo ||  goodsPriceForm.isModifyVipPrice == 1}"> checked="checked" </c:if>  id="memberPrice" /><span>会员价</span></label>
	                    </div>	
	                    <div class="umar-r10 uw-300 ut-r">
                    <c:if test="${goodsPriceForm.status !=1}">
                    	<div class="ubtn uw-70" onclick="setModifyPriceDialog()">调价公式</div>
                    </c:if>
                    </div>
                </div>
            <div class="ub umar-t8">
                <div class="ub ub-ac umar-l40 uw-200">
                    <div class="umar-r10 uw-70 ut-r" >审核人员:</div>
                    <div class="utxt" id="checkUser">${goodsPriceForm.validUserName}</div>
                </div>
                <div class="ub ub-ac umar-l50  uw-200">
                    <div class="umar-r10 uw-70 ut-r" >审核时间:</div>
                    <div class="utxt" id="checkDate"><fmt:formatDate value='${goodsPriceForm.validTime}' pattern='yyyy-MM-dd HH:mm' /></div>
                </div>
            </div>
            </div>
            </div>
            <div class="already-examine uhide" id="already-examine"><span>已审核</span></div>
            <div class="ub uw umar-t8 uc-red"><!-- *选择区域进行调价时，默认价格取区域内某个店的价格；对加盟店进行调价，不处理进价列的调价；改变调价机构,将清空所选商品。 --></div>
            <div class="ub umar-t8 umar-b8">【明细信息】</div>
            </form>
            <!--datagrid-edit-->
            <div class="ub uw datagrid-edit">
                <table id="addModifyBranchPriceGrid"></table>
            </div>
        </div>
        
</body>
 
</html>