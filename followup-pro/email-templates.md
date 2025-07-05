# 📧 FollowUpPro Email Templates

## 🎯 Signup Confirmation Email

### HTML Template:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to FollowUpPro!</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            border-radius: 12px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
        }
        .title {
            color: #1f2937;
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 10px 0;
        }
        .subtitle {
            color: #6b7280;
            font-size: 16px;
            margin: 0;
        }
        .content {
            margin: 30px 0;
        }
        .welcome-text {
            font-size: 18px;
            color: #374151;
            margin-bottom: 20px;
        }
        .features {
            background: #fef3c7;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        .features h3 {
            color: #92400e;
            margin: 0 0 15px 0;
            font-size: 18px;
        }
        .feature-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .feature-list li {
            padding: 8px 0;
            color: #92400e;
            position: relative;
            padding-left: 25px;
        }
        .feature-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #059669;
            font-weight: bold;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 25px 0;
            text-align: center;
            transition: transform 0.2s;
        }
        .cta-button:hover {
            transform: translateY(-2px);
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .footer a {
            color: #f59e0b;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">FP</div>
            <h1 class="title">Welcome to FollowUpPro!</h1>
            <p class="subtitle">Your smart job application tracker</p>
        </div>
        
        <div class="content">
            <p class="welcome-text">
                Hi there! 👋<br><br>
                Thank you for joining FollowUpPro! We're excited to help you manage your job search more effectively and never miss a follow-up opportunity.
            </p>
            
            <div class="features">
                <h3>🚀 What you can do with FollowUpPro:</h3>
                <ul class="feature-list">
                    <li>Track all your job applications in one place</li>
                    <li>Get smart follow-up reminders at the perfect time</li>
                    <li>Generate professional follow-up emails</li>
                    <li>Monitor your application status and progress</li>
                    <li>Never lose track of recruiter contacts</li>
                </ul>
            </div>
            
            <p style="text-align: center; margin: 30px 0;">
                <a href="{{ .ConfirmationURL }}" class="cta-button">
                    ✅ Confirm Your Email & Get Started
                </a>
            </p>
            
            <p style="color: #6b7280; font-size: 14px; text-align: center;">
                This link will expire in 24 hours for security reasons.
            </p>
        </div>
        
        <div class="footer">
            <p>
                Questions? Contact us at <a href="mailto:support@followuppro.com">support@followuppro.com</a><br>
                FollowUpPro - Making your job search journey smarter! 🎯
            </p>
        </div>
    </div>
</body>
</html>
```

### Plain Text Version:
```
Welcome to FollowUpPro! 🎉

Hi there! 👋

Thank you for joining FollowUpPro! We're excited to help you manage your job search more effectively and never miss a follow-up opportunity.

🚀 What you can do with FollowUpPro:
✓ Track all your job applications in one place
✓ Get smart follow-up reminders at the perfect time
✓ Generate professional follow-up emails
✓ Monitor your application status and progress
✓ Never lose track of recruiter contacts

✅ Confirm Your Email & Get Started:
{{ .ConfirmationURL }}

This link will expire in 24 hours for security reasons.

Questions? Contact us at support@followuppro.com
FollowUpPro - Making your job search journey smarter! 🎯
```

## 🔐 Password Reset Email

### HTML Template:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your FollowUpPro Password</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            border-radius: 12px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
        }
        .title {
            color: #1f2937;
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 10px 0;
        }
        .subtitle {
            color: #6b7280;
            font-size: 16px;
            margin: 0;
        }
        .content {
            margin: 30px 0;
        }
        .message {
            font-size: 18px;
            color: #374151;
            margin-bottom: 20px;
        }
        .security-note {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        .security-note h3 {
            color: #dc2626;
            margin: 0 0 10px 0;
            font-size: 16px;
        }
        .security-note p {
            color: #7f1d1d;
            margin: 0;
            font-size: 14px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 25px 0;
            text-align: center;
            transition: transform 0.2s;
        }
        .cta-button:hover {
            transform: translateY(-2px);
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .footer a {
            color: #f59e0b;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">FP</div>
            <h1 class="title">Reset Your Password</h1>
            <p class="subtitle">FollowUpPro Account Security</p>
        </div>
        
        <div class="content">
            <p class="message">
                Hi there! 👋<br><br>
                We received a request to reset your FollowUpPro password. If you didn't make this request, you can safely ignore this email.
            </p>
            
            <div class="security-note">
                <h3>🔒 Security Notice</h3>
                <p>
                    This password reset link will expire in 1 hour for your security. 
                    If you need more time, you can request another reset link.
                </p>
            </div>
            
            <p style="text-align: center; margin: 30px 0;">
                <a href="{{ .ConfirmationURL }}" class="cta-button">
                    🔑 Reset My Password
                </a>
            </p>
            
            <p style="color: #6b7280; font-size: 14px; text-align: center;">
                Can't click the button? Copy and paste this link into your browser:<br>
                <span style="word-break: break-all;">{{ .ConfirmationURL }}</span>
            </p>
        </div>
        
        <div class="footer">
            <p>
                Questions? Contact us at <a href="mailto:support@followuppro.com">support@followuppro.com</a><br>
                FollowUpPro - Making your job search journey smarter! 🎯
            </p>
        </div>
    </div>
</body>
</html>
```

### Plain Text Version:
```
Reset Your FollowUpPro Password 🔐

Hi there! 👋

We received a request to reset your FollowUpPro password. If you didn't make this request, you can safely ignore this email.

🔒 Security Notice:
This password reset link will expire in 1 hour for your security. 
If you need more time, you can request another reset link.

🔑 Reset My Password:
{{ .ConfirmationURL }}

Can't click the link? Copy and paste it into your browser.

Questions? Contact us at support@followuppro.com
FollowUpPro - Making your job search journey smarter! 🎯
```

## 🎉 Welcome Email (After Confirmation)

### HTML Template:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to FollowUpPro!</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            border-radius: 12px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
        }
        .title {
            color: #1f2937;
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 10px 0;
        }
        .subtitle {
            color: #6b7280;
            font-size: 16px;
            margin: 0;
        }
        .content {
            margin: 30px 0;
        }
        .welcome-text {
            font-size: 18px;
            color: #374151;
            margin-bottom: 20px;
        }
        .getting-started {
            background: #ecfdf5;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
        }
        .getting-started h3 {
            color: #065f46;
            margin: 0 0 15px 0;
            font-size: 18px;
        }
        .step-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .step-list li {
            padding: 8px 0;
            color: #065f46;
            position: relative;
            padding-left: 30px;
        }
        .step-list li:before {
            content: counter(step-counter);
            counter-increment: step-counter;
            position: absolute;
            left: 0;
            background: #10b981;
            color: white;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 25px 0;
            text-align: center;
            transition: transform 0.2s;
        }
        .cta-button:hover {
            transform: translateY(-2px);
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
        }
        .footer a {
            color: #f59e0b;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">FP</div>
            <h1 class="title">Welcome to FollowUpPro!</h1>
            <p class="subtitle">Your account is now active</p>
        </div>
        
        <div class="content">
            <p class="welcome-text">
                Congratulations! 🎉<br><br>
                Your FollowUpPro account is now active and ready to help you manage your job search more effectively.
            </p>
            
            <div class="getting-started">
                <h3>🚀 Getting Started:</h3>
                <ol class="step-list" style="counter-reset: step-counter;">
                    <li>Add your first job application</li>
                    <li>Set up follow-up reminders</li>
                    <li>Generate professional emails</li>
                    <li>Track your progress</li>
                </ol>
            </div>
            
            <p style="text-align: center; margin: 30px 0;">
                <a href="https://your-app-url.com" class="cta-button">
                    🎯 Start Managing Your Job Search
                </a>
            </p>
            
            <p style="color: #6b7280; font-size: 14px; text-align: center;">
                Need help getting started? Check out our <a href="#" style="color: #f59e0b;">quick start guide</a>.
            </p>
        </div>
        
        <div class="footer">
            <p>
                Questions? Contact us at <a href="mailto:support@followuppro.com">support@followuppro.com</a><br>
                FollowUpPro - Making your job search journey smarter! 🎯
            </p>
        </div>
    </div>
</body>
</html>
```

### Plain Text Version:
```
Welcome to FollowUpPro! 🎉

Congratulations! 🎉

Your FollowUpPro account is now active and ready to help you manage your job search more effectively.

🚀 Getting Started:
1. Add your first job application
2. Set up follow-up reminders
3. Generate professional emails
4. Track your progress

🎯 Start Managing Your Job Search:
https://your-app-url.com

Need help getting started? Check out our quick start guide.

Questions? Contact us at support@followuppro.com
FollowUpPro - Making your job search journey smarter! 🎯
```

## 🔧 How to Set These Up in Supabase:

1. **Go to your Supabase Dashboard**
2. **Authentication → Email Templates**
3. **Select the appropriate template:**
   - "Confirm signup" - Use the signup confirmation template
   - "Reset password" - Use the password reset template
   - "Welcome" - Use the welcome email template (if available)
4. **Replace the content** with the HTML template
5. **Save changes**

## 🎨 Template Features:

### **Signup Confirmation:**
- ✅ Professional welcome message
- ✅ Feature highlights
- ✅ Clear confirmation button
- ✅ Security messaging

### **Password Reset:**
- ✅ Security-focused design
- ✅ Clear expiration notice
- ✅ Fallback link for accessibility
- ✅ Safety instructions

### **Welcome Email:**
- ✅ Getting started guide
- ✅ Step-by-step instructions
- ✅ Call-to-action button
- ✅ Support information

## 📱 All Templates Include:
- **Mobile responsive** design
- **Professional branding** with FollowUpPro colors
- **Clear call-to-action** buttons
- **Security messaging** where appropriate
- **Contact information** for support

---

**Note**: Replace `{{ .ConfirmationURL }}` with the actual Supabase URL variable and update the app URL in the welcome email template. 