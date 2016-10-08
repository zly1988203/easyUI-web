/**
 * Created by wangxl01 on 2016/8/22.
 */
var X = XLSX;
var XW = {
    /* worker message */
    msg: 'xlsx',
    /* worker scripts */
    rABS: contextPath +'/static/libs/xlsx/xlsxworker.js',
};

function ab2str(data) {
    var o = "", l = 0, w = 10240;
    for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint16Array(data.slice(l*w,l*w+w)));
    o+=String.fromCharCode.apply(null, new Uint16Array(data.slice(l*w)));
    return o;
}

function s2ab(s) {
    var b = new ArrayBuffer(s.length*2), v = new Uint16Array(b);
    for (var i=0; i != s.length; ++i) v[i] = s.charCodeAt(i);
    return [v, b];
}

function xw_noxfer(data, cb) {
    var worker = new Worker(XW.noxfer);
    worker.onmessage = function(e) {
        switch(e.data.t) {
            case 'ready': break;
            case 'e': console.error(e.data.d); break;
            case XW.msg: cb(JSON.parse(e.data.d)); break;
        }
    };
    var arr =data;
    worker.postMessage({d:arr,b:rABS});
}

function xw_xfer(data, cb) {
    var worker = new Worker(XW.rABS );
    worker.onmessage = function(e) {
        switch(e.data.t) {
            case 'ready': break;
            case 'e': console.error(e.data.d); break;
            default:
                xx=ab2str(e.data).replace(/\n/g,"\\n").replace(/\r/g,"\\r");
                cb(JSON.parse(xx)); break;
        }
    };
        var val = s2ab(data);
        worker.postMessage(val[1], [val[1]]);
}

function xw(data, cb) {
   xw_xfer(data, cb);
}

function get_radio_value( radioName ) {
    var radios = document.getElementsByName( radioName );
    for( var i = 0; i < radios.length; i++ ) {
        if( radios[i].checked || radios.length === 1 ) {
            return radios[i].value;
        }
    }
}

function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if(roa.length > 0){
            result[sheetName] = roa;
        }
    });
    return result;
}

function to_csv(workbook) {
    var result = [];
    workbook.SheetNames.forEach(function(sheetName) {
        var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        if(csv.length > 0){
            result.push("SHEET: " + sheetName);
            result.push("");
            result.push(csv);
        }
    });
    return result.join("\n");
}

function to_formulae(workbook) {
    var result = [];
    workbook.SheetNames.forEach(function(sheetName) {
        var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
        if(formulae.length > 0){
            result.push("SHEET: " + sheetName);
            result.push("");
            result.push(formulae.join("\n"));
        }
    });
    return result.join("\n");
}

var subArry = [];
var subArryAll = [];
var subArrySku = [];
function process_wb(wb) {
    var output = JSON.stringify(to_json(wb), 2, 2);
    if(typeof output !== 'undefined'){
        subArry = serizeObj(output);
        subArryAll = serizeObjAll(output);
		subArrySku = serizeObjSku(output);
        console.info(subArry)
    }
}


function serizeObj(data){
    var tempJson = JSON.parse(data);//字符串转化成对象
    var ObjList = [];
    if(tempJson.Sheet0){
    	tempJson.Sheet0.forEach(function(elt,index){
	       // var obj = {SkuNo:elt["货号"]};
	    	var obj =elt["货号"];
	    	ObjList.push(obj);
	    });
    }
    if(tempJson.Sheet1){
    	tempJson.Sheet1.forEach(function(elt,index){
	        // var obj = {SkuNo:elt["货号"]};
	     	var obj =elt["货号"];
	     	ObjList.push(obj);
	     });
    }
    return ObjList;
   }

//导入  配送
function postelsxDeliver(tableid,url,sourceBranchId,targetBranchId,formType,cb){
	//begin bu lijy02 2016.9.12:
	//1.导入明细 0. 导入货号
	if(gVarImportType=="1"){
		url=contextPath+url+"/importGoodsListsDeliver";
		var paramsAll  = {
				formType:formType,
				targetBranchId:targetBranchId,
				sourceBranchId:sourceBranchId,
				goodsSelectList:subArryAll
			}
		$.ajax({
			type: 'POST',
			data:JSON.stringify(paramsAll),
			url:url,
			contentType:"application/json",
			dataType:'json',
			success:function(data){
				//填充到table方法调用里面
				getImportData(data)
				//updateTableDataAll(data,tableid);
				$('.uatk').hide();
			},
			error: function(){
				//请求出错处理
				$.messager.alert('提示',"提交失败");
			}
		})
	}else{
		url=contextPath+url+"/importGoodsListsDeliver?";
		var params  = {
				formType:formType,
				targetBranchId:targetBranchId,
				sourceBranchId:sourceBranchId,
				skuCodes:subArry
			}
		$.ajax({
			type: 'POST',
			data:JSON.stringify(params),
			url:url,
			contentType:"application/json",
			dataType:'json',
			success:function(data){
				//填充到table方法调用里面
				getImportData(data)
				//updateTableDataAll(data,tableid);
				$('.uatk').hide();
			},
			error: function(){
				//请求出错处理
				$.messager.alert('提示',"提交失败");
			}
		})
	}

}


