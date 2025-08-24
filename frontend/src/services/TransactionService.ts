export interface Transaction {
  id: number;
  amount: number;
  description: string;
  type: "INCOME" | "EXPENSE";
  created_at: string;
}

export class TransactionService {
  async findAll() {
    const req = await fetch(
      `${import.meta.env.VITE_API_URL}/v1/transaction/find`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    const res = await req.json();

    if (req.status === 200) {
      return res.data.transactions as Transaction[];
    }

    return [];
  }
}

const transactionService = new TransactionService();
export default transactionService;
