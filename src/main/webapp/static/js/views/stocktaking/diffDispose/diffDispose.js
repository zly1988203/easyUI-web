var gridName = "operateGrid";
var isdisabled = false;
var url;
var operateStatus = 'add';

$(function(){
	operateStatus = $('#disposeStatus').val();
	var batchId = $('#batchId').val();
	if(operateStatus === 'add'){
	
	}else if(operateStatus === '0'){
		url = contextPath +"/stocktaking/operate/stocktakingDifferenceList?batchId=" + batchId;
		$('#already-examine').css('display','none');
		$('#btnCheck').css('display','black');
	
	}else if(operateStatus === '1'){
		url = contextPath +"/stocktaking/operate/stocktakingDifferenceList?batchId=" + batchId;
		isdisabled = true;
		$('#already-examine').css('display','black');
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
            {field:'skuCode',title:'货号',width: '70px',align:'left',
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
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'unit',title:'系统库存',width:'60px',align:'left'},
            {field:'stocktakingNum',title:'盘点数量',width:'90px',align:'left'},
            {field:'spec',title:'盈亏数量',width:'90px',align:'left'},
            {field:'spec',title:'差异原因',width:'90px',align:'left',
            	editor:{
	                type:'textbox',
	                options:{
	                	disabled:isdisabled,
	                }
            	}},
            {field:'spec',title:'原库存成本价',width:'90px',align:'left'},
            {field:'spec',title:'原库存金额（成本价）',width:'90px',align:'left'},
            {field:'spec',title:'盘点金额（成本价）',width:'90px',align:'left'},
            {field:'spec',title:'盈亏金额（成本价）',width:'90px',align:'left'},
            {field:'spec',title:'盈亏金额（售价）',width:'90px',align:'left'},
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