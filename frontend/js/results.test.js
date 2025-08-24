// Unit tests for results formatting functions
// These tests verify the formatting logic for grant analysis results

// Note: ResultsFormatter is loaded globally in browser environment

describe('Results Formatting Functions', () => {
    let formatter;

    beforeEach(() => {
        // Create a mock DOM environment
        document.body.innerHTML = '<div id="app"></div>';
        formatter = new ResultsFormatter();
    });

    describe('formatBulletList', () => {
        test('should format array of items as bulleted list', () => {
            const items = [
                'Must be a registered nonprofit',
                'Organization must have 2+ years experience'
            ];
            
            const result = formatter.formatBulletList(items);
            
            expect(result).toContain('Must be a registered nonprofit');
            expect(result).toContain('Organization must have 2+ years experience');
            expect(result).toContain('text-blue-500');
            expect(result).toContain('•');
        });

        test('should handle empty array', () => {
            const result = formatter.formatBulletList([]);
            expect(result).toBe('');
        });

        test('should escape HTML in items', () => {
            const items = ['<script>alert("test")</script>'];
            const result = formatter.formatBulletList(items);
            
            expect(result).not.toContain('<script>');
            expect(result).toContain('&lt;script&gt;');
        });
    });

    describe('formatDate', () => {
        test('should format MM/DD/YYYY dates correctly', () => {
            const result = formatter.formatDate('3/15/2024');
            expect(result).toBe('03/15/2024');
        });

        test('should format YYYY-MM-DD dates correctly', () => {
            const result = formatter.formatDate('2024-03-15');
            expect(result).toBe('03/15/2024');
        });

        test('should format written dates correctly', () => {
            const result = formatter.formatDate('March 15, 2024');
            expect(result).toBe('03/15/2024');
        });

        test('should return original string for invalid dates', () => {
            const result = formatter.formatDate('invalid date');
            expect(result).toBe('invalid date');
        });

        test('should handle edge cases', () => {
            expect(formatter.formatDate('')).toBe('');
            expect(formatter.formatDate(null)).toBe(null);
        });
    });

    describe('formatDeadlineText', () => {
        test('should highlight dates in deadline text', () => {
            const deadline = 'Application Due: March 15, 2024';
            const result = formatter.formatDeadlineText(deadline);
            
            expect(result).toContain('Application Due:');
            expect(result).toContain('03/15/2024');
            expect(result).toContain('font-medium text-red-600');
        });

        test('should handle multiple dates in one string', () => {
            const deadline = 'Submit by 3/15/2024, review by 4/1/2024';
            const result = formatter.formatDeadlineText(deadline);
            
            expect(result).toContain('03/15/2024');
            expect(result).toContain('04/01/2024');
        });

        test('should handle text without dates', () => {
            const deadline = 'No specific deadline mentioned';
            const result = formatter.formatDeadlineText(deadline);
            
            expect(result).toBe('No specific deadline mentioned');
        });
    });

    describe('formatFundingRange', () => {
        test('should format minimum and maximum amounts', () => {
            const result = formatter.formatFundingRange('$25,000', '$100,000');
            expect(result).toBe('Funding Range: $25,000 - $100,000');
        });

        test('should format minimum only', () => {
            const result = formatter.formatFundingRange('$25,000', null);
            expect(result).toBe('Minimum Funding: $25,000');
        });

        test('should format maximum only', () => {
            const result = formatter.formatFundingRange(null, '$100,000');
            expect(result).toBe('Maximum Funding: $100,000');
        });

        test('should handle numeric values without currency symbols', () => {
            const result = formatter.formatFundingRange('25000', '100000');
            expect(result).toContain('$25,000.00');
            expect(result).toContain('$100,000.00');
        });

        test('should return default message when no amounts provided', () => {
            const result = formatter.formatFundingRange(null, null);
            expect(result).toBe('Funding amount to be determined');
        });

        test('should preserve existing currency formatting', () => {
            const result = formatter.formatFundingRange('€25,000', '€100,000');
            expect(result).toBe('Funding Range: €25,000 - €100,000');
        });
    });

    describe('formatChecklistItems', () => {
        test('should format array of items as checklist', () => {
            const items = [
                'IRS determination letter',
                'Audited financial statements'
            ];
            
            const result = formatter.formatChecklistItems(items);
            
            expect(result).toContain('IRS determination letter');
            expect(result).toContain('Audited financial statements');
            expect(result).toContain('text-purple-500');
            expect(result).toContain('☐');
        });

        test('should handle empty array', () => {
            const result = formatter.formatChecklistItems([]);
            expect(result).toBe('');
        });

        test('should escape HTML in items', () => {
            const items = ['<img src="x" onerror="alert(1)">'];
            const result = formatter.formatChecklistItems(items);
            
            expect(result).not.toContain('<img');
            expect(result).toContain('&lt;img');
        });
    });

    describe('formatFundingDetails', () => {
        test('should format complete funding object', () => {
            const funding = {
                minimum: '$25,000',
                maximum: '$100,000',
                details: [
                    'Average award: $65,000',
                    'Multi-year funding available'
                ]
            };
            
            const result = formatter.formatFundingDetails(funding);
            
            expect(result).toContain('Funding Range: $25,000 - $100,000');
            expect(result).toContain('Average award: $65,000');
            expect(result).toContain('Multi-year funding available');
            expect(result).toContain('💵');
            expect(result).toContain('•');
        });

        test('should handle funding with only details', () => {
            const funding = {
                details: ['Grant amount varies by project scope']
            };
            
            const result = formatter.formatFundingDetails(funding);
            
            expect(result).toContain('Grant amount varies by project scope');
            expect(result).not.toContain('💵');
        });

        test('should handle funding with only range', () => {
            const funding = {
                minimum: '$10,000',
                maximum: '$50,000'
            };
            
            const result = formatter.formatFundingDetails(funding);
            
            expect(result).toContain('Funding Range: $10,000 - $50,000');
            expect(result).toContain('💵');
        });

        test('should handle empty funding object', () => {
            const funding = {};
            const result = formatter.formatFundingDetails(funding);
            expect(result).toBe('');
        });
    });

    describe('escapeHtml', () => {
        test('should escape HTML special characters', () => {
            const input = '<script>alert("xss")</script>';
            const result = formatter.escapeHtml(input);
            
            expect(result).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
        });

        test('should escape quotes and ampersands', () => {
            const input = 'Company "ABC" & Associates';
            const result = formatter.escapeHtml(input);
            
            expect(result).toBe('Company "ABC" &amp; Associates');
        });

        test('should handle empty string', () => {
            const result = formatter.escapeHtml('');
            expect(result).toBe('');
        });

        test('should handle normal text without special characters', () => {
            const input = 'Normal text content';
            const result = formatter.escapeHtml(input);
            
            expect(result).toBe('Normal text content');
        });
    });
});