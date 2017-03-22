var hiddenEdit=true;
var hiddenStatus;
$(function(){
	hiddenStatus = $("#hiddenStatus").val();
	
	if($("#hiddenEdit").val()==="0") hiddenEdit=false;
	    initDatagridEditOrder();
	    $("div").delegate("button","click",function(){
	    	$("p").slideToggle();
	    });
	    
	});
	var printReport = function(){
		parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/form/overdue/edit/report/print?formNo="+$("#formNo").val());
	}

	var urlEncode = function (param, key, encode) {
		  if(param==null) return '';
		  var paramStr = '';
		  var t = typeof (param);
		  if (t == 'string' || t == 'number' || t == 'boolean') {
		    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
		  } else {
		    for (var i in param) {
		      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
		      paramStr += urlEncode(param[i], k, encode);
		    }
		  }
		  return paramStr;
		};
		
	var gridDefault = {
	    largeNum:0,
	    realNum:0,
	    isGift:0,
	}
	var gridHandel = new GridClass();
	function initDatagridEditOrder(){
	    gridHandel.setGridName("gridEditOrder");
	    gridHandel.initKey({
	        firstName:'skuCode',
	        enterName:'skuCode',
	        enterCallBack:function(arg){
	        	if(hiddenStatus === '0' || hiddenStatus === '1' )return;
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
		var formId = $("#formId").val();
	    $("#gridEditOrder").datagrid({
	        //title:'普通表单-用键盘操作',
	        method:'post',
	    	url:contextPath+"/form/overdue/detail/list/"+formId,
	        align:'center',
	        singleSelect:true,  //单选  false多选
	        rownumbers:true,    //序号
	        showFooter:true,
	        height:'100%',
	        width:'100%',
	        columns:[[
	        	{field:'rowNo',title:'行号',hidden:true},
	        	{field:'id',title:'主键',hidden:true},
	        	
	        		{field:'cz',title:'操作',width:'60px',align:'center'
		        		
		        		,
		                formatter : function(value, row,index) {
		                	if((hiddenStatus==="3")? false :true){
		                		 $('#gridEditOrder').datagrid('hideColumn', 'cz');
		                	}else{
		                		 var str = "";
				                    if(row.isFooter){
				                        str ='<div class="ub ub-pc">合计</div> '
				                    }else{
				                        str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
				                            '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
				                    }
				                    return str;
		                	}
		                   
		                }
		        	  
		            },
	            
	            {field:'skuCode',title:'货号',width: '70px',align:'left'
	            	,editor:{
	            		type:'textbox',
	            		options:{
	                        disabled:(hiddenStatus==="3")? false :true
	                    }
	            	}
	            },
	            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
	            {field:'barCode',title:'条码',width:'130px',align:'left'},
	            {field:'unit',title:'单位',width:'60px',align:'left'},
	            {field:'spec',title:'规格',width:'90px',align:'left'},
	            {field:'applyNum',title:'数量',width:'80px',align:'right',
	                formatter : function(value, row, index) {
	                    if(row.isFooter){
	                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
	                    }
	                    
	                    if(!value){
	                        row["applyNum"] = parseFloat(value||0).toFixed(2);
	                    }
	                    
	                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
	                },
	                editor:{
	                    type:'numberbox',
	                    value:0,
	                    options:{
	                        min:0,
	                        precision:4,
	                        onChange: onChangeLargeNum,
	                        disabled:(hiddenStatus==="3")? false :true
	                    }
	                }
	            },
	            {field:'applyPrice',title:'零售价',width:'80px',align:'right',
	                formatter : function(value, row, index) {
	                    if(row.isFooter){
	                        return;
	                    }
	                    if(!row.price){
	                    	row.price = parseFloat(value||0).toFixed(2);
	                    }
	                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
	                }
	            },
	            {field:'applyAmount',title:'金额',width:'80px',align:'right',
	                formatter : function(value, row, index) {
	                    if(row.isFooter){
	                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
	                    }
	                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
	                },
	                editor:{
	                    type:'numberbox',
	                    options:{
	                    	precision:4,
	                    	disabled:true
	                    }
	                }
	            },
	            {field:'applyDesc',title:'申请说明',width:'200px',align:'left',
	            	editor:{
	            		type:'textbox',
	            		options:{
	                        disabled:(hiddenStatus==="3")? false :true
	                    }
	            	}
	            },
	            {field:'auditDesc',title:'处理意见',width:'200px',align:'left'
	            	,editor:{
	            		type:'textbox',
	            		options:{
	                        disabled:!hiddenEdit||!(hiddenStatus==="0")
	                    }
	            	}
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
	        onLoadSuccess:function(data){
	            gridHandel.setDatagridHeader("center");
	            updateFooter();
	        }
	    });
	}


	//限制转换次数
	var n = 0;
	var m = 0;
	//监听商品数量
	function onChangeLargeNum(newV,oldV){
		if("" == newV){
			 messager("商品数量输入有误");
			  gridHandel.setFieldValue('applyNum',oldV); 
		     return;
		}
		
		if(m > 0){
			m = 0;
			return;
		}
		
	    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuCode')){
	        return;
	    }
	    
	   /* var purchaseSpecValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'spec');
	    if(!purchaseSpecValue){
	        messager("没有商品规格,请审查");
	        return;
	    }*/
	    
	    n++;

	    //金额 = 单价 * 数量
	    var priceValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'applyPrice');
	    priceValue  = !priceValue ? 0 :parseFloat(priceValue);
	    gridHandel.setFieldValue('applyAmount',parseFloat(priceValue*newV).toFixed(4));

	    updateFooter();
	}
	
	
	//合计
	function updateFooter(){
	    var fields = {applyAmount:0,applyNum:0,applyPrice:0, };
	    var argWhere = {name:'applyAmount',value:""}
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
	//选择商品
	function selectGoods(searchKey){
	    //判定供应商是否存在
		var supplierId = "";
	    
	    var branchId = $("#branchId").val();
	    if(!branchId){
	    	messager("请先选择收货机构");
	    }
	    
	    new publicGoodsService("BA",function(data){
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
	            inputTax:'tax',
	            salePrice:'applyPrice'
	        };
	        var rows = gFunUpdateKey(addDefaultData,keyNames);
	        var argWhere ={skuCode:1};  //验证重复性
	        var isCheck ={isGift:1 };   //只要是赠品就可以重复
	        var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
	        $("#gridEditOrder").datagrid("loadData",newRows);

	        gridHandel.setLoadFocus();
	        setTimeout(function(){
	            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
	            gridHandel.setSelectFieldName("applyNum");
	            gridHandel.setFieldFocus(gridHandel.getFieldTarget('applyNum'));
	        },100)
	        
	    },searchKey,0,"","",branchId,supplierId,"0");
	}

	//保存
	function saveItemHandel(){

	    $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());
	    var rows = gridHandel.getRowsWhere({skuName:'1'});
	    $(gridHandel.getGridName()).datagrid("loadData",rows);
	    if(rows.length==0){
	        messager("表格不能为空");
	        return;
	    }
	    var isCheckResult = true;
	    var isChcekPrice = false;
	    var isChcekNum = false;
	    var isApplyDesc =false;
	    var isCheckAmount = false;
	    $.each(rows,function(i,v){
	        v["rowNo"] = i+1;
	        if(!v["skuName"]){
	            messager("第"+(i+1)+"行，货号不正确");
	            isCheckResult = false;
	            return false;
	        };
	        if(!v["applyPrice"] || parseFloat(v["applyPrice"])<0){
	            isChcekPrice = true;
	        }
	        if(!v["applyAmount"] || parseFloat(v["applyAmount"])<0){
	            isCheckAmount = true;
	        }
	        //数量判断
	        if(!v["applyNum"] || parseFloat(v["applyNum"])<=0){
	        	isChcekNum = true;
	        }
	        if (!$.trim(v["applyDesc"]) ){
	        	isApplyDesc = true;
	        }
	    });
	    if(isCheckResult){
	        /*if(isChcekPrice){
	            $.messager.confirm('系统提示',"单价存在为0，重新修改",function(r){
	                if (r){
	                    return ;
	                }else{
	                    saveDataHandel(rows);
	                }
	            });
	        }else{*/
	        	if(isChcekNum){
	          		 /*$.messager.confirm('提示','存在数量为0的商品,是否继续保存?',function(data){
	          			if(data){
	          				saveDataHandel(rows);
	          		    }
	          		 });*/
	        		messager("存在数量为0的商品,不能保存！");
	            }else if(isApplyDesc){
	        		messager("存在商品没有申请说明,不能保存,请填写申请说明！");
	        	}else if(isChcekPrice){
	        		messager("单价存在为空或者负数，请重新修改！");
	        	}else if(isCheckAmount){
	        		messager("金额存在为空，请重新修改！");
	        	}else{
	            	saveDataHandel(rows);
	            }
	        //}
	    }
	}
	function saveDataHandel(rows){
	    //供应商
	    var supplierId = $("#supplierId").val();
	    //收货机构
	    var branchId = $("#branchId").val();
	    //交货期限
	    var deliverTime = $("#deliverTime").val();
	    //采购员
	    var salesmanId = $("#salesmanId").val();
	    var id = $("#formId").val();
	    //备注
	    var remark = $("#remark").val();

	    //计算获取商品总数量和总金额
	    //商品总数量
	    var totalNum = 0;
	    //总金额
	    var amount=0;

	    var footerRows = $("#gridEditOrder").datagrid("getFooterRows");
	    if(footerRows){
	        totalNum = parseFloat(footerRows[0]["applyNum"]||0.0).toFixed(4);
	        amount = parseFloat(footerRows[0]["applyAmount"]||0.0).toFixed(4);
	    }

	    var reqObj = {
	        id:id,
	        supplierId:supplierId,
	        branchId:branchId,
	        deliverTime:deliverTime,
	        salesmanId:salesmanId,
	        totalNum:totalNum,
	        amount:amount,
	        remark:remark,
	        detailList:rows
	    };
	    
	    var req = JSON.stringify(reqObj);

	    $.ajax({
	        url:contextPath+"/form/overdue/detail/update",
	        type:"POST",
	        contentType:'application/json',
	        data:req,
	        success:function(result){
	            console.log(result);
	            if(result['code'] == 0){
	                $.messager.alert("操作提示", "操作成功！", "info",function(){
	                	location.reload();
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
	function check(){
		if((hiddenStatus==="3")){
			messager("请先点击提交再审核!");
	        return;
		}
	    $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());
	    var rows = gridHandel.getRows();
	    if(rows.length==0){
	        messager("表格不能为空");
	        return;
	    }
	    var isCheckResult = true;
	    var ids = new Array();
	    var auditDescs = new Array();
	    var num=0;
	    $.each(rows,function(i,v){
	        v["rowNo"] = i+1;
	        if(!v["auditDesc"]){
	            messager("第"+(i+1)+"行，处理意见不能为空!");
	            isCheckResult = false;
	            return false;
	        }else{
	        	ids.push(v["id"]);
	        	auditDescs.push(v["auditDesc"]);
	        }
	       
	    });
	    
	    if(!isCheckResult){
	        return
	    }else{
			 $.messager.confirm('提示','是否审核通过？',function(data){
				 if(data){
					 checkOrder(ids,auditDescs);
				 }
			    
			 });
		}
	}

	//审核调价单
	function checkOrder( ids,auditDescs){
		 var id = $("#formId").val();
		 $.ajax({
	         url:contextPath+"/form/overdue/check",
	         type:"POST",
	         data:{
	             formId:id,
	             status:1,
	             ids:ids,
	             auditDescs:auditDescs
	         },
	         success:function(result){
	             console.log(result);
	             if(result['code'] == 0){
	                 $.messager.alert("操作提示", "操作成功！", "info",function(){
	                     location.href = contextPath +"/form/overdue/edit/" + id;
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

	function orderDelete(){
		var id = $("#formId").val();
		$.messager.confirm('提示','是否要删除此条数据',function(data){
			if(data){
				$.ajax({
			    	url:contextPath+"/form/overdue/delete",
			    	type:"POST",
			    	data:{
			    		formIds:id
			    	},
			    	success:function(result){
			    		console.log(result);
			    		if(result['code'] == 0){
			    			/*messager("操作成功");
			    			toClose();*/
			    			$.messager.alert("操作提示", "操作成功！", "info",function(){
			                     location.href = contextPath +"/form/overdue/add/";
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

	function selectSupplier(){
		new publicSupplierService(function(data){
			$("#supplierId").val(data.id);
			$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
		});
	}
	function selectOperator(){
		new publicOperatorService(function(data){
			$("#salesmanId").val(data.id);
			$("#operateUserName").val(data.userName);
		});
	}
	function searchBranch(){
		new publicBranchService(function(data){
			$("#branchId").val(data.branchesId);
			$("#branchName").val("["+data.branchCode+"]"+data.branchName);
			gridHandel.setLoadData([$.extend({},gridDefault)]);
		},0);
	}

	function toImportproduct(type){
	    var branchId = $("#branchId").val();
	    if(!branchId){
	        messager("请先选择机构");
	        return;
	    }
	    var param = {
	        url:contextPath+"/form/overdue/import/list",
	        tempUrl:contextPath+"/form/overdue/export/templ",
	        type:type,
	        branchId:branchId
	    };
	    new publicUploadFileService(function(data){
	        updateListData(data);
	        
	    },param)
	}

	function updateListData(data){
		   // var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
		    //var addDefaultData  = gridHandel.addDefault(data,gridDefault);
	        $.each(data,function(i,val){
	        	data[i]["applyDesc"] = "";
	            data[i]["applyNum"]=data[i]["applyNum"]||0;
	            data[i]["applyPrice"]=data[i]["applyPrice"]||0;
	            data[i]["applyAmount"]  = parseFloat(data[i]["applyPrice"]||0)*parseFloat(data[i]["applyNum"]||0);
	        });
		    var keyNames = {
		        purchasePrice:'price',
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

	//模板导出
	function exportTemp(){
		location.href=contextPath+'/form/overdue/export/templ';
	}

	/**
	 * 获取导入的数据
	 * @param data
	 */
	function getImportData(data){
	    $.each(data,function(i,val){
	        data[i]["oldPurPrice"] = data[i]["purchasePrice"];
	        data[i]["oldSalePrice"]=data[i]["salePrice"];
	        data[i]["oldWsPrice"]=data[i]["wholesalePrice"];
	        data[i]["oldVipPrice"]=data[i]["vipPrice"];
	        data[i]["oldDcPrice"]=data[i]["distributionPrice"];
	        data[i]["price"] = data[i]["oldPurPrice"];
	        data[i]["realNum"]=data[i]["realNum"]||0;
	        data[i]["amount"]  = parseFloat(data[i]["price"]||0)*parseFloat(data[i]["realNum"]||0);
	        data[i]["largeNum"]  = (parseFloat(data[i]["realNum"]||0)/data[i]["purchaseSpec"]).toFixed(4);
	        
	        
	    });
	    var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
	    var argWhere ={skuCode:1};  //验证重复性
	    var newRows = gridHandel.checkDatagrid(nowRows,data,argWhere,{});

	    $("#"+gridHandel.getGridName()).datagrid("loadData",newRows);
	    messager("导入成功");
	}

	function orderAdd(){
		toAddTab("新增调价订单",contextPath + "/form/overdue/add");
	}


	function exportDetail(){
		var formId = $("#formId").val();
		window.location.href = contextPath + '/form/overdue/exports?id='+formId+'&formNo='+$("#formNo").val();
	}
	
	var commit = function(){
		
		 $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());
		    var rows = gridHandel.getRowsWhere({skuName:'1'});
		    $(gridHandel.getGridName()).datagrid("loadData",rows);
		    if(rows.length==0){
		        messager("表格不能为空");
		        return;
		    }
		    var isCheckResult = true;
		    var isChcekPrice = false;
		    var isChcekNum = false;
		    var isApplyDesc =false;
		    var isCheckAmount=false;
		    $.each(rows,function(i,v){
		        v["rowNo"] = i+1;
		        if(!v["skuName"]){
		            messager("第"+(i+1)+"行，货号不正确");
		            isCheckResult = false;
		            return false;
		        };
		        if(!/^\d+(\.\d+)?$/.test(v["applyPrice"]) || parseFloat(v["applyPrice"])<0){
		            isChcekPrice = true;
		        }
		        if(!/^\d+(\.\d+)?$/.test(v["applyAmount"]) || parseFloat(v["applyAmount"])<0){
		            isCheckAmount = true;
		        }
		        //数量判断
		        if( !v["applyNum"] || parseFloat(v["applyNum"])<=0){
		        	isChcekNum = true;
		        }
		        if (v["applyDesc"].replace(/(^s*)|(s*$)/g, "").length ==0){
		        	isApplyDesc = true;
		        }
		    });
		    if(isCheckResult){
		        if(isChcekPrice){
		        	messager("单价存在为空，请重新修改！");
		              
		        }else{
		        	if(isChcekNum){
		        		messager("存在数量为0的商品,不能保存！");
		            }else if(isApplyDesc){
		        		messager("存在商品没有申请说明,不能保存,请填写申请说明！");
		        	}else if(isCheckAmount){
		        		messager("金额存在为空，请重新修改！");
		        	}
		        		else{
		        		 var reqObj = {
		        			        id:$("#formId").val(),
		        			        remark:$("#remark").val(),
		        			        status:0,
		        			        detailList:rows
		        			    };
		        			    
		        			    var req = JSON.stringify(reqObj);

		        			    $.ajax({
		        			        url:contextPath+"/form/overdue/commit",
		        			        type:"POST",
		        			        contentType:'application/json',
		        			        data:req,
		        			        success:function(result){
		        			            console.log(result);
		        			            if(result['code'] == 0){
		        			                $.messager.alert("操作提示", "操作成功！", "info",function(){
		        			                	location.reload();
		        			                });
		        			            }else{
		        			                successTip(result['message']);
		        			            }
		        			            //refreshCurrTab();
		        			        },
		        			        error:function(result){
		        			            successTip("请求发送失败或服务器处理失败");
		        			        }
		        			    });
		            }
		        }
		    }
		    
		    
	}
	
	
var	cleaeBranchId=function(){
		$("#branchId").val("");
	};