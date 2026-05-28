(function() {
    const results = Array.from(document.querySelectorAll('div.g'));
    const ads = Array.from(document.querySelectorAll('div.commercial-unit-desktop-top, div.commercial-unit-desktop-rhs, [data-text-ad]'));
    const target = 'icolorpacks.com';
    let position = -1;
    
    // Find in organic results
    const links = Array.from(document.querySelectorAll('a[data-ved]')).map(a => a.href);
    const uniqueLinks = [...new Set(links)].filter(link => link.startsWith('http') && !link.includes('google.com'));
    
    for (let i = 0; i < uniqueLinks.length; i++) {
        if (uniqueLinks[i].includes(target)) {
            position = i + 1;
            break;
        }
    }
    
    return {
        targetFound: position !== -1,
        position: position,
        topLinks: uniqueLinks.slice(0, 30)
    };
})();