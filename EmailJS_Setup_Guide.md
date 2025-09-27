# EmailJS Setup Guide for Contact Form

## Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" 
4. Connect your Gmail account (raldablanzar@email.com)
5. Note down your SERVICE ID (e.g., "service_abc123")

## Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Contact Form Message: {{subject}}

**Body:**
```
Hello Gerald,

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your TEMPLATE ID (e.g., "template_xyz789")

## Step 4: Get Public Key
1. Go to "Account" > "General"
2. Find your Public Key (e.g., "user_abc123xyz")

## Step 5: Update Your Code
Replace these values in your script.js file:

```javascript
// Replace these with your actual values:
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your public key
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

**Example:**
```javascript
emailjs.init('user_abc123xyz');
emailjs.send('service_gmail123', 'template_contact456', {
```

## Step 6: Test Your Form
1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your Gmail inbox for the message

## Troubleshooting
- Make sure your Gmail account is connected properly
- Check the browser console for any error messages
- Verify all IDs are correct (no typos)
- EmailJS free plan allows 200 emails per month

## Security Note
The public key is safe to use in frontend code. EmailJS handles the secure email sending on their servers.