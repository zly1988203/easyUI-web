//区分时段销售分析 货类销售分析
var serviceType;
var datagridId = 'saleReportList';
$(function(){
	//开始和结束时间
    $("#yearStr").val(dateUtil.getCurrentDate().format("yyyy"));
    serviceType = $('#serviceType').val(); 
    //时段销售分析
    if(serviceType == 'timeSale'){
    	initDataTimeSaleReport();
    }else{
    	datagridId = 'saleCateReportList';
    	//货类销售分析
    	initDataCateSaleReport();
    }
    
    $('#branchSelect').branchSelect();
});

var gridHandel = new GridClass();
var dgc;
function initDataTimeSaleReport(){
	dgc = $("#"+datagridId).datagrid({
        method:'post',
        align:'right',
        singleSelect:false,  //单选  false多选
        pagination:true,    //分页
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
			{field:'bizType',title:'项目',width: 90,align:'center',rowspan:2},
			{field:'classesStr',title:'时段',width: '200px',align:'center',rowspan:2},
			{field:'avgSale',title:'月均销售',width: 90,align:'right',rowspan:2,
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field:'curYearSale',title:'当年销售情况',width: 90,align:'center',colspan:12},
			{field:'lasYearSale',title:'上年销售情况',width: 90,align:'center',colspan:12}
			]
           ,[
            {field:'thisOne',title:'1月',width: 90,align:'right',
           	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
           },
           {field:'thisTwo',title:'2月',width: 90,align:'right',
           	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
           },
           {field:'thisThree',title:'3月',width: 90,align:'right',
           	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
           },
           {field:'thisFour',title:'4月',width: 90,align:'right',
           	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
           },
           {field:'thisFive',title:'5月',width: 90,align:'right',
           	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
           },
           {field:'thisSix',title:'6月',width: 90,align:'right',
           	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
           },
           {field:'thisSever',title:'7月',width: 90,align:'right',
           	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
           },
           {field:'thisEight',title:'8月',width: 90,align:'right',
           	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
           },
           {field:'thisNine',title:'9月',width: 90,align:'right',
           	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
           },
           {field:'thisTen',title:'10月',width: 90,align:'right',
           	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
           },
           {field:'thisEleven',title:'11月',width: 90,align:'right',
           	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
           },
           {field:'thisTwelve',title:'12月',width: 90,align:'right',
           	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
           },
            {field:'lastOne',title:'1月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'lastTwo',title:'2月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'lastThree',title:'3月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'lastFour',title:'4月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'lastFive',title:'5月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'lastSix',title:'6月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'lastSever',title:'7月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'lastEight',title:'8月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'lastNine',title:'9月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'lastTen',title:'10月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'lastEleven',title:'11月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            },
            {field:'lastTwelve',title:'12月',width: 90,align:'right',
            	formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
            }
        ]],
        onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
            //合并单元格
            var merges = getMergesData(data.rows);
			for(var i=0; i<merges.length; i++){
				$(this).datagrid('mergeCells',{
					index: merges[i].index,
					field: 'bizType',
					rowspan: merges[i].rowspan
				});
			}
        }       
    });
}

//合并表格操作
function getMergesData(sc_data){
    var ne_data = []; //目标数组
    var no_Num = 0;  //游标
    var _currentObj; //当前统计小项 用于小小项合计
    console.time('s');
    if(sc_data.length > 0){
        sc_data.forEach(function(obj,ind){
            operateInData(obj);
        })
    }
    function operateInData(arg){
        var ne_item = {};
        if(ne_data.length <= 0){
            //跨行
            ne_item = {
                index:0,
                groupType:arg.groupType,
                rowspan:1
            };
            ne_data.push(ne_item);
            _currentObj = ne_item;
            return ;
        }

        //统计项
        
        var _flag = false; //标识符
        ne_data.forEach(function(obc,inc){
            if(obc.groupType === arg.groupType){
                _flag = true;
                obc.rowspan++; //跨行累计
                no_Num++;      //游标累计
            }
        });

        if(!_flag){
            //下一个统计项
            var nne_item = {
                index:++no_Num,
                groupType:arg.groupType,
                rowspan:1
            };
            _currentObj = nne_item;
            ne_data.push(nne_item);
        }
    }
    console.timeEnd('s');
    console.log(JSON.stringify(ne_data));
    return ne_data;
}

