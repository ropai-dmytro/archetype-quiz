# Google Analytics Setup for Archetype Quiz

## Overview
Google Analytics 4 (GA4) has been configured for the Archetype Quiz website to track user engagement and behavior.

## Tracking ID
- **Measurement ID**: G-JH5CGL196P
- **Property**: Annaropai
- **Website**: https://www.annaropai.com/

## What's Being Tracked

### 1. Page Views
- **Home Page**: Tracked when users visit the main page (`/archetype-quiz`)
- **Quiz Page**: Tracked when users start the quiz (`/quiz`)
- **Results Page**: Tracked when users view their results (`/results/:token`)
- **About Page**: Tracked when users visit the author page (`/about`)

### 2. Custom Events
- **Quiz Started**: Triggered when users click "ПРОЙТИ ТЕСТ" button
- **Quiz Completed**: Triggered when users finish the entire quiz
- **About Page Visit**: Triggered when users visit the about page
- **Home Page Visit**: Triggered when users visit the home page

## How to View Analytics Data

### 1. Access Google Analytics
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Select the "Annaropai" property

### 2. View Real-Time Data
1. In the left sidebar, click on "Reports" → "Realtime"
2. You can see:
   - Active users currently on your site
   - Page views happening right now
   - Events being triggered in real-time

### 3. View Page Views
1. Go to "Reports" → "Engagement" → "Pages and screens"
2. This shows:
   - Total page views for each page
   - Unique page views
   - Average time on page

### 4. View Custom Events
1. Go to "Reports" → "Engagement" → "Events"
2. Look for these custom events:
   - `quiz_started`: Number of people who started the quiz
   - `quiz_completed`: Number of people who completed the quiz
   - `about_page_visit`: Number of people who visited the about page
   - `home_page_visit`: Number of people who visited the home page

### 5. Create Custom Reports
You can create custom reports to track:
- **Conversion Rate**: `quiz_completed` / `quiz_started`
- **About Page Engagement**: `about_page_visit` / `home_page_visit`
- **User Journey**: Home → Quiz → Results flow

## Key Metrics to Monitor

### 1. User Acquisition
- **Total Users**: Overall website visitors
- **New Users**: First-time visitors
- **Traffic Sources**: Where users are coming from

### 2. Engagement
- **Page Views**: Total number of page views
- **Session Duration**: How long users stay on the site
- **Bounce Rate**: Percentage of users who leave after viewing one page

### 3. Quiz Performance
- **Quiz Start Rate**: Percentage of home page visitors who start the quiz
- **Quiz Completion Rate**: Percentage of quiz starters who complete the quiz
- **Drop-off Points**: Where users abandon the quiz

### 4. Content Performance
- **About Page Visits**: How many users visit the about page
- **Time on About Page**: How long users spend reading about the author

## Setting Up Goals (Optional)

### 1. Quiz Completion Goal
1. Go to "Admin" → "Goals"
2. Create a new goal
3. Set event condition: `quiz_completed`
4. This will track conversion rate from quiz start to completion

### 2. About Page Goal
1. Create another goal
2. Set event condition: `about_page_visit`
3. Track how many users learn about the author

## Troubleshooting

### If Analytics Isn't Working:
1. Check browser console for errors
2. Verify the tracking ID is correct: `G-JH5CGL196P`
3. Ensure the Google Analytics script is loaded in `public/index.html`
4. Check if ad blockers are interfering with tracking

### If Events Aren't Showing:
1. Wait 24-48 hours for data to appear
2. Check real-time reports for immediate feedback
3. Verify the `gtag` function is available in browser console
4. Test events manually in browser console

## Privacy Considerations

The analytics setup respects user privacy by:
- Not collecting personally identifiable information
- Using standard Google Analytics tracking
- Complying with GDPR requirements
- Only tracking anonymous user behavior

## Support

If you need help with analytics or want to add more tracking:
1. Check the Google Analytics documentation
2. Review the analytics code in `src/utils/analytics.ts`
3. Test events using browser developer tools 