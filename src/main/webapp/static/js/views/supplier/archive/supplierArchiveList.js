/**
 * Created by huangj02 on 2016/10/12.
 */

var gridHandel = new GridClass();

$(function(){
    initTreeArchives();
    initDatagridsupplierList();
});
/**
 * 初始树
 */
function initTreeArchives(){
    var args = {};
    var httpUrl = contextPath+"/supplier/getBranchSupplierAreaToTree";
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
        $.fn.zTree.init($("#treeArchives"), setting, JSON.parse(data));
        var treeObj = $.fn.zTree.getZTreeObj("treeArchives");
        var nodes = treeObj.getNodes();
        if (nodes.length>0) {
            treeObj.expandNode(nodes[0], true, false, true);
        }
    });
}

//初始化表格
function initDatagridsupplierList(){
	var updatePermission = $("#updatePermission").html().trim();
    $("#gridSupplierArchiveList").datagrid({
        method:'post',
        align:'center',
        url:contextPath+'/supplier/getSupplierList',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:10,
        //fitColumns:true,    //每列占满
        fit:true,            //占满
        showFooter:true,
        columns:[[
            {field:'supplierCode',title:'编号',width:80,align:'left',
                formatter: function(value,row,index){
                    if(updatePermission){
                    	return "<a href='#' onclick=\"editHandel('"+row.supplierId+"')\" class='ualine'>"+value+"</a>";
                	}else{
                		return value;
                	}
                }
            },
        	{field:'supplierName',title:'名称',width:180,align:'left'},
            {field:'saleWayName',title:'经营方式',width:80,align:'left'},
            {field:'supplierAreaName',title:'所在区域',width:120,align:'left'},
            {field:'statusStr',title:'状态',width:100,align:'left'},
            {field:'contcat',title:'联系人',width:120,align:'left'},
            {field:'mobile',title:'手机号码',width:120,align:'left'},
            {field:'branchName',title:'所属机构',width:120,align:'left'},
            {field:'createUserName',title:'创建人',width:120,align:'left'},
            {field:'createTime',title:'创建时间',width:180,align:'left',
            	formatter : function(value, rowData, rowIndex) {
            		return formatDate(value);
            	}
            },
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });
}


//交互方法========================================================================

var  addDalogTemp;
var  editDalogTemp;

var gVarBranchId = "";
var gVarSupplierAreaId = "";

//选择树节点
function zTreeOnClick(event, treeId, treeNode) {
    if(treeNode.type=="branch"){//选择机构
        gVarBranchId = treeNode.id;
        gVarSupplierAreaId = "";
    }else if(treeNode.type=="area"){//选择区域
        gVarBranchId = treeNode.pid
        gVarSupplierAreaId = treeNode.id;
    }
    searchHandel();
    $("#selectBranchId").val(gVarBranchId);
}
/**
 * 新增
 */
function addHandel(){
    addDalogTemp = $('<div/>').dialog({
        href: contextPath+"/supplier/toAdd",
        queryParams:{
        	branchId : gVarBranchId,
        	supplierAreaId : gVarSupplierAreaId
        },
        width: 1000,
        height: 680,
        title: "供应商档案-新增",
        closable: true,
        resizable: true,
        onClose: function () {
            $(addDalogTemp).panel('destroy');
        },
        modal: true,
        onLoad: function () {
        }
    })
}
/**
 * 复制
 */
function copyHandel(){
	var rowData = $("#gridSupplierArchiveList").datagrid("getSelected"); 
    
    if(rowIsNull(rowData)){
    	return;
    }
    addDalogTemp = $('<div/>').dialog({
        href: contextPath + "/supplier/toCopy?id="+rowData.supplierId,
        width: 1000,
        height: 680,
        title: "供应商档案-新增",
        closable: true,
        resizable: true,
        onClose: function () {
            $(addDalogTemp).panel('destroy');
        },
        modal: true,
        onLoad: function () {
        }
    });
}
/**
 * 修改
 */
function editHandel(id){
    editDalogTemp = $('<div/>').dialog({
        href: contextPath+"/supplier/toEdit?id="+id,
        width: 1000,
        height: 680,
        title: "供应商档案-修改",
        closable: true,
        resizable: true,
        onClose: function () {
            $(editDalogTemp).panel('destroy');
        },
        modal: true,
        onLoad: function () {
        }
    })
}

/**
 * 导出
 */
function exportHandel(){
	var isValid = $("#formList").form('validate');
	if(!isValid){
		return;
	}
	var length = $("#gridSupplierArchiveList").datagrid('getData').total;
	if(length == 0){
		$.messager.alert("提示","无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#formList").form({
		success : function(data){
			if(data==null){
				$.messager.alert('提示',"导出数据成功！");
			}else{
				$.messager.alert('提示',JSON.parse(data).message);
			}
		}
	});
	$("#formList").attr("action",contextPath+"/supplier/exportHandel");
	$("#formList").submit();
}

/**
 * 删除
 */
function delHandel(){
	var rowData = $("#gridSupplierArchiveList").datagrid("getSelected"); 
    if(rowIsNull(rowData)){
    	return;
    }
    
    var supplierId=rowData.supplierId
    
    parent.$.messager.confirm('提示', '是否确认删除？此操作删除不可恢复', function(data){
    	if(!data){
    		return;
    	}
    	$.ajax({
            url:contextPath+"/supplier/deleteSupplier",
            type:"POST",
            data:{"supplierId":supplierId},
            dataType:"json",  
            success:function(result){
                if(result){
                    successTip(result.message, $("#gridSupplierArchiveList"));
                }
            },
            error:function(result){
                successTip("请求发送失败或服务器处理失败");
            }
        });
    });
}
/**
 * 搜索
 */
function searchHandel(){
    var formData = $('#formList').serializeObject();
    var postParams = $.extend(formData,{branchId:gVarBranchId,supplierAreaId:gVarSupplierAreaId})
    $("#gridSupplierArchiveList").datagrid("options").queryParams = postParams;
    $("#gridSupplierArchiveList").datagrid("options").method = "post";
    $("#gridSupplierArchiveList").datagrid("options").url =contextPath+'/supplier/getSupplierList',
    $("#gridSupplierArchiveList").datagrid('load');
}
function reloadListHandel(){
    $("#gridSupplierArchiveList").datagrid('reload');
    closeDialogHandel();
}
function closeDialogHandel(){
    if(addDalogTemp){
        $(addDalogTemp).panel('destroy');
    }
    if(editDalogTemp){
        $(editDalogTemp).panel('destroy');
    }
}
/**
 * 供应商区域选择事件
 */
function bindSupplierAreaSelect(){
	$("#supplierAreaId").change(function(){
		var supplierAreaCode = $(this).children('option:selected').attr("code");
		$("#supplierAreaCode").val(supplierAreaCode);
	});
}

/**
 * 初始化下拉框的默认值
 */
function selectParamInit(){
	$("#stampsType").val($("#stampsTypeVal").val());
	$("#deliverTime").val($("#deliverTimeVal").val());
	$("#freezeAccount").val($("#freezeAccountVal").val());
	$("#freezeBusiness").val($("#freezeBusinessVal").val());
}