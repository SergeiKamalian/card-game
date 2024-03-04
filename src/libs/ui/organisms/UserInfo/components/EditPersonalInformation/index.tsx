import { memo, useCallback, useMemo } from "react";
import { Tabs } from "../../../Tabs";
import { EditMainInformation, SecuritySettings } from "./components";
import { Formik } from "formik";
import { usePersonalInformation } from "../../../../../hooks";
import { PERSONAL_INFORMATION_SCHEMA } from "../../../../../constants";
import { Modal } from "../../../Modal";
import { TPersonalInformationRequest } from "../../../../../types";

interface EditPersonalInformationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const EditPersonalInformation = memo(
  (props: EditPersonalInformationProps) => {
    const { isOpen, setIsOpen } = props;

    const { editPersonalInformation, initialValues } = usePersonalInformation();

    const tabs = useMemo(
      () => [
        {
          id: 0,
          title: "Main information",
          component: <EditMainInformation />,
        },
        { id: 1, title: "Security Settings", component: <SecuritySettings /> },
      ],
      []
    );

    const editHandler = useCallback(async (values: TPersonalInformationRequest) => {
      try {
        await editPersonalInformation(values)
        setIsOpen(false)
      } catch (error) {
        console.error(error)
      }
    }, [editPersonalInformation, setIsOpen]);

    if (!initialValues) return null;

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={PERSONAL_INFORMATION_SCHEMA}
        onSubmit={editHandler}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize
      >
        {({ handleSubmit }) => (
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Personal information"
            content={<Tabs tabs={tabs} />}
            action={() => handleSubmit()}
          />
        )}
      </Formik>
    );
  }
);
