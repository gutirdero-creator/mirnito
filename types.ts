import React from 'react';

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  isVerified?: boolean;
  role: 'user' | 'admin';
}

export interface Ad {
  id: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  location: string;
  category: string;
  image: string;
  date: string;
  author: string;
  authorId?: string;
  rating?: number;
  reviewCount?: number;
  sellerBadges?: string[];
  goodPrice?: boolean;
  delivery?: boolean;
  status?: 'active' | 'archived' | 'pending' | 'banned';
  // Monetization fields
  isPromoted?: boolean; // Highlighted border/background
  isVip?: boolean; // Top placement
  isUrgent?: boolean; // Red badge "Urgent"
}

export interface Story {
  id: string;
  user: string;
  avatar: string;
  image: string;
  title: string;
  viewed: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
}

export enum Page {
  HOME = '/',
  BROWSE = '/browse',
  POST_AD = '/post-ad',
  ABOUT = '/about',
  SAFETY = '/safety',
  CONTACTS = '/contacts',
  BLOG = '/blog',
  TERMS = '/terms',
  PRIVACY = '/privacy',
  AD_DETAILS = '/ad-details',
  PROFILE = '/profile',
  ADMIN = '/admin',
  CHAT = '/chat',
  SELLER_PROFILE = '/seller'
}

export interface Review {
  id: string;
  author: string;
  role: string;
  district: string;
  rating: number;
  text: string;
  avatar: string;
  date?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
  read: boolean;
}

export interface Chat {
  id: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  unreadCount: number;
  adTitle: string;
  time: string;
}

// New Types for Notifications
export interface AppNotification {
  id: string;
  title: string;
  text: string;
  time: string;
  read: boolean;
  type: 'system' | 'message' | 'price' | 'success';
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}