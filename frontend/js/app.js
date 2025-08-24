// Grant Analyzer Frontend Application
class GrantAnalyzer {
    constructor() {
        this.app = document.getElementById('app');
        this.currentInputMode = 'pdf'; // 'pdf' or 'url'
        this.formatter = new ResultsFormatter();
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.app.innerHTML = `
            <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 class="text-xl sm:text-2xl font-semibold mb-4">Upload Grant Document</h2>
                <p class="text-gray-600 mb-6 text-sm sm:text-base">Choose how you'd like to provide the grant information:</p>
                
                <!-- Input Mode Toggle -->
                <div class="flex mb-6 bg-gray-100 rounded-lg p-1">
                    <button 
                        id="pdf-tab" 
                        class="flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${this.currentInputMode === 'pdf' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
                    >
                        <span class="hidden sm:inline">📄 Upload PDF</span>
                        <span class="sm:hidden">📄 PDF</span>
                    </button>
                    <button 
                        id="url-tab" 
                        class="flex-1 py-2 px-2 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${this.currentInputMode === 'url' ? 'bg-white text-primary shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
                    >
                        <span class="hidden sm:inline">🔗 Enter URL</span>
                        <span class="sm:hidden">🔗 URL</span>
                    </button>
                </div>

                <!-- PDF Upload Section -->
                <div id="pdf-section" class="${this.currentInputMode === 'pdf' ? 'block' : 'hidden'}">
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center hover:border-primary transition-colors" id="drop-zone">
                        <div class="space-y-3 sm:space-y-4">
                            <div class="text-3xl sm:text-4xl">📄</div>
                            <div>
                                <p class="text-base sm:text-lg font-medium text-gray-900">Drop your PDF here</p>
                                <p class="text-xs sm:text-sm text-gray-500">or click to browse files</p>
                            </div>
                            <input 
                                type="file" 
                                id="pdf-input" 
                                accept=".pdf,application/pdf" 
                                class="hidden"
                            >
                            <button 
                                type="button" 
                                id="browse-btn"
                                class="inline-flex items-center px-3 sm:px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                Choose File
                            </button>
                        </div>
                        <p class="text-xs text-gray-400 mt-3 sm:mt-4">Maximum file size: 10MB</p>
                    </div>
                    
                    <!-- Selected file display -->
                    <div id="selected-file" class="hidden mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                                <div class="text-xl sm:text-2xl flex-shrink-0">📄</div>
                                <div class="min-w-0 flex-1">
                                    <p id="file-name" class="text-xs sm:text-sm font-medium text-gray-900 truncate"></p>
                                    <p id="file-size" class="text-xs text-gray-500"></p>
                                </div>
                            </div>
                            <button 
                                id="remove-file" 
                                class="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                                title="Remove file"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>

                <!-- URL Input Section -->
                <div id="url-section" class="${this.currentInputMode === 'url' ? 'block' : 'hidden'}">
                    <div class="space-y-3 sm:space-y-4">
                        <div>
                            <label for="url-input" class="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                Grant Guidelines URL
                            </label>
                            <input 
                                type="url" 
                                id="url-input" 
                                placeholder="https://example.com/grant-guidelines"
                                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            >
                        </div>
                        <p class="text-xs text-gray-500">
                            Enter the URL of a webpage containing grant guidelines or requirements
                        </p>
                    </div>
                </div>

                <!-- Processing Status -->
                <div id="processing-status" class="hidden mt-4 sm:mt-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-primary"></div>
                            </div>
                            <div class="ml-3 min-w-0 flex-1">
                                <p id="processing-message" class="text-xs sm:text-sm font-medium text-blue-800">
                                    Processing your document...
                                </p>
                                <p class="text-xs text-blue-600 mt-1">
                                    This may take up to 30 seconds
                                </p>
                            </div>
                        </div>
                        <div class="mt-3">
                            <div class="bg-blue-200 rounded-full h-1.5 sm:h-2">
                                <div id="progress-bar" class="bg-primary h-1.5 sm:h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Success Status -->
                <div id="success-status" class="hidden mt-4 sm:mt-6">
                    <div class="bg-green-50 border border-green-200 rounded-md p-3 sm:p-4">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <span class="text-green-400 text-lg sm:text-xl">✅</span>
                            </div>
                            <div class="ml-3 min-w-0 flex-1">
                                <p class="text-xs sm:text-sm font-medium text-green-800">
                                    Analysis completed successfully!
                                </p>
                                <p class="text-xs text-green-600 mt-1">
                                    Your grant information has been extracted and summarized below.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Button -->
                <div class="mt-4 sm:mt-6">
                    <button 
                        id="analyze-btn" 
                        class="w-full py-2.5 sm:py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled
                    >
                        <span id="btn-text">Analyze Grant</span>
                        <div id="btn-spinner" class="hidden inline-block ml-2 animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                    </button>
                </div>
            </div>

            <!-- Results Display Section -->
            <div id="results-section" class="hidden mt-6 sm:mt-8">
                <div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
                    <h2 class="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900">Grant Analysis Results</h2>
                    
                    <!-- Results Grid -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        
                        <!-- Eligibility Checklist Section -->
                        <div class="bg-gray-50 rounded-lg p-4 sm:p-5">
                            <div class="flex items-center mb-3 sm:mb-4">
                                <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span class="text-lg sm:text-xl">✅</span>
                                </div>
                                <h3 class="ml-3 text-base sm:text-lg font-semibold text-gray-900">Eligibility Checklist</h3>
                            </div>
                            <div id="eligibility-content" class="space-y-2">
                                <!-- Eligibility items will be populated here -->
                            </div>
                            <div id="eligibility-empty" class="hidden text-sm text-gray-500 italic">
                                Information not found in document
                            </div>
                        </div>

                        <!-- Key Deadlines Section -->
                        <div class="bg-gray-50 rounded-lg p-4 sm:p-5">
                            <div class="flex items-center mb-3 sm:mb-4">
                                <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                    <span class="text-lg sm:text-xl">📅</span>
                                </div>
                                <h3 class="ml-3 text-base sm:text-lg font-semibold text-gray-900">Key Deadlines</h3>
                            </div>
                            <div id="deadlines-content" class="space-y-2">
                                <!-- Deadline items will be populated here -->
                            </div>
                            <div id="deadlines-empty" class="hidden text-sm text-gray-500 italic">
                                Information not found in document
                            </div>
                        </div>

                        <!-- Funding Details Section -->
                        <div class="bg-gray-50 rounded-lg p-4 sm:p-5">
                            <div class="flex items-center mb-3 sm:mb-4">
                                <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <span class="text-lg sm:text-xl">💰</span>
                                </div>
                                <h3 class="ml-3 text-base sm:text-lg font-semibold text-gray-900">Funding Details</h3>
                            </div>
                            <div id="funding-content" class="space-y-2">
                                <!-- Funding items will be populated here -->
                            </div>
                            <div id="funding-empty" class="hidden text-sm text-gray-500 italic">
                                Information not found in document
                            </div>
                        </div>

                        <!-- Required Documents Section -->
                        <div class="bg-gray-50 rounded-lg p-4 sm:p-5">
                            <div class="flex items-center mb-3 sm:mb-4">
                                <div class="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span class="text-lg sm:text-xl">📋</span>
                                </div>
                                <h3 class="ml-3 text-base sm:text-lg font-semibold text-gray-900">Required Documents</h3>
                            </div>
                            <div id="documents-content" class="space-y-2">
                                <!-- Document items will be populated here -->
                            </div>
                            <div id="documents-empty" class="hidden text-sm text-gray-500 italic">
                                Information not found in document
                            </div>
                        </div>

                    </div>

                    <!-- Action Buttons -->
                    <div class="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button 
                            id="analyze-another-btn" 
                            class="flex-1 py-2.5 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                        >
                            Analyze Another Document
                        </button>
                        <button 
                            id="print-results-btn" 
                            class="flex-1 py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                        >
                            Print Results
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Tab switching
        document.getElementById('pdf-tab').addEventListener('click', () => this.switchInputMode('pdf'));
        document.getElementById('url-tab').addEventListener('click', () => this.switchInputMode('url'));

        // PDF upload handlers
        const dropZone = document.getElementById('drop-zone');
        const pdfInput = document.getElementById('pdf-input');
        const browseBtn = document.getElementById('browse-btn');

        // File input change
        pdfInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files[0]));

        // Browse button click
        browseBtn.addEventListener('click', () => pdfInput.click());

        // Drag and drop handlers
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-primary', 'bg-blue-50');
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-primary', 'bg-blue-50');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-primary', 'bg-blue-50');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileSelect(files[0]);
            }
        });

        // Remove file button
        document.getElementById('remove-file').addEventListener('click', () => this.removeSelectedFile());

        // URL input handler
        document.getElementById('url-input').addEventListener('input', (e) => this.handleUrlInput(e.target.value));

        // Analyze button
        document.getElementById('analyze-btn').addEventListener('click', () => this.handleAnalyze());

        // Results section buttons
        document.getElementById('analyze-another-btn').addEventListener('click', () => this.resetForNewAnalysis());
        document.getElementById('print-results-btn').addEventListener('click', () => this.printResults());
    }

    switchInputMode(mode) {
        this.currentInputMode = mode;
        
        // Clear any existing errors when switching modes
        this.clearErrors();
        
        // Update tab appearance
        const pdfTab = document.getElementById('pdf-tab');
        const urlTab = document.getElementById('url-tab');
        
        if (mode === 'pdf') {
            pdfTab.className = pdfTab.className.replace('text-gray-600 hover:text-gray-900', 'bg-white text-primary shadow-sm');
            urlTab.className = urlTab.className.replace('bg-white text-primary shadow-sm', 'text-gray-600 hover:text-gray-900');
        } else {
            urlTab.className = urlTab.className.replace('text-gray-600 hover:text-gray-900', 'bg-white text-primary shadow-sm');
            pdfTab.className = pdfTab.className.replace('bg-white text-primary shadow-sm', 'text-gray-600 hover:text-gray-900');
        }

        // Show/hide sections
        document.getElementById('pdf-section').classList.toggle('hidden', mode !== 'pdf');
        document.getElementById('url-section').classList.toggle('hidden', mode !== 'url');

        // Reset analyze button state
        this.updateAnalyzeButton();
    }

    handleFileSelect(file) {
        if (!file) return;

        // Validate the file
        const validation = this.validatePDF(file);
        if (!validation.isValid) {
            this.showError(validation.error);
            return;
        }

        // Clear any previous errors
        this.clearErrors();

        // Store the selected file
        this.selectedFile = file;

        // Display file info
        document.getElementById('file-name').textContent = file.name;
        document.getElementById('file-size').textContent = this.formatFileSize(file.size);
        document.getElementById('selected-file').classList.remove('hidden');

        // Update analyze button
        this.updateAnalyzeButton();
    }

    removeSelectedFile() {
        this.selectedFile = null;
        document.getElementById('pdf-input').value = '';
        document.getElementById('selected-file').classList.add('hidden');
        this.updateAnalyzeButton();
    }

    handleUrlInput(url) {
        this.currentUrl = url.trim();
        
        // Validate URL if not empty
        if (this.currentUrl) {
            const validation = this.validateURL(this.currentUrl);
            if (!validation.isValid) {
                this.showError(validation.error);
                this.updateAnalyzeButton();
                return;
            }
        }

        // Clear any previous errors
        this.clearErrors();
        this.updateAnalyzeButton();
    }

    updateAnalyzeButton() {
        const analyzeBtn = document.getElementById('analyze-btn');
        const validation = this.validateInputs();
        
        analyzeBtn.disabled = !validation.isValid;
        
        // Update button text based on current mode
        if (this.currentInputMode === 'pdf') {
            analyzeBtn.textContent = this.selectedFile ? 'Analyze PDF' : 'Select PDF to Analyze';
        } else {
            analyzeBtn.textContent = this.currentUrl ? 'Analyze URL' : 'Enter URL to Analyze';
        }
    }

    handleAnalyze() {
        // Validate inputs before processing
        const validation = this.validateInputs();
        if (!validation.isValid) {
            this.showError(validation.error);
            return;
        }

        // Clear any previous states
        this.hideAllStates();

        // Show processing state
        if (this.currentInputMode === 'pdf') {
            this.showProcessingState('Extracting text from PDF...');
        } else {
            this.showProcessingState('Fetching content from URL...');
        }

        // Simulate processing for demonstration (will be replaced with actual API call in later tasks)
        this.simulateProcessing();
    }

    // Temporary method to simulate processing - will be replaced in later tasks
    simulateProcessing() {
        console.log('Starting analysis simulation...');
        console.log('Input mode:', this.currentInputMode);
        
        if (this.currentInputMode === 'pdf') {
            console.log('Selected file:', this.selectedFile);
        } else {
            console.log('URL:', this.currentUrl);
        }

        // Simulate different processing stages
        setTimeout(() => {
            document.getElementById('processing-message').textContent = 'Analyzing content with AI...';
        }, 2000);

        setTimeout(() => {
            document.getElementById('processing-message').textContent = 'Formatting results...';
        }, 4000);

        // Simulate completion after 6 seconds
        setTimeout(() => {
            this.completeProgress();
            setTimeout(() => {
                this.showSuccessState(); // Will use sample data for demonstration
                console.log('Analysis simulation completed');
            }, 500);
        }, 6000);

        // Uncomment one of these to test error states:
        // setTimeout(() => this.showError('Network connection failed. Please check your internet connection and try again.', 'network'), 3000);
        // setTimeout(() => this.showError('Processing timed out. The document may be too large or complex.', 'timeout'), 3000);
        // setTimeout(() => this.showError('Unable to process the document. Please ensure it contains readable text.', 'processing'), 3000);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Results Display Methods
    displayResults(results) {
        // Show results section
        document.getElementById('results-section').classList.remove('hidden');
        
        // Use sample data if no results provided (for demonstration)
        const sampleResults = {
            eligibility: [
                "Must be a registered 501(c)(3) nonprofit organization",
                "Organization must have been in operation for at least 2 years",
                "Must serve communities with median household income below $50,000",
                "Previous grant recipients must wait 3 years before reapplying"
            ],
            deadlines: [
                "Letter of Intent Due: March 15, 2024",
                "Full Application Due: April 30, 2024",
                "Award Notification: June 15, 2024",
                "Project Start Date: September 1, 2024"
            ],
            funding: {
                minimum: "$25,000",
                maximum: "$100,000",
                details: [
                    "Average award amount: $65,000",
                    "Multi-year funding available (up to 3 years)",
                    "Matching funds required: 25% of total project cost",
                    "Administrative costs limited to 15% of total budget"
                ]
            },
            requiredDocuments: [
                "IRS determination letter (501c3 status)",
                "Audited financial statements (last 2 years)",
                "Board of directors list with contact information",
                "Project budget and budget narrative",
                "Letters of support from community partners",
                "Organizational chart and staff qualifications"
            ]
        };
        
        const dataToDisplay = results || sampleResults;
        
        // Populate each section
        this.populateEligibilitySection(dataToDisplay.eligibility);
        this.populateDeadlinesSection(dataToDisplay.deadlines);
        this.populateFundingSection(dataToDisplay.funding);
        this.populateDocumentsSection(dataToDisplay.requiredDocuments);
        
        // Scroll to results
        setTimeout(() => {
            document.getElementById('results-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    }

    populateEligibilitySection(eligibilityData) {
        const contentDiv = document.getElementById('eligibility-content');
        const emptyDiv = document.getElementById('eligibility-empty');
        
        if (!eligibilityData || eligibilityData.length === 0) {
            contentDiv.classList.add('hidden');
            emptyDiv.classList.remove('hidden');
            return;
        }
        
        emptyDiv.classList.add('hidden');
        contentDiv.classList.remove('hidden');
        contentDiv.innerHTML = this.formatBulletList(eligibilityData);
    }

    populateDeadlinesSection(deadlinesData) {
        const contentDiv = document.getElementById('deadlines-content');
        const emptyDiv = document.getElementById('deadlines-empty');
        
        if (!deadlinesData || deadlinesData.length === 0) {
            contentDiv.classList.add('hidden');
            emptyDiv.classList.remove('hidden');
            return;
        }
        
        emptyDiv.classList.add('hidden');
        contentDiv.classList.remove('hidden');
        contentDiv.innerHTML = this.formatDeadlinesList(deadlinesData);
    }

    populateFundingSection(fundingData) {
        const contentDiv = document.getElementById('funding-content');
        const emptyDiv = document.getElementById('funding-empty');
        
        if (!fundingData || (!fundingData.minimum && !fundingData.maximum && (!fundingData.details || fundingData.details.length === 0))) {
            contentDiv.classList.add('hidden');
            emptyDiv.classList.remove('hidden');
            return;
        }
        
        emptyDiv.classList.add('hidden');
        contentDiv.classList.remove('hidden');
        contentDiv.innerHTML = this.formatFundingDetails(fundingData);
    }

    populateDocumentsSection(documentsData) {
        const contentDiv = document.getElementById('documents-content');
        const emptyDiv = document.getElementById('documents-empty');
        
        if (!documentsData || documentsData.length === 0) {
            contentDiv.classList.add('hidden');
            emptyDiv.classList.remove('hidden');
            return;
        }
        
        emptyDiv.classList.add('hidden');
        contentDiv.classList.remove('hidden');
        contentDiv.innerHTML = this.formatChecklistItems(documentsData);
    }

    // Formatting Methods (delegated to ResultsFormatter)
    formatBulletList(items) {
        return this.formatter.formatBulletList(items);
    }

    formatDeadlinesList(deadlines) {
        return this.formatter.formatDeadlinesList(deadlines);
    }

    formatFundingDetails(funding) {
        return this.formatter.formatFundingDetails(funding);
    }

    formatChecklistItems(items) {
        return this.formatter.formatChecklistItems(items);
    }

    formatDeadlineText(deadline) {
        return this.formatter.formatDeadlineText(deadline);
    }

    formatDate(dateString) {
        return this.formatter.formatDate(dateString);
    }

    formatFundingRange(minimum, maximum) {
        return this.formatter.formatFundingRange(minimum, maximum);
    }

    escapeHtml(text) {
        return this.formatter.escapeHtml(text);
    }

    // Action Methods
    resetForNewAnalysis() {
        // Hide results section
        document.getElementById('results-section').classList.add('hidden');
        
        // Reset all states
        this.hideAllStates();
        
        // Clear current inputs
        this.selectedFile = null;
        this.currentUrl = '';
        
        // Reset UI elements
        document.getElementById('pdf-input').value = '';
        document.getElementById('url-input').value = '';
        document.getElementById('selected-file').classList.add('hidden');
        
        // Update button state
        this.updateAnalyzeButton();
        
        // Scroll back to top
        document.getElementById('app').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    printResults() {
        // Create a print-friendly version of the results
        const resultsSection = document.getElementById('results-section');
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Grant Analysis Results</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .section { margin-bottom: 30px; }
                    .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid #ccc; padding-bottom: 5px; }
                    .item { margin-bottom: 8px; padding-left: 20px; }
                    .funding-range { font-weight: bold; color: #059669; }
                    .deadline { color: #DC2626; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                <h1>Grant Analysis Results</h1>
                <div class="section">
                    <div class="section-title">Eligibility Checklist</div>
                    ${this.getPrintableContent('eligibility-content', 'eligibility-empty')}
                </div>
                <div class="section">
                    <div class="section-title">Key Deadlines</div>
                    ${this.getPrintableContent('deadlines-content', 'deadlines-empty')}
                </div>
                <div class="section">
                    <div class="section-title">Funding Details</div>
                    ${this.getPrintableContent('funding-content', 'funding-empty')}
                </div>
                <div class="section">
                    <div class="section-title">Required Documents</div>
                    ${this.getPrintableContent('documents-content', 'documents-empty')}
                </div>
                <p style="margin-top: 40px; font-size: 12px; color: #666;">
                    Generated by Grant Analyzer on ${new Date().toLocaleDateString()}
                </p>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for content to load then print
        setTimeout(() => {
            printWindow.print();
        }, 250);
    }

    getPrintableContent(contentId, emptyId) {
        const contentDiv = document.getElementById(contentId);
        const emptyDiv = document.getElementById(emptyId);
        
        if (emptyDiv && !emptyDiv.classList.contains('hidden')) {
            return '<div class="item" style="font-style: italic; color: #666;">Information not found in document</div>';
        }
        
        if (contentDiv && !contentDiv.classList.contains('hidden')) {
            // Convert the HTML content to print-friendly format
            const items = contentDiv.querySelectorAll('div');
            let printContent = '';
            
            items.forEach(item => {
                const text = item.textContent.trim();
                if (text) {
                    printContent += `<div class="item">${text}</div>`;
                }
            });
            
            return printContent || '<div class="item" style="font-style: italic; color: #666;">No information available</div>';
        }
        
        return '<div class="item" style="font-style: italic; color: #666;">No information available</div>';
    }

    // Validation Methods
    validatePDF(file) {
        // Check file type by extension
        const fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.pdf')) {
            return {
                isValid: false,
                error: 'Please upload a PDF file. Only PDF files are supported.'
            };
        }

        // Check MIME type
        if (file.type && file.type !== 'application/pdf') {
            return {
                isValid: false,
                error: 'Invalid file type. Please upload a valid PDF file.'
            };
        }

        // Check file size (10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
            return {
                isValid: false,
                error: `File size must be under 10MB. Your file is ${this.formatFileSize(file.size)}.`
            };
        }

        // Check if file is empty
        if (file.size === 0) {
            return {
                isValid: false,
                error: 'The selected file appears to be empty. Please choose a valid PDF file.'
            };
        }

        return { isValid: true };
    }

    validateURL(url) {
        // Basic URL format validation using regex
        const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
        
        if (!urlPattern.test(url)) {
            return {
                isValid: false,
                error: 'Please enter a valid web URL (e.g., https://example.com/grant-guidelines)'
            };
        }

        // Check for common invalid patterns
        if (url.includes('localhost') || url.includes('127.0.0.1')) {
            return {
                isValid: false,
                error: 'Local URLs are not supported. Please provide a public web URL.'
            };
        }

        return { isValid: true };
    }

    validateInputs() {
        // Prevent both inputs being used simultaneously
        const hasPDF = this.selectedFile;
        const hasURL = this.currentUrl && this.currentUrl.length > 0;

        if (hasPDF && hasURL) {
            return {
                isValid: false,
                error: 'Please choose either PDF upload or URL input, not both.'
            };
        }

        if (!hasPDF && !hasURL) {
            return {
                isValid: false,
                error: 'Please provide either a PDF file or a URL to analyze.'
            };
        }

        // Validate the active input
        if (this.currentInputMode === 'pdf' && hasPDF) {
            return this.validatePDF(this.selectedFile);
        }

        if (this.currentInputMode === 'url' && hasURL) {
            return this.validateURL(this.currentUrl);
        }

        return { isValid: true };
    }

    clearErrors() {
        const existingError = document.getElementById('error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    // Processing State Management
    showProcessingState(message = 'Processing your document...') {
        // Hide other states
        this.hideAllStates();
        
        // Show processing state
        document.getElementById('processing-status').classList.remove('hidden');
        document.getElementById('processing-message').textContent = message;
        
        // Update button state
        const analyzeBtn = document.getElementById('analyze-btn');
        const btnText = document.getElementById('btn-text');
        const btnSpinner = document.getElementById('btn-spinner');
        
        analyzeBtn.disabled = true;
        btnText.textContent = 'Processing...';
        btnSpinner.classList.remove('hidden');
        
        // Start progress animation
        this.startProgressAnimation();
    }

    showSuccessState(results = null) {
        // Hide other states
        this.hideProcessingState();
        
        // Show success state
        document.getElementById('success-status').classList.remove('hidden');
        
        // Show results section and populate with data
        this.displayResults(results);
        
        // Reset button to allow new analysis
        this.resetButtonState();
    }

    hideAllStates() {
        document.getElementById('processing-status').classList.add('hidden');
        document.getElementById('success-status').classList.add('hidden');
        this.clearErrors();
    }

    hideProcessingState() {
        document.getElementById('processing-status').classList.add('hidden');
        this.stopProgressAnimation();
    }

    resetButtonState() {
        const analyzeBtn = document.getElementById('analyze-btn');
        const btnText = document.getElementById('btn-text');
        const btnSpinner = document.getElementById('btn-spinner');
        
        analyzeBtn.disabled = false;
        btnSpinner.classList.add('hidden');
        this.updateAnalyzeButton(); // This will set the correct button text
    }

    startProgressAnimation() {
        const progressBar = document.getElementById('progress-bar');
        let progress = 0;
        
        // Clear any existing animation
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        
        // Reset progress bar
        progressBar.style.width = '0%';
        
        // Animate progress bar
        this.progressInterval = setInterval(() => {
            progress += Math.random() * 15; // Random increment for realistic feel
            
            if (progress >= 90) {
                progress = 90; // Stop at 90% until actual completion
            }
            
            progressBar.style.width = progress + '%';
        }, 500);
    }

    completeProgress() {
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = '100%';
        
        // Stop the animation
        this.stopProgressAnimation();
    }

    stopProgressAnimation() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    // Enhanced error display with different error types
    showError(message, type = 'validation') {
        // Remove any existing error
        this.clearErrors();
        
        // Hide processing states
        this.hideProcessingState();

        // Determine error styling based on type
        let iconColor, bgColor, borderColor, textColor;
        let icon = '⚠️';
        
        switch (type) {
            case 'network':
                iconColor = 'text-orange-400';
                bgColor = 'bg-orange-50';
                borderColor = 'border-orange-200';
                textColor = 'text-orange-800';
                icon = '🌐';
                break;
            case 'processing':
                iconColor = 'text-red-400';
                bgColor = 'bg-red-50';
                borderColor = 'border-red-200';
                textColor = 'text-red-800';
                icon = '⚠️';
                break;
            case 'timeout':
                iconColor = 'text-yellow-400';
                bgColor = 'bg-yellow-50';
                borderColor = 'border-yellow-200';
                textColor = 'text-yellow-800';
                icon = '⏱️';
                break;
            default: // validation
                iconColor = 'text-red-400';
                bgColor = 'bg-red-50';
                borderColor = 'border-red-200';
                textColor = 'text-red-800';
                icon = '⚠️';
        }

        // Create error element
        const errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.className = `mt-4 p-4 ${bgColor} border ${borderColor} rounded-md`;
        errorDiv.innerHTML = `
            <div class="flex">
                <div class="flex-shrink-0">
                    <span class="${iconColor}">${icon}</span>
                </div>
                <div class="ml-3 flex-1">
                    <p class="text-sm ${textColor}">${message}</p>
                    ${type === 'network' || type === 'timeout' ? `
                        <button id="retry-btn" class="mt-2 text-xs ${textColor} underline hover:no-underline">
                            Try again
                        </button>
                    ` : ''}
                </div>
                <div class="ml-auto pl-3">
                    <button id="close-error" class="${iconColor} hover:opacity-70">
                        <span class="sr-only">Dismiss</span>
                        ✕
                    </button>
                </div>
            </div>
        `;

        // Insert error after the current input section
        const currentSection = document.getElementById(this.currentInputMode + '-section');
        currentSection.parentNode.insertBefore(errorDiv, currentSection.nextSibling);

        // Add event listeners
        document.getElementById('close-error').addEventListener('click', () => this.clearErrors());
        
        const retryBtn = document.getElementById('retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                this.clearErrors();
                this.handleAnalyze();
            });
        }

        // Reset button state
        this.resetButtonState();

        // Auto-dismiss after 10 seconds (except for network/timeout errors)
        if (type !== 'network' && type !== 'timeout') {
            setTimeout(() => this.clearErrors(), 10000);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GrantAnalyzer();
});