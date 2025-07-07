declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_TRACKING_ID = 'G-JH5CGL196P';

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (page: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: page,
      page_location: window.location.href,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom hook for analytics
export const useAnalytics = () => {
  const trackQuizStart = () => {
    trackEvent('quiz_started', 'quiz_interaction', 'user_started_quiz');
  };

  const trackQuizComplete = () => {
    trackEvent('quiz_completed', 'quiz_interaction', 'user_completed_quiz');
  };

  const trackAboutPageVisit = () => {
    trackEvent('about_page_visit', 'page_interaction', 'user_visited_about_page');
  };

  const trackHomePageVisit = () => {
    trackEvent('home_page_visit', 'page_interaction', 'user_visited_home_page');
  };

  return {
    trackPageView,
    trackEvent,
    trackQuizStart,
    trackQuizComplete,
    trackAboutPageVisit,
    trackHomePageVisit,
  };
}; 