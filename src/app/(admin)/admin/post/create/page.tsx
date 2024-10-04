'use client'; // Include this to specify that this component is a client component
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
    const [image, setImage] = useState<File | null>(null); // Specify type for image
    const [title, setTitle] = useState<string>(''); // Specify type for title
    const [errors, setError] = useState<{ image?: string; title?: string }>({}); // Use an object for errors

    const router = useRouter();

    // Specify the type for the event parameter
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]); // Get the selected file
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData();
        if (image) {
            formData.append('image', image); // Add image file
        }
        formData.append('title', title); // Add title

        try {
            const res = await fetch('/api/post', {
                method: 'POST',
                body: formData, // Send the form data
            });

            if (res.ok) {
                router.push('/admin/post');
            } else {
                const data = await res.json();
                setError(data.errors); // Assuming data.errors is an object with fields like { image: 'Error message', title: 'Error message' }
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="font-bold text-3xl text-white text-center">Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange} // Handle image change
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
                    />
                    {errors.image && <p className="text-red-500">{errors.image}</p>} {/* Access image error correctly */}
                </div>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="title"
                        value={title} // Controlled input
                        onChange={handleTitleChange} // Handle title change
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
                        placeholder="Title"
                    />
                    {errors.title && <p className="text-red-500">{errors.title}</p>} {/* Access title error correctly */}
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
