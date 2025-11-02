// Галерея/порівняння суші сетів
document.addEventListener('DOMContentLoaded', () => {
  const sets = [
    { id: 1, name: 'Сет №1', desc: 'Традиційний набір ролів із лососем, авокадо, сиром.', img: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Сет №2', desc: 'Асорті з тунцем, огірком, та унагі.', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Сет №3', desc: 'Гострі роли та футомаки з креветкою.', img: 'https://images.unsplash.com/photo-1579871494447-9811f80d6caf?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Сет №4', desc: 'Вегетаріанський сет з авокадо, манго, огірком.', img: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?auto=format&fit=crop&w=400&q=80' }
  ];
  function updateComparison() {
    const c1 = document.getElementById('compare1').value;
    const c2 = document.getElementById('compare2').value;
    let html = '';
    if (c1 && c2 && c1 !== c2) {
      const set1 = sets.find(s => s.id == c1);
      const set2 = sets.find(s => s.id == c2);
      html = `<strong>${set1.name}</strong>: ${set1.desc}<br><img src="${set1.img}" width="120"> <b>vs</b> <img src="${set2.img}" width="120"> <strong>${set2.name}</strong>: ${set2.desc}`;
    } else if (c1 === c2) {
      html = 'Виберіть різні сети для порівняння.';
    }
    document.getElementById('compare-result').innerHTML = html;
  }
  document.getElementById('compare1').addEventListener('change', updateComparison);
  document.getElementById('compare2').addEventListener('change', updateComparison);
  updateComparison();

  // Статті
  const articles = [
    { id: 1, title: 'Як обирати суші: поради від шеф-майстра', body: 'Секрет найсмачніших ролів ховається у свіжості інгредієнтів...', comments: [] },
    { id: 2, title: 'Тренди японської кухні у 2025', body: 'Популярність класичних і нових ролів не спадає...', comments: [] }
  ];
  const articlesList = document.getElementById('articles-list');
  articles.forEach(article => {
    const div = document.createElement('div');
    div.className = 'article-card';
    div.innerHTML = `<h3>${article.title}</h3><p>${article.body}</p>`;
    articlesList.appendChild(div);
  });
  // Коментарі
  const commentsKey = 'sushi-comments';
  function getSavedComments() {
    const c = localStorage.getItem(commentsKey);
    return c ? JSON.parse(c) : [];
  }
  function saveComment(comment) {
    const comments = getSavedComments();
    comments.push(comment);
    localStorage.setItem(commentsKey, JSON.stringify(comments));
  }
  function renderComments() {
    const list = document.getElementById('comments-list');
    list.innerHTML = '';
    getSavedComments().forEach(com => {
      const e = document.createElement('div');
      e.className = 'comment-card';
      e.innerHTML = `<div class="comment-meta"><b>${com.username}</b> • <span>${new Date(com.date).toLocaleString()}</span> <span class="rating">${'★'.repeat(com.rating)}${'☆'.repeat(5-com.rating)}</span></div><div>${com.text}</div>`;
      list.appendChild(e);
    });
  }
  renderComments();
  document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const text = document.getElementById('comment-text').value.trim();
    const rating = parseInt(document.getElementById('rating').value);
    if (username && text && rating) {
      saveComment({ username, text, rating, date: Date.now() });
      this.reset();
      renderComments();
    }
  });
});
