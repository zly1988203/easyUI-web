<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/component/publicForm.js"></script>	
<div class="ub ub-ver ub-pc ub-ac uw uh ub-f1">
        <div class="ub ub-ver ub-f1 uw uh">
            <form action="" id="form">
                <div class="ub ub-ac upad-10 ">
                    <div class="ub ub-ac uw">
                        <div class="umar-r10">关键字:</div>
                        <input type="hidden" id="type" value="${type}">
                        <input class="usearch uinp ub ub-f1" id="formNo" type="text" placeholder="输入编号/名称" >
                        <div class="ubtn umar-l20" onclick="formCx()">查询</div>
                    </div>
                </div>
            </form>

            <div class="ub uw uh ub-f1">
                <table id="gridForm" ></table>
            </div>
        </div>
</div>
