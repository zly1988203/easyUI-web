/**
 * Created by zhaoly on 2017/5/24.
 */


$(function () {
    initGridNoticeList();
})
var gridName = "gridNoticeList";
var gridHandel = new GridClass();
function initGridNoticeList(){
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        // method:'post',
        align:'center',
        // url:contextPath+'/sys/notice/getList',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        fit:true,
        columns:[[
            {field:'noticeCode',title:'公告编号',width:180,align:'left'},
            {field:'title',title:'公告标题',width:180,align:'left',
                formatter: function(value,row,index){
                    return "<a href='#' onclick=\"viewNotice('"+row.id+"')\" class='ualine'>"+value+"</a>";

                }
            },
            {field:'status',title:'状态',width:80,align:'left'},
            {field:'createTime',title:'时间',width:150,align:'left'},
            {field:'publishShops',title:'发布门店',width:150,align:'left'},
            {field:'publishPerson',title:'发布人',width:100,align:'left'},
            {field:'receiveShops',title:'接收门店',width:250,align:'left'},
            {field:'receivePersons',title:'接收人',width:250,align:'left'},
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });

    // var row = {noticeCode:"3333333333",
    //     title:"sdfasdfsadfasdsds",
    //     status:"sdfs",
    //     createTime:"sdfsdf",
    //     publishShops:"sdf",
    //     publishPerson:"sdf",
    //     receiveShops:"sdf",
    //     receivePersons:"sdf"
    // }
    // gridHandel.setLoadData([$.extend({},row)]);
}

/**
 * 搜索
 */
function queryNoticeList(){
    var formData = $('#formList').serializeObject();
    $("#"+gridName).datagrid("options").queryParams = formData;
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url =contextPath+'/sys/notice/getList',
        $("#"+gridName).datagrid('load');
}

var addNoticDialog = null;
var dialogHeight = $(window).height()*(4/5);
var dialogWidth = $(window).width()*(5/9);
var dialogLeft = $(window).width()*(1/5);
function addNotice() {
    addNoticDialog = $('<div/>').dialog({
        href: contextPath+"/sys/notice/addNotice",
        width: 660,
        height: 600,
        left:dialogLeft,
        title: "新增公告",
        closable: true,
        resizable: true,
        onClose: function () {
            $(addNoticDialog).panel('destroy');
            addNoticDialog = null;
        },
        modal: true,
        onLoad: function () {

        }
    })
}

function closeDialogHandel() {
    $(addNoticDialog).panel('destroy');
    addNoticDialog = null;
}

var viewNoticeDialog = null;
function viewNotice(id) {
    viewNoticeDialog = $('<div/>').dialog({
        href: contextPath+"/sys/notice/noticeView?id="+id,
        width: 660,
        height: 600,
        left:dialogLeft,
        title: "新增公告",
        closable: true,
        resizable: true,
        onClose: function () {
            $(viewNoticeDialog).panel('destroy');
            viewNoticeDialog = null;
        },
        modal: true,
        onLoad: function () {

        }
    })
}

function closeViewDialog() {
    $(viewNoticeDialog).panel('destroy');
    viewNoticeDialog = null;
}

function delNotice() {
    var rows = $("#"+gridName).datagrid("checked")
    var formIds='';
    $.each(rows,function(i,v){
        formIds+=v.id+",";
    });

    $.messager.confirm('提示','是否要删除选中数据',function(data){
        if(data){
            var url = contextPath+"/form/purchase/delete";
            var param = {
                formIds:formIds
            }
            this.ajaxSubmit(url,param,function (result) {
                if(result['code'] == 0){
                    messager("删除成功");
                }else{
                    messager(result['message']);
                }
                $("#"+gridName).datagrid('reload');
            })
        }
    });

}

function publishShop() {
    publicBranchService(function(data){
        $("#publishShopId").val(data.branchesId);// id
        $("#publishShopName").val("["+data.branchCode+"]"+data.branchName);
    },0);
}

function receiveShop() {
    publicBranchService(function(data){
        $("#receiveShopId").val(data.branchesId);// id
        $("#receiveShopName").val("["+data.branchCode+"]"+data.branchName);
    },0);
}