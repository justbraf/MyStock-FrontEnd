interface CustomerType {
    _id: string,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    address: string,
    birthdate: string,
    accounts: number[]
}

interface TransactionsType {
    date: Date,
    amount: number,
    transaction_code: string,
    symbol: string,
    price: string,
    total: string
}

interface TransactionType {
    _id: string,
    account_id: number,
    transaction_count: number,
    bucket_start_date: Date,
    bucket_end_date: Date,
    transactions: TransactionsType[]
}

export type { CustomerType,TransactionsType, TransactionType }