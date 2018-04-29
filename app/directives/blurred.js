angular.module('myApp').directive('blurred', function() {
    return {
        restrict: 'A',
        scope: {
            blurredSrc: '='
        },
        link: function(scope, elem) {
            elem.backgroundBlur({
                blurAmount : 20,
                imageClass : 'bg-blur',
                imageURL: scope.blurredSrc,
                duration: 1000,
                endOpacity : 1
            });
        }
    }
});