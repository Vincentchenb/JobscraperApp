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

const loginBtn = document.getElementById('loginBtn')!;
const signupBtn = document.getElementById('signupBtn')!;
const backFromLoginBtn = document.getElementById('backFromLoginBtn')!;
const backFromSignupBtn = document.getElementById('backFromSignupBtn')!;
const toSignupBtn = document.getElementById('toSignupBtn')!;
const toLoginBtn = document.getElementById('toLoginBtn')!;

const loginForm = document.getElementById('loginForm') as HTMLFormElement;
const signupForm = document.getElementById('signupForm') as HTMLFormElement;

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
      console.log('Login successful:', result);
      alert(result.message);
      // TODO: Navigate to main app page
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

console.log(
  '👋 This message is being logged by "renderer.ts", included via Vite',
);
