//where the information will appear
const overview = document.querySelector(".overview");
const repoLists = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

const username = "Adhitiani";

const getProfileInfo = async function() {
  let getProfile = await fetch(`https://api.github.com/users/${username}`);
  let profile = await getProfile.json();
  displayProfile(profile);
  
}

function displayProfile(profile) {
  let userInfoDiv = document.createElement("div");
  userInfoDiv.classList.add("user-info");
  userInfoDiv.innerHTML = `
    <figure>
      <img alt="user avatar" src=${profile.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${profile.login}</p>
      <p><strong>Bio:</strong> ${profile.bio}</p>
      <p><strong>Location:</strong> ${profile.location}</p>
      <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
    </div> 
  ` ;
  overview.append(userInfoDiv);
  getRepoList();

}

const getRepoList = async function() {
  const getRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
  const repoList = await getRepos.json();
  displayRepos(repoList);
}

function displayRepos(repoList) {
  for (let repo of repoList) {
    let li = document.createElement('li');
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoLists.append(li);
  }
}

repoLists.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    let repoName = e.target.innerText;
    getRepoData(repoName)
  }
});

const getRepoData = async function(repoName) {
  let repoData = await fetch(`https://api.github.com/repos/${username}/${repoName}`);

  let repoInfo = await repoData.json();
  let fetchLanguages = await fetch(repoInfo.languages_url);
  let languageData = await fetchLanguages.json();
  let languages = [];

  for (let language in languageData) {
    languages.push(language)
  }
  displayRepo(repoInfo, languages);

}

const displayRepo = function(repoInfo, languages) {
  repoData.innerHTML = "";
  let div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
       <p>Default Branch: ${repoInfo.default_branch}</p>
       <p>Languages: ${languages.join(", ")}</p>
       <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
   `;
   repoData.append(div);
   repoData.classList.remove("hide");
   repos.classList.add("hide");
}

getProfileInfo();
getRepoList();