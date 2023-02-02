import React, { useEffect, useState } from 'react';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { useNavigate, Link, useParams } from 'react-router-dom';
export default function SearchHeader() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [text, setText] = useState<string>('');
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(`videos/${text}`);
  };
  useEffect(() => setText(keyword || ''), [keyword]);
  return (
    <header>
      <Link to={'/'}>
        <BsYoutube />
        <h1>YouTube</h1>
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="seach videos .."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
        <button>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
