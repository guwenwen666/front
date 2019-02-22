
$(function(){
	//初始化尺寸
	resize();
	$(window).resize(function(){
		resize();
	});
	//初始化需要执行的方法
	init();
	//事件绑定
	eventBand();
	getAlaramInfo();
	setInterval('getAlaramInfo()', 60000);
});

function resize(){
	var  winWidth = $(window).width();//窗口宽度
	var  winHeight = $(window).height();//窗口高度
	$("#zdfsDiv").height(winHeight - 50 - 67);
}
var flag = 0;
var addType = "";
var updateType="";
var lastime;
function eventBand(){
	//新建
	$('#addBtn').on('click', function(e) {
		if(addType == ""){//新建
			flag ++;
			makeTimeConfig(flag);
			$("#deleteBtn").attr("disabled",true);
			$("#updateBtn").attr("disabled",true);
			$('#addBtn').val('保存');
			addType = 'save';
			$(".zdfsTable.selected").removeClass('selected');
		}else{
			//就是调用保存配置时间接口
			saveTime();
		}
	});
	//自动发送按钮
	$('.znjt-switchbox').on('click',function(e){
		if($('.znjt-switchbox').hasClass("znjt-switchbox-open")){
			$('.znjt-switchbox').removeClass("znjt-switchbox-open").addClass("znjt-switchbox-close");
			$("#addBtn").attr("disabled",false);
			$("#deleteBtn").attr("disabled",false);
			$("#updateBtn").attr("disabled",false);
			autoSend(false);
		}else{
			$('.znjt-switchbox').removeClass("znjt-switchbox-close").addClass("znjt-switchbox-open");
			$("#addBtn").attr("disabled",true);
			$("#deleteBtn").attr("disabled",true);
			$("#updateBtn").attr("disabled",true);
			//开启自动发送功能，给所有在线用户发送消息
			autoSend(true);
		}
	});
	//删除按钮
	$("#deleteBtn").on('click',function(){
		if(lastime == ""){
			$.sticky("请选中要删除的数据！！");
			return ;
		}
		showMsg('confirm',"确认","确认删除该配置吗?",lastime,function(lastime){
			$.ajax({
				type : "POST",// 以POST方式提交数据。
				url : "./saveTime.do",
				data : {
					"time" : lastime,
					"type" : "2"
				},
				dataType : "json",
				success : function(data) {
					if (data.error === undefined) {
						$.sticky("删除成功！！");
						addType = '';
						init();
					} else {
						$.sticky("删除失败！！");
					}
				}
			});
		})
	});
	/*修改*/
	$('#updateBtn').on('click', function () {
		if(lastime == ""){
			$.sticky("请选中要修改的数据！！");
			return ;
		}
		if(updateType == ""){//修改
			$("#deleteBtn").attr("disabled",true);
			$("#addBtn").attr("disabled",true);
			$(".zdfsTable.selected tr").children("td").last().children("input").attr("disabled",false);
			$('#updateBtn').val('保存');
			updateType = 'update';
		}else{
			var time = $(".zdfsTable.selected tr").children("td").last().children("input").val();
			if(time == ""){
				$.sticky("请配置发送时间！！！！");
				return ;
			}
			$.ajax({
				type : "POST",// 以POST方式提交数据。
				url : "./saveTime.do",
				data : {
					"lastTime" : lastime,
					"type" : "3",
					"time" : time
				},
				dataType : "json",
				success : function(data) {
					if (data.error === undefined) {
						$.sticky("更新成功！！");
						$("#deleteBtn").attr("disabled",false);
						$("#addBtn").attr("disabled",false);
						$('#updateBtn').val('修改');
						updateType = "";
						init();
					} else {
						$.sticky("更新失败！！");
					}
				}
			});
		}
	});
	//单个发送
	$("#sendBtn").on("click",function(){
		var arr = [];
		arr.push(row);
		send(JSON.stringify(arr));
	})
	//全部发送
	$("#sendAllBtn").on("click",function(){
		send("");
	})
}
/**
 * 发送接口
 */
function send(array){
	$.ajax({
		type : "POST",// 以POST方式提交数据。
		url : "./send.do",
		data : {"array":array},
		dataType : "json",
		async:false,
		success : function(data) {
			if (data.error === undefined) {
				$.sticky("只发送客户端在线的用户-----发送成功！！！！");
				$("#yhlbTable").datagrid('reload');
			}else{
				$.sticky("发送失败！！！！");
			}
		}
	});
}
/**
 * 行选中去除选中样式的方法
 */
