/**
 * Created by zhanghuan on 2016/08/09.
 */
// datagridId datagrid的Id
var datagridId = "addModifyPriceGrid";

// 是否保存过添加的单据数据的标志位
var isClickSaveData = false;
// datagrid对象
var addModifyPriceGridDg;

var loginBranchId;

$(function() {
	loginBranchId = $("#loginBranchId").val();
	// 初始化表格
	initAddModifyPriceGridEdit();
	// 初始化复选框
	initCheckbox();
	
	 if($("#close").val()){
	    	$("#addButton").addClass("unhide");
	    	$("#toBackByJSButton").attr("onclick","window.parent.closeTab()");
	    }
	
	var formNo = $("#formNo").text();
	if (formNo != null && formNo != '') {
		addModifyPriceGridDg.datagrid('options').queryParams = {
			formNo : formNo
		};
		addModifyPriceGridDg.datagrid('options').url = contextPath
			+ "/goods/priceAdjust/queryDetailsByformNo";
		addModifyPriceGridDg.datagrid('load');
	}
	// 已审核
	var status = $("#status").val();
	if (status == 1) {
		// input禁用,a标签移除事件，增加“已审核”标志
		datagridUtil.readOnlyInput();
	}
});
var gridDefault = {
//	oldPurPrice:0.00,
//	oldDcPrice:0.00,
//	oldVipPrice:0.00,
//	oldWsPrice:0.00,
//	oldSalePrice:0.00
}
var gridHandel = new GridClass();
// 初始化列表
function initAddModifyPriceGridEdit() {
	gridHandel.setGridName(datagridId);
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
	});
	addModifyPriceGridDg = $("#" + datagridId).datagrid({
				align : 'center',
				//toolbar: '#tb',     //工具栏 id为tb
		        singleSelect:false,  //单选  false多选
		        rownumbers:true,    //序号
		        pagination:true,    //分页
		        fitColumns:true,    //每列占满
		        //fit:true,            //占满
		        showFooter:true,
				height:'600px',
				width:'100%',
				data : [ {
					"rows" : [$.extend({},gridDefault)]
				} ],
				
				columns : [ [
					{
						field : 'ck',
						checkbox : true
					},
					{
						field : 'formId',
						hidden : true
					},
					{
						field : 'skuId',
						hidden : true
					},
					{
						field : 'cz',
						title : '操作',
						width : '60px',
						align : 'left',
						formatter : function(value, row, index) {
							var str = '<a name="add" class="add-line" data-index="'
								+ index
								+ '" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;'
								+ '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'
								+ index
								+ '" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
							return str;
						},
					}, {
						field : 'skuCode',
						title : '货号',
						width : '120px',
						align : 'left',
						editor : {
							type : 'textbox'
						}
					}, {
						field : 'skuName',
						title : '商品名称',
						width : '200px',
						align : 'left'
					}, {
						field : 'barCode',
						title : '条码',
						width : '130px',
						align : 'left'
					}, {
						field : 'spec',
						title : '规格',
						width : '90px',
						align : 'left'
					}, {
						field : 'unit',
						title : '单位',
						width : '60px',
						align : 'left'
					}, {
						field : 'oldPurPrice',
						title : '原进货价',
						width : '120px',
						align : 'right',
						formatter : function(value, row, index) {
							var str=0.00;
							if(value){
								str= parseFloat(value).toFixed(2);
							}
		    				return str;
		    			}
					}, // 进价
					{
						field : 'newPurPrice',
						title : '新进货价',
						width : '120px',
						align : 'right',
						formatter : function(value, row, index) {
							var str=0.0000;
							if(value){
								str= parseFloat(value).toFixed(4);
							}
		    				return str;
		    			},
						editor : {
							type : 'numberbox',
							options : {
								min:0,
								precision:4,
							}
						}
					}, {
						field : 'oldSalePrice',
						title : '原零售价',
						width : '120px',
						align : 'right',
						formatter : function(value, row, index) {
							var str=0.0000;
							if(value){
								str= parseFloat(value).toFixed(4);
							}
		    				return str;
		    			}
					}, // 售价
					{
						field : 'newSalePrice',
						title : '新零售价',
						width : '120px',
						align : 'right',
						formatter : function(value, row, index) {
							var str=0.0000;
							if(value){
								str= parseFloat(value).toFixed(4);
							}
		    				return str;
		    			},
						editor : {
							type : 'numberbox',
							options : {
								min:0,
								precision:4,
							}
						}
					}, {
						field : 'oldDcPrice',
						title : '原配送价',
						width : '120px',
						align : 'right',
						formatter : function(value, row, index) {
							var str=0.0000;
							if(value){
								str= parseFloat(value).toFixed(4);
							}
		    				return str;
		    			}
					}, // 配送价
					{
						field : 'newDcPrice',
						title : '新配送价',
						width : '120px',
						align : 'right',
						formatter : function(value, row, index) {
							var str=0.0000;
							if(value){
								str= parseFloat(value).toFixed(4);
							}
		    				return str;
		    			},
						editor : {
							type : 'numberbox',
							options : {
								min:0,
								precision:4,
							}
						}
					}, {
						field : 'oldWsPrice',
						title : '原批发价',
						width : '120px',
						align : 'right',
						formatter : function(value, row, index) {
							var str=0.0000;
							if(value){
								str= parseFloat(value).toFixed(4);
							}
		    				return str;
		    			}
					}, // 批发价
					{
						field : 'newWsPrice',
						title : '新批发价',
						width : '120px',
						align : 'right',
						formatter : function(value, row, index) {
							var str=0.0000;
							if(value){
								str= parseFloat(value).toFixed(4);
							}
		    				return str;
		    			},
						editor : {
							type : 'numberbox',
							options : {
								min:0,
								precision:4,
							}
						}
					}, {
						field : 'oldVipPrice',
						title : '原会员价',
						width : '120px',
						align : 'right',
						formatter : function(value, row, index) {
							var str=0.0000;
							if(value){
								str= parseFloat(value).toFixed(4);
							}
		    				return str;
		    			}
					}, // 会员价
					{
						field : 'newVipPrice',
						title : '新会员价',
						width : '120px',
						align : 'right',
						formatter : function(value, row, index) {
							var str=0.0000;
							if(value){
								str= parseFloat(value).toFixed(4);
							}
		    				return str;
		    			},
						editor : {
							type : 'numberbox',
							options : {
								min:0,
								precision:4,
							}
						}
					} ] ],
				onClickCell : function(rowIndex, field, value) {
					gridHandel.setBeginRow(rowIndex);
					gridHandel.setSelectFieldName(field);
					var target = gridHandel.getFieldTarget(field);
					if(target){
						gridHandel.setFieldFocus(target);
					}else{
						gridHandel.setSelectFieldName("skuCode");
					}
				},
				onLoadSuccess : function() {
					gridHandel.setDatagridHeader("center");
					datagridUtil.isCheckBoxChecked("purchasePrice");// 进价
					datagridUtil.isCheckBoxChecked("retailPrice");// 零售价
					datagridUtil.isCheckBoxChecked("tradePrice");// 批发价
					datagridUtil.isCheckBoxChecked("memberPrice");// 会员价
					datagridUtil.isCheckBoxChecked("distributionPrice");// 配送价
				}
			});
}
//初始化复选框
function initCheckbox(){
	// 进价
	$("#purchasePrice").on("click", function() {
		datagridUtil.isCheckBoxChecked("purchasePrice");
	});
	// 零售价
	$("#retailPrice").on("click", function() {
		datagridUtil.isCheckBoxChecked("retailPrice");
	});
	// 批发价
	$("#tradePrice").on("click", function() {
		datagridUtil.isCheckBoxChecked("tradePrice");
	});
	// 会员价
	$("#memberPrice").on("click", function() {
		datagridUtil.isCheckBoxChecked("memberPrice");
	});
	// 配送价
	$("#distributionPrice").on("click", function() {
		datagridUtil.isCheckBoxChecked("distributionPrice");
	});
}

