import { fetchPosts } from './api.js';
import { highlightRerum } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  const posts = await fetchPosts();

  const rerumCount = posts.filter(p => highlightRerum(p.body)).length;
  document.getElementById('rerumCount').textContent = `There are ${rerumCount} posts containing the word "rerum".`;

  const userCounts = {};
  posts.forEach(p => {
    userCounts[p.userId] = (userCounts[p.userId] || 0) + 1;
  });

  const tbody = document.getElementById('userPostCounts');
  for (const [userId, count] of Object.entries(userCounts)) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="border px-4 py-2">${userId}</td><td class="border px-4 py-2">${count}</td>`;
    tbody.appendChild(tr);
  }
});