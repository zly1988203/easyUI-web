/**
 * Created by wxl on 2016/10/12.
 * 成本调整单-新增
 */
$(function(){
	$("#createTime").html(new Date().format('yyyy-MM-dd'));
    initDatagridAddRequireOrder();
});
var gridDefault = {
    //actual:0,
    largeNum:0,
    isGift:0,
}
var gridHandel = new GridClass();
function initDatagridAddRequireOrder(){
    gridHandel.setGridName("gridEditOrder");
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
    $("#gridEditOrder").datagrid({
        //title:'普通表单-用键盘操作',
//        method:'get',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        //pagination:true,    //分页
        //fitColumns:true,    //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'ck',checkbox:true},
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str = "";
                    if(row.isFooter){
                        str ='<div class="ub ub-pc">合计</div> '
                    }else{
                        str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                            '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
                    }
                    return str;
                },
            },
            {field:'skuCode',title:'货号',width:'70px',align:'left',editor:'textbox'},
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'barCode',title:'国际条码',width:'150px',align:'left'},
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            {field:'oldCostPrice',title:'旧价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                    	disabled:true,
                        min:0,
                        precision:2,
                     
                    }
                },
            },
            {field:'costPrice',title:'新价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                    	//disabled:true,
                        min:0,
                        precision:4,
                        onChange: onChangeCostPrice,
                       
                    }
                },
            },
            {field:'actual',title:'当前库存',width:'80px',align:'right',
            	formatter:function(value,row){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value||value==""||parseFloat(value)==0.0){
                    	row["actual"] = row["dealNum"];
                  	  value = row["actual"];
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    value:'0',
                    options:{
                    	disabled:true,
                        min:0,
                        precision:4,
                        
                    }
                },
            },
            {field:'diffMoney',title:'调价差额',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                    	disabled:true,
                        precision:2,
                    }
                },

            },
            {field: 'adjustReason', title: '调整原因', width: '200px', align: 'left',editor:'textbox'},
            {field:'remark',title:'备注',width:'200px',align:'left',editor:'textbox'}
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
        onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
            updateFooter();
        }

    });

    gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
        $.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault),
        $.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault)]);
}

//监听新价
function onChangeCostPrice(newV,oldV) {
	//获取差额
	var actual = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'actual')||0;
	var oldCostPrice = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'oldCostPrice')||0;
	var CostPrice = newV;
	gridHandel.setFieldValue('diffMoney',(parseFloat(actual)*(parseFloat(newV)-parseFloat(oldCostPrice)).toFixed(2)));
	updateFooter();
}

