async function runAudit() {
  console.log('--- Starting DOM & API Audit ---');
  
  // 1. Homepage & Sections
  const res = await fetch('http://localhost:3000');
  const html = await res.text();
  console.log('Homepage status:', res.status, res.statusText);
  console.log('Homepage HTML size:', html.length, 'bytes');

  const expectedSections = [
    'top',
    'problem',
    'method',
    'assessment',
    'ascend',
    'story',
    'journal',
    'kit',
    'coaching',
    'partnerships',
    'contact'
  ];

  const foundSections = [];
  const missingSections = [];
  for (const s of expectedSections) {
    if (html.includes(`id="${s}"`) || html.includes(`id='${s}'`)) {
      foundSections.push(s);
    } else {
      missingSections.push(s);
    }
  }

  console.log(`DOM Sections found (${foundSections.length}/${expectedSections.length}):`, foundSections.join(', '));
  if (missingSections.length > 0) {
    console.warn('Missing DOM sections:', missingSections.join(', '));
  }

  // 2. Test API Endpoints
  const endpoints = [
    { url: 'http://localhost:3000/api', method: 'GET' },
    { url: 'http://localhost:3000/api/contact', method: 'GET' },
    { url: 'http://localhost:3000/api/contact', method: 'POST', body: JSON.stringify({ name: 'Test User', email: 'test@example.com', message: 'Hello' }) },
    { url: 'http://localhost:3000/api/subscribe', method: 'GET' },
    { url: 'http://localhost:3000/api/subscribe', method: 'POST', body: JSON.stringify({ email: 'test@example.com', source: 'audit' }) },
    { url: 'http://localhost:3000/api/og?section=method&lang=en', method: 'GET' },
    { url: 'http://localhost:3000/api/og?section=method&lang=ar', method: 'GET' }
  ];

  for (const ep of endpoints) {
    const opts = {
      method: ep.method,
      headers: ep.body ? { 'Content-Type': 'application/json' } : {}
    };
    if (ep.body) opts.body = ep.body;

    const r = await fetch(ep.url, opts);
    console.log(`${ep.method} ${ep.url.replace('http://localhost:3000', '')} => HTTP ${r.status} ${r.statusText}`);
  }

  console.log('--- Audit Completed Successfully ---');
}

runAudit().catch(err => {
  console.error('Audit failed with error:', err);
  process.exit(1);
});
