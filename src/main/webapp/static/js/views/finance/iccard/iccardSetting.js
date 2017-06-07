/**
 * Created by zhaoly on 2017/5/22.
 */

$(function () {
    initGridCardSetting();
})

var gridName = "gridCardSetting";
var gridHandel = new GridClass();
function initGridCardSetting() {
    gridHandel.setGridName(gridName);

    $("#"+gridName).datagrid({
        align:'center',
        url: 'setting/type/list',
        rownumbers:true,    //序号
        showFooter:true,
        singleSelect:true,  //单选  false多选
        checkOnSelect:false,
        selectOnCheck:false,
        height:500,
        width:600,
        columns:[[
        	{field: 'id', title: '一卡通Id', hidden:"true"},
            {field: 'ecardType', title: '一卡通类型', width: 180, align: 'left'},
            // {field:'check',checkbox:true},
            {field: 'enabled', title: '启用', checkbox:true,width: 80, align: 'left',
                formatter : function(value, row,index) {
                    // if(value == 1){
                    //     return '<input type="checkbox" class="ck" checked/>';
                    // }else{
                    //     return '<input type="checkbox" class="ck" />';
                    // }
                    return value;

            },
            },
            {field: 'cz', title: '操作', width: 180, align: 'right',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" onclick="openShopSettingLis(\''+row.id+'\')" ' +
                        ' class="ualine">'+'开通店铺列表'+'</a>';

                    return str;
                },
            },
        ]],
        onCheck:function(rowIndex,rowData){
        	rowData.enabled = '1';
        	rowData.checked = true;
        },
        onUncheck:function(rowIndex,rowData){
        	rowData.enabled = '0';
        	rowData.checked = false;
        },
        onCheckAll:function(rows){
        	$.each(rows,function(index,item){
        		item.enabled = '1';
        		item.checked = true;
        	})
        },
        onUncheckAll:function(rows){
        	$.each(rows,function(index,item){
        		item.enabled = '0';
        		item.checked = false;
        	})
        },
        loadFilter:function(data){
        	if(data.rows.length > 0){
        		
        		data.rows.forEach(function(obj,index){
        			obj.checked = obj.enabled == '1'?true:false;
        		})
        	}
        	return data;
        },
    })

}

function saveCardSetting() {
	var selRows = $('#gridCardSetting').datagrid('getRows'); 
	var ids=new Array();
	var enableds=new Array();
	for(var  i = 0;i<selRows.length;i++){
		ids[i] = selRows[i].id;
		enableds[i]=selRows[i].enabled;
	}
    $.post("setting/save", $('#saveForm').serialize()+urlEncode(ids,"ids")+urlEncode(enableds,"enableds"),
			   function(datas){
		$_jxc.alert(datas.data);
    	}
    , "json");
}

var urlEncode = function (param, key, encode) {
	  if(param==null) return '';
	  var paramStr = '';
	  var t = typeof (param);
	  if (t == 'string' || t == 'number' || t == 'boolean') {
	    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
	  } else {
	    for (var i in param) {
	      var k = key == null ? i : key + (param instanceof Array ? '[]' : '.' + i);
	      paramStr += urlEncode(param[i], k, encode);
	    }
	  }
	  return paramStr;
	};
	
var cardDialog = null;
function addCard() {
    cardDialog = $('<div/>').dialog({
        href: contextPath+"/iccard/setting/addIcCardType",
        width:500,
        height:500,
        title: "一卡通设置",
        closable: true,
        resizable: true,
        onClose: function () {
            $(cardDialog).panel('destroy');
            cardDialog = null;
        },
        modal: true,
        onLoad: function () {

        }
    })
}

function closeCardDialog() {
    $(cardDialog).panel('destroy');
    cardDialog = null;
}

function delCard() {
    var row = $("#"+gridName).datagrid("getSelected");
    if(!row || row == null){
        $_jxc.alert("请选择一条数据");
        return;
    }

    $.messager.confirm('提示','是否要删除选中数据',function(data){
        if(data){
            gFunStartLoading();
            $.ajax({
                url:contextPath+"/iccard/setting/type/delete/"+row.id,
                type:"POST",
                success:function(result){
                    gFunEndLoading();
                    if(result['code'] == 0){
                        successTip("删除成功");
                    }else{
                        successTip(result['message']);
                    }
                    $("#"+gridName).datagrid('reload');
                },
                error:function(result){
                    gFunEndLoading();
                    successTip("请求发送失败或服务器处理失败");
                }
            });
        }
    });
}

var shopSettingDialog = null;
var dialogHeight = $(window).height()*(4/5);
var dialogWidth = $(window).width()*(5/9);
var dialogLeft = $(window).width()*(1/5);
function openShopSettingLis(cardType) {
    shopSettingDialog = $('<div/>').dialog({
        href: contextPath+"/iccard/setting/icCardShopSetting",
        width: dialogWidth,
        height: dialogHeight,
        left:dialogLeft,
        title: "开通店铺列表",
        closable: true,
        resizable: true,
        onClose: function () {
            $(shopSettingDialog).panel('destroy');
            shopSettingDialog = null;
        },
        modal: true,
        onLoad: function () {
            initShopSetting(cardType);
        }
    })
}

function closeShopSettingDialog() {
    $(shopSettingDialog).panel('destroy');
    shopSettingDialog = null;
}