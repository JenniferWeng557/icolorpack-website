const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const files = execFileSync('git', ['ls-files', '*.html'], { cwd: root, encoding: 'utf8' })
  .split(/\r?\n/)
  .filter(Boolean)
  .filter((file) => file.replace(/\\/g, '/') !== 'temp.html');

const replacements = [
  [/Share quantity, dimensions, destination and target date for a project review\./gi,
    'Free sample available &middot; Reply within 2 hours.'],
  [/Sampling options available\s*(?:&middot;|·)\s*Share destination and target date/gi,
    'Free sample available &middot; Reply within 2 hours'],
  [/Engineering unboxing excellence since 2011\./gi,
    'Supporting specification-based custom packaging projects for global B2B buyers.'],
  [/Specializing in rigid gift boxes since 2011\./gi,
    'Supporting custom rigid box and paper packaging projects.'],
  [/<h4([^>]*)>Sampling Options<\/h4>/gi, '<h4$1>Free Samples</h4>'],
  [/<p([^>]*)>Absolutely\. iColorPacks provides free structural dieline files and 3D mockups within 24 hours to help you visualize your design before production\.<\/p>/gi,
    '<p$1>Structural dielines and visual mockup options can be reviewed after the box size, quantity, artwork status and production method are confirmed.</p>'],
  [/<p>Our standard production time is 12-18 business days after sample approval\. Air shipping takes 5-7 days, while DDP ocean shipping takes 25-35 days\.<\/p>/gi,
    '<p>Sampling, production and freight timing are confirmed separately after the structure, material, finish, quantity, destination and approval route are known.</p>'],
  [/<p>Yes\. We provide 48h physical sampling\. If you provide your artwork, we can ship a production-grade sample within 3-5 days\.<\/p>/gi,
    '<p>Physical sampling is available. The sample type and timing are confirmed after reviewing the structure, dimensions, material, finish and artwork status.</p>'],
  [/<p>Absolutely\. We provide free 3D mockups and structural design support for all wholesale orders\.<\/p>/gi,
    '<p>Structural and visual design support can be reviewed according to the project stage, dimensions, artwork and production requirements.</p>'],
  [/<td>Sample: 3-5 days \| Mass Production: 12-18 days<\/td>/gi,
    '<td>Confirmed after specification, sample route, quantity and production schedule review</td>'],
  [/<td>Est\. \$0\.65 - \$4\.50 \(Depends on size, quantity & finishing\)<\/td>/gi,
    '<td>Quoted from confirmed size, material, quantity, insert, print, finish and packing method</td>'],
  [/Get a free structural design consultation and quote from our Wenzhou facility within 24 hours\./gi,
    'Send your dimensions, quantity, artwork status, destination and target date for a specification review.'],
  [/iColorPacks supports low MOQ from 100 pcs, free 3D mockups and 12-18 day production\./gi,
    'MOQ, design support and production timing are confirmed from the final project specification.'],
  [/Low MOQ from 100 pcs · Free 3D Mockup · 12-18 Day Production · FSC \/ ISO Certified · Global DDP Shipping/gi,
    'MOQ · Sampling · Production · Documentation · Freight — confirmed by project specification'],
  [/selected custom packaging projects can start from 100 pcs, with standard production usually taking 12-18 days after artwork and sample approval/gi,
    'MOQ and production timing are confirmed after the structure, material, finish, quantity, artwork and sample route are reviewed'],
  [/At iColorPacks, selected custom packaging projects can start from <strong>100 pcs<\/strong>, depending on product type, material, finishing and production schedule\./gi,
    'At iColorPacks, MOQ is confirmed after reviewing the product type, dimensions, material, printing, finishing and production schedule.'],
  [/Standard production at iColorPacks usually takes <strong>12-18 days<\/strong> after artwork and sample approval\. Global DDP shipping can support door-to-door delivery to overseas warehouses and Amazon FBA destinations when required\./gi,
    'Production and freight timing are confirmed separately after artwork, sampling, quantity, destination and the selected delivery term are reviewed.'],
  [/iColorPacks supports selected custom packaging projects from 100 pcs\. The actual MOQ depends on box type, material, printing method, finishing process and production schedule\./gi,
    'The applicable MOQ depends on the box type, dimensions, material, printing method, finishing process, number of designs and production schedule.'],
  [/Standard production at iColorPacks usually takes 12-18 days after artwork confirmation and sample approval\. Complex structures, special materials or peak-season schedules may require more time\./gi,
    'Production timing is confirmed after artwork, sample approval, structure, materials, finishes, quantity and the current factory schedule are reviewed.'],
  [/Yes\. iColorPacks provides free 3D mockup support to help buyers review structure, size and visual direction before production\./gi,
    'Mockup and structural support options are reviewed according to the dimensions, artwork status and project requirements.'],
  [/Yes\. iColorPacks can support global DDP shipping, including delivery to overseas warehouses and Amazon FBA destinations when required\./gi,
    'Available freight terms and warehouse delivery requirements are confirmed for the destination, shipment size and current logistics route.'],
  [/Pricing starting from 100 units\s*(?:&middot;|·)\s*Global DDP shipping available\./gi,
    'MOQ and freight options are confirmed after specification and destination review.'],
  [/A: Yes, the sampling cost is fully credited toward your bulk order when it exceeds \$500\./gi,
    'A: Sample charges and any credit arrangement are confirmed in the written quotation before payment.'],
  [/A: Yes\. If your bulk order reaches the target value, the initial sampling cost will be fully credited back to your balance\./gi,
    'A: Sample charges and any credit arrangement are confirmed in the written quotation before payment.']
];

let changed = 0;
for (const relative of files) {
  const full = path.join(root, relative);
  const input = fs.readFileSync(full, 'utf8');
  let output = input;
  for (const [pattern, replacement] of replacements) output = output.replace(pattern, replacement);

  if (/^(?:public\/)?(?:low-moq-custom-packaging-china|final_deploy_low_moq)\.html$/.test(relative.replace(/\\/g, '/'))) {
    output = output.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }

  if (output !== input) {
    fs.writeFileSync(full, output, 'utf8');
    changed += 1;
  }
}

console.log('Normalized commercial claims in ' + changed + ' files');
