$(document).ready(function () {
  $('#selected-plays > li').addClass('horizontal');
  $('#selected-plays li:not(.horizontal)').addClass('sub-level');

  $('a[href^="mailto:"]').addClass('mailto');
  $('a[href$=".pdf"]').addClass('pdflink');
  $('a[href^="http"][href*="henry"]').addClass('henrylink');

  $('a').filter(function () {
    return this.hostname && this.hostname !== location.hostname;
  }).addClass('external');

  $('tr:nth-child(odd)').addClass('alt');
  $('td:contains(Henry)') // Find every cell containing "Henry"
    .parent() // Select its parent
    .find('td:eq(1)') // Find the 2nd descendant cell
      .addClass('highlight') // Add the "highlight" class
    .end() // Return to the parent of the cell containing "Henry"
    .find('td:eq(2)') // Find the 3rd descendant cell
      .addClass('highlight'); // Add the "highlight" class

  $('li li').addClass('special');
  $('tr').find('td:eq(2)').addClass('year');
  $('tr').find('td:contains(Tragedy)').filter('td:eq(0)').addClass('special');
  $('li > a').parent().nextAll().not('li:has(a)').addClass('afterlink');
  $('a[href$=".pdf"').parent().parent().addClass('tragedy');
});
