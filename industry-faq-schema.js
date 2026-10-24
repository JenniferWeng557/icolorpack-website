document.addEventListener('DOMContentLoaded', function () {
  const details = Array.from(document.querySelectorAll('.industry-faq details'));
  if (!details.length) return;

  const mainEntity = details.map(function (item) {
    const question = item.querySelector('summary');
    const answer = item.querySelector('p');
    return {
      '@type': 'Question',
      name: question ? question.textContent.trim() : '',
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer ? answer.textContent.trim() : ''
      }
    };
  }).filter(function (item) { return item.name && item.acceptedAnswer.text; });

  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.dataset.generatedFor = 'industry-faq';
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: mainEntity
  });
  document.head.appendChild(schema);
});
