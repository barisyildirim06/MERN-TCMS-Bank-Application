const { GeneralLedger } = require("../models/GeneralLedger");
let { PendingWithdrawal } = require('../models/PendingWithdrawal');
let { Transfer } = require('../models/Transfer');

const availableBalance = async (req, res) => {
    const general = await GeneralLedger.find({ transactionNotes: req.user._id });
    const withdrawal = await PendingWithdrawal.find({ account: req.user._id });
    const recipient = await Transfer.find({ recipientAccount: req.user._id });
    const donor = await Transfer.find({ donorAccount: req.user._id });

    let nzdAccount = {
        principal: general?.filter(el => el.transactionType === 'CREDIT' && el.currency === 'NZD' )?.length? general?.filter(el => el.transactionType === 'CREDIT' && el.currency === 'NZD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        interestAccrued: general?.filter(el => el.transactionType === 'ACCRUED INTEREST' && el.currency === 'NZD' )?.length ? general?.filter(el => el.transactionType === 'ACCRUED INTEREST' && el.currency === 'NZD' ).reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        fees: general?.filter(el => el.transactionType === 'FEES' && el.currency === 'NZD' )?.length? general?.filter(el => el.transactionType === 'FEES' && el.currency === 'NZD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount * -1 : 0,
        withdrawls: general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'NZD' )?.length? general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'NZD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount * -1 : 0,
        pendingWithdrawls: withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'NZD')?.length? withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'NZD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        recipientTransfers: recipient?.filter(el => el.currency === 'NZD')?.length? recipient?.filter(el => el.currency === 'NZD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        donorTransfers: donor?.filter(el => el.currency === 'NZD')?.length? donor?.filter(el => el.currency === 'NZD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount  * -1 : 0,
    }
    nzdAccount = {
        ...nzdAccount,
        principal: nzdAccount.principal + nzdAccount.donorTransfers,
        availableBalance : nzdAccount.principal + nzdAccount.interestAccrued + nzdAccount.fees + nzdAccount.withdrawls + nzdAccount.pendingWithdrawls + nzdAccount.recipientTransfers + nzdAccount.donorTransfers
    }

    let usdAccount = {
        principal: general?.filter(el => el.transactionType === 'CREDIT' && el.currency === 'USD' )?.length? general?.filter(el => el.transactionType === 'CREDIT' && el.currency === 'USD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        interestAccrued: general?.filter(el => el.transactionType === 'ACCRUED INTEREST' && el.currency === 'USD' )?.length ? general?.filter(el => el.transactionType === 'ACCRUED INTEREST' && el.currency === 'USD' ).reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        fees: general?.filter(el => el.transactionType === 'FEES' && el.currency === 'USD' )?.length? general?.filter(el => el.transactionType === 'FEES' && el.currency === 'USD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount * -1 : 0,
        withdrawls: general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'USD' )?.length? general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'USD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount * -1 : 0,
        pendingWithdrawls: withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'USD')?.length? withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'USD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        recipientTransfers: recipient?.filter(el => el.currency === 'USD')?.length? recipient?.filter(el => el.currency === 'USD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        donorTransfers: donor?.filter(el => el.currency === 'USD')?.length? donor?.filter(el => el.currency === 'USD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount  * -1 : 0,
    }
    usdAccount = {
        ...usdAccount,
        principal: usdAccount.principal + usdAccount.donorTransfers,
        availableBalance : usdAccount.principal + usdAccount.interestAccrued + usdAccount.fees + usdAccount.withdrawls + usdAccount.pendingWithdrawls + usdAccount.recipientTransfers + usdAccount.donorTransfers
    }
    
    let audAccount = {
        principal: general?.filter(el => el.transactionType === 'CREDIT' && el.currency === 'AUD' )?.length? general?.filter(el => el.transactionType === 'CREDIT' && el.currency === 'AUD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        interestAccrued: general?.filter(el => el.transactionType === 'ACCRUED INTEREST' && el.currency === 'AUD' )?.length ? general?.filter(el => el.transactionType === 'ACCRUED INTEREST' && el.currency === 'AUD' ).reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        fees: general?.filter(el => el.transactionType === 'FEES' && el.currency === 'AUD' )?.length? general?.filter(el => el.transactionType === 'FEES' && el.currency === 'AUD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount * -1 : 0,
        withdrawls: general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'AUD' )?.length? general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'AUD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount * -1 : 0,
        pendingWithdrawls: withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'AUD')?.length? withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'AUD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        recipientTransfers: recipient?.filter(el => el.currency === 'AUD')?.length? recipient?.filter(el => el.currency === 'AUD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        donorTransfers: donor?.filter(el => el.currency === 'AUD')?.length? donor?.filter(el => el.currency === 'AUD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount  * -1 : 0,
    }
    
    audAccount = {
        ...audAccount,
        principal: audAccount.principal + audAccount.donorTransfers,
        availableBalance : audAccount.principal + audAccount.interestAccrued + audAccount.fees + audAccount.withdrawls + audAccount.pendingWithdrawls + audAccount.recipientTransfers + audAccount.donorTransfers
    }
    const newWithdrawals = withdrawal?.map(el => {
        return {
            ...el._doc,
            transactionDate: el?.dateSubmitted,
            transactionType: el?.status === 'Confirmed' ? 'WITHDRAWAL' : 'PENDING WITHDRAWAL'
        }
    })
    const newTransferData = donor?.map(el => {
        return {
            ...el._doc,
            amount: el.amount * -1
        }
    })

    let transactData = [...general, ...newWithdrawals, ...newTransferData];
    

return res.status(200).json({ success: true, nzdAccount, usdAccount, audAccount, transactData: transactData.filter(el => el.transactionType !== 'DEBIT') })
}

module.exports = {
    availableBalance,
}
