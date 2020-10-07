import React, { Component } from 'react';
import { Layout,Form,DatePicker,Button,TimePicker,Calendar, Select,Divider,Spin,message } from 'antd';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import Fetch from '../../Base/base'
import { GetApi } from '../../Base/api';
import './Calendars.css';
//import LunarUtil from './LunarUtil';
const { Content, Sider } = Layout;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const { MonthPicker, RangePicker,WeekPicker } = DatePicker;
const { Option } = Select;
const WeekDays = [{value:'周一',code:1},{value:'周二',code:2},{value:'周三',code:3},{value:'周四',code:4},{value:'周五',code:5},{value:'周六',code:6},{value:'周天',code:0}];
/**
* @1900-2100区间内的公历、农历互转
* @charset UTF-8
* @Author  Jea杨(JJonline@JJonline.Cn)
* @Time    2014-7-21
* @Time    2016-8-13 Fixed 2033hex、Attribution Annals
* @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
* @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
* @Version 1.0.3
* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
* @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
*/
const LunarUtil = {

  /**
    * 农历1900-2100的润大小信息表
    * @Array Of Property
    * @return Hex
    */
  lunarInfo:[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
          0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
          0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
          0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
          0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
          0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
          0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
          0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
          0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
          0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x05ac0,0x0ab60,0x096d5,0x092e0,//1990-1999
          0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
          0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
          0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
          0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
          0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
          /**Add By JJonline@JJonline.Cn**/
          0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
          0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
          0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
          0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
          0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
          0x0d520],//2100

  /**
    * 公历每个月份的天数普通表
    * @Array Of Property
    * @return Number
    */
  solarMonth:[31,28,31,30,31,30,31,31,30,31,30,31],

  /**
    * 天干地支之天干速查表
    * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
    * @return Cn string
    */
  Gan:["\u7532","\u4e59","\u4e19","\u4e01","\u620a","\u5df1","\u5e9a","\u8f9b","\u58ec","\u7678"],

  /**
    * 天干地支之地支速查表
    * @Array Of Property
    * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
    * @return Cn string
    */
  Zhi:["\u5b50","\u4e11","\u5bc5","\u536f","\u8fb0","\u5df3","\u5348","\u672a","\u7533","\u9149","\u620c","\u4ea5"],

  /**
    * 天干地支之地支速查表<=>生肖
    * @Array Of Property
    * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
    * @return Cn string
    */
  Animals:["\u9f20","\u725b","\u864e","\u5154","\u9f99","\u86c7","\u9a6c","\u7f8a","\u7334","\u9e21","\u72d7","\u732a"],

  /**
    * 24节气速查表
    * @Array Of Property
    * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
    * @return Cn string
    */
  solarTerm:["\u5c0f\u5bd2","\u5927\u5bd2","\u7acb\u6625","\u96e8\u6c34","\u60ca\u86f0","\u6625\u5206","\u6e05\u660e","\u8c37\u96e8","\u7acb\u590f","\u5c0f\u6ee1","\u8292\u79cd","\u590f\u81f3","\u5c0f\u6691","\u5927\u6691","\u7acb\u79cb","\u5904\u6691","\u767d\u9732","\u79cb\u5206","\u5bd2\u9732","\u971c\u964d","\u7acb\u51ac","\u5c0f\u96ea","\u5927\u96ea","\u51ac\u81f3"],

  /**
    * 1900-2100各年的24节气日期速查表
    * @Array Of Property
    * @return 0x string For splice
    */
  sTermInfo:['9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',
            '97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
            '97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f',
            'b027097bd097c36b0b6fc9274c91aa','9778397bd19801ec9210c965cc920e','97b6b97bd19801ec95f8c965cc920f',
            '97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2','9778397bd197c36c9210c9274c91aa',
            '97b6b97bd19801ec95f8c965cc920e','97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec95f8c965cc920e','97bcf97c3598082c95f8e1cfcc920f',
            '97bd097bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e',
            '97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',
            '97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
            '97bcf97c359801ec95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f','97bd097bd07f595b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9210c8dc2','9778397bd19801ec9210c9274c920e','97b6b97bd19801ec95f8c965cc920f',
            '97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
            '97b6b97bd19801ec95f8c965cc920f','97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e','97bd07f1487f595b0b0bc920fb0722',
            '7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
            '97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c965cc920e','97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf7f1487f531b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
            '97bcf7f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
            '97b6b97bd19801ec9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
            '9778397bd097c36b0b6fc9210c91aa','97b6b97bd197c36c9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
            '97b6b7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
            '9778397bd097c36b0b70c9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
            '97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
            '9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9274c91aa',
            '97b6b7f0e47f531b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
            '9778397bd097c36b0b6fc9210c91aa','97b6b7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','977837f0e37f149b0723b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c35b0b6fc9210c8dc2',
            '977837f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
            '7f0e397bd097c35b0b6fc9210c8dc2','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','977837f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
            '977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd',
            '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
            '977837f0e37f14998082b0723b06bd','7f07e7f0e37f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f595b0b0bb0b6fb0722','7f0e37f0e37f14898082b0723b02d5',
            '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f531b0b0bb0b6fb0722',
            '7f0e37f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e37f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35',
            '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
            '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f149b0723b0787b0721',
            '7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0723b06bd',
            '7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722','7f0e37f0e366aa89801eb072297c35',
            '7ec967f0e37f14998082b0723b06bd','7f07e7f0e37f14998083b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
            '7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14898082b0723b02d5','7f07e7f0e37f14998082b0787b0721',
            '7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66aa89801e9808297c35','665f67f0e37f14898082b0723b02d5',
            '7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66a449801e9808297c35',
            '665f67f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
            '7f0e36665b66a449801e9808297c35','665f67f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
            '7f07e7f0e47f531b0723b0b6fb0721','7f0e26665b66a449801e9808297c35','665f67f0e37f1489801eb072297c35',
            '7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722'],

  /**
    * 数字转中文速查表
    * @Array Of Property
    * @trans ['日','一','二','三','四','五','六','七','八','九','十']
    * @return Cn string
    */
  nStr1:["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341"],

  /**
    * 日期转农历称呼速查表
    * @Array Of Property
    * @trans ['初','十','廿','卅']
    * @return Cn string
    */
  nStr2:["\u521d","\u5341","\u5eff","\u5345"],

  /**
    * 月份转农历称呼速查表
    * @Array Of Property
    * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
    * @return Cn string
    */
  nStr3:["\u6b63","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341","\u51ac","\u814a"],

  /**
    * 返回农历y年一整年的总天数
    * @param lunar Year
    * @return Number
    * @eg:var count = calendar.lYearDays(1987) ;//count=387
    */
  lYearDays:function(y) {
      var i, sum = 348;
      for(i=0x8000; i>0x8; i>>=1) { sum += (this.lunarInfo[y-1900] & i)? 1: 0; }
      return(sum+this.leapDays(y));
  },

  /**
    * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
    * @param lunar Year
    * @return Number (0-12)
    * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
    */
  leapMonth:function(y) { //闰字编码 \u95f0
      return(this.lunarInfo[y-1900] & 0xf);
  },

  /**
    * 返回农历y年闰月的天数 若该年没有闰月则返回0
    * @param lunar Year
    * @return Number (0、29、30)
    * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
    */
  leapDays:function(y) {
      if(this.leapMonth(y))  {
          return((this.lunarInfo[y-1900] & 0x10000)? 30: 29);
      }
      return(0);
  },

  /**
    * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
    * @param lunar Year
    * @return Number (-1、29、30)
    * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
    */
  monthDays:function(y,m) {
      if(m>12 || m<1) {return -1}//月份参数从1至12，参数错误返回-1
      return( (this.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
  },

  /**
    * 返回公历(!)y年m月的天数
    * @param solar Year
    * @return Number (-1、28、29、30、31)
    * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
    */
  solarDays:function(y,m) {
      if(m>12 || m<1) {return -1} //若参数错误 返回-1
      var ms = m-1;
      if(ms==1) { //2月份的闰平规律测算后确认返回28或29
          return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
      }else {
          return(this.solarMonth[ms]);
      }
  },

  /**
   * 农历年份转换为干支纪年
   * @param  lYear 农历年的年份数
   * @return Cn string
   */
  toGanZhiYear:function(lYear) {
      var ganKey = (lYear - 3) % 10;
      var zhiKey = (lYear - 3) % 12;
      if(ganKey == 0) ganKey = 10;//如果余数为0则为最后一个天干
      if(zhiKey == 0) zhiKey = 12;//如果余数为0则为最后一个地支
      return this.Gan[ganKey-1] + this.Zhi[zhiKey-1];

  },

  /**
   * 公历月、日判断所属星座
   * @param  cMonth [description]
   * @param  cDay [description]
   * @return Cn string
   */
  toAstro:function(cMonth,cDay) {
      var s   = "\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf";
      var arr = [20,19,21,21,21,22,23,23,23,23,22,22];
      return s.substr(cMonth*2 - (cDay < arr[cMonth-1] ? 2 : 0),2) + "\u5ea7";//座
  },

  /**
    * 传入offset偏移量返回干支
    * @param offset 相对甲子的偏移量
    * @return Cn string
    */
  toGanZhi:function(offset) {
      return this.Gan[offset%10] + this.Zhi[offset%12];
  },

  /**
    * 传入公历(!)y年获得该年第n个节气的公历日期
    * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
    * @return day Number
    * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
    */
  getTerm:function(y,n) {
      if(y<1900 || y>2100) {return -1;}
      if(n<1 || n>24) {return -1;}
      var _table = this.sTermInfo[y-1900];
      var _info = [
          parseInt('0x'+_table.substr(0,5)).toString() ,
          parseInt('0x'+_table.substr(5,5)).toString(),
          parseInt('0x'+_table.substr(10,5)).toString(),
          parseInt('0x'+_table.substr(15,5)).toString(),
          parseInt('0x'+_table.substr(20,5)).toString(),
          parseInt('0x'+_table.substr(25,5)).toString()
      ];
      var _calday = [
          _info[0].substr(0,1),
          _info[0].substr(1,2),
          _info[0].substr(3,1),
          _info[0].substr(4,2),

          _info[1].substr(0,1),
          _info[1].substr(1,2),
          _info[1].substr(3,1),
          _info[1].substr(4,2),

          _info[2].substr(0,1),
          _info[2].substr(1,2),
          _info[2].substr(3,1),
          _info[2].substr(4,2),

          _info[3].substr(0,1),
          _info[3].substr(1,2),
          _info[3].substr(3,1),
          _info[3].substr(4,2),

          _info[4].substr(0,1),
          _info[4].substr(1,2),
          _info[4].substr(3,1),
          _info[4].substr(4,2),

          _info[5].substr(0,1),
          _info[5].substr(1,2),
          _info[5].substr(3,1),
          _info[5].substr(4,2),
      ];
      return parseInt(_calday[n-1]);
  },

  /**
    * 传入农历数字月份返回汉语通俗表示法
    * @param lunar month
    * @return Cn string
    * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
    */
  toChinaMonth:function(m) { // 月 => \u6708
      if(m>12 || m<1) {return -1} //若参数错误 返回-1
      var s = this.nStr3[m-1];
      s+= "\u6708";//加上月字
      return s;
  },

  /**
    * 传入农历日期数字返回汉字表示法
    * @param lunar day
    * @return Cn string
    * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
    */
  toChinaDay:function(d){ //日 => \u65e5
      var s;
      switch (d) {
          case 10:
          s = '\u521d\u5341'; break;
      case 20:
          s = '\u4e8c\u5341'; break;
          break;
      case 30:
          s = '\u4e09\u5341'; break;
          break;
      default :
          s = this.nStr2[Math.floor(d/10)];
          s += this.nStr1[d%10];
      }
      return(s);
  },

  /**
    * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
    * @param y year
    * @return Cn string
    * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
    */
  getAnimal: function(y) {
      return this.Animals[(y - 4) % 12]
  },

  /**
    * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
    * @param y  solar year
    * @param m  solar month
    * @param d  solar day
    * @return JSON object
    * @eg:console.log(calendar.solar2lunar(1987,11,01));
    */
  solar2lunar:function (y,m,d) { //参数区间1900.1.31~2100.12.31
      //年份限定、上限
      if(y<1900 || y>2100) {
          return -1;// undefined转换为数字变为NaN
      }
      //公历传参最下限
      if(y==1900&&m==1&&d<31) {
          return -1;
      }
      //未传参  获得当天
      if(!y) {
          var objDate = new Date();
      }else {
          var objDate = new Date(y,parseInt(m)-1,d)
      }
      var i, leap=0, temp=0;
      //修正ymd参数
      var y = objDate.getFullYear(),
          m = objDate.getMonth()+1,
          d = objDate.getDate();
      var offset = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;
      for(i=1900; i<2101 && offset>0; i++) {
          temp    = this.lYearDays(i);
          offset -= temp;
      }
      if(offset<0) {
          offset+=temp; i--;
      }

      //是否今天
      var isTodayObj = new Date(),
          isToday    = false;
      if(isTodayObj.getFullYear()==y && isTodayObj.getMonth()+1==m && isTodayObj.getDate()==d) {
          isToday = true;
      }
      //星期几
      var nWeek = objDate.getDay(),
         cWeek  = this.nStr1[nWeek];
      //数字表示周几顺应天朝周一开始的惯例
      if(nWeek==0) {
          nWeek = 7;
      }
      //农历年
      var year   = i;
      var leap   = this.leapMonth(i); //闰哪个月
      var isLeap = false;

      //效验闰月
      for(i=1; i<13 && offset>0; i++) {
          //闰月
          if(leap>0 && i==(leap+1) && isLeap==false){
              --i;
              isLeap = true; temp = this.leapDays(year); //计算农历闰月天数
          }
          else{
              temp = this.monthDays(year, i);//计算农历普通月天数
          }
          //解除闰月
          if(isLeap==true && i==(leap+1)) { isLeap = false; }
          offset -= temp;
      }
      // 闰月导致数组下标重叠取反
      if(offset==0 && leap>0 && i==leap+1)
      {
          if(isLeap){
              isLeap = false;
          }else{
              isLeap = true; --i;
          }
      }
      if(offset<0)
      {
          offset += temp; --i;
      }
      //农历月
      var month      = i;
      //农历日
      var day        = offset + 1;
      //天干地支处理
      var sm         = m-1;
      var gzY        = this.toGanZhiYear(year);

      // 当月的两个节气
      // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`
      var firstNode  = this.getTerm(y,(m*2-1));//返回当月「节」为几日开始
      var secondNode = this.getTerm(y,(m*2));//返回当月「节」为几日开始

      // 依据12节气修正干支月
      var gzM        = this.toGanZhi((y-1900)*12+m+11);
      if(d>=firstNode) {
          gzM        = this.toGanZhi((y-1900)*12+m+12);
      }

      //传入的日期的节气与否
      var isTerm = false;
      var Term   = null;
      if(firstNode==d) {
          isTerm  = true;
          Term    = this.solarTerm[m*2-2];
      }
      if(secondNode==d) {
          isTerm  = true;
          Term    = this.solarTerm[m*2-1];
      }
      //日柱 当月一日与 1900/1/1 相差天数
      var dayCyclical = Date.UTC(y,sm,1,0,0,0,0)/86400000+25567+10;
      var gzD         = this.toGanZhi(dayCyclical+d-1);
      //该日期所属的星座
      var astro       = this.toAstro(m,d);

      return {'lYear':year,'lMonth':month,'lDay':day,'Animal':this.getAnimal(year),'IMonthCn':(isLeap?"\u95f0":'')+this.toChinaMonth(month),'IDayCn':this.toChinaDay(day),'cYear':y,'cMonth':m,'cDay':d,'gzYear':gzY,'gzMonth':gzM,'gzDay':gzD,'isToday':isToday,'isLeap':isLeap,'nWeek':nWeek,'ncWeek':"\u661f\u671f"+cWeek,'isTerm':isTerm,'Term':Term,'astro':astro};
  },

  /**
    * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
    * @param y  lunar year
    * @param m  lunar month
    * @param d  lunar day
    * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
    * @return JSON object
    * @eg:console.log(calendar.lunar2solar(1987,9,10));
    */
  lunar2solar:function(y,m,d,isLeapMonth) {   //参数区间1900.1.31~2100.12.1
      var isLeapMonth = !!isLeapMonth;
      var leapOffset  = 0;
      var leapMonth   = this.leapMonth(y);
      var leapDay     = this.leapDays(y);
      if(isLeapMonth&&(leapMonth!=m)) {return -1;}//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
      if(y==2100&&m==12&&d>1 || y==1900&&m==1&&d<31) {return -1;}//超出了最大极限值
      var day  = this.monthDays(y,m);
      var _day = day;
      //bugFix 2016-9-25
      //if month is leap, _day use leapDays method
      if(isLeapMonth) {
          _day = this.leapDays(y,m);
      }
      if(y < 1900 || y > 2100 || d > _day) {return -1;}//参数合法性效验

      //计算农历的时间差
      var offset = 0;
      for(var i=1900;i<y;i++) {
          offset+=this.lYearDays(i);
      }
      var leap = 0,isAdd= false;
      for(var i=1;i<m;i++) {
          leap = this.leapMonth(y);
          if(!isAdd) {//处理闰月
              if(leap<=i && leap>0) {
                  offset+=this.leapDays(y);isAdd = true;
              }
          }
          offset+=this.monthDays(y,i);
      }
      //转换闰月农历 需补充该年闰月的前一个月的时差
      if(isLeapMonth) {offset+=day;}
      //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
      var stmap   =   Date.UTC(1900,1,30,0,0,0);
      var calObj  =   new Date((offset+d-31)*86400000+stmap);
      var cY      =   calObj.getUTCFullYear();
      var cM      =   calObj.getUTCMonth()+1;
      var cD      =   calObj.getUTCDate();

      return this.solar2lunar(cY,cM,cD);
  }
};
class Calendars extends Component {
  constructor(props) {
    super(props);
    this.state = {
        IsHaveAddDay:false,
        spinloading:false,
        AddDays:[],
        DeleteDays:[],
        DeleteDaysAndID:[],
        NoWorkDaysAll:[],
        MonthDays:[],
        AllowToAddHoliday:false,
        LunarToday:null,
        WeekToday:'',
        runNext:false,
        tmpYear:moment().format('YYYY'),
        tmpMonth:moment().format('MM'),
        setTmpTX:null,
        tmpV:null,
        tmpTX:null,
        flag:'',
        contentMinHeight: document.getElementById('root').clientHeight - 120,
        CheckInTime1:moment().format('HH:mm'),
        CheckOutTime1:moment().add(4,'hours').format('HH:mm'),
        CheckInTime2:moment().format('HH:mm'),
        CheckOutTime2:moment().add(4,'hours').format('HH:mm'),
        CheckInTime3:moment().format('HH:mm'),
        CheckOutTime3:moment().add(4,'hours').format('HH:mm'),
        CheckInTime4:moment().format('HH:mm'),
        CheckOutTime4:moment().add(4,'hours').format('HH:mm'),
        TimeZone1_ID:'',
        TimeZone2_ID:'',
        TimeZone3_ID:'',
        TimeZone4_ID:'',
    };
}

//获取最新的节假日并传给后台
getLatestHolidays = (year) =>{
  let that = this
  that.setState({spinloading:true});
  Fetch('http://127.0.0.1:8080/holidays.json', null, { method: 'GET' }).then((data) => {
    let tmpV = {};
    let tmpTX = {};
    that.setState({spinloading:false});
    if (data[year].code === 0) {
      //日历数据处理
      let Holidays = data[year].holiday;
      for(let date in Holidays){
        if(Holidays[date].holiday === true){
          //console.log('%&==='+date);
          var key = date;
          var value = Holidays[date].name;
          tmpV[key] = value;
        }
        else{
          //console.log('$**---'+date);
          var key = date;
          var value = Holidays[date].name;
          tmpTX[key] = value;
        }
      }
    }
    that.PostLatestHolidays(tmpV,tmpTX);
  }).catch((error) => {
    that.setState({spinloading:false});
  });
}

PostLatestHolidays = (latestTmpV,latestTmpTX) =>{
  //console.log(latestTmpV);
  //console.log(latestTmpTX);
  //首先获取节假日
  let JQRS = [];
  let JJRS = [];
  for(var jqr in latestTmpV){
   // console.log(jqr);
    JJRS.push(latestTmpV[jqr]);
    JQRS.push(moment().format('YYYY')+'-'+jqr);
  }
  //console.log(JQRS);
  //console.log(JJRS);
  let V_PARAMS = [];
  JQRS.forEach(function(item,index,array){
    let V_PARAM = {
      "Day":item,
     // "Name":JJRS[index],
      "DayType":1
    }
    V_PARAMS.push(V_PARAM);
  })
 // console.log(V_PARAMS);
  let TXRS = [];
  let TXRSNAME = [];
  for(var txr in latestTmpTX){
    TXRS.push(moment().format('YYYY')+'-'+txr);
    TXRSNAME.push(latestTmpTX[txr]);
  }
  //console.log(TXRS);
 // console.log(TXRSNAME);
  TXRS.forEach(function(item1,index1,array1){
    let TX_PARAM = {
      "Day":item1,
     // "Name":TXRSNAME[index1],
      "DayType":2
    }
    V_PARAMS.push(TX_PARAM);
  })
  //console.log(JSON.stringify(V_PARAMS));
  this.setState({spinloading:true});
  let THAT = this;
  setTimeout(function(){
    THAT.setState({spinloading:false});
    // let NewNoWorkDaysAll = params.concat(THAT.state.NoWorkDaysAll);
    // console.log(NewNoWorkDaysAll);
    // THAT.setState({NoWorkDaysAll:NewNoWorkDaysAll});
    // THAT.getHolidays(THAT.state.tmpYear,THAT.state.tmpMonth);
  },500)
  // Fetch(GetApi("UpdateNoWorkDays"), V_PARAMS, { method: 'POST' }).then((data) => {
  //   this.setState({spinloading:false});
  //   if (data.Code === '0') {
     
  //   }
  // }).catch((error) => {
  //   this.setState({spinloading:false});
  // });
}
getHolidays = (year) => {
  let that = this
  that.setState({spinloading:true});
  Fetch('http://127.0.0.1:8080/holidays.json', null, { method: 'GET' }).then((data) => {
    let tmpV = {};
    let tmpTX = {};
    that.setState({spinloading:false});
    if (data[year].code === 0) {
      //日历数据处理
      let Holidays = data[year].holiday;
      for(let date in Holidays){
        if(Holidays[date].holiday === true){
          //console.log('%&==='+date);
          var key = date;
          var value = Holidays[date].name;
          tmpV[key] = value;
        }
        else{
          //console.log('$**---'+date);
          var key = date;
          var value = Holidays[date].name;
          tmpTX[key] = value;
        }
      }
    }
    that.setState({
      tmpV:tmpV,
      tmpTX:tmpTX,
      flag:'我是首次加载的',
      runNext:true,
    })
    that.cleanCalendar();
    that.GeyDayByYearMonth(that.state.tmpYear,that.state.tmpMonth);
  }).catch((error) => {
    that.setState({spinloading:false});
  });
}
//得到节气和调休
GetSpecialDays(tmpYear,tmpMonth,tmpV){
  let jqs = {};
 // console.log(tmpV);
  for(var jq in tmpV){
   if(jq.split("-")[0]<10){
    // jq.split("-")[0]=jq.split("-")[0].split('0')[1];
    if(Number(jq.split("-")[0].split('0')[1])===Number(tmpMonth)){
      if(jq.split('-')[1]<10){
        var key = jq.split('-')[1].split('0')[1];
        //console.log('节气=='+jq);
        var value = tmpV[jq];
        jqs[key] = value;
      }
      else{
        var key = jq.split('-')[1];
        //console.log('节气=='+jq);
        var value = tmpV[jq];
        jqs[key] = value;
      }
     }
   }
   else{
    if(Number(jq.split("-")[0])===Number(tmpMonth)){
      if(jq.split('-')[1]<10){
        var key = jq.split('-')[1].split('0')[1];
        //console.log('节气=='+jq);
        var value = tmpV[jq];
        jqs[key] = value;
      }
      else{
        var key = jq.split('-')[1];
        //console.log('节气=='+jq);
        var value = tmpV[jq];
        jqs[key] = value;
      }
     }
   }
  }
 // console.log(jqs);
  return jqs;
}
GeyDayByYearMonth(tmpYear,tmpMonth){
  this.GetNoWorkDays();
  //判断这个月是否有节气
  let tmpV = this.state.tmpV;
  let tmpTX = this.state.tmpTX;
  const jqs = this.GetSpecialDays(tmpYear,tmpMonth,tmpV);
 //console.log(jqs);//得到节气的休假日
  const txs = this.GetSpecialDays(tmpYear,tmpMonth,tmpTX);
 // console.log(txs);
  let AddDays = this.state.AddDays;
  let DeleteDays = this.state.DeleteDays;
  let DeleteDaysAndID = this.state.DeleteDaysAndID;
  let NoWorkDaysAll = this.state.NoWorkDaysAll;

  console.log(this.state.NoWorkDaysAll);
  let xjs = [];
  this.state.NoWorkDaysAll.forEach(function(item,index,array){
    if(Number(item.Day.split('T')[0].split('-')[0])===Number(tmpYear) && Number(item.Day.split('T')[0].split('-')[1])===Number(tmpMonth))
    xjs.push(item.Day.split('T')[0].split('-')[2]);
  })
  function M(C) {
    return document.getElementById(C)
  }
 
  function R(C) {
    return document.createElement(C)
  }
  let _THAT = this;
  let MonthDays = [];
  let days = new Date(tmpYear,tmpMonth,0);//这个月最后一天
  let daysEnd = days.getDate();
  let date = new Date(tmpYear,tmpMonth-1,1);//这个月第一天
  let FirstWeekDay = date.getDay();
  if(FirstWeekDay===0){
    for(var j = 1;j<7;j++){
      var X = R("DIV");
      X.className = "cell";
      //阳历部分
      X.innerHTML = "";
      MonthDays.push(X);
    }
  }

  if(FirstWeekDay!==1){
    for(var j = 1;j<FirstWeekDay;j++){
      var X = R("DIV");
      X.className = "cell0";
      //阳历部分
      X.innerHTML = "";
      MonthDays.push(X);
    }
  }
  for(let i=1;i<=daysEnd;i++){
     var X = R("DIV");
     X.onclick=function(){
     // debugger
       if(this.className !== 'addDay' && this.className !== 'addDay1'&& this.className !== 'addDay2'&&this.className !== 'jqs'&&this.className !== 'txs'){//添加选中状态
        this.className = 'addDay';
        _THAT.setState({IsHaveAddDay:true});
        // X.style.background = 'aaa';
        if(i<10){
          AddDays.push(tmpYear+'-'+tmpMonth+'-0'+i);
        }
        else{
          AddDays.push(tmpYear+'-'+tmpMonth+'-'+i);
        }  
       }
       else if(this.className === 'addDay'){//选中状态双击
        this.className = 'cell';
        _THAT.setState({IsHaveAddDay:false});
        if(i<10){
          var val = tmpYear+'-'+tmpMonth+'-0'+i;
        }
        else{
          var val = tmpYear+'-'+tmpMonth+'-'+i;
        }
        //方法一
        let index = AddDays.indexOf(val); 
        console.log(index);
        if (index > -1) { 
          AddDays.splice(index, 1); 
        }
        // //方法二
        // AddDays.remove(val);
       }
       else if(this.className === 'addDay1'){
        this.className = 'addDay2';
        _THAT.setState({IsHaveAddDay:false});
        console.log(i);
        if(i<10){
          var value = tmpYear+'-'+tmpMonth+'-0'+i;
        }
        else{
          var value = tmpYear+'-'+tmpMonth+'-'+i;
        }
        
        NoWorkDaysAll.forEach(function(item,index,array){
          console.log(item);
          if(item.Day.split('T')[0]===value){
            //console.log(item.Id);
            DeleteDaysAndID.push(item.Id);
          }
        })
        DeleteDays.push(value);
       }
       else if(this.className === 'addDay2'){
        this.className = 'addDay1';
        _THAT.setState({IsHaveAddDay:false});
        if(i<10){
          var value1 = tmpYear+'-'+tmpMonth+'-'+i;
        }
        else{
          var value1 = tmpYear+'-'+tmpMonth+'-'+i;
        }
        
        //方法一
        let index1 = DeleteDays.indexOf(value1); 
        console.log(index1);
        if (index1 > -1) { 
          DeleteDaysAndID.splice(index1, 1); 
          DeleteDays.splice(index1, 1); 
        }
       }
       else{
        console.log(i);
       }
     };
     X.className = "cell";
     for(let hh = 0;hh<xjs.length;hh++){
      if(Number(xjs[hh])===Number(i)){
        // console.log(i);
        X.className = 'addDay1';
        AddDays.push(tmpYear+'-'+tmpMonth+'-'+i);
      }
    }
     //阳历部分
     var b = R("DIV");
     b.className = "so";
     b.innerHTML = i;
     //针对阳历，进行变色处理
     //console.log('***'+jqs[i]);
     if(i===Number(moment().format('DD'))){
      X.style.backgroundColor = 'rgb(255, 248, 230)';
      X.style.border = '2px solid rgb(255, 203, 64)';
     }
     if(jqs[i]!==undefined){
     // console.log(i);
      X.className = 'jqs';
      X.style.background = 'rgba(255,68,51,0.1)';
      b.style.color = 'red';
      X.appendChild(b);
      //农历部分
      var Y = R("DIV");
      Y.className = "just";
      Y.style.color = "#666";
      Y.style.position = 'relative';
      Y.innerHTML = `<span style="color:red;display:inline-block;">`+jqs[i]+`</span>`+`<span style="color:#fff;background:#ff4433;width:20px;height:20px;line-height:20px;position:absolute;top:-33px;left:0;">休</span>`;
      X.appendChild(Y);
      MonthDays.push(X);
     }
     else if(txs[i]!==undefined){
      X.className = 'txs';
      X.style.background = 'rgba(150,151,153,0.1)';
      b.style.color = '#3385ff';
      X.appendChild(b);
      //农历部分
      var Y = R("DIV");
      Y.className = "just";
      Y.style.color = "#666";
      Y.style.position = 'relative';
      Y.innerHTML = `<span style="color:#999;display:inline-block;">`+txs[i]+`</span>`+`<span style="color:#fff;background:#969799;width:20px;height:20px;line-height:20px;position:absolute;top:-33px;left:0;">班</span>`;
      X.appendChild(Y);
      MonthDays.push(X);
     }
     else{
      X.appendChild(b);
      //农历部分
      let Lunar = LunarUtil.solar2lunar(tmpYear,tmpMonth,i);
      var Y = R("DIV");
      Y.className = "just";
      Y.style.color = "#666";
      Y.style.position = 'relative';
      Y.innerHTML = Lunar.IDayCn;
      X.appendChild(Y);
      MonthDays.push(X);
     }
  }
  console.log(AddDays);
  // console.log(AddDays);
  //数组去重
  let uniqAddDays=this.uniq(AddDays);
  this.setState({AddDays:uniqAddDays});
  this.setState({DeleteDays:DeleteDays});
  this.setState({MonthDays:MonthDays});
  this.setState({DeleteDaysAndID:DeleteDaysAndID});

 // console.log(MonthDays)
  MonthDays.forEach(function(item,index,array){
    M("cm").appendChild(item);
  })
}

uniq(array){
  var temp = []; //一个新的临时数组
  for(var i = 0; i < array.length; i++){
      if(temp.indexOf(array[i]) == -1){
          temp.push(array[i]);
      }
  }
  return temp;
}

componentDidMount(){
  this.getLatestHolidays(moment().format('YYYY'));
  this.getHolidays(moment().format('YYYY'));
  this.GetTodayDay();
  this.GetNoWorkDays();
  this.GetTimeZone();
}

GetTodayDay(){
  let today = new Date();//今天
  let weekday = today.getDay();//周几
  //得到农历数据
  let LunarToday = LunarUtil.solar2lunar(moment().format('YYYY'),moment().format('MM'),moment().format('DD'));
  //console.log(LunarToday);
  WeekDays.map((item)=>{
    if(weekday===item.code){
      weekday=item.value
    }
  })
  this.setState({
    LunarToday:LunarToday,
    WeekToday:weekday
  });
}

selectYearChange = (event) =>{
  this.setState({tmpYear:event});
  let _that = this;
  _that.getHolidays(event,_that.state.tmpMonth);
}

cleanCalendar(){
  var div = document.getElementById('cm'); 

    while(div.hasChildNodes()) //当div下还存在子节点时 循环继续 

    { 

        div.removeChild(div.firstChild); 

    } 
  console.log(document.getElementById('cm'));
}
selectMonthChange = (event) =>{
  this.setState({tmpMonth:event});
  let _that = this;
  _that.getHolidays(_that.state.tmpYear,event);
}

onChange = (field, value) => {
  this.setState({
    [field]: value,
  });
}

CheckInTimeChange1 = (value) =>{
  console.log(moment(value).format('HH:mm'));
  this.onChange('CheckInTime1', moment(value).format('HH:mm'));
}
CheckOutTimeChange1 = (value) =>{
  this.onChange('CheckOutTime1', moment(value).format('HH:mm'));
}
CheckInTimeChange2 = (value) =>{
  this.onChange('CheckInTime2', moment(value).format('HH:mm'));
}
CheckOutTimeChange2 = (value) =>{
  this.onChange('CheckOutTime2', moment(value).format('HH:mm'));
}
CheckInTimeChange3 = (value) =>{
  console.log(value);
  this.onChange('CheckInTime3', moment(value).format('HH:mm'));
}
CheckOutTimeChange3 = (value) =>{
  this.onChange('CheckOutTime3', moment(value).format('HH:mm'));
}
CheckInTimeChange4 = (value) =>{
  console.log(value);
  this.onChange('CheckInTime4', moment(value).format('HH:mm'));
}
CheckOutTimeChange4 = (value) =>{
  this.onChange('CheckOutTime4', moment(value).format('HH:mm'));
}

//首次获取夏令时冬令时的时间
GetTimeZone = () =>{
  let THAT = this;
  Fetch("http://127.0.0.1:8080/timezone.json", null, { method: 'GET' })
  .then((data) => {
    console.log(data.Result);
    data.Result.forEach(function(item,index,array){
      if(item.timezone==="Summer" && item.type === "AM"){
        THAT.setState({
          CheckInTime1:item.startime,
          CheckOutTime1:item.endtime,
          TimeZone1_ID:item.Id
        })
      }
      if(item.timezone==="Summer" && item.type === "PM"){
        THAT.setState({
          CheckInTime2:item.startime,
          CheckOutTime2:item.endtime,
          TimeZone2_ID:item.Id
        })
      }
      if(item.timezone==="Winter" && item.type === "AM"){
        THAT.setState({
          CheckInTime3:item.startime,
          CheckOutTime3:item.endtime,
          TimeZone3_ID:item.Id
        })
      }
      if(item.timezone==="Winter" && item.type === "PM"){
        THAT.setState({
          CheckInTime4:item.startime,
          CheckOutTime4:item.endtime,
          TimeZone4_ID:item.Id
        })
      }
    })
  }).catch((error)=>{
    console.log(error);
  })
}

GetNoWorkDays = () =>{
  this.setState({spinloading:true});
  Fetch("http://127.0.0.1:8080/noworkday.json", null, { method: 'GET' }).then((data) => {
    this.setState({spinloading:false});
    console.log(data);
    if (data.Code === '0') {
      console.log(data.Result);
      this.setState({NoWorkDaysAll:data.Result});
    }
  }).catch((error) => {
    this.setState({spinloading:false});
  });
}

//添加休假
addHolidayToSql = () =>{
  console.log(this.state.IsHaveAddDay);
  if(this.state.IsHaveAddDay === false){
    message.error('没有选择要添加的休假日期!');
    return
  }
  console.log(this.state.AddDays);
  console.log(this.state.NoWorkDaysAll.length);
  let params = [];
  this.state.AddDays.forEach(function(item,index,array){
    console.log(item);
    let param = {
      "Day": item,
      "DayType":0
    }
    params.push(param);
  })
  console.log(params);
  this.setState({spinloading:true});
  let THAT = this;
  setTimeout(function(){
    THAT.setState({spinloading:false});
    let NewNoWorkDaysAll = params.concat(THAT.state.NoWorkDaysAll);
    console.log(NewNoWorkDaysAll);
    THAT.setState({NoWorkDaysAll:NewNoWorkDaysAll});
    THAT.getHolidays(THAT.state.tmpYear,THAT.state.tmpMonth);
  },500)
  // Fetch(GetApi("UpdateNoWorkDays"), params, { method: 'POST' }).then((data) => {
  //   this.setState({spinloading:false});
  //   if (data.Code === '0') {
  //    console.log(data.Result);
  //    let NewNoWorkDaysAll = data.Result.concat(this.state.NoWorkDaysAll);
  //    console.log(NewNoWorkDaysAll);
  //    this.setState({NoWorkDaysAll:NewNoWorkDaysAll});
  //    this.getHolidays(this.state.tmpYear,this.state.tmpMonth);
  //   }
  // }).catch((error) => {
  //   this.setState({spinloading:false});
  // })
}
//清空手动添加的休假
cleanSetting = () =>{
  console.log(this.state.DeleteDays);
  console.log(this.state.DeleteDaysAndID);
  if(this.state.DeleteDays.length<1){
    message.error('没有选择要清除的日期!');
    return
  } 
  var isNaN = Number.isNaN;
  var difference = function(arr1, arr2) {
      return arr1.reduce(function(previous, i) {
          var found = arr2.findIndex(function(j) {
              return j === i || (isNaN(i) && isNaN(j));
          });
          return (found < 0 && previous.push(i), previous);
      }, []);
  };
  console.log(difference(this.state.AddDays, this.state.DeleteDays));
  let NewAddDays = difference(this.state.AddDays, this.state.DeleteDays);
  let DeleteDaysAndID = this.state.DeleteDaysAndID;
  let params = [];
  this.state.DeleteDays.forEach(function(item,index,array){
    console.log(item);
    let param = {
      "Day": item,
      "Id":DeleteDaysAndID[index],
      "DeleteFlag":1
    }
    params.push(param);
  })
  console.log(params);
 // return
  this.setState({spinloading:true});
  let THAT = this;
  setTimeout(function(){
    THAT.setState({spinloading:false});
    // let NewNoWorkDaysAll = params.concat(THAT.state.NoWorkDaysAll);
    // console.log(NewNoWorkDaysAll);
    // THAT.setState({NoWorkDaysAll:NewNoWorkDaysAll});
    // THAT.getHolidays(THAT.state.tmpYear,THAT.state.tmpMonth);
  },500)
  // Fetch(GetApi("UpdateNoWorkDays"), params, { method: 'POST' }).then((data) => { 
  //   if (data.Code === '0') {
  //    console.log(data);
  //    //this.setState({NoWorkDaysAll:NewAddDays});
  //    //return
  //     window.location.reload();
  //     this.setState({spinloading:false});
  //   }
  //   else{
  //     this.setState({spinloading:false});
  //   }
  // }).catch((error) => {
  //   this.setState({spinloading:false});
  // });
}

//保存夏令时，冬令时设置
saveSetting =(event) =>{
  console.log(this.state);
  let det =[
    {
      "timezone": "Summer",
      "type": "AM",
      "startime": this.state.CheckInTime1,
      "endtime": this.state.CheckOutTime1,
      "Id":this.state.TimeZone1_ID,
      // "SId":1
    },
    {
      "timezone": "Summer",
      "type": "PM",
      "startime": this.state.CheckInTime2,
      "endtime":this.state.CheckOutTime2,
      "Id":this.state.TimeZone2_ID,
      // "SId":2
    },
    {
      "timezone": "Winter",
      "type": "AM",
      "startime": this.state.CheckInTime3,
      "endtime": this.state.CheckOutTime3,
      "Id":this.state.TimeZone3_ID,
      // "SId":3
    },
    {
      "timezone": "Winter",
      "type": "PM",
      "startime": this.state.CheckInTime4,
      "endtime": this.state.CheckOutTime4,
      "Id":this.state.TimeZone4_ID,
      // "SId":4
    },
  ]
  console.log(det);//UpdateTimeZone
  this.setState({spinloading:true});
  let THAT = this;
  setTimeout(function(){
    THAT.setState({spinloading:false});
    // let NewNoWorkDaysAll = params.concat(THAT.state.NoWorkDaysAll);
    // console.log(NewNoWorkDaysAll);
    // THAT.setState({NoWorkDaysAll:NewNoWorkDaysAll});
    // THAT.getHolidays(THAT.state.tmpYear,THAT.state.tmpMonth);
  },500)
  // Fetch(GetApi("UpdateTimeZone"), det, { method: 'POST' }).then((data) => {
  //   console.log(data);
  //   THAT.setState({spinloading:false});
  // })
  // .catch((error)=>{
  //   THAT.setState({spinloading:false});
  // })
}

render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const YearSection = {//1900-2100
      MinYear:2017,
      MaxYear:2050
    };
    let YearOptions = [];
    for(let i=YearSection.MinYear;i<YearSection.MaxYear;i++){
      YearOptions.push(i);
    }
    let MonthOptions = ['01','02','03','04','05','06','07','08','09',10,11,12];
    // console.log(YearOptions);
    const dateFormat = 'MM-DD';
    const hourFormat = 'HH:mm';
    const LunarToday = LunarUtil.solar2lunar(moment().format('YYYY'),moment().format('MM'),moment().format('DD'));
    return (
      <Content style={{ padding: '0 10px 10px'}} className="CalendarDetail">
      <Spin spinning={this.state.spinloading}>
        <h2 style={{ margin: '9px 0' }}>日历</h2>
        <Layout style={{ padding: '10px 5px', background: '#fff', minHeight: this.state.contentMinHeight, overflow: 'auto', paddingBottom: '45px' }}>
         {/* <div>暂未开放~~~</div> */}
         <div className="Calendar">
            <div className="Calendar_Left">
            <div className="Calendar_body">
            <div id="top">
            <Select id="topselect1" onChange={this.selectYearChange.bind(this)} value={this.state.tmpYear}>
            {YearOptions.map((item, i) => <Select.Option key={item} value={item}>{item}</Select.Option>)}
            </Select>年

            <Select id="topselect2" onChange={this.selectMonthChange.bind(this)} value={this.state.tmpMonth}>
            {MonthOptions.map((item, i) => <Select.Option key={item} value={item}>{item}</Select.Option>)}
            </Select>
            </div>
            <ul id="wk">
              <li>周一</li>
              <li>周二</li>
              <li>周三</li>
              <li>周四</li>
              <li>周五</li>
              <li><b>周六</b></li>
              <li><b>周日</b></li>
            </ul>
            <div id="cm">
            {/* {this.state.MonthDays.map((item)=><div>{item}</div>)} */}
            </div>
            </div>
            <div className="Calendar_Btn">
              <div className="addHoliday" onClick={this.addHolidayToSql.bind(this)}>添加休假日期</div>
              <div className="cleanSetting" onClick={this.cleanSetting.bind(this)}>清除设置</div>
            </div>
            </div>
            <div className="Calendar_Right">
              <div style={{width:'500px',height:'200px',top:'136px',left:'845px'}} className="todayFd" id="todayFd">
                <div className="div1"><span>{moment().format('YYYY')}年</span><span>{moment().format('MM')}月</span><span>{LunarToday.ncWeek}</span></div>
                <div className="div2">{moment().format('DD')}</div>
              </div>
              <div style={{height:'76px'}} className="todayFt" id="todayFt">
                <div className="div1"><span>农历</span>{LunarToday.IMonthCn}{LunarToday.IDayCn}</div>
                <div className="div2">{LunarToday.gzYear}【{LunarToday.Animal}年】{LunarToday.gzMonth}{LunarToday.gzDay}</div>
              </div>
              <div className="SummerAndWinter" style={{marginTop:'60px'}}>
                <div className="SummerTime">
                  <div className="first">夏令时</div>
                  <div className="second">上午</div>
                  <dl className="third">
                    <dd><TimePicker onChange={this.CheckInTimeChange1.bind(this)} value={moment(this.state.CheckInTime1, hourFormat)} format={hourFormat}/></dd>
                    <dd><TimePicker onChange={this.CheckOutTimeChange1.bind(this)} value={moment(this.state.CheckOutTime1, hourFormat)} format={hourFormat}/></dd>
                  </dl>
                  <div className="fourth">下午</div>
                  <dl className="fifth">
                    <dd><TimePicker onChange={this.CheckInTimeChange2.bind(this)} value={moment(this.state.CheckInTime2, hourFormat)} format={hourFormat}/></dd>
                    <dd><TimePicker onChange={this.CheckOutTimeChange2.bind(this)} value={moment(this.state.CheckOutTime2, hourFormat)} format={hourFormat}/></dd>
                  </dl>
                </div>
                <Divider style={{ margin:'10px 0' }}></Divider>
                <div className="WinterTime">
                  <div className="first">冬令时</div>
                  <div className="second">上午</div>
                  <dl className="third">
                    <dd><TimePicker onChange={this.CheckInTimeChange3.bind(this)} value={moment(this.state.CheckInTime3, hourFormat)} format={hourFormat}/></dd>
                    <dd><TimePicker onChange={this.CheckOutTimeChange3.bind(this)} value={moment(this.state.CheckOutTime3, hourFormat)} format={hourFormat}/></dd>
                  </dl>
                  <div className="fourth">下午</div>
                  <dl className="fifth">
                    <dd><TimePicker onChange={this.CheckInTimeChange4.bind(this)} value={moment(this.state.CheckInTime4, hourFormat)} format={hourFormat}/></dd>
                    <dd><TimePicker onChange={this.CheckOutTimeChange4.bind(this)} value={moment(this.state.CheckOutTime4, hourFormat)} format={hourFormat}/></dd>
                  </dl>
                </div>
              </div>
              <div className="Calendar_Btn" style={{borderTop:'1px solid #abd6b8'}}>
                  <div className="saveSetting" onClick={this.saveSetting.bind(this)}>保存设置</div>
                </div>
           </div>
         </div>
        </Layout>
      </Spin>
      </Content>
    );
  }
}

export default Calendars;
