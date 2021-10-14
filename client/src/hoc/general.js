/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { getGeneral } from '../_actions/general_actions';
import { getWithdrawal } from '../_actions/withdrawal_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent) {
    function GeneralProvider(props) {

        let general = useSelector(state => state?.general?.general);
        let withdrawal = useSelector(state => state?.withdrawal?.withdrawal);
        const dispatch = useDispatch();
        let nzdAccount = {}
        let usdAccount = {}
        let audAccount = {}
        if (general && withdrawal) {
            nzdAccount = {
                principal: general?.filter(el => el.transactionType === 'CREDIT' && el.ledgerSource=== '0678-015784-001' && el.transactionNotes === props?.user?.userData?._id)?.length? general?.filter(el => el.transactionType === 'CREDIT' && el.ledgerSource=== '0678-015784-001' && el.transactionNotes === props?.user?.userData?._id)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
                interestAcrrued: general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.ledgerSource=== 'TCMS - NZD' && el.transactionNotes === props?.user?.userData?._id)?.length ? general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.ledgerSource=== 'TCMS - NZD' && el.transactionNotes === props?.user?.userData?._id).reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
                fees: general?.filter(el => el.transactionType === 'FEES' && el.ledgerSource === 'TCMS - NZD' && el.transactionNotes === props?.user?.userData?._id)?.length? general?.filter(el => el.transactionType === 'FEES' && el.ledgerSource === 'TCMS - NZD' && el.transactionNotes === props?.user?.userData?._id)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
                withdrawls: general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'NZD' && el.transactionNotes === props?.user?.userData?._id)?.length? general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'NZD' && el.transactionNotes === props?.user?.userData?._id)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
                pendingWithdrawls: withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'NZD' && el.account === props?.user?.userData?._id)?.length? withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'NZD' && el.account === props?.user?.userData?._id)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0
            }
            nzdAccount = {
                ...nzdAccount,
                availableBalance : nzdAccount.principal + nzdAccount.interestAcrrued + nzdAccount.fees + nzdAccount.withdrawls + nzdAccount.pendingWithdrawls
            }
    
            usdAccount = {
                principal: general?.filter(el => el.transactionType === 'CREDIT' && el.ledgerSource=== '0517-072812-002' && el.transactionNotes === props?.user?.userData?._id)?.length? general?.filter(el => el.transactionType === 'CREDIT' && el.ledgerSource=== '0517-072812-002')?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
                interestAcrrued: general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.ledgerSource=== 'TCMS - USD' && el.transactionNotes === props?.user?.userData?._id)?.length ? general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.ledgerSource=== 'TCMS - USD' && el.transactionNotes === props?.user?.userData?._id).reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
                fees: general?.filter(el => el.transactionType === 'FEES' && el.ledgerSource === 'TCMS - USD' && el.transactionNotes === props?.user?.userData?._id)?.length? general?.filter(el => el.transactionType === 'FEES' && el.ledgerSource === 'TCMS - USD' && el.transactionNotes === props?.user?.userData?._id)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
                withdrawls: general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'USD' && el.transactionNotes === props?.user?.userData?._id)?.length? general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'USD' && el.transactionNotes === props?.user?.userData?._id)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
                pendingWithdrawls: withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'USD' && el.account === props?.user?.userData?._id)?.length? withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'USD' && el.account === props?.user?.userData?._id)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0
            }
            usdAccount = {
                ...usdAccount,
                availableBalance : usdAccount.principal + usdAccount.interestAcrrued + usdAccount.fees + usdAccount.withdrawls + usdAccount.pendingWithdrawls
            }
    
            audAccount = {
                principal: general?.filter(el => el.transactionType === 'CREDIT' && el.ledgerSource=== '0817-05783-002' && el.transactionNotes === props?.user?.userData?._id)?.length? general?.filter(el => el.transactionType === 'CREDIT' && el.ledgerSource=== '0817-05783-002' && el.transactionNotes === props?.user?.userData?._id)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
                interestAcrrued: general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.ledgerSource=== 'TCMS - AUD' && el.transactionNotes === props?.user?.userData?._id)?.length ? general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.ledgerSource=== 'TCMS - AUD' && el.transactionNotes === props?.user?.userData?._id).reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
                fees: general?.filter(el => el.transactionType === 'FEES' && el.ledgerSource === 'TCMS - AUD' && el.transactionNotes === props?.user?.userData?._id)?.length? general?.filter(el => el.transactionType === 'FEES' && el.ledgerSource === 'TCMS - AUD' && el.transactionNotes === props?.user?.userData?._id)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
                withdrawls: general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'AUD' && el.transactionNotes === props?.user?.userData?._id)?.length? general?.filter(el => el.transactionType === 'DEBIT' && el.currency === 'AUD' && el.transactionNotes === props?.user?.userData?._id)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
                pendingWithdrawls: withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'AUD' && el.account === props?.user?.userData?._id)?.length? withdrawal?.filter(el => el.status === 'Pending' && el.currency === 'AUD' && el.account === props?.user?.userData?._id)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0
            }
    
            audAccount = {
                ...audAccount,
                availableBalance : audAccount.principal + audAccount.interestAcrrued + audAccount.fees + audAccount.withdrawls + audAccount.pendingWithdrawls
            }
        }

        const newWithdrawals = withdrawal?.map(el => {
            return {
                ...el,
                transactionDate: el?.dateSubmitted,
                transactionType: el?.status === 'Confirmed' ? 'WITHDRAWAL' : 'PENDING WITHDRAWAL'
            }
        }) 
        let transactData = general?.concat(newWithdrawals)

        useEffect(() => {
            //To know my current status, send Auth request 
            dispatch(getGeneral(props?.user?.userData?._id))
            dispatch(getWithdrawal(props?.user?.userData?._id))
        }, [props.user])

        return (
            <SpecificComponent {...props} history={props.history} transactData={transactData} general={general} withdrawal={withdrawal} nzdAccount={nzdAccount} usdAccount={usdAccount} audAccount={audAccount}/>
        )
    }
    return GeneralProvider
}


