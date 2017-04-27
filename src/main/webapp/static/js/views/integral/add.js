//日期控件 
function updateWdatePicker(){
    WdatePicker(
        {
            onpicked:function(dp){
                $("input:radio[name='dateradio']").attr("checked",false);
            }
        })
}

$(function(){
	//初始化默认条件
	initCondition();
    
	initDatagrid();
    
    changeType();
});

//初始化默认条件
function initCondition(){
	var branchType = $("input[name='branchType']:checked").val();
	if(branchType==0){
		$("#branchId").val($("#branchIds").val());
		document.getElementById("SomeBranch").style.visibility="hidden";//隐藏  
	}
}

function changeType(){
	$(".radioItem").change(function(){
    	var a = $(this).val();
    	if (a=="0") {
    		document.getElementById("SomeBranch").style.visibility="hidden";//隐藏  
    		$("#branchId").val($("#branchIds").val());
    		$('#gridEditOrder').datagrid('loadData', {total: 0, rows:  [$.extend({},gridDefault)]});  
		} else {
			document.getElementById("SomeBranch").style.visibility="visible";//显示
			$("#branchId").val('');
			$('#gridEditOrder').datagrid('loadData', {total: 0, rows:  [$.extend({},gridDefault)]});  
		}
    });
}


var gridHandel = new GridClass();
var gridName = "gridEditOrder";
var editRowData = null;
function initDatagrid(){
    gridHandel.setGridName("gridEditOrder");
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
    $("#gridEditOrder").datagrid({
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                            '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
                    return str;
                },
            },
            {field:'skuCode',title:'货号',width: '200px',align:'left',editor:'textbox'},
            {field:'skuName',title:'礼品名称',width:'200px',align:'left'},
            {field:'barCode',title:'条码',width:'150px',align:'left'},
            {field:'num',title:'兑换数量',width:'150px',align:'right',
                formatter : function(value, row, index) {
                    return '<b>'+parseFloat(value||0).toFixed(0)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    value:1,
                    options:{
                        min:1,
                        precision:0,
                    }
                },
            },
            {field:'integral',title:'对应积分',width:'150px',align:'right',
                formatter : function(value, row, index) {
                    return '<b>'+parseFloat(value||0).toFixed(0)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    value:'1',
                    options:{
                        min:1,
                        precision:0,
                    }
                },
            }
            
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
        onBeforeEdit:function (rowIndex, rowData) {
            editRowData = $.extend(true,{},rowData);
        },
        onAfterEdit:function(rowIndex, rowData, changes){
            if(typeof(rowData.id) === 'undefined'){
                // $("#"+gridName).datagrid('acceptChanges');
            }else{
                if(editRowData.skuCode != changes.skuCode){
                    rowData.skuCode = editRowData.skuCode;
                    gridHandel.setFieldTextValue('skuCode',editRowData.skuCode);
                    $("#"+gridName).datagrid('updateRow',{index:rowIndex,rwo:rowData});
                }
            }
        },
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)]);
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
//选择商品
function selectGoods(searchKey){
    //判定供应商是否存在
	var supplierId = $("#supplierId").val();
    if(supplierId==""){
        messager("请先选择供应商");
        return;
    }
    var branchId = $("#branchId").val();
    if(!branchId){
    	messager("请先选择收货机构");
        return;
    }

    var param = {
        type:'PA',
        key:searchKey,
        isRadio:0,
        sourceBranchId:"",
        targetBranchId:"",
        branchId:branchId,
        supplierId:supplierId,
        flag:'0',
    }
    
    new publicGoodsServiceTem(param,function(data){
    	if(data.length==0){
            return;
        }
    	if(searchKey){
	        $("#gridEditOrder").datagrid("deleteRow", gridHandel.getSelectRowIndex());
	        $("#gridEditOrder").datagrid("acceptChanges");
	    }
        for(var i in data){
        	var rec = data[i];
        	rec.remark = "";
        }
        var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
        var addDefaultData  = gridHandel.addDefault(data,gridDefault);
        var keyNames = {
            purchasePrice:'price',
            id:'skuId',
            disabled:'',
            pricingType:'',
            inputTax:'tax'
        };
        var rows = gFunUpdateKey(addDefaultData,keyNames);
        var argWhere ={skuCode:1};  //验证重复性
        var isCheck ={isGift:1 };   //只要是赠品就可以重复
        var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);

        $("#gridEditOrder").datagrid("loadData",newRows);

        gridHandel.setLoadFocus();
        setTimeout(function(){
            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
            gridHandel.setSelectFieldName("largeNum");
            gridHandel.setFieldFocus(gridHandel.getFieldTarget('largeNum'));
        },100)
    });
}

function updateListData(data){
    $.each(data,function(i,val){
    	data[i]["remark"] = "";
    });
    var keyNames = {
        id:'skuId',
        disabled:'',
        pricingType:'',
        inputTax:'tax'
    };
    var rows = gFunUpdateKey(data,keyNames);
    var argWhere ={skuCode:1};  //验证重复性
    var isCheck ={isGift:1 };   //只要是赠品就可以重复
    var newRows = gridHandel.checkDatagrid(rows,argWhere,isCheck);
    $("#gridEditOrder").datagrid("loadData",rows);
}

//校验表单数据
function chechForm(){
	var branchId = $("#branchId").val();
	if(!branchId){
		messager("兑换分店为空");
		return false;
	}
	var txtStartDate = $("#startTime").val();
	if(!txtStartDate){
		messager("兑换开始时间为空");
		return false;
	}
	var txtEndDate = $("#endTime").val();
	if(!txtEndDate){
		messager("兑换结束时间为空");
		return false;
	}
	return true;
}


