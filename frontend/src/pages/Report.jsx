import React, { useState, useEffect } from 'react';

const Report = () => {
    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState({ lat: null, lng: null });

    // Fetch user's current geolocation
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            (err) => console.error('Geolocation error:', err)
        );
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (image) formData.append('image', image);
        if (audio) formData.append('audio', audio);
        formData.append('description', description);
        formData.append('lat', location.lat);
        formData.append('lng', location.lng);

        try {
            const res = await fetch('http://localhost:8000/api/report', {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                alert('Report submitted!');
                // Reset form
                setImage(null);
                setAudio(null);
                setDescription('');
            } else {
                alert('Submission failed.');
            }
        } catch (err) {
            console.error('Error submitting report:', err);
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Submit a Civic Issue</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload */}
                <div>
                    <label className="block font-medium">Upload Image</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {image && <img src={URL.createObjectURL(image)} alt="preview" className="mt-2 w-48 h-48 object-cover rounded" />}
                </div>

                {/* Audio Recorder Placeholder */}
                <div>
                    <label className="block font-medium">Audio (optional)</label>
                    {/* You’ll add a custom audio recorder component here later */}
                    <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files[0])} />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded p-2"
                        placeholder="Describe the issue..."
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block font-medium">Your Location</label>
                    <p className="text-sm text-gray-600">
                        Latitude: {location.lat} | Longitude: {location.lng}
                    </p>
                </div>

                {/* Submit */}
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Submit Report
                </button>
            </form>
        </div>
    );
};

export default Report;