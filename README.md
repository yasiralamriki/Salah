![Logo + Text](https://github.com/user-attachments/assets/1cedf954-9dc6-43bd-888a-522c27dc5619)

# Salah – Prayer Times Application

![Preview](https://i.imgur.com/qqloCvY.png)

## 🕌 About

**Salah** is a lightweight, front-end-only web application that displays Islamic prayer times. It is built entirely with **vanilla JavaScript** – no external libraries or frameworks (like Node.js or Tailwind CSS) are used.

---

## ⚙️ Configuration

> [!NOTE]
> This application now uses environment variables stored in a `.env` file for better security and configuration management.

### Steps:

1. Obtain an API Key for the **Google Maps Geocoding API** from [Google Cloud Console](https://console.cloud.google.com/).
2. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edit the `.env` file and replace `your_google_api_key_here` with your actual API key:
   ```env
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

### Running the Application

To run the application locally:

```bash
npm start
```

Or directly with Python:

```bash
python server.py
```

Then open your browser and navigate to `http://localhost:8001`.

---

## 🚀 Deployment

### Vercel Deployment

1. **Set Environment Variables in Vercel:**
   - Go to your Vercel project settings
   - Add `GOOGLE_API_KEY` as an environment variable
   - Set the value to your Google Maps API key

2. **Deploy:**
   ```bash
   npm run build  # Test build locally (optional)
   vercel --prod  # Deploy to Vercel
   ```

The application automatically detects whether it's running locally (uses `.env` file) or in production (uses injected environment variables).

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

---

## 🛠️ Development vs Production

- **Local Development**: Uses `.env` file and Python server
- **Production (Vercel)**: Uses build-time environment variable injection
- The code automatically adapts to both environments
