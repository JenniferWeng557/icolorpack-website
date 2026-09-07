(function() {
    // Some legacy pages load this script without the matching stylesheet.
    // Load it here as a fallback so the controls are consistent site-wide.
    if (!document.querySelector('link[href*="icp-final-floating-fix.css"]')) {
      var stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = '/icp-final-floating-fix.css?v=20260907';
      document.head.appendChild(stylesheet);
    }

    // Prevent double injection
    if (document.querySelector('.icp-floating-actions')) return;

    var WA_URL = "https://wa.me/8618058355198?text=Hello%20iColorPacks%2C%20I%20would%20like%20to%20request%20a%20custom%20packaging%20quote.";
    
    var html = `
    <div class="icp-floating-actions">
      <button class="icp-float-plus" type="button" aria-label="Open inquiry form" onclick="if(typeof toggleModal==='function'){toggleModal()}else{window.location.href='${WA_URL}'}">
        +
      </button>
      <a class="icp-float-whatsapp" href="${WA_URL}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.031 2c-5.514 0-9.989 4.471-9.989 9.972 0 1.765.438 3.424 1.213 4.887L1.93 22.015l5.314-1.393c1.4.738 2.99 1.157 4.787 1.157 5.514 0 9.989-4.471 9.989-9.972s-4.475-9.972-9.989-9.972zm5.728 14.17c-.244.685-1.42 1.258-2.006 1.341-.571.082-1.36.195-1.871-.118-.51-.314-1.162-.489-1.871-.625-2.981-1.288-4.928-4.289-5.077-4.487-.148-.199-1.213-1.612-1.213-3.074 0-1.463.768-2.182 1.04-2.479.272-.298.594-.372.792-.372.199 0 .397.002.57.01.182.01.427-.069.669.51.247.595.916 2.058.991 2.207.075.149.124.322.025.52-.099.199-.149.324-.298.497-.148.173-.312.387-.446.52-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.199.743-.867.94-1.164.199-.298.397-.249.67-.15.272.099 1.733.818 2.03.967.297.15.471.223.57.347.075.124.075.719-.173 1.413z"/>
        </svg>
      </a>
    </div>`;
    
    var div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);
})();
