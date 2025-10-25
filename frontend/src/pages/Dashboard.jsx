import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Users from '../utils/api';
import AddTransactionModal from '../components/AddTransactionModal';
import TransactionList from '../components/TransactionList';
import MonthlySummary from '../components/MonthlySummary';
import './Dashboard.css';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [monthlySummary, setMonthlySummary] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("userData");
        
        if (!token || !userData) {
            navigate("/login");
            return;
        }
        
        try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            fetchUserData(parsedUser._id);
        } catch (error) {
            console.error("Error parsing user data:", error);
            navigate("/login");
        }
    }, [navigate]);

    const fetchUserData = async (userId) => {
        try {
            setLoading(true);
            const [expensesResponse, summaryResponse] = await Promise.all([
                Users.getUserExpenses(userId),
                Users.getMonthlySummary(userId, currentMonth, currentYear)
            ]);
            
            setTransactions(expensesResponse.data.expenses);
            setMonthlySummary(summaryResponse.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTransaction = async (transactionData) => {
        try {
            const response = await Users.addTransaction({
                ...transactionData,
                userid: user._id
            });
            
            setTransactions(prev => [response.data.transaction, ...prev]);
            await fetchUserData(user._id); // Refresh monthly summary
            setShowAddModal(false);
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    const handleDeleteTransaction = async (transactionId) => {
        try {
            await Users.deleteExpense(transactionId);
            setTransactions(prev => prev.filter(t => t._id !== transactionId));
            await fetchUserData(user._id); // Refresh monthly summary
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    const handleMonthChange = (month, year) => {
        setCurrentMonth(month);
        setCurrentYear(year);
        fetchUserData(user._id);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="loading-spinner"></div>
                <p>Loading your expense tracker...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>💰 Expense Tracker</h1>
                    <div className="user-info">
                        <span>Welcome, {user?.Username}</span>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                <div className="dashboard-grid">
                    <div className="summary-section">
                        <MonthlySummary 
                            summary={monthlySummary}
                            onMonthChange={handleMonthChange}
                            currentMonth={currentMonth}
                            currentYear={currentYear}
                        />
                    </div>
                    
                    <div className="transactions-section">
                        <div className="section-header">
                            <h2>Recent Transactions</h2>
                            <button 
                                onClick={() => setShowAddModal(true)}
                                className="add-transaction-btn"
                            >
                                + Add Transaction
                            </button>
                        </div>
                        
                        <TransactionList 
                            transactions={transactions}
                            onDelete={handleDeleteTransaction}
                        />
                    </div>
                </div>
            </main>

            {showAddModal && (
                <AddTransactionModal
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddTransaction}
                />
            )}
        </div>
    );
}

export default Dashboard;
