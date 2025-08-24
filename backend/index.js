const functions = require('@google-cloud/functions-framework');
const cors = require('cors');

// Configure CORS
const corsOptions = {
  origin: true, // Allow all origins for development
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

/**
 * Main Cloud Function entry point for Grant Analyzer
 * Handles both PDF and URL processing requests
 */
functions.http('analyzeGrant', async (req, res) => {
  // Handle CORS
  cors(corsOptions)(req, res, async () => {
    try {
      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        res.status(200).send();
        return;
      }

      // Only allow POST requests
      if (req.method !== 'POST') {
        res.status(405).json({
          success: false,
          error: {
            code: 'METHOD_NOT_ALLOWED',
            message: 'Only POST requests are allowed'
          }
        });
        return;
      }

      // Placeholder response for initial setup
      res.status(200).json({
        success: true,
        message: 'Grant Analyzer backend is set up and ready. Processing logic will be implemented in later tasks.',
        data: {
          eligibility: [],
          deadlines: [],
          funding: {
            minimum: null,
            maximum: null,
            details: []
          },
          requiredDocuments: []
        }
      });

    } catch (error) {
      console.error('Error in analyzeGrant function:', error);
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred'
        }
      });
    }
  });
});