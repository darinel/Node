$(document).ready(function () {
  // Enable hover effect on the style switcher
  $('#switcher').hover(function () {
    $(this).addClass('hover');
  }, function () {
    $(this).removeClass('hover');
  });

  // Allow the style switcher to expand and collapse.
  var toggleSwitcher = function (event) {
    if (!$(event.target).is('button')) {
      $('#switcher button').toggleClass('hidden');
    }
  };
  $('#switcher').on('click', toggleSwitcher);

  // Simulate a click so we start in a collaped state.
  $('#switcher').click();

  // The setBodyClass() function changes the page style.
  // The style switcher state is also updated.
  var setBodyClass = function (className) {
    $('body').removeClass().addClass(className);

    $('#switcher button').removeClass('selected');
    $('#switcher-' + className).addClass('selected');

    $('#switcher').off('click', toggleSwitcher);

    if (className == 'default') {
      $('#switcher').on('click', toggleSwitcher);
    }
  };

  // begin with the switcher-default button "selected"
  $('#switcher-default').addClass('selected');

  // Map key codes to their corresponding buttons to click
  var triggers = {
    D: 'default',
    N: 'narrow',
    L: 'large'
  };

  // Call setBodyClass() when a button is clicked.
  $('#switcher').click(function (event) {
    if ($(event.target).is('button')) {
      var bodyClass = event.target.id.split('-')[1];
      setBodyClass(bodyClass);
    }
  });

  // Call setBodyClass() when a key is pressed.
  $(document).keyup(function (event) {
    var key = String.fromCharCode(event.which);
    if (key in triggers) {
      setBodyClass(triggers[key]);
    }
  });
});

$(document).ready(function () {
  $('div.author').click(function () {
    $(this).addClass('selected');
  });
  $("h3.chapter-title").dblclick(function () {
    $(this).toggleClass('hidden');
  });
  $(document).mousemove(function (e) {
    console.log(e.pageX + ", " + e.pageY);
  });
});

$(document).ready(function () {
  var up_Y, down_Y;
  $(document).on('click', function () {
    $('p').addClass('hidden');
  });
  $(document).mousedown(function (down) {
    down_Y = down.pageY;
  });
  $(document).mouseup(function (up) {
    up_Y = up.pageY;
    if (down_Y < up_Y) {
      $('p').removeClass('hidden');
    };
  });
  //注：判断鼠标按下和释放为同一个位置的方法这里用了click方法判断，如果用.mousedown()和.mouseup()来判断的话，只要在加上判断.pageX相等的条件即可。
});