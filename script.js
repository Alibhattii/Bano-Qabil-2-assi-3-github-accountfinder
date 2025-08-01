// DOM Elements
const usernameInput = document.getElementById('username');
const submitBtn = document.getElementById('submitBtn');
const displaySection = document.getElementById('displaySection');
const welcomeSection = document.getElementById('welcomeSection');
const displayUsername = document.getElementById('displayUsername');
const userFullName = document.getElementById('userFullName');
const userAvatar = document.getElementById('userAvatar');
const defaultAvatar = document.getElementById('defaultAvatar');
const joinDate = document.getElementById('joinDate');
const currentTime = document.getElementById('currentTime');
const userId = document.getElementById('userId');
const userLocation = document.getElementById('userLocation');
const userBlog = document.getElementById('userBlog');
const userCompany = document.getElementById('userCompany');
const userEmail = document.getElementById('userEmail');
const followersCount = document.getElementById('followersCount');
const followingCount = document.getElementById('followingCount');
const publicRepos = document.getElementById('publicRepos');
const publicGists = document.getElementById('publicGists');
const profileViews = document.getElementById('profileViews');
const totalStars = document.getElementById('totalStars');
const totalForks = document.getElementById('totalForks');
const accountAge = document.getElementById('accountAge');

// GitHub API Base URL
const GITHUB_API_BASE = 'https://api.github.com';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    submitBtn.addEventListener('click', handleSubmit);
    usernameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    });

    // Add input validation and real-time feedback
    usernameInput.addEventListener('input', function() {
        const username = this.value.trim();
        if (username.length > 0) {
            submitBtn.style.opacity = '1';
            submitBtn.style.transform = 'translateX(0)';
        } else {
            submitBtn.style.opacity = '0.7';
            submitBtn.style.transform = 'translateX(5px)';
        }
    });

    // Start time update
    updateTime();
    setInterval(updateTime, 1000);
});

// Handle form submission
async function handleSubmit() {
    const username = usernameInput.value.trim();
    
    if (!username) {
        showError('Please enter a GitHub username');
        return;
    }

    if (username.length < 1) {
        showError('Username must be at least 1 character long');
        return;
    }

    if (username.length > 39) {
        showError('Username must be less than 39 characters');
        return;
    }

    // Validate username format (GitHub username rules)
    if (!/^[a-zA-Z0-9-]+$/.test(username)) {
        showError('GitHub username can only contain letters, numbers, and hyphens');
        return;
    }

    // Show loading state
    showLoading();
    
    try {
        await displayUserInfo(username);
    } catch (error) {
        if (error.message === "User Name Not Found") {
            showError('User Name Not Found');
        } else {
            showError('User not found or API error. Please check the username and try again.');
        }
        hideLoading();
    }
}

// Display user information
async function displayUserInfo(username) {
    // Hide welcome section and show display section
    welcomeSection.style.display = 'none';
    displaySection.style.display = 'block';

    // Fetch user data from GitHub API
    const userData = await getGitHubUserInfo(username);
    const reposData = await fetchUserRepos(username);
    
    // Update display with real data
    updateDisplay(userData, reposData);
    
    hideLoading();
}

// Fetch user data from GitHub API
async function getGitHubUserInfo(userName) {
    const userInfo = await fetch(`https://api.github.com/users/${userName}`);

    if (userInfo.ok) {
        const data = await userInfo.json();
        console.log("userInfo", data.public_repos);
        return data;
    } else {
        throw new Error("User Name Not Found");
    }
}

