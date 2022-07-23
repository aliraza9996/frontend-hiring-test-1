import React from 'react';
import { Redirect } from 'react-router-dom';
//  // Inner Authentication
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import Logs from '../pages/Logs';

const userRoutes = [
  { path: '/home', component: Logs },
  // this route should be at the end of all other routes
  { path: '/', exact: true, component: () => <Redirect to="/login" /> },
];

const authRoutes = [
  // Authentication Inner
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

export { userRoutes, authRoutes };
