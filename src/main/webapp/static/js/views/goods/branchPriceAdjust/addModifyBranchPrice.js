/**
 * Created by zhanghuan on 2016/08/09.
 */
// datagridId datagrid的Id
var datagridId = "addModifyBranchPriceGrid";

// 是否保存过添加的单据数据的标志位
var isClickSaveData = false;
//是否审核过添加的单据数据的标志位
var isClickCheckData = false;
// datagrid对象
var addModifyPriceGridDg;

var checkUtil = new checkUtil();


$(function() {
	checkUtil.setFormId('searchForm');
	checkUtil.initOldData();
	
	// 初始化表格
	initAddModifyPriceGridEdit();
	// 初始化复选框
	initCheckbox();
	
	 if($("#close").val()){
	    	$("#addButton").addClass("unhide");
	    	$("#toBackByJSButton").attr("onclick","window.parent.closeTab()");
	    }
	
	var formId = $("#formId").val();
	if (formId != null && formId != '') {
		isClickSaveData = true;
		initTmpData();
		addModifyPriceGridDg.datagrid('options').queryParams = {
			formId : formId
		};
		addModifyPriceGridDg.datagrid('options').url = contextPath
			+ "/goods/branchPriceAdjust/getBranchPriceDetailsById";
		addModifyPriceGridDg.datagrid('load');
	}
	// 已审核
	var status = $("#status").val();
	if (status == 1) {
		// input禁用,a标签移除事件，增加“已审核”标志
		datagridUtil.readOnlyInput();
		isClickCheckData = true;
	}
});

function initTmpData(){
	checkUtil.initOldData();
	checkUtil.initNewData();
	var _newData = checkUtil.getNewData();
	_newData['grid'] = '';
	var _oldData = checkUtil.getOldData();
	_oldData['grid'] = '';
	checkUtil.setOldData(_oldData);
	checkUtil.setNewData(_newData);
}

var gridDefault = {
//	oldPurPrice:0.00,
//	oldDcPrice:0.00,
//	oldVipPrice:0.00,
//	oldWsPrice:0.00,
//	oldSalePrice:0.00
}
var editRowData = null;
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
		        pagination:false,    //分页
		        fitColumns:true,    //每列占满
		        //fit:true,            //占满
		        showFooter:true,
				height:'600px',
				width:'100%',
//				pageSize:50,
				data : [ {
					"rows" : [$.extend({},gridDefault)]
				} ],
				
				columns : [ [
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
						editor : 'textbox'
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
						}
					}
				},
				onLoadSuccess : function() {
					if(!checkUtil.getOldData()["grid"]){
						checkUtil.getOldData()["grid"] =  gridHandel.getRows();
		            }
					
					gridHandel.setDatagridHeader("center");
					datagridUtil.isCheckBoxChecked("retailPrice");// 零售价
					datagridUtil.isCheckBoxChecked("memberPrice");// 会员价
				}
			});
}
//初始化复选框
function initCheckbox(){
	
	// 零售价
	$("#retailPrice").on("click", function() {
		datagridUtil.isCheckBoxChecked("retailPrice");
	});
	// 会员价
	$("#memberPrice").on("click", function() {
		datagridUtil.isCheckBoxChecked("memberPrice");
	});
}

