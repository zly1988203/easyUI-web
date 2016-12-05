<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>要货单-新增</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/deliver/deliverAdd.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
            	<shiro:hasPermission name="JxcDeliverDA:add">
                	<div class="ubtns-item" onclick="saveOrder()">保存</div>
                </shiro:hasPermission>
                <div class="ubtns-item" onclick="selectGoods()">商品选择</div>
                <div class="ubtns-item" onclick="toImportproduct(0)">导入货号</div>
            	<div class="ubtns-item" onclick="toImportproduct(1)">导入条码</div>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
           <div class="ub">
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">要货机构:</div>
                   <div class="ub">
                       <input type="hidden" id="targetBranchId" name="targetBranchId" value="${branchesGrow.targetBranchId}"  />
                       <input type="hidden" id="targetBranchType" name="targetBranchType" value="${branchesGrow.targetBranchType}"  />
                       <input type="hidden" id="minAmount" name="minAmount" value="${branchesGrow.minAmount}"  />
                       <input class="uinp ub ub-f1" type="text" id="targetBranchName" readonly="readonly" value="${branchesGrow.targetBranchName}" onclick="selectTargetBranch()" />
                       <div class="uinp-more" onclick="selectTargetBranch()">...</div>
                   </div>
               </div>
               <div class="ub ub-ac uw-300 umar-l20">
                   <div class="umar-r10 uw-70 ut-r">业务人员:</div>
                   <div class="ub">
                       <input class="uinp ub ub-f1" type="text" id="salesman" name="salesman" value="${branchesGrow.salesman}" readonly="readonly" />
                       <div class="uinp-more"></div>
                   </div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-70 ut-r">制单人员:</div>
                   <div class="utxt"><%=UserUtil.getCurrentUser().getUserName() %></div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                   <div class="utxt" id="createTime"></div>
               </div>
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-70 ut-r">发货机构:</div>
                   <div class="ub">
                       <input type="hidden" id="sourceBranchId" name="sourceBranchId" value="${branchesGrow.sourceBranchId}"/>
                       <input class="uinp ub ub-f1" type="text" id="sourceBranchName" name="sourceBranchName" value="${branchesGrow.sourceBranchName}" readonly="readonly" onclick="selectSourceBranch()"/>
                       <div class="uinp-more" onclick="selectSourceBranch()">...</div>
                   </div>

               </div>
               <div class="ub ub-ac uw-300 umar-l20">
                  <div class="umar-r10 uw-70 ut-r">有效期限:</div>
                  <input id="validityTime" class="Wdate" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" value="<fmt:formatDate value="${branchesGrow.validityTime}" pattern="yyyy-MM-dd"/>"/>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-70 ut-r">审核人员:</div>
                   <div class="utxt"></div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                   <div class="utxt"></div>
               </div>
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-620">
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
         <div class="uacon">
         	<input class="uinp ub" id="filename" type="text">
         	<label class="ualable">选择文件
         		<input type="file" class="uafile" value=""  name="xlfile" id="xlf" />
         	</label>
         </div>
         <div class="uabtns ">
     	 	<button class="uabtn umar-r30" onclick="importHandel()">导入</button>
     	 	<button class="uabtn" onclick="uaclose()" >取消</button>
     	 </div>
     </div>
</body>
</html>