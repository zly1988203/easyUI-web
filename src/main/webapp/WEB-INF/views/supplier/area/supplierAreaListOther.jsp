<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>供应商档案列表(机构)</title>
	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script  src="${ctx}/static/js/views/supplier/area/supplierAreaListOther.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
<div class="ub  ub-f1 umar-4 upad-4">
	<div class="ub ub-ver ub-f1 upad-4">
		<div class="ub ub-ac">
			<div class="ubtns">
				<button class="ubtns-item" onclick="toAddView()">新增</button>
				<button class="ubtns-item" onclick="toDel()">删除</button>
				<button class="ubtns-item" onclick="toClose()">退出</button>
			</div>
		</div>
		<form action="" id="formGoodsArchives" method="post">
			<div class="ub umar-t4">
				<div class="ub ub-ac umar-r10">
					<div class="umar-r10  ut-r">关键字:</div>
					<input class="uinp uw-400" type="text" name="goodsInfo" id="goodsInfo" placeholder="输入货号、条码、商品名称进行查询">
				</div>
				<input type="button" class="ubtn  umar-r10" value="查询" onclick="goodsSearch()">
				<div class="ub ub-ac umar-r10">
					<input class="ub" type="checkbox" name="outGoods" /><span>淘汰商品</span>
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