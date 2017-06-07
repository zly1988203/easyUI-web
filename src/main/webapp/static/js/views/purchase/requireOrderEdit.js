/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单-编辑
 */
$(function(){
    initDatagridEditRequireOrder();
    $("div").delegate("button","click",function(){
    	$("p").slideToggle();
    });
    
});
var editRowIndex = undefined;      //光标所在当前行
var editField = undefined;      //光标所在当前列
var editRowData = null;
var gridName = "gridAddRequireOrder";
var gridHandel = new GridClass();
function initDatagridEditRequireOrder(){
    gridHandel.setGridName(gridName);
	var formId = $("#formId").val();
    $("#gridEditRequireOrder").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
    	url:contextPath+"/form/purchase/detailList?formId="+formId,
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        //pagination:true,    //分页
        //fitColumns:true,    //占满
        showFooter:true,
        height:'100%',
        columns:[[
			{field:'ck',checkbox:true},
			{field:'cz',title:'操作',width:100,align:'center',
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
			{field:'skuCode',title:'货号',width:100,align:'center',editor:'textbox'},
			{field:'zbm',title:'自编码',width:100,align:'center'},
			{field:'pm',title:'品名',width:100,align:'center'},
			{field:'unit',title:'单位',width:100,align:'center'},
	        {field:'spec',title:'规格',width:100,align:'center'},
			{field:'largeNum',title:'箱数',width:100,height:60,align:'center',
			    editor:{
			        type:'numberbox',
			        value:0,
			        options:{
			            min:0,
			            precision:4,
			        }
			    },
			},
			{field:'realNum',title:'数量',width:100,align:'center',
			    editor:{
			        type:'numberbox',
			        value:'0',
			        options:{
			            min:0,
			            precision:0,
			        }
			    },
			},
			
			{field:'price',title:'单价',width:100,align:'center',
			    editor:{
			        type:'numberbox',
			        options:{
			            min:0,
			            precision:4,
			        }
			    },
			},
			{field:'amount',title:'金额',width:100,align:'center',
			    editor:{
			        type:'numberbox',
			        options:{
			            min:0,
			            precision:4,
			        }
			    },
			
			},
			{field:'tax',title:'税率',width:100,align:'center',
			    options:{
			        min:0,
			        precision:4,
			    }
			},
			{field:'taxAmount',title:'税额',width:100,align:'center',
			    editor:{
			        type:'numberbox',
			        options:{
			            disabled:true,
			            min:0,
			            precision:4,
			        }
			    },
			},
			{field:'remark',title:'备注',width:100,align:'center',editor:'textbox'},
			{field:'dqkc',title:'当前库存',width:100,align:'center'},
			{field:'mbkc',title:'目标库存',width:100,align:'center'}
        ]],
        onClickCell:function(rowIndex,field,value){
            $('#gridEditRequireOrder').datagrid('endEdit', editRowIndex);     //结束之前的编辑
            $('#gridEditRequireOrder').datagrid('selectRow', rowIndex);
            $('#gridEditRequireOrder').datagrid('beginEdit', rowIndex);
            editRowIndex = rowIndex;
            editField = field;
            var ed = $('#gridEditRequireOrder').datagrid('getEditor', {index:rowIndex,field:editField});
            if(ed&&ed.target){
                gridHandel.setFieldFocus(ed.target);
            }else{
                ed = $('#gridEditRequireOrder').datagrid('getEditor', {index:rowIndex,field:"skuCode"});
                editField = "skuCode";
            }
            onChangeDatagridEdit(rowIndex);
        },
        onBeforeEdit:function (rowIndex, rowData) {
            editRowData = $.extend(true,{},rowData);
        },
        onAfterEdit:function(rowIndex, rowData, changes){
            if(typeof(rowData.id) === 'undefined'){
                // $("#"+gridName).datagrid('acceptChanges');
            }else{
                if(editRowData.skuCode != changes.skuCode){
                    rowData.skuCode = editRowData.skuCode;
                    gridHandel.setFieldTextValue('skuCode',editRowData.skuCode);
                }
            }
        },
        onLoadSuccess:function(data){
            updateFooter();
        }
    });


    $.extend($.fn.datagrid.methods, {
        keyCtr : function (jq) {
            return jq.each(function () {
                var grid = $(this);
                grid.datagrid('getPanel').panel('panel').attr('tabindex', 1).bind('keydown', function (e) {
                    switch (e.keyCode) {
                        case 37: //左键
                            var field = getLRFiledName(editRowIndex,editField,'left');
                            var ed = grid.datagrid('getEditor', {index:editRowIndex,field:field});
                            if(ed){
                                gridHandel.setFieldFocus(ed.target);
                                setTimeout(function(){
                                    $(ed.target).textbox('textbox').select();
                                },10)
                                editField= field;
                            }
                            break;
                        case 13: //回车键
                            if(editField=="skuCode"){
                                var ed = grid.datagrid('getEditor', {index:editRowIndex,field:editField});
                                console.log($(ed.target).textbox('getValue'));
                                selectGoods($(ed.target).textbox('getValue'));
                            }
                            break;
                        case 39: //右键
                            var field = getLRFiledName(editRowIndex,editField,'right');
                            var ed = grid.datagrid('getEditor', {index:editRowIndex,field:field});
                            if(ed){
                                gridHandel.setFieldFocus(ed.target);
                                setTimeout(function(){
                                    $(ed.target).textbox('textbox').select();
                                },10);

                                editField= field;
                            }
                            break;
                        case 38: //上键
                            if(editRowIndex>0){
                                var lastIndex = editRowIndex-1;
                                grid.datagrid('endEdit', editRowIndex);//结束之前的编辑
                                //grid.datagrid('selectRow', lastIndex);
                                grid.datagrid('beginEdit', lastIndex);
                                editRowIndex = lastIndex;
                                var ed = grid.datagrid('getEditor', {index:lastIndex,field:editField});
                                if(ed){
                                    gridHandel.setFieldFocus(ed.target);
                                    setTimeout(function(){
                                        $(ed.target).textbox('textbox').select();
                                    },10)
                                }
                            }
                            break;
                        case 40: //下键
                            if(grid.datagrid('getRows').length-editRowIndex>1){
                                var lastIndex = editRowIndex+1;
                                grid.datagrid('endEdit', editRowIndex);//结束之前的编辑
                                //grid.datagrid('selectRow', lastIndex);
                                grid.datagrid('beginEdit', lastIndex);
                                editRowIndex = lastIndex;
                                var ed = grid.datagrid('getEditor', {index:lastIndex,field:editField});
                                if(ed&&ed.target){
                                    gridHandel.setFieldFocus(ed.target);
                                    setTimeout(function(){
                                        $(ed.target).textbox('textbox').select();
                                    },10);
                                }
                                onChangeDatagridEdit(lastIndex);
                            }
                            break;
                    }
                });
            });
        }
    });
    
    $("#gridEditRequireOrder").datagrid({}).datagrid("keyCtr");
}

