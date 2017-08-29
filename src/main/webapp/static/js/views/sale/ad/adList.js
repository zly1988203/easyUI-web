/**
 * Created by zhaoly on 2017/8/17.
 */
$(function () {
    // 开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initgridAdList();
    
    $(".radioItem").change(function () {
        queryAD();
    })

    //选择初始化
    $('#operatorComponent').operatorSelect({
        //数据过滤
        loadFilter:function(data){
            data.operateUserId = data.id;
            data.operateUserName = data.name;
            return data;
        }
    });
})

var gridName = "gridAdList";
var gridAdListHandle = new GridClass();
function initgridAdList() {
        $("#"+gridName).datagrid({
            align:'center',
            //toolbar: '#tb',     //工具栏 id为tb
            singleSelect:false,  //单选  false多选
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
                {field:'formNo',title:'编号',width: '150px',align:'left',formatter:function(value,row,index){
                    var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看POS客屏广告\',\''+contextPath+'/pos/ad/form/edit/'+row.id+'\')">' + value + '</a>';
                    return strHtml;
                }},
                {field:'adName',title:'广告名称',width:'200px',align:'left'},
                {field:'auditStatus',title:'展示状态',width: '70px',align:'left',formatter:function(value,row,index){
                    if(value == '0'){
                        return '未审核';
                    }else if(value == '1'){
                        return '已审核';
                    }else if(value == '2'){
                        return '已终止';
                    }else{
                        return '未知类型：'+ value;
                    }
                }},
                {field:'beginDateStr', title:'展示开始日期', width:140, align: 'left'},
                {field:'overDateStr', title:'展示结束日期', width:140, align: 'left'},
                {field:'createUserName', title: '制单人', width:100, align: 'left'},
                {field:'auditUserName', title: '审核人', width:120, align: 'left'},
                {field:'createTimeStr', title: '制单时间', width:140, align: 'left'},
                {field:'remark',title:'备注',width:'200px',align:'left'},
            ]],
            onLoadSuccess:function(data){
                gridAdListHandle.setDatagridHeader("center");
            }
        })
    queryAD();
}

function queryAD() {
    var formData = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").url = "";
    $("#"+gridName).datagrid("options").queryParams = formData;
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url =  contextPath+"/pos/ad/form/list";
    $("#"+gridName).datagrid("load");
}

function adAdd() {
    toAddTab("新增客屏广告",contextPath + "/pos/ad/form/add");
}


function adDelete() {
    var rows = $("#"+gridName).datagrid("getChecked");
    if(rows.length <= 0){
        $_jxc.alert("请选择数据");
        return;
    }

    var ids = [];
    var isCanDel = true;
    for(var i=0; i<rows.length; i++){
        if(rows[i].auditStatus != 0){
            isCanDel = false;
        }
        ids.push(rows[i].id);
    }

    if(!isCanDel){
        $_jxc.alert("选中的数据有已审核或者已终止的数据，不能删除");
        return;
    }

    $_jxc.confirm('是否要删除选中数据?',function(data){
        if(data){
            $_jxc.ajax({
                url:contextPath+"/pos/ad/form/del",
                data:{
                    "ids[]":ids
                }
            },function(result){
                if(result['code'] == 0){
                    $_jxc.alert("删除成功");
                    $("#"+gridName).datagrid('reload');
                }else{
                    $_jxc.alert(result['message']);
                }
            });
        }
    })
}