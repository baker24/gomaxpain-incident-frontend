# GoMaxPain Incident Dashboard

A real-time traffic incident monitoring system that fetches, stores, and displays accident data from TomTom Traffic API on an interactive map interface.

## 🏗️ Architecture

This application is separated into two independent services:

```
gomaxpainincident/
├── backend/              # Express.js API Server
│   ├── src/
│   │   ├── server.ts
│   │   ├── routes/
│   │   ├── lib/
│   │   └── ...
│   ├── package.json
│   └── README.md        # Backend documentation
│
├── app/                 # Next.js Frontend
├── components/
├── hooks/
├── package.json
└── FRONTEND_README.md   # Frontend documentation
```

### Backend (Port 3001)

- **Express.js** REST API server
- PostgreSQL database integration
- TomTom Traffic API data ingestion
- Scheduled data updates via cron
- See `backend/README.md` for details

### Frontend (Port 3000)

- **Next.js 15** application
- React with TypeScript
- Google Maps integration
- Real-time data visualization
- See `FRONTEND_README.md` for details

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- TomTom API Key
- Google Maps API Key

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/gomaxpain
TOMTOM_API_KEY=your_tomtom_api_key
CRON_SECRET=your_secure_secret
EOF

# Run database migration
npm run db:migrate

# Start backend server
npm run dev
```

Backend will run on `http://localhost:3001`

### 2. Frontend Setup

```bash
# Return to root directory
cd ..

# Install dependencies (if not already done)
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
EOF

# Start frontend server
npm run dev
```

Frontend will run on `http://localhost:3000`

### 3. Ingest Initial Data

```bash
# Trigger data ingestion
curl -X POST http://localhost:3001/api/ingestion
```

## 📋 Development Workflow

### Running Both Services

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
npm run dev
```

### Testing the API

```bash
# Health check
curl http://localhost:3001/health

# Get accidents
curl http://localhost:3001/api/accidents

# Get metrics
curl http://localhost:3001/api/metrics

# Trigger ingestion
curl -X POST http://localhost:3001/api/ingestion
```

## 🗺️ Features

### Real-Time Monitoring

- Automatic data fetching from TomTom API
- Live updates on the map
- Periodic refresh intervals

### Data Visualization

- Interactive Google Maps interface
- Incident markers with details
- Filtering and clustering

### Analytics

- Accidents today/last hour
- Total incident count
- Breakdown by incident type
- Coverage areas

### API Endpoints

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| GET    | `/api/accidents`     | List all accidents             |
| GET    | `/api/accidents/:id` | Get specific accident          |
| GET    | `/api/metrics`       | Get accident metrics           |
| POST   | `/api/ingestion`     | Trigger data ingestion         |
| GET    | `/api/ingestion`     | Get ingestion stats            |
| GET    | `/api/patients`      | Get patient data               |
| GET    | `/api/cron`          | Scheduled ingestion (auth req) |
| GET    | `/health`            | Health check                   |

## 🌐 Deployment

### Backend Deployment

**Railway / Render / Fly.io:**

1. Create new service
2. Connect repository
3. Set root directory to `backend/`
4. Add environment variables
5. Set build command: `npm run build`
6. Set start command: `npm start`

### Frontend Deployment

**Vercel (Recommended):**

1. Import project from GitHub
2. Vercel auto-detects Next.js
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL` → Your backend URL
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` → Your Maps key
4. Deploy

**Note:** Make sure to update `FRONTEND_URL` in backend `.env` to match your deployed frontend URL for CORS.

## 🔒 Environment Variables

### Backend (.env)

```bash
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
DATABASE_URL=postgresql://user:pass@host:5432/db
TOMTOM_API_KEY=your_key
CRON_SECRET=your_secret
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
```

## 📚 API Keys Setup

### TomTom API Key

1. Go to [TomTom Developer Portal](https://developer.tomtom.com/)
2. Create account and get API key
3. Add to backend `.env` as `TOMTOM_API_KEY`

### Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Maps JavaScript API
3. Create API key
4. Add to frontend `.env.local` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

## 🗄️ Database Setup

### PostgreSQL Installation

**macOS:**

```bash
brew install postgresql@14
brew services start postgresql@14
createdb gomaxpain
```

**Ubuntu/Debian:**

```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb gomaxpain
```

**Docker:**

```bash
docker run --name gomaxpain-db \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=gomaxpain \
  -p 5432:5432 \
  -d postgres:14
```

### Database Migration

```bash
cd backend
npm run db:migrate
```

## 🧪 Testing

### Backend

```bash
cd backend
npm run lint
```

### Frontend

```bash
npm run lint
```

## 📁 Project Structure

```
.
├── backend/                  # Express API Server
│   ├── src/
│   │   ├── server.ts        # Main server file
│   │   ├── routes/          # API endpoints
│   │   ├── lib/
│   │   │   ├── config/      # Configuration
│   │   │   ├── db/          # Database
│   │   │   ├── repositories/# Data access
│   │   │   └── services/    # Business logic
│   │   ├── types/           # Type definitions
│   │   └── scripts/         # Utility scripts
│   └── package.json
│
├── app/                     # Next.js app directory
│   ├── components/          # React components
│   │   ├── map/            # Map components
│   │   ├── stats/          # Stats components
│   │   └── table/          # Table components
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
│
├── hooks/                   # Custom React hooks
│   ├── useIncident.ts
│   └── useAccidentMetrics.ts
│
├── types/                   # Frontend types
├── public/                  # Static assets
└── package.json            # Frontend dependencies
```

## 🐛 Troubleshooting

### Backend won't start

- Check PostgreSQL is running: `pg_isready`
- Verify `DATABASE_URL` in `.env`
- Check port 3001 is available: `lsof -i :3001`

### Frontend shows no data

- Verify backend is running on port 3001
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for errors
- Test API directly: `curl http://localhost:3001/api/accidents`

### Map not loading

- Verify Google Maps API key is valid
- Check billing is enabled in Google Cloud Console
- Ensure Maps JavaScript API is enabled

### Database connection failed

- Check PostgreSQL is running
- Verify credentials in `DATABASE_URL`
- Run migration: `cd backend && npm run db:migrate`

## 📖 Documentation

- **Backend API**: `backend/README.md`
- **Frontend**: `FRONTEND_README.md`
- **Deployment Options**: `DEPLOYMENT_OPTIONS.md` (if exists)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

Private - All Rights Reserved

## 🆘 Support

For issues and questions:

- Check documentation in `backend/README.md` and `FRONTEND_README.md`
- Review existing issues
- Create new issue with detailed description

## 🎯 Roadmap

- [ ] Add user authentication
- [ ] Implement WebSocket for real-time updates
- [ ] Add more data sources (Waze)
- [ ] Mobile app support
- [ ] Advanced analytics dashboard
- [ ] Email/SMS alerts for incidents

---

**Built with ❤️ for traffic safety monitoring**
