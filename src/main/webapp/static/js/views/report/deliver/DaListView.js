/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单-查看
 */
$(function(){
    initDatagridViewRequireOrder();
});
var gridHandel = new GridClass();
function initDatagridViewRequireOrder(){
	gridHandel.setGridName("gridViewRequireOrder");
	var formId = $("#formId").val();
    $("#gridViewRequireOrder").datagrid({
    	method:'post',
    	url:contextPath+"/form/deliverFormList/getDeliverFormListsById?deliverFormId="+formId+"&deliverType=DA",
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
		showFooter:true,
		height:'100%',
        columns:[[
            {field:'skuCode',title:'货号',width:'55px',align:'left'},
            {field:'skuName',title:'商品名称',width:'185px',align:'left'},
            {field:'barCode',title:'条码',width:'100px',align:'left'},
			{field:'unit',title:'单位',width:'45px',align:'left'},
			{field:'spec',title:'规格',width:'45px',align:'left'},
            {field:'distributionSpec',title:'配送规格',width:'80px',align:'left'},
            {field:'largeNum',title:'箱数',width:'80px',align:'right',
				formatter : function(value, row, index) {
					if(row.isFooter){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
            {field:'applyNum',title:'数量',width:'80px',align:'right',
				formatter : function(value, row, index) {
					if(row.isFooter){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
            {field:'price',title:'单价',width:'80px',align:'right',
				formatter : function(value, row, index) {
					if(row.isFooter){
						return ;
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
            {field:'amount',title:'金额',width:'80px',align:'right',
				formatter : function(value, row, index) {
					if(row.isFooter){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
            {field:'inputTax',title:'税率',width:'80px',align:'right',
				formatter : function(value, row, index) {
					if(row.isFooter){
						return ;
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
            {field:'taxAmount',title:'税额',width:'80px',align:'right',
                formatter:function(value,row){
                    if(row.isFooter){
                        return;
                    }
					var taxAmountVal = (row.inputTax*(row.amount/(1+parseFloat(row.inputTax)))||0.0000).toFixed(2);
                    return  '<b>'+parseFloat(taxAmountVal||0).toFixed(2)+'</b>';
                }
            },
            {field:'remark',title:'备注',width:'100px',align:'left'},
            {field:'sourceStock',title:'目标库存',width:'80px',align:'right',
				formatter : function(value, row, index) {
					if(row.isFooter){
						return ;
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
                }
            }
        ]],
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
			updateFooter();
		}
    });
}
//合计
function updateFooter(){
	var fields = {largeNum:0,applyNum:0,amount:0,isGift:0, };
	var argWhere = {name:'isGift',value:""}
	gridHandel.updateFooter(fields,argWhere);
}

//返回
function back(){
	location.href = contextPath+"/form/deliverReport/view";
}

//打印
function printDesign(formNo){
     //弹出打印页面
     parent.addTabPrint('DASheet' + formNo,formNo+'单据打印',contextPath + '/printdesign/design?page=DASheet&controller=/form/deliverForm&template=-1&sheetNo=' + formNo + '&gridFlag=DAGrid','');
}