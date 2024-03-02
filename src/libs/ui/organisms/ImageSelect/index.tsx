import { useCallback, useRef, memo, useState } from "react";

import { BiImageAdd } from "react-icons/bi";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Image, Text, Wrapper } from "../../atoms";
import {
  StyledAddButton,
  StyledImageSelect,
  StyledImageSelector,
  StyledInput,
  StyledLoadingWrapper,
} from "./styles";
import { storage } from "../../../configs";
import { StyledLoader } from "../../other";

interface ImageSelectProps {
  activeImageUrl: string;
  onChange: (imageUrl: string) => void;
  label?: string;
}

const ImageSelect = memo((props: ImageSelectProps) => {
  const { onChange, activeImageUrl, label } = props;

  const fileSelectRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const uploadImage = useCallback(async () => {
    try {
      if (fileSelectRef.current?.files?.length && onChange) {
        setLoading(true);
        const file = fileSelectRef.current.files[0];
        const imageRef = ref(storage, `${file.name}${Math.random()}`);
        await uploadBytes(imageRef, file).then(() => {
          getDownloadURL(imageRef).then((url) => {
            onChange(url);
          });
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [onChange]);

  return (
    <Wrapper padding="0" direction="column" gap={5}>
      <Text>{label}</Text>
      <StyledImageSelect>
        <Image alt="image" height="100%" width="100%" url={activeImageUrl} />
        <StyledImageSelector>
          <StyledAddButton onClick={() => fileSelectRef.current?.click()}>
            <BiImageAdd color="white" size={20} />
          </StyledAddButton>
        </StyledImageSelector>
        <StyledLoadingWrapper isLoading={loading}>
            <StyledLoader />
        </StyledLoadingWrapper>
        <StyledInput ref={fileSelectRef} type="file" onChange={uploadImage} />
      </StyledImageSelect>
    </Wrapper>
  );
});

export default ImageSelect;
