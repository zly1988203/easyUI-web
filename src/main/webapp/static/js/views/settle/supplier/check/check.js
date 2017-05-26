/**
 * Created by 
 * 供应商对账单-新增 修改
 */


var gridDefault = {
	    costPrice:0,
	}
//列表数据查询url
var url = "";
var oldData = {};
var gridName = "supplierChkAccountAdd";
var pageStatus;
var editRowData = null;
var targetBranchId;


$(function(){
    pageStatus = $('#operateType').val();
	if(pageStatus === 'add'){
		
	}else if(pageStatus === 'edit'){
		var formId = $("#formId").val();
		url = contextPath+"/settle/supplierCheck/checkFormDetailList?formId="+formId;
		oldData = {
		        targetBranchId:$("#branchId").val(), // 要活分店id
		        remark:$("#remark").val(),                  // 备注
		        formNo:$("#formNo").val(),                 // 单号
		}
	    
	}
	initSupChkAcoAdd();
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
function initSupChkAcoAdd(){
    gridHandel.setGridName(gridName);
    gridHandel.initKey({
        firstName:'costNo',
        enterName:'costNo'
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
            {field:'cb',checkbox:true},
            {field:'orderNo',title:'单号',width: '150px',align:'left',
            	formatter:function(value,row,index){
            		var str = "";
            		if(row.isFooter){
                        str ='<div class="ub ub-pc">合计</div> '
                    }
            		return str;
            	}
            },
            {field:'targetFormType',title:'单据类型',width:'120px',align:'left'},
            {field:'branchCode',title:'机构编号',width:'120px',align:'left'},
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field:'supplierCode',title:'供应商编号',width:'120px',align:'left'},
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'payableAmount',title:'应付金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.yfPrice = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'discountAmount',title:'优惠金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.yhPrice = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	},
            	editor:{
            		type:'numberbox',
            		options:{
            			min:0,
            			precision:4,
            		}
            	}
            },
            {field:'unpayAmount',title:'未付金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.wfPrice = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	},
            	editor:{
            		type:'numberbox',
            		options:{
            			min:0,
            			precision:4,
            		}
            	}
            },
            {field:'remark',title:'备注',width:'180px'}
        ]],
        onClickCell:function(rowIndex,field,value){
            gridHandel.setBeginRow(rowIndex);
            gridHandel.setSelectFieldName(field);
            var target = gridHandel.getFieldTarget(field);
            if(target){
                gridHandel.setFieldFocus(target);
            }else{
                gridHandel.setSelectFieldName("yhPrice");
            }
        },
        onLoadSuccess:function(data){
        	if(pageStatus==='edit'){
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
    
    if(pageStatus==='add'){
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
function saveSupChkForm(){
    
}

//审核
function check(){
    
}

//删除
function delSupChkAccount(){
	var ids = [];
	ids.push($("#formId").val());
	$_jxc.confirm('是否要删除单据',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/settle/supplierCheck/deleteCheckForm",
		    	contentType:"application/json",
		    	data:{"ids":ids}
		    },function(result){
	    		if(result['code'] == 0){
                    toRefreshIframeDataGrid("settle/supplierCheck/getCheckList","supplierAdvMoneyList");
	    			toClose();
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
		    });
		}
	});
}

//机构
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchCode").val(data.branchCode);
		$("#targetBranchName").val("["+data.branchCode+"]"+data.branchName);
	},'',targetBranchId);
}

//选择供应商
function selectSupplier(){
    new publicSupplierService(function(data){
    	console.log(data);
    	
    	//开户银行
    	$('#bankName').val((data.mobile?data.mobile:'')+(data.phone?'/'+data.phone:''));
    	//银行账户
    	$('#bankNum').val((data.mobile?data.mobile:'')+(data.phone?'/'+data.phone:''));
    	
    	//办公地址
    	$('#workPlace').val((data.mobile?data.mobile:'')+(data.phone?'/'+data.phone:''));
    	//国税登记
    	$('#gtaxNum').val((data.mobile?data.mobile:'')+(data.phone?'/'+data.phone:''));
    	
    	$('#linkTel').val((data.mobile?data.mobile:'')+(data.phone?'/'+data.phone:''));//联系人
    	
    	$("#supplierId").val(data.id);
        $("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);	
        
    });
}

function getCheckData(){
	
	//开启异步
//	$_jxc.ajax({
//		url:'',
//		data:{}
//	},function(result){
//		console.log(result)
//	})
	
}



//返回列表页面
function back(){
	location.href = contextPath+"/settle/supplierCheck/checkList";
}

//新增供应商对账单
function addSupChkForm(){
	toAddTab("新增供应商对账单",contextPath + "/settle/supplierCheck/checkAdd");
}
