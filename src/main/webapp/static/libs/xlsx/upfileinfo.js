/**
 * Created by wangxl01 on 2016/8/22.
 */
var X = XLSX;
var XW = {
    /* worker message */
    msg: 'xlsx',
    /* worker scripts */
    rABS: contextPath+'/static/libs/xlsx/xlsxworker.js',
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

function process_wb(wb) {
    var output = JSON.stringify(to_json(wb), 2, 2);
    console.log(output);
    if(typeof output !== 'undefined'){
        subArry = serizeObj(output);
    }
}

function serizeObj(data){
	var ObjList = [];
    var fieldsArr = [];
    var tempJson = JSON.parse(data);//字符串转化成对象
    var opts = $('#'+datagridId).datagrid('getColumnFields');
    //获取表格里面的filed
	$.each(opts,function(i,item){
		var fields = $('#'+datagridId).datagrid("getColumnOption",item);//获取filed
		fieldsArr.push({"field":fields.field,"fieldTitle":fields.title});//push
		
	});
	console.log("fieldsArr",fieldsArr);
	  //把excel读取的数据遍历
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
    return ObjList;
}
//返回的数据 填充到table里面
function updateTables(id){
	  console.log(subArry);
	 var da = $("#"+id).datagrid('getData');
	 da.rows = subArry;
	 $("#"+id).datagrid('loadData',da);
}

var xlf = document.getElementById('xlf');
function handleFile(e) {
    var files = e.target.files;
    var value=$(this).val();
    $('#filelink').val(value);
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
$(document).on('change','#xlf', handleFile) 
