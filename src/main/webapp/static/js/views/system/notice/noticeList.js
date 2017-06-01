/**
 * Created by zhaoly on 2017/5/24.
 */


$(function () {
    initGridNoticeList();
    $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    if(getUrlQueryString('message')=='0'){
    	queryNoticeList();
    }
})
var gridName = "gridNoticeList";
var gridHandel = new GridClass();
function initGridNoticeList(){
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        // method:'post',
        align:'center',
        // url:contextPath+'/sys/notice/getList',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        fit:true,
        columns:[[
            {field:'check',checkbox:true},
            {field:'noticeNo',title:'公告编号',width:180,align:'left'},
            {field:'title',title:'公告标题',width:180,align:'left',
                formatter: function(value,row,index){
                    return "<a href='#' onclick=\"viewNotice('"+row.id+"')\" class='ualine'>"+value+"</a>";
                }
            },
            {field:'isRead',title:'状态',width:80,align:'center',
                formatter: function(value,row,index){
                    if(value == 0){
                    	return "未查阅";
                    }else{
                    	return "已查阅";
                    }
                }
            },
            {field:'createTime',title:'时间',width:150,align:'left',
                formatter: function(value,row,index){
                	if (value) {
						return new Date(value).format('yyyy-MM-dd hh:mm:ss');
					}
					return "";
                }
            },
            {field:'publishBranchName',title:'发布门店',width:150,align:'left'},
            {field:'publishUserName',title:'发布人',width:100,align:'left'},
            {field:'receiveBranchName',title:'接收门店',width:250,align:'left'},
            {field:'receiveUserName',title:'接收人',width:250,align:'left'},
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
    var formData = $('#queryForm').serializeObject();
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
        title: "系统公告详情",
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
    var rows = $("#"+gridName).datagrid("getChecked")
    var formIds=[];
    $.each(rows,function(i,v){
        formIds.push(v.id);
    });

    $.messager.confirm('提示','是否要删除选中数据',function(data){
        if(data){
            var url = contextPath+"/sys/notice/delete";
            var param = {
                "url":contextPath+"/sys/notice/delete",
                data: {
                    "ids":formIds,
                },
            }
            $_jxc.ajax(param,function (result) {
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
        $("#branchId").val(data.branchesId);// id
        $("#publishBranchName").val("["+data.branchCode+"]"+data.branchName);
    },0);
}

function receiveShop() {
    publicBranchService(function(data){
        $("#receiveBranchId").val(data.branchesId);// id
        $("#receiveBranchName").val("["+data.branchCode+"]"+data.branchName);
    },0);
}