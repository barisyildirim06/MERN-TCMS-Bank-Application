import React, { useEffect, useState, useCallback, useRef } from 'react'
import Axios from 'axios'
import KeyStats from 'components/key-stats/key-stats';
import KeyFinancialStats from 'components/key-financial-stats/key-financial-stats';
import InterestRates from 'components/interest-rates/interest-rates';
import LeadManagement from 'components/lead-management/lead-management';
import SignupManagement from 'components/signup-management/signup-management';
import WithdrawalManagement from 'components/withdrawal-management/withdrawal-management';
import './AdminDashboardPage.css'
import CreateLedgerDialog from 'dialogs/create-ledger-dialog/create-ledger-dialog';
import { Utils } from 'utils';
import NavBar from 'components/views/NavBar/NavBar';

function AdminDashboardPage({ user }) {
    const taskInput = useRef(null);

    const [subscribers, setSubscribers] = useState([]);
    const [users, setUsers] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
    const [generals, setGenerals] = useState([]);
    const [rates, setRates] = useState({});
    const [interests, setInterests] = useState({});
    const [createLedgerDialogVisible, setCreateLedgerDialogVisible] = useState(false);

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

    const handleAddNewLedgerClick = () => {
        setCreateLedgerDialogVisible(true);
    }
    const handleCreateLedgerDialogClose = () => {
        setCreateLedgerDialogVisible(false);
    }

    const handleLedgerImportClick = useCallback((e) => {
        taskInput.current.click();
    }, []);

    const handleLedgerUploadChange = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.target.files.length === 0) {
            return;
        }

        let file = e.target.files[0];

        if (!Utils.isCSV(file)) {
            return alert('Only CSV format file is allowed.');
        }

        let reader = new FileReader();
        reader.onload = async (e) => {
            let data = {
                data: btoa(e.target.result)
            };
            const res = await Axios.post('/api/generals/import', data)
            alert(res.data.message)
        };

        reader.readAsBinaryString(file);
    }

    return (
        <div className='adminContainer'>
            {!user?.userData?.isAdmin ? null:
                <div >
                    <NavBar />
                    <h1 style={{ paddingTop: '16vh' }}>
                        Admin Dashboard
                    </h1>
                    <br />
                    <h2>Add New Deposit / Fee / Refund</h2>
                    <div>
                        <button className='dashboardNextButton' style={{ margin: '0 20px' }}  onClick={handleAddNewLedgerClick}>Add New</button>
                        <button className='dashboardNextButton' style={{ margin: '0 20px', width: '200px' }} onClick={handleLedgerImportClick}>Bulk Upload</button>
                    </div>
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
                    <br />
                    <CreateLedgerDialog visible={createLedgerDialogVisible} onClose={handleCreateLedgerDialogClose} />
                    <input type="file" accept=".csv" style={{ display: "none" }} value=""  onChange={handleLedgerUploadChange} ref={taskInput}/>
                </div>
            }
        </div>
    )
}

export default AdminDashboardPage
