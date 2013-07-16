angular.module('rickshaw-directive', []).directive('rickshawFixedTimeseries', [
function () {
var _linkFunc = function ($scope, iElement, attrs) {
    var graph = new Rickshaw.Graph({
        element: iElement.find('.metric-chart')[0],
        width: 480,
        height: 150,
        stroke: true,
        preserve: true,
        renderer: 'line',
        series: $scope.series,
    });
    var legend = new Rickshaw.Graph.Legend({
        element: iElement.find('.chart-legend')[0],
        graph: graph,
    });
    graph.render();

    var x_axis = new Rickshaw.Graph.Axis.Time({
        graph: graph,
    });
    x_axis.render();

    var y_axis = new Rickshaw.Graph.Axis.Y({
        graph: graph,
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
        ticksTreatment: 'glow',
    });
    y_axis.render();

    function watchSeries(idx) {
        $scope.$watch('series['+idx+'].data', function (new_data) {
            graph.series[idx].data = new_data;
            graph.update();
        }, true);
    }

    for (var idx=0; idx < $scope.series.length; idx++) {
        watchSeries(idx);
    }
};

return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
        width: '=width',
        height: '=height',
        series: '=series',
    },
    template: '<div class="rs-graph-block">' +
            '<div class="chart-container">' +
                '<div class="metric-chart"></div>' +
            '</div>' +
            '<div class="chart-legend"></div>' +
        '</div>',
    link: _linkFunc,
};
}]);
