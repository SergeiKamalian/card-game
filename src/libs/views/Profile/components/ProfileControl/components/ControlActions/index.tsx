import { memo } from "react";
import { Button, Wrapper } from "../../../../../../ui";
import { FaUserFriends } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { MdCasino } from "react-icons/md";
import { useTheme } from "styled-components";

export const ControlActions = memo(() => {

    const theme = useTheme()

    return (
        <Wrapper padding="0" gap={20} minWidth="250px" justifyContent="flex-end">
            <Button isCircle circleSize={50}>
                <FaUserFriends color={theme.colors.white} size={25} />
            </Button>
            <Button isCircle circleSize={50}>
                <TbMessageCircle2Filled color={theme.colors.white} size={25} />
            </Button>
            <Button isCircle circleSize={50}>
                <MdCasino color={theme.colors.white} size={25} />
            </Button>
        </Wrapper>
    )
})