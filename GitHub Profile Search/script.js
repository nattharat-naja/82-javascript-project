// GitHub API --> https://api.github.com/users/${THE USER}.
const userContainer = document.querySelector(".user-container");
const userNotFound = document.querySelector(".user-not-found");
const form = document.querySelector("#form");

// User information having to adjust.
const userImg = document.querySelector("#user-img");
const userName = document.querySelector("#user-name");
const userBio = document.querySelector("#user-bio");
const userFollowing = document.querySelector("#user-following-amount");
const userFollowers = document.querySelector("#user-followers-amount");
const userRepos = document.querySelector("#user-repos-amount");
const userCards = document.querySelector("#user-repo-cards");

// Setting up initial page.
userContainer.style.display = "none";
userNotFound.style.display = "none";

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form to submit data.
    await fetchGitHubAPI(form.user.value);
});

// GET all user information.
async function fetchGitHubAPI(inputUser) {
    await fetchRepos(inputUser);
    await fetch(`https://api.github.com/users/${inputUser}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("User Not Found");
            }
            return response.json();
        })
        .then((response) => {
            // Setting user information.
            userImg.style.backgroundImage = `url(${response.avatar_url})`;
            userName.innerHTML = response.login;
            userBio.innerHTML = response.bio;
            userFollowing.innerHTML = `${response.following} <span class="user-info-public">Following</span>`;
            userFollowers.innerHTML = `${response.followers} <span class="user-info-public">Followers</span>`;
            userRepos.innerHTML = `${response.public_repos} <span class="user-info-public">Repos</span>`;

            // If response is OK. Will "show" user information and "hide" Not Found text.
            userContainer.style.display = "flex";
            userNotFound.style.display = "none";
        })
        .catch(() => {
            // If reponse isn't OK. Will "hide" user information and "show" Not Found text.
            userContainer.style.display = "none";
            userNotFound.style.display = "block";
        });
}

// GET all repos information.
async function fetchRepos(inputUser) {
    await fetch(`https://api.github.com/users/${inputUser}/repos`)
        .then((response) => response.json())
        .then((response) => {
            // Using for clear all child.
            while (userCards.firstChild) {
                userCards.removeChild(userCards.firstChild);
            }

            // Add repo to userCards. UserCards can contain only 5 repos.
            for (let i = 0; i < 5 && i < response.length; i++) {
                const userCard = document.createElement("a"); // Create new a tag(userCard).
                userCard.classList.add("user-repo-card"); // Add class to userCard.
                userCard.href = response[i].clone_url; // Setting href of userCard.
                userCard.innerHTML = response[i].name; // Setting innerText of userCard.
                userCards.appendChild(userCard); // Append userCard to userCards
            }
        });
}
