import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import KeyStats from 'components/key-stats/key-stats';
import KeyFinancialStats from 'components/key-financial-stats/key-financial-stats';
import InterestRates from 'components/interest-rates/interest-rates';
import LeadManagement from 'components/lead-management/lead-management';
import SignupManagement from 'components/signup-management/signup-management';
import WithdrawalManagement from 'components/withdrawal-management/withdrawal-management';
import './AdminDashboardPage.css'

function AdminDashboardPage({ user }) {
    const [subscribers, setSubscribers] = useState([]);
    const [users, setUsers] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
    const [generals, setGenerals] = useState([]);
    const [rates, setRates] = useState({});
    const [interests, setInterests] = useState({});
    useEffect(() => {
        Promise.all([
            Axios.get('/api/subscribers/list'),
            Axios.get('/api/users/list'),
            Axios.get('/api/withdrawals/list'),
            Axios.get('/api/generals/list'),
            Axios.get('https://api.exchangerate.host/latest?base=USD&symbols=NZD,AUD'),
            Axios.get('/api/interests/list'),
        ]).then(([subscribers, users, withdrawals, generals, rates, interests]) => {
            const _pendingWithdrawals = withdrawals.data.pendingWithdrawals.map(w => {
                return {...w, user: users.data.users.find(u => u._id === w.account)}
            })

            setPendingWithdrawals(_pendingWithdrawals);
            setSubscribers(subscribers.data);
            setUsers(users.data);
            setWithdrawals(withdrawals.data);
            setGenerals(generals.data);
            setRates(rates.data.rates)
            setInterests(interests.data);
        })
    }, []);

    const handleWithdrawalConfirm = (e) => {
        const _pendingWithdrawals = pendingWithdrawals.filter(p => p._id !== e.target.value);
        setPendingWithdrawals(_pendingWithdrawals);
    }

    const handleUserVerify = (e) => {
        const _users = users.map(u => {
            if (u._id === e.target.value) {
                return {
                    ...u,
                    verified: 1
                }
            }
            return u;
        })
        setUsers(_users);
    }

    return (
        <div className='adminContainer'>
            {!user?.userData?.isAdmin ? null:
                <div >
                    AdminDashboard
                    <br />
                    <KeyStats users={users} subscribers={subscribers} />
                    <br />
                    <KeyFinancialStats generals={generals} rates={rates} withdrawals={withdrawals} />
                    <br />
                    <InterestRates interests={interests} generals={generals} rates={rates}/>
                    <br />
                    <LeadManagement subscribers={subscribers} />
                    <br />
                    <SignupManagement users={users} onUserVerify={handleUserVerify}/>
                    <br />
                    <WithdrawalManagement withdrawals={pendingWithdrawals} onWithdrawalConfirm={handleWithdrawalConfirm}/>
                </div>
            }
        </div>
    )
}

export default AdminDashboardPage
