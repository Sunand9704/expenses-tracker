import React, { useState } from 'react';
import './TransactionList.css';

function TransactionList({ transactions, onDelete }) {
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');

    const filteredTransactions = transactions.filter(transaction => {
        const typeMatch = filterType === 'all' || transaction.type === filterType;
        const categoryMatch = filterCategory === 'all' || transaction.category === filterCategory;
        return typeMatch && categoryMatch;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatAmount = (amount, type) => {
        return type === 'income' ? `+$${amount.toFixed(2)}` : `-$${amount.toFixed(2)}`;
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

    const handleDelete = (transactionId, transactionTitle) => {
        if (window.confirm(`Are you sure you want to delete "${transactionTitle}"?`)) {
            onDelete(transactionId);
        }
    };

    if (transactions.length === 0) {
        return (
            <div className="transaction-list">
                <div className="empty-state">
                    <div className="empty-icon">💰</div>
                    <h3>No transactions yet</h3>
                    <p>Start by adding your first transaction!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="transaction-list">
            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="type-filter">Type:</label>
                    <select
                        id="type-filter"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                
                <div className="filter-group">
                    <label htmlFor="category-filter">Category:</label>
                    <select
                        id="category-filter"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="shopping">Shopping</option>
                        <option value="bills">Bills</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            <div className="transactions-container">
                {filteredTransactions.map(transaction => (
                    <div key={transaction._id} className={`transaction-item ${transaction.type}`}>
                        <div className="transaction-main">
                            <div className="transaction-info">
                                <div className="transaction-header">
                                    <span className="category-icon">
                                        {getCategoryIcon(transaction.category)}
                                    </span>
                                    <h4 className="transaction-title">{transaction.title}</h4>
                                    <span className={`transaction-type ${transaction.type}`}>
                                        {transaction.type}
                                    </span>
                                </div>
                                
                                {transaction.description && (
                                    <p className="transaction-description">
                                        {transaction.description}
                                    </p>
                                )}
                                
                                <div className="transaction-meta">
                                    <span className="transaction-date">
                                        {formatDate(transaction.date)}
                                    </span>
                                    <span className="transaction-category">
                                        {transaction.category}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="transaction-amount">
                                <span className={`amount ${transaction.type}`}>
                                    {formatAmount(transaction.amount, transaction.type)}
                                </span>
                                <button
                                    onClick={() => handleDelete(transaction._id, transaction.title)}
                                    className="delete-btn"
                                    title="Delete transaction"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTransactions.length === 0 && transactions.length > 0 && (
                <div className="no-results">
                    <p>No transactions match your current filters.</p>
                </div>
            )}
        </div>
    );
}

export default TransactionList;
