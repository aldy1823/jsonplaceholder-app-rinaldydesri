import { fetchPosts, fetchComments } from './api.js';
import { highlightRerum } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
  const posts = await fetchPosts();
  const table = document.getElementById('postsTable');
  const searchInput = document.getElementById('search');

  function renderTable(filteredPosts) {
    table.innerHTML = '';
    filteredPosts.forEach(post => {
      const tr = document.createElement('tr');
      if (highlightRerum(post.body)) tr.classList.add('bg-yellow-100');

      tr.innerHTML = `
        <td class="border px-4 py-2 cursor-pointer">${post.id}</td>
        <td class="border px-4 py-2 cursor-pointer">${post.title}</td>
        <td class="border px-4 py-2 cursor-pointer">${post.body}</td>
      `;

      tr.addEventListener('click', async () => {
        const comments = await fetchComments(post.id);
        const commentsHtml = comments.map(c => `
          <div class='ml-4 text-sm border-t pt-2'>
            <strong>${c.name}</strong> (${c.email}): <br />${c.body}
          </div>`).join('');
        const commentsRow = document.createElement('tr');
        commentsRow.innerHTML = `<td colspan="3">${commentsHtml}</td>`;
        tr.after(commentsRow);
      });

      table.appendChild(tr);
    });
  }

  renderTable(posts);

  searchInput.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = posts.filter(p => p.title.toLowerCase().includes(term) || p.body.toLowerCase().includes(term));
    renderTable(filtered);
  });
});