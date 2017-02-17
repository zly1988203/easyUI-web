<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>新品申请</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
    <script  src="${ctx}/static/js/views/newGoodsApply/newGoodsApply.js"></script>
</head>

<body class="ub uw uh ufs-14 uc-black">
<div class="ub  ub-f1 umar-4 upad-4">
    <!--left-->
    <div class="ub ub-ver ubor">
        <div class="upad-4">
            <select id="goodsType" class="easyui-combobox uselect"></select>
        </div>
        <div class="ubor-b "></div>
        <div class="ub upad-4 ub-f1 uscroll">
            <div class="zTreeDemoBackground left">
                <ul id="treeArchives" class="ztree"></ul>
            </div>
        </div>
    </div><!--left end-->
    <div class="ub ub-ver ub-f1 upad-4">
      <form action="" id="formGoodsArchives" method="post">
        <div class="ub ub-ac">
            <div class="ubtns">
            	<shiro:hasPermission name="JxcGoodsArchive:add">
					<div class="ubtns-item" onclick="addGoodsView()">新增</div>
			   	</shiro:hasPermission>
			   	<shiro:hasPermission name="JxcGoodsArchive:copy">
					<div class="ubtns-item" onclick="copyGoodsView()">复制</div>
			   	</shiro:hasPermission>
			   	
			   	<shiro:hasPermission name="JxcGoodsArchive:copy">
					<div class="ubtns-item" onclick="auditingGoods()">审核</div>
			   	</shiro:hasPermission>
			   	
			   	<shiro:hasPermission name="JxcGoodsArchive:export">
                   <div class="ubtns-item" onclick="toImportproduct()">导入</div>
			   	</shiro:hasPermission>
			   	
			   	<shiro:hasPermission name="JxcGoodsArchive:export">
					<div class="ubtns-item" onclick="exportData()">导出</div>
			   	</shiro:hasPermission>
			   	<shiro:hasPermission name="JxcGoodsArchive:delete">
					<div class="ubtns-item" onclick="delGoods()">删除</div>
			   	</shiro:hasPermission> 
					<div class="ubtns-item" onclick="toClose()">退出</div>
            </div>
	        	 
                <!-- 引入时间选择控件 -->
	            <%@ include file="/WEB-INF/views/component/dateSelectHour.jsp"%> 
        </div>
        
            <div class="ub umar-t4">
                <div class="ub ub-ac umar-r10">
                    <div class="umar-r10  ut-r">关键字:</div>
                    <input type="hidden" name="categoryCode1" id="categoryCode1" value="">
                    <input type="hidden" name="level" id="level" value="">
                    <input type="hidden" name="brandId1" id="brandId1" value="">
                    <input type="hidden" name="supplierId1" id="supplierId1" value="">
                    <input type="hidden" name="startCount" id="startCount" value="">
                    <input type="hidden" name="endCount" id="endCount" value="">
                    <input class="uinp uw-400" type="text" name="goodsNameOrCode" maxlength="50" id="goodsNameOrCode" placeholder="输入货号、条码、商品名称进行查询">
                
                </div>
 				<input type="button" class="ubtn  umar-r10" value="查询" onclick="goodsSearch()">
 				
				<div class="ub ub-ac umar-l10">
					<input class="ub radioItem" type="radio" name="examineStatus" value="0" checked="checked"/><label>未审核商品</label>
				</div>
				<div class="ub ub-ac umar-l10">
					<input class="ub radioItem" type="radio" name="examineStatus" value="1" /><label>已审核商品</label>
				</div>
				<div class="ub ub-ac umar-l10">
					<input class="ub radioItem" type="radio" name="examineStatus" value="2" /><label>审核不通过</label>
				</div>
				<div class="ub ub-ac umar-l10">
					<input class="ub radioItem" type="radio" name="examineStatus" value="" /><label>全部商品</label>
				</div>
            </div>
        </form>

        <div class="ub umar-t10 ub-f1">
            <table id="gridArchives" ></table>
        </div>
    </div>
</div>
</body>
</html>