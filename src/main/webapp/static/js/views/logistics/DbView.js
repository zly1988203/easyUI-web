/**
 * Created by zhanghuan on 2016/8/30.
 * 物流回单明细
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
    selectTargetBranchData($("#targetBranchId").val());
});
var gridHandel = new GridClass();
var gridName = "gridEditRequireOrder";
function initDatagridEditRequireOrder(){
    gridHandel.setGridName("gridEditRequireOrder");
	var formId = $("#formId").val();
    $("#gridEditRequireOrder").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
    	url:contextPath+"/LogisticsDeliverForm/getDeliverFormLists?deliverFormId="+formId+"&deliverType=DB",
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

			{field:'cz',title:'操作',width:'50px',align:'center',
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
            {field:'rowNo',title:'序号',width:'80px',align:'center'},
            {field:'skuCode',title:'货号',width:'70px',align:'left'},
            {field:'skuName',title:'商品名称',width:'190px',align:'left'},
            {field:'barCode',title:'条码',width:'105px',align:'left'},
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            {field:'distributionSpec',title:'配送规格',width:'90px',align:'left'},
            {field:'largeNum',title:'箱数',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return "<b>"+parseFloat(value||0).toFixed(2)+ "<b>";
                    }
                    return "<b>"+parseFloat(value||0).toFixed(2)+ "<b>";
                },
            },
            {field:'dealNum',title:'数量',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return "<b>"+parseFloat(value||0).toFixed(2)+ "<b>";
                    }
                    return "<b>"+parseFloat(value||0).toFixed(2)+ "<b>";
                },
            },
            {field:'remark',title:'备注',width:'200px',align:'left'}
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
            //updateFooter();
        }
    });

}

function exportListData(){
    window.location.href=contextPath+'/LogisticsDeliverForm/exportListData?deliverFormId='+$("#formId").val() + '&deliverType=DB';
}