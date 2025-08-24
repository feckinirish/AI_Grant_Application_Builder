// Simple test script to verify webpage functionality
// This script can be run in the browser console to test the implementation

console.log('🧪 Starting Grant Analyzer Webpage Tests...');

// Test 1: Check if GrantAnalyzer class is available
try {
    const analyzer = new GrantAnalyzer();
    console.log('✅ GrantAnalyzer class instantiated successfully');
} catch (error) {
    console.error('❌ Failed to instantiate GrantAnalyzer:', error);
}

// Test 2: Check if ResultsFormatter is available
try {
    const formatter = new ResultsFormatter();
    console.log('✅ ResultsFormatter class instantiated successfully');
} catch (error) {
    console.error('❌ Failed to instantiate ResultsFormatter:', error);
}

// Test 3: Test formatting functions
try {
    const formatter = new ResultsFormatter();
    
    // Test bullet list formatting
    const eligibilityItems = ['Must be nonprofit', 'Must serve communities'];
    const bulletList = formatter.formatBulletList(eligibilityItems);
    console.log('✅ Bullet list formatting works:', bulletList.includes('Must be nonprofit'));
    
    // Test date formatting
    const formattedDate = formatter.formatDate('March 15, 2024');
    console.log('✅ Date formatting works:', formattedDate === '03/15/2024');
    
    // Test funding range formatting
    const fundingRange = formatter.formatFundingRange('$25,000', '$100,000');
    console.log('✅ Funding range formatting works:', fundingRange.includes('Funding Range'));
    
    // Test checklist formatting
    const documents = ['IRS letter', 'Financial statements'];
    const checklist = formatter.formatChecklistItems(documents);
    console.log('✅ Checklist formatting works:', checklist.includes('☐'));
    
} catch (error) {
    console.error('❌ Formatting functions failed:', error);
}

// Test 4: Check DOM elements
try {
    const requiredElements = [
        'app',
        'pdf-tab',
        'url-tab',
        'pdf-section',
        'url-section',
        'analyze-btn'
    ];
    
    let allElementsFound = true;
    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.error(`❌ Missing element: ${id}`);
            allElementsFound = false;
        }
    });
    
    if (allElementsFound) {
        console.log('✅ All required DOM elements found');
    }
} catch (error) {
    console.error('❌ DOM element check failed:', error);
}

// Test 5: Simulate file upload workflow
try {
    console.log('🔄 Testing file upload workflow...');
    
    // Create a mock PDF file
    const mockFile = new File(['mock pdf content'], 'test-grant.pdf', {
        type: 'application/pdf',
        lastModified: Date.now()
    });
    
    // Get the analyzer instance
    const analyzer = window.grantAnalyzer || new GrantAnalyzer();
    
    // Test file validation
    const validation = analyzer.validatePDF(mockFile);
    console.log('✅ File validation works:', validation.isValid);
    
    // Test file size formatting
    const sizeFormatted = analyzer.formatFileSize(mockFile.size);
    console.log('✅ File size formatting works:', sizeFormatted.includes('Bytes'));
    
} catch (error) {
    console.error('❌ File upload workflow test failed:', error);
}

// Test 6: Test URL validation
try {
    const analyzer = new GrantAnalyzer();
    
    const validUrl = 'https://example.com/grant-guidelines';
    const invalidUrl = 'not-a-url';
    
    const validResult = analyzer.validateURL(validUrl);
    const invalidResult = analyzer.validateURL(invalidUrl);
    
    console.log('✅ URL validation works:', validResult.isValid && !invalidResult.isValid);
    
} catch (error) {
    console.error('❌ URL validation test failed:', error);
}

console.log('🏁 Grant Analyzer Webpage Tests Complete!');
console.log('📝 To test the full workflow:');
console.log('1. Upload a PDF file or enter a URL');
console.log('2. Click "Analyze Grant" button');
console.log('3. Wait for processing simulation to complete');
console.log('4. Check that results display correctly');
console.log('5. Test "Print Results" and "Analyze Another Document" buttons');