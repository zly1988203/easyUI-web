/**
 * Created by huangj02 on 2016/8/5.
 */
//日期控件
function myformatter(date){
    var y = date.getFullYear();
    var m = date.getMonth()+1;
    var d = date.getDate();
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}
function myparser(s){
    if (!s) return new Date();
    var ss = (s.split('-'));
    var y = parseInt(ss[0],10);
    var m = parseInt(ss[1],10);
    var d = parseInt(ss[2],10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
        return new Date(y,m-1,d);
    } else {
        return new Date();
    }
}
/**
 * 动态编辑表格数据转换
 * 可编辑的表格提交时，转换数组成键值对对象，方便后台对接与验证
 * @param list 数据对象
 * @param listName 与后台接口对应的参数名称
 * @returns {___anonymous624_625}
 */
function tableArrayFormatter(list,listName){
	var result={};
	listName = listName ? listName : 'list';
	if(list && list.length){
		for(var i=0;i<list.length;i++){
			var obj = list[i];
			for(var attr in obj){
				var resultAttrName = listName + "[" + i + "]." + attr ;
				result[resultAttrName] = obj[attr];
			}
		}
		return result;
	}
}

/**
 * Created by xiaoj02 on 2016/08/15.
 */
$.fn.serializeObject=function(){  
    var serializeObj={};  
    var array=this.serializeArray();  
    $(array).each(function(){  
        if(serializeObj[this.name]){  
            if($.isArray(serializeObj[this.name])){  
                serializeObj[this.name].push(this.value);  
            }else{  
                serializeObj[this.name]=[serializeObj[this.name],this.value];  
            }  
        }else{  
            serializeObj[this.name]=this.value;   
        }  
    });  
    return serializeObj;  
};

/**
 * Created by zhanghuan on 2016/08/10.
 * 日期范围工具类
 */
