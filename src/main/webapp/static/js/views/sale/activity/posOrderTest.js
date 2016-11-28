$(function(){
    initDatagridEditOrder();
});

var gridDefault = {
    quantity:0,
}
var gridHandel = new GridClass();
function initDatagridEditOrder(){
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
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
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
            {field:'skuCode',title:'货号',width: '70px',align:'left',editor:'textbox'},
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'barCode',title:'国际条码',width:'130px',align:'left'},
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            {field:'quantity',title:'数量',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    value:'0',
                    options:{
                        min:0,
                        precision:4,
                        onChange: onChangequantity,
                    }
                },
            },
            {field:'price',title:'单价',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                options:{
                    min:0,
                    precision:4,
                }
            },
            {field:'amount',title:'金额',width:'80px',align:'right',
            	editor:{
                    type:'numberbox',
                    options:{
                        disabled:true,
                        min:0,
                        precision:4,
                    }
                }
            },
            {field:'salePrice',title:'销售价',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            }
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

//监听商品数量
function onChangequantity(newV,oldV) {
    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuCode')){
        return;
    }
    var priceValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'price');
    gridHandel.setFieldValue('amount',priceValue*newV);//金额=数量*单价
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
    if(!branchId){
    	messager("请先选择结算机构");
        return;
    }
    
    new publicGoodsService("",function(data){
        if(data.length==0){
            return;
        }
        if(searchKey){
            $("#gridEditOrder").datagrid("deleteRow", gridHandel.getSelectRowIndex());
            $("#gridEditOrder").datagrid("acceptChanges");
        }
        for(var i in data){
        	var rec = data[i];
        	rec.remark = "";
        }
        var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
        var addDefaultData  = gridHandel.addDefault(data,gridDefault);
        var keyNames = {
        	salePrice:'price',
            id:'skuId',
            disabled:'',
            pricingType:'',
            inputTax:'tax'
        };
        var rows = gFunUpdateKey(addDefaultData,keyNames);
        var argWhere ={skuCode:1};  //验证重复性
        var isCheck ={isGift:1 };   //只要是赠品就可以重复
        var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);

        $("#gridEditOrder").datagrid("loadData",newRows);

        gridHandel.setLoadFocus();
        setTimeout(function(){
            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
            gridHandel.setSelectFieldName("largeNum");
            gridHandel.setFieldFocus(gridHandel.getFieldTarget('largeNum'));
        },100)
    },searchKey,"","","",branchId,"");
}

//保存
function saveItemHandel(){

    $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());

    var rows = gridHandel.getRows();
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
    var isCheckResult = true;
    var isChcekPrice = false;
    var isChcekNum = false;
    $.each(rows,function(i,v){
        v["num"] = i+1;
        if(!v["skuName"]){
            messager("第"+(i+1)+"行，货号不正确");
            isCheckResult = false;
            return false;
        };
        //数量判断
        if(parseFloat(v["quantity"])<=0){
        	isChcekNum = true;
        }
    });
    if(isCheckResult){
        if(isChcekPrice){
            $.messager.confirm('系统提示',"单价存在为0，重新修改",function(r){
                if (r){
                    return ;
                }else{
                	 saveDataHandel(rows);
                }
            });
        }else{
        	if(isChcekNum){
       		 $.messager.confirm('提示','存在数量为0的商品,是否继续保存?',function(data){
       			if(data){
       				saveDataHandel(rows);
       		    }
       		 });
         	}else{
         		saveDataHandel(rows);
         	}
        }
    }
}

function saveDataHandel(rows){
    //商品总数量
    var totalNum = 0;
    //总金额
    var amount=0;
    //收货机构
    var branchId = $("#branchId").val();
    //交货期限
    var deliverTime = $("#deliverTime").val();
    //采购员
    var salesmanId = $("#salesmanId").val();
    
    for(var i in rows){
    	amount += parseFloat(rows[i].amount);
    }

    var reqObj = {
        branchId:branchId,
        token:"0",
        machinecode:"01",
        userId:salesmanId,
        amount:"0",
        data:{
        	amount:"0",
        	list:rows
        }
    };
    
    var req = JSON.stringify(reqObj);

    $.ajax({
        url:contextPath+"/order/order/perpay",
        type:"POST",
        contentType:'application/json',
        data:req,
        success:function(result){
            console.log(result);
        },
        error:function(result){
        	console.log(result);
        }
    });

}

function selectOperator(){
    new publicOperatorService(function(data){
        $("#salesmanId").val(data.id);
        $("#operateUserName").val(data.userName);
    });
}
function selectBranch(){
    new publicBranchService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchName").val("["+data.branchCode+"]"+data.branchName);
    },0);
}

