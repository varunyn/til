# TIL

> Today I Learned

## ✨ New Feature: Cross-Document View Transitions

This blog now supports smooth animations when navigating between blog posts using Chrome's View Transitions API.

### Browser Requirements

- **Chrome 126+** for cross-document view transitions
- Falls back gracefully to normal navigation in unsupported browsers

### Testing the Feature

1. Open the site in Chrome 126 or later
2. Click on any blog post tile from the homepage
3. You should see smooth animations as elements transition from the tile to the full post

### Debugging

- Open browser DevTools Console to see debug logs
- Check if view transitions are supported in your browser
- Verify that view-transition-name properties are being applied

### How it Works

- Each blog tile has unique `view-transition-name` properties
- Corresponding elements on the blog post page have matching names
- Chrome automatically creates smooth transitions between matching elements
- Uses the `@view-transition { navigation: auto; }` CSS rule to enable cross-document transitions

## 📊 Analytics Configuration

This site supports both Google Analytics and Google Tag Manager for tracking and analytics.

### Environment Variables

Create a `.env.local` file in the root directory and add:

```bash
# Google Analytics - Set this to enable Google Analytics tracking
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Google Tag Manager - Set this to enable Google Tag Manager (alternative to GA)
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
```

### Usage

- You can use either Google Analytics ID or Google Tag Manager ID, or both
- If using GTM, you can manage GA and other tracking tools through the GTM interface
- The Analytics component automatically detects which services are configured and loads them accordingly
- Uses Next.js `Script` component with `afterInteractive` strategy for optimal performance

---

### Categories

- [Nextjs](#nextjs)
- [Docker](#docker)
- [Chrome](#chrome)
- [Kubernetes](#kubernetes)
- [Github](#github)

### Nextjs

- [Webmentions in nextjs](https://github.com/varunyn/til/blob/main/data/webmentions-in-nextjs.mdx)

### Docker

- [Building docker images for python app](https://github.com/varunyn/til/blob/main/data/docker-image-for-python.mdx)

### Kubernetes

- [Creating k8s deployment](https://github.com/varunyn/til/blob/main/data/k8s-deployment.mdx)
- [Awesome Kubernetes Repos](https://github.com/varunyn/til/blob/main/data/awesome-k8s-resources.mdx)

### Chrome

- [How to open URL in new tab using keyboard shortcut](https://github.com/varunyn/til/blob/main/data/open-url-with-keyboard-shortcut-in-chrome.mdx)

### Github

- [Setup dependabot in Github repo](https://github.com/varunyn/til/blob/main/data/github-dependabot.mdx)