var dateUtil = {
    /**
     * 添加开始时间
     */
    addStartTime:function(date){
        var result = new Date(date);
        var newResult = result.getFullYear() + "-" + this.parseDate(result.getMonth() + 1) + "-" + this.parseDate(result.getDate())+" 00:00";
        return new Date(newResult);
    },
    /**
     * 添加开始时间
     */
    addEndTime:function(date){
        var result = new Date(date);
        var newResult = result.getFullYear() + "-" + this.parseDate(result.getMonth() + 1) + "-" + this.parseDate(result.getDate())+" 23:59";
        return new Date(newResult);
    },
    /**
     * 获取系统当前时间
     * @returns {Date}
     */
    getCurrentDate:function () {
        return new Date();
    },
    getCurrentDateTime:function () {
    	 var result = new Date();
         var newResult = result.getFullYear() + "-" + this.parseDate(result.getMonth() + 1) + "-" + this.parseDate(result.getDate())+" 16:00";
         return new Date(newResult);
    },
    /**
     * 获取系统当前时间显示值，默认格式yyyy-MM-dd
     * @returns {string}
     */
    getCurrentDateStr:function (fmt) {
    	
    	//默认时间格式化
    	if(!fmt){
    		fmt = "yyyy-MM-dd hh:mm";
    	}
    	var d = this.getCurrentDate();
    	return dateUtil.addEndTime(d).format(fmt);
    },
    
    /**
     * 获取系统当前时间显示值，默认格式yyyy-MM-dd
     * @returns {string}
     */
    getCurrentDateDay:function (fmt) {
    	
    	//默认时间格式化
    	if(!fmt){
    		fmt = "yyyy-MM-dd";
    	}
    	var d = this.getCurrentDate();
    	return dateUtil.addEndTime(d).format(fmt);
    },
    
    /**
     * 获取当前日期前面几天或者后面几天
     * @returns {string}
     */
    getCurrDayPreOrNextDay:function(flag,dayParamater){
        var d = this.getCurrentDate();
        if(flag == "prev"){  //前面几天
            //当前日期的毫秒数 - 天数 * 一天的毫秒数
            var n = d.getTime() - dayParamater * 24 * 60 * 60 * 1000;
        }else if(flag == "next"){  //后面几天
            //当前日期的毫秒数 + 天数 * 一天的毫秒数
            var n = d.getTime() + dayParamater * 24 * 60 * 60 * 1000;
        }
        var result = new Date(n);
        return result.getFullYear() + "-" + this.parseDate(result.getMonth() + 1) + "-" + this.parseDate(result.getDate());
    },
    
    /**
     * 获取上一个月
     * @returns {Date}
     */
    getPreMonthDate:function(){
    	var d = this.getCurrentDate();
    	d.setMonth(d.getMonth()-1);
    	d.setDate(d.getDate()+1);
    	return d;
    },
    
    /**
     * 获取当前日期前面几天或者后面几天，默认格式yyyy-MM-dd
     * @returns {String}
     */
    getPreMonthDateStr:function(fmt){
    	//默认时间格式化
    	if(!fmt){
    		fmt = "yyyy-MM-dd hh:mm";
    	}
    	var d = this.getPreMonthDate();
    	return dateUtil.addStartTime(d).format(fmt);
    },
    
    /***
     * 获得本周起止时间
     */
    getCurrentWeek:function () {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //返回date是一周中的某一天
        var week = currentDate.getDay();
        //返回date是一个月中的某一天
        var month = currentDate.getDate();

        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数
        var minusDay = week != 0 ? week - 1 : 6;
        //alert(minusDay);
        //本周 周一
        var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
        //本周 周日
        var sunday = new Date(monday.getTime() + (6 * millisecond));
        //添加本周时间
        startStop.push(monday); //本周起始时间
        //添加本周最后一天时间
        startStop.push(sunday); //本周终止时间
        //返回
        return startStop;
    },
    /**
     * 获得上一周的起止日期
     * **/
    getPreviousWeek:function () {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //返回date是一周中的某一天
        var week = currentDate.getDay();
        //返回date是一个月中的某一天
        var month = currentDate.getDate();
        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数
        var minusDay = week != 0 ? week - 1 : 6;
        //获得当前周的第一天
        var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));
        //上周最后一天即本周开始的前一天
        var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);
        //上周的第一天
        var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));

        //添加至数组
        startStop.push(priorWeekFirstDay);
        startStop.push(priorWeekLastDay);

        return startStop;
    },
    /***
     * 获得本月的起止时间
     */
    getCurrentMonth:function () {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //求出本月第一天
        var firstDay = new Date(currentYear, currentMonth, 1);


        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (currentMonth == 11) {
            currentYear++;
            currentMonth = 0; //就为
        } else {
            //否则只是月份增加,以便求的下一月的第一天
            currentMonth++;
        }

        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
        //求出上月的最后一天
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

        //添加至数组中返回
        startStop.push(firstDay);
        startStop.push(lastDay);
        //返回
        return startStop;
    },
    /**
     * 返回上一个月的第一天Date类型
     * @param year 年
     * @param month 月
     **/
    getPriorMonthFirstDay:function (year, month) {
        //年份为0代表,是本年的第一月,所以不能减
        if (month == 0) {
            month = 11; //月份为上年的最后月份
            year--; //年份减1
            return new Date(year, month, 1);
        }
        //否则,只减去月份
        month--;
        return new Date(year, month, 1); ;
    },
    /**
     * 获得上一月的起止日期
     * ***/
    getPreviousMonth:function () {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //获得上一个月的第一天
        var priorMonthFirstDay = this.getPriorMonthFirstDay(currentYear, currentMonth);
        //获得上一月的最后一天
        var priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), this.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()));
        //添加至数组
        startStop.push(priorMonthFirstDay);
        startStop.push(priorMonthLastDay);
        //返回
        return startStop;
    },
    /**
     * 获得该月的天数
     * @param year年份
     * @param month月份
     * */
    getMonthDays:function (year, month) {
        //本月第一天 1-31
        var relativeDate = new Date(year, month, 1);
        //获得当前月份0-11
        var relativeMonth = relativeDate.getMonth();
        //获得当前年份4位年
        var relativeYear = relativeDate.getFullYear();

        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (relativeMonth == 11) {
            relativeYear++;
            relativeMonth = 0;
        } else {
            //否则只是月份增加,以便求的下一月的第一天
            relativeMonth++;
        }
        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
        //返回得到上月的最后一天,也就是本月总天数
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
    },
    /**
     * 得到本季度开始的月份
     * @param month 需要计算的月份
     ***/
    getQuarterSeasonStartMonth:function (month) {
        var quarterMonthStart = 0;
        var spring = 0; //春
        var summer = 3; //夏
        var fall = 6;   //秋
        var winter = 9; //冬
        //月份从0-11
        if (month < 3) {
            return spring;
        }

        if (month < 6) {
            return summer;
        }

        if (month < 9) {
            return fall;
        }

        return winter;
    },
    /**
     * 获得本季度的起止日期
     */
    getCurrentSeason:function () {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //获得本季度开始月份
        var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);
        //获得本季度结束月份
        var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;

        //获得本季度开始的日期
        var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
        //获得本季度结束的日期
        var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth));
        //加入数组返回
        startStop.push(quarterSeasonStartDate);
        startStop.push(quarterSeasonEndDate);
        //返回
        return startStop;
    },
    /**
     * 得到上季度的起始日期
     * year 这个年应该是运算后得到的当前本季度的年份
     * month 这个应该是运算后得到的当前季度的开始月份
     * */
    getPriorSeasonFirstDay:function (year, month) {
        var quarterMonthStart = 0;
        var spring = 0; //春 0,1,2
        var summer = 3; //夏 3,4,5
        var fall = 6;   //秋 6,7,8
        var winter = 9; //冬 9,10,11
        //月份从0-11
        switch (month) {//季度的其实月份
            case 0:
            case 1:
            case 2:
                //如果是第一季度则应该到去年的冬季
                year--;
                month = winter;
                break;
            case 3:
            case 4:
            case 5:
                month = spring;
                break;
            case 6:
            case 7:
            case 8:
                month = summer;
                break;
            case 9:
            case 10:
            case 11:
                month = fall;
                break;

        };

        return new Date(year, month, 1);
    },
    /**
     * 得到上季度的起止日期
     * **/
    getPreviousSeason:function(){
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //上季度的第一天
        var priorSeasonFirstDay = this.getPriorSeasonFirstDay(currentYear, currentMonth);
        //上季度的最后一天
        var priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() +2, this.getMonthDays(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() +2));
        //添加至数组
        startStop.push(priorSeasonFirstDay);
        startStop.push(priorSeasonLastDay);
        return startStop;
    },
    /***
     * 得到本年的起止日期
     *
     */
    getCurrentYear:function () {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();

        //本年第一天
        var currentYearFirstDate = new Date(currentYear, 0, 1);
        //本年最后一天
        var currentYearLastDate = new Date(currentYear, 11, 31);
        //添加至数组
        startStop.push(currentYearFirstDate);
        startStop.push(currentYearLastDate);
        //返回
        return startStop;
    },
    /**
     * //如果数据小于10.加一个0
     * @param date
     * @returns {*}
     */
    parseDate:function(date) {
        if (date < 10) {
            date = '0' + date;
        }
        return date;
    },

    compareDate:function (startDate,endDate) {
        var d1 = new Date(startDate.replace(/\-/g, "\/"));
        var d2 = new Date(endDate.replace(/\-/g, "\/"));

        if(startDate!=""&&endDate!=""&&d1 >=d2)
        {
            return true;
        }
        return false;
    }

}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
/*
 调用：
 var time1 = new Date().format("yyyy-MM-dd");
 var time2 = new Date().format("yyyy-MM-dd HH:mm:ss");
 */
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//两种调用方式
//var template1="我是{0}，今年{1}了";
//var template2="我是{name}，今年{age}了";
//var result1=template1.format("loogn",22);
//var result2=template2.format({name:"loogn",age:22});
//两个结果都是"我是loogn，今年22了"
//字符串格式化
String.prototype.format = function(args) {
  var result = this;
  if (arguments.length > 0) {    
      if (arguments.length == 1 && typeof (args) == "object") {
          for (var key in args) {
              if(args[key]!=undefined){
                  var reg = new RegExp("({" + key + "})", "g");
                  result = result.replace(reg, args[key]);
              }
          }
      }
      else {
          for (var i = 0; i < arguments.length; i++) {
              if (arguments[i] != undefined) {
                  var reg = new RegExp("({[" + i + "]})", "g");
                  result = result.replace(reg, arguments[i]);
              }
          }
      }
  }
  return result;
}

