/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单-新增
 */
$(function(){
    $("#createTime").html(new Date().format('yyyy-MM-dd'));
    initDatagridAddRequireOrder();
});
var editRowIndex = undefined;      //光标所在当前行
var editField = undefined;      //光标所在当前列
var gridHandel = new GridClass();
function initDatagridAddRequireOrder(){
    $("#gridAddRequireOrder").datagrid({
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
            $('#gridAddRequireOrder').datagrid('endEdit', editRowIndex);     //结束之前的编辑
            $('#gridAddRequireOrder').datagrid('selectRow', rowIndex);
            $('#gridAddRequireOrder').datagrid('beginEdit', rowIndex);
            editRowIndex = rowIndex;
            editField = field;
            var ed = $('#gridAddRequireOrder').datagrid('getEditor', {index:rowIndex,field:editField});
            if(ed&&ed.target){
                gridHandel.setFieldFocus(ed.target);
            }else{
                ed = $('#gridAddRequireOrder').datagrid('getEditor', {index:rowIndex,field:"skuCode"});
                editField = "skuCode";
            }
            onChangeDatagridEdit(rowIndex);
        },
        onLoadSuccess:function(data){
            console.log("onLoadSuccess");
            var rowL = $("#gridAddRequireOrder").datagrid("getRows").length;
            if(rowL==0){
                $("#gridAddRequireOrder").datagrid("insertRow",{
                    index:0,
                    row: $.extend({},gridDefault)
                });
            }
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
    $("#gridAddRequireOrder").datagrid({}).datagrid("keyCtr");

    $('#gridAddRequireOrder').datagrid('loadData',{ code: '01',rows: [$.extend({},gridDefault)]});
}
var gridDefault = {
    largeNum:0,
    realNum:0,
    isGift:0,
}
function onChangeDatagridEdit(rowIndex){
    //监听箱数值改变事件
    var edLargeNum = $('#gridAddRequireOrder').datagrid('getEditor', { index: rowIndex, field: 'largeNum' });
    var edRealNum = $('#gridAddRequireOrder').datagrid('getEditor', {index:rowIndex,field:"realNum"});
    var edAmount = $('#gridAddRequireOrder').datagrid('getEditor', {index:rowIndex,field:"amount"});
    var edTaxAmount= $('#gridAddRequireOrder').datagrid('getEditor', { index: rowIndex, field: 'taxAmount' });

    var purchaseSpecValue = gridHandel.getFieldData('gridAddRequireOrder',rowIndex,'purchaseSpec');
    if(!purchaseSpecValue){
        messager("没有商品规格,请审查");
        return;
    }
    //监听箱数
    $(edLargeNum.target).numberbox({ onChange: function (newV,oldV) {
            //数量=商品规格*箱数
            $(edRealNum.target).numberbox('setValue',purchaseSpecValue*newV);
            updateFooter();
        }
    });

    //监听数量值改变事件
    $(edRealNum.target).numberbox({ onChange: function (newV,oldV) {
            //金额=数量*单价
            var edPrice = gridHandel.getFieldValue('gridAddRequireOrder',rowIndex,'price');
            $(edAmount.target).numberbox('setValue',edPrice*newV);
            $(edLargeNum.target).numberbox('setValue',(newV/purchaseSpecValue).toFixed(4));
            updateFooter();
        }
    });

    //监听金额
    $(edAmount.target).numberbox({onChange: function (newV,oldV) {
            //获取税率
            var taxV = gridHandel.getFieldData('gridAddRequireOrder',rowIndex,'tax');
            $(edTaxAmount.target).numberbox('setValue',(taxV*(newV/(1+taxV))).toFixed(4));
        }
    });
}
//合计
function updateFooter(){
    var largeNum = 0.0;
    var realNum= 0.0;
    var amount= 0.0;;
    var rows = gridHandel.getRows("gridAddRequireOrder");
    if($('#gridAddRequireOrder').datagrid('getEditors')&&editRowIndex){
        var obj = {
            largeNum:gridHandel.getFieldValue('gridAddRequireOrder',editRowIndex,'largeNum')||0,
            realNum:gridHandel.getFieldValue('gridAddRequireOrder',editRowIndex,'realNum')||0,
            amount:gridHandel.getFieldValue('gridAddRequireOrder',editRowIndex,'amount')||0,
            isGift:gridHandel.getFieldValue('gridAddRequireOrder',editRowIndex,'isGift'),
        };
        rows.push($.extend({},obj));
    }
    $.each(rows,function(i,row){
        if(row["isGift"]==0){
            largeNum += parseFloat(row["largeNum"]?row["largeNum"]:0.0);
            realNum +=parseFloat(row["realNum"]?row["realNum"]:0.0);
            amount += parseFloat(row["amount"]?row["amount"]:0.0);
        }
    })
    $('#gridAddRequireOrder').datagrid('reloadFooter',[
        {
            "isFooter":true,
            "largeNum":largeNum.toFixed(4),
            "realNum":realNum.toFixed(4),
            "amount":amount.toFixed(4),
        }
    ]);

    formTotalNum = realNum.toFixed(4);
    formAmount = amount.toFixed(4);
}
function getLRFiledName(index,field,type){
    var row = $("#gridAddRequireOrder").datagrid('getEditors', index);
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
    $("#gridAddRequireOrder").datagrid("endEdit", editRowIndex);
    var index = $(event.target).attr('data-index')||0;
    $("#gridAddRequireOrder").datagrid("insertRow",{
        index:parseInt(index)+1,
        row:$.extend({},gridDefault)
    });
    setTimeout(function(){
        $("#gridAddRequireOrder").datagrid("loadData",$("#gridAddRequireOrder").datagrid("getRows"));
    },10);
}

//删除一行
function delLineHandel(event){
    event.stopPropagation();
    if($("#gridAddRequireOrder").datagrid("getRows").length==1){
        return;
    }
    $("#gridAddRequireOrder").datagrid("endEdit", editRowIndex);
    var index = $(event.target).attr('data-index');
    console.log("addLine"+$(event.target).attr('data-index'));
    $("#gridAddRequireOrder").datagrid("deleteRow",index);
    setTimeout(function(){
        $("#gridAddRequireOrder").datagrid("loadData",$("#gridAddRequireOrder").datagrid("getRows"));
    },10)
}

//选择商品
function selectGoods(searchKey){
	//判定要货分店是否存在
    if($("#branchShopInput").val()==""){
        messager("请先选择要货分店");
        return;
    }
    //判定发货分店是否存在
    if($("#branchId").val()==""){
        messager("请先选择发货分店");
        return;
    }
    new publicGoodsService("",function(data){
        if(searchKey){
            $("#gridAddRequireOrder").datagrid("deleteRow", editRowIndex);
            $("#gridAddRequireOrder").datagrid("acceptChanges");
        }
        var arrDatagrid = getDatagridRows();
        var addDefaultData  = gFunDataAddDefault(data,gridDefault);
        var rows = checkDatagrid(arrDatagrid,addDefaultData);
        var keyNames = {
            purchasePrice:'price',
            id:'skuId',
            disabled:'',
            pricingType:'',
            inputTax:'tax'
        };

        var newRows = gFunUpdateKey(rows,keyNames);
        console.log(newRows);
        $("#gridAddRequireOrder").datagrid("loadData",newRows);
    },searchKey);
}


//验证表格数据 删除不合格数据
function getDatagridRows(){
    $("#gridAddRequireOrder").datagrid("unselectAll");
    $("#gridAddRequireOrder").datagrid("endEdit", editRowIndex);
    var grid = new GridClass();
    var rows = grid.getRows("gridAddRequireOrder");
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

//TODO 计算获取商品总数量和总金额
//商品总数量
var formTotalNum = 0;
//总金额
var formAmount=0;

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
    //验证表格数据
    $("#gridAddRequireOrder").datagrid("endEdit", editRowIndex);
    var grid = new GridClass();
    var rows = grid.getRows("gridAddRequireOrder");
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
    var isCheckResult = true;
    $.each(rows,function(i,v){
        if(!v["skuCode"]){
            messager("第"+(i+1)+"行，货号不能为空");
            isCheckResult = false;
            return false;
        };
        if(v["largeNum"]<=0){
            messager("第"+(i+1)+"行，箱数必须大于0");
            isCheckResult = false;
            return false;
        }
        if(v["realNum"]<=0){
            messager("第"+(i+1)+"行，数量必须大于0");
            isCheckResult = false;
            return false;
        }
    });
    if(!isCheckResult){
        return;
    }
    console.log(rows);
    var saveData = JSON.stringify(rows);
    
    var detailList = tableArrayFormatter(rows,"detailList");
    console.log(detailList);

    var reqObj = $.extend({
        supplierId:supplierId,
        branchId:branchId,
        deliverTime:deliverTime,
        salesmanId:salesmanId,
        totalNum:formTotalNum,
        amount:formAmount,
    }, detailList);

    $.ajax({
        url:contextPath+"/form/purchase/saveOrder",
        type:"POST",
        data:reqObj,
        success:function(result){
            console.log(result);
            if(result['code'] == 0){
                $.messager.alert("操作提示", "操作成功！", "info",function(){
                    location.href = contextPath +"/form/purchase/orderEdit?formId=" + result["formId"];
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

