<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>新增礼品</title>

    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script src="${ctx}/static/js/views/integral/add.js?V=${versionNo}"></script>

</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
<div class="ub ub-ver ub-f1 umar-4  ubor">
    <div class="ub ub-ac upad-4">
        <div class="ubtns">
            <div class="ubtns-item" onclick="selectGoodsDialog()">商品选择</div>
            <div class="ubtns-item" onclick="saveItemHandel()">保存</div>
            <div class="ubtns-item" onclick="toClose()">关闭</div>
        </div>
    </div>
    <form id="formAdd">
        <div class="ub ub-ver ">
            <div class="ub umar-t8">
                <div class="ub ub-ac">
                   <div class="umar-r10 uw-70 ut-r">兑换分店:</div>
                    <div class="ub ub-ac umar-r10">
                        <input class="radioItem" type="radio" name="branchType" value="0" checked="checked" />
                        <label for="All">全部机构</label>
                        <input class="uinp ub ub-f1" name="branchIds" type="hidden" id="branchIds" value="${branchIds}">
                    </div>
                   <div class="ub ub-ac umar-r10">
                        <input class="radioItem" type="radio" name="branchType" value="1" />
                        <label for="SomeBranch">部分机构</label>
                  </div>
                  <div class="ub ub-ac umar-r80" id="SomeBranch">
                    <input class="uinp ub ub-f1" name="branchId" type="hidden" id="branchId" >
                    <input class="uinp ub ub-f1" name="branchName" type="text" value="" onmouseout="this.title=this.value"  onclick="selectBranch();" id="branchShopName" readonly>
                    <div class="uinp-more" onclick="selectBranch();">...</div>
                  </div>
                  <div class="ub ub-ac umar-r80">
                    <div class="umar-r10 uw-60 ut-r">兑换时间:</div>
                        	<input class="Wdate newWdate"  readonly="readonly" name="startTime" id="startTime" 
                        	onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'%y-%M-%d',maxDate:'#F{$dp.$D(\'endTime\');}'})" />&nbsp;至&nbsp;
                           <input class="Wdate newWdate"  readonly="readonly" name="endTime" id="endTime" 
                           onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'startTime\');}'})" /> 
		            </div>
                </div>
            </div>
        </div>
    </form>
    <div class="ub uw umar-t8 ub-f1">
        <table id="gridEditOrder" ></table>
    </div>
</div>
</body>
</html>