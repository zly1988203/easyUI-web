<!--pos新增-->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/pos/registerAdd.js"></script>
<div class="ub ub-ver ub-pc ub-ac uw uh ub-f1" >
        <div class="ub ub-ver uw uh ub-f1">
            <!-- 新增弹框 -->
            <div class="ub umar-t8">
	             <div class="ub ub-ac umar-t20">
                 <div class="umar-r10 uw-80 ut-r">店铺:</div>
	             <input class="uinp ub ub-f1" type="hidden" id="branchId" name="branchId">
                 <input class="uinp ub ub-f1" type="text" id="branchName" readonly="readonly" name="branchName">
                 <div class="uinp-more" onclick="searchBranch()">...</div>
                </div>
             </div>
            <div class="ub umar-t8">
	             <div class="ub ub-ac umar-t20">
	              <div class="umar-r10 uw-80 ut-r">POS机编号:</div>
	             <input class="uinp deal" type="number" maxlength="2" id="posNo" name="posNo" >
                </div>
             </div>
            <div class="uabtns umar-t20">
                <button class="uabtn umar-r30 umar-l50" onclick="toSave()">保存</button>
                <button class="uabtn" onclick="toClose()" >关闭</button>
            </div>
        </div>
</div>