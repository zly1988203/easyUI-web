/**
 * Created by huangj02 on 2016/10/12.
 */

var gridHandel = new GridClass();

$(function(){
    initTreeArchives();
    initDatagridsupplierList();
});
/**
 * 初始树
 */
function initTreeArchives(){
    var args = {};
    var httpUrl = contextPath+"/supplierBranchGoods/getBranchSupplierToTree";
    $.get(httpUrl, args,function(data){
        var setting = {
            data: {
                key:{
                    name:'codeText',
                },
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPId: 0
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
    if(treeNode.type=="branch"){//选择机构
    	$("#supplierId").val('');
    }else if(treeNode.type=="supplier"){//供应商
    	if(treeNode.id){
	    	sourceBranchId = $("#branchId").val();
    		if(sourceBranchId){
    			$("#supplierId").val(treeNode.id);
    			searchHandel();
    		}
    	}
    }
}

var gridHandel = new GridClass();
console.log(gridHandel);
function initDatagridsupplierList(){
    gridHandel.setGridName("gridSupplierArchiveList");
    gridHandel.initKey({
        firstName:'skuCode',
        enterName:'skuCode',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("skuCode");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('skuCode'));
                },100)
            }else{
               selectGoods(arg);
            }
        },
    })
    
    $("#gridSupplierArchiveList").datagrid({
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'ck',checkbox:true},
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str = '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                    '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
                    return str;
                },
            },
            {field:'skuId',title:'ID',width: '0px;',align:'left',hidden:true},
            {field:'skuCode',title:'货号',width: '100px',align:'left',editor:'textbox'},
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'barCode',title:'商品条码',width:'200px',align:'left'},
            {field:'categoryName',title:'商品类别',width:'200px',align:'left'},
            {field:'spec',title:'规格',width:'200px',align:'left'},
            {field:'unit',title:'单位',width:'100px',align:'left'},
            {field:'purchasePrice',title:'最新进价',width:'100px',align:'left'},
            {field:'purchasePrice',title:'最低进价',width:'100px',align:'left'},
            {field:'purchasePrice',title:'最高进价',width:'100px',align:'left'}
        ]],
        onClickCell:function(rowIndex,field,value){
            gridHandel.setBeginRow(rowIndex);
            gridHandel.setSelectFieldName(field);
            var target = gridHandel.getFieldTarget(field);
            if(target){
                gridHandel.setFieldFocus(target);
            }else{
                gridHandel.setSelectFieldName("skuCode");
            }
        },
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)]);
}

/**
 * 搜索
 */
function searchHandel(){
    var fromObjStr = $('#formList').serializeObject();
	$("#gridSupplierArchiveList").datagrid("options").method = "post";
    $("#gridSupplierArchiveList").datagrid("options").url =contextPath+'/supplierBranchGoods/findSupplierBranchGoods',
    $("#gridSupplierArchiveList").datagrid('load', fromObjStr);
}

//插入一行
function addLineHandel(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    gridHandel.addRow(index,gridDefault);
}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridHandel.delRow(index);
}


//选择商品
function selectGoods(key){
    new publicGoodsSkuService(function(data){
        if(data.length==0){
            return;
        }
        for(var i in data){
        	var rec = data[i];
        	rec.remark = "";
        }
        var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
        var addDefaultData  = gridHandel.addDefault(data,gridDefault);
        var keyNames = {
            purchasePrice:'price',
            id:'skuId',
            disabled:'',
            pricingType:'',
            inputTax:'tax'
        };
        var rows = gFunUpdateKey(addDefaultData,keyNames);
        var argWhere ={skuCode:1};  //验证重复性
        var isCheck ={isGift:1 };   //只要是赠品就可以重复
        var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);

        $("#gridSupplierArchiveList").datagrid("loadData",newRows);
        gridHandel.setLoadFocus();
    },0,key);
}


/**
 * 查询机构
 */
function selectBranches(){
	new publicAgencyService(function(data){
        if($("#branchId").val()!=data.branchesId){
            $("#branchId").val(data.branchesId);
            $("#branchName").val(data.branchName);
        }
	},'','');
}

function importShow(type){
	$('#excelFile').val("");
	$('#filename').val("");
	$('.uatk').show();
	$("#uploadFormType").val(type);
	if(type==0){
		$("#temple").text("货号模板下载");
	}else{
		$("#temple").text("条码模板下载");
	}
}

//模板导出
function exportTemp(){
	var type = $("#temple").val();
	if(type==0){
		location.href=contextPath+'/form/purchase/exportTemp?type=2';
	}else if(type==1){
		location.href=contextPath+'/form/purchase/exportTemp?type=3';
	}
}

