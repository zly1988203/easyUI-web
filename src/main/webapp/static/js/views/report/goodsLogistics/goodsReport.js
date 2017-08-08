/**
 * Created by huangj02 on 2016/8/9.
 */

//html5 localStorage 存值永久有效
window.localStorageUtil = {
   setLocalStorageItem:function(localName,localObj){ //设置存储数据，传入key和value；key是任意的字符串，value是一个object
      localStorage.setItem(localName,JSON.stringify(localObj));
   },
   getLocalStorageItem:function(localName){ //获取存储数据，传入之前设置的key
      var data = JSON.parse(localStorage.getItem(localName));
      return data;
   },
   delLocalStorageItem:function(localName){ //删除存储数据，传入之前设置的key
	   localStorage.removeItem(localName);
   },
   clearStorageItem:function(){ //清空所有存储数据
      localStorage.clear()
   }
}

function goodsArchives(){
    this.selectTypeName = "categoryCode"
    //tree的提交参数
    this.treeParam = {
        categoryCode:'',
        supplierId:'',
        brandId:'',
        level:'',
    }
    //获取当前选中的树相关参数
    this.currSelectTreeParam = {
		categoryId:'',
		categoryCode:'',
		categoryName:''
    }
    //树的请求地址
    this.treeUrls = [
        {
            name:'categoryCode',
            url:contextPath+'/common/category/getGoodsCategoryToTree'
        },
        {
            name:'brandId',
            url:contextPath+'/common/brand/getBrandToTree'
        },
        {
            name:'supplierId',
            url:contextPath+'/common/supplier/getSupplierToTree'
        }
   ];
    this.getTreeUrl = function(name){
        var httpUrl = ""
        $.each(this.treeUrls,function(i,v){
            if(v.name==name){
                httpUrl = v.url;
                return false
            }
        });
        return httpUrl
    }
}
var goodsClass = new goodsArchives();

$(function(){
	initView();
	initTreeArchives();
	initDatagridOrders();
	//清楚缓存
	localStorageUtil.clearStorageItem();
});


function initView(){
    $('#goodsType').combobox({
        valueField:'id',
        textField:'text',
        data: [{
            id: 'categoryCode',
            text: '类别',
            selected:true,
        }],
        onSelect: function(record){
            goodsClass.selectTypeName = record.id;
            initTreeArchives();
        },
    });
}

//初始树
function initTreeArchives(){
    var args = { }
    var httpUrl = goodsClass.getTreeUrl(goodsClass.selectTypeName);
    $.get(httpUrl, args,function(data){
        var setting = {
            data: {
                key:{
                    name:'codeText',
                }
            },
            callback: {
                onClick: zTreeOnClick
            }
        };
        $.fn.zTree.init($("#treeArchives"), setting, JSON.parse(data));
        var treeObj = $.fn.zTree.getZTreeObj("treeArchives");
        var nodes = treeObj.getNodes();
        if (nodes.length>0) {
            treeObj.expandNode(nodes[0], true, false, true);
        }
    });
}
//选择树节点
function zTreeOnClick(event, treeId, treeNode) {
    if(goodsClass.selectTypeName=="categoryCode"){
    	//获取当前选中的”类别“相关参数
    	goodsClass.currSelectTreeParam = {
    		categoryId:treeNode.id,
    		categoryCode:treeNode.code,
    		categoryName:treeNode.text
        }
        goodsClass.treeParam[goodsClass.selectTypeName] = treeNode.code;
        //将选中树参数值传入表单
        $("#categoryCode").val(treeNode.code);
        $("#brandId").val('');
        $("#supplierId").val('');
        $("#startCount").val('');
    	$("#endCount").val('');
    }
    gridReload("goodsTab",goodsClass.treeParam,goodsClass.selectTypeName);
};

