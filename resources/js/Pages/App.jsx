import React, { useRef, useState } from 'react';
import CheckboxGroup from "@/Components/CheckboxGroup";
import RadioButtonGroup from "@/Components/RadioButtonGroup";
import TextInput from "@/Components/TextInput";
import ImageUpload from "@/Components/ImageUpload";

export default function App({}) {
    const options = [
        { label: "Hi", value: "hi" },
        { label: "Hello", value: "hello" },
    ];

    const checkOptions = [
        { label: "World!", value: "World!" },
        { label: "Web!", value: "Web!" },
    ];

    const [selectedValue, setSelectedValue] = useState(null);
    const [checkValue, setCheckValue] = useState([]);
    const [textInput, setTextInput] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const imageRef = useRef(null);

    const handleRadioChange = (value) => {
        setSelectedValue(value);
    };

    const checkRadioChange = (value) => {
        const newCheckValue = Array.isArray(value) ? value : [value];
        setCheckValue(newCheckValue);
    };

    const handleTextInputChange = (value) => {
        setTextInput(value);
    };

    const handleImageChange = (file) => {
        if (file) {
            if (file.type.startsWith("image/")) {
                setImageFile(file);

                const previewUrl = URL.createObjectURL(file);
                setImagePreview(previewUrl);

                if (imageRef.current) {
                    imageRef.current.src = previewUrl;
                }
            } else {
                console.error("Selected file is not an image.");
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("text_input", textInput);
            formData.append("radio_value", selectedValue || "");
            formData.append("checkbox_values", JSON.stringify(checkValue));
            formData.append("image", imageFile);

            const response = await fetch("/api/store-form-data", {
                method: "POST",
                body: formData,
            });

            setTextInput("");
            setSelectedValue(null);
            setCheckValue([]);
            setImageFile(null);
            setImagePreview("");
            setSuccessMessage("Form submitted successfully!");

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

            if (imageRef.current) {
                imageRef.current.src = "";
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleViewDatabase = () => {
        // Replace 'your_database_url' with the actual URL you want to navigate to
        const databaseUrl = '/database';

        // Navigate to the database URL
        window.location.href = databaseUrl;
    };
    return (
        <>

            <div className="flex lg:m-[60px] bg-[#d9ead3] p-4 flex-col gap-6 pl-10">
                <TextInput onInputChange={handleTextInputChange} formSubmitted={successMessage !== ""} />
                <label className="text-sm italic font-medium text-black">
                    Radio Button
                </label>
                <RadioButtonGroup
                    options={options}
                    selectedValue={selectedValue}
                    onChange={handleRadioChange}
                />
                <label className="text-sm italic font-medium text-black">
                    Check Box
                </label>
                <CheckboxGroup
                    options={checkOptions}
                    selectedValues={checkValue}
                    onChange={checkRadioChange}
                />
                <label className="text-sm italic font-medium text-black">
                    Image Upload
                </label>
                <ImageUpload onImageChange={handleImageChange} formSubmitted={successMessage !== ""} />

                {imagePreview && (
                    <img
                        ref={imageRef}
                        src={imagePreview}
                        alt="Image Preview"
                        className="max-w-[200px] max-h-[200px] mt-2"
                    />
                )}

                {successMessage && (
                    <p className="text-green-500 font-bold">{successMessage}</p>
                )}

                <div className="flex gap-4 justify-center pb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleViewDatabase}
                    >
                        View Database
                    </button>
                </div>
            </div>
        </>
    );
}
