/**
 * 
 * 全部js代码
 * 编辑和审核公用页面
 * 
 */

var directStatus = 'add';

var gridName = "gridDirectDetail";

var oldData = {};
var isdisabled = false;
var url;

$(function(){
	//当前页面状态 新增 修改 审核
	directStatus = $('#directStatus').val();
	//修改页面的单据id
	var formId = $('#formId').val();
	if(directStatus === 'add'){
		$("#branchName").val(sessionBranchCodeName);
		$("#branchId").val(sessionBranchId);
		$("#createTime").html(new Date().format('yyyy-MM-dd hh:mm'));
		oldData = {
				   branchName:$('#branchName').val(),
		           remark:$('#remark').val()
				}
	}else if(directStatus === 'edit'){
		oldData = {
		            branchName:$('#branchName').val(),
		            remark:$('#remark').val()
		        }
		
		url = contextPath +"/directReceipt/getDetailList?formId=" + formId;
		$('#already-examine').css('display','none');
		$('#btnCheck').css('display','black');
		
	}else if(directStatus === 'check'){
		url = contextPath +"/directReceipt/getDetailList?formId=" + formId;
		isdisabled = true;
		$('#already-examine').css('display','black');
        $('#remark').prop('readOnly','readOnly');
	}else{
		
	}
	initDirectDataGrid();
})

var gridDefault = {
    realNum:0,
    isGift:0,
}

var gridHandel = new GridClass();
function initDirectDataGrid(){
	 gridHandel.setGridName(gridName);
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
	    	    
	  $("#"+gridName).datagrid({
       method:'get',
   	   url:url,
       align:'center',
       singleSelect:false,  // 单选 false多选
       rownumbers:true,    // 序号
       showFooter:true,
       height:'100%',
       width:'100%',
       columns:[[
			{field:'ck',checkbox:true,hidden:isdisabled},
			{field:'cz',title:'操作',width:'60px',align:'center',hidden:isdisabled,
			    formatter : function(value, row,index) {
			        var str = "";
			        if(row.isFooter){
			            
			        }else{
			            str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
			                '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
			        }
			        return str;
			    }
			},

           {field:'skuId',hidden:'true'},
          
           {field:'skuCode',title:'货号',width: '70px',align:'left',
           	formatter:function(value,row,index){
           		if(row.isFooter){
           			return '<div class="ub ub-pc">合计</div> '
           		}
           		return value;
           	},
           	editor:{
	                type:'textbox',
	                options:{
	                	disabled:isdisabled,
	                }
           	}
           },
           {field:'skuName',title:'商品名称',width:'200px',align:'left'},
           {field:'barCode',title:'条码',width:'200px',align:'left'},
           {field:'unit',title:'单位',width:'60px',align:'left'},
           {field:'spec',title:'规格',width:'90px',align:'left'},
           {field:'purchaseSpec',title:'进货规格',width:'120px',align:'left'},
           {field:'realNum',title:'数量',width:'100px',align:'right',
               formatter:function(value,row,index){
                   if(row.isFooter){
                       return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                   }
                   if(!value){
                       row["realNum"] = parseFloat(value||0).toFixed(2);
                   }
                   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
               },
               editor:{
                   type:'numberbox',
                   options:{
                   	disabled:isdisabled,
                       min:0,
                       precision:4,
//                       onChange: onChangerealNum,
                   }
               }
           },
           {field:'price',title:'单价',width:'100px',align:'right',
               formatter:function(value,row,index){
                   if(row.isFooter){
                       return
                   }
                   if(!row.price){
                   	row.price = parseFloat(value||0).toFixed(2);
                   }
                   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
               },

           
           },
           {field:'amount',title:'金额',width:'100px',align:'right',
               formatter : function(value, row, index) {
                   if(row.isFooter){
                       return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                   }

                   if(!row.amount){
                   	row.amount = parseFloat(value||0).toFixed(2);
                   }
                   
                   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
               },
               editor:{
                   type:'numberbox',
                   options:{
                       disabled:true,
                       min:0,
                       precision:4,
                   }
               }
           },
           {field:'isGift',title:'是否赠品',width:'80px',align:'left',
               formatter:function(value,row){
                   if(row.isFooter){
                       return;
                   }
                   return value=='1'?'是':(value=='0'?'否':'请选择');
               },
               editor:{
                   type:'combobox',
                   options:{
                       valueField: 'id',
                       textField: 'text',
                       editable:false,
                       required:true,
                       data: [{
                           "id":'1',
                           "text":"是",
                       },{
                           "id":'0',
                           "text":"否",
                       }],
                       onSelect:onSelectIsGift
                   }
               }
           },
           {field:'goodsCreateDate',title:'生产日期',width:'120px',align:'center',
               formatter : function(value, row,index) {
                   if(row.isFooter){
                       return;
                   }
                   return value;
               },
               editor:{
                   type:'datebox',
               },
           },
           {field:'tax',title:'税率',width:'80px',align:'right',
               formatter : function(value, row, index) {
                   if(row.isFooter){
                       return;
                   }
                   row.tax = value?value:0;
                   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
               },
               options:{
                   min:0,
                   precision:4,
               }
           },
           {field:'taxAmount',title:'税额',width:'80px',align:'right',
               formatter : function(value, row, index) {
                   if(row.isFooter){
                       return;
                   }
                   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
               },
               editor:{
                   type:'numberbox',
                   options:{
                       disabled:true,
                       min:0,
                       precision:2,
                   }
               },
           },
           {field:'remark',title:'备注',width:'200px',align:'left', editor:'textbox'}

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
           gridHandel.setDatagridHeader("center");
           updateFooter();
       },
   });
   
   if(directStatus === 'add'){
   	 gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
   	                         $.extend({},gridDefault),$.extend({},gridDefault)]);
   }
}