function zdfsTableSelected(){
	//选中行的事件
	$(".zdfsTable").on("click",function(e){
		if(updateType == ""){
			$(".zdfsTable.selected").removeClass('selected');
			$(this).addClass('selected');
			lastime = $(".zdfsTable.selected tr").children("td").last().children("input").val();
		}
	});
}

//获取时间配置信息
var configTime;
function init(){
	$.ajax({
		type : "POST",// 以POST方式提交数据。
		url : "./getConfig.do",
		data : {},
		dataType : "json",
		async:false,
		success : function(data) {
			if (data.error === undefined) {
				flag = data.list.length;
				$("#zdfsDiv").empty();
				if(data.list.length <= 0){
					$("#deleteBtn").attr("disabled",true);
					$("#updateBtn").attr("disabled",true);
				}else{
					for(var i = 0; i < data.list.length; i ++){
						makeTimeConfig(i,data.list[i]);
					}
					configTime = data.pzz;
				}
				$('#zdfsTable0').addClass("selected");//默认第一行选中
				lastime = $("#fssj0").val();
			}
		}
	});
	zdfsTableSelected();
}
/**
 * 动态创建时间配置页面
 */
function makeTimeConfig(flag,type){
	$("#zdfsDiv").append('<table class="zdfsTable" id="zdfsTable'+flag+'" style="width:90%;margin:auto;margin-top:10px;text-align:center;"></table>');
	$("#zdfsTable"+flag).append('<tr><td width="40%" class="znjt-color-background-5">发送时间</td><td id="fssjTd'+flag+'" style="padding-left:10px;"></td></tr>');
	$("#fssjTd"+flag).append('<input type="text" id="fssj'+flag+'" name="fssj'+flag+'" class="znjt-input-text" data-inputmask="\'alias\':\'HH:mm:ss\'"  onclick="WdatePicker({dateFmt:\'HH:mm:ss\'})"/>');
	$("#fssjTd"+flag).append('<input type="button" onclick="WdatePicker({el:\'fssj'+flag+'\',dateFmt:\'HH:mm:ss\'})" style="height: 32px; width: 30px; border-top: 1px none; border-right: none; border-bottom: none; border-left: none; border-image: initial; display: inline-block; background-color: transparent; cursor: pointer; margin-left: -30px; position: relative; margin-top: 0px; padding-top: 1px; float: none; vertical-align: middle; background-image: url(&quot;/Avatar2KITS/znjt/common/images/jtyd/pick-date.png&quot;); background-position: 0px 1px;">');
	if(type !== undefined){
		$("#fssj"+flag).val(type);
		$("#fssj"+flag).attr("disabled",true);
	}
}

//时间配置保存
function saveTime(){
	var time = $("#fssj"+flag).val();
	if(time == "" || time == null){
		$.sticky("请配置发送时间！！！！");
		return ;
	}
	$.ajax({
		type : "POST",// 以POST方式提交数据。
		url : "./saveTime.do",
		data : {
			"time" : time,
			"type" : "1"
		},
		dataType : "json",
		success : function(data) {
			if (data.error === undefined) {
				$.sticky("新增成功！！");
				$('#addBtn').val('新建');
				addType = '';
				$("#deleteBtn").attr("disabled",false);
				$("#updateBtn").attr("disabled",false);
				init();
			} else {
				$.sticky("新增失败！！");
			}
		}
	});
}
/**
 * 客户端报警信息获取
 */
