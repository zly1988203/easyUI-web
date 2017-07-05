<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/component/publicAgency.js"></script>	

    <div class="ub ub-ver ub-pc ub-ac uw uh ub-f1" >

            <div class="ub uw uh ub-f1">
        		<div id="treeAgencyArea"  class="ub  umar-r4 uw-160 uscroll" style="border-right: 1px solid #c9c9c9;">
                    <div class="zTreeDemoBackground left">
                        <ul id="treeAgency" class="ztree"></ul>
                    </div>
                </div>
                <div class="ub ub-ver  uw uh ub-f1">
                    <form action="" id="formAgency">
                        <div class="ub ub-ac upad-10 ">
                            <div class="ub ub-ac uw">
                                <div class="umar-r10">关键字:</div>
                            	<input type="hidden" name="deliverFormType" value="${vo.formType}" />
                            	<input type="hidden" name="branchId" value="${vo.branchId}" />
                            	<input type="hidden" name="branchType" value="${vo.branchType}" />
                            	<input type="hidden" name="isOpenStock" value="${vo.isOpenStock}" />
                            	<input type="hidden" name="scope" value="${vo.scope}" />
                                <input name="nameOrCode" class="usearch uinp ub ub-f1" type="text" />
                                <div class="ubtn umar-l20 umar-r10"  onclick="agencySearch()">查询</div>
                                <div class="ub ub-ac ">
                                  <!--   <input class="ub" type="checkbox" name="hideAgency" checked="checked"/><span>不显示仓库</span> -->
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="ub uw uh ub-f1">
                        <table id="gridAgency" style="width: 100%;"></table>
                    </div>
                </div>
            </div>
      
    </div>

