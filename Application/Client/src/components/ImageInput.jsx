import { useState } from "react";

export default function ImageInput({
  label,
  placeholder,
  rhfRegister,
  disabled = false,
  imageUrl = null,
  setValue,
}) {
  const [imageSrc, setImageSrc] = useState(imageUrl);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-montserrat w-full">
      <label className="text-app-darkBlue">{label}</label>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-app-lightBlue40"
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-app-darkBlue"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-app-darkBlue">
                <span className="font-semibold">
                  Натиснете за да добавите изображение
                </span>
              </p>
              <p className="text-xs text-app-lightBlue">PNG или JPG</p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            {...rhfRegister}
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}
