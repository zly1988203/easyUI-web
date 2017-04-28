/**
 * Created by huangj02 on 2016/8/12.
 * 公共组件接口的封装
 */
//公共组件-弹出框

var top = $(window).height()/3;
var dialogHeight = $(window).height()*(2/3);
var left = $(window).width()/4;

function messager(msg,title){
	$.messager.alert(title||'提示',msg);
    /*$.messager.show({
        title:title||'系统提示',
        msg:msg,
        timeout:2000,
        showType:'slide',
        style:{
            width:270,
            right:'',
            bottom:''
        }
     });*/
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
        case 10: //往后推一个月
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getPreMonthDate()).format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrentDate()).format("yyyy-MM-dd"));
            break;
        case 11: //明天
            $("#txtStartDate").val(dateUtil.addStartTime(dateUtil.getCurrDayPreOrNextDay("next",1)).format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.addEndTime(dateUtil.getCurrDayPreOrNextDay("next",1)).format("yyyy-MM-dd"));
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
 * @param params {
        isBtnTemple 是否需要模板下载按钮 默认true
        url:contextPath+"/form/deliverForm/importList",上传地址,
        tempUrl:contextPath+"/form/deliverForm/exportTemp",
        type:type, 0 货号 1 条码导入
        formType:'DD', 单据类型
        targetBranchId:targetBranchId, 要货机构
        sourceBranchId:sourceBranchId, 发货机构
        branchId:branchId  机构ID  
        status:status
 *  }
 *  
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


/***
 *
 * //上传数据模板
 * url
 * formType   出库单Do
 * title
 * **/
function publicUploadTemplateService(callback,params){
    //公有属性
    var  dalogTemp = $('<div id="uploadFile"/>').dialog({
        href:contextPath + "/common/uploadTemplate",
        width:480,
        height:320,
        title:params.title?params.title:"上传自定义模板",
        closable:true,
        resizable:true,
        onClose:function(){
            $(dalogTemp).panel('destroy');
        },
        modal:true,
        onLoad:function(){
            initUploadTemplateCallBack(callBackHandel,params)
        },
    });
    function callBackHandel(data){
        callback(data);
    }
}


/**
 * 新品申请批量导入
 * @param params {url:上传地址}
 * @param callback
 */
