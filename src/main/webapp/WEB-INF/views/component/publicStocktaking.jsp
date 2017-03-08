<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/component/publicStocktaking.js"></script>
<div class="ub ub-ver ub-pc  uw uh ub-f1">
    <div class="ub ub-ver uw ub-f1 uh">
        <form id="formStock">
            <div class="ub ub-ac upad-10 ">
                <div class="ub ub-ac uw">
                    <div class="umar-r10">关键字:</div>
                    <input name="dlgSearchStr" id="dlgSearchStr" class="usearch uinp ub ub-f1" type="text" >
                    <div class="ubtn umar-l20" onclick="stocktSearch()">查询</div>
                </div>
            </div>
        </form>
        <div class="ub uw uh ub-f1">
            <table id="gridStock" ></table>
        </div>
    </div>
</div>