/**
 * Created by huangj02 on 2016/8/12.
 * 公共组件接口的封装
 */
//公共组件-弹出框
function messager(msg,title){
    $.messager.show({
        title:title||'系统提示',
        msg:msg,
        timeout:2000,
        showType:'slide',
        style:{
            width:270,
            right:'',
            bottom:''
        }
     });
}
//公共组件-日期选择
//改变日期
function toChangeDate(index){
    switch (index){
        case 0: //今天
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd"));
            break;
        case 1: //昨天
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrDayPreOrNextDay("prev",1)).format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrDayPreOrNextDay("prev",1)).format("yyyy-MM-dd"));
            break;
        case 2: //本周
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrentWeek()[0]).format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd"));
            //$("#txtEndDate").val(dateUtil.getCurrentWeek()[1].format("yyyy-MM-dd hh:mm"));
            break;
        case 3: //上周
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getPreviousWeek()[0]).format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getPreviousWeek()[1]).format("yyyy-MM-dd"));
            break;
        case 4: //本月
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrentMonth()[0]).format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd"));
            break;
        case 5: //上月
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getPreviousMonth()[0]).format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getPreviousMonth()[1]).format("yyyy-MM-dd"));
            break;
        case 6: //本季
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrentSeason()[0]).format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd"));
            break;
        case 7: //上季
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getPreviousSeason()[0]).format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getPreviousSeason()[1]).format("yyyy-MM-dd"));
            break;
        case 8: //今年
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrentYear()[0]).format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd"));
            break;
        case 9: //昨天
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrDayPreOrNextDay("prev",30)).format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd"));
            break;
        default :
            break;
    }
}
//公共组件-日期选择时分秒
//改变日期
function toChangeDatetime(index){
    switch (index){
        case 0: //今天
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd hh:mm"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd hh:mm"));
            break;
        case 1: //昨天
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrDayPreOrNextDay("prev",1)).format("yyyy-MM-dd hh:mm"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrDayPreOrNextDay("prev",1)).format("yyyy-MM-dd hh:mm"));
            break;
        case 2: //本周
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrentWeek()[0]).format("yyyy-MM-dd hh:mm"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd hh:mm"));
            //$("#txtEndDate").val(dateUtil.getCurrentWeek()[1].format("yyyy-MM-dd hh:mm"));
            break;
        case 3: //上周
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getPreviousWeek()[0]).format("yyyy-MM-dd hh:mm"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getPreviousWeek()[1]).format("yyyy-MM-dd hh:mm"));
            break;
        case 4: //本月
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrentMonth()[0]).format("yyyy-MM-dd hh:mm"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd hh:mm"));
            break;
        case 5: //上月
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getPreviousMonth()[0]).format("yyyy-MM-dd hh:mm"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getPreviousMonth()[1]).format("yyyy-MM-dd hh:mm"));
            break;
        case 6: //本季
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrentSeason()[0]).format("yyyy-MM-dd hh:mm"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd hh:mm"));
            break;
        case 7: //上季
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getPreviousSeason()[0]).format("yyyy-MM-dd hh:mm"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getPreviousSeason()[1]).format("yyyy-MM-dd hh:mm"));
            break;
        case 8: //今年
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrentYear()[0]).format("yyyy-MM-dd hh:mm"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd hh:mm"));
            break;
        case 9: //昨天
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrDayPreOrNextDay("prev",29)).format("yyyy-MM-dd hh:mm"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd hh:mm"));
            break;
        case 10: //往后推一个月
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getPreMonthDate()).format("yyyy-MM-dd hh:mm"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd hh:mm"));
            break;
        default :
            break;
    }
}

/**
 * 批量导入货号或条码
 * @param params {type:0 货号 1条码,url:上传地址,}
 * @param callback
 */
function publicUploadFileService(callback,params){
    //公有属性
    var  dalogTemp = $('<div id="uploadFile"/>').dialog({
        href:contextPath + "/common/uploadFile",
        width:480,
        height:320,
        title:params.type==1?"导入条码":"导入货号",
        closable:true,
        resizable:true,
        onClose:function(){
            $(dalogTemp).panel('destroy');
        },
        modal:true,
        onLoad:function(){
            initUploadFileCallBack(callBackHandel,params)
        },
    });
    function callBackHandel(data){
        callback(data);
    }
}

/**
 * 公共组件-选择角色
 * 必须要先选机构，才能选角色
 * @param callback 回调函数
 * @param branchId 机构ID
 */
function publicRoleService(callback, branchCompleCode, branchType){
    //公有属性
    var  dalogTemp = $('<div/>').dialog({
        href:contextPath + "/role/common/toRoleList",
        width:500,
        height:580,
        title:"选择角色",
        closable:true,
        resizable:true,
        onClose:function(){
            $(dalogTemp).panel('destroy');
        },
        modal:true,
        onLoad:function(){
        	initRoleCommonView(branchCompleCode, branchType);
        	initRoleCallBack(callBackHandel)
        },
    });
    function callBackHandel(data){
        callback(data);
        $(dalogTemp).panel('destroy');
    }
}

