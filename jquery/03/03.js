// This is the custom JavaScript file referenced by index.html. You will notice
// that this file is currently empty. By adding code to this empty file and
// then viewing index.html in a browser, you can experiment with the example
// page or follow along with the examples in the book.
//
// See README.txt for more information.
$(document).ready(function () {
  $('#switcher').hover(function () {
    $(this).addClass('hover');
  }, function () {
    $(this).removeClass('hover');
  });
});
$(document).ready(function () {
  $('#switcher').click(function (event) {
    if (!$(event.target).is('button')) {
      $('#switcher button').toggleClass('hidden');
    }
  });
});
$(document).ready(function () {
  console.log($('#switcher'));
  $('#switcher').on('click', 'button', function () {
    var bodyClass = event.target.id.split('-')[1];
    $('body').removeClass().addClass(bodyClass);
    $('#switcher button').removeClass('selected');
    $(this).addClass('selected');
  });
});

$(document).ready(function () {
  var triggers = {
    D: 'default',
    N: 'narrow',
    L: 'large'
  };
  $(document).keyup(function (event) {
    var key = String.fromCharCode(event.which);
    if (key in triggers) {
      $('#switcher-' + triggers[key]).trigger('click');
    }
  });
});