<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>供应商往来账款</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
      <%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
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
                    <div class="ubtns-item" onclick="exportData()">导出</div>
                    <input type="hidden" id="startCount" name="startCount" />
						<input type="hidden" id="endCount" name="endCount" />
                    <div class="ubtns-item-disabled">打印</div>
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
                        <input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" onblur="$_jxc.clearIdOnEdit(this)"/>
                        <div class="uinp-more" onclick="selectBranches()" >...</div>
                    </div>
                    <div class="ub ub-ac umar-l64">
                        <div class="umar-r10 uw-70 ut-r">供应商:</div>
                        <input class="uinp" name="supplierId" id="supplierId"type="hidden">
                        <input class="uinp" name="supplierName" id="supplierName" type="text" onblur="$_jxc.clearIdOnEdit(this)">
                        <div class="uinp-more" onclick="selectSupplier()">...</div>
                    </div>
                </div>
                <div class="ub umar-t8">
                    <div class="ub ub-ac">
                        <div class="umar-r10 uw-70 ut-r">单据编号:</div>
                        <input class="uinp" type="text" id="formNo" name="formNo">
                    </div>
                </div>
                <div class="ub umar-t8">
                    <div class="ub ub-ac">
                        <div class="umar-r10 uw-70 ut-r">汇总类型:</div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input type="radio" name="radioType" value="1" checked="checked" onclick="initAcountList()"/><span>到期账款</span>
                            </label>
                        </div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input type="radio" name="radioType" value="2" onclick="initAcountList()"/><span>历史往来账款</span>
                            </label>
                        </div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input  type="radio" name="radioType" value="3"  onclick="initAcountList()"/><span>未付款账款汇总</span>
                            </label>
                        </div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input  type="radio" name="radioType" value="4"  onclick="initAcountList()"/><span>未付款账款明细</span>
                            </label>
                        </div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input  type="radio" name="radioType" value="5"  onclick="initAcountList()"/><span>已付账款汇总</span>
                            </label>
                        </div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input  type="radio" name="radioType" value="6"  onclick="initAcountList()"/><span>已付账款明细</span>
                            </label>
                        </div>
                        <div class="ub ub-ac umar-r10">
                            <label>
                                <input  type="radio" name="radioType" value="7"  onclick="initAcountList()"/><span>预付账款明细</span>
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
