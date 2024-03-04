import { memo } from "react";
import { Button, Text, Wrapper } from "../../../../../../ui";
import { useAuthorization } from "../../../../../../hooks";

export const LogoutContent = memo(() => {

  const { logoutUser } = useAuthorization();
  return (
    <Wrapper
      padding="0"
      direction="column"
      gap={20}
      alignItems="center"
      minWidth="100%"
    >
      <Text>Are you sure you want to leave your account?</Text>
      <Button onClick={logoutUser}>
        <Text cursor="pointer">Sign out</Text>
      </Button>
    </Wrapper>
  );
});
