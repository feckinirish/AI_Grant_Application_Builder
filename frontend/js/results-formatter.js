// Results formatting functions for Grant Analyzer
// These functions handle the display and formatting of grant analysis results

class ResultsFormatter {
    // Format array of items as bulleted list
    formatBulletList(items) {
        if (!items || items.length === 0) return '';
        
        return items.map(item => `
            <div class="flex items-start space-x-2 text-sm">
                <span class="text-blue-500 mt-1 flex-shrink-0">•</span>
                <span class="text-gray-700">${this.escapeHtml(item)}</span>
            </div>
        `).join('');
    }

    // Format deadlines list with date highlighting
    formatDeadlinesList(deadlines) {
        if (!deadlines || deadlines.length === 0) return '';
        
        return deadlines.map(deadline => {
            const formattedDeadline = this.formatDeadlineText(deadline);
            return `
                <div class="flex items-start space-x-2 text-sm">
                    <span class="text-red-500 mt-1 flex-shrink-0">📅</span>
                    <span class="text-gray-700">${formattedDeadline}</span>
                </div>
            `;
        }).join('');
    }

    // Format funding details with range and additional info
    formatFundingDetails(funding) {
        if (!funding || (!funding.minimum && !funding.maximum && (!funding.details || funding.details.length === 0))) {
            return '';
        }
        
        let html = '';
        
        // Add funding range if available
        if (funding.minimum || funding.maximum) {
            const range = this.formatFundingRange(funding.minimum, funding.maximum);
            html += `
                <div class="flex items-start space-x-2 text-sm mb-3">
                    <span class="text-green-500 mt-1 flex-shrink-0">💵</span>
                    <span class="text-gray-700 font-medium">${range}</span>
                </div>
            `;
        }
        
        // Add funding details
        if (funding.details && funding.details.length > 0) {
            html += funding.details.map(detail => `
                <div class="flex items-start space-x-2 text-sm">
                    <span class="text-green-500 mt-1 flex-shrink-0">•</span>
                    <span class="text-gray-700">${this.escapeHtml(detail)}</span>
                </div>
            `).join('');
        }
        
        return html;
    }

    // Format array of items as checklist
    formatChecklistItems(items) {
        if (!items || items.length === 0) return '';
        
        return items.map(item => `
            <div class="flex items-start space-x-2 text-sm">
                <span class="text-purple-500 mt-1 flex-shrink-0">☐</span>
                <span class="text-gray-700">${this.escapeHtml(item)}</span>
            </div>
        `).join('');
    }

    // Format deadline text with date highlighting
    formatDeadlineText(deadline) {
        if (!deadline) return '';
        
        // Extract dates and format them consistently
        const dateRegex = /(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2}|[A-Za-z]+ \d{1,2}, \d{4})/g;
        
        return deadline.replace(dateRegex, (match) => {
            const formatted = this.formatDate(match);
            return `<span class="font-medium text-red-600">${formatted}</span>`;
        });
    }

    // Format date to MM/DD/YYYY format
    formatDate(dateString) {
        if (!dateString) return dateString;
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString; // Return original if parsing fails
            }
            
            // Format as MM/DD/YYYY
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            
            return `${month}/${day}/${year}`;
        } catch (error) {
            return dateString; // Return original if formatting fails
        }
    }

    // Format funding range display
    formatFundingRange(minimum, maximum) {
        const formatCurrency = (amount) => {
            if (!amount) return null;
            
            // If already formatted with currency symbol, return as is
            if (amount.includes('$') || amount.includes('€') || amount.includes('£')) {
                return amount;
            }
            
            // Try to parse as number and format
            const numericAmount = parseFloat(amount.replace(/[^\d.-]/g, ''));
            if (!isNaN(numericAmount)) {
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(numericAmount);
            }
            
            return amount;
        };
        
        const formattedMin = minimum ? formatCurrency(minimum) : null;
        const formattedMax = maximum ? formatCurrency(maximum) : null;
        
        if (formattedMin && formattedMax) {
            return `Funding Range: ${formattedMin} - ${formattedMax}`;
        } else if (formattedMin) {
            return `Minimum Funding: ${formattedMin}`;
        } else if (formattedMax) {
            return `Maximum Funding: ${formattedMax}`;
        }
        
        return 'Funding amount to be determined';
    }

    // Escape HTML special characters
    escapeHtml(text) {
        if (!text) return '';
        
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// For browser environments without module support
if (typeof window !== 'undefined') {
    window.ResultsFormatter = ResultsFormatter;
}