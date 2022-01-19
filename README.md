# PDF.js Read Only
[PDF.js Read Only](https://github.com/latuminggi/pdf.js_readonly) is an additional readonly mode for [PDF.js](https://mozilla.github.io/pdf.js), a Portable Document Format (PDF) viewer that is built with HTML5 which is community-driven and supported by Mozilla.

Its purpose to make PDF.js viewer to be readonly mode, including disable right click on mouse (context menu) and several hotkeys (keyboard shortcut) such as: 
* `Ctrl + C` (Copy Text)
* `Ctrl + O` (Open PDF)
* `Ctrl + P` (Print PDF)
* `Ctrl + S` (Save PDF)
* `PrtSc` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Print Screen) (experimental)

## Demo
<details>
<summary>A. Desktop</summary>

  1. PDF.js without read only &nbsp;[`/generic/web/viewer.html`](https://latuminggi.github.io/pdf.js_readonly/generic/web/viewer.html)
  2. If using PDF.js Read Only [`/generic/web/viewer_readonly.html`](https://latuminggi.github.io/pdf.js_readonly/generic/web/viewer_readonly.html)
</details>

<details>
<summary>B. Mobile</summary>

  1. PDF.js without read only &nbsp;[`/mobile-viewer/viewer.html`](https://latuminggi.github.io/pdf.js_readonly/mobile-viewer/viewer.html)
  2. If using PDF.js Read Only [`/mobile-viewer/viewer_readonly.html`](https://latuminggi.github.io/pdf.js_readonly/mobile-viewer/viewer_readonly.html)
</details>

<details>
<summary>C. Test</summary>

  1. PDF.js iframe read only &nbsp;&nbsp;&nbsp;[`/test/iframe_readonly.html`](https://latuminggi.github.io/pdf.js_readonly/test/iframe_readonly.html)
  2. PDF.js mobile responsive [`/test/mobile_responsive.html`](https://latuminggi.github.io/pdf.js_readonly/test/mobile_responsive.html)
  3. PDF.js desktop mobile &nbsp;&nbsp;&nbsp;&nbsp;[`/test/desktop_mobile.html`](https://latuminggi.github.io/pdf.js_readonly/test/desktop_mobile.html)
</details>

## How To Use
<details>
<summary>A. Desktop</summary>

&nbsp;&nbsp;&nbsp;&nbsp;Support Password Protected PDF

1. [`/generic/web/viewer_readonly.html`](https://github.com/latuminggi/pdf.js_readonly/blob/master/generic/web/viewer_readonly.html#L40)\
adjustment in `viewer_readonly.html`
    ```html
    <!-- PDF.js Read Only Adjustment -->
    <!-- <script src="viewer.js"></script> --> <!-- you need to comment or remove this line -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script> <!-- adjust your jquery if necessary -->
    <script src="../../js/pdf.js_readonly.js"></script> <!-- adjust path to pdf.js_readonly.js -->
    ```

2. [`/js/pdf.js_readonly.js`](https://github.com/latuminggi/pdf.js_readonly/blob/master/js/pdf.js_readonly.js#L6)\
adjustment in `pdf.js_readonly.js`
    ```js
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
    ```

3. [`/js/viewer_noprint.js`](https://github.com/latuminggi/pdf.js_readonly/blob/master/js/viewer_noprint.js#L15388)\
modification from [`viewer.js`](https://github.com/latuminggi/pdf.js_readonly/blob/master/generic/web/viewer.js#L15372)
    ```js
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
    Note: If you want to create `viewer_noprint.js` on your own from `viewer.js` file of your current PDF.js version, make sure those lines above (or some codes like that) are commented.

4. [`/js/viewer_noprint.js`](https://github.com/latuminggi/pdf.js_readonly/blob/master/js/viewer_noprint.js#L75)
    * to `protect` PDF file source
    ```js
    // value: "compressed.tracemonkey-pldi-09.pdf",
    /*  Modified for PDF.js Read Only
     *  It's better to NOT having .PDF extension in the end of file name
     *  This can avoid like IDM to sniff PDF file type automatically download
     *  You also can protect PDF file source from direct access using .htaccess
     *  Or you can never reveal its original file name such as encoding it first!
     */
    value: "compressed.tracemonkey-pldi-09",
    ```
    * to `allow` access PDF file from different domain
    ```js
    const HOSTED_VIEWER_ORIGINS = ["null", "http://mozilla.github.io", "https://mozilla.github.io", "https://yourdomain.here"];
    ```
    and makesure the PDF file webserver has HTTP Header `Access-Control-Allow-Origin`, allowing PDF.js viewer domain
    ```http
    Access-Control-Allow-Origin: http(s)://yourPDFjsViewerDomain.here
    ```

5. [`/generic/web/viewer_readonly.html`](https://github.com/latuminggi/pdf.js_readonly/blob/master/generic/web/viewer_readonly.html#L292)\
adjustment in `viewer_readonly.html` for custom progress document loading
    ```html
    <!-- PDF.js Read Only Adjustment --> 
    <!-- Custom Progress Document Loading --> 
    <div id="customProgress" style="text-align:center;background:#FDFDFB;min-height:95vh">
      <img src="https://latuminggi.github.io/pdf.js_readonly/img/documentLoading.gif" /> 
    </div> 
    ```
    including adjustment in `/js/viewer_noprint.js` as you can see on this [commit diff](https://github.com/latuminggi/pdf.js_readonly/commit/ff7f2813926b07e1dc3b3272636fc28507c10761#diff-d917cf747bd335be8419f879b7221f135ab2836e4273276a0c582ff59a5a22c8)

6. [`/generic/web/viewer_readonly.html`](https://github.com/latuminggi/pdf.js_readonly/blob/master/generic/web/viewer_readonly.html)\
to access `file` from query string (directly from URL)
    ```html
    /generic/web/viewer_readonly.html?file={filename.pdf}
    ```
    For example: [`/generic/web/viewer_readonly.html?file=compressed.tracemonkey-pldi-09.pdf`](https://latuminggi.github.io/pdf.js_readonly/generic/web/viewer_readonly.html?file=compressed.tracemonkey-pldi-09.pdf)
    ```html
    /generic/web/viewer_readonly.html?file={filename}
    ```
    For example: [`/generic/web/viewer_readonly.html?file=compressed.tracemonkey-pldi-09`](https://latuminggi.github.io/pdf.js_readonly/generic/web/viewer_readonly.html?file=compressed.tracemonkey-pldi-09)
    ```html
    /generic/web/viewer_readonly.html?file={http(s)://example.com/filename(.pdf)}
    ```
    For example: [`/generic/web/viewer_readonly.html?file=https://latuminggi.github.io/pdf.js_readonly/generic/web/compressed.tracemonkey-pldi-09`](https://latuminggi.github.io/pdf.js_readonly/generic/web/viewer_readonly.html?file=https://latuminggi.github.io/pdf.js_readonly/generic/web/compressed.tracemonkey-pldi-09)
</details>
<details>
<summary>B. Mobile</summary>

&nbsp;&nbsp;&nbsp;&nbsp;NO Support for Password Protected PDF

1. [`/mobile-viewer/viewer_readonly.html`](https://github.com/latuminggi/pdf.js_readonly/blob/master/mobile-viewer/viewer_readonly.html#L82)\
adjustment in `viewer_readonly.html`
    ```html
    <!-- PDF.js Read Only Adjustment -->
    <!-- <script src="viewer.js"></script> --> <!-- you need to comment or remove this line -->
    <script src="viewer_mod.js"></script> <!-- adjust path to viewer_mod.js -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script> <!-- adjust your jquery if necessary -->
    <script src="../js/pdf.js_mobile_readonly.js"></script> <!-- adjust path to pdf.js_mobile_readonly.js -->
    ```
    Note: if you want to enable cache canvas on mobile viewer, you can adjust these [lines](https://github.com/latuminggi/pdf.js_readonly/blob/master/mobile-viewer/viewer_readonly.html#L27)
    ```html
    <!-- PDF.js Read Only Adjustment -->
    <!-- <script src="build/pdf.min.js"></script> --> <!-- use pdf(.min).js to enable cache canvas on mobile -->
    <script src="build/pdf_mod.min.js"></script> <!-- use pdf_mod(.min).js to disable cache canvas on mobile -->
    ```
    and if you want to access PDF file from different domain, makesure the PDF file webserver has HTTP Header `Access-Control-Allow-Origin`, allowing PDF.js viewer domain
    ```http
    Access-Control-Allow-Origin: http(s)://yourPDFjsViewerDomain.here
    ```
2. [`/js/pdf.js_mobile_readonly.js`](https://github.com/latuminggi/pdf.js_readonly/blob/master/js/pdf.js_mobile_readonly.js#L6)\
adjustment in `pdf.js_mobile_readonly.js`
    ```js
    // Read Only Preferences
    var disableRghtClck = true; // Disable Right Click,   value: true || false
    var disableCopyText = true; // Disable Copy Text,     value: true || false
    var disableOpenFile = true; // Disable Open PDF,      value: true || false
    var disablePrintPdf = true; // Disable Print PDF,     value: true || false
    var disableDownload = true; // Disable Save PDF,      value: true || false
    var disablePrntScrn = true; // Disable Print Screen,  value: true || false (experimental)
    ```

3. [`/mobile-viewer/viewer_mod.js`](https://github.com/latuminggi/pdf.js_readonly/blob/master/mobile-viewer/viewer_mod.js)\
modification from [`viewer.js`](https://github.com/latuminggi/pdf.js_readonly/blob/master/mobile-viewer/viewer.js)\
    there are 2 [differences](https://editor.mergely.com/JBKUuwzG)
    * [first](https://github.com/latuminggi/pdf.js_readonly/blob/master/mobile-viewer/viewer_mod.js#L25): To enable PDF large image size
    ```js
    /*  Modified for PDF.js Read Only
     *  To enable PDF large image size
     */
    // const MAX_IMAGE_SIZE = 1024 * 1024; // Limited Max Image Size
    const MAX_IMAGE_SIZE = false; // Unlimited Max Image Size
    ```
    * [second](https://github.com/latuminggi/pdf.js_readonly/blob/master/mobile-viewer/viewer_mod.js#L36): To enable get query string of `file` or using default PDF file
    ```js
    /*  Modified for PDF.js Read Only
     *  To enable get query string of file
     *  How can I get query string values in JavaScript? https://stackoverflow.com/a/901144/17754812
     */
    function getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex   = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    /*  Modified for PDF.js Read Only
     *  To get query string of file or using default PDF file
     */
    // const DEFAULT_URL = "web/compressed.tracemonkey-pldi-09.pdf";
    // Get PDF file whether from "DEFAULT_URL" or "file" query string
    var file = getParameterByName('file');
    const DEFAULT_URL = (file === null || file === "") ? "web/compressed.tracemonkey-pldi-09" : file;
    ```
    Note: If you want to create `viewer_mod.js` on your own from `viewer.js` file of your current PDF.js version, make sure those lines above (or some codes like that) are adjusted.

4. [`/mobile-viewer/build/pdf_mod.js`](https://github.com/latuminggi/pdf.js_readonly/blob/master/mobile-viewer/build/pdf_mod.js#L5091)\
modification from [`pdf.js`](https://github.com/latuminggi/pdf.js_readonly/blob/master/mobile-viewer/build/pdf.js#L5091)
    ```js
    if (this.cache[id] !== undefined) {
      /*  Modified for PDF.js Read Only
       *  To disable cache canvas on mobile
       */
      /* canvasEntry = this.cache[id]; */
      canvasEntry = this.canvasFactory.create(width, height);
      this.canvasFactory.reset(canvasEntry, width, height);
      canvasEntry.context.setTransform(1, 0, 0, 1, 0, 0);
    }
    ```
    Note: If you want to create `pdf_mod.js` on your own from `pdf.js` file of your current PDF.js version, make sure those lines above (or some codes like that) are adjusted.

5. [`/mobile-viewer/viewer_readonly.html`](https://github.com/latuminggi/pdf.js_readonly/blob/master/mobile-viewer/viewer_readonly.html#L47)\
adjustment in `viewer_readonly.html` for custom progress document loading
    ```html
    <!-- PDF.js Read Only Adjustment --> 
    <!-- Custom Progress Document Loading --> 
    <div id="customProgress" style="text-align:center;background:#FFF;min-height:95vh"> 
      <img src="https://latuminggi.github.io/pdf.js_readonly/img/documentLoadingMobile.gif" width="100%" /> 
    </div> 
    ```
    including adjustment in `/mobile-viewer/viewer_mod.js` as you can see on this [commit diff](https://github.com/latuminggi/pdf.js_readonly/commit/8172737b07b790ac539c0de3499426b2f818ea9c#diff-3569e15944e90b9f9472e96748e81101934df2e8297fd284c3d78f7c4e3c7ab2)

6. [`/mobile-viewer/viewer_readonly.html`](https://github.com/latuminggi/pdf.js_readonly/blob/master/mobile-viewer/viewer_readonly.html)\
to access `file` from query string (directly from URL)
    ```html
    /mobile-viewer/viewer_readonly.html?file=path_to/{filename.pdf}
    ```
    For example: [`/mobile-viewer/viewer_readonly.html?file=web/compressed.tracemonkey-pldi-09.pdf`](https://latuminggi.github.io/pdf.js_readonly/mobile-viewer/viewer_readonly.html?file=web/compressed.tracemonkey-pldi-09.pdf)
    ```html
    /mobile-viewer/viewer_readonly.html?file=path_to/{filename}
    ```
    For example: [`/mobile-viewer/viewer_readonly.html?file=web/compressed.tracemonkey-pldi-09`](https://latuminggi.github.io/pdf.js_readonly/mobile-viewer/viewer_readonly.html?file=web/compressed.tracemonkey-pldi-09)
    ```html
    /mobile-viewer/viewer_readonly.html?file={http(s)://example.com/filename(.pdf)}
    ```
    For example: [`/mobile-viewer/viewer_readonly.html?file=https://latuminggi.github.io/pdf.js_readonly/generic/web/compressed.tracemonkey-pldi-09`](https://latuminggi.github.io/pdf.js_readonly/mobile-viewer/viewer_readonly.html?file=https://latuminggi.github.io/pdf.js_readonly/generic/web/compressed.tracemonkey-pldi-09)
</details>

## How To Protect PDF file(s) from Direct Access
<details>
<summary>A. Apache</summary>

```apacheconf
RewriteEngine on 
# only allow from following domain(s):
RewriteCond %{HTTP_REFERER} !^http://(www\.)?example.com*$ [NC] 
RewriteRule \.(pdf)$ - [F]
```
</details>

<details>
<summary>B. Nginx</summary>

```ini
server {
  ...

  location ~* \.(pdf)$ {
    # only allow from following domain(s):
    valid_referers example.com www.example.com;

    if ($invalid_referer) {
      return 403;
    }
  }

  ...
}
```
</details>

<details>
<summary>C. PHP</summary>

```php
<?php
$file = '/path/to/file.pdf';
// only allow if specific cookie(s) available, for example:
if ( isset( $_COOKIE['yourCookie'] ) && $_COOKIE['yourCookie'] === 'yourCookieValue' ) {
  // only allow from following domain(s), for example:
  if ( isset( $_SERVER['HTTP_REFERER'] ) && strpos( $_SERVER['HTTP_REFERER'], 'example.com' ) ) {
    if ( file_exists($file) ) {
      header('Access-Control-Allow-Origin: http(s)://example.com');
      /*  use HTTP header Content-Type application/octet-stream instead application/pdf
       *  this can avoid like IDM to sniff PDF file with mime type application/pdf
       *  and makesure the URL you create does NOT have .pdf extension in the end 
       */
      header('Content-Type: application/octet-stream');
      header('Content-Length: '. filesize($file));
      header('Cache-Control: no-cache');
      header('Pragma: no-cache');
      readfile($file);
      exit;
    }
  }
}
```
</details>