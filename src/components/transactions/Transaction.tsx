import { Divider, HStack, Spacer, Text, VStack } from "@chakra-ui/react";

type TransactionProps = {
  merchantName: string;
  amount: string;
  txnDate: string;
};

export const Transaction = (props: TransactionProps) => {
  const { merchantName, amount, txnDate } = props;
  const formattedDate = new Date(txnDate);

  const formatTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  return (
    <VStack w="full" spacing={8}>
      <HStack w="full">
        <VStack alignItems="flex-start" spacing={3.5}>
          <Text fontWeight="bold" fontSize={24} color="white">
            {merchantName}
          </Text>
          <Text fontWeight="bold" fontSize={24} color="red">
            {`$-${Math.abs(parseFloat(amount)).toFixed(2)}`}
          </Text>
        </VStack>

        <Spacer />

        <VStack alignItems="flex-end" spacing={3.5}>
          <Text fontWeight="bold" fontSize={24} color="white">
            {`${formattedDate.getMonth()}/${formattedDate.getDay()}/${formattedDate.getFullYear()}`}
          </Text>
          <Text fontWeight="bold" fontSize={24} color="white">
            {formatTime(formattedDate)}
          </Text>
        </VStack>
      </HStack>

      <Divider color="white" bg="white" borderColor="white" />
    </VStack>
  );
};
