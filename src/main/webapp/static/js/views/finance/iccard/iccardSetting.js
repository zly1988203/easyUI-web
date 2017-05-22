/**
 * Created by zhaoly on 2017/5/22.
 */

$(function () {
    initGridCardSetting();
})

var gridName = "gridCardSetting";
var gridHandel = new GridClass();
function initGridCardSetting() {
    gridHandel.setGridName(gridName);

    $("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        showFooter:true,
        height:500,
        width:600,
        columns:[[
            {field: 'cardType', title: '一卡通类型', width: 180, align: 'left',
                formatter:function(value,row,index){
                    if(value == '1'){
                        return '东莞通';
                    }else if(value == '2'){
                        return '深圳通';
                    }else if(value == '3'){
                        return '合肥通';
                    }else{
                        return '一卡通：'+ value;
                    }
                }
            },
            {field: 'branchName', title: '启用', width: 80, align: 'left'},
            {field: 'cz', title: '操作', width: 180, align: 'right',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" onclick="openShopLis('+row.cardType+')" ' +
                        'style="cursor:pointer;display:inline-block;text-decoration:none;">'+'开通店铺列表'+'</a>';

                    return str;
                },
            },
        ]]
    })
}

function saveCardSetting() {
    
}

var cardDialog = null;
function addCard() {
    cardDialog = $('<div/>').dialog({
        href: contextPath+"/iccard/setting/addIcCardType",
        width:500,
        height:500,
        title: "一卡通设置",
        closable: true,
        resizable: true,
        onClose: function () {
            $(cardDialog).panel('destroy');
            cardDialog = null;
        },
        modal: true,
        onLoad: function () {

        }
    })
}

function delCard() {
    
}

function openShopLis(cardType) {

}