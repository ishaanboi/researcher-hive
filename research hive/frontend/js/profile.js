window.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = 'login.html';

  const profileDetails = document.getElementById('profileDetails');
  const res = await fetch('http://localhost:5000/api/profile/me', {
    headers: { 'Authorization': token }
  });
  const data = await res.json();

  if (res.ok) {
    profileDetails.innerHTML = `
      <p><strong>Name:</strong> <input id="name" value="\${data.name}" /></p>
      <p><strong>Email:</strong> <input id="email" value="\${data.email}" disabled /></p>
      <p><strong>Institution:</strong> <input id="institution" value="\${data.institution || ''}" /></p>
      <p><strong>Research Interests:</strong> <input id="interests" value="\${(data.researchInterests || []).join(', ')}" /></p>
      <p><strong>Bio:</strong><textarea id="bio">\${data.bio || ''}</textarea></p>
      <button id="updateBtn">Update Profile</button>
    `;
  }

  document.getElementById('updateBtn').addEventListener('click', async () => {
    const updated = {
      name: document.getElementById('name').value,
      institution: document.getElementById('institution').value,
      researchInterests: document.getElementById('interests').value.split(',').map(i => i.trim()),
      bio: document.getElementById('bio').value
    };

    const result = await fetch('http://localhost:5000/api/profile/me', {
      method: 'PUT',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updated)
    });

    const updatedData = await result.json();
    if (result.ok) {
      alert('Profile updated!');
    } else {
      alert(updatedData.message);
    }
  });
});
