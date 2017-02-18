/**
 * Created by huangj02 on 2016/8/11.
 */
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
	 $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
	 $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initView();
    initTreeArchives();
    initDatagridArchives();
    changeStatus();
});


//单据状态切换
function changeStatus(){
	$(".radioItem").change(function(){
		goodsSearch();
    });
}

function initView(){
    $('#goodsType').combobox({
        valueField:'id',
        textField:'text',
        data: [{
            id: 'categoryCode',
            text: '类别',
            selected:true,
        },{
            id: 'brandId',
            text: '品牌'
        },{
            id: 'supplierId',
            text: '供应商'
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
        goodsClass.treeParam["level"] = treeNode.level;
        
        //将选中树参数值传入表单
        $("#categoryCode1").val(treeNode.code);
        $("#level").val(treeNode.level);
        $("#brandId1").val('');
        $("#supplierId1").val('');
    }else if(goodsClass.selectTypeName=="brandId"){
        goodsClass.treeParam[goodsClass.selectTypeName] = treeNode.id;
        goodsClass.treeParam["level"] = "";
        
        //将选中树参数值传入表单
        $("#brandId1").val(treeNode.id);
        $("#categoryCode1").val('');
        $("#level").val('');
        $("#supplierId1").val('');
    }else{
    	 goodsClass.treeParam[goodsClass.selectTypeName] = treeNode.id;
         goodsClass.treeParam["level"] = "";
         
         //将选中树参数值传入表单
         $("#supplierId1").val(treeNode.id);
         $("#brandId1").val('');
         $("#categoryCode1").val('');
         $("#level").val('');
    }
    $("#startCount").val('');
	$("#endCount").val('');
    //var formParams = $("#formGoodsArchives").serializeObject();
    gridReload("gridArchives",goodsClass.treeParam,goodsClass.selectTypeName);
};

function gridReload(gridName,httpParams,selectTypeName){
	switch (selectTypeName){ 
		case "categoryCode":  //类别
			httpParams.supplierId = "";
			httpParams.brandId = "";
			break;
		case "brandId":  //品牌
			httpParams.categoryCode = "";
			httpParams.supplierId = "";
			break;
		case "supplierId":  //供应商
			httpParams.categoryCode = "";
			httpParams.brandId = "";
			break;
	}
	$("#"+gridName).datagrid("options").url = contextPath+'/goods/newGoodsApply/queryNewGoodsApply';
    $("#"+gridName).datagrid("options").queryParams = $("#formGoodsArchives").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("load");
}
var gridHandel = new GridClass();
//初始化表格
var dg;
function initDatagridArchives(){
	dg = $("#gridArchives").datagrid({
        //title:'普通表单-用键盘操作',
        align:'center',
        url:'',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        //fitColumns:true,    //每列占满
        //fit:true,            //占满
        pageSize:20,
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
             {field:'check',checkbox:true},
             {field:'id',hidden:true},
             {field:'brandId',title:'品牌Id',hidden:true},
             {field:'brandCode',title:'品牌编码',hidden:true},
             {field:'supplierId',title:'供应商Id',hidden:true},
             {field:'supplierCode',title:'供应商编码',hidden:true},
             {field:'skuCode',title:'货号',width:'120px',align:'left'},
             {field:'skuName',title:'商品名称',width:'200px',align:'left',
             	formatter: function(value,row,index){
                     return "<a href='#' onclick=\"openDialog('"+contextPath+"/goods/newGoodsApply/updateGoodsView?id="+row.id+"','修改新品申请','edit','"+row.id+"')\" class='ualine'>"+value+"</a>";
             	}
              },
             {field:'barCode',title:'条码',width:'120px',align:'left'},
             {field:'branchName',title:'申请机构',width:'120px',align:'left'},
             {field: 'createTime', title: '申请时间', width: 150, align: 'left',formatter : function(createTime){
            	 if(createTime){
            		 var now = new Date(createTime);
            		 var nowStr = now.format("yyyy-MM-dd hh:mm:ss"); 
            		 return nowStr;
            	 }
            	 return null;
             }},
             {field: 'examineTime', title: '审核时间', width: 150, align: 'left',formatter : function(examineTime){
     			if(examineTime){
     				var now = new Date(examineTime);
     				var nowStr = now.format("yyyy-MM-dd hh:mm:ss"); 
     				return nowStr;
     			}
     			return null;
     		  }},
              {field: 'examineStatus', title: '审核状态', width: 150, align: 'center',formatter : function(examineStatus){
            	 if(examineStatus){
            		 return examineStatus.value;
            	 }
     			return null;
     		 }},
            {field:'memoryCode',title:'助记码',width:'80px',align:'left'},
            {field:'categoryId',title:'类别Id',hidden:true},
            {field:'categoryCode',title:'类别编码',hidden:true},
            {field:'categoryName',title:'商品类别',width:'80px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            {field:'brandName',title:'品牌',width:'100px',align:'left'},
            {field:'unit',title:'库存单位',width:'60px',align:'left'},
            {field:'purchaseSpec',title:'采购规格',width:'80px',align:'right',
                formatter:function(value,row,index){
                    return (value||0).toFixed(2);
                }
            },
            {field:'distributionSpec',title:'配送规格',width:'80px',align:'right',
                formatter:function(value,row,index){
                    return (value||0).toFixed(2);
                }
            },
            {field:'vaildity',title:'保质期天数',width:'80px',align:'right'},
            {field:'originPlace',title:'产地',width:'150px',align:'left'},
            {field:'supplierName',title:'主供应商',width:'150px',align:'left'},
            {field: 'saleWay', title: '经营方式', width: '80px', align: 'center',formatter : function(saleWay){
            	if(saleWay=='A'){
            		return '购销'
            	}
            	if(saleWay=='B'){
            		return '代销'
            	}
            	if(saleWay=='C'){
            		return '联营'
            	}
            	if(saleWay=='D'){
            		return '扣率代销'
            	}
    			return null;
    		 }},
    		 
            {field:'supplierRate',title:'联营扣率/代销扣率',width:'100px',align:'right',
                formatter:function(value,row,index){
                    return ((value||0)*100).toFixed(0)+"%";
                }
            },
            {field:'purchasePrice',title:'进货价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    return (value||0).toFixed(4);
                }
            },
            {field:'salePrice',title:'零售价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    return (value||0).toFixed(4);
                }
            },
            {field:'distributionPrice',title:'配送价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    return (value||0).toFixed(4);
                }
            },
            {field:'wholesalePrice',title:'批发价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    return (value||0).toFixed(4);
                }
            },
            {field:'vipPrice',title:'会员价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    return (value||0).toFixed(4);
                }
            },
            {field: 'goodsStatus', title: '商品状态', width: 150, align: 'center',formatter : function(goodsStatus){
            	if(goodsStatus){
            		return goodsStatus.value;
            	}
    			return null;
    		 }},
            
            {field:'pricingType',title:'计价方式',width:'80px',align:'center',
               formatter:function(value,row,index){
                   if(value){
                       return value.value;
                   }
                   return value;
               }
            },
           {field:'inputTax',title:'进项税率',width:'80px',align:'right',
           	 formatter:function(value,row,index){
                    if(row.inputTax){
                        return (value||0).toFixed(2)*100+"%";
                    }
                    return null;
                }
           },
           {field:'outputTax',title:'销项税率',width:'80px',align:'right',
           	formatter:function(value,row,index){
                   if(row.outputTax){
                       return (value||0).toFixed(2)*100+"%";
                   }
                   return null;
               }
           },
           {field:'marginTax',title:'毛利率',width:'80px',align:'right',
               formatter:function(value,row,index){
                   if(row.salePrice&&row.purchasePrice){
                       var vprice = (row.salePrice - row.purchasePrice)/row.salePrice *100
                       return (vprice||0).toFixed(2)+"%";
                   }
                   return "1";
               }
           },
           {field:'remark',title:'备注',width:'200px',align:'left',hidden:true}
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        	priceGrantUtil.grantPrice("gridArchives");
        }
});
}