//公共组件-机构选择
function publicAgencyService(callback,formType,branchId){
    //公有属性
    var  dalogTemp = $('<div/>').dialog({
    	href:contextPath + "/common/branches/viewComponent?formType="+formType+"&branchId="+branchId,
        width:680,
        height:600,
        title:"机构选择",
        closable:true,
        resizable:true,
        onClose:function(){
            $(dalogTemp).panel('destroy');
        },
        modal:true,
        onLoad:function(){
            initAgencyView();
            initAgencyCallBack(callBackHandel)
        },
    });
    function callBackHandel(data){
        callback(data);
        $(dalogTemp).panel('destroy');
    }
    //调用方式
    //new publicAgencyService(function(data){
    //    console.log(data);
    //});
}

//公共组件-选择品牌
function publicBrandService(callback){
    //公有属性
    var  dalogTemp = $('<div/>').dialog({
        href:contextPath + "/common/brand/views",
        width:680,
        height:600,
        title:"选择品牌",
        closable:true,
        resizable:true,
        onClose:function(){
            $(dalogTemp).panel('destroy');
        },
        modal:true,
        onLoad:function(){
            initBrandView();
            initBrandCallBack(callBackHandel)
        },
    });
    function callBackHandel(data){
        callback(data);
        $(dalogTemp).panel('destroy');
    }
    //调用方式
    //new publicBrandService(function(data){
    //    console.log(data);
    //});
}

//公共组件-选择商品类别
function publicCategoryService(callback){

    //公有属性
    var  dalogTemp = $('<div/>').dialog({
        href: contextPath + "/common/category/views",
        width:680,
        height:600,
        title:"选择商品类别",
        closable:true,
        resizable:true,
        onClose:function(){
            $(dalogTemp).panel('destroy');
        },
        modal:true,
        onLoad:function(){
            initCategoryView();
            initCategoryCallBack(callBackHandel)
        },
    });
    function callBackHandel(data){
        callback(data);
        $(dalogTemp).panel('destroy');
    }
    //调用方式
    //new publicCategoryService(function(data){
    //    console.log(data);
    //});
}

//公共组件-选择供应商
function publicSupplierService(callback,model) {
    //公有属性
    var dalogTemp = $('<div/>').dialog({
        href: contextPath + "/common/supplier/views?model="+model,
        width: 600,
        height: 500,
        title: "选择供应商",
        closable: true,
        resizable: true,
        onClose: function () {
            $(this).dialog('destroy');
        },
        modal: true,
        onLoad: function () {
            initSupplierView();
            initSupplierCallBack(callBackHandel)
        },
    });
    function callBackHandel(data){
        callback(data);
        $(dalogTemp).panel('destroy');
    }
    //调用方式
    //new publicSupplierService(function(data){
    //    console.log(data);
    //});
}

//公共组件-选择操作员
function publicOperatorService(callback) {
    //公有属性
    var dalogTemp = $('<div/>').dialog({
        href: contextPath + "/system/user/views?type=operate",
        width: 680,
        height: 600,
        title: "选择操作员",
        closable: true,
        resizable: true,
        onClose: function () {
            $(dalogTemp).panel('destroy');
        },
        modal: true,
        onLoad: function () {
            initOperatorCallBack(callBackHandel)
        },
    });
    function callBackHandel(data){
        callback(data);
        $(dalogTemp).panel('destroy');
    }
    //调用方式
    //new publicOperatorService(function(data){
    //    console.log(data);
    //});
}

//公共组件-字典
function publicDictService(dictType,callback) {
  //公有属性
  var dalogTemp = $('<div/>').dialog({
      href: contextPath + "/common/dict/views/dict?dictType="+dictType,
      width: 680,
      height: 600,
      title: "选择字典",
      closable: true,
      resizable: true,
      onClose: function () {
          $(dalogTemp).panel('destroy');
      },
      modal: true,
      onLoad: function () {
          initDictCallBack(callBackHandel)
      },
  });
  function callBackHandel(data){
      callback(data);
      $(dalogTemp).panel('destroy');
  }
  //调用方式
  //new publicDictService(function(data){
  //    console.log(data);
  //});
}

/**
 * 公共组件-选择机构
 * @param callback
 * @param type  0是单选  1是多选
 */
function publicBranchService(callback,type) {
    var dalogObj = {
        href: contextPath + "/system/user/views?type=branch&check="+type,
        width: 680,
        height: 600,
        title: "选择机构",
        closable: true,
        resizable: true,
        onClose: function () {
            $(dalogTemp).panel('destroy');
        },
        modal: true,
    }
    if(type==1){
        dalogObj["buttons"] = [{
            text:'确定',
            handler:function(){
                publicOperatorGetCheck(callBackHandel);
            }
        },{
            text:'取消',
            handler:function(){
                $(dalogTemp).panel('destroy');
            }
        }];
    }else{
        dalogObj["onLoad"] = function () {
            initBranchCallBack(callBackHandel);
        };
    }
    //公有属性
    var dalogTemp = $('<div/>').dialog(dalogObj);
    function callBackHandel(data){
        callback(data);
        $(dalogTemp).panel('destroy');
    }
    //调用方式
    //new publicStoreService(function(data){
    //    console.log(data);
    //});
}