var gridHandelCat = new GridClass();
var dg;
//初始化表格
function initDataCateSaleReport(){
	gridHandelCat.setGridName(datagridId);
	dg = $("#"+datagridId).datagrid({
        align:'right',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
		columns:[[
			{field:'bizType',title:'类别编码',width: 90,align:'center',rowspan:2},
			{field:'classesStr',title:'类别名称',width: 100,align:'left',rowspan:2},
			{field:'monthAvgSale',title:'月均销售',width: 90,align:'right',rowspan:2,
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
				}
			},
			{field:'curSaleStr',title:'当年销售情况',width: 90,align:'center',colspan:12},
			{field:'lastSaleStr',title:'上年销售情况',width: 90,align:'center',colspan:12}
        ],[ 
             {field:'thisOne',title:'1月',width: 90,align:'right',
              	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
              },
              {field:'thisTwo',title:'2月',width: 90,align:'right',
              	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
              },
              {field:'thisThree',title:'3月',width: 90,align:'right',
              	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
              },
              {field:'thisFour',title:'4月',width: 90,align:'right',
              	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
              },
              {field:'thisFive',title:'5月',width: 90,align:'right',
              	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
              },
              {field:'thisSix',title:'6月',width: 90,align:'right',
              	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
              },
              {field:'thisSever',title:'7月',width: 90,align:'right',
              	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
              },
              {field:'thisEight',title:'8月',width: 90,align:'right',
              	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
              },
              {field:'thisNine',title:'9月',width: 90,align:'right',
              	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
              },
              {field:'thisTen',title:'10月',width: 90,align:'right',
              	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
              },
              {field:'thisEleven',title:'11月',width: 90,align:'right',
              	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
              },
              {field:'thisTwelve',title:'12月',width: 90,align:'right',
              	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
              },
               {field:'lastOne',title:'1月',width: 90,align:'right',
               	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
               },
               {field:'lastTwo',title:'2月',width: 90,align:'right',
               	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
               },
               {field:'lastThree',title:'3月',width: 90,align:'right',
               	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
               },
               {field:'lastFour',title:'4月',width: 90,align:'right',
               	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
               },
               {field:'lastFive',title:'5月',width: 90,align:'right',
               	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
               },
               {field:'lastSix',title:'6月',width: 90,align:'right',
               	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
               },
               {field:'lastSever',title:'7月',width: 90,align:'right',
               	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
               },
               {field:'lastEight',title:'8月',width: 90,align:'right',
               	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
               },
               {field:'lastNine',title:'9月',width: 90,align:'right',
               	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
               },
               {field:'lastTen',title:'10月',width: 90,align:'right',
               	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
               },
               {field:'lastEleven',title:'11月',width: 90,align:'right',
               	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
               },
               {field:'lastTwelve',title:'12月',width: 90,align:'right',
               	formatter:function(value,row,index){
   					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
   				}
               }
        ]],
        onLoadSuccess:function(data){
        	gridHandelCat.setDatagridHeader("center");
        }       
    });
   // queryForm();
}
//查询入库单
function queryForm(){
	 if(!$.trim($("#branchName").val()||'')){
	    $_jxc.alert("请选择机构名称");
	    return;
	 } 
    $("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
	fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
	$("#"+datagridId).datagrid("options").method = "post";
	//时段
	if(serviceType == 'timeSale'){
		$("#"+datagridId).datagrid('options').url = contextPath + '/report/periodSaleContrast/list';
	}else{
		$("#"+datagridId).datagrid('options').url = contextPath + '/report/goodsSaleContrast/list';
	}
	$("#"+datagridId).datagrid('load', fromObjStr);
}

/**
 * 导出
 */
function exportExcel(){
	var fromObjStr = $('#queryForm').serializeObject();
	
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$_jxc.alert("导出数据成功！");
			}else{
				$_jxc.alert(JSON.parse(data).message);
			}
		}
	});
	var exportUrl;
	if(serviceType == 'timeSale'){
		exportUrl = contextPath+"/report/periodSaleContrast/exportList?"+fromObjStr;
	}else{
		exportUrl = contextPath+"/report/goodsSaleContrast/exportList?"+fromObjStr;
	}
	$("#queryForm").attr("action",exportUrl);
	$("#queryForm").submit();
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#saleTime").val(dateUtil.getCurrentDate().format("yyyy-MM"));
};