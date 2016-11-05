<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/component/publicCategory.js"></script>
<div class="ub ub-ver ub-pc  uw uh ub-f1" >
    <div class="ub uw uh ub-f1 ">
        <div class="ub ub-ver uw uh ub-f1">
              <div class="ub ub-ac uselectws">
                    <div class="umar-r10 uw-70 ut-r">省:</div>
				    <input id="provinceId"  type="text" name="provinceId" class="easyui-combobox uselect" />
              </div>
              <div class="ub ub-ac uselectws">
                    <div class="umar-r10 uw-70 ut-r">市:</div>
				    <input id="cityId"  type="text" name="cityId" class="easyui-combobox uselect" />
              </div>
               <div class="ub ub-ac uselectws">
                    <div class="umar-r10 uw-70 ut-r">县区:</div>
				    <input id="areaId"  type="text" name="areaId" class="easyui-combobox uselect" />
              </div>
        </div>
    </div>
</div>