var gridDefault = {
    largeNum:0,
    realNum:0,
    isGift:0,
}
function onChangeDatagridEdit(rowIndex){
    //监听箱数值改变事件
    var edLargeNum = $('#gridEditRequireOrder').datagrid('getEditor', { index: rowIndex, field: 'largeNum' });
    var edRealNum = $('#gridEditRequireOrder').datagrid('getEditor', {index:rowIndex,field:"realNum"});
    var purchaseSpecValue = gridHandel.getFieldData('gridEditRequireOrder',rowIndex,'purchaseSpec');
    if(!purchaseSpecValue){
        $_jxc.alert("没有商品规格,请审查");
        return;
    }
    $(edLargeNum.target).numberbox({ onChange: function (newV,oldV) {
        //数量=商品规格*箱数
        $(edRealNum.target).numberbox('setValue',purchaseSpecValue*newV);
        updateFooter();
    }
    });
    //监听数量值改变事件
    $(edRealNum.target).numberbox({ onChange: function (newV,oldV) {
        var edAmount = $('#gridEditRequireOrder').datagrid('getEditor', {index:rowIndex,field:"amount"});
        //金额=数量*单价
        var edPrice = gridHandel.getFieldValue('gridEditRequireOrder',rowIndex,'price');
        $(edAmount.target).numberbox('setValue',edPrice*newV);
        $(edLargeNum.target).numberbox('setValue',(newV/purchaseSpecValue).toFixed(4));

        updateFooter();
    }
    });
}
//合计
function updateFooter(){
    var largeNum = 0.0;
    var realNum= 0.0;
    var amount= 0.0;;
    var rows = gridHandel.getRows("gridEditRequireOrder");
    if($('#gridEditRequireOrder').datagrid('getEditors')&&editRowIndex){
        var obj = {
            largeNum:gridHandel.getFieldValue('gridEditRequireOrder',editRowIndex,'largeNum')||0,
            realNum:gridHandel.getFieldValue('gridEditRequireOrder',editRowIndex,'realNum')||0,
            amount:gridHandel.getFieldValue('gridEditRequireOrder',editRowIndex,'amount')||0,
        };
        rows.push(obj);
    }
    $.each(rows,function(i,row){
        largeNum += parseFloat(row["largeNum"]?row["largeNum"]:0.0);
        realNum +=parseFloat(row["realNum"]?row["realNum"]:0.0);
        amount += parseFloat(row["amount"]?row["amount"]:0.0);
    })
    $('#gridEditRequireOrder').datagrid('reloadFooter',[
        {
            "isFooter":true,
            "largeNum":largeNum.toFixed(4),
            "realNum":realNum.toFixed(4),
            "amount":amount.toFixed(4),
        }
    ]);
}
function getLRFiledName(index,field,type){
    var row = $("#gridEditRequireOrder").datagrid('getEditors', index);
    var searchField = field;
    for(var i=0;i<row.length;i++){
        if(row[i].field==field){
            if(type=='left'&&i>0){
                searchField = row[i-1].field;
            }
            if(type=='right'&&i<row.length-1){
                searchField = row[i+1].field;
            }
        }
    }
    return searchField;
}
//插入一行
function addLineHandel(event){
    event.stopPropagation();
    $("#gridEditRequireOrder").datagrid("endEdit", editRowIndex);
    var index = $(event.target).attr('data-index')||0;
    $("#gridEditRequireOrder").datagrid("insertRow",{
        index:parseInt(index)+1,
        row:gridDefault
    });
    setTimeout(function(){
        $("#gridEditRequireOrder").datagrid("loadData",$("#gridEditRequireOrder").datagrid("getRows"));
    },10);
}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    if($("#gridEditRequireOrder").datagrid("getRows").length==1){
        return;
    }
    $("#gridEditRequireOrder").datagrid("endEdit", editRowIndex);
    var index = $(event.target).attr('data-index');
    console.log("addLine"+$(event.target).attr('data-index'));
    $("#gridEditRequireOrder").datagrid("deleteRow",index);
    setTimeout(function(){
        $("#gridEditRequireOrder").datagrid("loadData",$("#gridEditRequireOrder").datagrid("getRows"));
    },10)
}
//选择商品
function selectGoods(searchKey){
    var queryParams = {
        type:'',
        key:searchKey,
        isRadio:0,
        'supplierId':'',
        'branchId': "",
        sourceBranchId:'',
        targetBranchId:'',
        flag:'0',
    };
    new publicGoodsServiceTem(queryParams,function(data){
        if(searchKey){
            $("#gridEditRequireOrder").datagrid("deleteRow", editRowIndex);
            $("#gridEditRequireOrder").datagrid("acceptChanges");
        }
        var arrDatagrid = getDatagridRows();
        var addDefaultData  = gFunDataAddDefault(data,gridDefault);
        var rows = checkDatagrid(arrDatagrid,addDefaultData);
        var keyNames = {
            purchasePrice:'price',
            id:'skuId',
            disabled:'',
            pricingType:''
        };

        var newRows = gFunUpdateKey(rows,keyNames);
        console.log(newRows);
        $("#gridEditRequireOrder").datagrid("loadData",newRows);
        
        gridHandel.setLoadFocus();
        setTimeout(function(){
            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
            gridHandel.setSelectFieldName("largeNum");
            gridHandel.setFieldFocus(gridHandel.getFieldTarget('largeNum'));
        },100)

    });
}

