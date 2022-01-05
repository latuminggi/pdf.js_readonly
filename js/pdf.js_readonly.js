/*  PDF.js Read Only Restriction
 *  @author: Aprillio Latuminggi
 *  @source: https://github.com/latuminggi/pdf.js_readonly
 */

// Read Only Preferences
var disableRghtClck = true; // Disable Right Click,   value: true || false
var disableCopyText = true; // Disable Copy Text,     value: true || false
var disableOpenFile = true; // Disable Open PDF,      value: true || false
var disablePrintPdf = true; // Disable Print PDF,     value: true || false
var disableDownload = true; // Disable Save PDF,      value: true || false
var disablePresents = true; // Disable Presentation,  value: true || false
var disablePrntScrn = true; // Disable Print Screen,  value: true || false (experimental)

// Load Specific viewer.js
if ( disablePrintPdf ) {
  $.getScript( '../../js/viewer_noprint.js' ); // Adjust path to viewer_noprint.js if necessary
} else {
  $.getScript( 'viewer.js' );  // Adjust path to viewer.js if necessary
}

// Stop Print Screen
function stopPrntScr() {
  var inpFld = document.createElement("input");
  inpFld.setAttribute("value", ".");
  inpFld.setAttribute("width", "0");
  inpFld.style.height = "0px";
  inpFld.style.width = "0px";
  inpFld.style.border = "0px";
  document.body.appendChild(inpFld);
  inpFld.select();
  document.execCommand("copy");
  inpFld.remove(inpFld);
}

// Clear Clipboard
function ClearClipboardData() {
  try { window.clipboardData.setData('text', "Access Restricted"); } catch (err) {}
}

// Disable Print Screen Button
document.addEventListener("keyup", function (e) {
  var keyCode = e.keyCode ? e.keyCode : e.which;
  if (keyCode == 44) { if ( disablePrntScrn ) { stopPrntScr(); } }
});

$(document).bind("keyup keydown", function (e) {
  // Disable Copy Text Shortcut (Ctrl + S)
  if ((e.ctrlKey || e.metaKey) && (e.keyCode == 67)) {
    if ( disableCopyText ) {
      alert('Copy text is forbidden!'); e.preventDefault(); ClearClipboardData();
    }
  }
  // Disable Open File Shortcut (Ctrl + O)
  if ((e.ctrlKey || e.metaKey) && (e.keyCode == 79)) {
    if ( disableOpenFile ) {
      alert('Open file is forbidden!'); e.preventDefault(); e.stopImmediatePropagation();
    }
  }
  // Disable Print PDF Shortcut (Ctrl + P)
  if ((e.ctrlKey || e.metaKey) && (e.keyCode == 80)) {
    if ( disablePrintPdf ) {
      alert('Print PDF is forbidden!'); e.preventDefault(); e.stopImmediatePropagation();
    }
  }
  // Disable Save PDF Shortcut (Ctrl + S)
  if ((e.ctrlKey || e.metaKey) && (e.keyCode == 83)) {
    if ( disableDownload ) {
      alert('Download PDF is forbidden!'); e.preventDefault(); e.stopImmediatePropagation();
    }
  }
});

$(document).ready(function() {
  // Clear Print Screen Clipboard
  if ( disablePrntScrn ) {
    setInterval(ClearClipboardData(), 300);
  }
  // Clear Copy Text Clipboard
  if ( disableCopyText ) {
    setInterval(ClearClipboardData(), 300);
  }
  // Disable Right Click (Context Menu)
  if ( disableRghtClck ) {
    $('body').attr('oncontextmenu', 'return false;');
  }
  // Disable Open File Button
  if ( disableOpenFile ) {
    $('#openFile').addClass('hidden'); $('#secondaryOpenFile').addClass('hidden');
  }
  // Disable Print PDF Button
  if ( disablePrintPdf ) {
    $('<style media="print">').text("* {display:none !important}").appendTo(document.head);
    $('#print').addClass('hidden'); $('#secondaryPrint').addClass('hidden');
  }
  // Disable Download Button
  if ( disableDownload ) {
    $('#download').addClass('hidden'); $('#secondaryDownload').addClass('hidden');
  }
  // Disable Presentation Button
  if ( disablePresents ) {
    $('#presentationMode').addClass('hidden'); $('#secondaryPresentationMode').addClass('hidden');
  }
});
