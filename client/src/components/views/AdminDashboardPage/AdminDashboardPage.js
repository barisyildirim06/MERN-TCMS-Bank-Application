import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import KeyStats from '../../key-stats/key-stats';
import KeyFinancialStats from '../../key-financial-stats/key-financial-stats';

function AdminDashboardPage({ user }) {
    const [subscribers, setSubscribers] = useState([]);
    const [users, setUsers] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [generals, setGenerals] = useState([]);
    const [rates, setRates] = useState({});
    useEffect(() => {
        Promise.all([
            Axios.get('/api/subscribers/list'),
            Axios.get('/api/users/list'),
            Axios.get('/api/withdrawals/list'),
            Axios.get('/api/generals/list'),
            Axios.get('https://api.exchangerate.host/latest?base=USD&symbols=NZD,AUD'),
        ]).then(([subscribers, users, withdrawals, generals, rates]) => {
            setSubscribers(subscribers.data);
            setUsers(users.data);
            setWithdrawals(withdrawals.data);
            setGenerals(generals.data);
            setRates(rates.data.rates)
        })
    }, []);
    console.log(subscribers)
    return (
        <div>
            {!user?.userData?.isAdmin ? null:
                <div >
                    AdminDashboard
                    <br />
                    <KeyStats users={users} withdrawals={withdrawals} subscribers={subscribers} />
                    <br />
                    <KeyFinancialStats generals={generals} rates={rates} withdrawals={withdrawals} />
                </div>
            }
        </div>
    )
}

export default AdminDashboardPage
