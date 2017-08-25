/**
 * Created by zhaoly on 2017/8/18.
 */

$(function () {
    initgridAddPosAct();
    //机构选择初始化
    initBranchGroup();
    if($("#pageStatus").val() === "add"){
        $("#beginTime").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
        $("#overTime").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
        $("#validBeginTime").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
        $("#validOverTime").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    }else if ($("#pageStatus").val() == "copy"){
        $_jxc.ajax({url:contextPath+"/pos/wheelsurf/form/edit/detail/"+$("#copyId").val()},function (data) {
            $("#gridAddPosAct").datagrid("loadData",data.detail);
        });
    }else if($("#pageStatus").val() == "0"){
        $_jxc.ajax({url:contextPath+"/pos/wheelsurf/form/edit/detail/"+$("#formId").val()},function (data) {
            $("#gridAddPosAct").datagrid("loadData",data.detail);
        });
    }else{
        $_jxc.ajax({url:contextPath+"/pos/wheelsurf/form/edit/detail/"+$("#formId").val()},function (data) {
            $("#gridAddPosAct").datagrid("loadData",data.detail);
        });
    }

})


function initBranchGroup(){
    $('#branchTemp').branchSelect({
        param:{
            selectType:1,  //多选
            branchTypesStr:$_jxc.branchTypeEnum.FRANCHISE_STORE_B + ',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_C+','+ $_jxc.branchTypeEnum.OWN_STORES
        },
        loadFilter:function(data){
            if(data && data.length >0 ){
                data.forEach(function(obj,index){
                    obj.branchIds = obj.branchId;
                })
            }
            return data;
        }
    });
}


var gridName = "gridAddPosAct";
var gridAddPosActHandle = new GridClass();
var gridDefault = {
    skuId:"",
    prizeType:"1",
    rowNo:"",
    winNum:"1",
    winRate:"0.00",
    picUrl:""
}
function initgridAddPosAct() {
    gridAddPosActHandle.setGridName(gridName);
    $("#"+gridName).datagrid({
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'id',title:'id',align:'left',hidden:true},
            {field:'skuId',title:'skuId',align:'left',hidden:true,editor:'textbox'},
            {field:'prizeType',title:'奖品类型',width:'100px',align:'left',
                formatter:function(value,row){
                    if(row.isFooter){
                        return;
                    }
                    row.prizeType = row.prizeType?row.prizeType:1;
                    return value=='1'?'商品':(value=='3'?'谢谢惠顾':'请选择');
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField: 'id',
                        textField: 'text',
                        editable:false,
                        // required:true,
                        data: [{
                            "id":'1',
                            "text":"商品",
                        },{
                            "id":'3',
                            "text":"谢谢惠顾",
                        }],
                         onSelect:onSelectprizeType
                    }
                }
            },
            {field:'prizeFullName',title:'奖品名称',width:'200px',align:'left',
                editor:{
                    type:'textbox',
                    options:{
                        disabled:true,
                    }
                }
            },
            {field:'prizeShortName',title:'奖品简称',width:'200px',align:'left',
                editor:{
                    type:'textbox',
                    options:{
                        validType:{maxLength:[20],minLength:[1]},
                    }
                }
            },
            {field:'rowNo',title:'顺序',width:'100px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0)+'</b>';
                    }

                    if(!value){
                        row["rowNo"] = parseFloat(value||0);
                    }

                    return '<b>'+parseFloat(value||0)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:0,
                    }
                },
            },
            {field:'winNum',title:'中奖数量',width:'150px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0)+'</b>';
                    }

                    if(!value){
                        row["winNum"] = parseFloat(value||0);
                    }

                    return '<b>'+parseFloat(value||0)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:1,
                        precision:0,
                        placeholder:"中奖数量最小为1"
                    }
                },
            },
            {field:'prizeCopies',title:'奖品总份数',width:'150px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0)+'</b>';
                    }

                    if(!value){
                        row["prizeCopies"] = parseFloat(value||0);
                    }

                    return '<b>'+parseFloat(value||0)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:0,
                    }
                },
            },
            {field:'winRate',title:'中奖概率',width:'150px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    if(!value){
                        value = "0.00";
                    }else{
                        row['winRate'] = value;
                    }
                    return '<b>'+parseFloat(value).toFixed(2)+'% </b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0.00,
                        precision:2,
                    }
                },
            },
            {
                field : 'picUrl',
                title : '图片',
                align : 'center',
                width : 250,
                formatter:function(value,row){
                    var str = "";
                    if(value!="" && value!=null && undefined!=value){
                        str = "<img style=\"height: 60px;width: 60px;\" src=\""+value+"\"/>";
                        return str;
                    }
                }},
        ]],
        onClickCell:function(rowIndex,field,value){
            gridAddPosActHandle.setBeginRow(rowIndex);
            gridAddPosActHandle.setSelectFieldName(field);
            var target = gridAddPosActHandle.getFieldTarget(field);
            if(target){
                gridAddPosActHandle.setFieldFocus(target);
            }else{
                gridAddPosActHandle.setSelectFieldName("prizeShortName");
            }
        },
        onLoadSuccess:function(data){
            gridAddPosActHandle.setDatagridHeader("center");
        }
    })

    if($("#pageStatus").val() == "add") {
        gridAddPosActHandle.setLoadData([$.extend({}, gridDefault),$.extend({}, gridDefault),$.extend({}, gridDefault),
            $.extend({}, gridDefault),$.extend({}, gridDefault),$.extend({}, gridDefault)]);
    }
}

