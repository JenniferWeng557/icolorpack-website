(function () {
    var nav = document.querySelector('nav.icp-responsive-nav');
    if (!nav) return;

    var toggle = nav.querySelector('.mobile-menu-toggle');
    var menu = nav.querySelector('.nav-links');
    var mobileQuery = window.matchMedia('(max-width: 960px)');
    if (!toggle || !menu) return;

    function closeSubmenus() {
        nav.querySelectorAll('.dropdown.is-open').forEach(function (item) {
            item.classList.remove('is-open');
            var trigger = item.querySelector('.dropbtn');
            if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
    }

    function closeMenu() {
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
        closeSubmenus();
    }

    toggle.addEventListener('click', function () {
        var opening = !menu.classList.contains('active');
        menu.classList.toggle('active', opening);
        toggle.setAttribute('aria-expanded', String(opening));
        toggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
        if (!opening) closeSubmenus();
    });

    nav.querySelectorAll('.dropdown > .dropbtn').forEach(function (trigger) {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.addEventListener('click', function (event) {
            if (!mobileQuery.matches) return;
            event.preventDefault();

            var item = trigger.closest('.dropdown');
            var opening = !item.classList.contains('is-open');
            closeSubmenus();
            item.classList.toggle('is-open', opening);
            trigger.setAttribute('aria-expanded', String(opening));
        });
    });

    menu.querySelectorAll('a:not(.dropbtn)').forEach(function (link) {
        link.addEventListener('click', function () {
            if (mobileQuery.matches) closeMenu();
        });
    });

    document.addEventListener('click', function (event) {
        if (mobileQuery.matches && !nav.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
        if (!mobileQuery.matches) closeMenu();
    });
})();
