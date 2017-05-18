<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<style> 
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
    <script src="${ctx}/static/js/views/component/publicGoods.js"></script>
<div class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-pc uh ub-f1">
        <div class="ub ub-f1">
            <div class="ub ub-ver uw-200">
                <div class="upad-4">
                    <select id="goodsType" class="uselect"></select>
                </div>
                <div class="ubor-b "></div>
                <div class="ub ubor ub-f1 uscroll uh-200">
                    <div class="zTreeDemoBackground left">
                        <ul id="treeGoodsType" class="ztree"></ul>
                    </div>
                </div>
            </div>
            <div class="ub ub-ver ub-f1 ">
                <div class="ub ub-ac upad-10">
                    <input class="usearch uinp ub ub-f1" type="text" id="goodsInfo"
                           placeholder="可按货号、自编码、品名、助记码等查询">
                    <input type="button" class="ubtn umar-l10" value="查询" onclick="cx()">
                </div>

                <div class="ub  ub-f1" >
                    <table id="gridGoods"></table>
                </div>

            </div>
        </div>
    <input type="hidden" name="searchSupplierId" id="searchSupplierId" value="${searchSupplierId}">
    <input type="hidden" id="type" value="${type}"/>
    <input type="hidden" id="flag" value="${flag}"/>
    <input type="hidden" id="sourceBranchId" value="${sourceBranchId}"/>
    <input type="hidden" id="targetBranchId" value="${targetBranchId}"/>
    <input type="hidden" id="branchId" value="${branchId}"/>
    <input type="hidden" id="categoryCodes" value="${categoryCodes}"/>
    <input type="hidden" id="isManagerStock" value="${isManagerStock}"/>

    </div>
</div>

<!-- 因为列属于动态的，需要C标签，JS直接写在JSP文件里面 -->