
app = angular.module('mindmetrics', ['rickshaw-directive', 'spectrum-directive']);

app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}]);

app.controller('MetricController', [
'$scope',
function($scope) {
    $scope.attention_metrics = [];
    $scope.meditation_metrics = [];
    $scope.beta_waves_metrics = [];
    $scope.alpha_waves_metrics = [];
    $scope.spectrum_list = [];

    var palette = new Rickshaw.Color.Palette();
    var cur_ts = new Date().getTime() / 1000;
    var max_data_points = 30;

    var attention_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];
    var meditation_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];

    var delta_waves_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];
    var theta_waves_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];
    var alpha_waves_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];
    var low_alpha_waves_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];
    var high_alpha_waves_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];
    var beta_waves_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];
    var low_beta_waves_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];
    var high_beta_waves_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];
    var gamma_waves_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];
    var low_gamma_waves_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];
    var mid_gamma_waves_data = [{x: cur_ts, y: 101}, {x: cur_ts, y: 0}];

    $scope.sec_metric_esenses_series = [
        {
            name: 'attention',
            data: attention_data,
            color: palette.color(),
        },
        {
            name: 'meditation',
            data: meditation_data,
            color: palette.color(),
        }
    ];

	$scope.sec_metric_atten_beta_series = [
		{
			name: 'beta_waves',
			data: beta_waves_data,
			color: palette.color(),
		},
	];

	$scope.sec_metric_medita_alpha_series = [
		{
			name: 'alpha_waves',
			data: alpha_waves_data,
			color: palette.color(),
		},
	];

	$scope.sec_metric_alpha_series = [
		{
			name: 'low_alpha_waves',
			data: low_alpha_waves_data,
			color: palette.color(),
		},
		{
			name: 'high_alpha_waves',
			data: high_alpha_waves_data,
			color: palette.color(),
		},
	];

	$scope.sec_metric_beta_series = [
		{
			name: 'low_beta_waves',
			data: low_beta_waves_data,
			color: palette.color(),
		},
		{
			name: 'high_beta_waves',
			data: high_beta_waves_data,
			color: palette.color(),
		},
	];

	$scope.sec_metric_gamma_series = [
		{
			name: 'low_gamma_waves',
			data: low_gamma_waves_data,
			color: palette.color(),
		},
		{
			name: 'mid_gamma_waves',
			data: mid_gamma_waves_data,
			color: palette.color(),
		},
	];

	$scope.sec_metric_theta_series = [
		{
			name: 'theta_waves',
			data: theta_waves_data,
			color: palette.color(),
		},
	];

	$scope.sec_metric_delta_series = [
		{
			name: 'delta_waves',
			data: delta_waves_data,
			color: palette.color(),
		},
	];

	$scope.sec_metric_wave_vector_series = [
		{
			name: 'delta_waves',
			data: delta_waves_data,
			color: palette.color(),
		},
		{
			name: 'theta_waves',
			data: theta_waves_data,
			color: palette.color(),
		},
		{
			name: 'low_alpha_waves',
			data: low_alpha_waves_data,
			color: palette.color(),
		},
		{
			name: 'high_alpha_waves',
			data: high_alpha_waves_data,
			color: palette.color(),
		},
		{
			name: 'low_beta_waves',
			data: low_beta_waves_data,
			color: palette.color(),
		},
		{
			name: 'high_beta_waves',
			data: high_beta_waves_data,
			color: palette.color(),
		},
		{
			name: 'low_gamma_waves',
			data: low_gamma_waves_data,
			color: palette.color(),
		},
		{
			name: 'mid_gamma_waves',
			data: mid_gamma_waves_data,
			color: palette.color(),
		},
	];

    var WEB_SOCKET_SWF_LOCATION = '/static/js/socketio/WebSocketMain.swf',
        socket = io.connect('/mindwave');

    socket.on('connect', function () {
        console.log('connected to server');
    });

    socket.on('reconnect', function () {
        message('System', 'Reconnected to the server');
    });

    socket.on('reconnecting', function () {
        message('System', 'lost connect to server');
        socket.disconnect(true);
    });

    socket.on('error', function (e) {
        message('System', e ? e : 'A unknown error occurred');
    });

	var fixedPointsPush = function(ar, metric, timestamp) {
		if (ar.length > max_data_points) {
			ar.shift();
		}
		ar.push({
			x: timestamp,
			y: metric.value,
		});
	};
    socket.on('second_metric', function (metric) {
        $scope.$apply(function() {
            $scope.attention_metrics.unshift({
				value: metric.attention.value,
				timestamp: metric.timestamp
			});
            $scope.meditation_metrics.unshift({
				value: metric.meditation.value,
				timestamp: metric.timestamp
			});
            $scope.alpha_waves_metrics.unshift({
				value: metric.alpha_waves.value,
				timestamp: metric.timestamp
			});
            $scope.beta_waves_metrics.unshift({
				value: metric.beta_waves,
				timestamp: metric.timestamp
			});
            $scope.spectrum_list.unshift({
				value: metric.raw_spectrum,
				timestamp: metric.timestamp
			});

			fixedPointsPush(attention_data, metric.attention, metric.timestamp);
   			fixedPointsPush(meditation_data, metric.meditation, metric.timestamp);

			fixedPointsPush(delta_waves_data, metric.delta_waves, metric.timestamp);
			fixedPointsPush(theta_waves_data, metric.theta_waves, metric.timestamp);
			fixedPointsPush(alpha_waves_data, metric.alpha_waves, metric.timestamp);
			fixedPointsPush(low_alpha_waves_data, metric.low_alpha_waves, metric.timestamp);
			fixedPointsPush(high_alpha_waves_data, metric.high_alpha_waves, metric.timestamp);
			fixedPointsPush(beta_waves_data, metric.beta_waves, metric.timestamp);
			fixedPointsPush(low_beta_waves_data, metric.low_beta_waves, metric.timestamp);
			fixedPointsPush(high_beta_waves_data, metric.high_beta_waves, metric.timestamp);
			fixedPointsPush(gamma_waves_data, metric.gamma_waves, metric.timestamp);
			fixedPointsPush(low_gamma_waves_data, metric.low_gamma_waves, metric.timestamp);
			fixedPointsPush(mid_gamma_waves_data, metric.mid_gamma_waves, metric.timestamp);
        });
    });

    function message (from, msg) {
        console.log(from, msg);
    }
}]);


