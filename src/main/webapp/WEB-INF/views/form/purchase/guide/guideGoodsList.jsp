<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>采购向导——商品清单</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <script src="${ctx}/static/js/views/purchase/guide/guideGoodsList.js?V=${versionNo}"></script>
    
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
	
	<div class="ub ub-ac upad-4">
        <div class="ubtns umar-l20 umar-t10">
        	<div class="ubtns-item" onclick="lastStep()">上一步</div>
        	<shiro:hasPermission name="JxcPurchaseGuide:nextStep">
                <div class="ubtns-item" onclick="nextStep()">下一步</div>
            </shiro:hasPermission>
        </div>
        	<div class="umar-l50 divMsg">
        		
        	</div>
    </div>
    
		<input type="hidden" name="formData" id="formData" value='${formData }' />

		<div class="ub umar-t8 ub-f1">
			<table id="dgGuideGoodsList"></table>
		</div>

	</div>
</body>
</html>