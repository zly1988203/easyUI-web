<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>商品组合设置</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/goods/goodsComponent.js"></script>  
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
    	<form id="queryForm">
	        <div class="ub ub-ac">
	            <div class="ubtns">
					<div class="ubtns-item" onclick="query()">查询</div>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	        </div>
	
	        <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">关键字:</div>
	                <input class="uinp uninputs" name="goodsInfos" id="goodsInfos" type="text" placeholder="输入货号、条码、商品名称进行查询"> 
	            </div>
	             
	            <div class="ub ub-ac uselectws">
                    <div class="umar-r10 uw-70 ut-r">商品类型:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" name="type" id="type"  data-options="editable:false">
								<option value=""  selected="selected">全部</option> 
								<option value="1">制单组合</option> 
								<option value="2">制单拆分</option>
								<option value="3">捆绑商品</option>
								<!-- <option value="4">自动转货</option> -->
				        </select>
                </div>
                <div class="ub ub-ac uselectws"> <label class="uncheckbox umar-l40"> <input type="checkbox" name="isBind" id="isBind" onclick="checkval();" name="check" value="0">仅显示未绑定成份的商品</label></div>
	        </div>

        </form>
        <div class="ub uw umar-t8 ub-f1">
            <table id="gridOrdersview"></table>  
        </div>
        <div class="ub ub-ac">
                 <span class="ubspan">成分信息:</span>
	             <div class="ubtns umar-b20 umar-t20">
	                <div class="ubtns-item" onclick="saveResultOrder()">保存</div>
					<div class="ubtns-item" onclick="selectGoods()">商品选择</div>
	            </div>
	    </div>
        <div class="ub uw umar-t8 ub-f1 unresult">
            <!-- <div class="unconner"> -->
              <table id="gridOrdersresult"></table>
          <!--   </div> -->
        </div>
    </div>
</body>
</html>