
/**
 * Created by zhangq on 2016/11/25.
 * 公共组件-打印选择
 */
/**
 * 弹出打印选项
 * templateCode:模版代码，如PASheet
 * controllerUrl:打印处理类，如/form/purchase/
 * submitFrom：提交来源,list或print
 */
function printChoose(templateCode,controllerUrl){
	$('#printSet .ub,#printSet .uabtns').removeClass('uhide');
	$("#printSet").dialog({
        title:'打印选项',
        width: 350,
        height:190,
        modal: true,
        resizable:true,
        closed: false,   
        cache: false
    });
	
	$("#templateCode").val(templateCode+"Sheet");
	$("#controllerUrl").val(controllerUrl);
	initTemplateSelect();
}

//初始模版下拉框
function initTemplateSelect(){
	var templateCode = $("#templateCode").val();
	
	var url = contextPath + "/printdesign/loadPrintTemplates?templateCode="
			+ templateCode;
	//初始下拉框
	$('#printTemplateSelect').combobox({
		url : url,
		valueField : 'templateId',
		textField : 'templateName',
		onLoadSuccess:function(){
			var data = $('#printTemplateSelect').combobox('getData');
			$('#printTemplateSelect').combobox('select',data[0].templateId);
		}
	});
}

//打印预览
function toPrintComponentPreview(){
	var id = $("#formId").val();
	var formNo = $("#formNo").val();
	
	var templateCode = $("#templateCode").val();
	var templateId = $("#printTemplateSelect").combobox('getValue');
	var controllerUrl = $("#controllerUrl").val();
	
	//访问路径
    var url = contextPath + controllerUrl + "preview?page=" + templateCode
		+ "&form=list&template=" + templateId + "&sheetNo="
		+ id;
    //弹出打印页面
    parent.addTabPrint(templateCode + id,formNo+'打印预览',url,'');
}

//打印设置
function toPrintComponentSet(){
	var id = $("#formId").val();
	var formNo = $("#formNo").val();
	
	var templateCode = $("#templateCode").val();
	var templateId = $("#printTemplateSelect").combobox('getValue');
	var controllerUrl = $("#controllerUrl").val();
	
	//访问路径
	var url = contextPath + "/printdesign/design?page=" + templateCode
			+ "&controller=" + controllerUrl + "&template=" + templateId
			+ "&sheetNo=" + id + "&gridFlag=PAGrid";
    //弹出打印页面
	parent.addTabPrint(templateCode + id, formNo + '单据打印', url, '');
}

//直接打印
function toPrintComponentPrint(){
	var id = $("#formId").val();
	var formNo = $("#formNo").val();
	
	var templateCode = $("#templateCode").val();
	var templateId = $("#printTemplateSelect").combobox('getValue');
	var controllerUrl = $("#controllerUrl").val();
	
	//访问路径
    var url = contextPath + controllerUrl +"preview?page=" + templateCode
		+ "&form=print&template=" + templateId + "&sheetNo="
		+ id;
    //弹出打印页面
    parent.addTabPrint(templateCode + id,formNo+'打印预览',url,'');
}

//列表页面进入预览
function toPrintPreview(templateCode, controllerUrl, gridId) {
	//单据列表grid
	var dg;
	if(gridId == undefined){
		dg = $("#gridOrders");
	}else{
		dg = $("#"+gridId);
	}
	
    var row = dg.datagrid("getSelected");
    if(rowIsNull(row)){
          return null;
    }
    var url=contextPath + controllerUrl +"preview?page="+templateCode+"Sheet&form=list&template=-1&sheetNo=" + row.id ;
    //弹出打印页面
    parent.addTabPrint(templateCode + row.id,row.formNo+'打印预览',url,'');
}