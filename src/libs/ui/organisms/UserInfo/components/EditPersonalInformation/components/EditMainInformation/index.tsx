import { memo, useCallback } from "react";
import { FormField, Wrapper } from "../../../../../../atoms";
import ImageSelect from "../../../../../ImageSelect";
import { useFormikContext } from "formik";
import { TPersonalInformationRequest } from "../../../../../../../types";

export const EditMainInformation = memo(() => {
  const { values, setFieldValue } =
    useFormikContext<TPersonalInformationRequest>();

  const changeAvatarUrl = useCallback(
    (newUrl: string) => setFieldValue("avatarURL", newUrl),
    [setFieldValue]
  );

  return (
    <Wrapper padding="20px 20px 0" gap={30}>
      <ImageSelect
        activeImageUrl={values.avatarURL}
        onChange={changeAvatarUrl}
        label="Avatar"
      />
      <FormField name="name" label="Name" />
    </Wrapper>
  );
});
