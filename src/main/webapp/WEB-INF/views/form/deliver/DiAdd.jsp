<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>入库单-新增</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/deliver/DiAdd.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
                <div class="ubtns-item" onclick="saveOrder()">保存</div>
               	<!-- <div class="ubtns-item" onclick="importproductAll()">导入明细</div>
                <div class="ubtns-item" onclick="importproduct()">导入货号</div> -->
                <div class="ubtns-item" onclick="toBackByJS()">返回</div>
            </div>
        </div>
           <div class="ub">
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">收货机构:</div>
                   <div class="ub">
                       <input type="hidden" id="targetBranchId" name="targetBranchId" value="${user.branchId}"  />
                       <input class="uinp ub ub-f1" type="text" id="targetBranchName" name="targetBranchName" value="${user.branchName}" readonly="readonly" />
                       <div class="uinp-more"></div>
                   </div>

               </div>
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">配送单号:</div>
                   <div class="ub">
                       <input type="hidden" id="referenceId" name="referenceId" />
                       <input class="uinp ub ub-f1" type="text" id="referenceNo" name="referenceNo" onclick="selectDeliver()" readonly="readonly"/>
                       <div class="uinp-more" onclick="selectDeliver()">...</div>
                   </div>

               </div>
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">制单人员:</div>
                   <div class="utxt"><%=UserUtil.getCurrentUser().getUserName() %></div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-60 ut-r">制单日期:</div>
                   <div class="utxt" id="createTime"></div>
               </div>
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">发货机构:</div>
                   <div class="ub">
                       <input type="hidden" id="sourceBranchId" name="sourceBranchId" />
                       <input class="uinp ub ub-f1" type="text" id="sourceBranchName" name="sourceBranchName" readonly="readonly" />
                       <div class="uinp-more"></div>
                   </div>

               </div>
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">审核人员:</div>
                   <div class="utxt"></div>
               </div>
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">审核日期:</div>
                   <div class="utxt"></div>
               </div>
           </div>
           <div class="ub umar-t8">
              <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                   <input class="uinp" type="text" id="remark" name="remark">
               </div>
           </div>
           <!--datagrid-edit-->
           <div class="ub ub-f1 datagrid-edit umar-t8">
               <table id="gridEditOrder" ></table>
           </div>
    </div>
     <!-- 导入弹框 -->
    <div class="uabs uatk">

     	<div class="uatit">导入文件选择</div>
         <div class="uacon"><input class="uinp ub" id="filename" type="text"><label class="ualable">选择文件<input type="file" class="uafile" value=""  name="xlfile" id="xlf" /></label></div>
         
         <div class="uabtns ">
     	 	<button class="uabtn umar-r30" onclick="importHandel('gridEditOrder')">导入</button>
     	 	<button class="uabtn" onclick="uaclose()" >取消</button>
     	 </div>
     </div>
</body>
</html>