//表格添加默认值
function addGridDefault(rows){
    var newRows = [];
    $.each(rows,function(i,v){
        newRows.push($.extend(v,gridDefault));
    });
    return newRows;
}
//验证表格数据 删除不合格数据
function getDatagridRows(){
    $("#gridEditRequireOrder").datagrid("unselectAll");
    $("#gridEditRequireOrder").datagrid("endEdit", editRowIndex);
    var grid = new GridClass();
    var rows = grid.getRows("gridEditRequireOrder");
    $.each(rows,function(i,val){
        if(!val.skuCode){
            rows.splice(i,1);
        }
    });
    return rows;
}
//合并数据-过滤相同的
function checkDatagrid(arrs,data){
    var newData = [];
    $.each(data,function(i,val){
        var isRepeat = false;
        $.each(arrs,function(j,val1){
            if(val.skuCode==val1.skuCode){
                isRepeat = true;
            }
        });
        if(!isRepeat){
            newData.push(val);
        }
    });
    return arrs.concat(newData);
}

//保存
function saveItemHandel(){
	//要货分店
    var branchShopInput = $("#branchShopInput").val();
    //操作员
    var operateUserId = $("#operateUserId").val();
    //发货分店
    var branchId = $("#branchId").val();
    //有效期限
    var deliverTime = $("#deliverTime").val();
    //备注
    var remarks = $("#remarks").val();
    
	var id = $("#formId").val();
	
	
	//TODO 计算获取商品总数量和总金额
	//商品总数量
	var totalNum = 0;
	//总金额
	var amount=0;
	
	var rows = $("#gridEditRequireOrder").datagrid('getRows');
    var saveData = JSON.stringify(rows);
    
    console.log(branchShopInput);
	console.log(operateUserId);
	console.log(branchId);
	console.log(deliverTime);
	console.log(remarks);
    console.log(rows);
    
    var detailList = tableArrayFormatter(rows,"detailList");
    console.log(detailList);
    
    var reqObj = $.extend({
    	id:id,
		supplierId:supplierId,
		branchId:branchId,
		deliverTime:deliverTime,
		salesmanId:salesmanId,
		totalNum:totalNum,
		amount:amount,
	}, detailList);
    
    $_jxc.ajax({
    	url:contextPath+"/form/purchase/updateOrder",
    	data:reqObj
    },function(result){
        console.log(result);
        if(result['code'] == 0){
            $_jxc.alert("操作成功！");
        }else{
            $_jxc.alert(result['message']);
        }
    });
}

