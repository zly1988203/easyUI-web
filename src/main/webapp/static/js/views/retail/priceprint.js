/**
 * Created by wxl on 2016/08/17.
 */
var datagridId = "pricePrint";
$(function(){
	//初始化列表
	initPricePrintGrid();
	$('#printnum').on('input',function(){
		printRows($(this).val());

	})
	$('#discount').on('keyup',function(){
		discountRows($(this).val());
	})
});

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
		           ]],
		           onClickCell:function(rowIndex,field,value){
		        	   gridHandel.setBeginRow(rowIndex);
		        	   gridHandel.setSelectFieldName(field);
		           },
	});
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

		if(""==discountNum || 0 == discountNum){
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
		var checkText=$('#optionseletc').combobox('getValue');
		var data=tabledata.substring(tabledata.indexOf('['),tabledata.lastIndexOf(']')+1) 
		// 为空判断data.length的长度
		if(data.length>=3){
			storage.prdata=data;
			storage.printNo=checkText;
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