//合计
function updateFooter(){
    var fields = {actual:0,diffMoney:0,isGift:0, };
    var argWhere = {name:'isGift',value:0}
    gridHandel.updateFooter(fields,argWhere);
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
function selectGoods(searchKey){
	var branchId = $("#branchId").val();
	//判定发货分店是否存在
	if(branchId==""){
		messager("请先选择机构名称");
		return;
	}
    new publicGoodsService("",function(data){
        if(searchKey){
            $("#gridEditOrder").datagrid("deleteRow", gridHandel.getSelectRowIndex());
            $("#gridEditOrder").datagrid("acceptChanges");
        }
        selectStockAndPrice(branchId,data);
  
    },searchKey,0,'','',branchId);
}
//查询价格、库存
function selectStockAndPrice(branchId,data){
	var GoodsStockVo = {
			branchId : branchId,
			fieldName : 'id',
			goodsSkuVo : [],
		}; 
	$.each(data,function(i,val){
		var temp = {
				id : val.skuId
		};
		GoodsStockVo.goodsSkuVo[i] = temp;
		
	});
	$.ajax({
    	url : contextPath+"/goods/goodsSelect/selectStockAndPriceToDo",
    	type : "POST",
    	data : {
    		goodsStockVo : JSON.stringify(GoodsStockVo)
    	},
    	success:function(result){
    		setDataValue(result);
    	},
    	error:function(result){
    		successTip("请求发送失败或服务器处理失败");
    	}
    });
}
//二次查询设置值
function setDataValue(data) {
	for(var i in data){
    	var rec = data[i];
    	rec.remark = "";
    }
    var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
    var addDefaultData  = gridHandel.addDefault(data,gridDefault);
    var keyNames = {
		distributionPrice:'price',
        id:'skuId',
        disabled:'',
        io:'',
        inputTax:'tax',
        costPrice:'oldCostPrice'
    };
    var rows = gFunUpdateKey(addDefaultData,keyNames);
    var argWhere ={skuCode:1};  //验证重复性
    var isCheck ={isGift:1 };   //只要是赠品就可以重复
    var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
    $("#gridEditOrder").datagrid("loadData",newRows);
    setTimeout(function(){
        gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
        gridHandel.setSelectFieldName("largeNum");
        gridHandel.setFieldFocus(gridHandel.getFieldTarget('largeNum'));
    },100)
}

//保存
function addsaveOrder(){
    $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = gridHandel.getRows();
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
    var isCheckResult = true;
    var isChcekPrice = false;
    $.each(rows,function(i,v){
        if(!v["skuCode"]){
            messager("第"+(i+1)+"行，货号不能为空");
            isCheckResult = false;
            return false;
        };
        if(!v["skuName"]){
            messager("第"+(i+1)+"行，名称不能为空");
            isCheckResult = false;
            return false;
        };
        if(parseFloat(v["costPrice"])<=0){
            isChcekPrice = true;
        }
    });
    if(isCheckResult){
        if(isChcekPrice){
            $.messager.confirm('系统提示',"新单价存在为0，是否确定保存",function(r){
                if (r){
                    saveDataHandel(rows);
                }
            });
        }else{
            saveDataHandel(rows);
        }
    }
}

function saveDataHandel(rows){
    //调价差价
    var totlediffMoney=0;
    // 机构id
    var branchId = $("#branchId").val();
    //reason 原因
    var adjustReason=$("#adjustReason").combobox('getValue');
    // 备注
    var remark = $("#remark").val();
    //验证表格数据
    var footerRows = $("#gridEditOrder").datagrid("getFooterRows");
    if(footerRows){
        totlediffMoney = parseFloat(footerRows[0]["diffMoney"]||0.0).toFixed(4);
    }

    var saveData = JSON.stringify(rows);
    var jsonData = {
        stockCostFormDetailList:[],
        stockCostForm:{
            branchId:branchId,
            adjustReason:adjustReason,
            remark:remark,

        }
    };
    $.each(rows,function(i,data){
        var temp = {
            actual: data.actual,
            costPrice:data.costPrice,
            diffMoney:data.diffMoney,
            remark : data.remark,
            skuCode : data.skuCode,
            skuId:data.skuId,
            adjustReason:data.adjustReason
        }
        jsonData.stockCostFormDetailList[i] = temp;
    });

    $.ajax({
        url:contextPath+"/cost/costAdjust/addCostForm",
        type:"POST",
        data:{"jsonData":JSON.stringify(jsonData)},
        success:function(result){
            if(result['code'] == 0){
                console.log(result);
                $.messager.alert("操作提示", "操作成功！", "info",function(){
                    location.href = contextPath +"/cost/costAdjust/edit?id="+result.id+"&type=add"
                });
            }else{
                successTip(result['message']);
            }
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
}

/**
 * 返回库存调整
 */
function toBack(){
	location.href = contextPath+"/cost/costAdjust/view";
}

/**
 * 机构名称
 */

function searchBranch (){
	new publicAgencyService(function(data){
	$("#branchId").val(data.branchesId);
	$("#branchName").val(data.branchName);
	});
}

//导入
function toImportproduct(type){
    var branchId = $("#branchId").val();
    if(!branchId){
        messager("请先选择收货机构");
        return;
    }
    var param = {
        url:contextPath+"/cost/costAdjust/importList",
        tempUrl:contextPath+"/cost/costAdjust/exportTemp",
        type:type,
        branchId:branchId,
    }
    new publicUploadFileService(function(data){
        updateListData(data);
        
    },param)
}
function updateListData(data){
	   /* var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
	    var addDefaultData  = gridHandel.addDefault(data,gridDefault);*/

	    var keyNames = {
	        id:'skuId',
	        costPrice:"oldCostPrice",
	        newCostPrice:"costPrice"
	    };
	    var rows = gFunUpdateKey(data,keyNames);
	    var argWhere ={skuCode:1};  //验证重复性
	    var isCheck ={isGift:1 };   //只要是赠品就可以重复
	    var newRows = gridHandel.checkDatagrid(data,rows,argWhere,isCheck);

	    $("#gridEditOrder").datagrid("loadData",data);
	}


//模板导出
function exportTemp(){
	var type = $("#temple").attr("value");
	//导入货号
	if(type==0){
		location.href=contextPath+'/cost/costAdjus/exportTemp?type='+type;
	//导入条码
	}else if(type==1){
		location.href=contextPath+'/cost/costAdjus/exportTemp?type='+type;
	}
}

/**
 * 导出
 */
function exportExcel(){
	$("#queryForm").form({
		success : function(data){
			if(data.code > 0){
				$.messager.alert('提示',data.message);
			}
		}
	});

	var isValid = $("#queryForm").form('validate');
	if(!isValid){
		return;
	}

	var length = $("#goodsTab").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+"/goods/report/exportList");
	$("#queryForm").submit(); 

}