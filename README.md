# Rachit Tiwari – Interactive Résumé Game

This project is an interactive résumé for **Rachit Tiwari**, presented as a retro‑inspired side‑scrolling platformer.  Built with the lightweight [Phaser 3](https://phaser.io/) game framework and entirely original CC‑0 assets, it transforms Rachit’s career journey into collectibles you discover as you play.

> **Important:** no assets, code or music from *Contra* or any other commercial game were used.  All sprites, tiles and sounds were created or generated for this project under CC0 (see `assets/licence.txt`).

## Features

- Side‑scrolling platformer where each collectible reveals a career milestone.
- Responsive layout using Phaser’s `Scale.FIT` to support desktop and mobile screens.
- Dynamic tooltips powered by `resumeData.json` so content updates don’t require code changes.
- Simple physics with jumping, walking and collision detection.
- Auto‑deploy workflow for GitHub Pages.

## Project Structure

```
root/
├─ index.html               → entry point for the game and DOM overlay
├─ resumeData.json          → parsed résumé details (contact, skills, experience)
├─ src/
│  └─ main.js               → core Phaser game logic
├─ assets/
│  ├─ sprites/
│  │  ├─ hero.png           → sprite sheet for the player (3 walking frames)
│  │  └─ coin.png           → collectible token
│  ├─ tilesets/
│  │  └─ background.png     → scrolling background landscape
│  ├─ audio/                → (optional) sound effects
│  └─ licence.txt           → CC‑0 licence and asset provenance
├─ .github/workflows/gh‑pages.yml → GitHub Actions workflow to deploy `main` to Pages
├─ Design Spec.md           → storyboard and mapping between résumé events and game flow
├─ User TODO.md             → tasks requiring Rachit’s input
├─ CHANGELOG.md             → development log
└─ README.md                → this file
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14+).  Only the built‑in `npm` CLI is used; no external dependencies are required.
- Python 3 (for the development server).

### Local Development

1. **Clone the repository** (or extract the provided ZIP) and change into the project root:

   ```bash
   git clone <repo-url>
   cd <repo-name>
   ```

2. **Install dependencies and start the dev server**:

   ```bash
   npm install
   npm run dev
   ```

   The `dev` script simply runs a Python HTTP server on port 3000.  Visit [http://localhost:3000](http://localhost:3000) in your browser and start playing.

3. **Edit `resumeData.json`** if you wish to update any of the information shown in‑game.  The game will reload automatically when you refresh the page.

### Build & Minify (Optional)

No bundler is required for this project.  The game runs directly in the browser, pulling Phaser from a CDN.  If you wish to optimise further you can minify `main.js` or use a bundler like Vite; however, the current setup keeps tooling minimal and transparent.

## Deployment

A pre‑configured GitHub Actions workflow (`.github/workflows/gh‑pages.yml`) will automatically build and publish the site to GitHub Pages whenever you push to the `main` branch.  To enable:

1. Create a new repository on GitHub and push the contents of this project to the `main` branch.
2. Go to **Settings → Pages** and choose the `gh-pages` branch created by the workflow as your source.  After a few minutes, your interactive résumé will be live at `https://<username>.github.io/<repo-name>/`.
3. For a custom domain, configure your DNS and add a `CNAME` file—this step is listed in `User TODO.md` and requires manual input.

## Contributing

Contributions (bug fixes, accessibility improvements, new levels) are welcome!  Please open an issue or submit a pull request.  All code should follow the Airbnb JavaScript style guide and be thoroughly commented.

Enjoy exploring Rachit’s career story in game form!
