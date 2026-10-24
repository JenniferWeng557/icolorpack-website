const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const descriptions = {
  '2026-custom-inserts-luxury-paper-gift-boxes.html': 'Learn how custom inserts protect products, improve presentation and support a more reliable approval process for luxury rigid gift box projects.',
  '2026-eco-conscious-loyalty-paper-shopping-bags.html': 'Explore how paper choice, durability and documented sustainability requirements shape custom shopping bags for retail brands and repeat customers.',
  '2026-high-volume-retail-efficiency-paper-shopping-bags.html': 'Review paper bag strength, reinforcement, handle choices and packing efficiency for high-volume retail and wholesale packaging programs.',
  '2026-limited-edition-strategies-paper-gift-boxes.html': 'Plan limited-edition paper gift boxes with controlled quantities, finishes, sampling and production timing for seasonal brand launches.',
  '2026-moisture-resistant-luxury-cake-boxes.html': 'Compare board, coating, ventilation and structure decisions for custom cake boxes exposed to moisture, refrigeration and delivery handling.',
  '2026-multi-sensory-unboxing-paper-gift-boxes.html': 'Learn how texture, structure, opening sequence and inserts influence the unboxing experience of custom paper gift boxes.',
  '2026-paper-density-rigid-gift-boxes.html': 'Understand how greyboard thickness, wrap paper and box dimensions affect strength, appearance and cost in custom rigid gift boxes.',
  '2026-psychology-of-color-paper-shopping-bags.html': 'Plan color, print and finish choices for custom paper shopping bags while protecting brand consistency across production batches.',
  '2026-seasonal-packaging-psychology-paper-gift-boxes.html': 'Prepare seasonal custom gift box projects with realistic sampling, artwork approval, production and delivery milestones.',
  '2026-stackability-engineering-custom-cake-boxes.html': 'Review cake box dimensions, board strength, inserts and stacking requirements for bakery transport and high-volume delivery.',
  '2026-sustainability-checklist-paper-shopping-bags.html': 'Use this sourcing checklist to compare paper, recycled content, coatings, handles and documentation for custom shopping bag projects.',
  '2026-visual-branding-custom-cake-boxes.html': 'Coordinate color, logo placement, windows and finishes across custom cake boxes and bakery packaging collections.',
  '2026-visual-theater-retail-display-cake-boxes.html': 'Learn how windows, structure and display orientation affect product visibility and protection in custom bakery boxes.',
  'factory-audit-survival-guide-china-packaging.html': 'Prepare a packaging supplier audit by reviewing documents, production controls, quality records, traceability and corrective actions.',
  'haptic-textures-sensory-minimalism-luxury-packaging.html': 'Compare textured papers, coatings and finishing methods for tactile luxury packaging without compromising production consistency.',
  'mono-material-circular-rigid-gift-boxes-2026.html': 'Explore mono-material rigid box design choices, separation challenges and documentation questions for more circular packaging projects.'
};

const blogRoots = [path.join(root, 'blog'), path.join(root, 'public', 'blog')];
let descriptionsFixed = 0;
let brokenStylesRemoved = 0;

for (const blogRoot of blogRoots) {
  if (!fs.existsSync(blogRoot)) continue;
  for (const filename of fs.readdirSync(blogRoot).filter((name) => name.endsWith('.html'))) {
    const full = path.join(blogRoot, filename);
    const input = fs.readFileSync(full, 'utf8');
    let output = input.replace(/\s*<link[^>]+href=["'][^"']*assets\/rollback_main\.css[^"']*["'][^>]*>\s*/gi, '\n');
    if (output !== input) brokenStylesRemoved += 1;

    if (descriptions[filename]) {
      const repaired = output.replace(
        /<meta\s+name=["']description["']\s+content=["']>\s*/i,
        '<meta name="description" content="' + descriptions[filename] + '">\n'
      );
      if (repaired !== output) descriptionsFixed += 1;
      output = repaired;
    }

    if (output !== input) fs.writeFileSync(full, output, 'utf8');
  }
}

console.log(JSON.stringify({ descriptionsFixed, brokenStylesRemoved }, null, 2));
