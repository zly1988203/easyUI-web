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

function disabledElement(){
    $("#beginTime").prop("disabled",true);
    $("#overTime").prop("disabled",true);
    $("#validOverTime").prop("disabled",true);
    $("#wheelsurfName").prop("disabled",true);
    $("#branchName").prop("disabled",true);
    $("#formType").combobox({disabled:true});
    $("#wheelsurfTime").numberbox({disabled:true});
}


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
            {field:'prizeShortName',title:'奖品简称',width:'200px',align:'left',editor:'textbox',
            },
            {field:'rowNo',title:'顺序',width:'100px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0)+'</b>';
                    }
                    if(!value){
                        value = (index+1);
                    }

                    row['rowNo'] = value;

                    return '<b>'+parseFloat(value||0)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:0,
                        max:999999,
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
                        max:999999,
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
                        max:999999,
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
                    return '<b>'+parseFloat(value||0).toFixed(2)+'% </b>';
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

function addPosActivity() {
    toAddTab("新增Pos客屏活动",contextPath + "/pos/wheelsurf/form/add");
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
        formType:"HD",
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
    if(!validform()) return;

    var formObj = $("#formAdd").serializeObject();
    formObj.validBeginTime = formObj.beginTime;
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

function validform() {
    var branchId = $("#branchIds").val();
    if(!branchId){
        $_jxc.alert("请先选择活动机构");
        return false;
    }

    if(!$("#beginTime").val() || !$("#overTime").val()){
        $_jxc.alert("活动开始和结束时间不能为空");
        return false;
    }

    if(compareDate($("#beginTime").val(),$("#overTime").val())){
        $_jxc.alert("活动结束时间不能在活动开始时间之前");
        return false;
    }

    if(compareDate($("#overTime").val(),$("#validOverTime").val())){
        $_jxc.alert("奖品截止日期不能在活动结束时间之前");
        return false;
    }

    var actName = $("#wheelsurfName").val();
    if(!actName){
        $_jxc.alert("请填写活动名称");
        return false;
    }

    var wheelsurfTime = $("#wheelsurfTime").numberbox("getValue")
    if (!wheelsurfTime || null == wheelsurfTime) {
        $_jxc.alert("请填写抽奖次数");
        return false;
    }

    $("#"+gridName).datagrid("endEdit",gridAddPosActHandle.getSelectRowIndex());

    var rows = gridAddPosActHandle.getRowsWhere({prizeFullName:'1'})

    if(rows.length < 6){
        $_jxc.alert("检测到数据没有完成，请完成");
        return false;
    }

    var rowNoArr = [];
    var hasRepeat = false;
    var totalRate = 0.00;
    var flag = false;
    $.each(rows,function (index,item) {
        if(item['prizeShortName'] === "" || item['prizeShortName'] == null){
            $_jxc.alert("第"+(index+1)+"行，简称不能为空");
            flag = true;
            return false;
        }

        if(item['prizeShortName'].length > 10){
            $_jxc.alert("第"+(index+1)+"行，简称长度大于了10个字符");
            flag = true;
            return false;
        }

        if(item['rowNo'] === "" || item['rowNo'] == null){
            $_jxc.alert("第"+(index+1)+"行，序号不能为空");
            flag = true;
            return false;
        }

        if(item['winNum'] === "" || item['winNum'] == null){
            $_jxc.alert("第"+(index+1)+"行，奖品总份数不能为空");
            flag = true;
            return false;
        }


        if ($.inArray(parseFloat(item.rowNo), rowNoArr) == -1) {
            rowNoArr.push(parseFloat(item.rowNo));
        }else{
            hasRepeat = true;
        }

        if (item['winRate'] === "0.00" || parseFloat(item.winRate).toFixed(2) == 0.00) {
            $_jxc.alert("第" + (index + 1) + "行，中奖概率不能为0");
            flag = true;
            return false;
        }

        totalRate = totalRate + parseFloat(item.winRate);

        if(item.picUrl == ""){
            $_jxc.alert("第"+(index+1)+"行，图片没有上传")
            flag = true;
            return false;
        }
    })

    if(flag) return false;

    if(hasRepeat){
        $_jxc.alert("顺序不能数字重复")
        return false;
    }
    if(totalRate > 100 || totalRate < 100){
        $_jxc.alert("中奖概率总和应为100%,目前为："+totalRate+"%")
        return false;
    }

    return true;
}

function updateWheelsurf() {
    if(!validform()) return;

    var formObj = $("#formAdd").serializeObject();
    formObj.validBeginTime = formObj.beginTime;

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

    $_jxc.confirm("确认审核通过？",function (res) {
        if(res){
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
    })



}

function overWheelsurf() {
    $_jxc.confirm("确定终止此活动？",function (res) {
        if(res){
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
    })

}

function copyPosActivity(id) {
    window.parent.addTab('复制POS客屏活动',contextPath+'/pos/wheelsurf/form/copy/'+id);
}

function compareDate(startDate,endDate) {
    var d1 = new Date(startDate.replace(/\-/g, "\/"));
    var d2 = new Date(endDate.replace(/\-/g, "\/"));
    if(startDate!=""&&endDate!=""&&d1 > d2)
    {
        return true;
    }
    return false;
}