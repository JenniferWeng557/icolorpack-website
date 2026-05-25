(async () => {
  try {
    const res = await fetch('https://www.accio.com/work/api/share/qnN4nRsVwbn4');
    const json = await res.json();
    
    const findInObj = (obj) => {
      if (typeof obj === 'string' && obj.includes('index.html') && obj.includes('<!DOCTYPE html>')) return obj;
      if (obj && typeof obj === 'object') {
        for (let k in obj) {
          try {
            const r = findInObj(obj[k]);
            if (r) return r;
          } catch(e) {}
        }
      }
      return null;
    };
    
    const html = findInObj(json);
    if (html) {
      return { found: true, length: html.length, content: html };
    }
    
    // Fallback: look for file objects
    const findFile = (obj) => {
       if (obj && obj.name === 'index.html' && obj.content) return obj.content;
       if (obj && typeof obj === 'object') {
         for (let k in obj) {
           try {
             const r = findFile(obj[k]);
             if (r) return r;
           } catch(e) {}
         }
       }
       return null;
    };
    
    const html2 = findFile(json);
    if (html2) return { found: true, length: html2.length, content: html2 };

    return { found: false, data: json };
  } catch (e) {
    return { error: e.message };
  }
})()