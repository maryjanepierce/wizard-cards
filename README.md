# Workshop Wizard Random Card Site

A ready-to-deploy static website that draws a random card from the digitized Workshops & Wizards facilitation deck.

## Files

- `index.html` - The webpage
- `styles.css` - Page styling
- `script.js` - Random card logic
- `cards.json` - Card metadata
- `cards/` - Extracted card images

## Deploy options

### GitHub Pages

1. Create a GitHub repository.
2. Upload all files from this folder to the repository root.
3. Go to **Settings > Pages**.
4. Choose deployment from the `main` branch and `/root` folder.
5. Open the URL GitHub provides.

### Azure Static Web Apps

1. Create a new Azure Static Web App.
2. Connect it to a GitHub or Azure DevOps repository containing these files.
3. Use `/` as the app location.
4. No build command is required.
5. The app artifact location can be left blank or set to `/` depending on your deployment workflow.

## License and attribution

Based on the Workshops & Wizards deck by James Smart. Testing and development by Deborah Rim Moiso. Visual design and illustrations by Laura Vidal.

The source PDF indicates the deck is licensed under CC BY-NC-SA 4.0. Keep attribution, use only in non-commercial contexts, and preserve compatible sharing terms.
