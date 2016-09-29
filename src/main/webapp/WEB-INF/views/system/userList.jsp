<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>用户管理</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/system/userList.js"></script>
    
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
    	<form id="queryForm">
	        <div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="query();">查询</div>
	                <div class="ubtns-item" onclick="toDel('gridOrders');">删除</div>
	                <div class="ubtns-item" onclick="exportData();">导出</div>
	                <div class="ubtns-item" onclick="importData();">导入</div>
	                <div class="ubtns-item">打印</div>
	                <div class="ubtns-item">设置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	            <div class="ub ub-ac umar-l20">
	              	<input class="Wdate"  readonly="readonly" name="startDate" id="startDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:'#F{$dp.$D(\'endDate\');}'})" />&nbsp;至&nbsp;
                    <input class="Wdate"  readonly="readonly" name="endDate" id="endDate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',minDate:'#F{$dp.$D(\'startDate\');}'})" />
	            </div>
	        </div>
	
	        <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">单据编号:</div>
	                <input class="uinp" name="formNo" id="formNo" type="text">
	            </div>
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">供应商:</div>
	                <input class="uinp" name="supplierId" id="supplierId" type="text" >
	                <div class="uinp-more">...</div>
	            </div>
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">操作员:</div>
	                <input class="uinp" name="operateUserId" id="operateUserId" type="text" >
	                <div class="uinp-more">...</div>
	            </div>
	        </div>
        </form>
        
       <form method="post" enctype="multipart/form-data" accept='jxls,jxl' action="${ctx}/system/user/importList"> 
           <div class="uacon new-padding uw-400">选择文件：
	           <input class="uinp new-width" id="filename" type="text" readonly="readonly">
	           <label class="ualable new-right">选择文件<input type="file" class="uafile" name="file" id="xlfile"></label>
	           <input type="submit" class="ubtn" value="上传" />
           </div>
       </form>
        <div class="ub umar-t8 ub-f1">
            <table id="dg"></table>
        </div>

    </div>
</body>
</html>