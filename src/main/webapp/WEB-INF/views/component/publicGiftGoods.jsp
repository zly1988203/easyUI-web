<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<style> 
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
    <script src="${ctx}/static/js/views/component/publicGiftGoods.js"></script>
<div class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-pc uh ub-f1">
        <div class="ub ub-f1">

            <div class="ub ub-ver ub-f1 ">
				
                <div class="ub  ub-f1" >
                    <table id="gridGiftGoods"></table>
                </div>

            </div>
        </div>

    </div>
</div>

<!-- 因为列属于动态的，需要C标签，JS直接写在JSP文件里面 -->