function onSelectprizeType(data) {
    var row = $("#"+gridName).datagrid("getSelected");
    if(data.id == "3"){
        gridAddPosActHandle.setFieldTextValue("skuId","xxhg");
        gridAddPosActHandle.setFieldTextValue("prizeFullName","谢谢惠顾");
        gridAddPosActHandle.setFieldTextValue("prizeShortName","谢谢惠顾");
    }else {
        if(row.skuId=="" || row.skuId =="xxhg"){
            gridAddPosActHandle.setFieldTextValue("skuId","");
            gridAddPosActHandle.setFieldTextValue("prizeFullName","");
            gridAddPosActHandle.setFieldTextValue("prizeShortName","");

        }
    }
}

function selectPrize() {
    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }

    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());
    var row = $("#"+gridName).datagrid("getSelected");
    if(!row || row.prizeType == "3"){
        $_jxc.alert("请选择一行奖品类型为商品的数据");
        return;
    }

    var queryParams = {
        type:'',
        key:"",
        isRadio:1,
        'branchId': $('#branchIds').val(),
        sourceBranchId:'',
        targetBranchId:'',
        flag:'0',
    };

    new publicGoodsServiceTem(queryParams,function(data){
        if(data.length==0){
            return;
        }

        row['prizeFullName'] = data[0].skuName;
        row['prizeShortName'] = data[0].skuName;
        row['skuId'] = data[0].skuId;
        // gridAddPosActHandle.setFieldTextValue("skuId",data[0].skuId);
        // gridAddPosActHandle.setFieldTextValue("prizeFullName",data[0].skuName);

        $("#"+gridName).datagrid("acceptChanges");
        $("#"+gridName).datagrid("updateRow",{index:gridAddPosActHandle.getSelectRowIndex(),row:row});
        $("#"+gridName).datagrid("refreshRow",gridAddPosActHandle.getSelectRowIndex())

        setTimeout(function(){
            gridAddPosActHandle.setBeginRow(gridAddPosActHandle.getSelectRowIndex()||0);
            gridAddPosActHandle.setSelectFieldName("prizeShortName");
            gridAddPosActHandle.setFieldFocus(gridAddPosActHandle.getFieldTarget('prizeShortName'));
        },100)
    });
}

function uploadPic() {
    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }
    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());
    var row = $("#"+gridName).datagrid("getSelected");
    if(!row){
        $_jxc.alert("请选择一行数据");
        return;
    }

    var param = {
        url:'/pos/wheelsurf/form/upload',
        size:250,
        imgWidth:100,
        imgHeight:100,
    }
    publicUploadImgService(param,function (data) {
        row.picUrl = data.filePath;
        $("#"+gridName).datagrid("acceptChanges");
        $("#"+gridName).datagrid("updateRow",{index:gridAddPosActHandle.getSelectRowIndex(),row:row});
        $("#"+gridName).datagrid("refreshRow",gridAddPosActHandle.getSelectRowIndex())
    });
}