// 新增
function addModifyDataGrid() {
	// 如果页面为空，则不需要提示，只有页面都输入值，才校验是否保存过数据
	if (datagridUtil.isSaveData()) {
		if (isClickSaveData) {
			window.location.href = contextPath
				+ "/goods/priceAdjust/addFormView";
		} else {
			var d = $("<div />")
				.dialog(
					{
						title : '提示',
						top : 20,
						width : 350,
						height : 150,
						maximizable : false,
						modal : true,
						content : "<div class='upad-12 ufs-14'>页面内容有修改,是否保存? 点击是:保存,点击否:不保存,或点击取消不做任何处理...</div>",
						buttons : [
							{
								text : '是',
								handler : function() {
									window.location.href = contextPath
										+ "/goods/priceAdjust/addFormView";
								}
							}, {
								text : '否',
								handler : function() {
									d.panel('destroy');
								}
							}, {
								text : '取消',
								handler : function() {
									d.panel('destroy');
								}
							} ]
					});
		}
	} else {
		window.location.href = contextPath + "/goods/priceAdjust/addFormView";
	}
}
// 删单
function delModifyOrderDialog() {
	// 是否选择的datagrid的行，选择为true，未选择为false，则提示用户选择
	// 确定删除，调用后台删除方法
	var formNo = $('#formNo').text();
	if (formNo) {
		$.messager.confirm('提示', '单据删除后将无法恢复，确认是否删除？', function(r) {
			if (r) {
				//删除单据
				$.ajax({
					type: "POST",
					url: contextPath+"/goods/priceAdjust/removeForm",
					data: {"formNo":formNo},
					dataType: "json",
					success: function(data){
						window.location.href = contextPath + "/goods/priceAdjust/addFormView";
					}
				});
			}
		});
	}else{
		$.messager.confirm('提示', '没有单据可以删除');
	}
}

