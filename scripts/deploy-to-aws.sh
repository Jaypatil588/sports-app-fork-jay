#!/bin/bash

# Sports App - AWS Deployment Helper Script
# This script helps you deploy the frontend to AWS S3

echo "🚀 Sports App - AWS Deployment Script"
echo "======================================="
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed."
    echo "📦 Install it with: brew install awscli"
    echo "🔗 Or visit: https://aws.amazon.com/cli/"
    exit 1
fi

echo "✅ AWS CLI is installed"

# Check if configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured."
    echo "🔧 Run: aws configure"
    echo "   You'll need:"
    echo "   - AWS Access Key ID"
    echo "   - AWS Secret Access Key"
    echo "   - Default region (e.g., us-east-1)"
    exit 1
fi

echo "✅ AWS CLI is configured"
echo ""

# Get bucket name
read -p "📦 Enter your S3 bucket name (e.g., sports-app-frontend): " BUCKET_NAME

if [ -z "$BUCKET_NAME" ]; then
    echo "❌ Bucket name cannot be empty"
    exit 1
fi

# Ask if bucket should be created
read -p "❓ Create bucket if it doesn't exist? (y/n): " CREATE_BUCKET

if [ "$CREATE_BUCKET" = "y" ]; then
    echo "📦 Creating S3 bucket: $BUCKET_NAME..."
    aws s3 mb s3://$BUCKET_NAME 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Bucket created successfully"
        
        # Enable static website hosting
        echo "🌐 Enabling static website hosting..."
        aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html
        
        # Set bucket policy for public read
        echo "🔓 Setting bucket policy for public access..."
        cat > /tmp/bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF
        aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:///tmp/bucket-policy.json
        rm /tmp/bucket-policy.json
        
        echo "✅ Bucket configured for static hosting"
    else
        echo "ℹ️  Bucket might already exist, continuing..."
    fi
fi

# Build frontend
echo ""
echo "🔨 Building frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "⚙️  Running build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed"

# Upload to S3
echo ""
echo "☁️  Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME/ --delete

if [ $? -ne 0 ]; then
    echo "❌ Upload failed"
    exit 1
fi

echo "✅ Upload completed"

# Get bucket region
REGION=$(aws s3api get-bucket-location --bucket $BUCKET_NAME --query 'LocationConstraint' --output text)
if [ "$REGION" = "None" ] || [ -z "$REGION" ]; then
    REGION="us-east-1"
fi

# Get website URL
if [ "$REGION" = "us-east-1" ]; then
    WEBSITE_URL="http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
else
    WEBSITE_URL="http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"
fi

echo ""
echo "🎉 Deployment successful!"
echo "================================"
echo "📍 Your app is live at:"
echo "   $WEBSITE_URL"
echo ""
echo "⚠️  IMPORTANT: Update your backend URL!"
echo "   1. Deploy backend to EC2 (see AWS_DEPLOYMENT_GUIDE.md)"
echo "   2. Update frontend/src/components/SportPage.tsx"
echo "   3. Change fetch URL to your EC2 IP"
echo "   4. Rebuild and redeploy frontend"
echo ""
echo "📚 Full deployment guide: AWS_DEPLOYMENT_GUIDE.md"
echo "================================"

