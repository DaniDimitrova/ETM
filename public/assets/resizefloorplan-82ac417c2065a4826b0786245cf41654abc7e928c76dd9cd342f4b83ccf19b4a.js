function onWindowResize(){var i=$(window).width(),e=$(window).height(),w=!1;w||(w=!0,window.setTimeout(function(){var o=$(window).width(),n=$(window).height();if(o===i&&n===e){var r=$("#floor").width();$("img").mapster("resize",r,0,resizeTime)}w=!1},resizeDelay))}var resizeTime=100,resizeDelay=100;