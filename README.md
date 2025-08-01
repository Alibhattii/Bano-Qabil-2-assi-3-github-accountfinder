# GitHub Profile Viewer

A modern, interactive website that uses the GitHub API to display real user profile information, repositories, and statistics.

## Features

### 🎨 Modern Design
- Beautiful gradient background
- Glassmorphism effects with backdrop blur
- Smooth animations and transitions
- Responsive design for all devices
- Modern typography with Inter font

### ✨ Interactive Elements
- Real-time input validation
- Animated counters for statistics
- Hover effects and micro-interactions
- Live clock display
- Action button feedback

### 📱 GitHub User Information Display
- Real GitHub username and full name
- Actual GitHub avatar
- Real join date from GitHub
- Current time (live updates)
- GitHub User ID
- Location, blog, company, and email (if public)
- Real follower and following counts
- Public repositories and gists count
- Total stars and forks across all repositories
- Account age calculation
- Estimated profile views

### 🎯 User Experience
- Input validation with error messages
- Keyboard navigation (Enter to submit, Escape to reset)
- Real-time feedback on button interactions
- Smooth animations for all state changes
- Mobile-responsive design

## How to Use

1. **Open the Website**: Open `index.html` in any modern web browser
2. **Enter GitHub Username**: Type a valid GitHub username in the input field
   - Must be 1-39 characters long
   - Can contain letters, numbers, and hyphens only
   - Must be a real GitHub username
3. **Submit**: Click the search button or press Enter
4. **View Results**: See real GitHub profile information displayed
5. **Interact**: Hover over elements or try the Easter egg!

## Easter Egg

Click the GitHub avatar 5 times to discover a hidden Easter egg! 🎉

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Any modern browser with ES6 support

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Interactive functionality and dynamic content
- **GitHub API**: Real user data and repository information
- **Font Awesome**: Icons
- **Google Fonts**: Inter font family

## Features in Detail

### Input Validation
- Checks for empty input
- Validates length (1-39 characters)
- Ensures alphanumeric and hyphen characters only (GitHub username rules)
- Shows helpful error messages

### Real GitHub Data
- Fetches real user data from GitHub API
- Displays actual profile information (name, location, company, etc.)
- Shows real follower and following counts
- Calculates total stars and forks from repositories
- Computes account age in days
- Estimates profile views based on activity

### Animations
- Slide-in animations for content display
- Counter animations for statistics
- Hover effects on interactive elements
- Button click animations
- Error message animations

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly interactions

## Getting Started

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start entering usernames and exploring!

## Customization

You can easily customize the website by:
- Modifying colors in `styles.css`
- Adding new user information fields
- Changing animations and transitions
- Adding more interactive features

## License

This project is open source and available under the MIT License. 