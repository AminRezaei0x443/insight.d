import TonWeb from "tonweb";

export let ton: TonWeb | undefined = undefined;
export let wallet: any = undefined;

export const initializeWalletHelper = () => {
    // @ts-ignore
    ton = new TonWeb(window.ton);
}

//@ts-ignore
export const isPluginSupported = () => ton !== undefined && window.ton;

export const connectWallet = async (publicKey: string | null): Promise<boolean> => {
    if (!publicKey) {
        const accounts = await ton?.provider.send("ton_requestAccounts", undefined);
        if (!Array.isArray(accounts) || accounts.length === 0)
            return false;
        publicKey = accounts[0]
        window.localStorage.setItem("pk", publicKey ?? "");
        console.log(publicKey);
    }


    wallet = ton?.wallet.create({ publicKey });
    console.log(wallet);

    return true;
}

export const disconnectWallet = async (): Promise<boolean> => {
    window.localStorage.removeItem("pk")
    wallet = undefined;
    return true;
}

export const isConnected = () => wallet !== undefined;

export const getWalletAddress = async (): Promise<string | null> => {
    const accounts = await ton?.provider.send('ton_requestAccounts', undefined);
    if (!Array.isArray(accounts) || accounts.length === 0)
        return null;
    return accounts[0];
}

export const getBalance = async (): Promise<string> => {
    const balance = await ton?.provider.send('ton_getBalance', undefined);
    if (typeof balance === "string") {
        return TonWeb.utils.fromNano(balance);
    }
    return "0";
}