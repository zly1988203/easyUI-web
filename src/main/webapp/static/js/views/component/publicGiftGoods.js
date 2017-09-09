/**
 * Created by zhaoly on 2017/3/16.
 */


$(function () {


})

function initGiftGoods(param) {
    initGridGiftGoods();
    queryData(param);
}
var gridGiftGoodsId = "gridGiftGoods"
function initGridGiftGoods(param) {
    $("#"+gridGiftGoodsId).datagrid({
        //title:'普通表单-用键盘操作',
        method:'POST',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:false,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        //pageSize:50,
        /*  pageList : [10,500],  */
        showFooter:true,
        height:'100%',
        columns:[getFiledsList()],
        onLoadSuccess : function() {
            //gridHandel.setDatagridHeader();
        	gridHandel.setDatagridHeader("center");
        }
    });
}

function queryData(param) {
    $("#"+gridGiftGoodsId).datagrid("options").queryParams = param;
    $("#"+gridGiftGoodsId).datagrid("options").method = "post";
    $("#"+gridGiftGoodsId).datagrid("options").url = contextPath+"/sale/activity/getGiftListForGroupNum";
    $("#"+gridGiftGoodsId).datagrid("load");
}


function getFiledsList() {
    var arrColumns = [
        {field:'skuCode',title:'货号',align:'left',width:60,},
        {field:'skuName',title:'商品名称',align:'left',width:150,},
        {field:'barCode',title:'条码',align:'left',width:100,},
        {field:'spec',title:'规格',width:'60px',align:'left'},
        {field:'unit',title:'单位',width:'60px',align:'left'},
        {field:'salePrice',title:'零售价',align:'right',width:80,
            formatter : function(value, row, index) {
                return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            }
        },
        {field:'giftNum',title:'数量',width:'80px',align:'right',
        	formatter : function(value, row, index) {
                return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            },
        },
        {field:'giftAmount',title:'增加金额',width:'80px',align:'right',
            formatter : function(value, row, index) {
                return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            },
        }
    ];

    return arrColumns;
}