// 新增
function addModifyDataGrid() {
	if (isClickCheckData) {
		window.location.href = contextPath
			+ "/goods/branchPriceAdjust/addFormView";
	}
	$("#"+datagridId).datagrid("endEdit",gridHandel.getSelectRowIndex());
	
	
	checkUtil.initNewData();
	checkUtil.getNewData()['grid'] = gridHandel.getRows();
	
	
	
	// 如果页面为空，则不需要提示，只有页面都输入值，才校验是否保存过数据
	if (!checkUtil.ifChange()) {
		var content = '';
		if (isClickSaveData) {
			content = "<div class='upad-12 ufs-14'>单据已经变更，是否保存？</div>"
		}else{
			content = "<div class='upad-12 ufs-14'>单据未保存，是否取消编辑并新增?</div>"
		}
			var d = $("<div />")
				.dialog(
					{
						title : '提示',
						top : 20,
						width : 350,
						height : 150,
						maximizable : false,
						modal : true,
						content : content,
						buttons : [
							{
								text : '是',
								handler : function() {
									window.location.href = contextPath
										+ "/goods/branchPriceAdjust/addFormView";
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
		
	} else {
		window.location.href = contextPath + "/goods/branchPriceAdjust/addFormView";
	}
}
// 删单
function delModifyOrderDialog() {
	// 是否选择的datagrid的行，选择为true，未选择为false，则提示用户选择
	// 确定删除，调用后台删除方法
	var formNo = $('#formNoInput').val();
	if (formNo) {
		$_jxc.confirm('单据删除后将无法恢复，确认是否删除？', function(r) {
			if (r) {
				//删除单据
				$_jxc.ajax({
					url: contextPath+"/goods/branchPriceAdjust/deleteForm",
					data: {"formNo":formNo},
				},function(data){
						window.location.href = contextPath + "/goods/priceAdjust/addFormView";
				});
			}
		});
	}else{
		$_jxc.alert('提示', '没有单据可以删除');
	}
}

// 保存单据
function saveModifyPriceOrder() {
	    gFunStartLoading();
	    // 判断用户是否选择区域，选择为true，未选择为false，则提示用户选择
		// datagrid是否存在数据，存在为true，不存在为false，则提示用户输入
		if (datagridUtil.isHasDataGrid()) {
			var formData = $('#searchForm').serializeObject();
			var detailList =  getDatagridRows();
			if(detailList.length>1000){
				$_jxc.alert("保存数据不能超过1000条");
				gFunEndLoading();
				return;
			}
			if(detailList.length==0){
				$_jxc.alert("表格不能为空");
				gFunEndLoading();
				return;
			}

            var isCheck = true;
			if($('#memberPrice').is(':checked')){
                for(var i=0;i<detailList.length;i++){
                    var item = detailList[i];
                    if(parseFloat(item["newVipPrice"]) <= 0){
                        $_jxc.alert("第"+(i+1)+"行，新会员价不能小于等于0");
                        isCheck = false;
                        break;
                    }
                    if(parseFloat(item["newSalePrice"]) < parseFloat(item["newVipPrice"])){
                        $_jxc.alert("第"+(i+1)+"行，新会员价只能小于或等于新销售价");
                        isCheck = false;
                        break;
                    }
                }
			}

            if(isCheck === false){
                gFunEndLoading();
                return;
            }
			
			if (datagridUtil.isCheckPrice()) {
				
				if(datagridUtil.isCheckRemark()){
					var params = {
							goodsPriceForm:formData,
							goodsPriceFormDetailList:detailList
						}
					var reqObj = JSON.stringify(params);
					// 调用后台保存方法，成功提示
					$_jxc.ajax({
							url : contextPath + "/goods/branchPriceAdjust/saveForm",
							data :reqObj,
							contentType : "application/json"
						},function(data){
							gFunEndLoading();
							if (data.code == 0) {
								isClickSaveData = true;
								initTmpData();
								$_jxc.alert("操作成功！",function(){
				    				location.href = contextPath +"/goods/branchPriceAdjust/getForm?formNo="+data.goodsPriceForm.formNo;
				    			});
							} else {
								// 失败提示
								$_jxc.alert(data.message);
							}
						});
			}
			}
     }
  }
// 修改调价单
function updateModifyPriceOrder() {
		gFunStartLoading();
		// datagrid是否存在数据，存在为true，不存在为false，则提示用户输入
		var formData = $('#searchForm').serializeObject();
		var detailList =  getDatagridRows();
		if(detailList.length>1000){
			$_jxc.alert("保存数据不能超过1000条");
			gFunEndLoading();
			return;
		}
		if(detailList.length==0){
			$_jxc.alert("表格不能为空");
			gFunEndLoading();
			return;
		}
		
		var isCheck = true;
    if($('#memberPrice').is(':checked')){
		for(var i=0;i<detailList.length;i++){
			var item = detailList[i];
            if(parseFloat(item["newVipPrice"]) <= 0){
                $_jxc.alert("第"+(i+1)+"行，新会员价不能小于等于0");
                isCheck = false;
                break;
            }
		      if(parseFloat(item["newSalePrice"]) < parseFloat(item["newVipPrice"])){
		          $_jxc.alert("第"+(i+1)+"行，新会员价只能小于或等于新销售价");
		          isCheck = false;
		          break;
		      }
		}
    }
		
		if(isCheck === false){
			gFunEndLoading();
			return;
		}
		
		if (datagridUtil.isHasDataGrid()) {
			if(datagridUtil.isCheckRemark()){
				var params = {
						goodsPriceForm:formData,
						goodsPriceFormDetailList:detailList
						}
				var reqObj = JSON.stringify(params);
			// 调用后台保存方法，成功提示
			$_jxc.ajax({
					url : contextPath + "/goods/branchPriceAdjust/updateForm",
					contentType : "application/json",
					data : reqObj
				},function(data){
					gFunEndLoading();
					if (data.code == 0) {
						isClickSaveData = true;
						initTmpData();
						
						$_jxc.alert("操作成功！",function(){
		    				location.href = contextPath +"/goods/branchPriceAdjust/getForm?formNo="+data.goodsPriceForm.formNo;
		    			});
						
					} else {
						// 失败提示
						$_jxc.alert(data.message);
					}
				});
			}
		}
	}

/**
 * 审核
 */
function check() {
	
	checkUtil.initNewData();
	checkUtil.getNewData()['grid'] = gridHandel.getRows();
	
	
	// 如果页面为空，则不需要提示，只有页面都输入值，才校验是否保存过数据
	if (!checkUtil.ifChange()) {
		 $_jxc.alert("数据已修改，请先保存再审核");
	     return;
	}
	var formNo = $("#formNoInput").val();
	// 通过审核
	var effectDate = $("#effectDate").val();
	checkForm(formNo,effectDate);
}
// 审核
function checkForm(formNo,effectDate) {
	
	$_jxc.ajax({
		url : contextPath + "/goods/branchPriceAdjust/checkForm",
		data : {
			formNo : formNo,
			effectDate:effectDate
		}
	},function(data){
		
		if (data.code > 0) {
			$_jxc.alert(data.message);
		} else {
			//审核过
			isClickCheckData = true;
			$_jxc.alert('单据审核成功！',function() {
				window.location.href = contextPath+"/goods/branchPriceAdjust/getForm?formNo=" + formNo;

			});
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
		if ($("#" + datagridId).datagrid("getData").rows.length > 0) {
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
			$_jxc.alert('备注信息不能超过125个字');
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
			$_jxc.alert('请先选择机构');
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
			$_jxc.alert('没有勾选调价设置！');
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
			$_jxc.alert('没有单据可以删除，请选择一笔单据再删除？');
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
			$_jxc.alert('明细数据不能为空，请输入！');
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
				$_jxc.alert('明细数据不能为空，请输入！');
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

			case "retailPrice": // 零售价
				fieldArr = [ "oldSalePrice", "newSalePrice" ];
				break;

			case "memberPrice": // 会员价
				fieldArr = [ "oldVipPrice", "newVipPrice" ];
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
		$("#" + datagridId).datagrid('removeEditor', 'newSalePrice');
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
        $_jxc.alert("请先选择机构");
        return;
    }
    branchId=$("#branchId").val();
	gFunGoodsSelect(searchKey,branchId);
}
//商品选择 公共使用
function gFunGoodsSelect(searchKey,branchId){
	var param = {
			type:'PS',
			key:searchKey,
			isRadio:0,
			sourceBranchId:'',
			targetBranchId:'',
			branchId:branchId,
			supplierId:'',
			flag:'0'
	}
	 new publicGoodsServiceTem(param, function(data) {
			if(searchKey){
				$("#addModifyBranchPriceGrid").datagrid("deleteRow", gridHandel.getSelectRowIndex());
				$("#addModifyBranchPriceGrid").datagrid("acceptChanges");
			}
			var nowRows = gridHandel.getRowsWhere({'skuName':true});
			//var addDefaultData  = gridHandel.addDefault(data,gridDefault);
			var argWhere ={skuCode:true};  //验证重复性
			var keyNames = {
				
				vipPrice : 'oldVipPrice',
				salePrice : 'oldSalePrice',
				disabled :""
			};
			var keyNames2 = {
				oldVipPrice : 'newVipPrice',
				oldSalePrice : 'newSalePrice'
			}
			var newData = gFunUpdateKey(data,keyNames);
			newData = gFunUpdateKey(newData,keyNames2);
			var newRows = gridHandel.checkDatagrid(nowRows,newData,argWhere);
			
			$("#"+datagridId).datagrid("loadData",newRows);

			  var fieldName = "";
			  var fieldNames = {
					  "retailPrice":"newSalePrice",
					  "memberPrice":"newVipPrice",
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
	      
		},searchKey,0,"","",branchId,"");	
}
/**
 * 分店列表 0 单选,1  多选
 */
function selectBranch() {
	new publicBranchService(function(data) {
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
		//清空列表数据
		$('#addModifyBranchPriceGrid').datagrid('loadData', {total: 0, rows:  [$.extend({},gridDefault)]});  
	},0);
}
//导出
// function exportData(){
// 	var length = $("#addModifyBranchPriceGrid").datagrid('getData').total;
// 	if(length == 0){
// 		$_jxc.alert("没有数据");
// 		return;
// 	}
// 	if(length > exportMaxRow){
// 		$_jxc.alert("当次导出数据不可超过"+exportMaxRow+"条，现已超过，请重新调整导出范围！");
// 		return;
// 	}
// 	var formNo=$("#formNoInput").val();
// 	$("#searchForm").attr("action",contextPath+'/goods/branchPriceAdjust/exportList?formNo='+formNo);
//
// 	$("#searchForm").submit();
//
// }

//打印
function printDesign(formNo){
	var branchId=$("#branchId").val();
	if(!branchId){
		$_jxc.alert("请先选择机构");
	}else{
		//弹出打印页面
		parent.addTabPrint('CASheet' + formNo,formNo+'单据打印',contextPath + '/printdesign/design?page=CASheet&controller=/goods/priceAdjust&template=-1&sheetNo=' + formNo + '&gridFlag=CAGrid','');
	}
}
//验证表格数据 删除不合格数据
function getDatagridRows(){
  $("#addModifyBranchPriceGrid").datagrid("unselectAll");
  $("#addModifyBranchPriceGrid").datagrid("endEdit", gridHandel.getSelectRowIndex());
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

/**
 * 导入
 */
function toImportproduct(type){
    //if($("#supplierId").val()==""){
    //    $_jxc.alert("请先选择供应商");
    //    return;
    //}
    var branchId = $("#branchId").val();
    if(!branchId){
        $_jxc.alert("请先选择机构");
        return;
    }
    var param = {
        url:contextPath+"/goods/branchPriceAdjust/importList",
        tempUrl:contextPath+'/goods/branchPriceAdjust/exportTemp',
        type:type,
        tipSign:1,
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

	$("#"+datagridId).datagrid("loadData",newRows);

	}
//返回列表页面
function back(){
	toClose();
}