function saveWheelsurf() {

    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }

    // if(dateUtil.compareDate($("#beginTime").val(),$("#validBeginTime").val())){
    //     $_jxc.alert("奖品有效期开始时间要在活动开始时间之后");
    //     return;
    // }

    // if(dateUtil.compareDate($("#overTime").val(),$("#validOverTime").val())){
    //     $_jxc.alert("奖品有效期结束时间要在活动结束时间之后");
    //     return;
    // }

    var actName = $("#wheelsurfName").val();
    if(!actName){
        $_jxc.alert("请填写活动名称");
        return;
    }


    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());
    var isValid = $("#gridAddForm").form('validate');
    if (!isValid) {
        return;
    }

    var rows = gridAddPosActHandle.getRowsWhere({skuId:'1'})
    var formObj = $("#formAdd").serializeObject();

    if(rows.length < 6){
        $_jxc.alert("检测到数据没有完成，请完成");
        return;
    }

    var rowNoArr = [];
    var hasRepeat = false;
    var totalRate = 0.00;
    var flag = false;
    $.each(rows,function (index,item) {
        if(item['prizeShortName'] === ""){
            $_jxc.alert("第"+(index+1)+"行，简称不能为空");
            flag = true;
            return false;
        }
        if(item['winNum'] === ""){
            $_jxc.alert("第"+(index+1)+"行，奖品总份数不能为空");
            flag = true;
            return false;
        }

        if($.inArray(item.rowNo, rowNoArr) == -1){
            rowNoArr.push(item.rowNo);
        }else{
            hasRepeat = true;
        }
        totalRate = totalRate + parseFloat(item.winRate);

        if(item.picUrl == ""){
            $_jxc.alert("第"+(index+1)+"行，图片没有上传")
            flag = true;
            return false;
        }
    })

    if(flag)return;

    if(hasRepeat){
        $_jxc.alert("顺序不能数字重复")
        return;
    }
    if(totalRate > 100 || totalRate < 100){
        $_jxc.alert("中奖概率总和应为100%,目前为："+totalRate+"%")
        return;
    }

    var param = {
        formObj : JSON.stringify(formObj),
        list : JSON.stringify(gridAddPosActHandle.getRows())
    };

    $_jxc.ajax({
        url:contextPath+'/pos/wheelsurf/form/save',
        data:param
    },function(result){
        if(result.code == 0){
            $_jxc.alert("保存成功",function (data) {
                window.location.href=contextPath+'/pos/wheelsurf/form/edit/'+result.data.id;
            })
        }else{
            $_jxc.alert(result['message']);
        }
    })


}

function updateWheelsurf() {
    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());

    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return;
    }

    var actName = $("#wheelsurfName").val();
    if(!actName){
        $_jxc.alert("请填写活动名称");
        return;
    }

    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());

    var isValid = $("#gridEditForm").form('validate');
    if (!isValid) {
        return;
    }


    var formObj = $("#formAdd").serializeObject();

    var param = {
        formObj : JSON.stringify(formObj),
        list : JSON.stringify(gridAddPosActHandle.getRows())
    };

    $_jxc.ajax({
        url:contextPath+'/pos/wheelsurf/form/update',
        data:param,
    },function(result){
        if(result.code == 0){
            $_jxc.alert("保存成功",function () {
                gFunRefresh();
            })
        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function checkWheelsurf() {
    var actName = $("#wheelsurfName").val();
    if(!actName){
        $_jxc.alert("请填写活动名称");
        return;
    }

    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());

    var isValid = $("#gridEditForm").form('validate');
    if (!isValid) {
        return;
    }

    $_jxc.ajax({
        url:contextPath+'/pos/wheelsurf/form/audit',
        data:{
            formId : $("#formId").val(),
        },
    },function(result){
        if(result.code == 0){
            $_jxc.alert("审核成功",function () {
                gFunRefresh();
            });
        }else{
            $_jxc.alert(result['message']);
        }
    })

}

function overWheelsurf() {

    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());

    var isValid = $("#gridEditForm").form('validate');
    if (!isValid) {
        return;
    }

    $_jxc.ajax({
        url:contextPath+'/pos/wheelsurf/form/over',
        data:{
            formId : $("#formId").val(),
        },
    },function(result){
        if(result.code == 0){
            $_jxc.alert("终止成功",function () {
                gFunRefresh();
            });
        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function copyPosActivity(id) {
    window.parent.addTab('复制POS客屏活动',contextPath+'/pos/wheelsurf/form/copy/'+id);
}