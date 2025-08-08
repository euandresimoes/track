import api from "./api";

export type TransactionType = "EXPENSE" | "INCOME";

export interface Transaction {
  id: number;
  amount: number | string;
  description: string;
  type: TransactionType;
  created_at: string;
  updated_at: string;
}

export interface CreateTransactionData {
  amount: number;
  description: string;
  type: TransactionType;
}

const transactionService = {
  createTransaction: async (
    data: CreateTransactionData
  ): Promise<Transaction> => {
    const response = await api.post<Transaction>("/transaction/create", data);
    return response.data;
  },

  deleteTransaction: async (id: number): Promise<void> => {
    await api.delete(`/transaction/delete?id=${id}`);
  },

  getTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>("/transaction/find");
    return response.data;
  },
};

export default transactionService;
