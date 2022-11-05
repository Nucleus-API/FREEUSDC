import "@fontsource/inter";

import { Button } from "@chakra-ui/react";

type Props = {
  title: string;
  w?: any;
  leftIcon?: any;
  rightIcon?: any;
  onClick?: (event: any) => void;
  ml?: any;
  bg?: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
  pr?: any;
  pl?: any;
};

export const TreasuryButton = (props: Props) => {
  return (
    <Button
      w={props.w ? props.w : "full"}
      ml={props.ml}
      fontFamily="Inter"
      fontSize={{ base: 12, md: 14, lg: 16, xl: 16 }}
      fontWeight={700}
      borderRadius={4}
      bg={props.bg ? props.bg : "#2B32DB"}
      color="#FFFFFF"
      leftIcon={props.leftIcon}
      rightIcon={props.rightIcon}
      isLoading={props.isLoading}
      disabled={props.disabled}
      onClick={props.onClick}
      _hover={{
        bg: "#6064CB",
      }}
      {...props}
    >
      {props.title}
    </Button>
  );
};
