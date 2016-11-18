/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单-编辑
 */
$(function(){
    initDatagridEditRequireOrder();
    $("div").delegate("button","click",function(){
    	$("p").slideToggle();
    });
    if($("#close").val()){
    	$("#addButton").addClass("unhide");
    	$("#toBackByJSButton").attr("onclick","window.parent.closeTab()");
    }
});
var gridHandel = new GridClass();
function initDatagridEditRequireOrder(){
    gridHandel.setGridName("gridEditRequireOrder");
	var formId = $("#formId").val();
    $("#gridEditRequireOrder").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
    	url:contextPath+"/form/deliverFormList/getDeliverFormListsById?deliverFormId="+formId,
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
			{field:'skuCode',title:'货号',width:'70px',align:'left',editor:'textbox'},
			{field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'barCode',title:'条码',width:'130px',align:'left'},
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            {field:'distributionSpec',title:'配送规格',width:'90px',align:'left'},
            {field:'largeNum',title:'箱数',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'receiveNum',title:'数量',width:'80px',align:'right',
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
                    row["taxAmount"] = taxAmountVal;
                    return '<b>'+parseFloat(taxAmountVal||0).toFixed(2)+'</b>';;
                },
            },
            {field:'remark',title:'备注',width:'200px',align:'left',editor:'textbox'}
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
            updateFooter();
        }
    });
}
//合计
function updateFooter(){
    var fields = {largeNum:0,receiveNum:0,amount:0,isGift:0, };
    var argWhere = {name:'isGift',value:""}
    gridHandel.updateFooter(fields,argWhere);
}
//新增出库单
function addDeliverForm(){
	location.href = contextPath + "/form/deliverForm/addDeliverForm?deliverType=DI";
}
//返回列表页面
function back(){
	location.href = contextPath+"/form/deliverForm/viewsDI";
}

//打印 入库单 DI
function printDesign(formNo){
     //弹出打印页面
     parent.addTabPrint('DISheet' + formNo,formNo+'单据打印',contextPath + '/printdesign/design?page=DISheet&controller=/form/deliverForm&template=-1&sheetNo=' + formNo + '&gridFlag=DIGrid','');
}
