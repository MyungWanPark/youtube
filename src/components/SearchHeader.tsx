import React, { useEffect, useState } from 'react';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { useNavigate, Link, useParams } from 'react-router-dom';

export default function SearchHeader() {
    const navigate = useNavigate();
    const { keyword } = useParams();
    const [text, setText] = useState<string>('');
    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/videos/${text}`);
    };
    useEffect(() => setText(keyword || ''), [keyword]);

    return (
        <header className="flex w-full p-4 text-2xl border-b border-zinc-600 mb-4">
            <Link to={'/'} className="flex items-center">
                <BsYoutube className="text-4xl text-brand" />
                <h1 className="font-bold ml-2 text-3xl">YouTube</h1>
            </Link>
            <form onSubmit={handleSubmit} className="w-full flex justify-center">
                <input
                    className="w-7/12 p-2 outline-none bg-black text-gray-50"
                    type="text"
                    placeholder="search videos .."
                    value={text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                />
                <button className="bg-zinc-600 px-4">
                    <BsSearch />
                </button>
            </form>
        </header>
    );
}
