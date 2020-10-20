import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import * as d3 from 'd3';

try {
    const headerBase = new GetHeaderBase({
        headerDOM: document.querySelector('.body__header.header.header--base'),
        allHeaderDOMs: document.querySelectorAll('.body__header.header'),
    });
    if (!(headerBase instanceof GetHeaderBase))
        throw new Error('.header.header--base not found.');
}
catch (err) {
    console.error(err);
}
try {
    const headerMedium = new GetHeaderMedium({
        headerDOM: document.querySelector('.body__header.header.header--medium'),
        allHeaderDOMs: document.querySelectorAll('.body__header.header'),
    });
    if (!(headerMedium instanceof GetHeaderMedium))
        throw new Error('.header.header--medium not found.');
}
catch (err) {
    console.error(err);
}
try {
    const headerLarge = new GetHeaderLarge({
        headerDOM: document.querySelector('.body__header.header.header--large'),
    });
    if (!(headerLarge instanceof GetHeaderLarge))
        throw new Error('.header.header--medium not found.');
    headerLarge.renderLogin();
}
catch (err) {
    console.error(err);
}

const d3Data = {
    plotAttribute: {
        width: 600,
        height: 600,
        margin: 40,
        labelYTranslate: 50,
    },
    lineChart: [
        {
            label: {
                [WebLanguageUtils.getLanguageId('en-US')]:
                {
                    title: 'Number of Students from Star Plan',
                    xAxis: 'Year',
                    yAxis: 'Number of Students',
                },
                [WebLanguageUtils.getLanguageId('zh-TW')]:
                {
                    title: '繁星計畫錄取人數',
                    xAxis: '年度',
                    yAxis: '人數',
                },
            },
            selector: 'starPlanStudentNum',
            yMax: 20,
            yMin: 0,
            data: [
                12,
                11,
                12,
                12,
                12,
            ],
        },
        {
            label: {
                [WebLanguageUtils.getLanguageId('en-US')]:
                {
                    title: 'Number of Students from GSAT',
                    xAxis: 'Year',
                    yAxis: 'Number of Students',
                },
                [WebLanguageUtils.getLanguageId('zh-TW')]:
                {
                    title: '學測錄取人數',
                    xAxis: '年度',
                    yAxis: '人數',
                },
            },
            selector: 'gsatStudentNum',
            yMax: 60,
            yMin: 0,
            data: [
                29,
                51,
                32,
                53,
                57,
            ],
        },
        {
            label: {
                [WebLanguageUtils.getLanguageId('en-US')]:
                {
                    title: 'Mininum Admission Line Of GSAT',
                    xAxis: 'Year',
                    yAxis: 'Score',
                },
                [WebLanguageUtils.getLanguageId('zh-TW')]:
                {
                    title: '學測最低錄取級分',
                    xAxis: '年度',
                    yAxis: '級分',
                },
            },
            selector: 'gsatMinScore',
            yMax: 75,
            yMin: 65,
            data: [
                69,
                68,
                70,
            ],
        },
        {
            label: {
                [WebLanguageUtils.getLanguageId('en-US')]:
                {
                    title: 'Number of Students from AST',
                    xAxis: 'Year',
                    yAxis: 'Number of Students',
                },
                [WebLanguageUtils.getLanguageId('zh-TW')]:
                {
                    title: '指考錄取人數',
                    xAxis: '年度',
                    yAxis: '人數',
                },
            },
            selector: 'astStudentNum',
            yMax: 70,
            yMin: 20,
            data: [
                60,
                38,
                57,
                48,
                65,
            ],
        },
        {
            label: {
                [WebLanguageUtils.getLanguageId('en-US')]:
                {
                    title: 'Mininum Admission Line of AST',
                    xAxis: 'Year',
                    yAxis: 'Score',
                },
                [WebLanguageUtils.getLanguageId('zh-TW')]:
                {
                    title: '指考最低錄取分數',
                    xAxis: '年度',
                    yAxis: '分數',
                },
            },
            selector: 'astMinScore',
            yMax: 400,
            yMin: 350,
            data: [
                375.20,
                376.80,
                394.15,
                395.90,
                383.80,
            ],
        },
        {
            label: {
                [WebLanguageUtils.getLanguageId('en-US')]:
                {
                    title: 'Number of Indigenous Students',
                    xAxis: 'Year',
                    yAxis: 'Number of Students',
                },
                [WebLanguageUtils.getLanguageId('zh-TW')]:
                {
                    title: '原住民錄取人數',
                    xAxis: '年度',
                    yAxis: '人數',
                },
            },
            selector: 'indigenousStudentNum',
            yMax: 3,
            yMin: 0,
            data: [
                2,
                1,
                2,
            ],
        },
        {
            label: {
                [WebLanguageUtils.getLanguageId('en-US')]:
                {
                    title: 'Number of Foreign Students',
                    xAxis: 'Year',
                    yAxis: 'Number of Students',
                },
                [WebLanguageUtils.getLanguageId('zh-TW')]:
                {
                    title: '外籍生錄取人數',
                    xAxis: '年度',
                    yAxis: '人數',
                },
            },
            selector: 'foreignStudentNum',
            yMax: 25,
            yMin: 0,
            data: [
                8,
                20,
                17,
            ],
        },
    ],
    boxChart: [
        {
            label: {
                [WebLanguageUtils.getLanguageId('en-US')]:
                {
                    title: 'GSAT Score Range of Students from Star Plan',
                    xAxis: 'Year',
                    yAxis: 'Score',
                },
                [WebLanguageUtils.getLanguageId('zh-TW')]:
                {
                    title: '繁星錄取生學測級分級距',
                    xAxis: '年度',
                    yAxis: '級分',
                },
            },
            selector: 'starPlanScoreRange',
            yMax: 75,
            ymin: 55,
            dataMax: [
                70,
                67,
                73,
            ],
            dataMin: [
                60,
                59,
                59,
            ],
        },
    ],

};

