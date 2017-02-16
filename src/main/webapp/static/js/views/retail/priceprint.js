/**
 * Created by wxl on 2016/08/17.
 */
var datagridId = "pricePrint";

var options_nomal = [{value:'5',text:'标准价签(72*32.5mm 4*6)'},
                     {value:'6',text:'标准促销价签(72*32.5mm 4*6)'},
					{value:'7',text:'标准价签(72*32.5mm 4*6)无底'},
					{value:'8',text:'标准促销价签(72*32.5mm 4*6)无底'},
					{value:'11',text:'标准促销价签(72*32.5mm 4*6 无底色)'}];
var options_promotion = [{value:'1',text:'正常（55*25mm有底 3*10）'},
                         {value:'2',text:'正常（85*40mm有底 2*7）'},
     					{value:'3',text:'正常（85*40mm无底 1*7）'},
     					{value:'4',text:'促销（85*40mm无底 1*7）'}];
$(function(){
	//初始化类型选择
	initjiaqType();
	//初始化列表
	initPricePrintGrid();
	$('#printnum').on('input',function(){
		printRows($(this).val());

	})
	
	$('#discount').bind('input onblur',function(){
		if(isNaN($(this).val()) || $(this).val() > 10){
//			$(this).execCommand('undo');
			$(this).val("");
			return;
		}
		
		discountRows($(this).val());
	})
	
//	$('#discount').on('keyup',function(){
//		discountRows($(this).val());
//	})
//	appendOptions(options_nomal);
	
});


function initjiaqType(){
	$(document).on('mousedown','.jiaqType .radioItem',function(){
		var _this = $(this);
		var changeType = function(){
			_this.prop("checked",true);
			
			if(_this.val() === '1'){
				$('.activity').removeClass('unhide');
				$('.discount').removeClass('unhide');
				appendOptions(options_nomal);
			}else{
				$('.activity').addClass('unhide');
				$('.discount').addClass('unhide');
				appendOptions(options_promotion);
			}
			
		}
		changeType();
	})
}

function appendOptions(options){
	$("#optionseletc option").remove();
    $.each(options,function(i,option){
    	var option = option;
    	$("#optionseletc").append("<option value='"+option.value+"'>"+option.text+"</option>"); 
    });
}

//获取当前时间并且格式化
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}


var gridHandel = new GridClass();
function initPricePrintGrid() {
    gridHandel.setGridName("pricePrint");
    gridHandel.initKey({
        firstName:'skuCode',
        enterName:'skuCode',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("skuCode");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('skuCode'));
                },100)
            }else{
                selectGoods(arg);
            }
        },
    })
	$("#"+datagridId).datagrid({
		//title:'普通表单-用键盘操作',
		method: 'get',
		align: 'center',
//		data:{"rows":[{"skuCode":"1","skuName":"s","promotionPrice":"50","printCount":"5"},{"skuCode":"2","skuName":"s","promotionPrice":"40","printCount":"6"},{"skuCode":"3","skuName":"s","promotionPrice":"30","printCount":"7"},{"skuCode":"4","skuName":"s","promotionPrice":"20","printCount":"8"}]},
		//url: '../../json/component.json',
		//toolbar: '#tb',     //工具栏 id为tb
		singleSelect: false,  //单选  false多选
		rownumbers: true,    //序号
		//pagination: true,    //分页
		//fitColumns:true,    //占满
		//showFooter:true,
		columns: [[
		           {field: 'skuCode', title: '货号', width: 200, align: 'center',  },
		           {field: 'skuName', title: '商品名称', width: 200, align: 'center',},
		           {field: 'barCode', title: '条码', width: 150, align: 'center'},
		           {field: 'spec', title: '规格', width: 150, align: 'center'},
		           {field: 'unit', title: '单位', width: 100, align: 'center'},
		           {field: 'originPlace', title: '产地', width: 100, align: 'center'},
		           {field: 'salePrice', title: '销售价', width: 80, align: 'center'
		        	   ,editor:{
		        		   type:'numberbox',
		        		   options:{
		        			   min:0,
		        			   precision:2,
		        			   onChange: onChangeSalePrice,
		        		   }
		        	   },
		        	   formatter:function(value,row,index){
		        		   return  getTwoDecimalB(value);
		        	   },
		           },
		           {field: 'promotionPrice', title: '促销价', width: 100, align: 'center',
		        	   editor:{
		        		   type:'numberbox',
		        		   options:{
		        			   min:0,
		        			   precision:2,
		        			   onChange: onChangePromotionPrice,
		        		   }
		        	   },
		        	   formatter:function(value,row,index){
		        		   return  getTwoDecimalB(value);
		        	   },

		           },

		           {field: 'printCount', title: '打印数', width: 80, align: 'center',
		        	   formatter:function(value,row,index){
		        		   if(!value){
		                    	row["printCount"] =1;
		                    }
		        		   return row["printCount"];
		        	   },
		        	   editor:{
		        		   type:'numberbox',
		        		   precision:200,
		        		   options:{
		        			   min:1,
		        		   }
		        	   },
		        	  
		           },
		           
		           {field: 'datetime', title: '活动时间', width: 180, align: 'center',
		        	   formatter:function(value,row,index){
		        		   if(!value){
		                    	return;
		                    }
		        		   return row["datetime"];
		        	   },
		        	   editor:{
		        		   type:'datebox',
		        		   precision:200,
		        	   },
		        	  
		           },
		           
		           ]],
		           onClickCell:function(rowIndex,field,value){
		        	   gridHandel.setBeginRow(rowIndex);
		        	   gridHandel.setSelectFieldName(field);
		           },
	});
