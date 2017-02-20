/**
 * Created by wxl on 2016/10/12.
 * 库存调整-编辑
 */
var splicViewGID = 'combineSplitView';
$(function(){
    initDatacombineSplitView();
    $("div").delegate("button","click",function(){
    	$("p").slideToggle();
    });
    oldData = {
       	branchId:$("#branchId").val(), //机构id
        formNo:$("#formId").val(),                 // 单号
    }
    if($("#close").val()){
    	$("#addButton").addClass("unhide");
    	$("#toBackByJSButton").attr("onclick","window.parent.closeTab()");
    }
});

function changeAmount(newV,oldV){
	/*var temp_amout = newV*$("#salePriceMain").val() 
	$("#amountMain").val(parseFloat(temp_amout).toFixed(4));
	specialRows('componentNum',newV);
	updateFooter();*/
}

var gridDefault = {
    realNum:0,
    largeNum:0,
    isGift:0,
}
var oldData = {};
var gridHandel = new GridClass();
function initDatacombineSplitView(){
    gridHandel.setGridName(splicViewGID);
    gridHandel.initKey({
        firstName:'realNum',
        enterName:'realNum',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("realNum");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('realNum'));
                },100)
            }
        },
    })
    var formId = $("#formId").val();
    $("#"+splicViewGID).datagrid({
        method:'get',
    	url:contextPath+"/stock/combineSplit/getCombineSplitDetailList?id="+formId,
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
                  {field:'ck',checkbox:true},
                  {field:'skuId',hidden:'true'},
                  {field:'skuCode',title:'货号',width:'70px',align:'left',
                      formatter : function(value, row,index) {
                          var str = "";
                          if(row.isFooter){
                              str ='<div class="ub ub-pc">合计</div> '
                          }else{
                              str = value;
                          }
                          return str;
                      }},
                  {field:'skuName',title:'商品名称',width:'200px',align:'left'},
                  {field:'unit',title:'单位',width:'60px',align:'left'},
                  {field:'realNum',title:'数量',width:'80px',align:'right',
                  	formatter:function(value,row){
                          if(row.isFooter){
                              return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                          }
                          if(!value||value==""||parseFloat(value)==0.0){
                          	row["realNum"] = row["dealNum"];
                        	  value = row["realNum"];
                          }
                          return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                      }
                  },
                  {field:'price',title:'单价',width:'80px',align:'right'},
                  {field:'amount',title:'金额',width:'80px',align:'right'},
                  {field:'remark',title:'备注',width:'200px',align:'left'}
              ]],
        onClickCell:function(rowIndex,field,value){
        	gridHandel.setBeginRow(rowIndex);
            gridHandel.setSelectFieldName(field);
            var target = gridHandel.getFieldTarget(field);
            if(target){
                gridHandel.setFieldFocus(target);
            }else{
                gridHandel.setSelectFieldName("skuCode");
            }
        },
        onLoadSuccess:function(data){
        	if(!oldData["grid"]){
            	oldData["grid"] = $.map(gridHandel.getRows(), function(obj){
            		return $.extend(true,{},obj);//返回对象的深拷贝
            	});
            }
            gridHandel.setDatagridHeader("center");
            updateFooter();
        }
    });

}

function updateFooter(){
    var fields = {realNum:0};
    var argWhere = {}
    gridHandel.updateFooter(fields,argWhere);
}

//删除
function delStockForm(){
	var id = $("#formId").val();
	$.messager.confirm('提示','是否要删除此条数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/stock/adjust/deleteStockAdjust",
		    	type:"POST",
		    	data:{
		    		id : id
		    	},
		    	success:function(result){
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "删除成功！", "info",function(){
		    				location.href = contextPath +"/stock/adjust/list";
		    			});
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


//保存
function saveOrder(){
	// 机构id
	var branchId = $("#branchId").val();
    // 备注
    var remark = $("#remark").val();
    // 原因
    var reason = $("input[name='reason']").val()
    // 选择出入库
    var io = $("#io").val();
   

    var selectVal=$("#io").combobox('getValue');
    var rows = gridHandel.getRows();
  
  //判定表格不能为空
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
    var isCheckResult = true;
    $.each(rows,function(i,v){
        if(!v["skuCode"]){
            messager("第"+(i+1)+"行，货号不能为空");
            isCheckResult = false;
            return false;
        };
        if(selectVal==2){
	        if(parseFloat(v["sellable"])+parseFloat(v["realNum"])<0){
	          messager("调整扣减数量不允许超过当前可销售库存数量！");
	          isCheckResult = false;
	          return false;
	        }
        }
    });
    if(!isCheckResult){
        return;
    }
    var saveData = JSON.stringify(rows);
    var stockFormDetailList = tableArrayFormatter(rows,"stockFormDetailList");
    var reqObj = $.extend({
    	createBranchId : branchId,
    	id : $("#formId").val(),
        remark : remark,
        reason :reason,
        io :'1'
    }, stockFormDetailList);
    $.ajax({
        url:contextPath+"/stock/adjust/updateStockForm",
        type:"POST",
        data:reqObj,
        success:function(result){
            if(result['code'] == 0){
            	$.messager.alert("操作提示", "操作成功！", "info");
            }else{
                successTip(result['message']);
            }
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
}

//审核
function check(){
	//验证数据是否修改
    $("#"+gridHandel.getGridName()).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var newData = {
        branchId:$("#branchId").val(), // 机构id
        remark:$("#remark").val(),                  // 备注
        formNo:$("#formNo").val(),                 // 单号
        grid:gridHandel.getRows(),
    }

    var id = $("#formId").val();
    if(!gFunComparisonArray(oldData,newData)){
        messager("数据已修改，请先保存再审核");
        return;
    }
	$.messager.confirm('提示','是否审核通过？',function(data){
		if(data){
			$.ajax({
		    	url : contextPath+"/stock/adjust/check",
		    	type : "POST",
		    	data : {
		    		id : id
		    	},
		    	success:function(result){
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "操作成功！", "info",function(){
		    				alert(22)
		    				location.href = contextPath +"/stock/adjust/checkSuccess?id="+id;
		    			});
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


//合计
function toFooter(){
	$('#combineSplitView').datagrid('reloadFooter',[{"isFooter":true,"receivablesAccount":$('#receivablesAccount').val()||0,"collectAccount":$('#collectAccount').val()||0}]);
}

/**
 * 返回库存调整
 */
function back(){
	toClose();
}