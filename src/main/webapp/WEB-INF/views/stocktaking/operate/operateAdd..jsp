<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增库存盘点</title>
</head>
<body class="ub uw uh ufs-14 uc-black">
  <div class="ub ub-ver ub-f1 umar-4  ubor">
    <form id="addqueryForm" action="" method="post">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            <div class="ubtns-item" onclick="addOperate()">新增</div>
             <shiro:hasPermission name="JxcCostAdjust:add">
                <div class="ubtns-item" onclick="addsaveOrder()">保存</div>
             </shiro:hasPermission>
                <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
                <div class="ubtns-item" id="importdetail" onclick="toImportproduct()">导入</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
           <div class="ub umar-t10">
               <div class="ub ub-ac uw-300">
	                <div class="umar-r10 uw-70 ut-r">机构名称:</div> 
                    <input type="hidden" name="branchId" id="branchId" class="uinp" />
					<input type="text" name="branchName" id="branchName"class="uinp ub ub-f1" readonly="readonly"  />
					<div class="uinp-more" onclick="searchBranch()">...</div>
	           </div>
	            <div class="ub ub-ac uselectw umar-l00">
                    <div class="umar-r10 uw-70 ut-r">盘点批号:</div>
     				<input type="hidden" name=takeStockId id="takeStockId" class="uinp" />
					<input type="text" name="takeStockName" id="takeStockName"class="uinp ub ub-f1" readonly="readonly"  />
					<div class="uinp-more" onclick="searchTakeStock()">...</div>
                </div>
               <div class="ub ub-ac umar-l40 uw-300 ">
                   <div class="umar-r10 uw-70 ut-r">制单人员:</div>
                   <div class="utxt">${sessionScope.session_user.userName }</div>
               </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-60 ut-r">制单日:</div>
                   <div class="utxt" id="createTime"></div>
               </div>
           </div>
           <div class="ub umar-t8">
           
               <div class="ub ub-ac" >
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp uninputs" type="text" id="remark" name="remark">
               </div>
               <div class="ub ub-ac umar-l40 uw-300">
                   <div class="umar-r10 uw-70 ut-r">审核人员:</div>
                   <div class="utxt"></div>
               </div>
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">审核时间:</div>
                   <div class="utxt"></div>
               </div>
           </div>
          	</form>
           <!--datagrid-edit-->
           <div class="ub ub-f1 datagrid-edit umar-t8">
               <table id="gridEditOrder" ></table>
           </div>
    </div>
</body>
</html>