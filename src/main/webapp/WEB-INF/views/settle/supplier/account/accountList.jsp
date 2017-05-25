<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>供应商费用</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script  src="${ctx}/static/js/views/settle/supplier/account/accountList.js?V=2.6.0"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
        <form id="queryForm" action="" method="post">
            <div class="ub ub-ac">
                <div class="ubtns">
                    <div class="ubtns-item" onclick="queryForm()">查询</div>
                    <div class="ubtns-item" onclick="export()">导出</div>
                    <div class="ubtns-item" onclick="print()">导出</div>
                    <div class="ubtns-item" id="set" onclick="gFunRefresh()" >重置</div>
                    <div class="ubtns-item-disabled" >设置</div>
                    <div class="ubtns-item" onclick="toClose()">退出</div>
                </div>
                <div class="ub ub-ac umar-l20">
                 <!-- 引入时间选择控件 -->
                <%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
                </div>
            </div>
                <div class="ub umar-t8">
                    <div class="ub ub-ac">
                        <div class="umar-r10 uw-70 ut-r">机构:</div>
                        <input type="hidden" id="branchId" name="branchId"/>
                        <input type="hidden" id="branchType" name="branchType" />
                        <input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" onblur="clearBranchCode(this,'targetBranchId')"/>
                        <div class="uinp-more" onclick="selectBranches()" >...</div>
                    </div>
                    <div class="ub ub-ac umar-l64">
                        <div class="umar-r10 uw-70 ut-r">供应商:</div>
                        <input class="uinp" name="supplierId" id="supplierId"type="hidden">
                        <input class="uinp" readonly="readonly" id="supplierName" type="text"  onclick="selectSupplier()">
                        <div class="uinp-more" onclick="selectSupplier()">...</div>
                    </div>
                </div>
                <div class="ub umar-t8">
                    <div class="ub ub-ac">
                        <div class="umar-r10 uw-70 ut-r">单据编号:</div>
                        <input type="hidden" id="formType" name="formType" value="FF" />
                        <input class="uinp" type="text" id="formNo" name="formNo">
                    </div>
                    <div class="ub ub-ac umar-l64">
                        <div class="umar-r10 uw-70 ut-r">制单人:</div>
                        <input type="hidden" id="createUserId" name="createUserId" />
                        <input class="uinp ub ub-f1" type="text" id="createUserName" name="createUserName" type="text" />
                        <div class="uinp-more" onclick="selectOperator()">...</div>
                    </div>
                </div>
                <div class="ub umar-t8">
                    <div class="ub ub-ac">
                        <div class="umar-r10 uw-70 ut-r">汇总类型:</div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input type="radio" name="orderStatus" value="1" checked="checked" onclick="queryForm()"/><span>到期账款</span>
                            </label>
                        </div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input type="radio" name="orderStatus" value="2" onclick="queryForm()"/><span>历史往来账款</span>
                            </label>
                        </div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input  type="radio" name="orderStatus" value="3"  onclick="queryForm()"/><span>未付款账款汇总</span>
                            </label>
                        </div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input  type="radio" name="orderStatus" value="4"  onclick="queryForm()"/><span>未付款账款明细</span>
                            </label>
                        </div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input  type="radio" name="orderStatus" value="5"  onclick="queryForm()"/><span>已付账款汇总</span>
                            </label>
                        </div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input  type="radio" name="orderStatus" value="6"  onclick="queryForm()"/><span>已付账款明细</span>
                            </label>
                        </div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input  type="radio" name="orderStatus" value="7"  onclick="queryForm()"/><span>预付账款明细</span>
                            </label>
                        </div>
                    </div>
                </div>
            
        </form>
        <div class="ub ub-f1  umar-t8 umar-b8">
            <table id="supAccountList"></table>
        </div>
    </div>

</body>
</html>

</html>
