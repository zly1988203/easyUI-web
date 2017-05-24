<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<style> 
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
    <script src="${ctx}/static/js/views/component/publicCharge.js"></script>
<!-- <form id="chargeSelectForm"> -->
<!-- <div class="ub uw uh ufs-14 uc-black"> -->
<!--     <div class="ub ub-ver ub-pc uh ub-f1"> -->
<!--         <div class="ub ub-f1"> -->
<!--             <div class="ub ub-ver ub-f1 "> -->
<!--                 <div class="ub ub-ac upad-10"> -->
<!--                     <input class="usearch uinp ub ub-f1" type="text" id="nameOrCode" name = "nameOrCode" placeholder="可按名称或编码查询"> -->
<!--                     <input type="button" class="ubtn umar-l10" value="查询" onclick="chargeSearch()"> -->
<!--                 </div> -->


<!--             </div> -->
<!--         </div> -->
<%--     <input type="hidden" id="type" name="type" value="${type}"/> --%>
<!--     </div> -->
<!-- </div> -->
<!-- </form> -->
<!-- <div class="ub  ub-f1" > -->
<!--     <table id="chargeSelectList"></table> -->
<!-- </div> -->
<!-- 因为列属于动态的，需要C标签，JS直接写在JSP文件里面 -->
<div class="ub ub-ver ub-pc ub-ac uw uh ub-f1" >
        <div class="ub uw uh ub-f1 ub-ver">
        	<div class="ub uw ">
         		<form action="" id="chargeSelectForm" class="ub uw ub-ver">
                    <div class="ub ub-ac upad-10 ">
                        <div class="ub ub-ac uw">
                            <div class="umar-r10">关键字:</div>
                        	<input type="hidden" id="type" name="type" value="${type}"/>
                            <input class="usearch uinp ub ub-f1" type="text" id="nameOrCode" name = "nameOrCode" placeholder="可按名称或编码查询">
                            <div class="ubtn umar-l20 umar-r10"  onclick="chargeSearch()">查询</div>
                        </div> 
                    </div>
                </form>
        	</div>	
        	<div class="ub uline umar-t8"></div>
        	<div class="ub uw ub-f1" id="zrea">
             <div class="ub  uw uh ub-f1">
                 <table id="chargeSelectList"></table>
             </div>
            </div>
        </div>
</div>