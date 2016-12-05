$(function () {
	//模版编号
    var temp_no = $.helper.getUrlVar('template')
    //单据类型
    var page = $.helper.getUrlVar('page');
    //单据单号
    var sheet_no = $.helper.getUrlVar('sheetNo');
    
    //缺少必要参数，直接返回
    if (!temp_no || !page || temp_no == '' || page == '') {
    	return;	
    }

    //打印按钮点击事件
    $("#btnPrint").click(function () {
        options.isPreview = false;        
        $.sheetDesignPrint(options);       
    });
    
    temp_no = parseInt(temp_no);    
    var tab_id = temp_no < 0 ? 'prev_' + page : 'prev_' + temp_no;
    if (temp_no == -2) {
    	tab_id = 'prev_temp';
    }
    if (sheet_no) {
    	tab_id = tab_id + '_' + sheet_no;
    }
    var options = window.parent[tab_id];
    
    //创建打印页
    options.isPreview = true;
    
    $("#divPrint").createPages(options);
    
    //window.parent[tab_id] = undefined;
});