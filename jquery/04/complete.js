$(document).ready(function () {
  var $speech = $('div.speech');
  var defaultSize = $speech.css('fontSize');
  $('#switcher button').click(function () {
    var num = parseFloat($speech.css('fontSize'));
    switch (this.id) {
    case 'switcher-large':
      num *= 1.4;
      break;
    case 'switcher-small':
      num /= 1.4;
      break;
    default:
      num = parseFloat(defaultSize);
    }
    $speech.animate({
      fontSize: num + 'px'
    }, 'slow');
  });

  var $firstPara = $('p').eq(1);
  $firstPara.hide();
  $('a.more').click(function (event) {
    event.preventDefault();
    $firstPara.animate({
      opacity: 'toggle',
      height: 'toggle'
    }, 'slow');
    var $link = $(this);
    if ($link.text() == 'read more') {
      $link.text('read less');
    } else {
      $link.text('read more');
    }
  });

  $('div.label').click(function () {
    var paraWidth = $('div.speech p').outerWidth();
    var $switcher = $(this).parent();
    var switcherWidth = $switcher.outerWidth();
    $switcher
      .css({
        position: 'relative'
      })
      .fadeTo('fast', 0.5)
      .animate({
        left: paraWidth - switcherWidth
      }, {
        duration: 'slow',
        queue: false
      })
      .fadeTo('slow', 1.0)
      .slideUp('slow', function () {
        $switcher.css({
          backgroundColor: '#f00'
        });
      })
      .slideDown('slow');
  });

  $('p').eq(2)
    .css('border', '1px solid #333')
    .click(function () {
      var $clickedItem = $(this);
      $clickedItem.next().slideDown('slow', function () {
        $clickedItem.slideUp('slow');
      });
    });
  $('p').eq(3).css('backgroundColor', '#ccc').hide();
});


$(document).ready(function () {
  $('body').hide().show('slow');
  $("p").mouseover(function () {
    $(this).css("background-color", "yellow");
  });
  var leftMargin = $('h2').css('margin-left');
  //console.log(leftMargin);
  leftMargin = parseFloat(leftMargin);

  $('h2').click(function () {
    $(this).animate({
      opacity: 0.25,
      "margin-left": '+=25px'
    }).queue(function (next) {
      $('.speech p').css({
        opacity: 0.5
      });
      next();
    });
  });
});

$(document).ready(function () {
  var $switch = $('#switcher');
  $switch.css('position', 'relative');
  $(document).keyup(function (e) {
    if (e.which > 36 && e.which < 41) {
      var dir = e.which;
      switch (dir) {
      case 37:
        $switch.animate({
          left: '-=20px'
        }, {
          duration: 'slow'
        });
        break;
      case 38:
        $switch.animate({
          top: '-=20px'
        }, {
          duration: 'slow'
        });
        break;
      case 39:
        $switch.animate({
          left: '+=20px'
        }, {
          duration: 'slow'
        });
        break;
      case 40:
        $switch.animate({
          top: '+=20px'
        }, {
          duration: 'slow'
        });
        break;
      }
    }
  });
});