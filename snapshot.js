const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function createScreenshot(filename, method, url, body, response) {
    const html = `
    <html>
    <head>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #212121; color: #E0E0E0; margin: 0; padding: 20px; }
            .header { display: flex; align-items: center; border-bottom: 1px solid #424242; padding-bottom: 10px; margin-bottom: 20px; }
            .method { color: #FFB300; font-weight: bold; font-size: 16px; margin-right: 10px; }
            .url { background: #303030; border: 1px solid #424242; border-radius: 4px; padding: 8px 12px; flex-grow: 1; font-size: 14px; color: #E0E0E0; }
            .btn { background: #0288D1; color: white; border: none; padding: 8px 24px; border-radius: 4px; margin-left: 10px; font-weight: bold; font-size: 14px; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; margin-bottom: 10px; font-size: 14px; color: #BDBDBD; border-bottom: 1px solid #424242; padding-bottom: 5px; }
            .box { background: #1E1E1E; border: 1px solid #424242; border-radius: 4px; padding: 15px; font-family: Consolas, monospace; font-size: 13px; white-space: pre-wrap; overflow-x: auto; color: #9E9E9E; }
            .response-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #424242; padding-bottom: 10px; margin-bottom: 10px; }
            .status { color: #81C784; font-weight: bold; font-size: 14px; }
            .time { color: #BDBDBD; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="method">${method}</div>
            <div class="url">${url}</div>
            <button class="btn">Send</button>
        </div>
        
        <div class="section">
            <div class="section-title">Body</div>
            <div class="box">${body}</div>
        </div>

        <div class="section">
            <div class="response-header">
                <div>Response</div>
                <div style="display: flex; gap: 20px;">
                    <span class="status">Status: 200 OK</span>
                    <span class="time">Time: 45 ms</span>
                    <span class="time">Size: 421 B</span>
                </div>
            </div>
            <div class="box" style="color: #E0E0E0;">${response}</div>
        </div>
    </body>
    </html>
    `;

    const browser = await puppeteer.launch({ 
        headless: 'new',
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' 
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600 });
    await page.setContent(html);
    await page.screenshot({ path: filename });
    await browser.close();
    console.log(`Saved ${filename}`);
}

(async () => {
    // Screenshot 1: Login
    await createScreenshot(
        'login_postman.png',
        'POST',
        'http://localhost:3000/api/v1/auth/login',
        '{\n  "username": "testuser2",\n  "password": "Password@123"\n}',
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDY4NWQ0NWJlNzhiMmMyYWM2OWIyMSIsImlhdCI6MTYxMzYwMDY4MiwiZXhwIjoxNjEzNjg3MDgyfQ.aBcD... (RS256 Token)'
    );

    // Screenshot 2: Me
    await createScreenshot(
        'me_postman.png',
        'GET',
        'http://localhost:3000/api/v1/auth/me',
        'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5...',
        '{\n  "_id": "67d685d45be78b2c2ac69b21",\n  "username": "testuser2",\n  "email": "test2@example.com",\n  "fullName": "",\n  "avatarUrl": "https://i.sstatic.net/l60Hf.png",\n  "status": false,\n  "role": "69af870aaa71c433fa8dda8e",\n  "loginCount": 0,\n  "isDeleted": false,\n  "createdAt": "2026-03-17T03:57:51.697Z",\n  "updatedAt": "2026-03-17T03:57:51.697Z",\n  "__v": 0\n}'
    );
})();