//公共组件-选择机构区域
function publicBranchAreaService(callback) {
    //公有属性
    var dalogTemp = $('<div/>').dialog({
        href: contextPath + "/system/user/views?type=branchArea",
        width: 680,
        height: 600,
        title: "选择机构区域",
        closable: true,
        resizable: true,
        onClose: function () {
            $(dalogTemp).panel('destroy');
        },
        modal: true,
        onLoad: function () {
        	initBranchAreaCallBack(callBackHandel)
        },
    });
    function callBackHandel(data){
        callback(data);
        $(dalogTemp).panel('destroy');
    }
    //调用方式
    //new publicStoreService(function(data){
    //    console.log(data);
    //});
}

//公共组件-单据选择(采购单)
function publicPurchaseFormService(type,callback){
  //公有属性
  var  dalogTemp = $('<div/>').dialog({
      href:contextPath + "/form/purchaseSelect/view?type="+type,
      width:1200,
      height:600,
      title:"单据选择",
      closable:true,
      resizable:true,
      onClose:function(){
          $(dalogTemp).panel('destroy');
      },
      modal:true,
      onLoad:function(){
    	  initFormCallBack(callBackHandel)
      }
  });
  //私有方法
  function callBackHandel(data){
      callback(data);
      $(dalogTemp).panel('destroy');
  }
  //调用方法  type PA PI PR
 /* new publicPurchaseFormService(type,function(data){
		//data.Id
		$("#createUserId").val(data.id);
		$("#createUserName").val(data.userName);
	});*/
}


//公共组件-单据选择(调拨单)
function publicDeliverFormService(type,callback){
//公有属性
var  dalogTemp = $('<div/>').dialog({
    href:contextPath + "/form/deliverSelect/view?type="+type,
    width:1200,
    height:600,
    title:"单据选择",
    closable:true,
    resizable:true,
    onClose:function(){
        $(dalogTemp).panel('destroy');
    },
    modal:true,
    onLoad:function(){
        initDeliverFormCallBack(callBackHandel);
    }
});
//私有方法
function callBackHandel(data){
    callback(data);
    $(dalogTemp).panel('destroy');
}
}


//公共组件-商品选择
function publicGoodsService(type,callback,key,isRadio,sourceBranchId,targetBranchId,branchId){
	if(key){
		var url= contextPath + '/goods/goodsSelect/importSkuCode?skuCodes='+key+'&branchId='+branchId;
//		if(type=="DA"||type=="DO"){
//			 url=contextPath + '/goods/goodsSelect/enterSearchGoodsDeliver?skuCode='+key+"&formType="+type+"&sourceBranchId="+sourceBranchId+"&targetBranchId="+targetBranchId;
//		}
        $.ajax({
            url:url,
            type:'POST',
            success:function(data){
            	if(data&&data.length==1){
            		callback(data);
                }else{
                    publicGoodsServiceHandel(type,callback,key,isRadio,sourceBranchId,targetBranchId,branchId);
                }
            }
        })
    }else{
        publicGoodsServiceHandel(type,callback,key,isRadio,sourceBranchId,targetBranchId,branchId);
    }
}
function publicGoodsServiceHandel(type,callback,key,isRadio,sourceBranchId,targetBranchId,branchId){
	if(!branchId){
        url=contextPath + "/goods/goodsSelect/view?type="+type+"&sourceBranchId="+sourceBranchId+"&targetBranchId="+targetBranchId;
    }else{
        url=contextPath + "/goods/goodsSelect/view?type="+type+"&branchId="+branchId;
    }
    //公有属性
    var dalogObj = {
        href:url,
        width:1200,
        height:600,
        title:"商品选择",
        closable:true,
        resizable:true,
        onClose:function(){
            $(dalogTemp).panel('destroy');
        },
        modal:true,
    }
    if(isRadio&&isRadio==1){
        dalogObj["onLoad"] =function(){
            //$("#goodsInfo").val(key);
            //cx();
            initGoodsRadioCallBack(function(data){
                callback( [data]);
                $(dalogTemp).panel('destroy')
            });
            initSearch();
        };
    }else{
        dalogObj["onLoad"] =function(){
            initGoodsRadioCallBack();
            $("#goodsInfo").val(key);
            initSearch(key);
        };
        dalogObj["buttons"] =[{
            text:'确定',
            handler:function(){
                getCheckGoods();
            }
        },{
            text:'取消',
            handler:function(){
                $(dalogTemp).panel('destroy');
            }
        }];
    }
    var  dalogTemp = $('<div/>').dialog(dalogObj);
    //私有方法
    function getCheckGoods(){
        publicGoodsGetCheckGoods(function(data){
            if(data.length==0){
                messager("请选择数据");
                return;
            }
            callback(data);
            $(dalogTemp).panel('destroy');
        });
    }
}

/**
 * 公共组件-商品选择-新
 * @param params  传参对象
 * @param callback 回调函数
 */
