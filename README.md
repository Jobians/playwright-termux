# playwright-termux

Run Playwright on Termux (Android) using system-installed Chromium — no browser downloads required.

---

## 🚀 Why?

Playwright’s official packages include browser binaries by default, but **`playwright-core` does NOT**.

This means:

- You must install a compatible Chromium yourself (via Termux)
- You must tell Playwright where that Chromium lives (`executablePath`)
- You must disable Playwright’s automatic browser downloads (`PLAYWRIGHT_BROWSERS_PATH=0`)

This setup uses `playwright-core` **to avoid browser downloads and keep your install lightweight**, while running Playwright on Termux.

---

## 📦 Requirements

- Termux (Android)  
- Node.js 18+  
- Chromium installed from Termux’s X11 repo  
- `.env` file with `CHROMIUM_PATH` and `PLAYWRIGHT_BROWSERS_PATH` set

---

## ⚙️ Setup

### 1. Enable X11 repo

```bash
pkg install x11-repo
````

### 2. Install Chromium

```bash
pkg install chromium
```

### 3. Clone repo and install dependencies

```bash
git clone https://github.com/jobians/playwright-termux.git
cd playwright-termux
npm install
# or pnpm install
```

### 4. Create `.env` file in the project root

```env
PLAYWRIGHT_BROWSERS_PATH=0
CHROMIUM_PATH=/data/data/com.termux/files/usr/bin/chromium-browser
```

*(Verify the path with `which chromium-browser` if needed)*

### 5. Run the example

```bash
npm start
```

---

## 🔑 Critical code snippet

```js
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu']
});
```

This tells `playwright-core` to use your installed Chromium instead of downloading one.

---

## 📁 Example code

Full script in [`index.js`](./index.js).

---

## 🤝 Contributions

PRs and issues welcome!

---

Happy scraping on Termux! 🐧🚀
