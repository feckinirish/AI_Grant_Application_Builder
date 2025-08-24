// UI Component Tests for Grant Analyzer
// Run this in browser console to test UI components

function runUITests() {
    console.log('Running Grant Analyzer UI Tests...\n');
    
    // Create a mock GrantAnalyzer instance for testing
    const analyzer = new GrantAnalyzer();
    
    console.log('=== Processing State Tests ===');
    
    // Test 1: Show processing state
    console.log('Test 1: Show processing state');
    analyzer.showProcessingState('Testing processing state...');
    setTimeout(() => {
        const processingVisible = !document.getElementById('processing-status').classList.contains('hidden');
        console.log('Processing state visible:', processingVisible ? '✅ PASS' : '❌ FAIL');
    }, 100);
    
    // Test 2: Show success state
    setTimeout(() => {
        console.log('Test 2: Show success state');
        analyzer.showSuccessState();
        setTimeout(() => {
            const successVisible = !document.getElementById('success-status').classList.contains('hidden');
            const processingHidden = document.getElementById('processing-status').classList.contains('hidden');
            console.log('Success state visible:', successVisible ? '✅ PASS' : '❌ FAIL');
            console.log('Processing state hidden:', processingHidden ? '✅ PASS' : '❌ FAIL');
        }, 100);
    }, 2000);
    
    // Test 3: Error display
    setTimeout(() => {
        console.log('Test 3: Error display');
        analyzer.showError('Test error message', 'validation');
        setTimeout(() => {
            const errorVisible = document.getElementById('error-message') !== null;
            console.log('Error message visible:', errorVisible ? '✅ PASS' : '❌ FAIL');
        }, 100);
    }, 4000);
    
    // Test 4: Network error with retry
    setTimeout(() => {
        console.log('Test 4: Network error with retry');
        analyzer.showError('Network connection failed', 'network');
        setTimeout(() => {
            const retryBtn = document.getElementById('retry-btn');
            const hasRetryBtn = retryBtn !== null;
            console.log('Retry button present:', hasRetryBtn ? '✅ PASS' : '❌ FAIL');
        }, 100);
    }, 6000);
    
    // Test 5: Clear all states
    setTimeout(() => {
        console.log('Test 5: Clear all states');
        analyzer.hideAllStates();
        setTimeout(() => {
            const processingHidden = document.getElementById('processing-status').classList.contains('hidden');
            const successHidden = document.getElementById('success-status').classList.contains('hidden');
            const errorCleared = document.getElementById('error-message') === null;
            console.log('Processing hidden:', processingHidden ? '✅ PASS' : '❌ FAIL');
            console.log('Success hidden:', successHidden ? '✅ PASS' : '❌ FAIL');
            console.log('Error cleared:', errorCleared ? '✅ PASS' : '❌ FAIL');
        }, 100);
    }, 8000);
    
    console.log('\n=== Button State Tests ===');
    
    // Test 6: Button state changes
    setTimeout(() => {
        console.log('Test 6: Button state changes');
        analyzer.showProcessingState();
        setTimeout(() => {
            const btnDisabled = document.getElementById('analyze-btn').disabled;
            const spinnerVisible = !document.getElementById('btn-spinner').classList.contains('hidden');
            console.log('Button disabled during processing:', btnDisabled ? '✅ PASS' : '❌ FAIL');
            console.log('Spinner visible during processing:', spinnerVisible ? '✅ PASS' : '❌ FAIL');
            
            // Reset button
            analyzer.resetButtonState();
            setTimeout(() => {
                const btnEnabled = !document.getElementById('analyze-btn').disabled;
                const spinnerHidden = document.getElementById('btn-spinner').classList.contains('hidden');
                console.log('Button enabled after reset:', btnEnabled ? '✅ PASS' : '❌ FAIL');
                console.log('Spinner hidden after reset:', spinnerHidden ? '✅ PASS' : '❌ FAIL');
            }, 100);
        }, 100);
    }, 10000);
    
    console.log('\n=== Responsive Design Tests ===');
    
    // Test 7: Mobile layout classes
    setTimeout(() => {
        console.log('Test 7: Mobile responsive classes');
        const hasResponsiveClasses = document.querySelector('.sm\\:text-2xl') !== null;
        const hasMobileClasses = document.querySelector('.text-xl') !== null;
        console.log('Desktop responsive classes present:', hasResponsiveClasses ? '✅ PASS' : '❌ FAIL');
        console.log('Mobile base classes present:', hasMobileClasses ? '✅ PASS' : '❌ FAIL');
    }, 12000);
    
    console.log('\n=== Test Summary ===');
    setTimeout(() => {
        console.log('All UI tests completed. Check results above.');
        console.log('To run these tests, open the browser console and call runUITests()');
        
        // Clean up
        analyzer.hideAllStates();
        analyzer.resetButtonState();
    }, 14000);
}

// Test individual error types
function testErrorTypes() {
    console.log('Testing different error types...\n');
    const analyzer = new GrantAnalyzer();
    
    const errorTypes = [
        { type: 'validation', message: 'Validation error test' },
        { type: 'network', message: 'Network error test' },
        { type: 'processing', message: 'Processing error test' },
        { type: 'timeout', message: 'Timeout error test' }
    ];
    
    errorTypes.forEach((error, index) => {
        setTimeout(() => {
            console.log(`Showing ${error.type} error...`);
            analyzer.showError(error.message, error.type);
            
            setTimeout(() => {
                analyzer.clearErrors();
            }, 3000);
        }, index * 4000);
    });
}

// Export for use in browser console
if (typeof window !== 'undefined') {
    window.runUITests = runUITests;
    window.testErrorTypes = testErrorTypes;
}