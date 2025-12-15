'use client'

import React, { useState, useEffect } from 'react';
import { Upload, Save, Eye, EyeOff, Edit2, Trash2, Plus, X, ImageIcon, RefreshCw, Loader2 } from 'lucide-react';
import { siteSettingApi } from "@/app/api/siteSettingApi";
import toast from 'react-hot-toast';

export default function SiteSettings() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [activeSection, setActiveSection] = useState(null);

    const [formData, setFormData] = useState({
        site_name: '',
        sections: [
            { image: '', eyebrow: '', title: '', copy: '', cta: '', align: 'left' },
            { image: '', eyebrow: '', title: '', copy: '', cta: '', align: 'right' },
            { image: '', eyebrow: '', title: '', copy: '', cta: '', align: 'left' },
            { image: '', eyebrow: '', title: '', copy: '', cta: '', align: 'right' }
        ]
    });

    const [imageFiles, setImageFiles] = useState({});
    const [imagePreviews, setImagePreviews] = useState({});

    // Fetch existing settings
    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            //      const response = await fetch(`${API_BASE}/site-settings`);
            const data = await siteSettingApi.getAll();

            if (data.success && data.data.length > 0) {
                const existingSettings = data.data[0];
                setSettings(existingSettings);
                setFormData({
                    site_name: existingSettings.site_name,
                    sections: existingSettings.sections.length > 0
                        ? existingSettings.sections
                        : formData.sections
                });

                // Set existing image previews
                const previews = {};
                existingSettings.sections.forEach((section, idx) => {
                    if (section.image) {
                        previews[`image${idx + 1}`] = section.image;
                    }
                });
                setImagePreviews(previews);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            setImageFiles(prev => ({ ...prev, [`image${index + 1}`]: file }));

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => ({ ...prev, [`image${index + 1}`]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSectionChange = (index, field, value) => {
        const newSections = [...formData.sections];
        newSections[index] = { ...newSections[index], [field]: value };
        setFormData({ ...formData, sections: newSections });
    };

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();

            // Add only the images that were actually selected (not empty objects)
            Object.keys(imageFiles).forEach(key => {
                if (imageFiles[key] && imageFiles[key] instanceof File) {
                    formDataToSend.append(key, imageFiles[key]);
                }
            });

            // Prepare data object
            const dataObj = {
                site_name: formData.site_name
            };

            // Add section data
            formData.sections.forEach((section, idx) => {
                dataObj[`eyebrow${idx + 1}`] = section.eyebrow || '';
                dataObj[`title${idx + 1}`] = section.title || '';
                dataObj[`copy${idx + 1}`] = section.copy || '';
                dataObj[`cta${idx + 1}`] = section.cta || '';
                dataObj[`align${idx + 1}`] = section.align || 'left';
            });

            formDataToSend.append('data', JSON.stringify(dataObj));

            // Log what we're sending for debugging
            console.log('Sending data:', dataObj);
            console.log('Image files:', Object.keys(imageFiles));

            const response = await fetch(`http://localhost:5000/api/site-setting`, {
                method: 'PATCH',
                body: formDataToSend
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error:', errorText);
                throw new Error(`Server responded with ${response.status}: ${errorText}`);
            }

            const result = await response.json();

            if (result.success) {
                alert('✨ Site settings updated successfully!');
                fetchSettings();
                setImageFiles({});
            } else {
                alert('❌ ' + (result.message || 'Failed to update settings'));
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('❌ Failed to update settings: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const removeImage = (index) => {
        const key = `image${index + 1}`;
        const newImageFiles = { ...imageFiles };
        delete newImageFiles[key];
        setImageFiles(newImageFiles);

        const newPreviews = { ...imagePreviews };
        delete newPreviews[key];
        setImagePreviews(newPreviews);

        handleSectionChange(index, 'image', '');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff6f0] to-[#fff0e8] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600">
                            Site Settings Manager
                        </h1>
                        <p className="text-[var(--pink)] mt-2">Configure your website sections and content</p>
                    </div>
                    <div>
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-[var(--pink)] hover:to-rose-600 transition-all shadow-lg hover:shadow-xl"
                        >
                            {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
                            {showPreview ? 'Hide' : 'Show'} Preview
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <RefreshCw className="animate-spin text-[var(--pink)]" size={48} />
                    </div>
                )}

                {!loading && (
                    <div className="space-y-6">
                        {/* Site Name */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-pink-200">
                            <label className="block text-lg font-semibold text-gray-800 mb-3">
                                Site Name
                            </label>
                            <input
                                type="text"
                                value={formData.site_name}
                                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                                placeholder="Enter your site name"
                                required
                            />
                        </div>

                        {/* Sections */}
                        {formData.sections.map((section, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-xl p-8 border-4 border-pink-200">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-[var(--pink)]">Section {index + 1}</h2>
                                    <button
                                        type="button"
                                        onClick={() => setActiveSection(activeSection === index ? null : index)}
                                        className="px-4 py-2 bg-pink-100 text-[var(--pink)] rounded-lg hover:bg-pink-200 transition-colors"
                                    >
                                        {activeSection === index ? 'Collapse' : 'Expand'}
                                    </button>
                                </div>

                                {activeSection === index && (
                                    <div className="space-y-4">
                                        {/* Image Upload */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Section Image
                                            </label>
                                            <div className="flex gap-4 items-start">
                                                <label className="flex-1 cursor-pointer">
                                                    <div className="border-2 border-dashed border-pink-300 rounded-xl p-6 hover:border-pink-500 transition-colors bg-pink-50">
                                                        <div className="flex flex-col items-center">
                                                            {imagePreviews[`image${index + 1}`] ? (
                                                                <img
                                                                    src={imagePreviews[`image${index + 1}`]}
                                                                    alt={`Section ${index + 1}`}
                                                                    className="max-h-48 rounded-lg mb-4"
                                                                />
                                                            ) : (
                                                                <ImageIcon className="text-pink-400 mb-4" size={48} />
                                                            )}
                                                            <span className="text-[var(--pink)] font-medium">
                                                                {imagePreviews[`image${index + 1}`] ? 'Change Image' : 'Upload Image'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleImageChange(e, index)}
                                                        className="hidden"
                                                    />
                                                </label>
                                                {imagePreviews[`image${index + 1}`] && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Eyebrow Text */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Eyebrow Text
                                            </label>
                                            <input
                                                type="text"
                                                value={section.eyebrow}
                                                onChange={(e) => handleSectionChange(index, 'eyebrow', e.target.value)}
                                                className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
                                                placeholder="Small text above title"
                                            />
                                        </div>

                                        {/* Title */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={section.title}
                                                onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                                                className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
                                                placeholder="Section title"
                                            />
                                        </div>

                                        {/* Copy */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                value={section.copy}
                                                onChange={(e) => handleSectionChange(index, 'copy', e.target.value)}
                                                className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
                                                rows="3"
                                                placeholder="Section description"
                                            />
                                        </div>

                                        {/* CTA */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Call to Action
                                            </label>
                                            <input
                                                type="text"
                                                value={section.cta}
                                                onChange={(e) => handleSectionChange(index, 'cta', e.target.value)}
                                                className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none"
                                                placeholder="Button text"
                                            />
                                        </div>

                                        {/* Alignment */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Alignment
                                            </label>
                                            <div className="flex gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => handleSectionChange(index, 'align', 'left')}
                                                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${section.align === 'left'
                                                        ? 'bg-pink-500 text-white'
                                                        : 'bg-pink-100 text-[var(--pink)] hover:bg-pink-200'
                                                        }`}
                                                >
                                                    Left
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleSectionChange(index, 'align', 'right')}
                                                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${section.align === 'right'
                                                        ? 'bg-pink-500 text-white'
                                                        : 'bg-pink-100 text-[var(--pink)] hover:bg-pink-200'
                                                        }`}
                                                >
                                                    Right
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold text-lg hover:from-[var(--pink)] hover:to-rose-600 transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            <Save size={24} />
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                )}

                {/* Preview Modal */}
                {showPreview && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6 px-20">
                        <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="sticky top-0 bg-white border-b-4 border-pink-200 p-6 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-[var(--pink)]">Preview</h2>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="p-2 hover:bg-pink-100 rounded-lg transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-6">
                                <h1 className="text-2xl font-bold text-center mb-8 text-[var(--pink)]">
                                    {formData.site_name || 'Site Name'}
                                </h1>
                                {formData.sections.map((section, index) => (
                                    <div
                                        key={index}
                                        className={`flex gap-8 items-center mb-8 ${section.align === 'right' ? 'flex-row-reverse' : ''
                                            }`}
                                    >
                                        {imagePreviews[`image${index + 1}`] && (
                                            <img
                                                src={imagePreviews[`image${index + 1}`]}
                                                alt={section.title}
                                                className="w-1/2 rounded-xl shadow-lg"
                                            />
                                        )}
                                        <div className="flex-1">
                                            {section.eyebrow && (
                                                <p className="text-pink-500 font-semibold mb-2">{section.eyebrow}</p>
                                            )}
                                            {section.title && (
                                                <h2 className="text-3xl font-bold text-gray-800 mb-4">{section.title}</h2>
                                            )}
                                            {section.copy && (
                                                <p className="text-gray-600 mb-4">{section.copy}</p>
                                            )}
                                            {section.cta && (
                                                <button className="px-6 py-3 bg-pink-500 text-white rounded-lg font-medium hover:bg-[var(--pink)] transition-colors">
                                                    {section.cta}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}