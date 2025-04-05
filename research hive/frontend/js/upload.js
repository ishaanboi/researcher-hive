document.getElementById('researchForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  if (!token) return alert('Unauthorized');

  const formData = new FormData();
  formData.append('title', document.querySelector('input[placeholder="Title"]').value);
  formData.append('tags', document.querySelector('input[placeholder="Tags (comma separated)"]').value);
  formData.append('description', document.querySelector('textarea').value);
  formData.append('file', document.querySelector('input[type="file"]').files[0]);

  const res = await fetch('http://localhost:5000/api/research/upload', {
    method: 'POST',
    headers: { 'Authorization': token },
    body: formData
  });

  const result = await res.json();
  if (res.ok) {
    alert('Research uploaded successfully!');
  } else {
    alert(result.message);
  }
});