//保存
function saveItemHandel(){
	var flag = chechForm();
	if(!flag){
		return;
	}
    $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = $("#gridEditOrder").datagrid('getRows');
    $(gridHandel.getGridName()).datagrid("loadData",rows);
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
    var isCheckResult = true;
    var isCheckSkuName = true;
    var isCheckSkuCode = true;
    var isCheckNum = true;
    var isCheckIntrgral = true;
    
    $.each(rows,function(i,v){
        v["rowNo"] = i+1;
        if(!v["skuId"]){
            messager("第"+(i+1)+"行,商品不正确");
            isCheckResult = false;
            return false;
        };
        if(!v["skuName"]){
        	messager("第"+(i+1)+"行,商品名称为空");
        	isCheckSkuName = false;
        	return false;
        };
        if(!v["skuCode"]){
        	messager("第"+(i+1)+"行,货号为空");
        	isCheckSkuCode = false;
        	return false;
        };
        if(!v["num"] || v["num"]<=0){
        	messager("第"+(i+1)+"行,兑换数量需大于0");
        	isCheckNum = false;
        	return false;
        };
        
        if(!v["integral"] || v["integral"]<=0){
        	messager("第"+(i+1)+"行,对应积分需大于0");
        	isCheckIntrgral = false;
        	return false;
        };
    });
    if(isCheckResult && isCheckSkuName && isCheckSkuCode && isCheckNum && isCheckIntrgral){
       saveDataHandel();
    }
}

function getParam(){
	var param_obj = {}
	var goodList = [];
	var branchIds = [];
	 //封装商品信息
	 var rows = $("#gridEditOrder").datagrid('getRows');
	 $.each(rows,function(i,v){
		 var temp_goodObj = {
					skuId: v["skuId"], 
					num:v["num"],
					integral:v["integral"]
			};
		 goodList.push(temp_goodObj);
	 });
	 
	 var txtStartDate = $("#startTime").val();
	 var txtEndDate = $("#endTime").val();
	 
	 //收货机构
	 var branchId = $("#branchId").val();
	 branchIds =  branchId.split(",");
	 
	 param_obj.detailList = goodList;
	 param_obj.startTime = txtStartDate+ " 00:00:00";
	 param_obj.endTime = txtEndDate+ " 23:59:59";
	 param_obj.branchIds = branchIds;
	 return param_obj;
}


//保存
function saveDataHandel(){
    //获取请求参数
	var reqObj = getParam();
    $.ajax({
    	type:"POST",
        url:contextPath+"/integral/giftManager/addGiftManager",
        data:{
			"skuReq" : JSON.stringify(reqObj)
		},
        success:function(result){
            if(result['code'] == 0){
            	$.messager.alert("操作提示", "操作成功!");
            	setTimeout('toClose()',1500); 
            }else{
                successTip(result['message']);
            }
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
}

/**
 * 分店列表 0 单选,1  多选
 */
function selectBranch() {
	new publicBranchServiceGift(function(data) {
		var branchesId="";
		var branchName="";
		
		$.each(data,function(i,k){
			branchesId=k.branchesId+","+branchesId;
			branchName+="["+k.branchCode+"]"+k.branchName+",";
		})
		branchesId = branchesId.substring(0,branchesId.length - 1);
		branchName = branchName.substring(0,branchName.length - 1);
		$("#branchId").val(branchesId);// id
		$("#branchShopName").val(branchName);
		//清空列表数据
		$('#gridEditOrder').datagrid('loadData', {total: 0, rows:  [$.extend({},gridDefault)]});  
	},1);
}

/**
 * 商品选择
 */
function selectGoods(searchKey){
	selectGoodsDialog(searchKey);
}
/**
 * 商品选择
 */
function selectGoodsDialog(searchKey) {
	var branchId=null;
    if($("#branchId").val()==""){
        messager("请先选择机构");
        return;
    }
    branchId=$("#branchId").val();
	gFunGoodsSelect(searchKey,branchId);
}
//商品选择 公共使用
function gFunGoodsSelect(searchKey,branchId){

    var param = {
        type:'PC',
        key:searchKey,
        isRadio:0,
        sourceBranchId:"",
        targetBranchId:"",
        branchId:branchId,
        supplierId:'',
        flag:'0',
    }

	 new publicGoodsServiceTem(param, function(data) {
			if(searchKey){
				$("#gridEditOrder").datagrid("deleteRow", gridHandel.getSelectRowIndex());
				$("#gridEditOrder").datagrid("acceptChanges");
			}
			var nowRows = gridHandel.getRowsWhere({'skuName':true});
			var argWhere ={skuCode:true};  //验证重复性
			var keyNames = {
				skuCode : 'skuCode',
				skuName : 'skuName',
				barCode : 'barCode',
				num : 'num',
				integral : 'integral'
			};
			var newData = gFunUpdateKey(data,keyNames);
			var newRows = gridHandel.checkDatagrid(nowRows,newData,argWhere);
			$("#gridEditOrder").datagrid("loadData",newRows);
			  var fieldName = "";
			  var fieldNames = {
					  "skuCode":"skuCode",
					  "skuName":"skuName",
					  "barCode":"barCode",
					  "num":'num',
					  "integral":'integral',
			  }
		      $('.priceItem:checked').each(function(i){
		       if(0==i){
		    	   fieldName =fieldNames[$(this).attr("id")] ;
		       }
		      });
		      if(fieldName){
		    	  gridHandel.setLoadFocus();
			        setTimeout(function(){
			            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
			            gridHandel.setSelectFieldName(fieldName);
			            gridHandel.setFieldFocus(gridHandel.getFieldTarget(fieldName));
			        },100)
		      }
	      
		});
}

