import { useState } from "react";
import flowerData from "./flowers.json";
import FlowerGuest from "./FlowerGuest";
import FlowerAdmin from "./FlowerAdmin";

export default function FlowerApp() {
    const [view, setView] = useState("guest");
    const [filter, setFilter] = useState({ search: "", type: "", size: "" });

    const handleInput = (e) => setFilter({ ...filter, [e.target.name]: e.target.value });

    const filteredData = flowerData.filter((f) => {
        const matchesSearch = f.name.toLowerCase().includes(filter.search.toLowerCase());
        const matchesType = filter.type ? f.type === filter.type : true;
        const matchesSize = filter.size ? f.details.size === filter.size : true;
        return matchesSearch && matchesType && matchesSize;
    });

    return (
        <div className="min-h-screen bg-[#fff9f9] p-6 md:p-12 font-sans text-slate-700">
            {/* Header */}
            {/* responsive design */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-6"> 
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-serif text-pink-400 italic">Bloom<span className="text-slate-800 font-sans not-italic font-black">Boutique</span></h1>
                    <p className="text-slate-400 text-sm tracking-[0.3em] uppercase mt-2">Premium Flower Arrangement</p>
                </div>
                
                <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-pink-100">
                    <button onClick={() => setView("guest")} className={`px-8 py-2.5 rounded-xl transition-all duration-300 ${view === 'guest' ? 'bg-pink-400 text-white shadow-lg' : 'text-slate-400 hover:bg-pink-50'}`}>Guest View</button>
                    <button onClick={() => setView("admin")} className={`px-8 py-2.5 rounded-xl transition-all duration-300 ${view === 'admin' ? 'bg-pink-400 text-white shadow-lg' : 'text-slate-400 hover:bg-pink-50'}`}>Admin View</button>
                </div>
            </div>

            {/* Filter Tools */}
            {/* responsive design */}
            <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                <input name="search" placeholder="Find your flowers..." onChange={handleInput} className="bg-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-pink-200 border border-transparent shadow-inner" />
                <select name="type" onChange={handleInput} className="bg-white p-4 rounded-2xl outline-none border border-transparent shadow-inner">
                    <option value="">All Arrangement</option>
                    <option value="Hand Bouquet">Hand Bouquet</option>
                    <option value="Table Flower">Table Flower</option>
                </select>
                <select name="size" onChange={handleInput} className="bg-white p-4 rounded-2xl outline-none border border-transparent shadow-inner">
                    <option value="">All Sizes</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto">
                {view === "guest" ? <FlowerGuest data={filteredData} /> : <FlowerAdmin data={filteredData} />}
            </div>
        </div>
    );
}