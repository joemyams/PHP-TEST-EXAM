import React, { useState, useEffect } from "react";

export default function Data() {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/get-form-data");
                const data = await response.json();
                setFormData(data.data);
            } catch (error) {
                console.error("Error fetching form data:", error);
            }
        };

        fetchData();
    }, []);
    const handleViewHome = () => {
        // Replace 'your_database_url' with the actual URL you want to navigate to
        const databaseUrl = '/';

        // Navigate to the database URL
        window.location.href = databaseUrl;
    };
    return (
        <div className="flex lg:m-[60px] bg-[#d9ead3] p-4 flex-col gap-6 pl-10">
            <h2 className="text-2xl font-bold mb-4">Form Data</h2>
            {formData && (
                <div className="justify-center items-center">
                    <div className="flex justify-center items-center flex-col gap-6">
                        <div className="bg-[#ff0] border-2 flex border-black m-auto p-4 w-96 justify-center items-center">
                            {formData.text_input}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                {`${formData.radio_value}   ${
                                    formData.checkbox_values
                                        ? formData.checkbox_values.join(", ")
                                        : ""
                                }`}
                            </h2>
                        </div>
                        {formData.image_url && (
                            <div>
                                <img
                                    src={formData.image_url}
                                    alt="Form Data Image"
                                    className="w-[400px] mt-2"
                                />
                            </div>
                        )}
                        {!formData.image_url && (
                            <p>No image available</p>
                        )}
                    </div>
                    <div className="flex justify-center items-center mt-10 mb-10">
                    <button
                        className="bg-[#ccc] border-2 border-blue-500 hover:bg-[#ddd] text-black font-bold py-2 px-4 rounded"  onClick={handleViewHome}

                    >
                       Back to Form
                    </button>
                    </div>

                </div>
            )}
        </div>
    );
}
