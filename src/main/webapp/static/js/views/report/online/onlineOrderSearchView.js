/**
 * Created by zhaoly on 2017/5/26.
 */

$(function () {
    initGridOrderDetail();
})

var gridName = "gridOnlineOrderDetail";
var gridHandel = new GridClass();

function initGridOrderDetail() {
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        url:contextPath+"report/onlineOrderView/list?"+id,
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        showFooter:true,
        height:'100%',
        width:'100%',
        singleSelect:true,
        columns:[[
            {field:'skuCode',title:'货号',width: '70px',align:'left',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<div class="ub ub-pc">合计</div> '
                    }
                },
            },
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'barCode',title:'条码',width:'150px',align:'left'},
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            {field:'applyNum',title:'数量',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:0,
                        disabled:true,
                    }
                }
            },
            {field:'price',title:'售价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        disabled:true,
                        min:0,
                        precision:4,
                    }
                },

            },
            {field:'salePrice',title:'售价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        disabled:true,
                        min:0,
                        precision:4,
                    }
                },
            },
            {field:'amount',title:'金额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }

                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        disabled:true,
                        min:0,
                        precision:4,
                    }
                }
            },

            {field:'inputTax',title:'税率',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        disabled:true,
                        precision:2,
                    }
                }
            },
            {field:'taxAmount',title:'税额',width:'80px',align:'right',
                formatter:function(value,row){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        disabled:true,
                        min:0,
                        precision:4,
                    }
                }
            },
        ]]
    })
}

/**
 * 导出
 */
function exportExcel(){
    var length = $("#"+gridName).datagrid('getData').total;
    if(length == 0){
        successTip('提示',"没有数据");
        return;
    }
    var fromObjStr = urlEncode($('#queryForm').serializeObject());
    $("#queryForm").form({
        success : function(data){
            if(data==null){
                $.messager.alert('提示',"导出数据成功！");
            }else{
                $.messager.alert('提示',JSON.parse(data).message);
            }
        }
    });
    $("#queryForm").attr("action",contextPath + '/report/onlineOrder/exports?params='+fromObjStr);

    $("#queryForm").submit();
}

var printPreview = function(){
    var length = $("#"+gridName).datagrid('getData').total;
    if(length == 0){
        successTip("无数据可打印");
        return;
    }
    var queryParams =  urlEncode($("#queryForm").serializeObject());
    parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/report/onlineOrder/print?params="+queryParams);
}

var urlEncode = function (param, key, encode) {
    if(param==null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
};