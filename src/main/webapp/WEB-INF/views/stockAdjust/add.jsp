<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>库存调整-新增</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/stockAdjust/stockAdd.js?V=${versionNo}"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
                <div class="ubtns-item" onclick="saveOrder()">保存</div>
                <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
                 <div class="ubtns-item" onclick="importHandel(0)">导入货号</div>
                <div class="ubtns-item" onclick="importHandel(1)">导入条码</div>
		                <div class="ubtns-item" onclick="back()">关闭</div>
            </div>
        </div>
           <div class="ub umar-t10">
               <div class="ub ub-ac uw-300">
	                <div class="umar-r10 uw-70 ut-r">机构名称:</div> 
                    <input type="hidden" name="branchId" id="branchId" class="uinp" />
					<input type="text" name="branchName" id="branchName"class="uinp  ub ub-f1" readonly="readonly"  />
					<div class="uinp-more" onclick="searchBranch()">...</div>
	           </div>
	           <i class="ub ub-ac uc-red">*</i>
	             <div class="ub ub-ac uselectw umar-l40">
                    <div class="umar-r10 uw-70 ut-r">调整原因:</div>
                           <select id="reason" class="easyui-combobox uselect" name="reason" ></select>
				        <!--      data-options="valueField:'value',textField:'label',
                    url:'${ctx}/common/dict/ADJUST_REASON'" -->
                </div>
               <div class="ub ub-ac uw-300  umar-l10">
                   <div class="umar-r10 uw-70 ut-r">制单人员:</div>
                   <div class="utxt"><%=UserUtil.getCurrentUser().getUserName() %></div>
               </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                   <div class="utxt" id="createTime"></div>
               </div>
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uselectws">
                    <div class="umar-r10 uw-70 ut-r">出/入库:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" name="io" id="io"  data-options="editable:false,onChange:selectTion">
								<option value="">请选择</option> 
								<option value="0">入库</option> 
								<option value="1">出库</option>
				        </select>
                </div>
                <i class="ub ub-ac uc-red">*</i>
               <div class="ub ub-ac uw-300 umar-l335">
                   <div class="umar-r10 uw-70 ut-r">审核人员:</div>
                   <div class="utxt"></div>
               </div>
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">审核时间:</div>
                   <div class="utxt"></div>
               </div>
           </div>
           <div class="ub umar-t8">
              <div class="ub ub-ac uw-300" >
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp uninput" type="text" id="remark" name="remark">
               </div>
           </div>
           <!--datagrid-edit-->
           <div class="ub ub-f1 datagrid-edit umar-t8">
               <table id="gridEditOrder" ></table>
           </div>
    </div>

     
     <script type="text/javascript">
     $('#reason').combobox({
         valueField:'value',
         textField:'label',
         url:'${ctx}/common/dict/ADJUST_REASON',    
         onSelect: function(record){
           
         },
         onLoadSuccess:function(data){
        	 $('#reason').combobox('setValue', 'OTHER');

         }
     });
     </script>
</body>

</html>