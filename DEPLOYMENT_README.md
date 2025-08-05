# 🚀 Essentials Enhanced OS - Deployment Guide

## Overview

This guide covers the complete deployment process for the **Essentials Enhanced OS** - the world's most advanced AI-powered business operating system.

## 📋 Prerequisites

### Required Tools
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm 9+** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)
- **Vercel CLI** - `npm install -g vercel`
- **Supabase CLI** - `npm install -g supabase`

### Required Accounts
- **Vercel** - [Sign up here](https://vercel.com/)
- **Supabase** - [Sign up here](https://supabase.com/)
- **OpenAI** - [Sign up here](https://openai.com/)

## 🔧 Environment Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd SocialMedia
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4o-mini

# Social Media Platform OAuth
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
TIKTOK_CLIENT_ID=your-tiktok-client-id
TIKTOK_CLIENT_SECRET=your-tiktok-client-secret
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
SNAPCHAT_CLIENT_ID=your-snapchat-client-id
SNAPCHAT_CLIENT_SECRET=your-snapchat-client-secret
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret
INSTAGRAM_CLIENT_ID=your-instagram-client-id
INSTAGRAM_CLIENT_SECRET=your-instagram-client-secret

# E-commerce Integration
SHOPIFY_API_KEY=your-shopify-api-key
SHOPIFY_API_SECRET=your-shopify-api-secret
SHOPIFY_WEBHOOK_SECRET=your-shopify-webhook-secret

# Analytics & Tracking
GOOGLE_ANALYTICS_ID=your-ga4-id
GOOGLE_TAG_MANAGER_ID=your-gtm-id

# Communication APIs
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number

# WhatsApp Business API
WHATSAPP_API_TOKEN=your-whatsapp-api-token
WHATSAPP_PHONE_NUMBER_ID=your-whatsapp-phone-number-id

# Email Service
SENDGRID_API_KEY=your-sendgrid-api-key
RESEND_API_KEY=your-resend-api-key

# File Storage
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Monitoring & Analytics
SENTRY_DSN=your-sentry-dsn
POSTHOG_API_KEY=your-posthog-api-key

# Development
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:4000
```

## 🗄️ Database Setup

### 1. Supabase Project Setup

1. **Create a new Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and API keys

2. **Run Database Migrations**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Link your project
   supabase link --project-ref your-project-ref
   
   # Push the database schema
   supabase db push
   ```

3. **Database Schema Files**
   The following schema files are included:
   - `utils/crm_supabase_schema.sql` - CRM & Sales Pipeline
   - `utils/website_analytics_supabase_schema.sql` - Website Analytics
   - `utils/ai_chat_supabase_schema.sql` - AI Chat System
   - `utils/supabase_cash_log_tables.sql` - Cash Log System
   - `utils/supabase_rageintel_tables.sql` - Competitor Tracking
   - `utils/supabase_adpilot_tables.sql` - Ad Performance
   - `utils/supabase_alerts_table.sql` - Alerts System
   - `utils/supabase_connections_audit_tables.sql` - Audit Logging
   - `utils/supabase_scheduled_posts_table.sql` - Content Scheduling

## 🚀 Deployment Process

### Option 1: Automated Deployment (Recommended)

```bash
# Make the deployment script executable
chmod +x scripts/deploy.sh

# Run the deployment script
./scripts/deploy.sh
```

### Option 2: Manual Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Deploy to Vercel
   vercel --prod
   ```

3. **Configure Environment Variables in Vercel**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add all environment variables from your `.env.local` file

## 🔗 External Integrations Setup

### 1. Shopify Integration

1. **Create a Shopify App**
   - Go to [Shopify Partners](https://partners.shopify.com/)
   - Create a new app
   - Configure webhooks for:
     - `orders/create`
     - `orders/updated`
     - `products/create`
     - `products/update`
     - `customers/create`
     - `customers/update`

2. **Configure Webhook URLs**
   ```
   https://your-domain.vercel.app/api/shopify/webhooks
   ```

### 2. Meta (Facebook/Instagram) Integration

1. **Create a Meta App**
   - Go to [Meta for Developers](https://developers.facebook.com/)
   - Create a new app
   - Add Facebook Login and Instagram Basic Display

2. **Configure Permissions**
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `instagram_basic`
   - `instagram_content_publish`
   - `ads_read`
   - `ads_management`

### 3. OpenAI Integration

1. **Get OpenAI API Key**
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Create an API key
   - Add to environment variables

### 4. WhatsApp Business API

1. **Set up WhatsApp Business**
   - Go to [Meta Business](https://business.facebook.com/)
   - Set up WhatsApp Business API
   - Configure webhooks for message delivery

## 🔒 Security Configuration

### 1. JWT Configuration
```bash
# Generate a secure JWT secret
openssl rand -base64 32
```

### 2. CORS Configuration
The application includes proper CORS headers for production deployment.

### 3. Rate Limiting
Consider implementing rate limiting for API endpoints in production.

## 📊 Monitoring & Analytics

### 1. Sentry Integration
```env
SENTRY_DSN=your-sentry-dsn
```

### 2. Google Analytics
```env
GOOGLE_ANALYTICS_ID=your-ga4-id
```

### 3. PostHog Analytics
```env
POSTHOG_API_KEY=your-posthog-api-key
```

## 🧪 Testing

### 1. Local Development
```bash
npm run dev
```

### 2. Type Checking
```bash
npm run type-check
```

### 3. Linting
```bash
npm run lint
npm run lint:fix
```

### 4. Build Testing
```bash
npm run build
```

## 🔧 Post-Deployment Checklist

### ✅ Core Functionality
- [ ] Authentication system working
- [ ] Database connections established
- [ ] API endpoints responding
- [ ] Real-time updates functioning
- [ ] File uploads working

### ✅ Integrations
- [ ] Shopify webhooks receiving data
- [ ] Meta API connections working
- [ ] OpenAI API responding
- [ ] WhatsApp integration active
- [ ] Email service configured

### ✅ Performance
- [ ] Page load times under 3 seconds
- [ ] API response times under 500ms
- [ ] Image optimization working
- [ ] Caching configured properly

### ✅ Security
- [ ] HTTPS enforced
- [ ] Environment variables secured
- [ ] JWT tokens working
- [ ] CORS configured correctly

### ✅ Monitoring
- [ ] Error tracking active
- [ ] Analytics collecting data
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring configured

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   rm -rf .next
   npm run build
   ```

2. **Environment Variables**
   - Ensure all variables are set in Vercel dashboard
   - Check for typos in variable names
   - Verify API keys are valid

3. **Database Issues**
   ```bash
   # Reset database
   supabase db reset
   ```

4. **API Rate Limits**
   - Monitor API usage
   - Implement proper caching
   - Consider upgrading API plans

### Support

For deployment issues:
1. Check the [Vercel documentation](https://vercel.com/docs)
2. Review [Supabase documentation](https://supabase.com/docs)
3. Check application logs in Vercel dashboard

## 📈 Performance Optimization

### 1. Image Optimization
- All images are automatically optimized
- WebP and AVIF formats supported
- Lazy loading implemented

### 2. Code Splitting
- Automatic code splitting enabled
- Vendor chunks optimized
- Dynamic imports for large components

### 3. Caching
- Static assets cached
- API responses cached where appropriate
- Database query optimization

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🎯 Production Checklist

### Before Going Live
- [ ] All environment variables configured
- [ ] Database migrations completed
- [ ] External integrations tested
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Monitoring tools active
- [ ] Backup strategy implemented
- [ ] Team access configured
- [ ] Documentation updated

### Post-Launch
- [ ] Monitor error rates
- [ ] Track performance metrics
- [ ] Review user feedback
- [ ] Optimize based on usage
- [ ] Plan scaling strategy

---

## 🎉 Congratulations!

Your **Essentials Enhanced OS** is now deployed and ready to power the world's most advanced business operations!

For ongoing support and updates, refer to the main project documentation and stay tuned for new features and improvements. 