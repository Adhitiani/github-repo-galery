//where the information will appear
const overview = document.querySelector(".overview");

const username = "Adhitiani";

const getProfileInfo = async function() {
  let getProfile = await fetch(`https://api.github.com/users/${username}`);
  let profile = await getProfile.json();
  displayProfile(profile)
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
  overview.append(userInfoDiv)

}

getProfileInfo();