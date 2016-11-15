<!--导入货号或条码-->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/component/publicUploadFile.js"></script>
<div class="ub ub-ver ub-pc ub-ac uw uh ub-f1" >
        <div class="ub ub-ver uw uh ub-f1">
            <!-- 导入弹框 -->
            <div class="ubtn uw-100 umar-10" onclick="downExportFile()" id="temple">导入模版下载</div>
            <div class="uacon">
                <input  id="filelink" class="uinp ub"  type="text" readonly="readonly">
                <label class="ualable">选择文件<input id="file" name="file" type="file" class="uafile" value=""  onchange="fileUrlChange(event)" readonly="readonly" /></label>
            </div>
            <div class="uabtns ">
                <button class="uabtn umar-r30" onclick="toUploadHandel()">导入</button>
                <button class="uabtn" onclick="toCancel()" >取消</button>
            </div>
            <div id="message" class="ub umar-10 ufs-14"></div>
            <div id="errorUrl" class="ub umar-10 ufs-14"></div>
        </div>
</div>

