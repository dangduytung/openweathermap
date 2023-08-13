# openweathermap
The weather application uses the [OpenWeather API](https://openweathermap.org/api).
This is sample about server hiding API keys, rate limiting and caching.

## Usage

### Install dependencies

```bash
npm install
```

### Run on http://localhost:5000

```bash
npm run dev
```

### Product
```bash
npm start
```

### Add public API info

Rename **.env.example** to **.env** and edit the values

If the public API URL is **https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIkey}**

- API_BASE_URL = "https://api.openweathermap.org/data"
- API_VERSION = 2.5
- API_KEY = "YOUR API KEY"

You can add on any other query params as needed when hitting the /api endpoint such as https://yourdomain/api?q={City} without having to add your key in the client
