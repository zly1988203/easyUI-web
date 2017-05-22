/**
 * Created by zhaoly on 2017/5/18.
 */

$(function () {
    initGridBranchCost();
})

var gridHandel = new GridClass();
function initGridBranchCost() {
    $("#gridFitmentCost").datagrid({
        align:'center',
        rownumbers:true,    //序号
        height:'100%',
        width:'100%',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                            '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';

                    return str;
                },
            },
            {field: 'branchCode', title: '装修费用', width: 100, align: 'left',editor:'text'},
            {field: 'branchName', title: '金额', width: 80, align: 'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                    }
                },
            },
            {field: 'person', title: '操作人', width: 80, align: 'left'},
            {field: 'date', title: '操作日期', width: 150, align: 'left'},
        ]]
    })

    $("#gridEquipmentCost").datagrid({
        align:'center',
        rownumbers:true,    //序号
        height:'100%',
        width:'100%',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                        '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';

                    return str;
                },
            },
            {field: 'branchCode', title: '设备费用', width: 100, align: 'left',editor:'text'},
            {field: 'branchName', title: '金额', width: 80, align: 'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                    }
                },
            },
            {field: 'person', title: '操作人', width: 80, align: 'left'},
            {field: 'date', title: '操作日期', width: 150, align: 'left'},
        ]]
    })

    $("#gridAmortizeCost").datagrid({
        align:'center',
        rownumbers:true,    //序号
        height:'100%',
        width:'100%',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                        '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';

                    return str;
                },
            },
            {field: 'branchCode', title: '摊销费用', width: 100, align: 'left',editor:'text'},
            {field: 'branchName', title: '金额', width: 80, align: 'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                    }
                },
            },
            {field: 'person', title: '操作人', width: 80, align: 'left'},
            {field: 'date', title: '操作日期', width: 150, align: 'left'},
        ]]
    })


}

//插入一行
function addLineHandel(event){
    var _this = $(this);
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