//导入  除开配送
function postelsx(tableid,url,cb){
	//begin bu lijy02 2016.9.12:
	//1.导入明细 0. 导入货号
	if(gVarImportType=="1"){
		var branchIds=$("#branchId").val();
		url=contextPath+url+"/importGoodsLists?branchIds="+branchIds;
		 $.ajax({
		        type: 'POST',
		        data:JSON.stringify(subArryAll),
		        url:url,
		        contentType:"application/json",
		        dataType:'json',
		        success:function(data){
		            //填充到table方法调用里面
                    getImportData(data)
		        	//updateTableDataAll(data,tableid);
		        	$('.uatk').hide();
		        },
		        error: function(){
		            //请求出错处理
		        	$.messager.alert('提示',"提交失败"); 
		        }
		 })
	}else{
		url=contextPath+url+"/importSkuCode?skuCodes="+subArry;
		 $.ajax({
		        type: 'POST',
		        url:url,
		        success:function(data){
		            //填充到table方法调用里面
		        	//updateTableData(data,tableid)
		        	 getImportData(data)
		        	//$.messager.alert('提示',"提交成功"); 
		        	$('.uatk').hide();
		        },
		        error: function(){
		            //请求出错处理
		        	$.messager.alert('提示',"提交失败"); 
		        }
		 })
	}
}
function serizeObjSku(data){
	var ObjList = [];
	var fieldsArr = [];
	var tempJson = JSON.parse(data);//字符串转化成对象
	var datagridId = gridHandel.getGridName();
	var opts = $('#'+datagridId).datagrid('getColumnFields');
	//获取表格里面的filed
	$.each(opts,function(i,item){
		var fields = $('#'+datagridId).datagrid("getColumnOption",item);//获取filed
		if(fields.field=="skuCode"){
			fieldsArr.push({"field":fields.field,"fieldTitle":fields.title});//push
		}


	});
	console.log("fieldsArr",fieldsArr);
	console.log("tempJson",tempJson);

	//把excel读取的数据遍历
	if(tempJson.Sheet0){
		tempJson.Sheet0.forEach(function(elt,index){
			var obj = {};
			//遍历fieldsArr
			$.each(fieldsArr,function(i,item){
				//item.field替换excel的中文字
				obj[item.field] = elt[item.fieldTitle];
			})
			console.log("obj",obj);
			ObjList.push(obj);
		});
	}
	if(tempJson.Sheet1){
		tempJson.Sheet1.forEach(function(elt,index){
			var obj = {};
			//遍历fieldsArr
			$.each(fieldsArr,function(i,item){
				//item.field替换excel的中文字
				obj[item.field] = elt[item.fieldTitle];
			})
			console.log("obj",obj);
			ObjList.push(obj);
		});
	}

	return ObjList;
}
function serizeObjAll(data){
	var ObjList = [];
    var fieldsArr = [];
    var tempJson = JSON.parse(data);//字符串转化成对象
    var datagridId = gridHandel.getGridName();
    var opts = $('#'+datagridId).datagrid('getColumnFields');
    //获取表格里面的filed
	$.each(opts,function(i,item){
		var fields = $('#'+datagridId).datagrid("getColumnOption",item);//获取filed
		fieldsArr.push({"field":fields.field,"fieldTitle":fields.title});//push
		
	});
	console.log("fieldsArr",fieldsArr);
	console.log("tempJson",tempJson);
	
	//把excel读取的数据遍历
	if(tempJson.Sheet0){
		tempJson.Sheet0.forEach(function(elt,index){
	    	var obj = {};
	    	 //遍历fieldsArr
	    	$.each(fieldsArr,function(i,item){
	    	//item.field替换excel的中文字
	    	obj[item.field] = elt[item.fieldTitle];
	    	})
	    	console.log("obj",obj);
	    	ObjList.push(obj);
	    });	   
	}
	if(tempJson.Sheet1){
		tempJson.Sheet1.forEach(function(elt,index){
	    	var obj = {};
	    	 //遍历fieldsArr
	    	$.each(fieldsArr,function(i,item){
	    	//item.field替换excel的中文字
	    	obj[item.field] = elt[item.fieldTitle];
	    	})
	    	console.log("obj",obj);
	    	ObjList.push(obj);
	    });	  
	}
  
    return ObjList;
}

//返回的数据 填充到table里面
function updateTables(data,id){
	// 获取选中行的Index的值
	var rowIndex = -1;
	$.each(data,function(i,val){
		data[i]["printCount"] = 1;
		data[i]["promotionPrice"]=data[i]["salePrice"];
	})

	 $("#"+id).datagrid('loadData',data);
}
var gridDefault = {
	oldPurPrice:0.00,
	
}

var xlf = document.getElementById('xlf');
function handleFile(e) {
    var files = e.target.files;
   if(files.length!=0){
	   var value=$(this).val();
	    $('#filename').val(value);
	    var f = files[0];
	    {
	        var reader = new FileReader();
	        var name = f.name;
	        reader.onload = function(e) {
	            if(typeof console !== 'undefined');
	            var data = e.target.result;
	            xw(data, process_wb);
	           
	        };
	        reader.readAsBinaryString(f);
	    }
   }
   
}
//$("#xlf").live("click",handleFile);
$(document).on('change','#xlf', handleFile); 
//导入
function importHandel(talbeId){
	postelsx(talbeId,'/goods/goodsSelect');
}
