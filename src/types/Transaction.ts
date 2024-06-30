export interface Transaction {
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  input: Record<string, any>;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  blockNumber: number;
  date: Date;
}

export interface VotedEvent {
  blockNumber: number;
  date: Date;
  contractName: string;
  contractAddress: string;
  signature: string;
  txHash: string;
  logIndex: string;
  returnValues: {
    voter: string;
    candidateId: string;
  };
}