// Fetch user repositories
async function fetchUserRepos(username) {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// Update display with user data
function updateDisplay(userData, reposData) {
    // Update username and full name
    displayUsername.textContent = userData.login;
    userFullName.textContent = userData.name || 'No name provided';
    
    // Update avatar
    if (userData.avatar_url) {
        userAvatar.src = userData.avatar_url;
        userAvatar.style.display = 'block';
        defaultAvatar.style.display = 'none';
    } else {
        userAvatar.style.display = 'none';
        defaultAvatar.style.display = 'block';
    }
    
    // Update basic information
    joinDate.textContent = formatDate(new Date(userData.created_at));
    userId.textContent = `#${userData.id}`;
    userLocation.textContent = userData.location || 'Not specified';
    userBlog.textContent = userData.blog || 'Not specified';
    userCompany.textContent = userData.company || 'Not specified';
    userEmail.textContent = userData.email || 'Not public';
    
    // Update counts
    followersCount.textContent = userData.followers;
    followingCount.textContent = userData.following;
    publicRepos.textContent = userData.public_repos;
    publicGists.textContent = userData.public_gists;
    
    // Calculate additional statistics
    const stats = calculateRepoStats(reposData);
    const accountAgeDays = calculateAccountAge(userData.created_at);
    
    // Update statistics
    totalStars.textContent = stats.totalStars;
    totalForks.textContent = stats.totalForks;
    accountAge.textContent = accountAgeDays;
    
    // Animate counters
    animateCounter(totalStars, stats.totalStars);
    animateCounter(totalForks, stats.totalForks);
    animateCounter(accountAge, accountAgeDays);
    
    // Add some estimated data (since GitHub API doesn't provide these)
    profileViews.textContent = estimateProfileViews(userData.followers, userData.public_repos);
}

// Calculate repository statistics
function calculateRepoStats(repos) {
    let totalStars = 0;
    let totalForks = 0;
    
    repos.forEach(repo => {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
    });
    
    return { totalStars, totalForks };
}

// Calculate account age in days
function calculateAccountAge(createdAt) {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Estimate profile views based on followers and repos
function estimateProfileViews(followers, repos) {
    const baseViews = followers * 10 + repos * 50;
    return Math.floor(baseViews + Math.random() * 1000);
}

// Animate counter from 0 to target value
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // 50 steps for smooth animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 30);
}

// Format date
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    currentTime.textContent = timeString;
}

// Show loading state
function showLoading() {
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
}

// Hide loading state
function hideLoading() {
    submitBtn.innerHTML = '<i class="fas fa-search"></i>';
    submitBtn.disabled = false;
}

// Show error message
function showError(message) {
    // Create error element if it doesn't exist
    let errorElement = document.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            background: #ff6b6b;
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            margin-top: 10px;
            font-size: 0.9rem;
            text-align: center;
            animation: slideIn 0.3s ease-out;
        `;
        document.querySelector('.input-group').appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.parentNode.removeChild(errorElement);
        }
    }, 5000);
}

// Add hover effects for better UX
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.info-item')) {
        e.target.closest('.info-item').style.transform = 'translateY(-2px) scale(1.02)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.info-item')) {
        e.target.closest('.info-item').style.transform = '';
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Clear input and show welcome section
        usernameInput.value = '';
        displaySection.style.display = 'none';
        welcomeSection.style.display = 'block';
        usernameInput.focus();
    }
});

// Add some fun Easter eggs
let clickCount = 0;
document.addEventListener('click', function(e) {
    if (e.target.closest('.avatar')) {
        clickCount++;
        if (clickCount >= 5) {
            showEasterEgg();
            clickCount = 0;
        }
    }
});

function showEasterEgg() {
    const egg = document.createElement('div');
    egg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ffd700, #ff6b6b);
        color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1001;
        text-align: center;
        animation: bounce 0.5s ease-out;
    `;
    egg.innerHTML = `
        <h3>🎉 GitHub Easter Egg Found! 🎉</h3>
        <p>You clicked the avatar 5 times!</p>
        <p>Thanks for exploring GitHub profiles! 😊</p>
    `;
    
    document.body.appendChild(egg);
    
    setTimeout(() => {
        egg.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            if (egg.parentNode) {
                egg.parentNode.removeChild(egg);
            }
        }, 500);
    }, 3000);
}

// Add bounce animation for Easter egg
const eggStyle = document.createElement('style');
eggStyle.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translate(-50%, -50%) scale(1);
        }
        40% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        60% {
            transform: translate(-50%, -50%) scale(0.9);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(eggStyle); 