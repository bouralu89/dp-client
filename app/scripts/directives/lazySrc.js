'use strict';

angular.module('HybridApp')
    .directive('lazySrc', function() {
        return {
            //template: '<div></div>',
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                var scroller = $('#view');
                var bottom = $(window).height();

                function check() {
                    if (bottom >= $(element[0]).offset().top && (element.attr('src') == undefined)) {
                        element.attr('src', attrs.lazySrc);
                        element.removeAttr('lazy-src');
                    };
                }
                check();
                scroller.scroll(function() {
                    check();
                });

            }
        };
    });

angular.module('HybridApp')
    .directive('cacheSrc', function() {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                console.log(attrs.cacheSrc);
                ImgCache.isCached(attrs.cacheSrc, function(path, success) {
                    if (success) {
                        // already cached
                        ImgCache.useCachedFileWithSource($(element[0]), path);
                    } else {
                        // not there, need to cache the image
                        console.log('not success');
                        ImgCache.cacheFile(attrs.cacheSrc, function() {
                            ImgCache.useCachedFileWithSource($(element[0]), path);
                        });
                    }
                });

            }
        };
    });
