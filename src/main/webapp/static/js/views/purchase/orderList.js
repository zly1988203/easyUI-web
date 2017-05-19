/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
    //初始化默认条件
    initConditionParams();
    
    initDatagridOrders();
    if(getUrlQueryString('message')=='0'){
		query();
    }
    //单据状态切换
    changeStatus();
});


//单据状态切换
function changeStatus(){
	$(".radioItem").change(function(){
    	query();
    });
}

//初始化默认条件
function initConditionParams(){
    
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}



var gridHandel = new GridClass();
//初始化表格
function initDatagridOrders(){
	gridHandel.setGridName("gridOrders");
    $("#gridOrders").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
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
        columns:[[
            {field:'check',checkbox:true},
            {field:'formNo',title:'单据编号',width:'140px',align:'left',formatter:function(value,row,index){
            	var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购详细\',\''+contextPath+'/form/purchase/orderEdit?formId='+row.id+'\')">' + value + '</a>';
            	return strHtml;
            }},
            {field:'status',title:'审核状态',width:'100px',align:'center',formatter:function(value,row,index){
            	if(value == '0'){
            		return '待审核';
            	}else if(value == '1'){
            		return '审核通过';
            	}else if(value == '2'){
            		return '审核失败';
            	}else{
            		return '未知类型：'+ value;
            	}
            }},
            {field:'branchName',title:'收货机构',width:'140px',align:'left'},
            {field:'supplierCode',title:'供应商编号',width:'120px',align:'left'},
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'amount',title:'总金额',width:'80px',align:'right',
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
            {field:'dealStatus',title:'单据状态',width:100,align:'center',
				formatter:function(value,row,index){
					if(value == '0'){
						return '未处理';
					}else if(value == '1'){
						return '部分处理';
					}else if(value == '2'){
						return '处理完成';
					}else if(value == '3'){
						return '终止';
					}else{
						return '未知类型：'+ value;
					}
				}
			},
            {field:'updateUserName',title:'操作员',width:'130px',align:'left'},
            {field:'createTime',title:'操作时间',width:'150px',align:'center', formatter: function (value, row, index) {
                if (value) {
                	return new Date(value).format('yyyy-MM-dd hh:mm');
                }
                return "";
            }},
            {field:'validUserName',title:'审核人',width:'130px',align:'left'},
            {field:'remark',title:'备注',width:'200px',align:'left'}
        ]],
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
		}
    });
    query();

    var editId = '';

    $('#pg').treegrid({
        idField: 'id',
        treeField:'name',
        showFooter: true,
        rownumbers: true,
        animate: true,
        collapsible: true,
        fitColumns: true,
        columns:[[
        	{field:'cz',title:'操作',width:'60px',align:'center',
            formatter : function(value, row,index) {
                var str = "";
                if(typeof(row._parentId) != 'undefined'){
                    str = '&nbsp;&nbsp;<a name="del" class="del-line" data-id="'+row.id+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';

                }else{
                    str =  '<a name="add" class="add-line" data-id="'+row.id+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
                }
                return str;
            },
        },

            {field:'name',title:'Task Name',width:180,editor:'text'},
            {field:'persons',title:'Persons',width:60,align:'right',
                formatter : function(value, row, index) {
                    if(typeof(row._parentId) === 'undefined'){
                        var total = 0;
                       var nodes = $("#pg").treegrid("getChildren",row.id);
                       $.each(nodes,function (index,node) {
                           var person = parseFloat(node.persons);
                           if(!isNaN(person)){
                               total += person;
                           }
                       })
                        return '<b>'+parseFloat(total||0).toFixed(2)+'</b>';
                    }

                    if(!value){
                        row["largeNum"] = parseFloat(value||0).toFixed(2);
                    }

                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    value:0,
                    options:{
                        min:0,
                        precision:4,
                    }
                },
            },
        ]],
        onClickRow:function (row) {
            $('#pg').treegrid('endEdit', editId);
        	if(typeof(row._parentId) != 'undefined'){
                editId = row.id;
                $('#pg').treegrid('beginEdit', row.id);
			}
        },
        onBeforeEdit:function(row){
        //这里是功能实现的主要步骤和代码
    }
    ,onAfterEdit:function(row,changes){
            var rowId = row.id;
                var pNode = $("#pg").treegrid("getParent",rowId);
                var total = 0;
                var nodes = $("#pg").treegrid("getChildren",pNode.id);

                $.each(nodes,function (index,node) {
                    var person = parseFloat(node.persons);
                    if(!isNaN(person)){
                        total += person;
                    }
                })
                pNode.persons = total;

            setTimeout(function(){
                $("#pg").treegrid("loadData",$("#pg").treegrid("getData"));
            },10);
        }
});

    var data = {"total":7,"rows":[
        {"id":'2',"name":"Designing","persons":3,"progress":100,},
        {"id":'3',"name":"Coding","persons":2,"progress":80},

    ]}

    $('#pg').treegrid('loadData', data);
}

//插入一行

function addLineHandel(event){
    event.stopPropagation(event);
    var id = $(event.target).attr('data-id')||'0';
    // $("#pg").treegrid("select",id);
    var timestamp=new Date().getTime();
    var gridDefault = [{
        'id':id+"_"+timestamp,
        'name':'新费用'+id+"_"+timestamp,
        'persons':0,
        "progress":100,
        "_parentId":id
    }]

    $("#pg").treegrid("append",{
        parent: id,
        data:gridDefault
    });
    setTimeout(function(){
        $("#pg").treegrid("loadData",$("#pg").treegrid("getData"));
    },10);
}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    var id = $(event.target).attr('data-id');
    $("#pg").treegrid("remove",id)

    setTimeout(function(){
        $("#pg").treegrid("loadData",$("#pg").treegrid("getData"));
    },10);



}

function orderAdd(){
	toAddTab("新增采购订单",contextPath + "/form/purchase/orderAdd");
}

function query(){
	$("#gridOrders").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#gridOrders").datagrid("options").method = "post";
	$("#gridOrders").datagrid("options").url = contextPath+'/form/purchase/listData';
	$("#gridOrders").datagrid("load");
}

//删除
function orderDelete(){
	var rows =$("#gridOrders").datagrid("getChecked");
	if($("#gridOrders").datagrid("getChecked").length <= 0){
		 $.messager.alert('提示','请选中一行进行删除！');
		return null;
	}
	 var formIds='';
	    $.each(rows,function(i,v){
	    	formIds+=v.id+",";
	    });
	
	$.messager.confirm('提示','是否要删除选中数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/form/purchase/delete",
		    	type:"POST",
		    	data:{
		    		formIds:formIds
		    	},
		    	success:function(result){
		    		console.log(result);
		    		if(result['code'] == 0){
		    			successTip("删除成功");
		    		}else{
		    			successTip(result['message']);
		    		}
		    		$("#gridOrders").datagrid('reload');
		    	},
		    	error:function(result){
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

function selectSupplier(){
	new publicSupplierService(function(data){
//		$("#supplierId").val(data.id);
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
	});
}
function selectOperator(){
	new publicOperatorService(function(data){
//		$("#operateUserId").val(data.id);
		$("#operateUserName").val(data.userName);
	});
}

/**
 * 重置
 */
function resetForm(){
	 $("#queryForm").form('clear');
};


function printPreview() {
    var rows = $("#gridOrders").datagrid('getSelections');
    if(rows.length == 1){
        toPrintPreview('PA','/form/purchase/','gridOrders');
    }else{
        messager('请选择一行数据.')
    }
}