var row = "";
var alarmInfo;
function getAlaramInfo(){
	$('#fsxxxxTable').datagrid({
		url : './getAlaramInfo.do',
		method : 'post',
		fitColumns: true,
		rownumbers: false,
		fit: true,
		queryParams: {},
		singleSelect:true,
		sortName:"ljzt",
		sortOrder:"asc",
		columns:[[
						{field:'khdyh',align:'center',title:'用户名称',width:'35%'}, 
				        {field:'ljzt',width:'35%',sortable:true,order:"asc",align:'center',title:'用户状态',
							formatter : function(value, row, index) {
				        	if(value == "1"){
				        		return ret = "<image src='../znjt/gkbj/image/offLine.png'>  离线";
				        	}else{
				        		return ret = "<image src='../znjt/gkbj/image/line.png'>  在线";
				        	}
							}
						},
						{field:'gxsj',title:'时长', width:'30%',
				            formatter: function(value,row,index){
				                if (row.gxsj){
				                	var currentTime=new Date();    //当前时间
				                	var date3=currentTime.getTime()-row.gxsj.time  //时间差的毫秒数
				                	//计算出相差天数
				                	var days=Math.floor(date3/(24*3600*1000))
				                	//计算出小时数
				                	var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
				                	var hours=Math.floor(leave1/(3600*1000))
				                	//计算相差分钟数
				                	var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
				                	var minutes=Math.floor(leave2/(60*1000))
				                	//计算相差秒数
				                	var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
				                	var seconds=Math.round(leave3/1000);
				                    var priodTime=days+"天 "+hours+"小时 "+minutes+"分钟";
				                	return priodTime;
				                } else {
				                    return '';
				                }
				            }
				        }
			     ]],
		border : false,
		idField : 'xh',
		loadMsg : '正在查询数据，请稍候...',
		onBeforeLoad: function(param){
		},
		onSelect :function(index, rowData){
			row = rowData;
			getImitateInfo();
			if(rowData == null || rowData == ""){
				$("#sendBtn").attr("disabled",true);
				$("#sendAllBtn").attr("disabled",true);
			}else{
				if(rowData.ljzt == "1"){//离线
					$("#sendBtn").attr("disabled",true);
				}else{
					$("#sendBtn").attr("disabled",false);
				}
			}
		},
		onLoadSuccess : function(reData) {
			if(reData.error !== undefined){
				jAlert(reData.error, '提示信息');
				return ;
			}else{
				console.log("返回来的信息是，",reData.rows);
				for(var i=0;i<reData.rows.length;i++){
					reData.rows[i].priodTime=getPriodTime(reData.rows[i].gxsj.time);
				}
				console.log("封装后的信息，",reData.rows);
				/*$('#fsxxxxTable').datagrid('reload');*/
				if(reData.count <= 0){
					$("#sendBtn").attr("disabled",true);
					$("#sendAllBtn").attr("disabled",true);
				}
				alarmInfo = reData.rows;
				$("#fsxxxxTable").datagrid('selectRow',0);
			}
		}
	});
}

/**
 * 
 */
function getImitateInfo(){
	var khdyh = "";
	if(row != null && row != "" && row.khdyh != null){
		khdyh = row.khdyh;
	}
	$('#yhlbTable').datagrid({
		url : './getImitateInfo.do',
		method : 'post',
		fitColumns: true,
		rownumbers: false,
		fit: true,
		singleSelect:true,
		queryParams: {"khdyh":khdyh},
		columns:[[
						{field:'sjbh',align:'center',title:'数据编号',width:'22%'}, 
						{field:'fsyh',align:'center',title:'发送人',width:'17%'}, 
						{field:'crsj',align:'center',title:'发送时间',width:'22%',formatter:sjFormat}, 
				        {field:'sjzt',width:'17%',align:'center',title:'数据状态',
							formatter : function(value, row, index) {
					        	if(value == "1"){
					        		return ret = "<image src='../znjt/gkbj/image/process.png'>  已处理";
					        	}else if(value == "2"){
					        		return ret = "<image src='../znjt/gkbj/image/error.png'>  发送失败";
					        	}else{
					        		return ret = "<image src='../znjt/gkbj/image/no.png'>  未处理";
					        	}
							}
						},
						{field:'gxsj',align:'center',title:'反馈时间',width:'22%',formatter:sjFormat}
			     ]],
		border : false,
		idField : 'xh',
		loadMsg : '正在查询数据，请稍候...',
		pageSize : 20,
		pageList : [20,50,100,1000],
		pagination : true,
		onBeforeLoad: function(param){
		},
		onLoadSuccess : function(reData) {
			if(reData.error !== undefined){
				jAlert(reData.error, '提示信息');
				return ;
			}else{
				var rows = $("#yhlbTable").datagrid('getRows');
				if(rows.length > 0){
					$("#yhlbTable").datagrid('selectRow',0);
				}
			}
		}
	});
}

//时间格式转换
function sjFormat(value, row, index){
	 if(value==null){
		  return "";
	  }else{
		  return new Date(value.time).format("yyyy-MM-dd hh:mm:ss");
	  }
}
/**
 * 自动发送
 * @param check
 */
function autoSend(check){
	$.ajax({
		type : "POST",// 以POST方式提交数据。
		url : "./autoSend.do",
		data : {
			"check" : check,
			"times" : configTime
		},
		dataType : "json",
		success : function(data) {
			$("#yhlbTable").datagrid('reload');
		}
	});
}