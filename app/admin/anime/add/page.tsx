'use client'

import AdminMenu from '@/components/AdminMenu'
import { useState } from 'react'

export default function AnimeAdd() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        englishTitle: '',
        description: '',
        cover: '',
        status: '',
        type: '',
        score: ''
    });

    const categories = [
        { id: 1, value: "Action" },
        { id: 2, value: "Adventure" },
        { id: 3, value: "Fantasy" },
        { id: 4, value: "Horror" },
        { id: 5, value: "Romance" },
        // เพิ่มหมวดหมู่อื่น ๆ ตามต้องการ
    ];

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedCategories(prev => 
            prev.includes(value) 
            ? prev.filter(category => category !== value) 
            : [...prev, value]
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', { ...formData, selectedCategories });
        // ทำการส่งข้อมูลไปยัง API หรือประมวลผลที่นี่
    };

    return (
        <>
            <AdminMenu pageTitle={'Add Anime'} />
            <hr className='mt-2 mb-6 border border-[#424549]' />

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-400" htmlFor="title">ชื่อเรื่อง</label>
                        <input 
                            type="text" 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="p-2 bg-[#36393e] border-2 border-[#36393e] rounded-md outline-none transition-all focus:border-[#424549]" 
                            required 
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-400" htmlFor="englishTitle">ชื่ออังกฤษ</label>
                        <input 
                            type="text" 
                            name="englishTitle"
                            value={formData.englishTitle}
                            onChange={handleChange}
                            className="p-2 bg-[#36393e] border-2 border-[#36393e] rounded-md outline-none transition-all focus:border-[#424549]" 
                            required 
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-400" htmlFor="description">รายละเอียด</label>
                        <input 
                            type="text" 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="p-2 bg-[#36393e] border-2 border-[#36393e] rounded-md outline-none transition-all focus:border-[#424549]" 
                            required 
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-400" htmlFor="cover">หน้าปก</label>
                        <input 
                            type="text" 
                            name="cover"
                            value={formData.cover}
                            onChange={handleChange}
                            className="p-2 bg-[#36393e] border-2 border-[#36393e] rounded-md outline-none transition-all focus:border-[#424549]" 
                            required 
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-400" htmlFor="status">สถานะ</label>
                        <select 
                            name="status" 
                            value={formData.status} 
                            onChange={handleChange} 
                            className="p-2 bg-[#36393e] border-2 border-[#36393e] rounded-md outline-none transition-all focus:border-[#424549]" 
                            required
                        >
                            <option value="">เลือกสถานะ</option>
                            <option value="Completed">Completed</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Upcoming">Upcoming</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-400" htmlFor="type">ประเภท</label>
                        <select 
                            name="type" 
                            value={formData.type} 
                            onChange={handleChange} 
                            className="p-2 bg-[#36393e] border-2 border-[#36393e] rounded-md outline-none transition-all focus:border-[#424549]" 
                            required
                        >
                            <option value="">เลือกประเภท</option>
                            <option value="tv">TV</option>
                            <option value="ova">OVA</option>
                            <option value="themovie">The Movie</option>
                            {/* เพิ่มประเภทอื่น ๆ ตามต้องการ */}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-gray-400">หมวดหมู่</span>
                        {categories.map(category => (
                            <div key={category.id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    value={category.value}
                                    id={category.value}
                                    checked={selectedCategories.includes(category.value)}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                <label htmlFor={category.value} className="text-gray-300">{category.value}</label>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-400" htmlFor="score">คะแนน</label>
                        <input 
                            type="text" 
                            name="score"
                            value={formData.score}
                            onChange={handleChange}
                            className="p-2 bg-[#36393e] border-2 border-[#36393e] rounded-md outline-none transition-all focus:border-[#424549]" 
                            required 
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label className="text-gray-400 mb-2" htmlFor="animeId">Anime ID</label>
                        <div className="flex items-center">
                            <input 
                                type="text" 
                                id="animeId" // Change name to id for better accessibility
                                value={formData.score} // Make sure to change 'score' to 'animeId' if needed
                                onChange={handleChange}
                                className="p-2 bg-[#36393e] border-2 border-[#36393e] rounded-md outline-none transition-all focus:border-[#424549] flex-grow" 
                                required 
                            />
                            <button 
                                type="submit"
                                className="ml-4 mt-0 p-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                ค้นหา
                            </button>
                        </div>
                    </div>
                </div>

                <button 
                    type="submit"
                    className="mt-4 p-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                    เพิ่มอนิเมะ
                </button>
            </form>
        </>
    )
}