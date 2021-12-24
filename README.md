# PDF.js Read Only
[PDF.js Read Only](https://github.com/latuminggi/pdf.js_readonly) is an additional readonly mode for [PDF.js](https://mozilla.github.io/pdf.js), a Portable Document Format (PDF) viewer that is built with HTML5 which is community-driven and supported by Mozilla.

## Demo
1. PDF.js without read only [latuminggi.github.io/pdf.js_readonly/generic/web/viewer.html](https://latuminggi.github.io/pdf.js_readonly/generic/web/viewer.html)
2. PDF.js using PDF.js Read Only [latuminggi.github.io/pdf.js_readonly/generic/web/viewer_readonly.html](https://latuminggi.github.io/pdf.js_readonly/generic/web/viewer_readonly.html)

## How to use
1. [generic/web/viewer_readonly.html](https://github.com/latuminggi/pdf.js_readonly/blob/master/generic/web/viewer_readonly.html#L40)\
adjustment in viewer_readonly.html
    ```
    <!-- PDF.js Read Only Adjustment -->
    <!-- <script src="viewer.js"></script> --> <!-- you need to comment or remove this line -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script> <!-- adjust your jquery if necessary -->
    <script src="../../js/pdfjs_readonly.js"></script> <!-- adjust path to pdfjs_readonly.js -->
    ```
2. [js/pdfjs_readonly.js](https://github.com/latuminggi/pdf.js_readonly/blob/master/js/pdfjs_readonly.js#L5)\
adjustment in pdfjs_readonly.js
    ```
    // Read Only Preferences
    var disableRghtClck = true; // Disable Right Click,   value: true || false
    var disableCopyText = true; // Disable Copy Text,     value: true || false
    var disableOpenFile = true; // Disable Open PDF,      value: true || false
    var disablePrintPdf = true; // Disable Print PDF,     value: true || false
    var disableDownload = true; // Disable Save PDF,      value: true || false
    var disablePrntScrn = true; // Disable Print Screen,  value: true || false (experimental)
    
    // Load Specific viewer.js
    if ( disablePrintPdf ) {
      $.getScript( '../../js/viewer_noprint.js' ); // Adjust path to viewer_noprint.js if necessary
    } else {
      $.getScript( 'viewer.js' );  // Adjust path to viewer.js if necessary
    }
    ```
3. [js/viewer_noprint.js](https://github.com/latuminggi/pdf.js_readonly/blob/master/js/viewer_noprint.js#L15372)\
modification from [viewer.js](https://github.com/latuminggi/pdf.js_readonly/blob/master/generic/web/viewer.js#L15372)
    ```
    /*  Modified for PDF.js Read Only
     *  To disable print overlay
     */
    /* window.addEventListener("keydown", function (event) {
      if (event.keyCode === 80 && (event.ctrlKey || event.metaKey) && !event.altKey && (!event.shiftKey || window.chrome || window.opera)) {
        window.print();
        event.preventDefault();
    
        if (event.stopImmediatePropagation) {
          event.stopImmediatePropagation();
        } else {
          event.stopPropagation();
        }
      }
    }, true); */
    ```
    If you want to create viewer_noprint.js from viewer.js file of your current PDF.js version, make sure those lines above are commented.