<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>加盟店预收款</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/settle/franchise/advance/advance.js?V=2.6.0"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<input type='hidden' id="operateType" name="operateType" value="add">
    <div class="ub ub-ver ub-f1 umar-4  ubor">
        <div class="ub ub-ac upad-4">
            <div class="ubtns">
				<shiro:hasPermission name="JxcFranchiseAdvance:add">
            		<div class="ubtns-item" onclick="addFraAdvForm()">新增</div>
            	</shiro:hasPermission>
				<shiro:hasPermission name="JxcFranchiseAdvance:add">
                	<div class="ubtns-item" onclick="saveFraAdvOrder()">保存</div>
                </shiro:hasPermission>
				<shiro:hasPermission name="JxcFranchiseAdvance:audit">
                	<div class="ubtns-item-disabled">审核</div>
                </shiro:hasPermission>
                <div class="ubtns-item" onclick="selectCharge()">费用选择</div>
				<shiro:hasPermission name="JxcFranchiseAdvance:delete">
                	<div class="ubtns-item-disabled" >删除</div>
                </shiro:hasPermission>
				<shiro:hasPermission name="JxcFranchiseAdvance:export">
                	<div class="ubtns-item-disabled" >导出明细</div>
                </shiro:hasPermission>
				<shiro:hasPermission name="JxcFranchiseAdvance:print">
                	<div class="ubtns-item-disabled" >打印</div>
                </shiro:hasPermission>
                <div class="ubtns-item" onclick="toClose()">关闭</div>
            </div>
        </div>
        <div class="ub uline umar-t8"></div>
        <div class="ub umar-t8">
            <div class="ub ub-ac uw-300">
                <div class="umar-r10 uw-70 ut-r">加盟店:</div>
                <div class="ub">
                    <input type="hidden" id="branchId" name="franchiseBranchId"/>
                    <input type="hidden" id="branchCode" name="branchCode"/>
                    <input class="uinp ub ub-f1" type="text" id="targetBranchName" readonly="readonly" onclick="selectBranches()" />
                    <div class="uinp-more" onclick="selectBranches()">...</div>
                </div>
                <i class="ub ub-ac uc-red">*</i>
            </div>
            <div class="ub ub-ac uw-300 umar-l20">
                <div class="umar-r10 uw-70 ut-r">付款日期:</div>
                <div class="ub">
                   <input id="payMoneyTime" class="Wdate" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" pattern="yyyy-MM-dd"/>
                </div>
                <i class="ub ub-ac uc-red">*</i>
            </div>
            <div class="ub ub-ac umar-l20">
                <div class="umar-r10 uw-70 ut-r">制单人:</div>
                <div class="utxt"><%=UserUtil.getCurrentUser().getUserName() %></div>
            </div>
            <div class="ub ub-ac umar-l20">
                <div class="umar-r10 uw-60 ut-r">制单时间:</div>
                <div class="utxt" id="createTime"></div>
            </div>
         </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-300">
               </div>
               <div class="ub ub-ac uw-300 umar-l20">
               </div>
               <div class="ub ub-ac umar-l10">
                   <div class="umar-r10 uw-80 ut-r">最后修改人:</div>
                   <div class="utxt"></div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-60 ut-r">修改时间:</div>
                   <div class="utxt"></div>
               </div>
               
           </div>
           <div class="ub umar-t8">
               <div class="ub ub-ac uw-600">
                   <div class="umar-r10 uw-70 ut-r">备注:</div>
                	<input class="uinp ub ub-f1" type="text" id="remark" maxLength='20'  name="remark">
               </div>
               <div class="ub ub-ac umar-l40">
                   <div class="umar-r10 uw-70 ut-r">审核人:</div>
                   <div class="utxt"></div>
               </div>
               <div class="ub ub-ac umar-l20">
                   <div class="umar-r10 uw-60 ut-r">审核时间:</div>
                   <div class="utxt"></div>
               </div>               
           </div>
           <%--datagrid-edit--%>
           <div class="ub ub-f1 datagrid-edit umar-t8">
            <table id="franchiseAdvanceListAdd" ></table>
        </div>
    </div>

</body>
</html>
