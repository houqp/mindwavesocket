angular.module('spectrum-directive', []).directive('spectrum', [
function () {
var _linkFunc = function ($scope, iElement, attrs) {
	var color, hex_str, int_str;
	for (var idx in $scope.list.value) {
		int_str = parseInt(0xffffff * $scope.list.value[idx] / 50000);
		hex_str = int_str.toString(16);
		if (hex_str.length < 6) {
			hex_str = hex_str + 'ffffff'.substring(6-hex_str.length);
		}
		iElement.append('<span class="spectrum-elem" style="background-color: #'+ hex_str + '"></span>')
	}
};

return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
        list: '=list',
    },
    template: '<div class="spectrum">' +
        '</div>',
    link: _linkFunc,
};
}]);