// 保存单据
function saveModifyPriceOrder() {
	gFunStartLoading();
	// 判断用户是否选择区域，选择为true，未选择为false，则提示用户选择
	if (datagridUtil.isSelectArea()) {
		// datagrid是否存在数据，存在为true，不存在为false，则提示用户输入
		if (datagridUtil.isHasDataGrid()) {
			var formData = $('#searchForm').serializeObject();
			var detailList =  getDatagridRows();
			if(detailList.length>1000){
				messager("保存数据不能超过1000条");
				gFunEndLoading();
				return;
			}
			if(detailList.length==0){
				messager("表格不能为空");
				gFunEndLoading();
				return;
			}
			
			if (datagridUtil.isCheckPrice()) {
				gFunEndLoading();
				if(datagridUtil.isCheckRemark()){
					var params = {
							goodsPriceForm:formData,
							goodsPriceFormDetailList:detailList,
							branchIds:$("#branchId").val()
						}
					var reqObj = JSON.stringify(params);
			// 调用后台保存方法，成功提示
			$.ajax({
					type : "POST",
					url : contextPath + "/goods/priceAdjust/saveForm",
					data :reqObj,
					dataType:"json",
					contentType : "application/json",
					success : function(data) {
						gFunEndLoading();
						if (data.code == 0) {
							isClickSaveData = true;
							// 代表点击过保存单据数据
							$.messager.alert('提示','单据保存成功！',"info",function() {
										// window.location.href =
										// contextPath+"/goods/priceAdjust/showDetail?formNo="+data.formNo;
										addModifyPriceGridDg.datagrid('options').queryParams = {formNo : data.goodsPriceForm.formNo};
										addModifyPriceGridDg.datagrid('options').url = contextPath+ "/goods/priceAdjust/getForm";
										addModifyPriceGridDg.datagrid('load');
										$("#formNo").text(data.goodsPriceForm.formNo);
										$("#formNoInput").val(data.goodsPriceForm.formNo);
										$("#createUserId").text(data.createUserName);
										$("#createUserDate").text(data.createUserDate);
										$("#id").val(data.goodsPriceForm.id);
										$("#saveModifyPriceOrder").attr("onclick","updateModifyPriceOrder();");
										/*$.messager.confirm('提示','是否审核，请确认？',function(r) {
													if (r) {
														// 确定审核，调用后台的审核方法，成功提示
														// 审核成功跳转到已审核页面，加上已审核标志
														// 得到新的生效时间
														var effectDate = $("#effectDate").val();
														var status = 1;
														var result = checkForm(data.goodsPriceForm.formNo,status,effectDate);
													}
												});*/
									});
						} else {
							// 失败提示
							$.messager.alert('提示', data.message);
						}
					}
				});
			}
			}
     }
  }
}
// 修改调价单
function updateModifyPriceOrder() {
	gFunStartLoading();
	// 判断用户是否选择区域，选择为true，未选择为false，则提示用户选择
	if (datagridUtil.isSelectArea()) {
		// datagrid是否存在数据，存在为true，不存在为false，则提示用户输入
		var formData = $('#searchForm').serializeObject();
		var detailList =  getDatagridRows();
		if(detailList.length>1000){
			messager("保存数据不能超过1000条");
			gFunEndLoading();
			return;
		}
		if(detailList.length==0){
			messager("表格不能为空");
			gFunEndLoading();
			return;
		}
		
		var isCheck = true;
		for(var i=0;i<detailList.length;i++){
			var item = detailList[i];
		      if(parseFloat(item["newSalePrice"]) < parseFloat(item["newVipPrice"])){
		          messager("第"+(i+1)+"行，新会员价要小于新销售价");
		          isCheck = false;
		          break;
		      };
		}
		
		if(isCheck === false){
			gFunEndLoading();
			return;
		}
		
		if (datagridUtil.isHasDataGrid()) {
			if(datagridUtil.isCheckRemark()){
				var params = {
						goodsPriceForm:formData,
						goodsPriceFormDetailList:detailList,
						branchIds:$("#branchId").val()
						}
				var reqObj = JSON.stringify(params);
			// 调用后台保存方法，成功提示
			$.ajax({
					type : "POST",
					url : contextPath + "/goods/priceAdjust/updateForm",
					contentType : "application/json",
					data : reqObj,
					//dataType : "json",
					success : function(data) {
						gFunEndLoading();
						if (data.code == 0) {
							isClickSaveData = true;
							// 代表点击过保存单据数据
							$.messager.alert('提示','单据保存成功！',"info",function() {
										// window.location.href =
										// contextPath+"/goods/priceAdjust/showDetail?formNo="+data.formNo;
										addModifyPriceGridDg.datagrid('options').queryParams = {formNo : data.goodsPriceForm.formNo};
										addModifyPriceGridDg.datagrid('options').url = contextPath+ "/goods/priceAdjust/getForm";
										addModifyPriceGridDg.datagrid('load');
										$("#formNo").text(data.goodsPriceForm.formNo);
										$("#formNoInput").val(data.goodsPriceForm.formNo);
										/*$.messager.confirm('提示','是否审核，请确认？',function(r) {
													if (r) {
														// 确定审核，调用后台的审核方法，成功提示
														// 审核成功跳转到已审核页面，加上已审核标志
														// 得到新的生效时间
														var effectDate = $("#effectDate").val();
														var status = 1;
														var result = checkForm(data.goodsPriceForm.formNo,status,effectDate);
													}
												});*/
									});
						} else {
							// 失败提示
							$.messager.alert('提示', data.message);
						}
					}
				});
			}
		}
	}
}

