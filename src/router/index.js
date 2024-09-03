import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import LibrarianDashboardView from '@/views/LibrarianDashboardView.vue'
import LogoutPage from '@/views/LogoutPage.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { ref } from 'vue'

export const isAuthenticated = ref(false);
export const userRole = ref(''); // Store user role

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated.value) {
        next();
      } else {
        next({ name: 'FireLogin' });
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/LibrarianDashboard',
    name: 'LibrarianDashboard',
    component: LibrarianDashboardView,
    beforeEnter: (to, from, next) => {
      checkUserRole('librarian', next);
    }
  },
  {
    path: "/Logout",
    name: "Logout",
    component: LogoutPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Function to check the user role and route accordingly
const checkUserRole = (requiredRole, next) => {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isAuthenticated.value = true;
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        userRole.value = userDoc.data().role;
        if (userRole.value === requiredRole) {
          next();
        } else {
          next({ name: 'Home' }); // Redirect to home if the role doesn't match
        }
      } else {
        console.log('User document not found!');
        next({ name: 'login' });
      }
    } else {
      isAuthenticated.value = false;
      next({ name: 'login' });
    }
  });
}

export default router;
