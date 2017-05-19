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

var dg;
//初始化表格
function initDatagridsupplierList(){
	var updatePermission = $("#updatePermission").html().trim();
	dg = $("#gridSupplierArchiveList").datagrid({
        method:'post',
        align:'center',
        url:contextPath+'/supplier/getSupplierList',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        //fitColumns:true,    //每列占满
        fit:true,            //占满
        showFooter:true,
        columns:[[
            {field:'supplierCode',title:'编号',width:80,align:'left',
                formatter: function(value,row,index){
                    if(updatePermission){
                    	return "<a href='#' onclick=\"editHandel('"+row.id+"')\" class='ualine'>"+value+"</a>";
                	}else{
                		return value;
                	}
                }
            },
        	{field:'supplierName',title:'名称',width:180,align:'left'},
            {field:'saleWayName',title:'经营方式',width:80,align:'left'},
            {field:'supplierAreaName',title:'所在区域',width:120,align:'left'},
            {field:'statusStr',title:'状态',width:100,align:'center'},
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
    searchLeftHandel();
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
        height: 620,
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
        href: contextPath + "/supplier/toCopy",
        queryParams:{
        	id:rowData.id,
        	branchId : gVarBranchId,
        	supplierAreaId : gVarSupplierAreaId
        },
        width: 1000,
        height: 620,
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
        href: contextPath+"/supplier/toEdit",
        queryParams:{
        	id:id,
        	branchId : gVarBranchId,
        	supplierAreaId : gVarSupplierAreaId
        },
        width: 1000,
        height: 620,
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
function exportData(){
	var length = $('#gridSupplierArchiveList').datagrid('getData').rows.length;
	if(length == 0){
		successTip("无数据可导");
		return;
	}
	$('#exportWin').window({
		top:($(window).height()-300) * 0.5,   
	    left:($(window).width()-500) * 0.5
	});
	$("#exportWin").show();
	$("#totalRows").html(dg.datagrid('getData').total);
	$("#exportWin").window("open");
}
// 调用导出方法
function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");
	$("#formList").form({
		success : function(result){
			
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
    
    var supplierId=rowData.id
    
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
	//搜索需要将左侧查询条件清除
	$("#startCount").val('');
	$("#endCount").val('');
	$("#selectBranchId").val('');
    var formData = $('#formList').serializeObject();
    $("#gridSupplierArchiveList").datagrid("options").queryParams = formData;
    $("#gridSupplierArchiveList").datagrid("options").method = "post";
    $("#gridSupplierArchiveList").datagrid("options").url =contextPath+'/supplier/getSupplierList',
    $("#gridSupplierArchiveList").datagrid('load');
}
/**
 * 左侧搜索
 */
function searchLeftHandel(){
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
        addDalogTemp = null;
    }
    if(editDalogTemp){
        $(editDalogTemp).panel('destroy');
        editDalogTemp = null;
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
	// 税票类型下拉框
	var stampsType = $("#stampsTypeVal").val();
	if(stampsType){
		$("#stampsType").val(stampsType);
	}
	
	// 送货时间下拉框
	var deliverTime = $("#deliverTimeVal").val();
	if(deliverTime){
		$("#deliverTime").val(deliverTime);
	}
	// 冻结账款下拉框
	var freezeAccount = $("#freezeAccountVal").val();
	if(freezeAccount){
		$("#freezeAccount").val(freezeAccount);
	}
	
	// 冻结业务下拉框
	var freezeBusiness = $("#freezeBusinessVal").val();
	if(freezeBusiness){
		$("#stampfreezeBusinesssType").val(freezeBusiness);
	}
	
}