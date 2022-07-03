import React, { useState } from 'react'
// import tonMnemonic from "tonweb-mnemonic";


function CreateChannel({ address }: any) {
    return (
        <div className="w-full">
            <ImportWallet />
        </div>
    )
}

const ImportWallet = ({ onImportDone }: any) => {
    const [step, setStep] = useState<"words" | "password">("words")
    const [wordsInput, setWordsInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [words, setWords] = useState<string[]>([]);

    const handleWordsInputChange = (e: any) => {
        setWordsInput(e.target.value);
    }

    const handlePasswordInputChange = (e: any) => {
        setPasswordInput(e.target.value);
    }
    const onImportClick = async () => {
        const wordsList = wordsInput.trim().split(" ");
        if (wordsList.length !== 24) {
            window.alert("Incorrect Secret! You need to input 24 words in space-seperated format.")
            return;
        }

        // const valid = await tonMnemonic.validateMnemonic(wordsList);
        // if (!valid) {
        //     window.prompt("Incorrect Secret! The secret you've entered is not valid.")
        //     return;
        // }

        // console.log(valid);

        // setWords(wordsList);

        // const passwordNeeded = await tonMnemonic.isPasswordNeeded(wordsList);
        // if (!passwordNeeded) {
        //     onImportDone(tonMnemonic.mnemonicToKeyPair(wordsList));
        //     return;
        // }
        // setStep("password");
    }

    const onPasswordImportClick = async () => {
        // const valid = await tonMnemonic.validateMnemonic(wordsList);
        // if (!valid) {
        //     window.prompt("Incorrect Secret! The secret you've entered is not valid.")
        //     return;
        // }

        // setWords(wordsList);

        // const passwordNeeded = await tonMnemonic.isPasswordNeeded(wordsList);
        // if (!passwordNeeded) {
        //     onImportDone(tonMnemonic.mnemonicToKeyPair(wordsList));
        //     return;
        // }
        // setStep("password");
    }

    return (step === "words" ?
        <div className="w-full">
            <h1 className="text-2xl pb-4">Import Wallet</h1>
            <h4>Please input your 24 word secret in space-seperated format.</h4>
            <input type="text" className="w-full outline-none border-black border px-4 py-2 rounded-lg" placeholder="cow rest hello ..."
                value={wordsInput}
                onChange={handleWordsInputChange}
            />
            <button onClick={onImportClick}
                className="mt-4 py-1 px-3 text-lg cursor-pointer max-w-full btn-black text-white outline-1px rounded">
                Import
            </button>
        </div>
        :
        <div className="w-full">
            <h1 className="text-2xl pb-4">Import Wallet</h1>
            <h4>Please input your wallet password.</h4>
            <input type="password" className="w-full outline-none border-black border px-4 py-2 rounded-lg" placeholder="Password"
                value={passwordInput}
                onChange={handlePasswordInputChange}
            />
            <button onClick={onPasswordImportClick}
                className="mt-4 py-1 px-3 text-lg cursor-pointer max-w-full btn-black text-white outline-1px rounded">
                Import
            </button>
        </div>)
}

export default CreateChannel;