function newGoodsApplyUploadFile(callback,params){
	var  dalogTemp = $('<div id="uploadFile"/>').dialog({
		href:contextPath + "/common/uploadFile",
		width:480,
		height:320,
		title:"新品申请导入模板",
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
        href:contextPath + "/role/common/toRoleList?branchCompleCode="
        	+branchCompleCode+"&branchType="+branchType,
        width:500,
        height:dialogHeight,
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
function publicAgencyService(callback,formType,branchId, branchType,isOpenStock){
	if(!formType){
		formType="";
	}
	if(!branchId){
		branchId="";
	}
	if(!branchType){
		branchType="";
	}
	if(!isOpenStock){
		isOpenStock="";
	}
    //公有属性
    var  dalogTemp = $('<div/>').dialog({
    	href:contextPath + "/common/branches/viewComponent?formType="+ 
    		formType + "&branchId=" +branchId+ "&branchType="+branchType + "&isOpenStock="+isOpenStock,
        width:680,
        height:$(window).height()*(2/3),
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

/**
 * 公共组件-选择机构
 * @param callback
 * @param type  0是单选  1是多选
 */
function publicBranchService(callback,type,isOpenStock, formType) {
	if(!isOpenStock){
		isOpenStock = "";
	}
    var dalogObj = {
        href: contextPath + "/system/user/views?type=branch&check="+type+"&isOpenStock="+isOpenStock+"&formType="+formType,
        width: 680,
        height: dialogHeight,
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

/**********************礼品兑换机构选择 start*******************************/
/**
 * 公共组件-选择机构
 * @param callback
 * @param type  0是单选  1是多选
 */
function publicBranchServiceGift(callback,type) {
    var dalogObj = {
        href: contextPath + "/system/user/publicBranchChoose?type=branch&check="+type,
        width: 680,
        height: dialogHeight,
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
}

/**********************礼品兑换机构选择 end*******************************/

//公共组件-选择品牌
function publicBrandService(callback){
    //公有属性
    var  dalogTemp = $('<div/>').dialog({
        href:contextPath + "/common/brand/views",
        width:680,
        height:dialogHeight,
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
//param {categoryType,type,amount:限制数量}
var categoryDalog = null;
function publicCategoryService(callback,param){
	if(null != categoryDalog) return;
	
	if(!param || 'undefined' === typeof(param)){
		param = {
				categoryType:'',
				type:0
		}
	}else if('undefined' === typeof(param.categoryType)){
		param.categoryType = "";
	}else if('undefined' === typeof(param.type)){
		param.type = 0;
	}
	
    //公有属性
    var dalogObj = {
		href: contextPath + "/common/category/views",
        width:680,
        height:600,
        title:"选择商品类别",
        closable:true,
        resizable:true,
        onClose:function(){
            $(categoryDalog).panel('destroy');
            categoryDalog = null;
        },
        modal:true,
        };
   
    if(param.type==1){
    	 dalogObj["onLoad"] = function () {
        	 initCategoryView(param);
        };
    	dalogObj["buttons"] = [{
            text:'确定',
            handler:function(){
            	publicCategoryGetCheck(callBackHandel);
            }
        },{
            text:'取消',
            handler:function(){
                $(categoryDalog).panel('destroy');
                categoryDalog = null;
            }
        }];
    }else{
        dalogObj["onLoad"] = function () {
        	 initCategoryView(param);
             initCategoryCallBack(callBackHandel)
        };
    }
    //公有属性
    categoryDalog = $('<div/>').dialog(dalogObj);
    function callBackHandel(data){
    	  callback(data);
          $(categoryDalog).panel('destroy');
          categoryDalog = null;
    }
    
}

var supplierDalog = null;

//公共组件-选择供应商
/**
 * 		param = {
				supplierCodeOrName:'',
				branchId:'',
				saleWayNot:'',
				isDirect:''
		}
 * 
 * **/
function publicSupplierService(callback,newParam) {
	if(null != supplierDalog) return;

    var oldParam = {
        supplierCodeOrName:'',
        branchId:'',
        saleWayNot:'',
        isDirect:''
    }

    var param = $.extend(oldParam,newParam);

    //公有属性
	supplierDalog = $('<div/>').dialog({
        href: contextPath + "/common/supplier/views?saleWayNot="+param.saleWayNot+"&isDirect="+param.isDirect,
        width: 600,
        height: dialogHeight,
        title: "选择供应商",
        closable: true,
        resizable: true,
        onClose: function () {
            $(this).dialog('destroy');
            supplierDalog = null;
        },
        modal: true,
        onLoad: function () {
            initSupplierView(param);
            initSupplierCallBack(callBackHandel)
        },
    });
    function callBackHandel(data){
        callback(data);
        $(supplierDalog).panel('destroy');
        supplierDalog = null;
    }
}

//公共组件-选择操作员
function publicOperatorService(callback) {
    //公有属性
    var dalogTemp = $('<div/>').dialog({
        href: contextPath + "/system/user/views?type=operate",
        width: 680,
        height: dialogHeight,
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
      height: dialogHeight,
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



//公共组件-选择机构区域
function publicBranchAreaService(callback) {
    //公有属性
    var dalogTemp = $('<div/>').dialog({
        href: contextPath + "/system/user/views?type=branchArea",
        width: 680,
        height: dialogHeight,
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
      height:dialogHeight,
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
/*
* param{
* targetBranchId
* type
* }
*
* */
function publicDeliverFormService(param,callback){
    var targetBranchId = 'undefined'!=typeof(param.targetBranchId)?param.targetBranchId:'';
    var type = 'undefined'!=typeof(param.type)?param.type:'';
//公有属性
var  dalogTemp = $('<div/>').dialog({
    href:contextPath + "/form/deliverSelect/view?type="+type+"&targetBranchId="+targetBranchId,
    width:1200,
    height:dialogHeight,
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

//临时方法
/****
 *     var param = {
    		type:'',  DA, PR ,PA ,PC
    		key:searchKey,
    		isRadio:'',是否单选
    		branchId:branchId,
    		sourceBranchId:'',
    		targetBranchId:'',
    		supplierId:'',机构
    		flag:'0',
    		categoryShows:categoryShows  类别 新增库存盘点单
    }
 * 
 * 
 * *****/

function publicGoodsServiceTem(param,callback){
	var param = setParam(param);
	if(param.key){
	    //后台参数是 skuCodesOrBarCodes
        param.skuCodesOrBarCodes = param.key;
        param.formType = param.type;
		var urlTemp;
		if(param.type=="DA"){
			param.branchId = '';
            urlTemp = contextPath + '/goods/goodsSelect/importSkuCode';
		} else {
            urlTemp = contextPath + '/goods/goodsSelect/importSkuCode';
		}
		$.ajax({
			url:urlTemp,
			type:'POST',
            data:param,
			success:function(data){
				if(data&&data.length==1){
					callback(data);
			}else{
				publicGoodsServiceHandel(param,callback);
			}
		},
		error:function(){
			 messager("数据查询失败");
		}
		})
    }else{
        publicGoodsServiceHandel(param,callback);
    }
}

/*
* 设置前台没有传入的参数
* */
function setParam(newParam) {

    var oldParm = {
        type:'',
        key:'',
        isRadio:0,
        branchId:'',
        sourceBranchId:'',
        targetBranchId:'',
        supplierId:'',
        flag:'0',
        categoryShows:'',
        isManagerStock:''
    }
   var param =  $.extend(oldParm,newParam);

    return param;
}

var good_dalogTemp = null;

function publicGoodsServiceHandel(param,callback){
	if(!param.branchId){
        url=contextPath + "/goods/goodsSelect/view?type="+param.type+"&sourceBranchId="+param.sourceBranchId+"&targetBranchId="+param.targetBranchId+"&supplierId="+param.supplierId+"&flag="+param.flag;
    }else if(param.categoryCodes || param.isManagerStock){ //商品类别
    	url=contextPath + "/goods/goodsSelect/view?type="+param.type+"&branchId="+param.branchId+"&supplierId="+param.supplierId+"&flag="+param.flag+"&categoryCodes="+param.categoryCodes+"&isManagerStock="+param.isManagerStock;
    }else{
    	url=contextPath + "/goods/goodsSelect/view?type="+param.type+"&branchId="+param.branchId+"&supplierId="+param.supplierId+"&flag="+param.flag;
    }
    //公有属性
    var dalogObj = {
        href:url,
        width:1200,
        height:dialogHeight,
        title:"商品选择",
        closable:true,
        resizable:true,
        onClose:function(){
        	 $(good_dalogTemp).dialog('destroy');
        	 good_dalogTemp = null;
        },
        modal:true,
    }
    if(param.isRadio&&param.isRadio==1){
        dalogObj["onLoad"] =function(){
            initGoodsRadioCallBack(function(data){
                callback( [data]);
                $(good_dalogTemp).dialog('close');
                good_dalogTemp = null;
            });
            initSearch(param);
        };
    }else{
        dalogObj["onLoad"] =function(){
            initGoodsRadioCallBack();
            initSearch(param);
        };
        dalogObj["buttons"] =[{
            text:'确定',
            handler:function(){
                getCheckGoods();
            }
        },{
            text:'取消',
            handler:function(){
                $(good_dalogTemp).dialog('destroy');
                good_dalogTemp = null;
            }
        }];
    }
    
    if(null != good_dalogTemp) return;
    
     good_dalogTemp = $('<div/>').dialog(dalogObj);
    //私有方法
    function getCheckGoods(){
        publicGoodsGetCheckGoods(function(data){
            if(data.length==0){
                messager("请选择数据");
                return;
            }
            callback(data);
            $(good_dalogTemp).dialog('close');
            good_dalogTemp = null;
        });
    }
}

//公共组件-公共方法
//关闭
function toClose(){
	window.parent.closeTab();
}
function toAddTab(title,url){
	window.parent.addTab(title,url);
}
function refreshDataGrid(datagridName){
    $('#'+datagridName).datagrid('reload');
}
function toRefreshIframeDataGrid(src,datagridName){
    var frame = window.parent.frames[src];
    frame.contentWindow.refreshDataGrid(datagridName);
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
	history.back()
	//history.go(-1);
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
    var nowEditFieldName;               //当前正在编辑的单元名称
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
    this.setNowEditFieldName = function(arg){
        nowEditFieldName = arg;
    };
    this.getNowEditFieldName = function(){
        return nowEditFieldName;
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
                                	//防止快速点击时 二次弹框
                                	if($("#"+gridName).closest("body").find('div.window-mask').length > 0)return;
                                    var target = _this.getFieldTarget(selectFieldName);
//                                    var field = getLRFiledName('right');
//                                    _this.setSelectFieldName(field);
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
            },
        });
        $("#"+gridName).datagrid({}).datagrid("keyCtr");
    }

    this.bindblur = function (params) {
        $.extend($.fn.datagrid.method,{
                keyBlur:function (jq) {
                    
                }
            })
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
     * @param ifReset  对于重复数据  要替换的属性值的字段
     * @returns 返回合并后数据
     */
    this.checkDatagrid = function(arrs,data,argWhere,isCheck,ifReset){

        var newData = [];
        $.each(data,function(i,val){
            var isRepeat = false;
            $.each(arrs,function(j,val1){
                if(argWhere&&argWhere!={}){
                    $.each(argWhere,function(key,argVal){
                        if(val[key]==val1[key]){
                        	
                        	if(ifReset && $.isArray(ifReset) && ifReset.length > 0){
                        		$.each(ifReset,function(inx,arKey){
                        			if(arKey){
                        				val1[arKey] = val[arKey];
                        			}
                        		})
                        	}
                        	
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
     * 设置numberbox单元格编辑框值
     * @param fieldName 单元格名称
     * @returns {*}
     */
    this.setFieldValue = function(fieldName,val){
        var target = _this.getFieldTarget(fieldName);
        if(target){
            $(target).numberbox('setValue',val);
        }
    }

    /*
    *设置文本框的值
    * */
    this.setFieldTextValue = function(fieldName,val){
        var target = _this.getFieldTarget(fieldName);
        if(target){
            $(target).textbox({'value':val})
            $(target).textbox('setText',val);
        }
    }
    
    this.setFieldSpinnerValue = function(fieldName,val){
        var target = _this.getFieldTarget(fieldName);
        if(target){
            $(target).numberspinner('setValue',val);
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
    	if(null == obj) return;
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
     * 结束编辑当前行
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
    
	this.getColumnOption = function(fieldName){
		var opts = $('#'+gridName).datagrid('getColumnOption',fieldName)
		if(opts){
			return opts;
		}
		return null;
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
function gFunStartLoading(str){
    $("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:$(window).height(),'z-index':'9999'}).appendTo("body");
    $("<div class=\"datagrid-mask-msg\"></div>").html(str?str:"正在加载，请稍候...").appendTo("body").css({display:"block",'z-index':'9999',left:($(document.body).outerWidth(true) - 190) / 2,top:($(window).height() - 45) / 2});
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

//过滤特殊字符
function stripscript(s)
{
    var pattern = new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs+s.substr(i, 1).replace(pattern, '');
    }
    return rs;
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
    leng: {
        validator: function (value, param) {
            return value.length == param[0];
        },
        message: '请输入{0}个字符.'
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
        	return /^1\d{10}$/i.test(value);
        },
        message: '手机号码格式不正确'
    },
    intOrFloat: {// 验证整数或小数
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '请输入数字，并确保格式正确'
    },
    intNum: {// 验证整数
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


//公共组件-商品选择
function publicGoodsSkuService(callback,isRadio,key,branchId){
	if(key){
		var url= contextPath + '/goods/goodsSelect/queryGoodsSkuLists';
        $.ajax({
            url:url,
            data:{skuCode:key,"branchId":branchId},
            type:'POST',
            success:function(data){
            	if(data&&data.list&&data.list.length==1){
            		callback(data.list);
                }else{
                	publicGoodsSkuServiceHandel(callback,isRadio,key,branchId);
                }
            }
        })
    }else{
    	  publicGoodsSkuServiceHandel(callback,isRadio,key,branchId);
    }
}

function publicGoodsSkuServiceHandel(callback,isRadio,key,branchId){
   var url=contextPath + "/goods/goodsSelect/goGoodsSku?branchId="+branchId;
//公有属性
var dalogObj = {
    href:url,
    width:1200,
    height:dialogHeight,
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

function publicColumnSetting(callback,columns){
    //公有属性
	 
}

/*
* 选择活动
* branchId
* */
function publicActivity(callback,param){
	var dalogTemp = $('<div/>').dialog({
	        href: contextPath+"/sale/activitySelect/view",
	        width: 940,
	        height: 620,
	        title: '选择活动',
	        closable: true,
	        resizable: true,
	        onClose: function () {
	            $(dalogTemp).panel('destroy');
	        },
	        modal: true,
	        onLoad: function () {
	        	initActivityGrid(param);
	        	initactivityCallBack(callBackHandel);
	        }
	    })
	    
	    function callBackHandel(data){
	        callback(data);
	        $(dalogTemp).panel('destroy');
	    }
}

/*
 * 三个按钮的提示框 是 1  否 0  取消 2
 * param {title:'',content:''}
*/

function publicConfirmDialog(callback,param){
	var dalogTemp = $('<div/>').dialog({
        href: contextPath+"/goods/goodsSelect/goPublicComfirmDialog",
        width: 'undefined'==typeof(param.width)?'':param.width,
        height: 'undefined'==typeof(param.height)?'':param.height,
        title: 'undefined'==typeof(param.title)?'提示':param.title,
        top:335,
        left:625,
        closable: true,
        resizable: false,
        onClose: function () {
            $(dalogTemp).panel('destroy');
        },
        modal: true,
        onLoad: function () {
        	initConfirmDialog(param);
        	initConfirmDialogCallBack(callBackHandel);
        }
    })
    
    function callBackHandel(data){
        callback(data);
        $(dalogTemp).panel('destroy');
    }
}

//盘点批号选择
var StockDialog = null;
function publicStocktakingDialog(param,callback){
		if(null != StockDialog) return;
		
		StockDialog = $('<div/>').dialog({
        href: contextPath+"/stocktaking/operate/publicStocktaking",
        title: '盘点批号选择',
        top:top,
        left:left,
        width:750,
        height:650,
        closable: true,
        resizable: false,
        onClose: function () {
            $(StockDialog).panel('destroy');
            StockDialog = null;
        },
        modal: true,
        onLoad: function () {
        	initStocktaking(param);
        	initStockCallBack(callBackHandel);
        }
    })
    
    function callBackHandel(data){
        callback(data);
        $(StockDialog).panel('destroy');
        StockDialog = null;
    }
}

/**
 * 判断页面表单数据是否发生变化
 */
function checkUtil(){
	var formId;//表单id
	var oldData = {}; //旧数据
	var newData = {}; //新数据
	
	this.setFormId = function(arg){
		formId = arg;
	}
	
	this.getFormId = function(){
		return formId;
	}
	
	this.getOldData = function(){
		return oldData;
	}
	this.setOldData = function(obj){
		oldData = obj;
	}
	
	this.getNewData = function(){
		return newData;
	}
	this.setNewData = function(obj){
		newData = obj;
	}
	
	this.initOldData = function(){
		oldData = this.serizeFromData(oldData);
	}
	
	this.initNewData = function(){
		newData = this.serizeFromData(newData);
	}
	
	this.assignInput = function(){
		var temObj={};
		$('#'+formId+' input[data-check="true"]').each(function(index,obj){
			temObj[""+$(obj).attr('name')+""]=$(obj).val();
		}) 
		return temObj;
	}
	
	//自定义序列化表单对象
	this.serizeFromData = function(source){
		var _serizeObj = $("#"+formId).serializeArray();
		if(_serizeObj && _serizeObj.length > 0){
			//表单值
			_serizeObj.forEach(function(obj,inx){
				source[""+obj.name+""] = obj.value||"";
			});
			
			return source;
		}
	}
	
	//是否发送变化
	this.ifChange = function(){
		if(!gFunComparisonArray(oldData,newData)){
			return false;
		}
		return true;
	}
		
}

//错误的弹框 只有关闭
function publicErrorDialog(param){
	var dialogTemp = $('<div/>').dialog({
        href: contextPath+"/component/dialog/error",
		width : 'undefined' == typeof (param.width) ? '' : param.width,
		height : 'undefined' == typeof (param.height) ? '' : param.height,
		title : 'undefined' == typeof (param.title) ? '提示' : param.title,
        top:335,
        left:625,
        closable: true,
        resizable: false,
        buttons:[{
            text:'关闭',
            handler:function(){
                $(dialogTemp).panel('destroy');
            },
        }],
        onClose: function () {
            $(dialogTemp).panel('destroy');
        },
        modal: true,
        onLoad: function () {
        	initErrorDialog(dialogTemp,param);
        }
    });
}
