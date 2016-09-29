function initTestMenu(){
    $("#leftMenuContent").html(getMenuOneData());
    $("#left_menu_two").append(getArchiveMenuData());
    $("#left_menu_two").append(getPurchaseMenuData());
    $("#left_menu_two").append(getRetailMenuData());
    $("#left_menu_two").append(getWarehouseMenuData());
    $("#left_menu_two").append(getDeliverMenuData());
    $("#left_menu_two").append(getUserMenuData());
    
    $('.menu-one').bind('mouseenter',function(){
        var one = $(this);
        console.log("widht:"+one.width());//
        var childId = one.attr("childId");
        $("#"+childId).removeClass('uhide').css('top',one.offset().top);
        $("#"+childId).removeClass('uhide').css('left',one.width());
    });
}

function getMenuOneData(){
    var testHtml = "";
    testHtml += "<div class=\"big-menu-switch\"><i class=\"iconfont\"></i></div>";
    testHtml += "<div class=\"menu-box\">";
    testHtml +=		"<ul class=\"menu-trans\">";
    testHtml +=			"<li class='menu-one' childId=\"archiveMenu\"><a href=\"javascript:void(0);\"><i class=\"iconfont\"></i><span>档案</span></a></li>";
    testHtml +=			"<li class='menu-one' childId=\"purchaseMenu\"><a href=\"javascript:void(0);\"><i class=\"iconfont\"></i><span>采购</span></a></li>";
    testHtml +=			"<li class='menu-one' childId=\"retailMenu\"><a href=\"javascript:void(0);\"><i class=\"iconfont\"></i><span>零售</span></a></li>";
    testHtml +=			"<li class='menu-one' childId=\"warehouseMenu\"><a href=\"javascript:void(0);\"><i class=\"iconfont\"></i><span>仓库</span></a></li>";
    testHtml +=			"<li class='menu-one' childId=\"deliverMenu\"><a href=\"javascript:void(0);\"><i class=\"iconfont\"></i><span>配送</span></a></li>";
    testHtml +=			"<li class='menu-one' childId=\"userMenu\"><a href=\"javascript:void(0);\"><i class=\"iconfont\"></i><span>系统</span></a></li>";
	testHtml +=		"</ul>";
    testHtml +=	"</div>";

    return testHtml;
}

function getArchiveMenuData(){
	var testHtml = "";
	testHtml += "<div id='archiveMenu' class=\"uhide menu-two\">";
	
	testHtml += 	"<div class=\"menu-two-item ub ub-ver\" >";
	testHtml +=			"<div class=\"item-title\">基础信息</div>";
	testHtml +=			"<div class=\"item-list ub ub-ver\">";
	testHtml +=				"<ul class=\"menu-two-ul\" >";
	testHtml +=					"<li><a href=\"javascript:openNewTab('商品档案','common/goods/view');\">商品档案</a></li>";
	testHtml +=				"</ul>";
	testHtml +=			"</div>";
	testHtml +=		"</div>";
	
	testHtml += 	"<div class=\"menu-two-item ub ub-ver\" >";
	testHtml +=			"<div class=\"item-title\">商品维护</div>";
	testHtml +=			"<div class=\"item-list ub ub-ver\">";
	testHtml +=				"<ul class=\"menu-two-ul\" >";
	testHtml +=					"<li><a href=\"javascript:openNewTab('调价单','goods/priceAdjust/view');\">调价单</a></li>";
	testHtml +=					"<li><a href=\"javascript:openNewTab('价签打印','print/view');\">价签打印</li>";
	testHtml +=				"</ul>";
	testHtml +=			"</div>";
	testHtml +=		"</div>";
	
	testHtml += 	"<div class=\"menu-two-item ub ub-ver\" >";
	testHtml +=			"<div class=\"item-title\">商品查询</div>";
	testHtml +=			"<div class=\"item-list ub ub-ver\">";
	testHtml +=				"<ul class=\"menu-two-ul\" >";
	testHtml +=					"<li><a href=\"javascript:openNewTab('商品查询','goods/report/view');\">商品查询</li>";
	testHtml +=				"</ul>";
	testHtml +=			"</div>";
	testHtml +=		"</div>";
	
	testHtml +=	"</div>";
	return testHtml;
}

function getPurchaseMenuData(){
	var testHtml = "";
	testHtml += "<div id='purchaseMenu' class=\"uhide menu-two\">";
	
	testHtml += 	"<div class=\"menu-two-item ub ub-ver\" >";
	testHtml +=			"<div class=\"item-title\">单据管理</div>";
	testHtml +=			"<div class=\"item-list ub ub-ver\">";
	testHtml +=				"<ul class=\"menu-two-ul\" >";
	testHtml +=					"<li><a href=\"javascript:openNewTab('采购订单','form/purchase/orderList');\">采购订单</li>";
	testHtml +=					"<li><a href=\"javascript:openNewTab('收货单','form/purchase/receiptList');\">收货单</li>";
	testHtml +=					"<li><a href=\"javascript:openNewTab('退货单','form/purchase/returnList');\">退货单</li>";
	testHtml +=				"</ul>";
	testHtml +=			"</div>";
	testHtml +=		"</div>";
	
	testHtml +=	"</div>";
	return testHtml;
}


