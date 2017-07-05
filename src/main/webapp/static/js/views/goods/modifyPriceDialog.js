/**
 * Created by zhanghuan on 2016/08/15.
 */
$(function(){
    //根据调价设置的选中值，select展示对应的值
    judgeIsAllChecked();
});


//根据调价设置的选中值，select展示对应的值
function judgeIsAllChecked(){
    var purchasePriceIsChecked = $("#purchasePrice").is(":checked");  //进货价
    var retailPriceIsChecked = $("#retailPrice").is(":checked");  //零售价
    var tradePriceIsChecked = $("#tradePrice").is(":checked");  //批发价
    var memberPriceIsChecked = $("#memberPrice").is(":checked");  //会员价
    var distributionPriceIsChecked = $("#distributionPrice").is(":checked"); //配送价

    if(!purchasePriceIsChecked && !retailPriceIsChecked && !tradePriceIsChecked && !memberPriceIsChecked && !distributionPriceIsChecked){
        $("#select1,#select2").empty().append("<option value='0'>行号</option>");
    }

    //进货价选中
    if(purchasePriceIsChecked){
        $("#select1").append("<option value='newPurPrice'>新进货价</option>");
        $("#select2").append("<option value='newPurPrice'>新进货价</option>");
        $("#select2").append("<option value='oldPurPrice'>原进货价</option>");
    }

    //零售价选中
    if(retailPriceIsChecked){
        $("#select1").append("<option value='newSalePrice'>新零售价</option>");
        $("#select2").append("<option value='newSalePrice'>新零售价</option>");
        $("#select2").append("<option value='oldSalePrice'>原零售价</option>");
    }

    //批发价选中
    if(tradePriceIsChecked){
        $("#select1").append("<option value='newWsPrice'>新批发价</option>");
        $("#select2").append("<option value='newWsPrice'>新批发价</option>");
        $("#select2").append("<option value='oldWsPrice'>原批发价</option>");
    }

    //会员价选中
    if(memberPriceIsChecked){
        $("#select1").append("<option value='newVipPrice'>新会员价</option>");
        $("#select2").append("<option value='newVipPrice'>新会员价</option>");
        $("#select2").append("<option value='oldVipPrice'>原会员价</option>");
    }

    //配送价选中
    if(distributionPriceIsChecked){
        $("#select1").append("<option value='newDcPrice'>新配送价</option>");
        $("#select2").append("<option value='newDcPrice'>新配送价</option>");
        $("#select2").append("<option value='oldDcPrice'>原配送价</option>");
    }
}


//根据调节选择设置对应价格
function setModifyPrice(thisPanel){
    var selectVal0 = parseInt($("#select0 option:selected").val().trim());  //计算结果保留小数位数
    var selectVal1 = $("#select1 option:selected").val().trim();  //新价
    var selectVal2 = $("#select2 option:selected").val().trim();  //新价和原价
    var selectVal3 = $("#select3 option:selected").val().trim();  //+-*/
    var inputPrice = $("#inputPrice").val().trim();
    if(inputPrice == "" || inputPrice == 0){
        $_jxc.alert('自定义计算值不能为零!');
        return false;
    }
    //新的数组
    var newData = [];
    //datagrid行数据
    var rows = [];
    //公式计算范围
    var selectScope = $("input[name='selectradio']:checked").val().trim();
    if(selectScope == "all") //所有行
    {
        rows = $("#"+datagridId).datagrid("getRows");
    }else if(selectScope == "one"){ //选择的单行
        rows = $("#"+datagridId).datagrid("getSelections");
    }
    if(rows.length == 0 || (selectVal1 == "0" && selectVal2 == "0")){
    	//销毁当前的dialog
        thisPanel.panel('destroy');
        return false;
    }
    newData = rows;
    for(var i = 0;i < rows.length;i++){
    	switch(selectVal3){
            case "+": //加
                //新价 = 新价或者原价 （+-*/）输入的价格
                newData[i][selectVal1] = parseFloat(newData[i][selectVal2] || 0) + parseFloat(inputPrice);
                break;
            case "-": //减
                newData[i][selectVal1] = parseFloat(newData[i][selectVal2] || 0) - parseFloat(inputPrice);
                break;
            case "*": //乘
                newData[i][selectVal1] = parseFloat(newData[i][selectVal2] || 0) * parseFloat(inputPrice);
                break;
            case "/": //除
                newData[i][selectVal1] = parseFloat(newData[i][selectVal2] || 0) / parseFloat(inputPrice);
                break;
        }
        
        //计算结果保留小数位数,toFixed四舍五入
        newData[i][selectVal1] = (newData[i][selectVal1]).toFixed(selectVal0);

        //返回指定列的选项
        //var currEditor = $("#"+datagridId).datagrid("getColumnOption",selectVal1);
        //currEditor.editor.options.precision = selectVal0;
    }

    if(selectScope == "all"){ //选择的所有行
    	//重新加载数据
    	$("#"+datagridId).datagrid("loadData",newData);
    	
    }else if(selectScope == "one"){ //选择的单行
        // 获取选中行的Index的值  
        var rowIndex = -1;
        for(var i = 0;i < newData.length;i++)
        {
        	rowIndex = $("#"+datagridId).datagrid('getRowIndex',newData[i]);  
        	//更新行数据
        	$("#"+datagridId).datagrid('updateRow',{
            	index: rowIndex,
            	row: newData[i]
            });
        	//刷新行
        	$("#"+datagridId).datagrid('refreshRow',rowIndex);  
        }
    }

    //销毁当前的dialog
    thisPanel.panel('destroy');
}