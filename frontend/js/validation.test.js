// Simple validation tests for Grant Analyzer
// Run this in browser console to test validation functions

function runValidationTests() {
    console.log('Running Grant Analyzer Validation Tests...\n');
    
    // Create a mock GrantAnalyzer instance for testing
    const analyzer = new GrantAnalyzer();
    
    // Test PDF validation
    console.log('=== PDF Validation Tests ===');
    
    // Test 1: Valid PDF file
    const validPDF = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    const validResult = analyzer.validatePDF(validPDF);
    console.log('Valid PDF:', validResult.isValid ? '✅ PASS' : '❌ FAIL', validResult);
    
    // Test 2: Invalid file extension
    const invalidExt = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    const invalidExtResult = analyzer.validatePDF(invalidExt);
    console.log('Invalid extension:', !invalidExtResult.isValid ? '✅ PASS' : '❌ FAIL', invalidExtResult);
    
    // Test 3: Invalid MIME type
    const invalidMime = new File(['dummy content'], 'test.pdf', { type: 'text/plain' });
    const invalidMimeResult = analyzer.validatePDF(invalidMime);
    console.log('Invalid MIME type:', !invalidMimeResult.isValid ? '✅ PASS' : '❌ FAIL', invalidMimeResult);
    
    // Test 4: File too large (simulate 11MB file)
    const largePDF = new File([new ArrayBuffer(11 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' });
    const largeResult = analyzer.validatePDF(largePDF);
    console.log('File too large:', !largeResult.isValid ? '✅ PASS' : '❌ FAIL', largeResult);
    
    // Test 5: Empty file
    const emptyPDF = new File([], 'empty.pdf', { type: 'application/pdf' });
    const emptyResult = analyzer.validatePDF(emptyPDF);
    console.log('Empty file:', !emptyResult.isValid ? '✅ PASS' : '❌ FAIL', emptyResult);
    
    console.log('\n=== URL Validation Tests ===');
    
    // Test 6: Valid HTTPS URL
    const validHTTPS = analyzer.validateURL('https://example.com/grant-guidelines');
    console.log('Valid HTTPS URL:', validHTTPS.isValid ? '✅ PASS' : '❌ FAIL', validHTTPS);
    
    // Test 7: Valid HTTP URL
    const validHTTP = analyzer.validateURL('http://example.com/grants');
    console.log('Valid HTTP URL:', validHTTP.isValid ? '✅ PASS' : '❌ FAIL', validHTTP);
    
    // Test 8: Invalid URL format
    const invalidURL = analyzer.validateURL('not-a-url');
    console.log('Invalid URL format:', !invalidURL.isValid ? '✅ PASS' : '❌ FAIL', invalidURL);
    
    // Test 9: Localhost URL (should be rejected)
    const localhostURL = analyzer.validateURL('http://localhost:3000/grants');
    console.log('Localhost URL:', !localhostURL.isValid ? '✅ PASS' : '❌ FAIL', localhostURL);
    
    // Test 10: URL with subdomain
    const subdomainURL = analyzer.validateURL('https://grants.example.com/guidelines');
    console.log('Subdomain URL:', subdomainURL.isValid ? '✅ PASS' : '❌ FAIL', subdomainURL);
    
    console.log('\n=== Input Validation Tests ===');
    
    // Test 11: No inputs provided
    analyzer.selectedFile = null;
    analyzer.currentUrl = '';
    const noInputResult = analyzer.validateInputs();
    console.log('No inputs:', !noInputResult.isValid ? '✅ PASS' : '❌ FAIL', noInputResult);
    
    // Test 12: Both inputs provided (should fail)
    analyzer.selectedFile = validPDF;
    analyzer.currentUrl = 'https://example.com';
    const bothInputsResult = analyzer.validateInputs();
    console.log('Both inputs:', !bothInputsResult.isValid ? '✅ PASS' : '❌ FAIL', bothInputsResult);
    
    // Test 13: Only PDF provided (should pass)
    analyzer.selectedFile = validPDF;
    analyzer.currentUrl = '';
    analyzer.currentInputMode = 'pdf';
    const onlyPDFResult = analyzer.validateInputs();
    console.log('Only PDF:', onlyPDFResult.isValid ? '✅ PASS' : '❌ FAIL', onlyPDFResult);
    
    // Test 14: Only URL provided (should pass)
    analyzer.selectedFile = null;
    analyzer.currentUrl = 'https://example.com';
    analyzer.currentInputMode = 'url';
    const onlyURLResult = analyzer.validateInputs();
    console.log('Only URL:', onlyURLResult.isValid ? '✅ PASS' : '❌ FAIL', onlyURLResult);
    
    console.log('\n=== Test Summary ===');
    console.log('All validation tests completed. Check results above.');
    console.log('To run these tests, open the browser console and call runValidationTests()');
}

// Export for use in browser console
if (typeof window !== 'undefined') {
    window.runValidationTests = runValidationTests;
}