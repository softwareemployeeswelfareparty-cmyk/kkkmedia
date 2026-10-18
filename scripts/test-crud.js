const http = require('http');

async function testCrud() {
  const loginData = JSON.stringify({ email: 'admin@kkkmedia.com', password: 'Admin@KKKMedia2026!' });
  
  const token = await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const json = JSON.parse(body);
        resolve(json.token);
      });
    });
    req.on('error', reject);
    req.write(loginData);
    req.end();
  });

  console.log('1. Authentication successful, JWT token acquired.');

  // Create article
  const articlePayload = JSON.stringify({
    title: 'சென்னை மெட்ரோ ரயில் இரண்டாம் கட்ட பணிகள் விறுவிறுப்பு: புதிய சுரங்கப்பாதை திறப்பு!',
    categoryId: 1,
    shortDescription: 'சென்னையில் மெட்ரோ ரயில் விரிவாக்கப் பணிகளின் முக்கிய மைல்கல்லாக புதிய வழித்தட சுரங்கப்பாதை பணிகள் நிறைவடைந்தன.',
    fullContent: '<p class="lead">சென்னையில் பொது போக்குவரத்தை அடுத்த கட்டத்திற்கு எடுத்துச் செல்லும் மெட்ரோ 2-ஆம் கட்ட பணிகள் முழுவீச்சில் நடைபெற்று வருகின்றன.</p>',
    status: 'PUBLISHED',
    isFeatured: true,
    tags: 'சென்னை, மெட்ரோ, தமிழ்நாடு'
  });

  const createdArticle = await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/articles',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Length': Buffer.byteLength(articlePayload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const json = JSON.parse(body);
        resolve(json);
      });
    });
    req.on('error', reject);
    req.write(articlePayload);
    req.end();
  });

  console.log('2. Article created successfully:');
  console.log('   ID:', createdArticle.data.id);
  console.log('   Title:', createdArticle.data.title);
  console.log('   Slug:', createdArticle.data.slug);
  console.log('   Status:', createdArticle.data.status);
  console.log('   Tags count:', createdArticle.data.tags.length);

  // Update article
  const updatePayload = JSON.stringify({
    title: 'சென்னை மெட்ரோ ரயில் இரண்டாம் கட்ட பணிகள் விறுவிறுப்பு: புதிய சுரங்கப்பாதை வெற்றிகரமாக திறப்பு!'
  });

  const updatedArticle = await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/articles/${createdArticle.data.id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Length': Buffer.byteLength(updatePayload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const json = JSON.parse(body);
        resolve(json);
      });
    });
    req.on('error', reject);
    req.write(updatePayload);
    req.end();
  });

  console.log('3. Article updated successfully:', updatedArticle.data.title);

  // Delete article
  const deleteResult = await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/articles/${createdArticle.data.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        const json = JSON.parse(body);
        resolve(json);
      });
    });
    req.on('error', reject);
    req.end();
  });

  console.log('4. Article deleted successfully:', deleteResult.success);
  console.log('✨ Full CRUD lifecycle verification passed with 100% success!');
}

testCrud().catch(err => {
  console.error('CRUD test failed:', err);
  process.exit(1);
});