String.prototype.startWith=function(str){     
  var reg=new RegExp("^"+str);     
  return reg.test(this);        
}  

String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
}

/**
* 是否选择行数据
*/
function rowIsNull(row) {
	if (row) {
		return false;
	} else {
		$.messager.show({
			title : "提示",
			msg : "请选择行数据！",
			position : "topCenter",
			timeout : 1500,
			showType : 'slide',
          style:{
      		right:'',
      		top:document.body.scrollTop+document.documentElement.scrollTop+50,
      		bottom:''
      	}
		});
		return true;
	}
}


/**
* ajax返回提示
* @param data    返回的数据
* @param dg datagrid
* @param d    弹窗
* @returns {Boolean} ajax是否成功
*/
function successTip(data, dg, d) {
  if (data == 'success') {
      $.messager.show({
          title: "提示",
          msg: "操作成功！",
          position: "topCenter",
          timeout: 1500,
          showType: 'show',
          style:{
      		right:'',
      		top:document.body.scrollTop+document.documentElement.scrollTop+50,
      		bottom:''
      	}
      });
      if (dg != null) {
          dg.datagrid('reload');
      }
      if (d != null) {
          d.panel('close');
      }
      return true;
  } else {
      $.messager.show({
          title: "提示",
          msg: data,
          position: "topCenter",
          timeout: 1500,
          showType: 'slide',
          style:{
      		right:'',
      		top:document.body.scrollTop+document.documentElement.scrollTop+50,
      		bottom:''
      	}
      });
      return false;
  }
}

