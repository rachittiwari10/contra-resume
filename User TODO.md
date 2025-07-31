# User TODO – Actions Required From Rachit

The project is functional end‑to‑end, but a few items require your input or credentials before public launch:

1. **Review & Approve Palette/Art Direction**  
   The colour palette and pixel art style were selected to evoke a retro 8‑bit aesthetic.  Please review the sprite and background assets under `assets/` and confirm they reflect your personal brand.  Should you wish to adjust colours or submit your own character sprite (e.g. likeness, outfit), replace the files and update references in `resumeData.json`.

2. **Validate Résumé Content**  
   The `resumeData.json` file was parsed from your PDF résumé【607478451001152†L0-L5】【607478451001152†L12-L23】.  Verify that names, dates, achievements and metrics are accurate.  If corrections are needed, edit the JSON directly.  The game will reflect changes automatically.

3. **Provision GitHub Repository**  
   This zip archive contains a fully working project, but it is not published.  Create a public repository on your GitHub account, commit the contents of the `root/` directory and push to the `main` branch.  Ensure that GitHub Pages is enabled via Settings → Pages.  The included GitHub Actions workflow will deploy the site automatically.

4. **Set Up Custom Domain (Optional)**  
   If you wish to use a custom domain instead of `<username>.github.io/<repo>`, configure your DNS to point at GitHub Pages and add a `CNAME` file with your domain name to the root of the repository.

5. **Add Sound Effects or Music (Optional)**  
   Currently the game is silent.  To enhance engagement you may wish to generate CC‑0 sound effects (e.g., jump, collectible) using tools like bfxr or freesound.org.  Place files under `assets/audio/` and add loading/playback code in `src/main.js`.

Feel free to open issues or pull requests in your new GitHub repository if you require assistance or wish to implement additional features (e.g., multiple levels, achievements, or accessibility toggles).