d3Data.lineChart.forEach((chart) => {
    const xScale = d3.scaleLinear([
        0,
        chart.data.length,
    ], [
        0,
        d3Data.plotAttribute.width,
    ]);
    const yScale = d3.scaleLinear([
        chart.yMin,
        chart.yMax,
    ], [
        d3Data.plotAttribute.height,
        0,
    ]);

    const scaling = d3.line().x((d, i) => xScale(i + 1)).
    y(d => yScale(d));

    // Line chart
    d3.select(`#${chart.selector}`).select('svg').
    attr('preserveAspectRatio', 'xMinYMin meet').
    attr('viewBox', `0 0 ${d3Data.plotAttribute.width + 2 * d3Data.plotAttribute.margin}
    ${d3Data.plotAttribute.height + 2 * d3Data.plotAttribute.margin}`).
    append('path').
    attr('d', scaling(chart.data)).
    attr('transform', `translate(-${d3Data.plotAttribute.margin}, -${d3Data.plotAttribute.margin})`);

    // Create x-axis
    const tickValuesXAxis = Array.from([...Array(chart.data.length).keys()].map(v => v + 1));
    const xAxis = d3.axisBottom(xScale).tickSize(d3Data.plotAttribute.height * 0.8).
    tickFormat(d => 105 + d - 1).
    tickValues(tickValuesXAxis);
    d3.select(`#${chart.selector}`).select('svg').
    append('g').
    attr('class', 'lineChart__axis').
    attr('transform', `translate(-${d3Data.plotAttribute.margin}, -${d3Data.plotAttribute.margin})`).
    call(xAxis);

    // Create x-axis labels
    d3.select(`#${chart.selector}`).select('svg').
    append('text').
    attr('y', d3Data.plotAttribute.height - 2 * d3Data.plotAttribute.margin).
    attr('x', d3Data.plotAttribute.width).
    attr('class', 'lineChart__axisLabel').
    text(chart.label[WebLanguageUtils.currentLanguageId].xAxis);

    // Create y-axis labels
    d3.select(`#${chart.selector}`).select('svg').
    append('text').
    attr('y', 6).
    attr('x', 2 * d3Data.plotAttribute.margin).
    attr('dy', '.71rem').
    attr('class', 'lineChart__axisLabel').
    text(chart.label[WebLanguageUtils.currentLanguageId].yAxis);

    // Create data labels
    d3.select(`#${chart.selector}`).select('svg').
    selectAll('.text').
    data(chart.data).
    enter().
    append('text').
    attr('class', 'lineChart__label').
    attr('x', (d, i) => xScale(i + 1)).
    attr('y', d => yScale(d)).
    attr('transform', `translate(-${d3Data.plotAttribute.margin}, ${d3Data.plotAttribute.margin - d3Data.plotAttribute.labelYTranslate})`).
    text(d => d);

    // Create plot title
    d3.select(`#${chart.selector}`).select('svg').
    append('text').
    attr('y', d3Data.plotAttribute.height - 2 * d3Data.plotAttribute.margin).
    attr('x', d3Data.plotAttribute.width / 2 + 2 * d3Data.plotAttribute.margin).
    attr('class', 'lineChart__title').
    text(chart.label[WebLanguageUtils.currentLanguageId].title);
});

