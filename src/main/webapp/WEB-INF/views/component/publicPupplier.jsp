<!--供应商  -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/component/publicPupplier.js"></script>
     <div class="ub ub-ver ub-pc ub-ac uw uh ub-f1" >
            <div class="ub uw uh ub-f1">
                <div class=" umar-r4 uw-160 ut-s uscroll" style="border-right: 1px solid #c9c9c9;overflow-x: hidden">
                    <div class="zTreeDemoBackground left ">
                        <ul id="treePupplier" class="ztree"></ul>
                    </div>
                </div>
                <div class="ub ub-ver uw uh ub-f1">
                    <form action="" id="formPupplier">
                        <div class="ub ub-ac upad-10 ">
                            <div class="ub ub-ac uw">
                                <div class="umar-r10">关键字:</div>
                                <input class="uinp ub ub-f1" type="text" id="supplierNameOrsupplierCode">
                                <div class="ubtn umar-l20" onclick="supplierSearch()">查询</div>
                            </div>
                        </div>
                    </form>
                    <div class="ub uw uh ub-f1">
                        <table id="gridPupplier" style="width: 100%"></table>
                    </div>
                </div>
            </div>

        </div>

    </div>