//选择类型
function goodsSelectType(){
    goodsClass.selectTypeName = $("#goodsType").val();
}

//清除左侧菜单参数
function cleanLeftParam(){
	 $("#brandId1").val('');
     $("#categoryCode1").val('');
     $("#level").val('');
     $("#supplierId1").val('');
}

//搜索
function goodsSearch(){
	//去除左侧选中值
	cleanLeftParam();
	$("#startCount").val('');
	$("#endCount").val('');
	//去除左侧选中样式
	$('.zTreeDemoBackground a').removeClass('curSelectedNode');
    var formParams = $("#formGoodsArchives").serializeObject();
    $("#gridArchives").datagrid('options').url=contextPath+'/newGoodsApply/queryNewGoodsApply';
    gridReload("gridArchives", formParams);
    
}
//新增
function addGoodsView(){
	var param = goodsClass.currSelectTreeParam;
	var categoryCode = param.categoryCode;
	if(categoryCode){
		if(categoryCode.length==6){
			var obj = $.extend({},param);
			if(goodsClass.currSelectTreeParam.categoryId=="0"){
				obj.categoryName="";
			}
			openDialog(contextPath+"/goods/newGoodsApply/addGoodsView","新品申请","add",obj);
		}else{
			var obj = $.extend({},param);
				obj.categoryName="";
			openDialog(contextPath+"/goods/newGoodsApply/addGoodsView","新品申请","add",obj);
		}
	}else{
		var obj = $.extend({},param);
		if(goodsClass.currSelectTreeParam.categoryId=="0"){
			obj.categoryName="";
		}
		openDialog(contextPath+"/goods/newGoodsApply/addGoodsView","新品申请","add",obj);
	}
}