/**
 * 弹出框
 * @param data 提示信息
 * @param refreshDgMethod 刷新datagrid方法名称
 * @param closeDMethod 关闭窗口方法名称
 * @returns {Boolean}
 */
function alertTip(data, refreshDgMethod, closeDMethod) {
	  if (data == 'success') {
	      $.messager.show({
	          title: "提示",
	          msg: "操作成功！",
	          position: "topCenter",
	          timeout: 1500,
	          showType: 'show',
	          style:{
	      		right:'',
	      		top:document.body.scrollTop+document.documentElement.scrollTop+50,
	      		bottom:''
	      	}
	      });
	      if (refreshDgMethod) {
	    	  refreshDgMethod();
	      }
	      if (closeDMethod) {
	    	  closeDMethod();
	      }
	      return true;
	  } else {
	      $.messager.show({
	          title: "提示",
	          msg: data,
	          position: "topCenter",
	          timeout: 1500,
	          showType: 'slide',
	          style:{
	      		right:'',
	      		top:document.body.scrollTop+document.documentElement.scrollTop+50,
	      		bottom:''
	      	}
	      });
	      return false;
	  }
	}

/**
* ajax返回提示
* @param data    返回的数据
* @param dg datagrid
* @param d    弹窗
* @returns {Boolean} ajax是否成功
*/
function successTipExt(data, dg, d) {
  if (data.status == '0') {
      $.messager.show({
          title: "提示",
          msg: "操作成功！",
          position: "topCenter",
          timeout: 1500,
          showType: 'slide'
      });
      if (dg != null) {
          dg.datagrid('reload');
      }
      if (d != null) {
          d.panel('close');
      }
      return true;
  } else {
      $.messager.alert("提示", data.message);
      return false;
  }
}