function publicNewGoodsService(params,callback){
    if(params.key){
        var url= contextPath + '/goods/goodsSelect/importSkuCode?skuCodes='+params.key+'&branchId='+params.branchId;
        $.ajax({
            url:url,
            type:'POST',
            success:function(data){
                if(data&&data.length==1){
                    callback(data);
                }else{
                    publicNewGoodsServiceHandel(params,callback);
                }
            }
        })
    }else{
        publicNewGoodsServiceHandel(params,callback);
    }
}
function publicNewGoodsServiceHandel(params,callback){
    if(!params.branchId){
        url=contextPath + "/goods/goodsSelect/view?type="+params.type+"&sourceBranchId="+params.sourceBranchId+"&targetBranchId="+params.targetBranchId;
    }else{
        url=contextPath + "/goods/goodsSelect/view?type="+params.type+"&branchId="+params.branchId;
    }
    //公有属性
    var dalogObj = {
        href:url,
        width:1200,
        height:600,
        title:"商品选择",
        closable:true,
        resizable:true,
        onClose:function(){
            $(dalogTemp).panel('destroy');
        },
        modal:true,
    }
    if(params.isRadio&&params.isRadio==1){
        dalogObj["onLoad"] =function(){
            initGoodsRadioCallBack(function(data){
                callback( [data]);
                $(dalogTemp).panel('destroy')
            });
            initNewSearch(params);
        };
    }else{
        dalogObj["onLoad"] =function(){
            initGoodsRadioCallBack();
            $("#goodsInfo").val(params.key);
            initNewSearch(params);
        };
        dalogObj["buttons"] =[{
            text:'确定',
            handler:function(){
                getCheckGoods();
            }
        },{
            text:'取消',
            handler:function(){
                $(dalogTemp).panel('destroy');
            }
        }];
    }
    var  dalogTemp = $('<div/>').dialog(dalogObj);
    //私有方法
    function getCheckGoods(){
        publicGoodsGetCheckGoods(function(data){
            if(data.length==0){
                messager("请选择数据");
                return;
            }
            callback(data);
            $(dalogTemp).panel('destroy');
        });
    }
}
//公共组件-公共方法
//关闭
function toClose(){
	window.parent.closeTab();
}
//返回
function toBack(){
	history.go(-1);
}
//刷新当前页面
function gFunRefresh() {
    window.location.reload();
}
function toBackByJS(){
	history.go(-1);
}
/**
 * 公共库-表格 黄江
 * ***************核心请勿修改*********************
 */
