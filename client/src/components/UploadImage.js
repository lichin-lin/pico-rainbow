import React from "react";

export const UploadImage = ({ fileDataHook }) => {
  const [selectedFile, setSelectedFile] = React.useState();
  const [preview, setPreview] = React.useState();
  // const { fileData, setFile } = fileDataHook;
  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };
  console.log(preview);
  return (
    <div>
      <input type="file" onChange={onSelectFile} />
    </div>
  );
};

export default UploadImage;
