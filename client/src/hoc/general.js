/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { getAvailableBalance } from '../_actions/available_balance';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent) {
    function GeneralProvider(props) {

        let availableBalance = useSelector(state => state?.availableBalance?.availableBalance);
        const dispatch = useDispatch();

        useEffect(() => {
            //To know my current status, send Auth request 
            dispatch(getAvailableBalance(props?.user?.userData?._id))
        }, [props.user])
        return (
            <SpecificComponent {...props} history={props.history} transactData={availableBalance?.transactData} general={availableBalance?.general} withdrawal={availableBalance?.withdrawal} nzdAccount={availableBalance?.nzdAccount} usdAccount={availableBalance?.usdAccount} audAccount={availableBalance?.audAccount}/>
        )
    }
    return GeneralProvider
}


