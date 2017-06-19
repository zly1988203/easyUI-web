<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<div class="ub ub-ver ub-f1 upad-8">
    <div class="ub ub-ver umar-t12">
        <div class="ub">
            <div class="ub ub-ac">
                <div class="umar-r10 ut-r">公式计算范围:</div>
                <div class="ub ub-ac umar-l10">
                    <label><input class="ub" type="radio" name="selectradio" checked="checked" value="all"/><span>所有行</span></label>
                </div>
                <div class="ub ub-ac umar-l10">
                    <label><input class="ub" type="radio" name="selectradio" value="one"/><span>选择行</span></label>
                </div>
            </div>
        </div>
        <div class="ub umar-t8">
            <div class="ub ub-ac">
                <div class="umar-r10 ut-r">计算结果保留小数位数:</div>
                <!--select-->
                <select class="uselect-new uw-50" id="select0">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2" selected="selected">2</option>
                    <option value="3">3</option>
                </select>
            </div>
        </div>
        <div class="ub umar-t8">
            <!--select-->
            <select class="uselect-new uw-100" id="select1"></select>
            <span>=</span>
            <!--select-->
            <select class="uselect-new uw-100" id="select2"></select>
            <!--select-->
            <select class="uselect-new uw50" id="select3">
                <option value="+" selected="selected">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
            <input class="uinp ut-r" type="text" value="0" id="inputPrice" onkeyup="if(this.value==this.value2)return;if(this.value.search(/^\d*(?:\.\d*)?$/)==-1)this.value=(this.value2)?this.value2:'';else this.value2=this.value;" onafterpaste="if(this.value==this.value2)return;if(this.value.search(/^\d*(?:\.\d*)?$/)==-1)this.value=(this.value2)?this.value2:'';else this.value2=this.value;">
        </div>
    </div>
</div>
<script src="${ctx}/static/js/views/goods/branchPriceAdjust/modifyPriceDialog.js?V=${versionNo}"></script>

