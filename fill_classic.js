(async () => {
  const data = {
    'Name': 'Jennifer Wang',
    'Company': 'Wenzhou iColor Packaging Co.',
    'City': 'Wenzhou',
    'State': 'International',
    'Zip/Postal Code': '325000',
    'Country': 'China',
    'Phone Number': '18358592551',
    'Email': 'daisywong557@gmail.com',
    'Comments': "Hi Classic Packaging Team, I'm Jennifer from Wenzhou iColor Packaging Co., a China-based manufacturer of custom paper bags, gift boxes, and bakery packaging boxes. Serving US distributors since 2008 with FSC-certified materials, full custom OEM, MOQ from 500 units, and 25-35 day lead time to US ports. I'd love to explore whether we could be a complementary production partner. Happy to send our catalog and samples. Best regards, Jennifer | daisywong557@gmail.com | WhatsApp: +86-18358592551 | www.icolorpack.com"
  };

  const rows = Array.from(document.querySelectorAll('tr'));
  for (const row of rows) {
    const labelCell = row.querySelector('td:first-child');
    if (!labelCell) continue;
    const labelText = labelCell.textContent.trim().replace(/\*$/, '').trim();
    const input = row.querySelector('input, textarea');
    if (input && data[labelText]) {
      input.value = data[labelText];
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
  return { success: true };
})()