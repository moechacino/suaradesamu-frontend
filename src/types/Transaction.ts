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
}

export interface VotedEvent {
  blockNumber: number;
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
