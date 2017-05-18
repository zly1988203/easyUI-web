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
                    <input id="createUserName" name="createUserName" class="uinp uinp-no-more uw-200 "  readonly="readonly" type="text" value="${shift['createUserName']}">
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">线上支付总额:</div>
                    <input id="onlineOrderTotal" name="onlineOrderTotal" readonly="readonly" data-options="precision:2" class="uinp   easyui-numberbox easyui-validatebox "value="${shift['onlineOrderTotal']}"  style="width: 204px;" >
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">线上支付退款:</div>
                    <div class="ub">
                    <input id="onlinePaymentRefund" name="onlinePaymentRefund" readonly="readonly" data-options="precision:2" class="uinp   easyui-numberbox easyui-validatebox "value="${shift['onlinePaymentRefund']}" style="width: 204px;"   type="text"   onkeyup="checkInteger(this)" onafterpaste="checkInteger(this)"  >
                    </div>
                </div>
            </div>
             <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">货到付款总额:</div>
                     <div class="ub">
                     <input id="payDelivery" name="payDelivery"  readonly="readonly" data-options="precision:2"   class="uinp easyui-numberbox easyui-validatebox " value="${shift['payDelivery']}" style="width: 204px;"  type="text" >
                     </div>
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">货到付款退款:</div>
                     <div class="ub">
                     <input id="payDeliveryRefund" name="payDeliveryRefund"  readonly="readonly" data-options="precision:2"   class="uinp easyui-numberbox easyui-validatebox " value="${shift['payDeliveryRefund']}" style="width: 204px;"  type="text" >
                     </div>
                </div>
            </div>
            <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">pos销售总额:</div>
                    <div class="ub">
                     <input id="posTotalSales" name="posTotalSales" readonly="readonly"  data-options="precision:2"  class="uinp easyui-numberbox easyui-validatebox " value="${shift['posTotalSales']}" style="width: 204px;"  type="text" >
                     </div>
                </div>
            </div>
             <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">pos销售退款:</div>
                    <div class="ub">
                     <input id="posSalesRefund" name="posSalesRefund" readonly="readonly"  data-options="precision:2"  class="uinp easyui-numberbox easyui-validatebox " value="${shift['posSalesRefund']}"  style="width: 204px;"  type="text" >
                     </div>
                </div>
            </div>
               <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">配送费总额:</div>
                    <div class="ub">
                     <input id="deliverFee" name="deliverFee" readonly="readonly"  data-options="precision:2"  class="uinp easyui-numberbox easyui-validatebox " value="${shift['deliverFee']}" style="width: 204px;"  type="text" >
                     </div>
                </div>
            </div>
             <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">实际现金总额:</div>
                    <div class="ub">
                     <input id="actualCashTotal" name="actualCashTotal" readonly="readonly"  data-options="precision:2"  class="uinp easyui-numberbox easyui-validatebox "value="${shift['actualCashTotal']}"  style="width: 204px;"  type="text" >
                     </div>
                </div>
            </div>
             <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">班次开始时间:</div>
                    <div class="ub">
                     <input id="loginTime" name="loginTime" readonly="readonly" class="uinp uinp-no-more uw-200 " value="${shift['loginTimeStr']}"  style="width: 201px;"  type="text" >
                     </div>
                    
                </div>
            </div>
              <div class="ub upad-4">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-100 ut-r">班次结束时间:</div>
                     <div class="ub">
                     <input id="exitTime" name="exitTime" readonly="readonly" class="uinp uinp-no-more uw-200 " value="${shift['exitTimeStr']}"  style="width: 201px;"  type="text" >
                     </div>
                </div>
            </div>
        </div>
    </form>
    <script>
  
    </script>

</div>
