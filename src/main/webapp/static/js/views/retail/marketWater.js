/**
 * Created by wxl on 2016/08/17.
 */
$(function(){
    //开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));

    //初始化列表
    initMarketWaterGrid();
});

function initMarketWaterGrid() {
    $("#marketWater").datagrid({
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
            {field: 'djbh', title: '单据编号', width: 150, align: 'center'},
            {field: 'shsj', title: '时间', width: 150, align: 'center'},
            {field: 'pm', title: '品名', width: 100, align: 'center'},
            {field: 'shhh', title: '货号', width: 100, align: 'center'},
            {field: 'shgg', title: '规格', width: 80, align: 'center'},
            {field: 'shdw', title: '单位', width: 80, align: 'center'},
            {field: 'ywlx', title: '业务类型', width: 150, align: 'center'},
            {field: 'shsl', title: '数量', width: 80, align: 'center'},
            {field: 'xsj', title: '销售价', width: 80, align: 'center'},
            {field: 'xsje', title: '销售金额', width: 80, align: 'center'},
            {field: 'yj', title: '原价', width: 80, align: 'center'},
            {field: 'yjje', title: '原价金额', width: 80, align: 'center'},
            {field: 'lbbm', title: '类别编码', width: 150, align: 'center'},
            {field: 'lbmc', title: '类别名称', width: 150, align: 'center'},
            {field: 'syy', title: '收银员', width: 100, align: 'center'},
            {field: 'thyy', title: '退货原因', width: 200, align: 'center'},
            {field: 'shbz', title: '备注', width: 150, align: 'center'},
            {field: 'shzk', title: '折扣', width: 150, align: 'center'},
            {field: 'djzt', title: '单据状态', width: 150, align: 'center'},
         
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
