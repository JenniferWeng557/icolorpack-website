/**
 * icolorpacks-universal-fix.js
 * ------------------------------------------------------
 * 用途:修复 industries 系列页面上"WhatsApp悬浮图标 / "+"询盘按钮
 *      巨大化"以及"文件上传后文件名不显示"的问题。
 *
 * 特点:
 *  - 不依赖 clean_industries.js / sync_industries.py 等生成脚本
 *  - 不需要重新生成任何页面文件
 *  - 对页面原有 HTML 结构没有要求，无论页面新旧版本都能生效
 *  - 找不到对应元素时会安静跳过，不会报错、不会影响其他内容
 *
 * 部署方式(任选其一):
 *  A) 加到网站公共 footer 模板里，一次性全站生效：
 *     <script src="/js/icolorpacks-universal-fix.js"></script>
 *     放在 </body> 之前
 *  B) 如果暂时没有公共 footer 模板，就在每个 industries 页面的
 *     </body> 前手动加这一行 <script> 引用
 * ------------------------------------------------------
 */
(function () {
  "use strict";

  function fixFloatingIcons() {
    // 1. WhatsApp 悬浮按钮 —— 通过 href 包含 wa.me 定位，不依赖 class 名
    document.querySelectorAll('a[href*="wa.me"]').forEach(function (btn) {
      // 排除页面正文里普通的 WhatsApp 文字链接（比如footer里的号码），
      // 只处理明显是"悬浮按钮"的：没有可见文字，只包含一个svg/img
      var hasOnlyIcon = btn.children.length > 0 &&
        btn.textContent.trim().length === 0;
      if (!hasOnlyIcon) return;

      btn.style.setProperty("position", "fixed", "important");
      btn.style.setProperty("bottom", "35px", "important");
      btn.style.setProperty("left", "35px", "important");
      btn.style.setProperty("width", "55px", "important");
      btn.style.setProperty("height", "55px", "important");
      btn.style.setProperty("border-radius", "50%", "important");
      btn.style.setProperty("background", "#25D366", "important");
      btn.style.setProperty("display", "flex", "important");
      btn.style.setProperty("align-items", "center", "important");
      btn.style.setProperty("justify-content", "center", "important");
      btn.style.setProperty("overflow", "hidden", "important");
      btn.style.setProperty("z-index", "2000", "important");

      var icon = btn.querySelector("svg, img");
      if (icon) {
        icon.style.setProperty("width", "32px", "important");
        icon.style.setProperty("height", "32px", "important");
        icon.style.setProperty("max-width", "none", "important");
        icon.style.setProperty("flex-shrink", "0", "important");
      }
    });

    // 2. "+" 询盘按钮 —— 通过 onclick 包含 toggleModal / void(0) 定位
    var plusSelectors = [
      '[onclick*="toggleModal"]',
      '[onclick*="void(0)"]',
      ".floating-quote-container",
      ".floating-quote"
    ];
    document.querySelectorAll(plusSelectors.join(",")).forEach(function (btn) {
      // 只处理"悬浮圆形按钮"型的，跳过普通导航栏里的文字按钮
      var isTextButton = btn.tagName === "A" && btn.textContent.trim().length > 0 &&
        btn.closest("nav");
      if (isTextButton) return;

      var icon = btn.querySelector("svg, img");
      if (!icon) return; // 没有图标的普通按钮不处理，避免误伤导航栏

      btn.style.setProperty("position", "fixed", "important");
      btn.style.setProperty("bottom", "35px", "important");
      btn.style.setProperty("right", "35px", "important");
      btn.style.setProperty("width", "55px", "important");
      btn.style.setProperty("height", "55px", "important");
      btn.style.setProperty("border-radius", "50%", "important");
      btn.style.setProperty("background", "#C9A84C", "important");
      btn.style.setProperty("display", "flex", "important");
      btn.style.setProperty("align-items", "center", "important");
      btn.style.setProperty("justify-content", "center", "important");
      btn.style.setProperty("overflow", "hidden", "important");
      btn.style.setProperty("cursor", "pointer", "important");
      btn.style.setProperty("z-index", "2000", "important");

      icon.style.setProperty("width", "28px", "important");
      icon.style.setProperty("height", "28px", "important");
      icon.style.setProperty("max-width", "none", "important");
      icon.style.setProperty("flex-shrink", "0", "important");
    });
  }

  function fixUploadFilenameDisplay() {
    // 找到所有文件上传输入框，无论它在主表单还是弹窗里
    document.querySelectorAll('input[type="file"]').forEach(function (input) {
      if (input.dataset.icpFixed) return; // 避免重复绑定
      input.dataset.icpFixed = "1";

      // 找离它最近的、看起来像"提示文字"的元素
      // 优先找同一个容器里包含 "upload" 或 "No file" 字样的 <p>
      var container = input.closest("div") || input.parentElement;
      var label = null;
      if (container) {
        label = Array.from(container.querySelectorAll("p, span")).find(function (el) {
          var t = el.textContent.toLowerCase();
          return t.indexOf("upload") !== -1 || t.indexOf("no file") !== -1;
        });
      }
      if (!label) return; // 找不到就不处理，避免误改无关内容

      input.addEventListener("change", function () {
        if (input.files && input.files.length > 0) {
          label.textContent = "Selected: " + input.files[0].name;
          label.style.setProperty("color", "#C9A84C", "important");
        }
      });
    });
  }

  function init() {
    fixFloatingIcons();
    fixUploadFilenameDisplay();
  }

  // 页面加载完立即修一次
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // 有些弹窗内容是点击后才插入DOM的，用 MutationObserver 兜底，
  // 弹窗内容变化时也重新检查一次（性能开销极低）
  var observer = new MutationObserver(function () {
    fixFloatingIcons();
    fixUploadFilenameDisplay();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