//    gridHandel.setLoadData([$.extend({},gridDefault)]);
}




function onChangeSalePrice(newV,oldV){
    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuName')){
        return;
    }
    
	var promotionPrice = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'promotionPrice');
	if(parseFloat(promotionPrice) > parseFloat(newV)){
		  messager("销售价不能小于促销价");
		  gridHandel.setFieldValue('salePrice',oldV);
	        return;
	}
}


function onChangePromotionPrice(newV,oldV){
	
    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuName')){
        return;
    }
	
	var salePriceVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'salePrice');
	if(parseFloat(newV) > parseFloat(salePriceVal)){
		  messager("促销价不能大于销售价");
		  gridHandel.setFieldValue('promotionPrice',oldV);
	        return;
	}
}

//导入
function toImportproduct(type){
    var param = {
        url:contextPath+"/print/importList",
        tempUrl:contextPath+"/print/exportTemp",
        type:type,
        
    }
    new publicUploadFileService(function(data){
        updateListData(data);
        
    },param)
}
function updateListData(data){
	    var keyNames = {
	        id:'skuId',
	        salePrice:'promotionPrice'
	    };
	    var rows = gFunUpdateKey(data,keyNames);
	    var argWhere ={skuCode:1};  //验证重复性
	    var isCheck ={isGift:1 };   //只要是赠品就可以重复
	    var newRows = gridHandel.checkDatagrid(data,rows,argWhere,isCheck);
         console.log(newRows);
	    $("#pricePrint").datagrid("loadData",data);
	}


//打印数设置 表格列数同步
function printRows(printNum){
	// 获取选中行的Index的值
	var rowIndex = -1;
	var newData = $("#"+datagridId).datagrid("getRows");
	for(var i = 0;i < newData.length;i++){
		newData[i].printCount= printNum;

		rowIndex = $("#"+datagridId).datagrid('getRowIndex',newData[i]);
		//更新行数据
		$("#"+datagridId).datagrid('updateRow',{
			index: rowIndex,
			row: newData[i]
		});
		//刷新行
		$("#"+datagridId).datagrid('refreshRow',rowIndex);
	}
}
//打折 表格列数同步
function discountRows(discountNum){
	// 获取选中行的Index的值
	var rowIndex = -1;
	var newData = $("#"+datagridId).datagrid("getRows");

	for(var i = 0;i < newData.length;i++){

		if(""==discountNum || 10 == discountNum || 0 == discountNum){
			newData[i].promotionPrice= newData[i].salePrice;
		}else{
			newData[i].promotionPrice= discountNum*newData[i].salePrice/10;
		}

		rowIndex = $("#"+datagridId).datagrid('getRowIndex',newData[i]);
		//更新行数据
		$("#"+datagridId).datagrid('updateRow',{
			index: rowIndex,
			row: newData[i]
		});
		//刷新行
		$("#"+datagridId).datagrid('refreshRow',rowIndex);
	}
}

