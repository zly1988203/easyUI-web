/**
 * Created by 
 * 联营账单-新增 修改
 */


var gridDefault = {
	    costPrice:0,
	}
//列表数据查询url
var url = "";
var oldData = {};
var gridName = "supplierJonAccountAdd";
var superJonAccStatus;
var editRowData = null;
var targetBranchId;


$(function(){
    superJonAccStatus = $('#supplierAdvMoneyStatus').val();
	if(superJonAccStatus === 'add'){
		  $("#payMoneyTime").val(new Date().format('yyyy-MM-dd')); 
	}else if(superJonAccStatus === 'edit'){
		var formId = $("#formId").val();
		url = contextPath+"/form/deliverFormList/getDeliverFormListsById?deliverFormId="+formId+"&deliverType=DA";
		oldData = {
		        targetBranchId:$("#targetBranchId").val(), // 要活分店id
		        remark:$("#remark").val(),                  // 备注
		        formNo:$("#formNo").val(),                 // 单号
		}
	    
	}
	initSupJonAcoAdd();
})

$(document).on('input','#remark',function(){
	var val=$(this).val();
	var str = val;
	   var str_length = 0;
	   var str_len = 0;
	      str_cut = new String();
	      str_len = str.length;
	      for(var i = 0;i<str_len;i++)
	     {
	        a = str.charAt(i);
	        str_length++;
	        if(escape(a).length > 4)
	        {
	         //中文字符的长度经编码之后大于4
	         str_length++;
	         }
	         str_cut = str_cut.concat(a);
	         if(str_length>200)
	         {
	        	 str_cut.substring(0,i)
	        	 remark.value = str_cut;
	        	 break;
	         }
	    }
	
});

var gridHandel = new GridClass();
function initSupJonAcoAdd(){
    gridHandel.setGridName(gridName);
    gridHandel.initKey({
        firstName:'costNo',
        enterName:'costNo',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("costNo");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('costNo'));
                },100)
            }else{
            	selectCost(arg);
            }
        },
    })

    $("#"+gridName).datagrid({
        method:'post',
    	url:url,
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:"100%",
        width:'100%',
        columns:[[
            {field:'branchName',title:'机构',width: '150px',align:'left'},
            {field:'skuCode',title:'货号',width:'120px',align:'left'},
            {field:'skuName',title:'商品名称',width:'100px',align:'left'},
            {field:'skuCode1',title:'条码',width:'100px',align:'left'},
            {field:'guige',title:'规格',width:'100px',align:'left'},
            {field:'unit',title:'单位',width:'100px',align:'left'},
            {field:'saleNum',title:'销售数量',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.saleNum = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'salePrice',title:'销售金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.salePrice = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'linTax',title:'联营扣率',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.linTax = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'linC',title:'分成金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.linC = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'xxTax',title:'销项税率',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.xxTax = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'taxN',title:'税额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.taxN = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            }
        ]],
        onLoadSuccess:function(data){
        	if(superJonAccStatus==='edit'){
                if(!oldData["grid"]){
                	oldData["grid"] = $.map(gridHandel.getRows(), function(obj){
                        return $.extend(true,{},obj);//返回对象的深拷贝
                    });

                }
        	}
            gridHandel.setDatagridHeader("center");
            updateFooter();
        },
    });
    
    if(superJonAccStatus==='add'){
    	 gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
    	                         $.extend({},gridDefault),$.extend({},gridDefault)]);
    }
}

function onChangeAmount(vewV,oldV){
	updateFooter()
}
//合计
function updateFooter(){
    var fields = {amount:0};
    var argWhere = {}
    gridHandel.updateFooter(fields,argWhere);
}

//插入一行
function addLineHandel(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    gridHandel.addRow(index,gridDefault);
}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridHandel.delRow(index);
}



//保存
function saveSupJonAccount(){
    
}

//审核
function check(){
    
}

//删除
function delSupJonAccount(){
	var ids = [];
	ids.push($("#formId").val());
	$.messager.confirm('提示','是否要删除单据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/form/deliverForm/deleteDeliverForm",
		    	type:"POST",
		    	contentType:"application/json",
		    	data:JSON.stringify(ids),
		    	success:function(result){
		    		if(result['code'] == 0){
                        toRefreshIframeDataGrid("settle/supplierChain/chainList","supperlierJoAccount");
		    			toClose();
		    		}else{
		    			successTip(result['message']);
		    		}
		    	},
		    	error:function(result){
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

//机构
function selectBranches(){
	new publicAgencyService(function(data){
		$("#targetBranchId").val(data.branchesId);
		$("#targetBranchName").val("["+data.branchCode+"]"+data.branchName);
	},'',targetBranchId);
}

//选择供应商
function selectSupplier(){
    new publicSupplierService(function(data){
    	$('#linkman').val(data.supplierName||'');//联系人
    	$('#linkTel').val((data.mobile?data.mobile:'')+(data.phone?'/'+data.phone:''));//联系人
    	$("#supplierId").val(data.id);
        $("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);	
        
    });
}

//选择费用
function selectCost(searchKey){
	var param = {
		key:searchKey,
	};
	publicCostService(param,function(data){
		console.log('data',data);
	});

}

//返回列表页面
function back(){
	location.href = contextPath+"/settle/supplierChain/chainList";
}

//新增联营账单
function addSupJonAccount(){
	toAddTab("新增联营账单",contextPath + "/settle/supplierChain/chainAdd");
}
