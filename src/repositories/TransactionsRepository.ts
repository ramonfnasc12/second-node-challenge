import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalBalance = this.transactions.reduce((total, current) => {
      if (current.type === 'outcome') {
        return total - current.value;
      }
      return total + current.value;
    }, 0);

    const totalOutcome = this.transactions.reduce((total, current) => {
      if (current.type === 'outcome') {
        return total + current.value;
      }
      return total;
    }, 0);

    const totalIncome = this.transactions.reduce((total, current) => {
      if (current.type === 'income') {
        return total + current.value;
      }
      return total;
    }, 0);

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalBalance,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