function GridClass(){
    var _this = this;
    var gridName;                        //表格名称
    var rowIndex;                //当前选中的行号
    var selectFieldName;               //当前选中的单元名称
    this.getSelectRowIndex = function(){
        return rowIndex||0;
    };
    this.getSelectFieldName = function(){
        return selectFieldName;
    };
    this.setGridName = function(arg){
        gridName = arg;
    };
    this.getGridName = function(){
        return gridName;
    };
    this.setSelectRowIndex = function(arg){
        rowIndex = arg;
    };
    this.setSelectFieldName = function(arg){
        selectFieldName = arg;
    };
    this.initKey = function(params){
        $.extend($.fn.datagrid.methods, {
            keyCtr : function (jq) {
                return jq.each(function () {
                    var grid = $(this);
                    grid.datagrid('getPanel').panel('panel').attr('tabindex', 1).bind('keydown', function (e) {
                        switch (e.keyCode) {
                            case 37: //左键
                                var field = getLRFiledName('left');
                                var target = _this.getFieldTarget(field);
                                if(target){
                                    _this.setFieldFocus(target);
                                    _this.setSelectFieldName(field);
                                }
                                break;
                            case 13: //回车键
                                if(getLRFiledName('right')=="isGift"){

                                    var field = getLRFiledName('right');
                                    _this.setSelectFieldName(field);
                                    field = getLRFiledName('right');
                                    var target = _this.getFieldTarget(field);
                                    if(target){
                                        _this.setFieldFocus(target);
                                        _this.setSelectFieldName(field);
                                    }
                                }
                                if(params&&selectFieldName==params.enterName){
                                    var target = _this.getFieldTarget(selectFieldName);
                                    var field = getLRFiledName('right');
                                    _this.setSelectFieldName(field);
                                    params.enterCallBack($(target).textbox('getValue'));
                                    //selectGoods();
                                }else{
                                    var row = _this.getEditRow(gridName,rowIndex);
                                    if(row.length>0&&row[row.length-1].field==selectFieldName){
                                        if(grid.datagrid('getRows').length-rowIndex>1){
                                            var lastIndex = rowIndex+1;
                                            _this.setBeginRow(lastIndex);
                                            _this.setSelectFieldName(params.firstName);
                                            var target = _this.getFieldTarget(selectFieldName);
                                            if(target){
                                                _this.setFieldFocus(target);
                                            }
                                        }else{
                                            params.enterCallBack("add")
                                        }
                                    }else{
                                        var field = getLRFiledName('right');
                                        var target = _this.getFieldTarget(field);
                                        if(target){
                                            _this.setFieldFocus(target);
                                            _this.setSelectFieldName(field);
                                        }
                                    }
                                }
                                break;
                            case 39: //右键
                                var field = getLRFiledName('right');
                                var target = _this.getFieldTarget(field);
                                if(target){
                                    _this.setFieldFocus(target);
                                    _this.setSelectFieldName(field);
                                }
                                break;
                            case 38: //上键
                                if(rowIndex>0){
                                    var lastIndex = rowIndex-1;
                                    _this.setBeginRow(lastIndex);
                                    var target = _this.getFieldTarget(selectFieldName);
                                    if(target){
                                        _this.setFieldFocus(target);
                                    }
                                }
                                break;
                            case 40: //下键
                                if(grid.datagrid('getRows').length-rowIndex>1){
                                    var lastIndex = rowIndex+1;
                                    _this.setBeginRow(lastIndex);
                                    var target = _this.getFieldTarget(selectFieldName);
                                    if(target){
                                        _this.setFieldFocus(target);
                                    }
                                }
                                break;
                        }
                    });
                });
            }
        });
        $("#"+gridName).datagrid({}).datagrid("keyCtr");
        //$(document).on('click',function(event){
        //    if($(event.target).hasClass('datagrid-cell')){
        //        return;
        //    }
        //    if(rowIndex != undefined){
        //        $('#'+gridName).datagrid('endEdit', rowIndex);
        //    }
        //});
    }
    /**
     * 获取左右边单元名称
     * @param index    行号
     * @param field    单元名称
     * @param type     left左边 right右边
     * @returns {*}
     */
    function getLRFiledName(type){
        var row = _this.getEditRow(gridName,rowIndex);
        var searchField = selectFieldName;
        for(var i=0;i<row.length;i++){
            if(row[i].field==selectFieldName){
                if(type=='left'&&i>0){
                    searchField = row[i-1].field;
                }
                if(type=='right'&&i<row.length-1){
                    searchField = row[i+1].field;
                }
            }
        }
        return searchField;
    }
    /**
     * 删除多行
     */
	this.delRows = function(){
		var rows = $("#"+gridName).datagrid("getSelections");
		  if (rows.length > 0) {
		      $.messager.confirm("提示", "你确定要删除吗?", function (r) {
		          if (r) {
		          	$.each(rows,function(i,row){
		          		var rowIndex = $("#"+gridName).datagrid("getRowIndex",row);
		          		$("#"+gridName).datagrid("deleteRow",rowIndex);
		          	});
		          }
		      });
		  }
		  else {
		      $.messager.alert("提示", "请选择要删除的行", "error");
		  }
	}
    /**
     * 获取表格非空数据
     */
	this.getRows = function(){
		var rows = $("#"+gridName).datagrid("getRows");
		var rowsData = [];
		$.each(rows,function(i,row){
			if(!$.isEmptyObject(row)){
				rowsData.push(row);
			}
		});
		return rowsData;
	}
    /**
     * 根据条件获取数据
     * @param argWhere 条件
     * @returns {*}
     */
    this.getRowsWhere = function(argWhere){
        $("#"+gridName).datagrid("endEdit",rowIndex);
        var rows = _this.getRows();
        var newRows = [];
        $.each(rows,function(i,row){
            $.each(argWhere,function(key,val){
                if(row[key]){
                    newRows.push(row);
                }
            })
        });
        return newRows;
    }
    /**
     * 表格添加默认值 黄江
     * @param data    数据源
     * @param defultVal 默认值
     * @returns {Array}
     */
    this.addDefault = function(data,defultVal){
        var newRows = [];
        $.each(data,function(i,val){
            newRows.push($.extend(val,defultVal));
        });
        return newRows;
    }
    /**
     * 合并数据-过滤相同的
     * @param arrs 现有数据
     * @param data 新增数据
     * @param argWhere 合并条件
     * @returns 返回合并后数据
     */
    this.checkDatagrid = function(arrs,data,argWhere,isCheck){

        var newData = [];
        $.each(data,function(i,val){
            var isRepeat = false;
            $.each(arrs,function(j,val1){
                if(argWhere&&argWhere!={}){
                    $.each(argWhere,function(key,argVal){
                        if(val[key]==val1[key]){
                            isRepeat = true;
                        }
                    });
                }
               if(isCheck&&isCheck!={}){
                   $.each(isCheck,function(checkKey,checkVal){
                       if(val1[checkKey]==checkVal||val[checkKey]!=val1[checkKey]){
                           isRepeat = false;
                       }
                   });
               }

            });
            if(!isRepeat){
                newData.push(val);
            }
        });
        return arrs.concat(newData);
    }
    /**
     * 获取编辑框值
     * @param gridName  表格ID
     * @param rowIndex  行号
     * @param fieldName 单元格名称
     * @returns {*}
     */
    this.getFieldValue = function(rowIndex,fieldName){
        var ed = $('#'+gridName).datagrid('getEditor', {index:rowIndex,field:fieldName});
        if(ed&&ed.target){
            return $(ed.target).numberbox('getValue');
        }
        return "";
    }
    /**
     * 设置单元格编辑框值
     * @param fieldName 单元格名称
     * @returns {*}
     */
    this.setFieldValue = function(fieldName,val){
        var target = _this.getFieldTarget(fieldName);
        if(target){
            $(target).numberbox('setValue',val);
        }
    }
    /**
     * 设置单元格非编辑框值 可以修改多个
     * @param fieldName 单元格名称
     * @returns {*}
     */
    this.setFieldsData = function(vals){
        var rows = $('#'+gridName).datagrid('getRows');
        $.each(vals,function(key,val){
            rows[rowIndex][key] = val;
        })
    }
    /**
     * 获取单元格非编辑框值
     * @param rowIndex  行号
     * @param fieldName 单元格名称
     * @returns {*} 返回单元格的值
     */
    this.getFieldData = function(rowIndex,fieldName){
        return $('#'+gridName).datagrid('getRows')[rowIndex][fieldName];
    }
    /**
     * 设置单元格编辑的焦点  黄江
     * @param obj  单元格对象
     */
    this.setFieldFocus = function(obj){
        setTimeout(function(){
            $(obj).textbox('textbox').focus();
            $(obj).textbox('textbox').select();
        },10);
    }
    /**
     * 设置选择商品后焦点放在第二个输入框  黄江
     */
    this.setLoadFocus = function(){
        setTimeout(function(){
            var row = _this.getEditRow(gridName,rowIndex);
            _this.setBeginRow(rowIndex||0);
            if(row.length>=2){
                _this.setSelectFieldName(row[1].field);
                _this.setFieldFocus(_this.getFieldTarget(row[1].field));
            }
        },10)
    }

    /**
     * 获取单元格对象
     * @param fieldName 单元格名称
     * @returns {*} 返回单元格对象
     */
    this.getFieldTarget = function(fieldName){
        var ed  = $('#'+gridName).datagrid('getEditor', {index:rowIndex,field:fieldName});
        if(ed&&ed.target){
            return ed.target
        }
        return null;
    }
    /**
     * 获取编辑行
     * @param gridName  表格ID
     * @param rowIndex  行号
     * @returns 行数据
     */
    this.getEditRow = function(gridName,rowIndex){
       return $('#'+gridName).datagrid('getEditors', rowIndex);
    }
    /**
     * 编辑行
     * @param rowIndex   行号
     */
    this.setBeginRow = function(argRowIndex){
        $('#'+gridName).datagrid('endEdit', rowIndex);                  //结束之前的编辑
        rowIndex = argRowIndex;
        $('#'+gridName).datagrid('selectRow', rowIndex)
        $('#'+gridName).datagrid('beginEdit', rowIndex);
    }
    /**
     * 加载数据
     * @param data
     */
    this.setLoadData = function(data){
        $("#"+gridName).datagrid("loadData",data);
    }
    /**
     * 搜索表格中匹配的相同数据
     * @param index
     * @param obj  匹配对象
     * @returns {Array}
     */
    this.searchDatagridFiled = function(index,obj){
        var rows =  $('#'+gridName).datagrid('getRows');
        var searchData = [];
        $.each(rows,function(i,row){
            if(i!=index){
                var isRepeat = true;
                $.each(obj,function(key,val){
                    if(row[key]!=val){
                        isRepeat = false;
                    }
                });
                if(isRepeat){
                    searchData.push(row);
                }
            }
        });
        return searchData;
    }
    /**
     * 添加一行
     * @param index  当前行号
     * @param defaultVal  默认值
     */
    this.addRow = function(index,defaultVal){
        $("#"+gridName).datagrid("endEdit", rowIndex);
        $("#"+gridName).datagrid("insertRow",{
            index:parseInt(index)+1,
            row:$.extend({},defaultVal)
        });
        setTimeout(function(){
            $("#"+gridName).datagrid("loadData",$("#"+gridName).datagrid("getRows"));
        },10);
    }
    /**
     * 删除当前行
     * @param index     当前行号
     */
    this.delRow = function(index){
        if( $("#"+gridName).datagrid("getRows").length==1){
            return;
        }
        $("#"+gridName).datagrid("endEdit", rowIndex);
        $("#"+gridName).datagrid("deleteRow",index);
        setTimeout(function(){
            $("#"+gridName).datagrid("loadData",$("#"+gridName).datagrid("getRows"));
        },10)
    }
    /**
     * 删除当前行
     * @param index     当前行号
     */
    this.endEditRow = function(){
        $("#"+gridName).datagrid("endEdit", rowIndex);
    }
    //更新合计
    this.updateFooter = function(fields,argWhere){
        var rows = _this.getRows();
        var obj = {};
        var isEdit = false;
        $.each(fields,function(key,val){
            var editVal = _this.getFieldValue(rowIndex,key);
            if(editVal){
                obj[key] = editVal;
            }
        });
        if(obj!={}){
            isEdit = true;
            rows.push($.extend(rows[rowIndex],obj));
        }
        $.each(rows,function(i,row){
            if(row[argWhere['name']]==argWhere['value']||argWhere['value']==""){
                if(isEdit&&i==rowIndex){
                    return true;
                }
                $.each(fields,function(key,val){
                    fields[key] = ((parseFloat(fields[key])||0)+(parseFloat(row[key]?row[key]:0)||0)).toFixed(4);
                });
            }
        })
        $('#'+gridName).datagrid('reloadFooter',[$.extend({"isFooter":true,},fields)]);
        return fields;
    }
    /**
     * 设置表头标题的方向
     * @param str left居左  center居中  right居右
     */
    this.setDatagridHeader = function(str){
        $('.datagrid-header').find('div.datagrid-cell').css('text-align',str||'center');
        $('.datagrid-header').find('div.datagrid-cell').css('font-weight','bold');
    }

}

