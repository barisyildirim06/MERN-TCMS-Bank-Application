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
        interestAcrrued: general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.currency === 'NZD' )?.length ? general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.currency === 'NZD' ).reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        fees: general?.filter(el => el.transactionType === 'FEES' && el.currency === 'NZD' )?.length? general?.filter(el => el.transactionType === 'FEES' && el.currency === 'NZD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        withdrawls: general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'NZD' )?.length? general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'NZD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount * -1 : 0,
        pendingWithdrawls: withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'NZD')?.length? withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'NZD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        recipientTransfers: recipient?.filter(el => el.currency === 'NZD')?.length? recipient?.filter(el => el.currency === 'NZD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        donorTransfers: donor?.filter(el => el.currency === 'NZD')?.length? donor?.filter(el => el.currency === 'NZD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount  * -1 : 0,
    }
    nzdAccount = {
        ...nzdAccount,
        availableBalance : nzdAccount.principal + nzdAccount.interestAcrrued + nzdAccount.fees + nzdAccount.withdrawls + nzdAccount.pendingWithdrawls + nzdAccount.recipientTransfers + nzdAccount.donorTransfers
    }

    let usdAccount = {
        principal: general?.filter(el => el.transactionType === 'CREDIT' && el.currency === 'USD' )?.length? general?.filter(el => el.transactionType === 'CREDIT' && el.currency === 'USD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        interestAcrrued: general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.currency === 'USD' )?.length ? general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.currency === 'USD' ).reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        fees: general?.filter(el => el.transactionType === 'FEES' && el.currency === 'USD' )?.length? general?.filter(el => el.transactionType === 'FEES' && el.currency === 'USD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        withdrawls: general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'USD' )?.length? general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'USD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount * -1 : 0,
        pendingWithdrawls: withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'USD')?.length? withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'USD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        recipientTransfers: recipient?.filter(el => el.currency === 'USD')?.length? recipient?.filter(el => el.currency === 'USD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        donorTransfers: donor?.filter(el => el.currency === 'USD')?.length? donor?.filter(el => el.currency === 'USD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount  * -1 : 0,
    }
    usdAccount = {
        ...usdAccount,
        availableBalance : usdAccount.principal + usdAccount.interestAcrrued + usdAccount.fees + usdAccount.withdrawls + usdAccount.pendingWithdrawls + nzdAccount.recipientTransfers + nzdAccount.donorTransfers
    }

    let audAccount = {
        principal: general?.filter(el => el.transactionType === 'CREDIT' && el.currency === 'AUD' )?.length? general?.filter(el => el.transactionType === 'CREDIT' && el.currency === 'AUD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        interestAcrrued: general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.currency === 'AUD' )?.length ? general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.currency === 'AUD' ).reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        fees: general?.filter(el => el.transactionType === 'FEES' && el.currency === 'AUD' )?.length? general?.filter(el => el.transactionType === 'FEES' && el.currency === 'AUD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        withdrawls: general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'AUD' )?.length? general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'AUD' )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount * -1 : 0,
        pendingWithdrawls: withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'AUD')?.length? withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'AUD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        recipientTransfers: recipient?.filter(el => el.currency === 'AUD')?.length? recipient?.filter(el => el.currency === 'AUD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
        donorTransfers: donor?.filter(el => el.currency === 'AUD')?.length? donor?.filter(el => el.currency === 'AUD')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount  * -1 : 0,
    }

    audAccount = {
        ...audAccount,
        availableBalance : audAccount.principal + audAccount.interestAcrrued + audAccount.fees + audAccount.withdrawls + audAccount.pendingWithdrawls + nzdAccount.recipientTransfers + nzdAccount.donorTransfers
    }

    return res.status(200).json({ success: true, message: 'Successfully created the Ledger', nzdAccount, usdAccount, audAccount, general, withdrawal, donor, recipient })
}

module.exports = {
    availableBalance,
}
