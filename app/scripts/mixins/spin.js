define(['jquery'], function($) {
  var spinner_colour = $('#main_title').css('color'),
  load_spin_opts = {
    lines: 12, // The number of lines to draw
    length: 14, // The length of each line
    width: 4, // The line thickness
    radius: 16, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: spinner_colour, // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 40, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: true, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 500, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  };
});
