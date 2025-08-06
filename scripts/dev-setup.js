#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up development environment...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env.local with placeholder values...');
    const envContent = `# Development Environment Variables
# Replace these with your actual values for full functionality

NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
JWT_SECRET=essentials-enhanced-super-secure-jwt-secret-2024-xyz789abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567

# Social Media API Keys (placeholder values)
FACEBOOK_CLIENT_ID=placeholder-facebook-client-id
FACEBOOK_CLIENT_SECRET=placeholder-facebook-client-secret
GOOGLE_CLIENT_ID=placeholder-google-client-id
GOOGLE_CLIENT_SECRET=placeholder-google-client-secret
TIKTOK_CLIENT_KEY=placeholder-tiktok-client-key
TIKTOK_CLIENT_SECRET=placeholder-tiktok-client-secret
LINKEDIN_CLIENT_ID=placeholder-linkedin-client-id
LINKEDIN_CLIENT_SECRET=placeholder-linkedin-client-secret
SNAPCHAT_CLIENT_ID=placeholder-snapchat-client-id
SNAPCHAT_CLIENT_SECRET=placeholder-snapchat-client-secret
TWITTER_CLIENT_ID=placeholder-twitter-client-id
TWITTER_CLIENT_SECRET=placeholder-twitter-client-secret
SHOPIFY_API_KEY=placeholder-shopify-api-key
SHOPIFY_API_SECRET=placeholder-shopify-api-secret

# OpenAI API Key
OPENAI_API_KEY=placeholder-openai-api-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:4000
`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env.local created successfully');
} else {
    console.log('✅ .env.local already exists');
}

console.log('\n🎯 Development Commands:');
console.log('  npm run dev          - Start development server');
console.log('  npm run dev:debug    - Start with debugging enabled');
console.log('  npm run dev:verbose  - Start with verbose logging');
console.log('  npm run lint         - Run ESLint');
console.log('  npm run lint:fix     - Fix ESLint issues');
console.log('  npm run type-check   - Run TypeScript type checking');
console.log('  npm run clean        - Clean build cache');

console.log('\n🔧 VS Code Extensions (recommended):');
console.log('  - ESLint');
console.log('  - Prettier');
console.log('  - Tailwind CSS IntelliSense');
console.log('  - TypeScript Importer');
console.log('  - Auto Rename Tag');

console.log('\n🌐 Access your app at: http://localhost:4000');
console.log('\n✨ Development environment ready!'); 