/**
* ajax返回提示
* @param data    返回的数据
* @param dg datagrid
* @param d    弹窗
* @returns {Boolean} ajax是否成功
*/
function showMsgExt(data, dg, d) {
  if (data.status == 0) {
      $.messager.show({
          title: "提示",
          msg: data.msg,
          position: "topCenter",
          timeout: 1500,
          showType: 'slide',
          style:{
      		right:'',
      		top:document.body.scrollTop+document.documentElement.scrollTop+50,
      		bottom:''
      	}
      });
      if (dg != null) {
          dg.datagrid('reload');
      }
      if (d != null) {
          d.panel('close');
      }
      return true;
  } else {
      $.messager.alert("提示", data.msg,"error");
      return false;
  }
}

/**
* ajax返回提示
* @param data    返回的数据
* @param  datagrid id
* @param d 弹窗id
* @returns {Boolean} ajax是否成功
*/
function successTipTwo(data, dg, d) {
  if (data == 'success') {
      if (dg != null)
          $(dg).datagrid('reload');
      if (d != null)
          $(d).panel('close');
      $.messager.show({
          title: "提示",
          msg: "操作成功！",
          position: "topCenter",
          timeout: 1500,
          showType: 'slide'
      });
      return true;
  } else {
      $.messager.show({
          title: "提示",
          msg: data,
          position: "topCenter",
          timeout: 1500,
          showType: 'slide'
      });
      return false;
  }
}

/**
* 提写公共的show方法
*
* @param title 标题
* @param icon 图标 info error 默认info
* @param msg 消息
* @param position 显示位置 默认topCenter
* @author wangfan 2015.07.28
*/
function psmaMessageShowFour(title, icon, msg, position) {
  $.messager.show({
      title: title,
      icon: icon,
      msg: msg,
      position: position,
      timeout: 1500,
      showType: 'slide'
  });
}
/**
* 提写公共的show方法
*
* @param msg 消息
* @author wangfan 2015.07.28
*/
function psmaMessageShowOne(msg) {
  $.messager.show({
      title: "提示",
      msg: msg,
      position: "topCenter",
      timeout: 1500,
      showType: 'slide'
  });
}
/**
* 提写公共的show方法
*
* @param title 标题
* @param msg 消息
* @author wangfan 2015.07.28
*/
function psmaMessageShowTwo(title, msg) {
  $.messager.show({
      title: title,
      msg: msg,
      position: "topCenter",
      timeout: 1500,
      showType: 'slide'
  });
}
/**
* 提写公共的show方法
*
* @param title 标题
* @param msg 消息
* @param position 显示位置
* @author wangfan 2015.07.28
*/
function psmaMessageShowThree(title, msg, position) {
  $.messager.show({
      title: title,
      msg: msg,
      position: position,
      timeout: 1500,
      showType: 'slide'
  });
}

$.fn.serializeObject=function(){  
  var serializeObj={};  
  var array=this.serializeArray();  
  var str=this.serialize();  
  $(array).each(function(){  
      if(serializeObj[this.name]){  
          if($.isArray(serializeObj[this.name])){  
              serializeObj[this.name].push(this.value);  
          }else{  
              serializeObj[this.name]=[serializeObj[this.name],this.value];  
          }  
      }else{  
          serializeObj[this.name]=this.value;   
      }  
  });  
  return serializeObj;  
};

//frame元素新增tab页
function addTabForTop(subtitle, url){
	window.top.addTab(subtitle, url, null);
}

//frame元素新增tab页
function addTabForTop(subtitle, url, icon){
	window.top.addTab(subtitle, url, icon);
}

//根据标题选择tab页
function selectTab(subtitle){
	window.top.selectTab(subtitle);
}

