import { ReactNode, memo, useMemo, useState } from "react";
import { Text, Wrapper } from "../../atoms";
import { StyledBadge, StyledTabItem } from "./styles";
import { useTheme } from "styled-components";

export interface ITab {
  id: number;
  title: string;
  component: ReactNode;
  badge?: number;
}

interface TabsProps {
  tabs: ITab[];
}

export const Tabs = memo((props: TabsProps) => {
  const { tabs } = props;

  const theme = useTheme();

  const [activeTabId, setActiveTabId] = useState(0);

  const component = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId)?.component || null,
    [activeTabId, tabs]
  );

  return (
    <Wrapper padding="0" direction="column" minWidth="100%">
      <Wrapper padding="0" gap={40} minWidth="100%">
        {tabs.map((tab) => (
          <StyledTabItem
            onClick={() => setActiveTabId(tab.id)}
            key={tab.id}
            active={tab.id === activeTabId}
          >
            <Text
              cursor="pointer"
              fw={500}
              fz={20}
              color={tab.id !== activeTabId && theme.colors.purpleLight}
            >
              {tab.title}
            </Text>

            {tab.badge ? (
              <StyledBadge active={tab.id === activeTabId}>
                {tab.badge}
              </StyledBadge>
            ) : null}
          </StyledTabItem>
        ))}
      </Wrapper>
      {component}
    </Wrapper>
  );
});