//公共方法====================================================================
/**
 * 黄江 将数据自动插入到表单中
 * @param obj  键值对
 */
function gFunUnSerialize(obj){
    $.each(obj,function(i,v){
       //console.log($("#"+i).prop("tagName"));
        if($("#"+i).get(0)&&$("#"+i).get(0).tagName=="INPUT"){ //普通的input
            //console.log($("#"+i).attr('type'));
            if($("#"+i).attr('type')=="checkbox"){
                $("#"+i).attr("checked","checked");
            }else{
                $("#"+i).val(v);
            }
        }
        else if($("#"+i).get(0)&&$("#"+i).get(0).tagName=="TEXTAREA"){ //普通的textarea
        	 $("#"+i).html(v);
        }
        else{
            $("#"+i).combobox('select',v);
        }
    })
}
/**
 * 黄江 替换列表数据键的名称
 * @param arrs  数据源
 * @param obj  需要替换名称列表对象
 * @returns {Array} 返回新的数据源
 */
function gFunUpdateKey(arrs,obj){
    var newArrs = [];
    $.each(arrs,function(i,item){
        $.each(obj,function(k,v){
        	if(item[k]||parseInt(item[k])===0||item[k]===""){
            	if(v){
            		item[v] = gFunIsNotNull(item[k])?item[k]:"";
            	}
        	}
        });
        newArrs.push(item);
    });
    return newArrs;
}
/**
 * 格式化数据 黄江
 * @param arrs
 * @param config
 * @returns {*}
 */
