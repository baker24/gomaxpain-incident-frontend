# GoMaxPain Incident Dashboard - Frontend

A real-time traffic incident monitoring dashboard with interactive maps, weather overlays, and live analytics.

## 🎯 What You Have

### Core Features

- **Interactive Google Maps** with custom dark theme and real-time incident markers
- **Weather Overlays** - Precipitation and Wind layers from OpenWeatherMap
- **Live Analytics Dashboard** - Today's accidents, last hour stats, yesterday comparison, and national coverage %
- **Incident Details Modal** - Click any incident to see full details with patient information
- **Patient Data System** - Mock patient records with personal info, contact details, and social media
- **Coverage Areas** - Visual representation of monitored regions on the map
- **State Navigation** - Quick zoom buttons for states

### Tech Stack

- **Next.js 15** with App Router
- **React 18** + TypeScript
- **Tailwind CSS** for styling
- **Google Maps JavaScript API**
- **OpenWeatherMap API**

### Components Structure

```
app/
├── components/
│   ├── map/               # Map with weather layers
│   ├── stats/             # Metrics & analytics panels
│   └── table/             # Incident table, popup, patient details
├── page.tsx               # Main dashboard
└── layout.tsx             # App layout

hooks/                     # useIncident, useAccidentMetrics, useCoverageStats
services/                  # Logger, patient data generator
types/                     # TypeScript definitions
```

## 🚀 Setup

```bash
# Install dependencies
npm install

# Create .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_key

# Run development server
npm run dev

# Build for production
npm run build
```

## 📊 Production Status

✅ **Zero linter warnings**  
✅ **Build time:** 13.5s  
✅ **First Load JS:** 286 kB  
✅ **Type-safe** throughout  
✅ **Ready to deploy**

---

**Built with ❤️ for traffic safety monitoring by GoMAXPAIN**