/**
 * 审核
 */
function check() {
	var formNo = $("#formNo").text();
	// 通过审核
	var status = 1;
	var effectDate = $("#effectDate").val();
	checkForm(formNo, status,effectDate);
}
// 审核
function checkForm(formNo, status,effectDate) {
	$.ajax({
		type : "POST",
		url : contextPath + "/goods/priceAdjust/checkForm",
		data : {
			formNo : formNo,
			status : status,
			effectDate:effectDate
		},
		dataType : "json",
		success : function(data) {
			console.info(data);
			if (data.code > 0) {
				$.messager.alert('提示', data.message, "info");
			} else {
				$.messager.alert('提示', '单据审核成功！', "info", function() {
					window.location.href = contextPath
						+ "/goods/priceAdjust/showDetail?formNo=" + formNo;

				});
			}

		}
	});
}

// datagrid的常用操作方法
var datagridUtil = {
	/**
	 * 如果页面为空，则不需要提示，只有页面都输入值，才校验是否保存过数据
	 *
	 * @returns {boolean}
	 */
	isSaveData : function() {
		if ($("#areaInput").val().trim() != ""
			&& $("#branchId").val().trim() != ""
			&& $("#" + datagridId).datagrid("getData").rows.length > 0) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 备注不能超过125个字
	 *
	 * @returns {boolean}
	 */
	isCheckRemark : function() {
		var remark = $("#remark").val();
		if(remark.length>125){
			$.messager.alert('提示', '备注信息不能超过125个字');
			return false;
		}else{
			return true;
		}
	},
	/**
	 * 判断用户是否选择区域，选择为true，未选择为false，则提示用户选择
	 *
	 * @returns {boolean}
	 */
	isSelectArea : function() {
		if ($("#branchId").val().trim() == "") {
			$.messager.alert('提示', '请先选择机构');
			gFunEndLoading();
			return false;
		} else {
			return true;
		}
	},
	/**
	 * 判断用户是否选择调价设置
	 *
	 * @returns {boolean}
	 */
	isCheckPrice : function() {
		var isCheckPrice=false;
		$("#checkBoxPrice").find("input[type='checkbox']").each(function(){
			if(this.checked==true){
				isCheckPrice=true;
				return false;
			}else{
				isCheckPrice=false;
			}
		});
		if(!isCheckPrice){
			$.messager.alert('提示', '没有勾选调价设置！');
			gFunEndLoading();
		}
		return isCheckPrice;
	},
	/**
	 * 是否选择的datagrid的行，选择为true，未选择为false，则提示用户选择
	 *
	 * @returns {boolean}
	 */
	isSelectRows : function() {
		if ($("#" + datagridId).datagrid("getSelections").length <= 0) {
			$.messager.alert('提示', '没有单据可以删除，请选择一笔单据再删除？');
			return false;
		} else {
			return true;
		}
	},
	/**
	 * datagrid是否存在数据，存在为true，不存在为false，则提示用户输入
	 *
	 * @returns {boolean}
	 */
	isHasDataGrid : function() {
		if ($(".datagrid-btable td[field='skuCode']").length <= 0) {
			$.messager.alert('提示', '明细数据不能为空，请输入！');
			gFunEndLoading();
			return false;
		} else {
			var count = 0;
			// 判断列表数据属否为空
			for (var i = 0; i < $(".datagrid-btable td[field='skuCode']").length; i++) {
				if ($(".datagrid-btable td[field='skuCode']").eq(i).text() != ""
					&& $(".datagrid-btable td[field='skuCode']").eq(i)
						.text() != undefined) {
					count++;
				}
				if ($(".datagrid-btable td[field='skuCode']").eq(i).find(
						".textbox-value").val() != ""
					&& $(".datagrid-btable td[field='skuCode']").eq(i)
						.find(".textbox-value").val() != undefined) {
					count++;
				}
			}
			if (count == 0) {
				$.messager.alert('提示', '明细数据不能为空，请输入！');
				gFunEndLoading();
				return false;
			} else {
				return true;
			}
		}
	},
	/**
	 * 判断checkbox是否选择，从而显示或者隐藏datagird的Column列
	 *
	 * @param datagridId
	 *            datagrid的Id
	 * @param checkboxId
	 *            checkbox的id
	 */
	isCheckBoxChecked : function(checkboxId) {
		var _this = this;
		var fieldArr = []; // field的数组
		switch (checkboxId) {
			case "purchasePrice": // 进价
				fieldArr = [ "oldPurPrice", "newPurPrice" ];
				break;
			case "retailPrice": // 零售价
				fieldArr = [ "oldSalePrice", "newSalePrice" ];
				break;
			case "tradePrice": // 批发价
				fieldArr = [ "oldWsPrice", "newWsPrice" ];
				break;
			case "memberPrice": // 会员价
				fieldArr = [ "oldVipPrice", "newVipPrice" ];
				break;
			case "distributionPrice": // 配送价
				fieldArr = [ "oldDcPrice", "newDcPrice" ];
				break;
			default:
				break;
		}
		if ($("#" + checkboxId).is(":checked")) {
			_this.showDataGridColumn(fieldArr);
		} else {
			_this.hideDataGridColumn(fieldArr);
		}
	},
	/**
	 * 显示列
	 *
	 * @param datagridId
	 *            datagrid的Id
	 * @param fieldLen
	 *            列的field个数
	 */
	showDataGridColumn : function(fieldArr) {
		for (var i = 0; i < fieldArr.length; i++) {
			$("#" + datagridId).datagrid("showColumn", fieldArr[i]);
		}
	},
	/**
	 * 隐藏列
	 *
	 * @param datagridId
	 *            datagrid的Id
	 * @param fieldLen
	 *            列的field个数
	 */
	hideDataGridColumn : function(fieldArr) {
		for (var i = 0; i < fieldArr.length; i++) {
			$("#" + datagridId).datagrid("hideColumn", fieldArr[i]);
		}
	},
	/**
	 * input禁用,a标签移除事件，增加“已审核”标志
	 */
	readOnlyInput : function() {
		$("input").each(function() {
			$(this).attr({
				"readonly" : "readonly",
				"disabled" : "disabled"
			});
		});
		$(".add-line,.del-line").each(function() {
			$(this).removeAttr("onclick");
		});
		$(".ubtn").each(function() {
			$(this).removeAttr("onclick");
		});
		$(".uinp-more").each(function() {
			$(this).removeAttr("onclick");
		});
		$("#saveModifyPriceOrder").removeAttr("onclick");
		$("#check").removeAttr("onclick");
		$("#selectGoodsDialog").removeAttr("onclick");
		$("#delModifyOrderDialog").removeAttr("onclick");
		$("#set").removeAttr("onclick");
		$("#importdetail").removeAttr("onclick");

		$("#" + datagridId).datagrid('removeEditor', 'skuCode');
		$("#" + datagridId).datagrid('removeEditor', 'newPurPrice');
		$("#" + datagridId).datagrid('removeEditor', 'newSalePrice');
		$("#" + datagridId).datagrid('removeEditor', 'newDcPrice');
		$("#" + datagridId).datagrid('removeEditor', 'newWsPrice');
		$("#" + datagridId).datagrid('removeEditor', 'newVipPrice');
		var czArr = [ "cz" ];
		this.hideDataGridColumn(czArr);
		// 增加“已审核”标志
		$("#already-examine").removeClass("uhide");
	},
	/**
	 * 所有editor失去焦点,结束之前的编辑
	 */
	setEditorBlur : function() {
		var rows = $("#" + datagridId).datagrid("getRows");
		for (var i = 0; i < rows.length; i++) {
			$("#" + datagridId).datagrid("endEdit", i);
		}
	}
}

// 调价公式
function setModifyPriceDialog() {
	// 所有editor失去焦点,结束之前的编辑
	datagridUtil.setEditorBlur();

	// 判断用户是否选择区域，选择为true，未选择为false，则提示用户选择
	if (datagridUtil.isSelectArea()) {
		// datagrid是否存在数据，存在为true，不存在为false，则提示用户输入
		if (datagridUtil.isHasDataGrid()) {
			// 当前panel
			var thisPanel;
			var d = $("<div />").dialog({
				title : '公式应用',
				top : 20,
				width : 600,
				height : 220,
				href : contextPath + '/goods/priceAdjust/modifyPriceDialog',
				maximizable : false,
				modal : true,
				onOpen : function() {
					thisPanel = $(this);
				},
				onClose : function() {
					$(this).panel('destroy');
				},
				buttons : [ {
					text : '确定',
					handler : function() {
						// 根据调节选择设置对应价格
						setModifyPrice(thisPanel);
					}
				}, {
					text : '返回',
					handler : function() {
						d.panel('destroy');
					}
				} ]
			});
		}
	}
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
	selectGoodsDialog(searchKey);
}
/**
 * 商品选择
 */
function selectGoodsDialog(searchKey) {
	var branchId=null;
	//判定供应商是否存在
    if($("#branchId").val()==""){
        messager("请先选择机构");
        return;
    }
    branchId=$("#branchId").val();
	gFunGoodsSelect(searchKey,branchId);
    /*var bool = $("#branchId").val().indexOf(",");
    if(bool<0){
    	// 没有逗号表示机构id只有一个值 查询本机构中的商品
    	branchId=$("#branchId").val();
    	gFunGoodsSelect(searchKey,branchId);
    }else{
    	//查询登录机构下商品
    	branchId=loginBranchId;
    	gFunGoodsSelect(searchKey,branchId);
    }*/
}
//商品选择 公共使用
function gFunGoodsSelect(searchKey,branchId){
	 new publicGoodsService('PC', function(data) {
			if(searchKey){
				$("#addModifyPriceGrid").datagrid("deleteRow", gridHandel.getSelectRowIndex());
				$("#addModifyPriceGrid").datagrid("acceptChanges");
			}
			var nowRows = gridHandel.getRowsWhere({'skuName':true});
			//var addDefaultData  = gridHandel.addDefault(data,gridDefault);
			var argWhere ={skuCode:true};  //验证重复性
			var keyNames = {
				//id : "skuId",
				purchasePrice : 'oldPurPrice',
				distributionPrice : 'oldDcPrice',
				vipPrice : 'oldVipPrice',
				wholesalePrice : 'oldWsPrice',
				salePrice : 'oldSalePrice',
				disabled :""
			};
			var keyNames2 = {
				oldPurPrice : 'newPurPrice',
				oldDcPrice : 'newDcPrice',
				oldVipPrice : 'newVipPrice',
				oldWsPrice : 'newWsPrice',
				oldSalePrice : 'newSalePrice'
			}
			var newData = gFunUpdateKey(data,keyNames);
			newData = gFunUpdateKey(newData,keyNames2);
			var newRows = gridHandel.checkDatagrid(nowRows,newData,argWhere);
			console.info(newRows)
			$("#addModifyPriceGrid").datagrid("loadData",newRows);
			  var fieldName = "";
			  var fieldNames = {
					  "purchasePrice":"newPurPrice",
					  "retailPrice":"newSalePrice",
					  "distributionPrice":"newDcPrice",
					  "tradePrice":"newWsPrice",
					  "memberPrice":"newVipPrice",
			  }
		      $('.priceItem:checked').each(function(i){
		    	  debugger;
		       if(0==i){
		    	   fieldName =fieldNames[$(this).attr("id")] ;
		       }
		      });
			  debugger;
		      if(fieldName){
		    	  gridHandel.setLoadFocus();
			        setTimeout(function(){
			            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
			            gridHandel.setSelectFieldName(fieldName);
			            gridHandel.setFieldFocus(gridHandel.getFieldTarget(fieldName));
			        },100)
		      }
	      
		},searchKey,0,"","",branchId,"");	
}

/**
 * 区域选择公共组件
 */
function selectBranchArea() {
	new publicBranchAreaService(function(data) {
		$("#areaInput").val(data.branchAreaId);// id
		$("#areaName").val("["+data.areaCode+"]"+data.areaName);
		// 带出分店列表数据
		$.ajax({
			type : "POST",
			url : contextPath + "/common/branches/getComponentList",
			data : {
				"branchAreaId" : data.branchAreaId
			},
			dataType : "json",
			success : function(data) {
				if (data != null || data != '') {
					var branchName = "";
					var branchesId = "";
					var branchCode= "";
					var showBranch = "";
					for (var i = 0; i < data.list.length; i++) {
						branchesId += data.list[i].branchesId + ",";
						if(data.list[i].branchCode&&data.list[i].branchName){
							showBranch += "["+data.list[i].branchCode+"]"+data.list[i].branchName+",";
						}
						
					}
					var reg = /\,$/;
					branchName = branchName.replace(reg,"");
					//branchName = branchName.substring(0,branchName.length - 1);
					//branchesId = branchesId.substring(0,branchesId.length - 1);
					//branchCode = branchCode.substring(0,branchCode.length - 1);
					branchesId= branchesId.replace(reg,"");
					branchCode = branchCode.replace(reg,"");
					showBranch = showBranch.replace(reg,"");
					$("#branchId").val(branchesId);
					$("#branchShopName").val(showBranch);
					//清空列表数据
					$('#addModifyPriceGrid').datagrid('loadData', {total: 0, rows:  [$.extend({},gridDefault)]});  

				}

			}
		});
	});
}
/**
 * 分店列表 0 单选,1  多选
 */

function selectBranch() {
	new publicBranchService(function(data) {
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
		$("#areaName").val("自定义");
		$("#areaInput").val("");
		//清空列表数据
		$('#addModifyPriceGrid').datagrid('loadData', {total: 0, rows:  [$.extend({},gridDefault)]});  
	},1);
}
//导出
function exportData(){
	var length = $("#addModifyPriceGrid").datagrid('getData').total;
	var status=$("#status").val();
	if(status==0){
		$.messager.alert('提示',"订单未通过审核");
		return;
	}
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	if(length>10000){
		$.messager.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	var formNo=$("#formNoInput").val();
	$("#searchForm").attr("action",contextPath+'/goods/priceAdjust/exportList?formNo='+formNo);
	$("#searchForm").submit();	
}

//打印
function printDesign(formNo){
	var branchId=$("#branchId").val();
	if(!branchId){
		$.messager.alert('提示',"请先选择机构");
	}else{
		//弹出打印页面
		parent.addTabPrint('CASheet' + formNo,formNo+'单据打印',contextPath + '/printdesign/design?page=CASheet&controller=/goods/priceAdjust&template=-1&sheetNo=' + formNo + '&gridFlag=CAGrid','');
	}
}
//验证表格数据 删除不合格数据
function getDatagridRows(){
  $("#addModifyPriceGrid").datagrid("unselectAll");
  $("#addModifyPriceGrid").datagrid("endEdit", gridHandel.getSelectRowIndex());
  var rows = gridHandel.getRows();
  $.each(rows,function(i,val){
      if(!val["skuCode"]||!val["skuName"]){
          rows.splice(i,1);
      }
  });
  return rows;
}


/**
 * 重置
 */
var resetForm = function(){
	 $("#searchForm").form('clear');
};

////模板导出
//function exportTemp(){
//	var temple = $("#temple").attr("value");
//	if(temple=="barCodeTemple"){
//		location.href=contextPath+'/goods/priceAdjust/exportTemp?type=barCodeTemple';
//	}else{
//		location.href=contextPath+'/goods/priceAdjust/exportTemp?type=skuCodeTemple';
//	}
//}
/**
 * 导入
 */
function toImportproduct(type){
    //if($("#supplierId").val()==""){
    //    messager("请先选择供应商");
    //    return;
    //}
    var branchId = $("#branchId").val();
    if(!branchId){
        messager("请先选择机构");
        return;
    }
    var param = {
        url:contextPath+"/goods/priceAdjust/importList",
        tempUrl:contextPath+'/goods/priceAdjust/exportTemp',
        type:type,
        branchId:branchId,
    }
    new publicUploadFileService(function(data){
        updateListData(data);
    },param)
}

function updateListData(data){
    var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
    var addDefaultData  = gridHandel.addDefault(data,gridDefault);
    var keyNames = {
    		purchasePrice : 'oldPurPrice',
    		salePrice:'oldSalePrice',
    		wholesalePrice:'oldWsPrice',
    		vipPrice:'oldVipPrice',
    		distributionPrice:'oldDcPrice'
    };
    var rows = gFunUpdateKey(addDefaultData,keyNames);
    if(data.length>0){
    	var obj = data[0];
    	var arrKey = [
    	              {"newPurPrice":"purchasePrice"},
    	              {"newSalePrice":"retailPrice"},
    	              {"newDcPrice":"distributionPrice"},
    	              {"newWsPrice":"tradePrice"},
    	              {"newVipPrice":"memberPrice"}
    	             ]
    	$.each(obj,function(key,val){
			var d = obj;
			var c = key;
    		$.each(arrKey,function(i,item){
    			if(item[key]&&obj[key]){
    				$("#"+item[key]).attr("checked","checked");
    				 datagridUtil.isCheckBoxChecked(item[key]);
    			}
    		})
    	})
    }
    
    var argWhere ={skuCode:1};  //验证重复性
    var isCheck ={isGift:1 };   //只要是赠品就可以重复
    var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);

    $("#addModifyPriceGrid").datagrid("loadData",newRows);
}
//返回列表页面
function back(){
	toClose();
}


/**
 * 获取导入的数据
 * @param data
 */
/*function getImportData(data){
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
}*/
