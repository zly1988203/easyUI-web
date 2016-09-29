/**
 * Created by wxl on 2016/08/17.
 */
$(function(){
    //开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
     //初始化列表
	    initCashDailyallGrid();
     $('.choosestype').on('click',function(){

      if($(this).hasClass('cashDailyAll')){
      	//初始化列表按收银员汇总
	    initCashDailyallGrid();
        }
      	else if($(this).hasClass('cashDailyMd')){
      	//初始化列表按门店汇总
      	initCashDailymdGrid();
      		
      	}
      	else if($(this).hasClass('cashDailyDate')){
      	//初始化列表按日期汇总
      	initCashDailydateGrid();
      	}
      })
    
});

function initCashDailyallGrid() {
    $("#cashDaily").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'get',
        align: 'center',
        url: '../../json/component.json',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        //showFooter:true,
        columns: [[
            {field: 'dpbh', title: '店铺编号', width: 200, align: 'center',  },
            {field: 'dpmc', title: '店铺名称', width: 200, align: 'center',},
            {field: 'syybh', title: '收银员编号', width: 150, align: 'center'},
            {field: 'syy', title: '收银员', width: 150, align: 'center'},
            {field: 'ye', title: '余额', width: 80, align: 'center'},
            {field: 'xj', title: '现金', width: 80, align: 'center'},
            {field: 'zfb', title: '支付宝', width: 80, align: 'center'},
            {field: 'wx', title: '微信', width: 80, align: 'center'},
            {field: 'ptbt', title: '平台补贴', width: 150, align: 'center'},
            {field: 'ylk', title: '银联卡', width: 200, align: 'center'},
            {field: 'hjje', title: '合计金额', width: 80, align: 'center'},
        ]]
    });
}
function initCashDailymdGrid() {
    $("#cashDaily").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'get',
        align: 'center',
        url: '../../json/component.json',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        //showFooter:true,
        columns: [[
           {field: 'dpbh', title: '店铺编号', width: 200, align: 'center',  },
            {field: 'dpmc', title: '店铺名称', width: 200, align: 'center',},
            {field: 'ye', title: '余额', width: 80, align: 'center'},
            {field: 'xj', title: '现金', width: 80, align: 'center'},
            {field: 'zfb', title: '支付宝', width: 80, align: 'center'},
            {field: 'wx', title: '微信', width: 80, align: 'center'},
            {field: 'ptbt', title: '平台补贴', width: 150, align: 'center'},
            {field: 'ylk', title: '银联卡', width: 200, align: 'center'},
            {field: 'hjje', title: '合计金额', width: 80, align: 'center'},
        ]]
    });
}
function initCashDailydateGrid() {
    $("#cashDaily").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'get',
        align: 'center',
        url: '../../json/component.json',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        //showFooter:true,
        columns: [[
            {field: 'dpbh', title: '店铺编号', width: 200, align: 'center',  },
            {field: 'dpmc', title: '店铺名称', width: 200, align: 'center',},
            {field: 'syybh', title: '操作日期', width: 150, align: 'center'},
            {field: 'ye', title: '余额', width: 80, align: 'center'},
            {field: 'xj', title: '现金', width: 80, align: 'center'},
            {field: 'zfb', title: '支付宝', width: 80, align: 'center'},
            {field: 'wx', title: '微信', width: 80, align: 'center'},
            {field: 'ptbt', title: '平台补贴', width: 150, align: 'center'},
            {field: 'ylk', title: '银联卡', width: 200, align: 'center'},
            {field: 'hjje', title: '合计金额', width: 80, align: 'center'},
        ]]
    });
}


//改变日期
function changeDate(index){
    switch (index){
        case 0: //今天
            $("#txtStartDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
            break;
        case 1: //昨天
            $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",1));
            $("#txtEndDate").val(dateUtil.getCurrDayPreOrNextDay("prev",1));
            break;
        case 2: //本周
            $("#txtStartDate").val(dateUtil.getCurrentWeek()[0].format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
            break;
        case 3: //上周
            $("#txtStartDate").val(dateUtil.getPreviousWeek()[0].format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.getPreviousWeek()[1].format("yyyy-MM-dd"));
            break;
        case 4: //本月
            $("#txtStartDate").val(dateUtil.getCurrentMonth()[0].format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
            break;
        case 5: //上月
            $("#txtStartDate").val(dateUtil.getPreviousMonth()[0].format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.getPreviousMonth()[1].format("yyyy-MM-dd"));
            break;
        case 6: //本季
            $("#txtStartDate").val(dateUtil.getCurrentSeason()[0].format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
            break;
        case 7: //上季
            $("#txtStartDate").val(dateUtil.getPreviousSeason()[0].format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.getPreviousSeason()[1].format("yyyy-MM-dd"));
            break;
        case 8: //今年
            $("#txtStartDate").val(dateUtil.getCurrentYear()[0].format("yyyy-MM-dd"));
            $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
            break;
        default :
            break;
    }
}
