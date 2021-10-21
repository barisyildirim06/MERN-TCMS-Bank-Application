import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import KeyStats from 'components/key-stats/key-stats';
import KeyFinancialStats from 'components/key-financial-stats/key-financial-stats';
import InterestRates from 'components/interest-rates/interest-rates';
import LeadManagement from 'components/lead-management/lead-management';

function AdminDashboardPage({ user }) {
    const [subscribers, setSubscribers] = useState([]);
    const [users, setUsers] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
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
            setSubscribers(subscribers.data);
            setUsers(users.data);
            setWithdrawals(withdrawals.data);
            setGenerals(generals.data);
            setRates(rates.data.rates)
            setInterests(interests.data);
        })
    }, []);

    return (
        <div>
            {!user?.userData?.isAdmin ? null:
                <div >
                    AdminDashboard
                    <br />
                    <KeyStats users={users} withdrawals={withdrawals} subscribers={subscribers} />
                    <br />
                    <KeyFinancialStats generals={generals} rates={rates} withdrawals={withdrawals} />
                    <br />
                    <InterestRates interests={interests} generals={generals} rates={rates}/>
                    <br />
                    <LeadManagement subscribers={subscribers} />
                </div>
            }
        </div>
    )
}

export default AdminDashboardPage
