import './index.css';

declare global {
  interface Window {
    api: {
      invoke: (channel: string, ...args: any[]) => Promise<any>;
    };
  }
}

const welcomePage = document.getElementById('welcomePage')!;
const loginPage = document.getElementById('loginPage')!;
const signupPage = document.getElementById('signupPage')!;
const categoriesPage = document.getElementById('categoriesPage')!;
const jobsListPage = document.getElementById('jobsListPage')!;

const loginBtn = document.getElementById('loginBtn')!;
const signupBtn = document.getElementById('signupBtn')!;
const backFromLoginBtn = document.getElementById('backFromLoginBtn')!;
const backFromSignupBtn = document.getElementById('backFromSignupBtn')!;
const toSignupBtn = document.getElementById('toSignupBtn')!;
const toLoginBtn = document.getElementById('toLoginBtn')!;

const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const signupForm = document.getElementById('signupForm') as HTMLFormElement;
const categoriesForm = document.getElementById('categoriesForm') as HTMLFormElement;

const filterBtn = document.getElementById('filterBtn')!;
const settingsBtn = document.getElementById('settingsBtn')!;
const logoutBtn = document.getElementById('logoutBtn')!;
const jobsList = document.getElementById('jobsList')!;

let currentUserId: number | null = null;

// Mock jobs data - will be replaced with real data later
interface Job {
  id: number;
  title: string;
  company: string;
  category: string;
  location: string;
  postedDate: string;
}

const mockJobs: Job[] = [
  { id: 1, title: 'Senior Software Engineer', company: 'Tech Corp', category: 'Software Engineering', location: 'San Francisco, CA', postedDate: 'Today' },
  { id: 2, title: 'Full Stack Developer', company: 'StartupXYZ', category: 'Software Engineering', location: 'Remote', postedDate: '2 days ago' },
  { id: 3, title: 'Machine Learning Engineer', company: 'AI Labs', category: 'Data Science', location: 'New York, NY', postedDate: '3 days ago' },
  { id: 4, title: 'DevOps Engineer', company: 'Cloud Systems', category: 'DevOps', location: 'Austin, TX', postedDate: '1 day ago' },
  { id: 5, title: 'Frontend Developer', company: 'Design Studio', category: 'Software Engineering', location: 'Los Angeles, CA', postedDate: '4 days ago' },
];

function displayJobs(jobs: Job[]): void {
  jobsList.innerHTML = '';
  
  if (jobs.length === 0) {
    jobsList.innerHTML = '<p class="no-jobs">No jobs found. Try adjusting your filters.</p>';
    return;
  }
  
  jobs.forEach((job) => {
    const jobElement = document.createElement('div');
    jobElement.className = 'job-card';
    jobElement.innerHTML = `
      <div class="job-header">
        <h3 class="job-title">${job.title}</h3>
        <span class="job-category">${job.category}</span>
      </div>
      <div class="job-info">
        <p class="company"><strong>${job.company}</strong></p>
        <p class="location">📍 ${job.location}</p>
        <p class="posted-date">Posted ${job.postedDate}</p>
      </div>
    `;
    jobsList.appendChild(jobElement);
  });
}

// Show login page
loginBtn.addEventListener('click', () => {
  welcomePage.classList.remove('active');
  loginPage.classList.add('active');
});

// Show signup page from welcome
signupBtn.addEventListener('click', () => {
  welcomePage.classList.remove('active');
  signupPage.classList.add('active');
});

// Go to signup from login
toSignupBtn.addEventListener('click', () => {
  loginPage.classList.remove('active');
  signupPage.classList.add('active');
});

// Go to login from signup
toLoginBtn.addEventListener('click', () => {
  signupPage.classList.remove('active');
  loginPage.classList.add('active');
});

// Back to welcome from login
backFromLoginBtn.addEventListener('click', () => {
  loginPage.classList.remove('active');
  welcomePage.classList.add('active');
});

// Back to welcome from signup
backFromSignupBtn.addEventListener('click', () => {
  signupPage.classList.remove('active');
  welcomePage.classList.add('active');
});

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;
  
  try {
    const result = await window.api.invoke('login', username, password);
    if (result.success) {
      currentUserId = result.userId;
      
      // If first login, show categories page
      if (result.isFirstLogin) {
        loginPage.classList.remove('active');
        categoriesPage.classList.add('active');
      } else {
        // Returning user - show jobs list
        loginPage.classList.remove('active');
        jobsListPage.classList.add('active');
        displayJobs(mockJobs);
      }
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login');
  }
});

// Handle signup form submission
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = (document.getElementById('signupUsername') as HTMLInputElement).value;
  const password = (document.getElementById('signupPassword') as HTMLInputElement).value;
  const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;
  
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }
  
  try {
    const result = await window.api.invoke('signup', username, password);
    if (result.success) {
      console.log('Signup successful:', result);
      alert(result.message);
      // Clear form and go back to welcome
      signupForm.reset();
      signupPage.classList.remove('active');
      welcomePage.classList.add('active');
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('An error occurred during signup');
  }
});

// Handle categories form submission
categoriesForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const checkboxes = categoriesForm.querySelectorAll('input[name="category"]:checked');
  
  if (checkboxes.length === 0) {
    alert('Please select at least one category');
    return;
  }
  
  const selectedCategories = Array.from(checkboxes).map(
    (checkbox) => (checkbox as HTMLInputElement).value
  );
  
  try {
    const result = await window.api.invoke('savePreferences', currentUserId, selectedCategories);
    if (result.success) {
      alert('Categories saved! Welcome to Job Scraper');
      categoriesPage.classList.remove('active');
      jobsListPage.classList.add('active');
      displayJobs(mockJobs);
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error saving preferences:', error);
    alert('An error occurred while saving preferences');
  }
});

// Jobs List page controls
filterBtn.addEventListener('click', () => {
  alert('Filter functionality coming soon');
});

settingsBtn.addEventListener('click', () => {
  alert('Settings functionality coming soon');
});

logoutBtn.addEventListener('click', () => {
  // Clear current user and return to welcome page
  currentUserId = null;
  jobsListPage.classList.remove('active');
  welcomePage.classList.add('active');
  loginForm.reset();
  signupForm.reset();
  categoriesForm.reset();
});

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite',
);
