'use strict';

/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */
const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций
  transactions: [],

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {

    let maxTransactionId = this.getMaxTransactionId();
    maxTransactionId += 1;

    return {
      id: maxTransactionId,
      type,
      amount
    };
  },

  getMaxTransactionId() {

    let maxTransactionId = 0;

    const transactions = this.transactions;
    
    for (const { id } of transactions) {
      if (id > maxTransactionId) {
        maxTransactionId = id;
      }
    }

    return maxTransactionId;
  }, 
  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {

    const transaction = this.createTransaction(amount, Transaction.DEPOSIT);

    this.balance += amount;

    this.transactions.push(transaction);
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {

    if (amount > this.getBalance()) {
      console.log('Cнятие такой суммы не возможно, недостаточно средств');
      return;
    }

    const transaction = this.createTransaction(amount, Transaction.WITHDRAW);

    this.balance -= amount;

    this.transactions.push(transaction);
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return this.balance;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {

    const transactions = this.transactions;

    for (const transaction of transactions) {
      if (transaction.id === id) {
        return transaction;
      }
    }

    return {};
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {

    let transactionTotal = 0;

    const transactions = this.transactions;

    for (const { amount, type: transactionType } of transactions) {
      if (type === transactionType) {
        transactionTotal += amount;
      }
    }

    return transactionTotal;

  },
};


/* -----------------------My Tests--------------------------- */

account.deposit(200);
account.deposit(200);
account.deposit(200);

account.withdraw(200);



console.log('Account ballance:', account.getBalance());

console.log('Account transactions:', account.transactions);

console.log('Total DEPOSIT:',account.getTransactionTotal(Transaction.DEPOSIT));

console.log('Total WITHDRAW:',account.getTransactionTotal(Transaction.WITHDRAW));

