/**
 * Created by zhaoly on 2017/5/24.
 */

function initShopSetting(){
    initGridShopList();
    initgridEquipmentList();
}

function addShop(){

}
var gridShopName = "gridShopList";
var gridEquipment = "gridEquipmentList";
var gridHandel = new GridClass();

function initGridShopList() {
    gridHandel.setGridName(gridShopName);
    $("#"+gridShopName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        showFooter:true,
        height:'50%',
        width:'100%',
        columns:[[
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left'},
            {field: 'branchName', title: '店铺名称', width: 180, align: 'left'},
            {field: 'branchType', title: '店铺类型', width: 80, align: 'left',
                formatter:function(value,row,index){
                    if(value == '1'){
                        return '直营店';
                    }else if(value == '2'){
                        return '加盟店';
                    }else{
                        return '其他类型'+ value;
                    }
                }
            },
            {field: 'batchNo', title: '累计充值金额', width: 130, align: 'right'},
            {field: 'batchNo', title: '提取金额', width: 100, align: 'right'},
            {field: 'batchNo', title: '已用金额', width: 100, align: 'right'},
            {field: 'oldBalance', title: '余额', width: 100, align: 'right'},
            {field: 'status', title: '启用',checkbox:true, width: 80, align: 'left'},
        ]]
    })
}

function initgridEquipmentList() {
    $("#"+gridEquipment).datagrid({
        align:'center',
        rownumbers:true,    //序号
        showFooter:true,
        height:'50%',
        width:'100%',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                     var   str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                            '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';

                    return str;
                },
            },

            {field: 'equipmentCode', title: '设备代码', width: 180, align: 'left'},
            {field: 'key', title: '终端保护密钥', width: 250, align: 'left'}
        ]]
    })
}





function saveSetting(){

}