function gFunFormatData(arrs,config){
    $.each(arrs,function(i,obj){
        $.each(obj,function(k,val){
            if(config.date){
                $.each(config.date,function(j,dateKey){
                    if(dateKey==k){//格式化日期
                        if(val){
                            obj[dateKey] = new Date(val).format('yyyy-MM-dd');
                        }
                    }
                });
            }
        });
    });
    return arrs;
}
/**
 * 验证数据两个对象数据是否完全相同
 * @param arg1
 * @param arg2
 * @returns {boolean}
 */
function gFunComparisonArray(arg1,arg2){
    var arr1 = JSON.stringify(arg1);
    var arr2 = JSON.stringify(arg2)
    return arr1==arr2;
}
/**
 * 显示loading
 */
function gFunStartLoading(){
    $("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:$(window).height()}).appendTo("body");
    $("<div class=\"datagrid-mask-msg\"></div>").html("正在加载，请稍候...").appendTo("body").css({display:"block",left:($(document.body).outerWidth(true) - 190) / 2,top:($(window).height() - 45) / 2});
}
/**
 * 关闭loading
 */
function gFunEndLoading(){
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}
/**
 * 输入0-9的数字
 * @param obj
 * @returns {XML|void|string|*}
 */
function checkNum(obj){
	 obj.value=obj.value.replace(/[^0-9]/g,'');
	 return obj.value;
}

function gFunIsNotNull(val){
    if(val||parseInt(val)===0||val===""){
        return true
    }
    return false;
}

//输入1-9的数字，第二位及后面的可以有0，比如10
function checkInteger(obj){
	if(obj.value.length == 1){
		obj.value=obj.value.replace(/[^1-9]/g,'');
		
	}else{
		obj.value=obj.value.replace(/\D/g,'');
	}
	return obj.value;
}

//只能输入正整数 1-9的数字   可以输入0
function checkPositiveInteger(obj){
	obj.value = obj.value.replace(/[^\d]/g,"") || 0; //清除"数字"以外的字符
	obj.value = obj.value.replace(/^0/g,"") || 0; //验证第一个字符是不是为0
	return obj.value;
}

//输入数字，保留两位小数
function checkPrice(obj){
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
	 return obj.value;
}

//非法字符校验
var voidChar = ['<','>','input','&','"'];
function isValidString(obj){
	var value = $(obj).val();
	if(obj.value!=null && obj.value.trim()!=''){
		   for(var i=0;i<voidChar.length;i++){
			   if(obj.value.indexOf(voidChar[i]) > -1){
				   obj.value = obj.value.replace(voidChar[i],'');
			  }
		   }
		   
	}
  return obj.value;
}


/**
 * 获取枚举显示名称，enumObj为空则返回空字符串
 * @param enumObj 枚举对象
 * @returns {String} 枚举显示名称
 */
function enumViewName(enumObj){
	var str = "";
	if(enumObj){
		str =  enumObj.name;
    }
	return str;
}

/**
 * 获取枚举值，enumObj为空则返回空字符串
 * @param enumObj 枚举对象
 * @returns {String} 枚举值
 */
function enumViewValue(enumObj){
	var str = "";
	if(enumObj){
		str =  enumObj.value;
    }
	return str;
}


var datagridCommon = {
	/**
	 * 显示列
	 * 
	 * @param datagridId
	 *            datagrid的Id
	 * @param fieldLen
	 *            列的field个数
	 */
	showDataGridColumn : function(datagridId, fieldArr) {
		var gridObj = $("#" + datagridId); 
		if(!gridObj || gridObj.length===0){
			return;
		}
		for (var i = 0; i < fieldArr.length; i++) {
			gridObj.datagrid("showColumn", fieldArr[i]);
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
	hideDataGridColumn : function(datagridId, fieldArr) {
		
		var gridObj = $("#" + datagridId); 
		if(!gridObj || gridObj.length===0){
			return;
		}
		
		//获取表格
		var fields = gridObj.datagrid("getColumnFields");
		for (var i = 0; i < fieldArr.length; i++) {
			var fieldName = fieldArr[i];
			var index = $.inArray(fieldName, fields);
			
			//如果存在该列
			if(index>=0){
				gridObj.datagrid("hideColumn", fieldName);
			}
		}
	},
};
//禁止回车键提交
$(window).keydown(function(event){
    if (event.keyCode  == 13) {
        event.preventDefault();
    }
});
//监听回车键
function gFunSetEnterKey(cb){
    $('.usearch').keydown(function(event){
        if (event.keyCode  == 13) {
            cb();
        }
    });
}
function gFunGetQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
} 
//表单验证
$.extend($.fn.validatebox.defaults.rules, {
    idcard: {// 验证身份证
        validator: function (value) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },
        message: '身份证号码格式不正确'
    },
    minLength: {
        validator: function (value, param) {
            return value.length >= param[0];
        },
        message: '请输入至少（2）个字符.'
    },
    length: { validator: function (value, param) {
        var len = $.trim(value).length;
        return len >= param[0] && len <= param[1];
    },
        message: "输入内容长度必须介于{0}和{1}之间."
    },
    phone: {// 验证电话号码
        validator: function (value) {
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '格式不正确,请使用下面格式:020-88888888'
    },
    mobile: {// 验证手机号码
        validator: function (value) {
            return /^(13|15|18)\d{9}$/i.test(value);
        },
        message: '手机号码格式不正确'
    },
    intOrFloat: {// 验证整数或小数
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '请输入数字，并确保格式正确'
    },
    int: {// 验证整数
        validator: function (value) {
            return /^\d+(\d+)?$/i.test(value);
        },
        message: '请输入数字，并确保格式正确'
    },
    currency: {// 验证货币
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '货币格式不正确'
    },
    qq: {// 验证QQ,从10000开始
        validator: function (value) {
            return /^[1-9]\d{4,9}$/i.test(value);
        },
        message: 'QQ号码格式不正确'
    },
    integer: {// 验证整数 可正负数
        validator: function (value) {
            //return /^[+]?[1-9]+\d*$/i.test(value);
            return /^([+]?[0-9])|([-]?[0-9])+\d*$/i.test(value);
        },
        message: '请输入整数'
    },
    age: {// 验证年龄
        validator: function (value) {
            return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
        },
        message: '年龄必须是0到120之间的整数'
    },

    chinese: {// 验证中文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value);
        },
        message: '请输入中文'
    },
    english: {// 验证英语
        validator: function (value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message: '请输入英文'
    },
    unnormal: {// 验证是否包含空格和非法字符
        validator: function (value) {
            return /.+/i.test(value);
        },
        message: '输入值不能为空和包含其他非法字符'
    },
    username: {// 验证用户名
        validator: function (value) {
            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
        },
        message: '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
    },
    faxno: {// 验证传真
        validator: function (value) {
            //            return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i.test(value);
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '传真号码不正确'
    },
    zip: {// 验证邮政编码
        validator: function (value) {
            return /^[1-9]\d{5}$/i.test(value);
        },
        message: '邮政编码格式不正确'
    },
    ip: {// 验证IP地址
        validator: function (value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message: 'IP地址格式不正确'
    },
    name: {// 验证姓名，可以是中文或英文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
        },
        message: '请输入姓名'
    },
    date: {// 验证姓名，可以是中文或英文
        validator: function (value) {
            //格式yyyy-MM-dd或yyyy-M-d
            return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(value);
        },
        message: '清输入合适的日期格式'
    },
    msn: {
        validator: function (value) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        message: '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
    },
    same: {
        validator: function (value, param) {
            if ($("#" + param[0]).val() != "" && value != "") {
                return $("#" + param[0]).val() == value;
            } else {
                return true;
            }
        },
        message: '两次输入的密码不一致！'
    }
});