//审核
function check(){
	var id = $("#formId").val();
	$_jxc.confirm('是否审核通过？',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/form/purchase/check",
		    	data:{
		    		formId:id,
		    		status:1
		    	}
		    },function(result){
	    		console.log(result);
	    		if(result['code'] == 0){
	    			$_jxc.alert("操作成功！",function(){
	    				location.href = contextPath +"/form/purchase/orderEdit?formId=" + id;
	    			});
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
		    });
		}
	});
}

//合计
function toFooter(){
	$('#gridEditRequireOrder').datagrid('reloadFooter',[{"isFooter":true,"receivablesAccount":$('#receivablesAccount').val()||0,"collectAccount":$('#collectAccount').val()||0}]);
}

//要货分店
function selectBranch(){
	/**
	 * 分店列表  type = 0  |  1
	* 0 表示单选  1 表示多选
	*/
	new publicBranchService(function(data){
		$("#branchShopInput").val(data.branchesId);//id
		$("#branchShopName").val(data.branchName);
	},0);

}

//操作员
function selectOperator(){
	new publicOperatorService(function(data){
		$("#operateUserId").val(data.id);
		$("#operateUserName").val(data.userName);
	});
}

//发货分店
function selectBranchSend(){
    new publicBranchService(function(data){
        $("#branchId").val(data.branchesId);//id
        $("#branchName").val("["+data.branchCode+"]"+data.branchName);
    },0);
}


