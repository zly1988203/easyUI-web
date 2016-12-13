<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script  src="${ctx}/static/js/views/goods/goodsArchivesAdd.js"></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
  
    <div class="ub uline "></div>
    <form id="formGoodsArchivesAdd" style="font-size: 14px;" method="post">
        <div class="ub ub-ver ub-ac upad-4">
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">收银员:</div>
                    <input id="skuCode" name="skuCode" class="uinp uinp-no-more uw-200 "  readonly="readonly" type="text" value="${shift['createUserName']}">
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">线上支付总额:</div>
                    <input id="memoryCode" name="memoryCode" readonly="readonly" data-options="precision:2" class="uinp   easyui-numberbox easyui-validatebox "value="${shift['onlineOrderTotal']}"  style="width: 204px;" >
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">线上支付退款:</div>
                    <div class="ub">
                    <input id="purchaseSpec" name="purchaseSpec" readonly="readonly" data-options="precision:2" class="uinp   easyui-numberbox easyui-validatebox "value="${shift['onlinePaymentRefund']}" style="width: 204px;"   type="text"   onkeyup="checkInteger(this)" onafterpaste="checkInteger(this)"  >
                    </div>
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">货到付款退款:</div>
                     <div class="ub">
                     <input id="distributionSpec" name="distributionSpec"  readonly="readonly" data-options="precision:2"   class="uinp easyui-numberbox easyui-validatebox " value="${shift['payDelivery']}" style="width: 204px;"  type="text" >
                     </div>
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">pos销售总额:</div>
                    <div class="ub">
                     <input id="distributionSpec" name="distributionSpec" readonly="readonly"  data-options="precision:2"  class="uinp easyui-numberbox easyui-validatebox " value="${shift['posTotalSales']}" style="width: 204px;"  type="text" >
                     </div>
                </div>
            </div>
             <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">pos销售退款:</div>
                    <div class="ub">
                     <input id="distributionSpec" name="distributionSpec" readonly="readonly"  data-options="precision:2"  class="uinp easyui-numberbox easyui-validatebox " value="${shift['deliverFee']}"  style="width: 204px;"  type="text" >
                     </div>
                </div>
            </div>
               <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">配送费总额:</div>
                    <div class="ub">
                     <input id="distributionSpec" name="distributionSpec" readonly="readonly"  data-options="precision:2"  class="uinp easyui-numberbox easyui-validatebox " value="${shift['posSalesRefund']}" style="width: 204px;"  type="text" >
                     </div>
                </div>
            </div>
             <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">实际现金总额:</div>
                    <div class="ub">
                     <input id="distributionSpec" name="distributionSpec" readonly="readonly"  data-options="precision:2"  class="uinp easyui-numberbox easyui-validatebox "value="${shift['actualCashTotal']}"  style="width: 204px;"  type="text" >
                     </div>
                </div>
            </div>
             <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">班次开始时间:</div>
                    <div class="ub">
                     <input id="loginTime" name="loginTime" readonly="readonly" class="uinp uinp-no-more uw-200 " value="${shift['loginTime']}"  style="width: 201px;"  type="text" >
                     </div>
                    
                </div>
            </div>
              <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">班次结束时间:</div>
                     <div class="ub">
                     <input id="exitTime" name="exitTime" readonly="readonly" class="uinp uinp-no-more uw-200 "   style="width: 201px;"  type="text" >
                     </div>
                </div>
            </div>
        </div>
    </form>
    <script>
    (function(){
    	distributionSpecVal = new Date("${shift['exitTime']}").format("yyyy-MM-dd hh:mm:ss");
    	$("#exitTime").val(distributionSpecVal);
    	
    	loginTime = new Date("${shift['loginTime']}").format("yyyy-MM-dd hh:mm:ss");
    	$("#loginTime").val(loginTime);
    })();
    </script>

</div>
