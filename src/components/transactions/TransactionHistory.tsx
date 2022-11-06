import "@fontsource/roboto-mono";

import { Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { BankingService } from "services/BankingService";
import { Transaction } from "./Transaction";
import { useAccount } from "wagmi";

export const TransactionHistory = () => {
  const { address } = useAccount();

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    listTransactions();
    // eslint-disable-next-line
  }, []);

  const listTransactions = async () => {
    const response = await BankingService.listTransactions(address);
    setTransactions(response);
  };

  return (
    <VStack w="full" h="100%" borderColor="white" borderWidth={6} borderRadius={36} flexGrow={1}>
      <VStack
        w="full"
        h="full"
        maxH="90vh"
        alignItems="flex-start"
        spacing={6}
        pt={6}
        pb={6}
        pr={10}
        pl={10}
        style={{
          overflow: "auto",
        }}
      >
        <Text fontFamily="Roboto Mono" fontWeight="bold" color="white" fontSize={26}>
          TRANSACTION HISTORY
        </Text>

        {transactions.map((transaction, index) => (
          <Transaction
            key={index}
            merchantName={transaction.merchant.merchantName}
            amount={transaction.amount}
            txnDate={transaction.txnDate}
          />
        ))}
      </VStack>
    </VStack>
  );
};
