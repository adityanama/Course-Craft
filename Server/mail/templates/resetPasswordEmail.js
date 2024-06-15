exports.resetPassword = (name, url) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://coursecraft.adityanama.online"><img class="logo"
					src="https://res.cloudinary.com/deot306mk/image/upload/v1718480095/CourseCraft_Logo.png" alt="course craft Logo"></a>
            <div class="message">Reset Password Link</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>Here is your Password Reset Link : <span class="highlight">${url}</span>.
                </p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:info@coursecraft.com">info@coursecraft.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};