//frame元素刷新tab页
function refreshTabForTop(subtitle){
	window.top.refluseTabByTitle(subtitle);
}

//刷新当前tab
function refreshCurrTab(){
	$('#mm-tabupdate').click();
}

//关闭tab页
function closeCurrTab(){
	window.top.closeTab();
}

//获取tab页
function getTab(subtitle){
	return window.top.getTabByTitle(subtitle);
}

//子页面处理刷新父页面列表,关闭子页面
function refreshParentTab(parentTitle, currTitle){
	var parentTab = getTab(parentTitle);
	selectTab(parentTitle);
	var parentFrame = parentTab.find('iframe')[0].contentWindow
	parentFrame.refreshDataGrid();
	if(currTitle){
		window.top.closeTab(currTitle);
	}
};

//扩展jQuery easyui datagrid增加动态改变列编辑的类型
$.extend($.fn.datagrid.methods, {
    addEditor : function(jq, param) {
        if (param instanceof Array) {
            $.each(param, function(index, item) {
                var e = $(jq).datagrid('getColumnOption', item.field);
                e.editor = item.editor;
            });
        } else {
            var e = $(jq).datagrid('getColumnOption', param.field);
            e.editor = param.editor;
        }
    },
    removeEditor : function(jq, param) {
        if (param instanceof Array) {
            $.each(param, function(index, item) {
                var e = $(jq).datagrid('getColumnOption', item);
                e.editor = {};
            });
        } else {
            var e = $(jq).datagrid('getColumnOption', param);
            e.editor = {};
        }
    }
}); 

/**
 * 获取链接参数
 * @param name
 * @returns {*}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function isEmptyArray(array) {
	if(array && array.length >= 0){
		return false;
	}
	return true;
}

/**
 * 保留两位小数
 * @param decimal
 * @returns
 */
function formatTwoDecimal(decimal){
	if(decimal !== null && decimal !== '' && decimal !== undefined && !isNaN(decimal)){
		return parseFloat(decimal).toFixed(2);
	}
	return decimal;
}

function getTwoDecimalB(decimal){
	if(decimal == null || decimal == '' || decimal == undefined){
		return null;
	}
	return '<b>'+formatTwoDecimal(decimal)+'</b>';
}

/**
 * 格式化日期，返回格式化后的字符串
 * @param dateValue Date值
 * @param pattern 格式，默认为 yyyy-MM-dd hh:mm:ss
 * @returns
 */
function formatDate(dateValue, pattern){
	if(!pattern){
		pattern = 'yyyy-MM-dd hh:mm:ss';
	}
	if(dateValue){
		return new Date(dateValue).format(pattern);
	}
	return dateValue;
}
/**
 * 日期月份选择
 * @param dateValue Month值
 * @param pattern 格式，默认为 yyyy-MM
 * @returns
 */
function selectMonth(){  
    WdatePicker({ dateFmt:'yyyy-MM', isShowToday: false, isShowClear: false });  
}  



/*----------------jxc util  ---------------------------*/