function gridReload(gridName,httpParams,selectTypeName){
	switch (selectTypeName){ 
		case "categoryCode":  //类别
			httpParams.supplierId = "";
			httpParams.brandId = "";
			break;
	}
	//将左侧查询条件设置缓存中
	setLocalStorage();
	$("#"+gridName).datagrid("options").url = contextPath+'/goodsLogistics/report/getList';
	$("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("load");
}


//初始化表格
var dg;
var gridName = "goodsTab";
function initDatagridOrders(){
	dg=$("#goodsTab").datagrid({
		//title:'普通表单-用键盘操作',
		align:'center',
		method: 'post',
		//url: contextPath+"/goodsLogistics/report/getList",
		singleSelect:true,  //单选  false多选
		rownumbers:true,    //序号
		pagination:true,    //分页
		showFooter:true,
		pageSize:20,
		height:'100%',
		columns:[[  
					{field:'id',title:'商品id',hidden:true},
					{field:'skuCode',title:'商品代号',width:120,align:'left'},
					{field:'skuName',title:'商品名称',tooltip:true,width:180},
					{field:"barCode",title:"商品条码",tooltip:true,width:120},
					{field:"boxBarCode",title:"箱条码",tooltip:true,width:120},
					{field:"categoryCode",title:"商品类别编号",tooltip:true,width:80},
					{field:"costPrice",title:"商品成本价",tooltip:true,width:80,align:'right',
						formatter : function(value,row,index){
							if(value){
								return parseFloat(value).toFixed(2);
							}
							return parseFloat(0.0000).toFixed(2);
						}
					},
					{field:"distributionPrice",title:"商品零售价",tooltip:true,width:80,align:'right',
						formatter : function(value,row,index){
							if(value){
								return parseFloat(value).toFixed(2);
							}
							return parseFloat(0.0000).toFixed(2);
						}
					},
					{field:"purchasePrice",title:"商品进价",tooltip:true,width:80,align:'right',
						formatter : function(value,row,index){
							if(value){
								return parseFloat(value).toFixed(2);
							}
							return parseFloat(0.0000).toFixed(2);
						}
					},
					{field:"vaildity",title:"保质期天数",tooltip:true,width:80,align:'right'},
					{field:"spec",title:"规格",tooltip:true,width:80},
					{field:"bigUnit",title:"商品大单位",tooltip:true,width:80},
					{field:"smallUnit",title:"商品小单位",tooltip:true,width:80},
					{field:"stockUnit",title:"商品库存单位",tooltip:true,width:80},
					{field:"purchaseSpec",title:"大小转换率",tooltip:true,width:80,align:'right',
						formatter : function(value,row,index){
						  if(value){
							  return parseInt(value);
						  }
						  return null;
						}
					},
					{field:"stockSpec",title:"库存转换率",sortable:true,tooltip:true,width:80,align:'right',
						formatter : function(value,row,index){
							if(value){
								return parseInt(value);
							}
							return null;
						}
					}
					]] ,
					toolBar : "#tg_tb",
					enableHeaderClickMenu: false,
					enableHeaderContextMenu: false,
					enableRowContextMenu: false

	});
    var param = {
        wholesalePrice:["wholesalePrice"],
        purchasePrice:["purchasePrice","inputTax"],
        distributionPrice:["distributionPrice"],
        costPrice:["costPrice","profitAmtRate"],
        vipPrice:["vipPrice"],
        salePrice:["salePrice"],
    }
    priceGrantUtil.grantPrice(gridName,param);
}

/**
 * 供应商选择
 */
function searchSupplier(){
	new publicSupplierService(function(data){
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
		$("#supplierId").val(data.id);
	});
}

/**
 * 品牌选择
 */
function searchBind(){
	new publicBrandService(function(data){
		$("#brandName").val("["+data.brandCode+"]"+data.brandName);
		$("#brandId").val(data.id);
	});
}

/**
 * 机构列表下拉选
 */
function searchBranch (){
	new publicAgencyService(function(data){
	$("#branchName").val(data.branchName);
	$("#branchId").val(data.branchesId);
	},"","");
}

/**
 * 商品货号
 */
function selectSkuCode(){
    var param = {
        type:'',
        key:'',
        isRadio:1,
        sourceBranchId:"",
        targetBranchId:"",
        branchId:'',
        supplierId:'',
        flag:'0',
    }

	new publicGoodsServiceTem(param,function(data){
		$("#skuCode").val(data[0].skuCode);
	});

}
/**
 * 导出
 */
function exportData(){
	var length = $('#goodsTab').datagrid('getData').rows.length;
	if(length == 0){
		$_jxc.alert("无数据可导");
		return;
	}
	$('#exportWin').window({
		top:($(window).height()-300) * 0.5,   
	    left:($(window).width()-500) * 0.5
	});
	$("#exportWin").show();
	$("#totalRows").html(dg.datagrid('getData').total);
	$("#exportWin").window("open");
}

function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");

	//获取左侧缓存查询数据
	var obj = localStorageUtil.getLocalStorageItem("storge");
	$("#categoryCode").val(obj.categoryCode);
	
	//导出记录上一次查询条件
	$("#queryForm").attr("action",contextPath+"/goodsLogistics/report/exportList");
	$("#queryForm").submit(); 
}


//搜索导出清除左侧条件
function cleanLeftParam(){
	$("#categoryCode").val('');
}

