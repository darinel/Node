$(document).ready(function () {
  // Use attr() to add an id, rel, and title.
  $('div.chapter a[href*="wikipedia"]').attr({
    rel: 'external',
    title: function () {
      return 'Learn more about ' + $(this).text() + ' at Wikipedia.';
    },
    id: function (index, oldValue) {
      return 'wikilink-' + index;
    }
  });

  // Add "back to top" links.
  var $p = $('div.chapter p:eq(2)').nextAll();
  $('<a href="#top">back to top</a>').insertAfter($p);
  $('<a id="top"></a>').prependTo('body');
  $('a[href$="#top"]').click(function () {
    $(this).after($('<p>You were here.</p>'));
  });

  $('div#f-author').click(function () {
    console.log($(this).find('b').length);
    if ($(this).find('b').length) {
      $(this).html('by Edwin A. Abbott');
    } else {
      $(this).wrapInner("<b></b>");
    }
  });
  // Create footnotes.
  var $notes = $('<ol id="notes"></ol>').insertBefore('#footer');
  $('span.footnote').each(function (index) {
    $(this)
      .before([
        '<a href="#footnote-',
        index + 1,
        '" id="context-',
        index + 1,
        '" class="context">',
        '<sup>',
        index + 1,
        '</sup></a>'
      ].join(''))
      .appendTo($notes)
      .append([
        '&nbsp;(<a href="#context-',
        index + 1,
        '">context</a>)'
      ].join(''))
      .wrap('<li id="footnote-' + (index + 1) + '"></li>');
  });

  // Style pull quotes.
  $('span.pull-quote').each(function (index) {
    var $parentParagraph = $(this).parent('p');
    $parentParagraph.css('position', 'relative');

    var $clonedCopy = $(this).clone();
    $clonedCopy
      .addClass('pulled')
      .find('span.drop')
      .html('&hellip;')
      .end()
      .text($clonedCopy.text())
      .prependTo($parentParagraph);
  });

  $('p').each(function () {
    var a = $(this).attr('class');
    if (a) {
      $(this).attr({
        class: a + " inhabitants"
      });
    } else {
      $(this).attr({
        class: "inhabitants"
      });
    }

  });
});