//监听商品数量
function onChangeRealNum(newV,oldV) {

    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuCode')){
        return;
    }
    var purchaseSpecValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'purchaseSpec');
    if(!purchaseSpecValue){
        messager("没有商品规格,请审查");
        return;
    }
    
    var priceValue = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'price');
    gridHandel.setFieldValue('amount',priceValue*newV);                         //金额=数量*单价

    var largeNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'largeNum');
    var largeNumVal2 = parseFloat(purchaseSpecValue*newV).toFixed(4);
    if(largeNumVal&&Math.abs(largeNumVal2-largeNumVal)>0.0001){
        var largeNumVal = parseFloat(newV/purchaseSpecValue).toFixed(4);
        gridHandel.setFieldValue('largeNum',largeNumVal);   //箱数=数量/商品规格
    }

    updateFooter();
}

//监听是否赠品
function onSelectIsGift(data){
    var checkObj = {
        skuCode: gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'skuCode'),
        isGift:data.id,
    };
    var arrs = gridHandel.searchDatagridFiled(gridHandel.getSelectRowIndex(),checkObj);
    if(arrs.length==0){
        var targetPrice = gridHandel.getFieldTarget('price');
        if(data.id=="1"){
            var priceVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'price');
            $('#'+gridName).datagrid('getRows')[gridHandel.getSelectRowIndex()]["oldPrice"] = priceVal;
            $(targetPrice).numberbox('setValue',0);
            $(targetPrice).numberbox('disable');
        }else{
            $(targetPrice).numberbox('enable');
            var oldPrice =  $('#'+gridName).datagrid('getRows')[gridHandel.getSelectRowIndex()]["oldPrice"];
            if(oldPrice){
                $(targetPrice).numberbox('setValue',oldPrice);
            }
        }
        updateFooter();
    }else{
        var targetIsGift = gridHandel.getFieldTarget('isGift');
        $(targetIsGift).combobox('select', data.id=='1'?'0':'1');
        messager(data.id=='1'?'已存在相同赠品':'已存在相同商品');
    }
}

//合计
function updateFooter(){
    var fields = {largeNum:0,realNum:0,amount:0,taxAmount:0,isGift:0, };
    var argWhere = {name:'isGift',value:""}
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


//新增直送收货单
function addDirect(){
	toAddTab("新增直送收货单",contextPath + "/directReceipt/add?branchId=" + sessionBranchId);
}

function saveDirectForm(){
	gFunStartLoading();
}

function checkDirectForm(){
	gFunStartLoading();
	
}

//选择供应商
function selectSupplier(){
	var param = {
			saleWayNot:'purchase',
			isDirect:1
	}
    new publicSupplierService(function(data){
        $("#supplierId").val(data.id);
        $("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
        // 切换供应商后清除商品数据
        // TODO
        // 是否自动加载商品
        if($("#cascadeGoods")){
        	// TODO
        }
    },param);
}

//收货机构
function selectBranch(){
    new publicBranchService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchName").val("["+data.branchCode+"]"+data.branchName);
    },0);
}

//选择商品
function selectGoods(searchKey){
	// TODO  加控制
	var branchId = $("#branchId").val();
	var sourceBranchId = branchId;
	var targetBranchId = branchId;

	if(!branchId || !$.trim(branchId)){
		messager("请选择机构");
		return;
	}

    //控制弹框
	if(typeof(searchKey)=="undefined"){ 
		searchKey = "";
	}
    
    var param = {
    		type:'PM',
    		key:searchKey,
    		isRadio:'',
    		branchId:branchId,
    		sourceBranchId:'',
    		targetBranchId:'',
    		supplierId:'',
    		flag:'0',
    }
    
    new publicGoodsServiceTem(param,function(data){
    	if(searchKey){
	        $("#"+gridName).datagrid("deleteRow", gridHandel.getSelectRowIndex());
	        $("#"+gridName).datagrid("acceptChanges");
	    }
    	
    	 var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
         var addDefaultData  = gridHandel.addDefault(data,gridDefault);
         var keyNames = {
         		skuId:'goodsSkuId',
         		salePrice:'price'
         };
         var rows = gFunUpdateKey(addDefaultData,keyNames);
         var argWhere ={skuCode:1};  // 验证重复性
         var isCheck ={isGift:1 };   // 只要是赠品就可以重复
         var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
         $("#"+gridName).datagrid("loadData",newRows);
    	
    	
        gridHandel.setLoadFocus();
        setTimeout(function(){
            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
            gridHandel.setSelectFieldName("stocktakingNum");
            gridHandel.setFieldFocus(gridHandel.getFieldTarget('stocktakingNum'));
        },100)
    	
    });
}




function toPrintPreview(){
	
}

/**
 * 导入商品
 * @param type 0货号  1条码
 */
function importDirectForm(type){
    var branchId = $("#branchId").val();
    // 判定机构是否存在
    if($("#branchId").val()==""){
        messager("请选择机构");
        return;
    }
    // 判定供应商是否存在
    if($("#supplierId").val()==""){
    	messager("请选择供应商");
    	return;
    }
    
    var param = {
        url:contextPath+"/directReceipt/importList",
        tempUrl:contextPath+"/directReceipt/exportTemp",
        branchId:branchId,
        type:type
    }
    new publicUploadFileService(function(data){
        updateListData(data);
    },param)
}

/**
 * 导出表单
 */
function exportDirectForm(){
	var length = $("#"+dataGridId).datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+"/directReceipt/exportList");
	$("#queryForm").submit(); 
}
