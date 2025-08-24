# Grant Analyzer MVP

A web application that analyzes grant guidelines from PDF files or web URLs and extracts key information using AI.

## Project Structure

```
grant-analyzer/
├── frontend/           # Static frontend application
│   ├── index.html     # Main HTML file with Tailwind CSS
│   ├── js/
│   │   └── app.js     # Frontend JavaScript application
│   └── package.json   # Frontend dependencies and scripts
├── backend/            # Serverless backend (Google Cloud Functions)
│   ├── index.js       # Main Cloud Function handler
│   ├── package.json   # Backend dependencies and scripts
│   └── .env.example   # Environment variables template
└── README.md          # This file
```

## Development Setup

### Frontend Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (optional, for development server):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   # Using Python (if available)
   npm run dev
   
   # Or using Node.js http-server
   npm run dev-node
   ```

4. Open your browser to `http://localhost:8000`

### Backend Development

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` file with your actual API keys and configuration

5. Start the development server:
   ```bash
   npm run dev
   ```

6. The backend will be available at `http://localhost:8080`

## Technology Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Node.js, Google Cloud Functions
- **AI**: Google Gemini API
- **PDF Processing**: pdf-parse library
- **Web Scraping**: cheerio + axios

## Requirements

- Node.js 18+ (for backend development)
- Google Cloud account (for deployment)
- Google Gemini API key (for AI analysis)

## Implementation Status

### ✅ Completed Features

- **Frontend Input Interface**: PDF upload and URL input with validation
- **Results Display Components**: Four-section structured display
- **Result Formatting**: Date formatting (MM/DD/YYYY), currency formatting, HTML escaping
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Unit Testing**: Comprehensive test suite (28 tests passing)
- **Error Handling**: Input validation and user feedback

### 🔄 Next Steps

The following features will be implemented in subsequent tasks:

1. Backend content processing services
2. AI integration for grant analysis
3. PDF text extraction
4. Web scraping for URL content
5. Production deployment

## Testing

### Unit Tests
```bash
cd frontend
npm test
```

### Manual Testing
- Main application: `http://localhost:8000/index.html`
- Simple test: `http://localhost:8000/simple-test.html`
- Step-by-step diagnostic: `http://localhost:8000/step-by-step-test.html`
- Full workflow test: `http://localhost:8000/test-full-workflow.html`

## Current Features

- **PDF Upload**: Drag & drop or file selection with validation
- **URL Input**: Web URL analysis with validation
- **Results Display**: Structured four-section layout
  - Eligibility Checklist (with bullet points)
  - Key Deadlines (with date formatting)
  - Funding Details (with currency formatting)
  - Required Documents (with checklist format)
- **Print Support**: Print-friendly results formatting
- **Responsive Design**: Works on all device sizes

## License

MIT