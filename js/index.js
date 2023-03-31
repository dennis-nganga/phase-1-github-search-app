const form = document.querySelector('#github-form');
const userList = document.querySelector('#user-list');
const reposList = document.querySelector('#repos-list');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const searchQuery = event.target.search.value;
  const endpoint = `https://api.github.com/search/users?q=${searchQuery}`;
  
  fetch(endpoint, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json())
  .then(data => displayUsers(data.items))
  .catch(error => console.error(error));
});

function displayUsers(users) {
  userList.innerHTML = '';
  
  for (let user of users) {
    const li = document.createElement('li');
    
    const avatar = document.createElement('img');
    avatar.setAttribute('src', user.avatar_url);
    avatar.setAttribute('alt', `${user.login} avatar`);
    
    const username = document.createElement('span');
    username.textContent = user.login;
    
    const link = document.createElement('a');
    link.setAttribute('href', user.html_url);
    link.setAttribute('target', '_blank');
    link.appendChild(avatar);
    link.appendChild(username);
    
    li.appendChild(link);
    userList.appendChild(li);
    
    link.addEventListener('click', function(event) {
      event.preventDefault();
      getUserRepos(user.login);
    });
  }
}

function displayRepos(repos) {
  reposList.innerHTML = '';
  
  for (let repo of repos) {
    const li = document.createElement('li');
    
    const name = document.createElement('a');
    name.setAttribute('href', repo.html_url);
    name.setAttribute('target', '_blank');
    name.textContent = repo.name;
    
    const description = document.createElement('p');
    description.textContent = repo.description;
    
    li.appendChild(name);
    li.appendChild(description);
    
    reposList.appendChild(li);
  }
}

function getUserRepos(username) {
  const endpoint = `https://api.github.com/users/${username}/repos`;
  
  fetch(endpoint, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json())
  .then(data => displayRepos(data))
  .catch(error => console.error(error));
}
