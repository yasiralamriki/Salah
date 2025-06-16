![Logo + Text](https://github.com/user-attachments/assets/1cedf954-9dc6-43bd-888a-522c27dc5619)

# Salah – Prayer Times Application

![Preview](https://i.imgur.com/qqloCvY.png)

## 🕌 About

**Salah** is a lightweight, front-end-only web application that displays Islamic prayer times. It is built entirely with **vanilla JavaScript** – no external libraries or frameworks (like Node.js or Tailwind CSS) are used.

---

## ⚙️ Configuration

> [!WARNING]
> This setup involves placing your **API key directly in a JavaScript file**, which makes it publicly visible. To secure your key, it is strongly recommended that you apply **API restrictions** (e.g., restrict by referrer or IP) via the [Google Cloud Console](https://console.cloud.google.com/).

### Steps:

1. Obtain an API Key for the **Google Maps Geocoding API** from [Google Cloud Console](https://console.cloud.google.com/).
2. In the `./resources` directory, create a file named `config.js`.
3. Inside `config.js`, define your API key as shown below:

```js
const googleApiKey = "Your key goes here";
