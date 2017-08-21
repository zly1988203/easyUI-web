/**
 * Created by 
 * 加盟店毛利结算-新增 修改
 */


var gridDefault = {
	    costPrice:0
	}
//列表数据查询url
var url = "";
var gridName = "proFitAdd";
var pageStatus;

$(function(){
    pageStatus = $('#pageStatus').val();
	if(pageStatus === 'add'){
		  $("#payMoneyTime").val(new Date().format('yyyy-MM-dd')); 
		  $('#createTime').text(new Date().format('yyyy-MM-dd hh:mm'));
		// 机构默认有值
//		  if(sessionBranchType == '4' || sessionBranchType == '5'){
//			$('#franchiseBranchId').val(sessionBranchId);
//			$('#branchCode').val(sessionBranchCode);
//			$('#franchiseBranchName').val(sessionBranchCodeName)
//		  }
	}else if(pageStatus === 'edit'){
		/*var formId = $("#formId").val();
		url = contextPath+"/settle/franchiseProfitSettle/getDetailList?formId="+formId;
		oldData = {
		        remark:$("#remark").val(),                  // 备注
		        payType:$('input[type="hidden"][name="payType"]').val()||'',   //支付方式
		}*/
	    
	}
	
	initSupChkAcoAdd();
	
	if(pageStatus === 'add'){
		//机构选择初始化
		$('#branchComponent').branchSelect({
			//ajax请求参数
			param:{
				branchTypesStr:$_jxc.branchTypeEnum.FRANCHISE_STORE_B + ',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_C
			},
			//选择完成之后
			onAfterRender:function(data){
				initProfitFormDetail();
			},
			//选择之前
			onShowBefore:function(){
				if(!$('#beginDate').val()){
					$_jxc.alert('请选择计算开始时间');
					return false;
				}
				if(!$('#endDate').val()){
					$_jxc.alert('请选择计算结束时间');
					return false;
				}
				return true;
			},
		});
	}
	
})

//解决bug 19930
function filterData(e){
	gridHandel.endEditRow();
}

//支付方式 默认勾选第一个
function loadFilter(data){
	if(pageStatus === 'add'){
		data[0].selected = true
	}
	return data;
}


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
        firstName:'actualAmount'
    })

    $("#"+gridName).datagrid({
        method:'post',
    	url:url,
        align:'center',
        singleSelect:false,  //单选  false多选
        checkOnSelect:false,
        rownumbers:true,    //序号
        showFooter:true,
        height:"100%",
        width:'100%',
        columns:[[
            {field:'cb',checkbox:true},
            {field:'franchiseBranchCode',title:'加盟店编号',width:'120',align:'left'},
            {field:'franchiseBranchName',title:'加盟店名称',width:'140',align:'left'},
            {field:'skuCode',title:'货号',width:'140',align:'left'},
            {field:'skuName',title:'商品名称',width:'140',align:'left'},
            {field:'barCode',title:'条码',width:'140',align:'left'},
            {field:'spec',title:'规格',width:'60',align:'left'},
            {field:'unit',title:'单位',width:'60',align:'left'},
            {field:'saleCount',title:'销售数量',width:'100',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.saleCount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'saleAmount',title:'销售金额',width:'100',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.saleAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'costAmount',title:'成本金额',width:'100',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.costAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'profitAmount',title:'毛利',width:'100',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.profitAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            }
        ]],
        onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
            updateFooter();
            
        },
    });
    
    if(pageStatus==='add'){
    	 gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
    	                         $.extend({},gridDefault),$.extend({},gridDefault)]);
    }
}



//合计
function updateFooter(){
    var fields = {};
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

//计算账款
function calAmount(){
	
}

//保存
function saveProSet(){
    var url = $("#pageStatus").val() == 'add' ? contextPath+"/settle/franchiseProfitSettle/settleSave" : contextPath+"/settle/franchiseProfitSettle/settleUpdate";
    
    $_jxc.ajax({
        url:url,
        data:{"data":JSON.stringify(reqObj)},
    },function(result){
        if(result['code'] == 0){
			$_jxc.alert("操作成功！",function(){
				location.href = contextPath +"/settle/franchiseProfitSettle/settleEdit?id="+result['formId'];
			});
        }else{
            $_jxc.alert(result['message']);
        }
    });
	
}

//审核
function auditFranchiseSet(){
    //验证数据是否修改
    $("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var newData = {
        remark:$("#remark").val(),                  // 备注
        payType:$('input[type="hidden"][name="payType"]').val()||'',   //支付方式
        grid:$.map(gridHandel.getRows(), function(obj){
            return $.extend(true,{},obj);//返回对象的深拷贝
        })
    }

    if(!gFunComparisonArray(oldData,newData)){
    	$_jxc.alert("数据有修改，请先保存再审核");
        return;
    }
	$_jxc.confirm('是否审核通过？',function(data){
		if(data){
//            gFunStartLoading();
			$_jxc.ajax({
		    	url : contextPath+"/settle/franchiseProfitSettle/settleAudit",
		    	data:{"formId":$('#formId').val()||''}
		    },function(result){
//                gFunEndLoading();
	    		if(result['code'] == 0){
	    			$_jxc.alert("操作成功！",function(){
	    				location.href = contextPath +"/settle/franchiseProfitSettle/settleView?id=" + result["formId"];
	    			});
	    		}else{
	            	 $_jxc.alert(result['message'],'审核失败');
	    		}
		    });
		}
	});
}

//删除
function delFrachiseForm(){
	var ids = [];
	ids.push($("#formId").val());
	$_jxc.confirm('是否要删除单据',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/settle/franchiseProfitSettle/settleDelete",
		    	dataType: "json",
		    	data:{"ids":ids}
		    },function(result){
	    		if(result['code'] == 0){
                    toRefreshIframeDataGrid("settle/franchiseProfitSettle/settleList","franchiseAccountAdd");
	    			toClose();
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
		    });
		}
	});
}

//初始化列表
function initProfitFormDetail(){
    var branchId = $('#branchId').val();
    var paramsObj = {
    	franchiseBranchId:branchId,
    	settleTimeStart:$('#beginDate').val(),
    	settleTimeEnd:$('#endDate').val(),
    }
    
	$("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").queryParams = paramsObj;
	$("#"+gridName).datagrid('options').url = contextPath + '/settle/franchiseProfitSettle/getFormList';
	$("#"+gridName).datagrid('load');
}



//导出
function exportOrder(){
	var formId = $("#formId").val();
	window.location.href = contextPath + '/settle/franchiseProfitSettle/exportSheet?page=FranchiseProfitSettle&sheetNo='+formId;
}

//返回列表页面
function back(){
	location.href = contextPath+"/settle/franchiseProfitSettle/settleList";
}

//新增加盟店毛利结算
function addProfitSetForm(){
	toAddTab("新增加盟店毛利结算",contextPath + "/settle/franchiseProfitSettle/settleAdd");
}
