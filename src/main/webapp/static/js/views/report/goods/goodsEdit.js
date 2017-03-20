/**
 * Created by zhangqin on 2017/2/17
 * 编辑商品
 */
var updateGoods;
var isStore;
var flag = ($("#branchType").val()==1);
var dgPrice = null;
function initGoodsInfo(skuId,branchId){
	if(flag===true){
		 $('#tab2').css('display','none');
		 //$('#btnbase').css('background-color','#95B8E7');
		 $('#btnbase').addClass('active')
	}else{
		$('#divTab').css('display','none');
		$('#tab2').css('display','none');
	}
	
	var args = {}
	var httpUrl = contextPath+"/goods/report/getGoodsInfo?skuId="+skuId+"&branchId="+branchId;
	$.get(httpUrl, args,function(data){
		updateGoods = data["_data"];
		$.each(data["_data"],function(key,value){
			var element = "#formEdit #"+key;
			//普通的input
			if($(element).prop("tagName") == "INPUT"){
				if($(element).attr('type')=="checkbox"){
					if(1 == value){ //传到前端checkbox选中的值是true
						$(element).attr("checked","checked");
					}
				}else{
					//进项税、销项税、联营扣率要乘以100
					if($(element).attr("id") == "outputTax" || $(element).attr("id") == "inputTax" || $(element).attr("id") == "supplierRate"){
						if(value){
							$(element).numberbox("setValue",parseFloat((value*100).toFixed(2)));
						}else{
							$(element).numberbox("setValue",0.00);
						}
					}else{
						if($(element).hasClass('easyui-numberbox')){
							$(element).numberbox('setValue', value);
						}else{
							$(element).val(value);
						}
					}
				}
			}
			else if($(element).prop("tagName") =="TEXTAREA"){ //普通的textarea
				$(element).html(value);
			}
			else if($(element).prop("tagName") == "SELECT"){
				if(value){
					$(element+" option").each(function(i,n){
						if($(n).val() == value || $(n).val()==value.name){
							$(n).attr("selected",true);
						}
					});
					if(key=="unit"){
						$(element).combobox("setValue",value);
					}
				}
			}
		});
		//门店禁止编辑配送规格、采购规格、
		isStore=data['isStore'];
		if(isStore){
			$("#purchaseSpec").parent().find(".textbox-text,.validatebox-text").attr("readonly","readonly").addClass("uinp-no-more");
			$("#distributionSpec").parent().find(".textbox-text,.validatebox-text").attr("readonly","readonly").addClass("uinp-no-more");
			$("#formEdit #isFastDeliver").attr("disabled","disabled");
		}
		
		if(updateGoods.saleWay=='A' || updateGoods.saleWay=='B'){
			$("#supplierRate").parent().find(".textbox-text,.validatebox-text").attr("readonly","readonly").addClass("uinp-no-more");
		}else{
			$("#supplierRate").parent().find(".textbox-text,.validatebox-text,.textbox-prompt").removeAttr('readonly').removeClass("uinp-no-more");
		}
		if(updateGoods.updateTime){
			var date = new Date(updateGoods.updateTime);    
			$("#updateTime").val(date.format("yyyy-MM-dd hh:mm:ss"));
		}
		var createTime = new Date(updateGoods.createTime);    
		$("#createTime").val(createTime.format("yyyy-MM-dd hh:mm:ss"));
		setGrossProfit();
	});
}

//毛利值 = 零售价-进货价
function setGrossProfit(){
	var salePrice = parseFloat($("#salePrice").val().trim() || 0);
	var purchasePrice = parseFloat($("#purchasePrice").val().trim() || 0);
	if(salePrice != "" && purchasePrice != ""){
		var grossProfit = salePrice - purchasePrice;
		$("#grossProfit").val(grossProfit);
		$("#grossProfit").textbox("setValue",grossProfit.toFixed(2));
		setGrossProfitPercent();
	}
}

//毛利率 =（零售价-进货价）/零售价
function setGrossProfitPercent(){
	var salePrice = parseFloat($("#salePrice").val().trim());
	var purchasePrice = parseFloat($("#purchasePrice").val().trim());
	var grossProfitPercent = (salePrice - purchasePrice) / salePrice *100;
	$("#grossProfitPercent").val(grossProfitPercent.toFixed(2)+"%");
	$("#grossProfitPercent").textbox("setValue",grossProfitPercent.toFixed(2)+"%");
}

