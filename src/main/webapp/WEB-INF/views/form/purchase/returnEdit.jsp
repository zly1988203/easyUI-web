<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>退货单-修改</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/purchase/returnEdit.js"></script>
    
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
                <div class="ubtns-item" onclick="saveItemHandel()">保存</div>
                <div class="ubtns-item" onclick="check()">审核</div>
                <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
                <div class="ubtns-item" onclick="orderDelete()">删单</div>
                <div class="ubtns-item" onclick="stop()">终止</div>
                <div class="ubtns-item" onclick="toImportproduct(0)">导入货号</div>
                <div class="ubtns-item" onclick="toImportproduct(1)">导入条码</div>
                <div class="ubtns-item" onclick="printDesign()">打印</div>
                <div class="ubtns-item"  onclick="back()">返回</div>
            </div>
        </div>
        <div class="ub umar-t8 uc-black">【单号】：<span >${form.formNo}</span></div>
        <div class="ub uline umar-t8"></div>
        <input type="hidden" id="formId" value="${form.id}">
        <input type="hidden" id="formNo" value="${form.formNo}">
        <div class="ub umar-t8">
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">供应商:</div>
                <input id="supplierId" class="uinp" value="${form.supplierId}" type="hidden">
                <input id="supplierName" class="uinp" value="[${form.supplierCode}]${form.supplierName}" type="text" readonly="readonly" onclick="selectSupplier()">
                <div class="uinp-more" onclick="selectSupplier()">...</div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">付款期限:</div>
                <input id="paymentTime" class="Wdate" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" value="<fmt:formatDate value="${form.paymentTime}" pattern="yyyy-MM-dd"/>"/>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">制单人员:</div>
                <div class="utxt">${form.updateUserName}</div>
            </div>
            <div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">制单日期:</div>
                <div class="utxt"><fmt:formatDate value="${form.updateTime}" pattern="yyyy-MM-dd"/></div>
            </div>
        </div>
        <div class="ub umar-t8">
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">收货机构:</div>
               	<input class="uinp" name="branchId" id="branchId" type="hidden" value="${form.branchId}">
                <input class="uinp" id="branchName" type="text" readonly="readonly" value="[${form.branchCode}]${form.branchName}" onclick="selectBranch()" >
                <div class="uinp-more" onclick="selectBranch()">...</div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">采购员:</div>
                <input class="uinp" name="salesmanId" id="salesmanId" type="hidden" value="${form.salesmanId}">
                <input class="uinp" id="operateUserName" type="text" readonly="readonly" onclick="selectOperator()" value="${form.salesmanName}">
                <div class="uinp-more" onclick="selectOperator()">...</div>
            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">审核人员:</div>
                <div class="utxt"></div>
            </div>
            <div class="ub ub-ac">
                <div class="umar-r10 uw-60 ut-r">审核日期:</div>
                <div class="utxt"></div>
            </div>
        </div>
        <div class="ub umar-t8">
        	<div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">原单类型:</div>
                <div class="ub uw-200">
                    <div class="ub ub-ac umar-r10">
                        <input class="ub" type="radio" name="refFormNoType" value="PI" checked="checked"/><span>收货单 </span>
                    </div>
                    <div class="ub ub-ac umar-r10">
                        <input class="ub" type="radio" name="refFormNoType" value="DI"/><span>直调入库单 </span>
                    </div>
                </div>

            </div>
            <div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">原单号:</div>
                <input id="refFormNo" class="uinp" type="text" readonly="readonly" onclick="selectForm()" value="${form.refFormNo}">
                <input type="hidden" id="oldRefFormNo" name="oldRefFormNo" value="${form.refFormNo}" />
                <div class="uinp-more" onclick="selectForm()">...</div>
            </div>
        </div>
        <div class="ub umar-t8">
        	<div class="ub ub-ac umar-r80">
                <div class="umar-r10 uw-60 ut-r">备注:</div>
                <input id="remark" class="uinp" type="text" value="${form.remark}" style="width:800px">
            </div>
        </div>
        <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="gridEditOrder" ></table>
        </div>
        
	              <!-- 导入弹框 -->
		    <div class="uabs uatk">
		     	<div class="uatit">导入文件选择</div>
		         <div class="uacon">
		         	<input class="uinp ub" id="filename" type="text">
		         	<label class="ualable">选择文件
		         		<input type="file" class="uafile" value=""  name="xlfile" id="xlf" />
		         	</label>
		         </div>
		         <div class="uabtns ">
		     	 	<button class="uabtn umar-r30" onclick="importHandel('gridEditOrder')">导入</button>
		     	 	<button class="uabtn" onclick="uaclose()" >取消</button>
		     	 </div>
		     </div>
        
    </div>

</body>
</html>