function getRetailMenuData(){
	var testHtml = "";
	testHtml += "<div id='retailMenu' class=\"uhide menu-two\">";
	
	testHtml += 	"<div class=\"menu-two-item ub ub-ver\" >";
	testHtml +=			"<div class=\"item-title\">收银对账</div>";
	testHtml +=			"<div class=\"item-list ub ub-ver\">";
	testHtml +=				"<ul class=\"menu-two-ul\" >";
	testHtml +=					"<li><a href=\"javascript:openNewTab('收银日报','cashDaily/report/view');\">收银日报</li>";
	testHtml +=					"<li><a href=\"javascript:openNewTab('收银流水','cashFlow/report/view');\">收银流水</li>";
	testHtml +=					"<li><a href=\"javascript:openNewTab('收银对账','cashCheck/report/view');\">收银对账</li>";
	testHtml +=				"</ul>";
	testHtml +=			"</div>";
	testHtml +=		"</div>";
	
	testHtml += 	"<div class=\"menu-two-item ub ub-ver\" >";
	testHtml +=			"<div class=\"item-title\">销售查询</div>";
	testHtml +=			"<div class=\"item-list ub ub-ver\">";
	testHtml +=				"<ul class=\"menu-two-ul\" >";
	testHtml +=					"<li><a href=\"javascript:openNewTab('销售流水','saleFlow/report/view');\">销售流水</li>";
	testHtml +=				"</ul>";
	testHtml +=			"</div>";
	testHtml +=		"</div>";
	
	testHtml +=	"</div>";
	return testHtml;
}

function getWarehouseMenuData(){
	var testHtml = "";
	testHtml += "<div id='warehouseMenu' class=\"uhide menu-two\">";
	
	testHtml += 	"<div class=\"menu-two-item ub ub-ver\" >";
	testHtml +=			"<div class=\"item-title\">库存查询</div>";
	testHtml +=			"<div class=\"item-list ub ub-ver\">";
	testHtml +=				"<ul class=\"menu-two-ul\" >";
	testHtml +=					"<li><a href=\"javascript:openNewTab('商品库存查询','stock/report/view');\">商品库存查询</li>";
//	testHtml +=					"<li><a href=\"javascript:openNewTab('类别库存汇总','#');\">类别库存汇总</li>";
//	testHtml +=					"<li><a href=\"javascript:openNewTab('商品出入库明细','#');\">商品出入库明细</li>";
	testHtml +=				"</ul>";
	testHtml +=			"</div>";
	testHtml +=		"</div>";
	
	testHtml +=	"</div>";
	return testHtml;
}

function getDeliverMenuData(){
	var testHtml = "";
	testHtml += "<div id='deliverMenu' class=\"uhide menu-two\">";
	
	testHtml += 	"<div class=\"menu-two-item ub ub-ver\" >";
	testHtml +=			"<div class=\"item-title\">配送管理</div>";
	testHtml +=			"<div class=\"item-list ub ub-ver\">";
	testHtml +=				"<ul class=\"menu-two-ul\" >";
	testHtml +=					"<li><a href=\"javascript:openNewTab('配送设置','form/deliverForm/validityDays','icon-hamburg-left');\">配送设置</li>";
	testHtml +=					"<li><a href=\"javascript:openNewTab('返利设置','form/deliverForm/rebate','icon-hamburg-left');\">返利设置</li>";
	testHtml +=					"<li><a href=\"javascript:openNewTab('要货申请','form/deliverForm/viewsDA','icon-hamburg-left');\">要货申请</li>";
	testHtml +=					"<li><a href=\"javascript:openNewTab('配送入库','form/deliverForm/viewsDI','icon-hamburg-left');\">配送入库</li>";
	testHtml +=					"<li><a href=\"javascript:openNewTab('配送出库','form/deliverForm/viewsDO','icon-hamburg-left');\">配送出库</li>";
	testHtml +=				"</ul>";
	testHtml +=			"</div>";
	testHtml +=		"</div>";
	
	testHtml +=	"</div>";
	return testHtml;
}

function getUserMenuData(){
	var testHtml = "";
	testHtml += "<div id='userMenu' class=\"uhide menu-two\">";
	
	testHtml += 	"<div class=\"menu-two-item ub ub-ver\" >";
	testHtml +=			"<div class=\"item-title\">用户管理</div>";
	testHtml +=			"<div class=\"item-list ub ub-ver\">";
	testHtml +=				"<ul class=\"menu-two-ul\" >";
//	testHtml +=					"<li><a href=\"javascript:openNewTab('用户管理','system/user');\">用户管理</li>";
	testHtml +=					"<li><a href=\"javascript:openNewTab('修改密码','system/toUpdatePwd');\">修改密码</li>";
	testHtml +=				"</ul>";
	testHtml +=			"</div>";
	testHtml +=		"</div>";
	
	testHtml +=	"</div>";
	return testHtml;
}