var gridName = "operateGrid";
var isdisabled = false;
var url;
var operateStatus = 'add';

$(function(){
	operateStatus = $('#disposeStatus').val();
	var batchId = $('#batchId').val();
	if(operateStatus === 'add'){
	
	}else if(operateStatus === '0'){
		url = contextPath +"/stocktaking/diffDispose/stocktakingDifferenceList?batchId=" + batchId;
		$('#already-examine').css('display','none');
		$('#btnCheck').css('display','block');
	
	}else if(operateStatus === '1'){
		url = contextPath +"/stocktaking/diffDispose/stocktakingDifferenceList?batchId=" + batchId;
		isdisabled = true;
		$('#already-examine').css('display','block');
		$('#btnCheck').css('display','none');
	}
	initOperateDataGrid();
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
        method:'get',
    	url:url,
        align:'center',
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
			{field:'ck',checkbox:true},
            {field:'skuId',hidden:'true'},
            {field:'barCode',hidden:'true'},
            {field:'skuCode',title:'货号',width: '100px',align:'left',
			    formatter : function(value, row,index) {
			        var str = "";
			        if(row.isFooter){
			            str ='<div class="ub ub-pc">合计</div> '
			        }else{
			            str = value;
			        }
			        return str;
			    }
            },
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'snapshootStockNum',title:'系统库存',width:'100px',align:'left'},
            {field:'stocktakingNum',title:'盘点数量',width:'100px',align:'left'},
            {field:'profitLossNum',title:'盈亏数量',width:'100px',align:'left'},
            {field:'differenceReason',title:'差异原因',width:'200px',align:'left',
            	editor:{
	                type:'textbox',
	                options:{
	                	disabled:isdisabled,
	                }
            	}},
            {field:'snapshootCostPrice',title:'原库存成本价',width:'200px',align:'left'},
            {field:'costAmount',title:'原库存金额（成本价）',width:'200px',align:'left'},
            {field:'stocktakingCostAmount',title:'盘点金额（成本价）',width:'200px',align:'left'},
            {field:'profitLossCostAmount',title:'盈亏金额（成本价）',width:'200px',align:'left'},
            {field:'profitLossSaleAmount',title:'盈亏金额（售价）',width:'200px',align:'left'},
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
    
    if(operateStatus === 'add'){
    	 gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
    	                         $.extend({},gridDefault),$.extend({},gridDefault)]);
    }
}


// 合计
function updateFooter(){
    var fields = {largeNum:0,applyNum:0,amount:0,isGift:0, };
    var argWhere = {name:'isGift',value:0}
    gridHandel.updateFooter(fields,argWhere);
}

//删除
function deleteDiffDispose(){
	var batchId = $("#batchId").val();
	var ids = [batchId];
	$.messager.confirm('提示','是否要删除此条数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/stocktaking/diffDispose/deleteStocktakingBatch",
		    	type:"POST",
		    	data:{
		    		ids : ids
		    	},
		    	success:function(result){
		    		successTip(result['message']);
		    		if(result['code'] == 0){
		    			back();
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
 * 关闭
 */
function back(){
	toClose();
}