import sha256 from "crypto-js/sha256";
import Hex from "crypto-js/enc-hex";
import type {
  BalancesChangedListener,
  MoneroWallet,
  OutputReceivedListener,
  SyncProgressListener,
} from "monero-javascript";

import { createWalletFull, MoneroWalletListener } from "monero-javascript";

const stagenetNode = {
  networkType: "stagenet",
  password: "pass123",
  serverUri: "http://localhost:38081",
  serverUsername: "superuser",
  serverPassword: "abctesting123",
  rejectUnauthorized: false, // e.g. local development
};

// --- Helper
export const getMnemonicHash = (seed: FormDataEntryValue | null) =>
  Hex.stringify(sha256(seed));

// --- Wallet stuff
export const createWallet = async (lang = "English") => {
  const walletFull = await createWalletFull({
    // mnemonic omitted => generate random wallet
    language: lang,
    ...stagenetNode,
  });
  return walletFull.getMnemonic();
};

export const open = (mnemonic: string) => {
  return createWalletFull({
    mnemonic,
    ...stagenetNode,
  });
};

export const createMoneroTransactionUri = ({
  address,
  amount,
  description,
}: {
  address: string;
  amount: number;
  description: string;
}) => {
  return `monero:${address}?tx_amount=${amount}&tx_description=${description}`;
};

// --- Listeners
export const createSyncProgressListener = (
  onSyncProgress: SyncProgressListener
) =>
  new (class extends MoneroWalletListener {
    onSyncProgress(
      height: number,
      startHeight: number,
      endHeight: number,
      percentDone: number,
      message: string
    ) {
      onSyncProgress(height, startHeight, endHeight, percentDone, message);
    }
  })() as MoneroWalletListener;

export const createBalancesChangedListener = (
  onBalancesChanged: BalancesChangedListener
) =>
  new (class extends MoneroWalletListener {
    onBalancesChanged(newBalance: BigInteger, newUnlockedBalance: BigInteger) {
      onBalancesChanged(newBalance, newUnlockedBalance);
    }
  })() as MoneroWalletListener;

export const createOutputReceivedListener = (
  onOutputReceived: OutputReceivedListener
) =>
  new (class extends MoneroWalletListener {
    onOutputReceived(output: MoneroWallet) {
      onOutputReceived(output);
    }
  })() as MoneroWalletListener;
