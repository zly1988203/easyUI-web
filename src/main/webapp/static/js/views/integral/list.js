/**
 * Created by zhanghuan on 2016/08/09.
 */
var dg;
$(function(){
    //初始化列表
	initGrid();
    queryList();
    
});

var gridHandel = new GridClass();
function initGrid() {
     dg=$("#dataListGrid").datagrid({
        method: 'post',
        align: 'center',
        url: '',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
         height:'100%',
         pageSize:20,
        columns: [[
            {field:'check',checkbox:true},
            {field: 'id', title: '礼品主键', width: '0px;',hidden:true},
            {field: 'skuId', title: '标准商品主键', width: '0px;', hidden:true},
            {field: 'picUrl', title: '标准商品图片url', width: '0px;', hidden:true},
            {field:'skuCode',title:'货号',width:'200px',align:'left',
            	formatter: function(value,row,index){
                    return "<a  onclick=\"openDialog('"+contextPath+"/integral/giftManager/updateView?id="+row.id+"')\" class='ualine'>"+value+"</a>";
            	}
             },
            {field: 'skuName', title: '礼品名称', width: '200px', align: 'left'},
            {field: 'barCode', title: '条码', width: '200px', align: 'left'},
            {field: 'branchName', title: '机构名称', width: '200px', align: 'left'},
            {field: 'num', title: '兑换数量', width: '200px', align: 'right',
            	formatter: function(value,row,index){
            		return '<b>'+(value||0)+'</b>'
            	}
            },
            {field: 'integral', title: '兑换积分值', width: '120px', align: 'right',
            	formatter: function(value,row,index){
            		return '<b>'+(value||0)+'</b>'
            	}
            },
            {field: 'status', title: '礼品状态', width:'120px', align: 'center',
                formatter: function(value,row,index){
                    if (value==0){
                        return "未生效";
                    } else if(value==1){
                    	return "兑换中";
                    } else {
                        return "已失效";
                    }
                }
            },
            {field: 'startTime', title: '开始时间', width: '200px', align: 'left',
            	formatter: function (value, row, index) {
	                if (value != null && value != '') {
	                    var date = new Date(value);
	                    return date.format("yyyy-MM-dd");
	                }
	                return "";
	            }
            },
            {field: 'endTime', title: '结束时间', width: '200px', align: 'left',
            	formatter: function (value, row, index) {
            		if (value != null && value != '') {
            			var date = new Date(value);
            			return date.format("yyyy-MM-dd");
            		}
            		return "";
            	}
            }
        ]],
         onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
         }
    });
}
//新增
function add(){
	toAddTab("新增礼品",contextPath + "/integral/giftManager/add");
}


//删除
function deleteData(){
	var rows =$("#dataListGrid").datagrid("getChecked");
	if($("#dataListGrid").datagrid("getChecked").length <= 0){
		 $_jxc.alert('请选中一行进行删除！');
		return null;
	}
	 var ids='';
	 $.each(rows,function(i,v){
	    	ids+=v.id+",";
	    });
	$.messager.confirm('提示','是否确定要删除选中的礼品',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/integral/giftManager/delete",
		    	type:"POST",
		    	data:{
		    		ids:ids
		    	},
		    	success:function(result){
		    		console.log(result);
		    		if(result['code'] == 0){
		    			$_jxc.alert("删除成功");
		    		}else{
		    			$_jxc.alert(result['message']);
		    		}
		    		$("#dataListGrid").datagrid('reload');
		    	},
		    	error:function(result){
		    		$_jxc.alert("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

//查询
function queryList(){
	var fromObjStr = $('#searchForm').serializeObject();
  // 去除编码
  fromObjStr.branchNameOrCode = fromObjStr.branchNameOrCode.substring(fromObjStr.branchNameOrCode.lastIndexOf(']')+1)
	dg.datagrid('options').method = "post";
	dg.datagrid('options').url = contextPath+'/integral/giftManager/getList';
	dg.datagrid('load', fromObjStr);
}

/**
 * 机构列表下拉选
 */
function selectBranch (){
	new publicAgencyService(function(data){
    console.log(data)
		$("#branchNameOrCode").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}

/**
 * 重置
 */
var resetForm = function(){
	 $("#searchForm").form('clear');
};

var dalogTemp;
function openDialog(argUrl) {
  dalogTemp = $('<div/>').dialog({
      href: argUrl,
      width: 400,
      height: 450,
      title: "修改礼品",
      closable: true,
      resizable: true,
      onClose: function () {
          $(dalogTemp).panel('destroy');
      },
      modal: true,
      onLoad: function () {
    	  $("#dataListGrid").datagrid('reload');
      }
  })
}
//新增
function giftManagerAdd(){
	toAddTab("新增礼品",contextPath + "/integral/giftManager/addView");
}

//关闭
function closeDialog(){
    $(dalogTemp).panel('destroy');
}