$(function(){
	//开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    
    initDatagridRequire();
});
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequire(){
	gridHandel.setGridName("goodsSaleNumReport");
    $("#goodsSaleNumReport").datagrid({
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
		pageSize:50,
		width:'100%',
        columns:[[
            {
                field: 'skuCode', title: '货号', width: '70px', align: 'left',
                formatter: function (value, row, index) {
                    var str = value;
                    if (!value) {
                        return '<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                }
            },
					{field:'skuName', title: '商品名称', width: '200px', align: 'left'},
					{field:'barCode',title:'条码',width:'150px',align:'left'},
					{field:'spec',title:'规格',width:'90px',align:'left'},
					{field:'unit',title:'单位',width:'60px',align:'left'},
					{field:'categoryName',title:'商品类别',width:'80px',align:'left'},
					{field:'saleAmount', title: '销售金额', width: '80px', align: 'right',
						formatter:function(value,row,index){
							if(row.isFooter){
					            return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					        }
					       
					        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					    },
						 editor:{
					         type:'numberbox',
					         options:{
					         	disabled:true,
					             min:0,
					             precision:2
					         }
					     }
					},
					{field:'saleNum', title: '销售量', width: '80px', align: 'right',
						formatter:function(value,row,index){
							if(row.isFooter){
					            return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					        }
					       
					        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					    },
						 editor:{
					         type:'numberbox',
					         options:{
					         	disabled:true,
					             min:0,
					             precision:2
					         }
					     }
					},
					{field:'saleRate', title: '销售量占比(%)', width: '100px', align: 'right',
						formatter:function(value,row,index){
						    if(value){
						    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
						    }
						},
						editor:{
					        type:'numberbox',
					        options:{
					        	disabled:true,
					            min:0,
					            precision:1
					        }
					    }
					},
					{field:'totalRate', title: '累积占比(%)', width: '80px', align: 'right',
						formatter:function(value,row,index){
						    if(value){
						    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
						    }
						},
						editor:{
					        type:'numberbox',
					        options:{
					        	disabled:true,
					            min:0,
					            precision:1
					        }
					    }
					},
					{field:'grade',title:'ABC等级',width:'80px',align:'left'},
      ]],
        onBeforeLoad: function () {
            gridHandel.setDatagridHeader("center");
        }
    });
}

//查询入库单
function queryForm(){
	if($("#branchName").val()==""){
       $_jxc.alert("请选择机构名称");
        return;
    }
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
	$("#goodsSaleNumReport").datagrid("options").method = "post";
	$("#goodsSaleNumReport").datagrid('options').url = contextPath + '/goods/goodsSaleNum/goodsSaleNumList';
	$("#goodsSaleNumReport").datagrid('load', fromObjStr);
}

/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},'BF','');
}

/**
 * 导出
 */
function exportData(){
    var length = $('#goodsSaleNumReport').datagrid('getData').total;
    if(length == 0){
        $_jxc.alert("无数据可导");
        return;
    }
    var param = {
        datagridId:'goodsSaleNumReport',
        formObj:$("#queryForm").serializeObject(),
        url:contextPath+"/goods/goodsSaleNum/exportList"
    }
    publicExprotService(param);
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
	 $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
};