//将左侧查询条件设置缓存中
function setLocalStorage(){
	var categoryCode = $("#categoryCode").val();
	var obj={"categoryCode":categoryCode}
	localStorageUtil.setLocalStorageItem("storge",obj);
}

//查询
function query(){
	//搜索导出清除左侧条件
	cleanLeftParam();
	$("#startCount").val('');
	$("#endCount").val('');
	
	//将左侧查询条件设置缓存中
	setLocalStorage();
	
	//去除左侧选中样式
	$('.zTreeDemoBackground a').removeClass('curSelectedNode');
	
	$("#goodsTab").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#goodsTab").datagrid("options").method = "post";
	$("#goodsTab").datagrid("options").url = contextPath+"/goodsLogistics/report/getList";
	$("#goodsTab").datagrid("load");
}
//重置
function resetFrom(){
	$("#queryForm").form('clear');
}

//对话框
var dialogTemp;
var dialogHeight = 670;//$(window).height()*(4/5);
var dialogWidth = 950;//$(window).width()*(5/9);
//打开对话框
function openDialog(argUrl, argTitle, skuId,branchId) {
	dialogTemp = $('<div/>').dialog({
		href : argUrl,
		width : dialogWidth,
		height : dialogHeight,
		title : argTitle,
		closable : true,
		resizable : true,
		onClose : function() {
			$(dialogTemp).panel('destroy');
		},
		modal : true,
		onLoad : function() {
			initGoodsInfo(skuId,branchId);
		}
	})
}
//关闭对话框
function closeDialog() {
	$(dialogTemp).panel('destroy');
}


//回车或失去焦点后，查询品牌
function brandAutoComple(){
	//非回车事件和失去焦点，不做处理(失焦时event.keyCode为undefined)
	if(event.keyCode && event.keyCode != 13){
		return;
	}
	var brandCodeOrName = $("#brandName").val();
	//未输入值时，直接返回，无需查询
	if("" == brandCodeOrName){
		$("#brandId").val("");
		return;
	}
	//避免用户直接输入完整格式: [编号]名称
	var reg = /\[\d{4}\]/;
	if(reg.test(brandCodeOrName)){
		//取出[]里的编号，默认取已第一个[]里的值
		reg = /\[(\d{4})\]/;
		arr = reg.exec(brandCodeOrName);
		brandCodeOrName = arr[1];
	}
	//请求数据
	var httpUrl = contextPath + "/common/brand/getComponentList";
	var args = {"brandCodeOrName" : brandCodeOrName};
	$.post(httpUrl, args,function(data){
		if(null != data && data.rows.length == 1){
			var brandId = data.rows[0].id;
			var brandName = data.rows[0].brandName;
			var brandCode = data.rows[0].brandCode;
			//完善文本显示
			$("#brandName").val("["+brandCode+"]"+brandName);
			//记录ID值,用于后台查询
			$("#brandId").val(brandId);
		} else {
			//未查询到数据或多条数据，设置无效ID
			$("#brandId").val("ABCDEFG");
		}
	});
}

//回车或失去焦点后，查询供应商
function supplierAutoComple(){
	//非回车事件和失去焦点，不做处理(失焦时event.keyCode为undefined)
	if(event.keyCode && event.keyCode != 13){
		return;
	}
	var supplierNameOrsupplierCode = $("#supplierName").val();
	var branchId=$("#branchId").val();
	//未输入值时，直接返回，无需查询
	if("" == supplierNameOrsupplierCode){
		$("#supplierId").val("");
		return;
	}
	//避免用户直接输入完整格式: [编号]名称
	var reg = /\[\d{6}\]/;
	if(reg.test(supplierNameOrsupplierCode)){
		//取出[]里的编号，默认取已第一个[]里的值
		reg = /\[(\d{6})\]/;
		arr = reg.exec(supplierNameOrsupplierCode);
		supplierNameOrsupplierCode = arr[1];
	}
	//请求数据
	var httpUrl = contextPath + "/common/supplier/getComponentList";
	var args = {"supplierNameOrsupplierCode" : supplierNameOrsupplierCode,"branchId" : branchId};
	$.post(httpUrl, args,function(data){
		if(null != data && data.rows.length == 1){
			var supplierId = data.rows[0].id;
			var supplierName = data.rows[0].supplierName;
			var supplierCode = data.rows[0].supplierCode;
			//完善文本显示
			$("#supplierName").val("["+supplierCode+"]"+supplierName);
			//记录ID值,用于后台查询
			$("#supplierId").val(supplierId);
		} else {
			//未查询到数据或多条数据，设置无效ID
			$("#supplierId").val("ABCDEFG");
		}
	});
}
