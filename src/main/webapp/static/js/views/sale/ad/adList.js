/**
 * Created by zhaoly on 2017/8/17.
 */
$(function () {
    // 开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initgridAdList();
})

var gridName = "gridAdList";
var gridAdListHandle = new GridClass();
function initgridAdList() {
        $("#"+gridName).datagrid({
            align:'center',
            //toolbar: '#tb',     //工具栏 id为tb
            singleSelect:true,  //单选  false多选
            rownumbers:true,    //序号
            pagination:true,    //分页
            fitColumns:true,    //每列占满
            //fit:true,            //占满
            showFooter:true,
            height:'100%',
            width:'100%',
            pageSize:50,
            columns:[[
                {field:'ck',checkbox:true},
                {field:'id',title:'id',width:'85px',align:'left',hidden:true},
                {field:'adNo',title:'编号',width: '70px',align:'left'},
                {field:'adName',title:'广告名称',width:'200px',align:'left'},
                {field:'statue',title:'展示状态',width: '70px',align:'left'},
                {field: 'startTime', title: '开始时间', width:140, align: 'left'},
                {field: 'endTime', title: '结束时间', width:140, align: 'left',
                    formatter:function(value,row,index){
                        return formatDate(value);
                    }
                },
                {field: 'createUserName', title: '制单人', width:100, align: 'left'},
                {field: 'validUserName', title: '审核人', width:120, align: 'left'},
                {field: 'validTime', title: '审核时间', width:140, align: 'left',
                    formatter:function(value,row,index){
                        return formatDate(value);
                    }
                },
                {field:'remark',title:'备注',width:'200px',align:'left'},
            ]],
            onLoadSuccess:function(data){
                gridAdListHandle.setDatagridHeader("center");
            }
        })

}

function queryAD() {
    var formData = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").url = "";
    $("#"+gridName).datagrid("options").queryParams = formData;
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url =  contextPath+"/sale/activityDetailReport/reportListPage";
    $("#"+gridName).datagrid("load");
}

function adAdd() {
    toAddTab("新增客屏广告",contextPath + "/pos/ad/form/add");
}


function adDelete() {
    var rows = $("#keygrid").datagrid("getChecked");
    if(rows.length <= 0){
        $_jxc.alert("请选择数据");
        return;
    }

    var ids = [];
    for(var i=0; i<rows.length; i++){
        ids.push(rows[i].deliverFormId);
    }

    $_jxc.confirm('是否要删除选中数据?',function(data){
        if(data){
            $_jxc.ajax({
                url:contextPath+"/form/deliverForm/deleteDeliverForm",
                contentType:"application/json",
                data:JSON.stringify(ids)
            },function(result){
                if(result['code'] == 0){
                    $_jxc.alert("删除成功");
                    dg.datagrid('reload');
                }else{
                    $_jxc.alert(result['message']);
                }
            });
        }
    })
}