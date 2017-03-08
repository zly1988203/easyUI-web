/**
 * 库存盘货单
 */
var gridName = "operateGrid";
var isdisabled = false;

$(function(){
	var operateStatus = $('#operateStatus').val();
	if(operateStatus === 'add'){
	
	}else if(operateStatus === 'edit'){
		$('#already-examine').css('display','none');
		$('#btnCheck').css('display','black');
	
	}else if(operateStatus === 'check'){
		isdisabled = true;
		$('#already-examine').css('display','black');
		$('#btnCheck').css('display','none');
	}
}
)

var gridHandel = new GridClass();
function initOperateDataGrid(){
	 gridHandel.setGridName(gridName);
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
	            	branchId = $("#sourceBranchId").val();
	                selectGoods(arg);
	            }
	        },
	    })
	    
	    $("#"+gridName).datagrid({
        method:'post',
    	url:url,
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
			        var str = "";
			        if(row.isFooter){
			            str ='<div class="ub ub-pc">合计</div> '
			        }else{
			            str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
			                '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
			        }
			        return str;
			    }
			},
            {field:'rowNo',hidden:'true'},
            {field:'skuCode',title:'货号',width: '70px',align:'left',
            	editor:{
	                type:'textbox',
	                options:{
	                	disabled:isdisabled,
	                }
            	}
            },
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},

            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            {field:'spec',title:'品牌',width:'90px',align:'left'},

            {field:'applyNum',title:'实际盘点数量',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                        row["applyNum"] = parseFloat(value||0).toFixed(2);
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                    	disabled:isdisabled,
                        min:0,
                        precision:4,
                        onChange: onChangeRealNum,
                    }
                }
            },
            {field:'price',title:'零售价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    if(!row.price){
                    	row.price = parseFloat(value||0).toFixed(2);
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            
            },
            {field:'amount',title:'零售金额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }

                    if(!row.amount){
                    	row.amount = parseFloat(value||0).toFixed(2);
                    }
                    
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },



            {field:'remark',title:'备注',width:'200px',align:'left', 
            	editor:{
	                type:'textbox',
	                options:{
	                	disabled:isdisabled,
	                }
            	}
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
        onLoadSuccess:function(data){

            gridHandel.setDatagridHeader("center");
        
            updateFooter();
        },
    });
    
    if(operateStatus==='add'){
    	 gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
    	                         $.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault),
    	                         $.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault)]);
    }
}


//合计
function updateFooter(){
    var fields = {largeNum:0,applyNum:0,amount:0,isGift:0, };
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
	var takeStockId = $('#takeStockId').val();
    //判定发货分店是否存在
    if($("#branchId").val()==""){
        messager("请先选择发货机构");
        return;
    }
    
    var param = {
    		type:'DA',
    		key:searchKey,
    		isRadio:'',
    		sourceBranchId:branchId,
    		targetBranchId:"",
    		branchId:branchId,
    		supplierId:'',
    		flag:'0',
    		takeStockId:takeStockId,
    }

    new publicGoodsServiceTem(param,function(data){
    	if(searchKey){
	        $("#gridEditOrder").datagrid("deleteRow", gridHandel.getSelectRowIndex());
	        $("#gridEditOrder").datagrid("acceptChanges");
	    }
    	
        gridHandel.setLoadFocus();
        setTimeout(function(){
            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
            gridHandel.setSelectFieldName("largeNum");
            gridHandel.setFieldFocus(gridHandel.getFieldTarget('largeNum'));
        },100)
    	
    });
    branchId = '';
}

//导入
function toImportOperate(type){

    var takeStockId = $("#takeStockId").val();
    if(takeStockId === '' || takeStockId === null){
        messager("请先选择盘点批号");
        return;
    }
    var param = {
        url:contextPath+"/form/deliverForm/importList",
        tempUrl:contextPath+"/form/deliverForm/exportTemp",
        type:type,

    }
    new publicUploadFileService(function(data){
    	if (data.length != 0) {
    		selectStockAndPriceImport(data);
    	}
    },param)
}

