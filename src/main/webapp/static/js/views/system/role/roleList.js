/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
	initTreeRoles();
    initDatagrid();
});

function initTreeRoles(){
    var args = {};
    var httpUrl = contextPath+"/system/role/getBranchRoleToTree";
    $.get(httpUrl, args,function(data){
        var setting = {
            data: {
                key:{
                    name:'codeText',
                },
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPId: 0
                }
            },
            callback: {
                onClick: zTreeOnClick
            }
        };
        $.fn.zTree.init($("#treeBranchRoles"), setting, JSON.parse(data));
        var treeObj = $.fn.zTree.getZTreeObj("treeBranchRoles");
        var nodes = treeObj.getNodes();
        if (nodes.length>0) {
            treeObj.expandNode(nodes[0], true, false, true);
        }
    });
}

var selectBranchCompleCode = "";
var selectRoleId = "";

//选择树节点
function zTreeOnClick(event, treeId, treeNode) {
    if(treeNode.type=="branch"){//选择机构
    	selectBranchCompleCode = treeNode.code;
    	selectRoleId = "";
    }else if(treeNode.type=="role"){//选择区域
    	selectBranchCompleCode = "";
    	selectRoleId = treeNode.id;
    }
    $("#selectBranchCompleCode").val(selectBranchCompleCode);
    $("#selectRoleId").val(selectRoleId);
    searchLeftHandel();
    
}

/**
 * 左侧搜索
 */
function searchLeftHandel(){
	var formData = $('#queryForm').serializeObject();
	$("#dg").datagrid("options").queryParams = formData;
	$("#dg").datagrid("options").method = "post";
	$("#dg").datagrid("load");
}

var gridHandel = new GridClass();
//初始化表格
function initDatagrid(){
	var updatePermission = $("#updatePermission").html().trim();
    $("#dg").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:contextPath+'/system/role/getRoleList',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        //fitColumns:true,    //每列占满
        fit:true,            //占满
        showFooter:true,
        columns:[[
            {field:'check',checkbox:true},
            {field:'roleCode',title:'角色编码',sortable:true,width:180,formatter:function(value,row,index){
            	if(updatePermission){
            		return "<a style='text-decoration: underline;' onClick='toUpdateRole(\""+row.id+"\")'>" + value + "</a>"
            	}else{
            		return value;
            	}
            }},    
            {field:'roleName',title:'角色名称',sortable:true,width:180},
            {field:'branchTypeStr',title:'机构类型',sortable:true,width:120},
            {field:'branchName',title:'机构名称',sortable:true,width:120},
            {field:'userCount',title:'关联用户',sortable:true,width:80},
            {field:'createTime',title:'创建时间',sortable:true,width:150,
            	formatter : function(value, rowData, rowIndex) {
            		return formatDate(value);
            	}
            }
        ]],
        onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
        
    });
}

function queryRoleList(){
	var formData = $("#queryForm").serializeObject();
	$("#dg").datagrid("options").queryParams = formData;
	$("#dg").datagrid("options").method = "post";
	$("#dg").datagrid("load");
}


function toAddRole(){
	openDialog(contextPath+"/system/role/toAddRole","新增角色","add");
}

function toUpdateRole(id){
	openDialog(contextPath+"/system/role/toUpdateRole?roleId="+id,"修改角色","edit");
}

var  dalogTemp;
//打开Dialog
function openDialog(argUrl,argTitle,argType) {
  dalogTemp = $('<div/>').dialog({
      href: argUrl,
      top:200,
      width:580,
//      height: 400,
      title: argTitle,
      closable: true,
      resizable: true,
      onClose: function () {
          $(dalogTemp).panel('destroy');
      },
      modal: true,
      onLoad: function () {

      }
  })
}
function reloadDataGrid(){
    $("#dg").datagrid('reload');
    closeDialog();
}
function closeDialog(){
    if(dalogTemp){
        $(dalogTemp).panel('destroy');
    }
}

function deleteRole(){
	var rowData = $("#dg").datagrid("getSelected"); 
    if(rowIsNull(rowData)){
    	return;
    }
    
    var roleId=rowData.id
    
    parent.$.messager.confirm('提示', '是否确认删除？此操作删除不可恢复', function(data){
    	if(!data){
    		return;
    	}
    	$.ajax({
            url:contextPath+"/system/role/deleteRole",
            type:"POST",
            data:{"roleId":roleId},
            dataType:"json",  
            success:function(result){
                if(result){
                    successTip(result.message, $("#dg"));
                }
            },
            error:function(result){
                successTip("请求发送失败或服务器处理失败");
            }
        });
    });
}

function toProduceAuth(){
	var rowData = $("#dg").datagrid("getSelected"); 
    if(rowIsNull(rowData)){
    	return;
    }
    
    var roleId=rowData.id
    
    toAddTab("分配权限",contextPath + "/system/role/toProduceAuth?roleId="+roleId);
}