//供应商公共组件
function getGoodsPupplier(){
	new publicSupplierService(function(data){
		$("#formEdit #supplierId").val(data.id);
		$("#formEdit #supplier").val(data.supplierName);
		$("#formEdit #saleWayName").val(data.saleWayName);
		//经营方式
		if(data.saleWayName=='购销'||data.saleWayName=='代销'){
			$("#supplierRate").textbox("setValue","");
			$("#supplierRate").parent().find(".textbox-text,.validatebox-text").attr("readonly","readonly").addClass("uinp-no-more");
		}else{
			$("#supplierRate").parent().find(".textbox-text,.validatebox-text,.textbox-prompt").removeAttr('readonly').removeClass("uinp-no-more");
			$("#supplierRate").textbox("setValue","0.00");
		}
	});
}

//输入数字，保留两位小数
function checkSupplierRate(obj){
	obj.value =obj.value.replace(/[^0-9.]/g,'');
	if(obj.value.indexOf(".")>-1){
		if(obj.value.split(".").length-1>1){
			obj.value =obj.value.substring(0, obj.value.length-1);
		}else{
			if(obj.value.substr(obj.value.indexOf(".")+1).length > 2){
				obj.value =  obj.value.substring(0, obj.value.length-1);
			}
		}	  
	} 
	if(obj.value >= 100){
		obj.value =  obj.value.substring(0, obj.value.length-1);
	}
	return obj.value;
}

//保存
function saveProp() {
	$('#btnSave').attr("disabled","disabled");
	var isValid = $("#formEdit").form('validate');
	if (!isValid) {
		$('#btnSave').removeAttr("disabled");
		return;
	}
	
	if($('#purchaseSpec').val()=="0.00"){
		$('#btnSave').removeAttr("disabled");
		messager("进货规格不能为0!");
		return;
	}
	if($('#distributionSpec').val()=="0.00"){
		$('#btnSave').removeAttr("disabled");
		messager("配送规格不能为0!");
		return;
	}
	
	if($("#supplierId").val() != updateGoods.supplierId && !isStore){
		var param = {
			title:'提示',
			content:"是否同时更新门店该商品的主供应商？</br>是：更新分司及其门店原主供应商相同的该商品。</br>否：只更新分司主档供应商。</br>取消：不保存。"
		};
		new publicConfirmDialog(function(data){
			//是，更新联动下属机构
			if(data.code === 1){
				$("#isLinkage").val(1);
				submitForm();
			}
			//否，仅更新自己
			else if(data.code === 0){
				$("#isLinkage").val(0);
				submitForm();
			}else{
				//取消 重新激活保存按钮
				$('#btnSave').removeAttr("disabled");
			}
		},param);
	}else{
		submitForm();
	}
}


