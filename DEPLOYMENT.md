# Deployment & Hosting Guide: John Kenneth Buhay (JKB) Portfolio

This guide details how to publish this zero-dependency static portfolio to **Vercel**, **Cloudflare Pages**, **GitHub Pages**, or **Netlify** for 100% free hosting with global CDN delivery, automated HTTPS, clean URLs, and rich social preview cards.

---

## 1. Pre-Deployment Audit Report

| Check Item | Status | Details |
| :--- | :--- | :--- |
| **Case-Sensitivity (Linux Hosting)** | **PASSED** | All `src`, `href`, `poster`, and CSS paths strictly match filenames on disk (`jkb-logo.jpg`, `flare-alert-logo.png`, `ecofertile.jpg`, `wallhaven-473lzo.jpg`, `dev.png`, `design.png`, `TechnologyConcept.png`, `Prototype-Certificate.png`). |
| **Video Asset Size** | **PASSED** | `assets/video/10000000_6594936010524684_3972209154721685950_n.mp4` is **10.41 MB** (10,920,590 bytes), safely under Cloudflare Pages' 25 MiB limit and Vercel's 100 MB limit. |
| **Video Streaming Attributes** | **PASSED** | All `<video>` tags are equipped with `controls preload="metadata" playsinline`. |
| **Favicon & Social Metadata** | **PASSED** | `favicon`, `apple-touch-icon`, Open Graph (`og:type`, `og:title`, `og:description`, `og:image`), and Twitter Card (`summary_large_image`) tags are embedded across all pages. |
| **Clean URL Fallback** | **PASSED** | `project-next-project.html` automatically redirects (301) to `project-ecofertile.html`. |

---

## 2. Multi-Host Configuration Files Included

* **`vercel.json`**:
  * Enables `"cleanUrls": true` (`/project-flare-alert` loads cleanly without `.html`).
  * Enforces `trailingSlash: false`.
  * Permanent 301 redirects from `/project-next-project` and `/project-next-project.html` to `/project-ecofertile`.
  * Security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).
  * Immutable caching for `/assets/(.*)` (`Cache-Control: public, max-age=31536000, immutable`).
* **`_redirects`**:
  * Cloudflare Pages & Netlify redirect mapping for legacy and clean URLs.
* **`_headers`**:
  * Cloudflare Pages & Netlify security and cache headers.
* **`.gitignore`**:
  * Excludes OS metadata (`.DS_Store`, `Thumbs.db`), IDE settings (`.vscode/`), and hosting caches (`.vercel/`, `.netlify/`).

---

## 3. One-Click Zero-Cost Deployment Options

### Option A: Vercel (Recommended for Clean URLs & Speed)
1. Commit and push your latest files to GitHub:
   ```bash
   git push -u origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New..."** -> **"Project"**.
4. Locate and click **Import** on `Kenabadobee09922/Web-Portfolio`.
5. Keep default settings (Framework: *Other*, Root Directory: `./`).
6. Click **Deploy**.
7. Vercel will build and assign an instant HTTPS domain (e.g., `https://web-portfolio-jkb.vercel.app`).

---

### Option B: GitHub Pages (Direct & Native)
1. Push your repository:
   ```bash
   git push -u origin main
   ```
2. Open your GitHub repository in your browser:
   `https://github.com/Kenabadobee09922/Web-Portfolio`
3. Click **Settings** (top tab) -> **Pages** (left navigation bar).
4. Under **Build and deployment**:
   * Source: `Deploy from a branch`
   * Branch: `main` / Folder: `/ (root)`
5. Click **Save**. Within 60 seconds, your site is live at:
   `https://kenabadobee09922.github.io/Web-Portfolio/`

---

### Option C: Cloudflare Pages (Unlimited Bandwidth)
1. Navigate to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Compute (Workers & Pages)** -> **Pages**.
2. Click **Connect to Git** and authorize your GitHub account.
3. Select `Kenabadobee09922/Web-Portfolio`.
4. In the build setup:
   * Framework preset: `None`
   * Build command: *(leave blank)*
   * Build output directory: `/` *(root)*
5. Click **Save and Deploy**. Cloudflare automatically respects `_headers` and `_redirects`.

---

### Option D: Netlify
1. Log into [netlify.com](https://www.netlify.com/) with GitHub.
2. Click **Add new site** -> **Import an existing project**.
3. Select `Kenabadobee09922/Web-Portfolio`.
4. Leave build command empty and publish directory as `/`. Click **Deploy site**.

---

## 4. Free Custom Domain: `jkb.is-a.dev`

You can claim a free `.is-a.dev` subdomain (e.g. `https://jkb.is-a.dev`) through the community project [is-a.dev](https://is-a.dev).

### Registration Steps:
1. Fork the repository [is-a-dev/register](https://github.com/is-a-dev/register).
2. Inside your fork, create a new file at `domains/jkb.json`.
3. Add the configuration depending on where your portfolio is hosted:

#### For Vercel Hosting:
```json
{
  "description": "Personal & Professional Portfolio for John Kenneth Buhay",
  "repo": "https://github.com/Kenabadobee09922/Web-Portfolio",
  "owner": {
    "username": "Kenabadobee09922",
    "email": "floreskenneth319@gmail.com"
  },
  "record": {
    "CNAME": "cname.vercel-dns.com"
  }
}
```

#### For GitHub Pages Hosting:
```json
{
  "description": "Personal & Professional Portfolio for John Kenneth Buhay",
  "repo": "https://github.com/Kenabadobee09922/Web-Portfolio",
  "owner": {
    "username": "Kenabadobee09922",
    "email": "floreskenneth319@gmail.com"
  },
  "record": {
    "CNAME": "kenabadobee09922.github.io"
  }
}
```

#### For Cloudflare Pages Hosting:
```json
{
  "description": "Personal & Professional Portfolio for John Kenneth Buhay",
  "repo": "https://github.com/Kenabadobee09922/Web-Portfolio",
  "owner": {
    "username": "Kenabadobee09922",
    "email": "floreskenneth319@gmail.com"
  },
  "record": {
    "CNAME": "web-portfolio.pages.dev"
  }
}
```

4. Commit the file to your fork and submit a Pull Request to `is-a-dev/register`.
5. Once merged (usually within 12–24 hours), your domain `jkb.is-a.dev` will be live and automatically provisioned with SSL!
