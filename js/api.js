const API_BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts() {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchComments(postId) {
  const res = await fetch(`${API_BASE}/posts/${postId}/comments`);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}