var $_jxc = {
	
	/**
	 * bwp 07/05/24
	 * alert 提示组件
	 * @param msg   提示信息
	 * @param title 提示标题 可以不传
	 * @param cb    回调 可以不传
	 * @returns
	 * demo: $_jxc.alert('处理失败',function(){})
	 */
	alert:function(msg,cb,title,icon){
		$.messager.alert(title||'提示',msg,icon||"info",function(){
			if (typeof cb == 'function') {
		    	cb();
            }
		});
	},
	/**
	 * bwp 07/05/26
	 * confirm 提示组件
	 * @param msg   提示信息
	 * @param cb    回调事件
	 * @param title 提示标题 可以不传
	 * @returns
	 * demo: $_jxc.confirm('是否删除？',function(r){
	 * 	    	if(r){
	 * 				alert('您选择了确认')	
	 * 			}
	 * 		})
	 */
	confirm:function(msg,cb,title){
		$.messager.confirm(title||'确认',msg||'',function(r){    
		    if (typeof cb == 'function') {
		    	cb(r);
            }
		});  
	},
	
	/**
	 * bwp 07/05/26
	 * 对ajax请求做了封装，统一项目的ajax请求。
	 * @namespace jQuery扩展封装
	 * @param params 对ajax变动频繁的参数 以对象方式入参 {url:'abc',type:'POST',dataType:'json'}
	 * @param {successCb} 成功回调 必传 
	 * @param {errorCb} 错误回调 不传的话安装默认方式处理
	 * demo:
	 * $_jxc.ajax({
	    	url:contextPath + '/settle/supplierChain'
	    },function(result){
	    	
	    },function(err){
	    	
	    })
	 */
	ajax:function(params, successCb, errorCb,$btns){
		gFunStartLoading();
		if ($btns){
			$btns.forEach(function(btnObj,index){
				$(btnObj).prop("disabled","disabled");
			})
        }
		//ajax参数
		var defaultParams = {
            type: 'POST',
            dataType: 'JSON',
		}
		
		defaultParams = $.extend(defaultParams,params);
		
		//成功回调
		defaultParams['success'] = function(result){
			gFunEndLoading();
			if ($btns){
    			$btns.forEach(function(btnObj,index){
    				$(btnObj).removeProp("disabled");
    			})
            }
			if (typeof successCb == 'function') {
				successCb(result);
            }
		}
		//错误回调
		defaultParams['error'] = function(err){
			gFunEndLoading();
			if ($btns){
    			$btns.forEach(function(btnObj,index){
    				$(btnObj).removeProp("disabled");
    			})
            }
			if (typeof errorCb == 'function') {
				errorCb(err);
            }else{
            	$_jxc.alert("请求发送失败或服务器处理失败");
            }
		}
		
		//异步之前
		defaultParams['beforeSend'] = function(XHR){
			var sts = new Date().getTime();
            //url = url ? (url.indexOf('?')>-1 ? url + '&_t='+ sts : url + '?_t='+sts):url
		}
		defaultParams['complete'] = function() {
            // Handle the complete event
        }
		
		$.ajax(defaultParams);
	},

	isStringNull:function (str) {
        if(!str) return true;
        if(str.trim() == "") return true;
        if (str.length == 0) return true;
        if (str.replace(/(^s*)|(s*$)/g, "").length ==0) return true;
	},
	
	/**
	 * bwp 07/06/05
	 * 对可输入的 机构 供应商 或者制单人这类可以输入又可以弹窗选择的输入表单 编辑表单时选择处理情况hidden表单的值
	 * 例如 [0001]默认供应商 注：表单dom 父元素加一个 .form-group class样式以确定作用范围
	 * @namespace 编辑表单时选择处理情况hidden表单的值 
	 * @param obj 表单对象
	 * @param domIds 而外要处理的 dom元素id值
	 * demo1:
	 * <div class='ub ub-ac'>
	 * <input class='uinp ub ub-f1' type='text' id='branchName' name='branchName' onblur='$_jxc.clearIdOnEdit(this)'/>
	 * </div>
	 * demo2:
	 * <div class='ub ub-ac .form-group'>
	 * 	<div class='ub'>
	 * 		<input class='uinp ub ub-f1' type='text' id='branchName' name='branchName' onblur='$_jxc.clearIdOnEdit(this)'/>
	 * 	</div>
	 * </div>
	 */
	clearIdOnEdit:function(obj,domIds){
		var _domValue = $(obj).val();
		//如果修改名称
		if(!_domValue || (_domValue && _domValue.indexOf("[")<0 && _domValue.indexOf("]")<0)){
			//父元素
			var _editGroup = $(obj).closest('.form-group');
			if(_editGroup.length < 1){
				_editGroup = $(obj).parent('.ub');
			}
			//隐藏域表单
			$(_editGroup).find('input[type="hidden"]').each(function(index,elt){
				if($(elt)){
					$(elt).val('');
				}
			});
		}
	}
	
	
}
