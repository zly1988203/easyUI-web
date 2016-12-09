/**
 * Created by huangj02 on 2016/9/6.
 */
$(function(){
    initDatagridEditRebate();
});
var gridDefault = {
    money:0,
    rebate:0,
}
var gridHandel = new GridClass();
function initDatagridEditRebate(){
    gridHandel.setGridName("gridEditRebate");
    gridHandel.initKey();
    $("#gridEditRebate").datagrid({
        url:contextPath+'/form/deliverConfig/getRebateConfig',
        method:'POST',
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        height:'100%',
        data:[$.extend({},gridDefault)],
        columns:[[
            {field:'cz',title:'操作',width:100,align:'center',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                        '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
                    return str;
                },
            },
            {field:'money',title:'买满金额',width:200,height:60,align:'center',
                formatter : function(value, row,index) {
                    return parseFloat(value||0).toFixed(2);
                },
                editor:{
                    type:'numberbox',
                    value:0,
                    options:{
                        min:0,
                        precision:2,
                        onChange: onChangeMoney,
                    }
                },
            },
            {field:'rebate',title:'返利率%',width:200,height:60,align:'center',
                editor:{
                    type:'numberbox',
                    value:0,
                    options:{
                        min:0,
                        max:100,
                        precision:2,
                    }
                },
            },

        ]],
        onClickCell:function(rowIndex,field,value){
            gridHandel.setBeginRow(rowIndex);
            gridHandel.setSelectFieldName(field);
            var target = gridHandel.getFieldTarget(field);
            if(target){
                gridHandel.setFieldFocus(target);
            }else{
                gridHandel.setSelectFieldName("money");
            }

        },
    });
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
//监听买满金额
function onChangeMoney(newV,oldV) {
    if(gridHandel.getSelectRowIndex()==0&&gridHandel.getRows().length>1){
        var nextMoneyValue = gridHandel.getFieldData(parseInt(gridHandel.getSelectRowIndex())+1,'money');
        if(parseFloat(nextMoneyValue)<=parseFloat(newV)){
            messager("当前买满金额必须小于下一行");
            gridHandel.setFieldValue('money',oldV);
        }
    }else{
        var lastMoneyValue = gridHandel.getFieldData(parseInt(gridHandel.getSelectRowIndex())-1,'money');
        if(!lastMoneyValue){
            messager("上一行买满金额为空，不允许输入");
            gridHandel.setFieldValue('money',"");
            return;
        }
        if(parseFloat(lastMoneyValue)>=parseFloat(newV)){
            messager("当前买满金额必须大于上一行");
            gridHandel.setFieldValue('money',oldV);
        }

    }

}
//保存
function saveRebateForm(){
    var args = {
        moneys:'',
        rebates:'',
    }
    gridHandel.endEditRow();
    var rows = gridHandel.getRowsWhere({skuName:'1'});
    $(gridHandel.getGridName()).datagrid("loadData",rows);
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
    var isCheckResult = true;
    $.each(rows,function(i,v){
        if(!v["money"]){
            messager("第"+(i+1)+"行，买满金额不能为空");
            isCheckResult = false;
            return false;
        };
        if(v["rebate"]<=0){
            messager("第"+(i+1)+"行，返利率不能为空");
            isCheckResult = false;
            return false;
        }
        args.moneys += v["money"]+'|';
        args.rebates += v["rebate"]+'|';
    });
    if(!isCheckResult){
        return;
    }
    $.ajax({
        url:contextPath+"/form/deliverConfig/saveRebate",
        type:"POST",
        data:args,
        success:function(result){
            if(result['code'] == 0){
                messager("保存成功！");
            }else{
                successTip(result['message']);
            }
        },
        error:function(data){
            successTip("请求发送失败或服务器处理失败");
        }
    })
}