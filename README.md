# playwright-termux

Run Playwright on Termux (Android) using a system-installed Chromium browser — no Playwright browser downloads required.

## Why

The official `playwright` package bundles browser binaries. In contrast, **`playwright-core` does not include browser downloads**. A common issue on Termux/Android is that Playwright's default browser path handling can trigger an Android platform check (e.g. `Error: Unsupported platform: android`) when trying to locate or download browsers. 

This setup solves that by:

- Setting `PLAYWRIGHT_BROWSERS_PATH=0` to disable Playwright's default browser cache/path logic, preventing the Android platform check that fails in this scenario.
- Using `playwright-core` with a system-installed Chromium from the Termux X11 repository.
- Pointing Playwright to that Chromium via `executablePath` (`CHROMIUM_PATH`).

## Requirements

- Termux X11 repository enabled
- Chromium installed from the Termux X11 repository

## Setup

### 1. Enable the X11 repository and update package lists

```bash
pkg install x11-repo
pkg update
```

### 2. Install Chromium

```bash
pkg install chromium
```

### 3. Configure `.env`

Create a `.env` file in the project root with the following:

```env
PLAYWRIGHT_BROWSERS_PATH=0
CHROMIUM_PATH=/data/data/com.termux/files/usr/bin/chromium-browser
```

`PLAYWRIGHT_BROWSERS_PATH=0` is required for this Termux setup. 

Find your Chromium path:

```bash
which chromium-browser 2>/dev/null || which chromium
```

Set `CHROMIUM_PATH` to the path returned by the command. If the binary is different, update it accordingly.

### 4. `executablePath`

Playwright launches the system-installed Chromium using the path from `.env`:

```js
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu']
});
```

## Example

### 1. Clone this example repo

```bash
git clone https://github.com/jobians/playwright-termux.git
cd playwright-termux
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run `npm start`

```bash
npm start
```

You should see the GitHub Playwright page title printed to the console. See [`index.js`](./index.js) for the full script.

## Notes

- If you're running in an environment without a display server, use headless mode as shown. Termux with X11 is only needed if you want to run headed.
- Always verify the binary path after installing Chromium—package names/paths can differ across Termux versions.

## Contributions

PRs and issues are welcome!

<center>Happy scraping on Termux! 🐧🚀</center>