function submitForm(){
	var formObj = $('#formEdit').serializeObject();
	$.ajax({
		url : contextPath + "/branch/goods/branchGoodsPropSave",
		type : "POST",
		data : formObj,
		success : function(result) {
			$('#btnSave').removeAttr("disabled");
			if(result){
				successTip("保存成功");
			}else{
				//$('#btnSave').removeAttr("disabled");
				successTip("保存失败");
			}
		},
		error : function(result) {
			successTip("请求发送失败或服务器处理失败");
		}
	});
}

 function clickTab(code){
	 
	 if(code === 1){
//		 $('#btnbase').css('background-color','#95B8E7');
//		 $('#btnprice').css('background-color','#fff');
		 $('#btnbase').addClass('active');
		 $('#btnprice').removeClass('active');
		 $('#tab1').css('display','block');
		 $('#tab2').css('display','none');
		 
	 }else{
//		 $('#btnbase').css('background-color','#fff');
//		 $('#btnprice').css('background-color','#95B8E7');
		 $('#btnbase').removeClass('active');
		 $('#btnprice').addClass('active');
		 $('#tab1').css('display','none');
		 $('#tab2').css({'display':'block','height':'90%'});
		 
		 	if(dgPrice != null)return;
			//初始化表格
			initDatagridEditRequireOrder();
			/*$('#printnum').on('input',function(){
				printRows($(this).val());
			})*/
	 }
 }
 
 function changePrint(newV,oldV){
	 if(newV && newV >= 0.1 && newV <= 999.90){
		 printRows(newV);
	 }
 }
 
 var gridHandel = new GridClass();
 function initDatagridEditRequireOrder(){
	 gridHandel.setGridName("dgPrice");
	 
	 dgPrice = $("#dgPrice").datagrid({
	        method:'post',
	    	url:contextPath+"/goods/report/querySkuBranchBySkuId?skuId="+$("#skuId").val(),
	        align:'center',
	        singleSelect:true,  //单选  false多选
	        rownumbers:true,    //序号
	        showFooter:true,
	        fit: true,  
	        fitColumns:true,    //每列占满
	        height:'100%',
	        width:'100%',
	        pagination:true,
	        columns:[[			
	            {field:'branchType',title:'机构类型',width: '120px'},
                {field:'skuId',hidden:true,title:'skuId'},
	            {field:'skuId',hidden:true,title:'skuId'},
	            {field:'branchCode',title:'店铺编号',width: '70px',align:'left'},
	            {field:'branchName',title:'店铺名称',width:'80px',align:'left'},
	           
	            {field:'purchasePrice',title:'进货价',width:'80px',align:'right',
	                formatter:function(value,row,index){
	                    if(row.isFooter){
	                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
	                    }

	                    if(!value){
	                        row["purchasePrice"] = parseFloat(value||0).toFixed(2);
	                    }
	                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
	                },
	            },
	            {field:'salePrice',title:'零售价',width:'80px',align:'right',
	                formatter:function(value,row,index){
	                    if(row.isFooter){
	                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
	                    }
	                    if(!value){
	                        row["salePrice"] = parseFloat(value||0).toFixed(2);
	                    }
	                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
	                },
	            },
	            {field:'distributionPrice',title:'配送价',width:'80px',align:'right',
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
	            {field:'wholesalePrice',title:'批发价',width:'80px',align:'right',
	                formatter : function(value, row, index) {

	                    
	                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
	                },
	            },
	            {field:'vipPrice',title:'会员价',width:'80px',align:'right',
	                formatter : function(value, row, index) {
	                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
	                },
	                
	            },
	            {field:'status',title:'商品状态',hidden:true,width:'80px',align:'right',
		               /* formatter : function(value, row, index) {
		                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		                },*/
		            },
	            {field:'statusDesc',title:'商品状态',width:'80px',align:'right',
	               /* formatter : function(value, row, index) {
	                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
	                },*/
	            },
	            
	           
	            {field: 'safetyCoefficient', title: '安全系数', width: '120px', align: 'left',
	                formatter: function (value, row, index) { 	
	                   return '<b>' + parseFloat(value || 0.10).toFixed(2) + '</b>';
	                },
	            editor:{  
                    type:'numberspinner',  
                    options: {  
                        increment:10,
                        precision:2,
                        min:0.10,  
                        max:999.90,  
                        editable:true,
                        onChange: onChangeCoefficient,
                    }  
                }  
	            }
	        ]],
	        onLoadSuccess : function() {
	          	
	          },
	        onClickCell:function(rowIndex,field,value){
	            gridHandel.setBeginRow(rowIndex);
	            gridHandel.setSelectFieldName(field);
	            var target = gridHandel.getFieldTarget(field);
	            if(target){
	                gridHandel.setFieldFocus(target);
	            }else{
	                gridHandel.setSelectFieldName("safetyCoefficient");
	            }
	        }

	    });
 }
 
 function onChangeCoefficient(newV,oldV){
     if(newV > 999.90 || newV < 0.10){
    	 successTip("安全系数在0.10到999.90之间");
    	 gridHandel.setFieldSpinnerValue('safetyCoefficient',0.10);
    	 return;
    }
	 gridHandel.setFieldSpinnerValue('safetyCoefficient',newV);
 }
 
//安全系数
 function printRows(printNum){
 	// 获取选中行的Index的值
 	var rowIndex = -1;
 	var newData = $("#dgPrice").datagrid("getRows");
 	for(var i = 0;i < newData.length;i++){
 		newData[i].safetyCoefficient= printNum;
 	}
 	$("#dgPrice").datagrid('options').url = '';
 	$("#dgPrice").datagrid({data:newData})
 }
 function saveSafetyCoefficient(){
	 
	 var data = $("#dgPrice").datagrid("getRows");
	 var newData = [];
	 for(var i = 0;i < data.length;i++){
		 var temp = {
		    		id : data[i].id,
		    		safetyCoefficient : data[i].safetyCoefficient
		    	}
			newData[i] = temp;
	 }
	 
	 $.ajax({
	        url:contextPath+"/goods/report/saveBranchsafetyCoefficient",
	        type:"POST",
	        contentType:"application/json",
	        data:JSON.stringify(newData),
	        success:function(result){
	            if(result['code'] == 0){
	                $.messager.alert("操作提示", "操作成功！");
	            }else{
	                successTip(result['message'] +","+strResult);
	            }
	        },
	        error:function(result){
	            successTip("请求发送失败或服务器处理失败");
	        }
	    });
 }