//打开Dialog
var  dalogTemp;
function openDialog(argUrl,argTitle,argType,params) {
    dalogTemp = $('<div/>').dialog({
        href: argUrl,
        width: 940,
        height: 620,
        title: argTitle,
        closable: true,
        resizable: true,
        onClose: function () {
            $(dalogTemp).panel('destroy');
        },
        modal: true,
        onLoad: function () {
            if(argType=='add'){
                initGoodsView(params,"add")
            }else if(argType=="edit"){
                initGoodsEditView(params);
            }else if(argType=="copy"){
                initGoodsView(params,"")
            }
        }
    })
}

function closeDialog(){
    $(dalogTemp).panel('destroy');
}

//复制
function copyGoodsView(){
	if($("#gridArchives").datagrid("getSelections").length <= 0){
        $.messager.alert('提示','请选中一行进行复制新增商品！');
        return false;
    }
	if($("#gridArchives").datagrid("getChecked").length > 1){
		 $.messager.alert('提示','请选中一行进行复制新增商品！');
		return false;
	}
	
	var selectionRow = $("#gridArchives").datagrid("getSelections");
    selectionRow = JSON.stringify(selectionRow);
    openDialog(contextPath+"/goods/newGoodsApply/addGoodsView","新品申请","copy",""+escape(selectionRow)+"");
	setTimeout(function(){
//    		window.location.href = contextPath+"/goods/newGoodsApply/addGoodsView?data="+escape(selectionRow);
	},10);
    
}

//删除
function delGoods(){
	var rows =$("#gridArchives").datagrid("getChecked");
	if($("#gridArchives").datagrid("getChecked").length <= 0){
		 $.messager.alert('提示','请选中一行进行删除！');
		return null;
	}
	 var ids='';
	 var goodsSkuName = '';
	    $.each(rows,function(i,v){
	    	ids+=v.id+",";
	    	if(v.examineStatus.name =='EXAMINE_PASS') {
	  			goodsSkuName += v.skuName+",";
	  		}
	    });
	    if(goodsSkuName){
			goodsSkuName = goodsSkuName.substring(0 , goodsSkuName.length-1);
			$.messager.alert('提示','商品名称:【'+goodsSkuName+'】审核通过,不能删除');
			return 
		}
	$.messager.confirm('提示','是否要删除选中数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/goods/newGoodsApply/delGoods",
		    	type:"POST",
		    	data:{
		    		ids:ids
		    	},
		    	success:function(result){
		    		if(result['code'] == 0){
		    			$("#gridArchives").datagrid('reload');
						$.messager.alert('提示',"删除成功");
		    		}else{
		    			successTip(result['message']);
		    		}
		    	},
		    	error:function(result){
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

//审核
function auditingGoods(){
	var rows =$("#gridArchives").datagrid("getChecked");
	if($("#gridArchives").datagrid("getChecked").length <= 0){
		$.messager.alert('提示','请选中一行进行审核！');
		return null;
	}
	var ids='';
	var goodsSkuName = '';
	$.each(rows,function(i,v){
		ids+=v.id+",";
  		if(v.examineStatus.name =='EXAMINE_PASS') {
  			goodsSkuName += v.skuName+",";
  		}
	});
	if(goodsSkuName){
		goodsSkuName = goodsSkuName.substring(0 , goodsSkuName.length-1);
		$.messager.alert('提示','商品名称:【'+goodsSkuName+'】已审核通过');
		return 
	}
	
	$.messager.confirm('提示','是否确定审核通过选中商品',function(data){
		if(data){
			$.ajax({
				url:contextPath+"/goods/newGoodsApply/auditingGoods",
				type:"POST",
				data:{
					ids:ids
				},
				success:function(result){
					if(result['code'] == 0){
						$("#gridArchives").datagrid('reload');
						$.messager.alert('提示',"审核成功");
					}else{
						successTip(result['message']);
					}
				},
				error:function(result){
					successTip("请求发送失败或服务器处理失败");
				}
			});
		}
	});
}


/**
 * 导出
 */
function exportData(){
	var length = $('#gridArchives').datagrid('getData').rows.length;
	if(length == 0){
		successTip("无数据可导");
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
	$("#formGoodsArchives").form({
		success : function(result){
			var dataObj=eval("("+result+")");
			successTip(dataObj.message);
		}
	});
	$("#formGoodsArchives").attr("action",contextPath+"/goods/newGoodsApply/exportGoods");
	$("#formGoodsArchives").submit();
}

//重置
function resetFrom(){
	$("#searchForm").form('clear');
}

//导入
function toImportproduct(){
    var param = {
        url:contextPath+"/goods/newGoodsApply/importList",
        tempUrl:contextPath+"/goods/newGoodsApply/exportTemp",
        type:1,
    }
    new newGoodsApplyUploadFile(function(data){
    	initDatagridArchives();
        
    },param)
}

//模板导出
function exportTemp(){
	location.href=contextPath+'/goods/newGoodsApply/exportTemp';
}
