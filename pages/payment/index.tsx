import React, { useEffect, useState } from "react";
import CreateChannel from "../../components/channel-page/CreateChannel";
import Layout from "../../components/Layout";
import { connectWallet, getBalance, getWalletAddress, isConnected, ton } from "../../functions/wallet";


const PaymentSettings = () => {

    const [connected, setConnected] = useState(false);
    const [publicAddress, setPublicAddress] = useState<null | string>(null);
    const [balance, setBalance] = useState("");

    useEffect(() => {
        const publicKey = window.localStorage.getItem("pk");
        if (publicKey && !isConnected()) {
            connectWallet(publicKey).then(res => setConnected(res));
        }
    }, []);

    useEffect(() => {
        if (connected) {
            getBalance().then(b => setBalance(b));
            getWalletAddress().then(addr => setPublicAddress(addr))
        }
    }, [connected])


    return <Layout title="insight.d">
        <div className="w-full flex main-container max-width-sub pb-4 md:block lg:w-auto lg:mx-12 sm:mx-6 xs:mx-2">
            {connected && publicAddress ?
                <CreateChannel address={publicAddress} />
                :
                <h2>
                    You need connect you wallet before you can proceed!
                </h2>
            }
        </div>
    </Layout>
}

export default PaymentSettings;