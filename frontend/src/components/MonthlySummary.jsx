import React from 'react';
import './MonthlySummary.css';

function MonthlySummary({ summary, onMonthChange, currentMonth, currentYear }) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handlePreviousMonth = () => {
        let newMonth = currentMonth - 1;
        let newYear = currentYear;
        
        if (newMonth < 1) {
            newMonth = 12;
            newYear = currentYear - 1;
        }
        
        onMonthChange(newMonth, newYear);
    };

    const handleNextMonth = () => {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;
        
        if (newMonth > 12) {
            newMonth = 1;
            newYear = currentYear + 1;
        }
        
        onMonthChange(newMonth, newYear);
    };

    const getCategoryIcon = (category) => {
        const icons = {
            food: '🍽️',
            transport: '🚗',
            entertainment: '🎬',
            shopping: '🛍️',
            bills: '📄',
            health: '🏥',
            education: '📚',
            other: '📝'
        };
        return icons[category] || '📝';
    };

    const getCategoryColor = (category) => {
        const colors = {
            food: '#FF6B6B',
            transport: '#4ECDC4',
            entertainment: '#45B7D1',
            shopping: '#96CEB4',
            bills: '#FFEAA7',
            health: '#DDA0DD',
            education: '#98D8C8',
            other: '#F7DC6F'
        };
        return colors[category] || '#F7DC6F';
    };

    if (!summary) {
        return (
            <div className="monthly-summary">
                <div className="summary-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading summary...</p>
                </div>
            </div>
        );
    }

    const profitLossPercentage = summary.totalIncome > 0 
        ? ((summary.profitLoss / summary.totalIncome) * 100).toFixed(1)
        : 0;

    return (
        <div className="monthly-summary">
            <div className="summary-header">
                <h2>Monthly Summary</h2>
                <div className="month-navigation">
                    <button onClick={handlePreviousMonth} className="nav-btn">‹</button>
                    <span className="current-month">
                        {months[currentMonth - 1]} {currentYear}
                    </span>
                    <button onClick={handleNextMonth} className="nav-btn">›</button>
                </div>
            </div>

            <div className="summary-cards">
                <div className="summary-card income">
                    <div className="card-icon">💰</div>
                    <div className="card-content">
                        <h3>Total Income</h3>
                        <p className="amount">${summary.totalIncome.toFixed(2)}</p>
                    </div>
                </div>

                <div className="summary-card expense">
                    <div className="card-icon">💸</div>
                    <div className="card-content">
                        <h3>Total Expenses</h3>
                        <p className="amount">${summary.totalExpenses.toFixed(2)}</p>
                    </div>
                </div>

                <div className={`summary-card ${summary.profitLoss >= 0 ? 'profit' : 'loss'}`}>
                    <div className="card-icon">{summary.profitLoss >= 0 ? '📈' : '📉'}</div>
                    <div className="card-content">
                        <h3>{summary.profitLoss >= 0 ? 'Profit' : 'Loss'}</h3>
                        <p className="amount">
                            {summary.profitLoss >= 0 ? '+' : ''}${summary.profitLoss.toFixed(2)}
                        </p>
                        <p className="percentage">
                            {profitLossPercentage}%
                        </p>
                    </div>
                </div>
            </div>

            {Object.keys(summary.categoryBreakdown).length > 0 && (
                <div className="category-breakdown">
                    <h3>Expenses by Category</h3>
                    <div className="category-list">
                        {Object.entries(summary.categoryBreakdown)
                            .sort(([,a], [,b]) => b - a)
                            .map(([category, amount]) => (
                            <div key={category} className="category-item">
                                <div className="category-info">
                                    <span className="category-icon">
                                        {getCategoryIcon(category)}
                                    </span>
                                    <span className="category-name">
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </span>
                                </div>
                                <div className="category-amount">
                                    ${amount.toFixed(2)}
                                </div>
                                <div className="category-bar">
                                    <div 
                                        className="category-fill"
                                        style={{
                                            width: `${(amount / summary.totalExpenses) * 100}%`,
                                            backgroundColor: getCategoryColor(category)
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {summary.transactions.length === 0 && (
                <div className="no-transactions">
                    <div className="no-transactions-icon">📊</div>
                    <p>No transactions for {months[currentMonth - 1]} {currentYear}</p>
                </div>
            )}
        </div>
    );
}

export default MonthlySummary;
