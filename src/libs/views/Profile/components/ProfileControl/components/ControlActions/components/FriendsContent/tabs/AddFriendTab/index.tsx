import { Form, Formik } from "formik";
import { memo } from "react";
import {
  Button,
  FormField,
  IconWithCircle,
  Text,
  UserInfo,
  Wrapper,
} from "../../../../../../../../../../ui";
import {
  FRIEND_SEARCH_INITIAL_VALUES,
  FRIEND_SEARCH_SCHEMA,
} from "../../../../../../../../../../constants";
import { useFriendsContext } from "../../../../../../../../../../contexts/Friends";
import { StyledFoundUsersList } from "./styles";
import { FaUserPlus } from "react-icons/fa";

export const AddFriendTab = memo(() => {
  const { findFriends, foundUsers, sendFriendRequest } = useFriendsContext();

  return (
    <Wrapper
      direction="row"
      justifyContent="space-between"
      minWidth="100%"
      gap={30}
    >
      <Formik
        initialValues={FRIEND_SEARCH_INITIAL_VALUES}
        validationSchema={FRIEND_SEARCH_SCHEMA}
        onSubmit={(v) => findFriends(v)}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
      >
        <Form>
          <Wrapper
            padding="30px 10px 0 10px"
            gap={10}
            direction="column"
            minWidth="300px"
          >
            <FormField name="userName" label="User name" placeholder="Adam" />
            <Button>
              <Text fz={18} fw={500} cursor="pointer">
                Find
              </Text>
            </Button>
          </Wrapper>
        </Form>
      </Formik>
      <StyledFoundUsersList>
        {foundUsers.map((user) => (
          <UserInfo
            user={user}
            isUserInfo={false}
            action={
              <IconWithCircle
                icon={<FaUserPlus color="white" size={20} />}
                onClick={() => sendFriendRequest(user)}
                size={40}
              />
            }
          />
        ))}
      </StyledFoundUsersList>
    </Wrapper>
  );
});