$(document).on('change','#excelFile', function(){
	var value=$(this).val();
	$('#filename').val(value);
});

//导入
function importListHandel(){
	var branchId = $("#branchId").val();
	if(!branchId){
		messager("请先选择机构");
		return;
	}
	$("#uploadForm").attr("action",contextPath+"/supplierBranchGoods/importListEnable");
	gFunStartLoading();
	$("#uploadForm").form({
		onSubmit : function(){
			return true;
		},
		success : function(data){
			console.log(data);
			gFunEndLoading();
			importClose();
			var rows = JSON.parse(data);
			$("#gridSupplierArchiveList").datagrid("loadData",rows);
			messager("导入成功");

		},
		error:function(e){
			gFunEndLoading();
			messager("导入失败");
		}
	});
}

//关闭导入
function importClose(){
	$('#excelFile').val("");
	$('#filename').val("");
	$('.uatk').hide();
}

/**
 * 导出
 */
function exportHandel(){
	var isValid = $("#formList").form('validate');
	if(!isValid){
		return;
	}
	var length = $("#gridSupplierArchiveList").datagrid('getData').total;
	if(length == 0){
		$.messager.alert("提示","无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#formList").form({
		success : function(data){
			if(data==null){
				$.messager.alert('提示',"导出数据成功！");
			}else{
				$.messager.alert('提示',JSON.parse(data).message);
			}
		}
	});
	$("#formList").attr("action",contextPath+"/supplier/exportHandel");
	$("#formList").submit();
}

/**
 * 删除
 */
function delHandel(){
	var rowData = $("#gridSupplierArchiveList").datagrid("getSelected"); 
    if(rowIsNull(rowData)){
    	return;
    }
    
    var supplierId=rowData.id
    parent.$.messager.confirm('提示', '是否确认删除？此操作删除不可恢复', function(data){
    	if(!data){
    		return;
    	}
    	$.ajax({
            url:contextPath+"/supplier/deleteSupplier",
            type:"POST",
            data:{"supplierId":supplierId},
            dataType:"json",  
            success:function(result){
                if(result){
                    successTip(result.message, $("#gridSupplierArchiveList"));
                }
            },
            error:function(result){
                successTip("请求发送失败或服务器处理失败");
            }
        });
    });
}
//保存
function saveItemHandel(){
    $("#gridSupplierArchiveList").datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = gridHandel.getRows();
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
    var supplierId = $("#supplierId").val();
    if(!supplierId){
    	messager("供应商不能为空");
        return;
    }
    var branchId = $("#branchId").val();
    if(!branchId){
    	messager("机构不能为空");
    	return;
    }
    
    var isCheckResult = true;
    var isChcekPrice = false;
    
    var skuIds=[];
    $.each(rows,function(i,v){
        v["rowNo"] = i+1;
        skuIds.push(v["skuId"]);
        if(!v["skuName"]){
            messager("第"+(i+1)+"行，货号不正确");
            isCheckResult = false;
            return false;
        };
    });
    if(isCheckResult){
       saveDataHandel(skuIds);
    }
}


function saveDataHandel(skuIds){
    //供应商
    var supplierId = $("#supplierId").val();
    //收货机构
    var branchId = $("#branchId").val();

    var reqObj = {
    	branchId:branchId,
        supplierId:supplierId,
        skuIds:skuIds
    };
    var req = JSON.stringify(reqObj);
    $.ajax({
        url:contextPath+"/supplierBranchGoods/saveSupplierBranchGoods",
        type:"POST",
        contentType:'application/json',
        data:req,
        success:function(result){
            if(result['code'] == 0){
                $.messager.alert("操作提示", "操作成功!");
                dg.datagrid('reload');
            }else{
                successTip(result['message']);
            }
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
}

function orderDelete(){
	var dg = $("#gridSupplierArchiveList");
	var rows =dg.datagrid("getChecked");
	if(rowIsNull(rows)){
		return null;
	}
	 var skuIds=[];
	    $.each(rows,function(i,v){
	        skuIds.push(v.skuId);
	    });
	$.messager.confirm('提示','是否要删除此条数据',function(data){
		if(data){
		    var supplierId = $("#supplierId").val();
		    var branchId = $("#branchId").val();
		    var reqObj = {
		    	branchId:branchId,
		        supplierId:supplierId,
		        skuIds:skuIds
		    };
		    var req = JSON.stringify(reqObj);
		    $.ajax({
		        url:contextPath+"/supplierBranchGoods/delete",
		        type:"POST",
		        contentType:'application/json',
		        data:req,
		        success:function(result){
		            if(result['code'] == 0){
		                $.messager.alert("操作提示", "操作成功!");
		                dg.datagrid('reload');
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
