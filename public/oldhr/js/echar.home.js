$(function () {

    // qst的图表
    var myChartIndex = echarts.init(document.getElementById("echar"));

    optionIndex = {
        // title: {
        //     text: '到检率',

        //     y: 'bottom'
        // },

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            orient: 'vertical',
            y: 'bottom',
            data: ['投诉件数-全部']
        },
        xAxis: {
            type: 'category',
            data: []


        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '投诉件数-全部',
            data: [],
            type: 'line',
            symbol: '',
            symbolSize: 5,
            lineStyle: {
                normal: {
                    color: '#44b549',
                    width: 3,
                    type: 'solid'
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: '#44b549',
                    color: '#44b549'
                }
            }
        }]
    };

    // myChart.setOption(option);

    var begin = getNowFormatDate(0);
    var end = getNowFormatDate(1);

    var app_key = window.localStorage.getItem('app_key')
    // console.log(begin)
    // console.log(end)
    $.ajax({
        url: getUrl('complaint'),
        methods: "get",
        dataType: "json",
        data: { start_time: begin, end_time: end,app_key:app_key },
        success: function (res) {
            // console.log(res)
            if (res.status == 1) {
                var result = res.data.list;
                //    console.log(result)
                $.each(result, function (key, val) {
                    optionIndex.xAxis.data.push(val.date);
                    optionIndex.series[0].data.push(val.sum)
                })

                myChartIndex.setOption(optionIndex);

            }



        },
        error: function (XMLHttpRequest) {
            //请求过程中发生了错误，记录下错误的代码 例如 : 404 => page not found
            alert("请求遇到了错误 , 错误代码 : " + XMLHttpRequest.status);
        }


    })


    // 查询投诉件数
    $("#serach-result-xun").click(function () {
        optionIndex.xAxis.data = [];
        optionIndex.series[0].data = [];

        var start = $("#d11").val()
        var over = $("#d12").val()

        // console.log(start)
        // console.log(over)

        if (start > end) {
            layer.open({
                title: "温馨提示",
                content: "开始时间不能超过当天日期"
            })
            return;
        }
        $.ajax({
            url: getUrl('complaint'),
            methods: "get",
            dataType: "json",
            data: { start_time: start, end_time: over },
            success: function (res) {
                // console.log(res)
                if (res.status == 1) {
                    var result = res.data.list;
                    // console.log(result)
                    $.each(result, function (key, val) {
                        optionIndex.xAxis.data.push(val.date);
                        optionIndex.series[0].data.push(val.sum)
                    })

                    myChartIndex.setOption(optionIndex);

                }



            },
            error: function (XMLHttpRequest) {
                //请求过程中发生了错误，记录下错误的代码 例如 : 404 => page not found
                alert("请求遇到了错误 , 错误代码 : " + XMLHttpRequest.status);
            }


        })


    })


})