//打印的数据
function printtable(){
	if(!window.localStorage)
	{
		return false;
	}
	else{
		$('#'+datagridId).datagrid('endEdit', gridHandel.getSelectRowIndex());                  //结束之前的编辑
		var storage=window.localStorage;
		var printdata= $("#"+datagridId).datagrid('getRows');
		console.log(printdata);
		var tabledata=JSON.stringify(printdata);
		var printNo=$("#optionseletc").find("option:selected").val();
		var data=tabledata.substring(tabledata.indexOf('['),tabledata.lastIndexOf(']')+1) 
		// 为空判断data.length的长度
		if(data.length>=3){
			storage.prdata=data;
			storage.printNo=printNo;
			window.open(contextPath + "/print/printGoodsView"); 
		}
		else {
			messager("打印数据不能为空！");
			return;
		}

	}
}

//商品选择  方法
function chooseproduct(){
	new publicGoodsService('PC',function(data){

		var obj = {
				
		}
		gFunUpdateKey(data, obj);
		$("#pricePrint").datagrid("unselectAll");
		
		$.each(data,function(i,row){
			row["promotionPrice"] = row["salePrice"] ;
			row["printCount"] = row["printCount"]||1 ;

		})
		var rows = gridHandel.getRows("pricePrint");

		$.each(rows,function(i,rowItem){
			$.each(data,function(j,dataItem){
				if(rowItem.skuCode==dataItem.skuCode){
					rowItem.printCount = parseInt(rowItem.printCount)+1;
					data.splice(j,1);
					return false;
				}
			})
		});
		var newRows = rows.concat(data)// $.extend(rows,data);

		$("#pricePrint").datagrid("loadData", newRows);

	},'','','','','','');

}


/**
 * 机构店铺名称
 */
function searchBranch(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}

var dalogTemp

function selectActivity(){
	
  new publicActivity(function(data){
	  var data = data;
	  $("#actionId").val(data.id);
		$("#actionName").val(data.activityCode);
	  getActivityGoods(data);
  });
	
}

function getActivityGoods(data){
	if(data){
		$.ajax({
	    	url:contextPath+"/sale/activitySelect/getDetail?activityId="+data.id,
	    	type:"GET",
	    	success:function(result){
	    		
	    		if(result['code'] == 0){
	    			var tempData = result.data;
	    			var startDate = tempData.startTime + " " +tempData.dailyStartTime;
	    			var endDate = tempData.endTime + " " +tempData.dailyEndTime;
	    			result.data.datetime = startDate+"--"+endDate;
	    			 $("#pricePrint").datagrid("loadData",result.data);
	    		}else{
	    			successTip(result['message']);
	    		}
	    	},
	    	error:function(result){
	    		successTip("请求发送失败或服务器处理失败");
	    	}
	    });
	}
}

function disableBtn(){
	 $('#selectGoods').addClass("uinp-no-more")
	 $('#selectGoods').removeAttr('onclick');
	 $('#importsukcode').addClass("uinp-no-more")
	 $('#importsukcode').removeAttr('onclick');
	 $('#importbarcode').addClass("uinp-no-more")
	 $('#importbarcode').removeAttr('onclick');
	 $('#discount').attr('readonly','readonly');
	 var e = $("#pricePrint").datagrid('getColumnOption', 'datetime');

     e.editor = {disabled:true};
}

function onChangeSelect(){
    var priceMark=$("#optionseletc").val(); 
}
