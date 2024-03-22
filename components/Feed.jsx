'use client'
import React, { useEffect, useState } from 'react'
import PromptCardList from './PromptCardList';

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPost] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchPost, setSearchPost] = useState([]);

  const getSearch = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter((post) => {
      return regex.test(post.creator.username) || regex.test(post.tag) || regex.test(post.prompt)
    })
  }
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const result = getSearch(searchText);
        setSearchPost(result);
      }, 500)
    )
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const result = getSearch(tag);
    setSearchPost(result);
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPost(data);
    }
    fetchPost();
  }, []);
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? <PromptCardList
        data={searchPost}
        handleTagClick={handleTagClick}
      /> :
        <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        />}
    </section>
  )
}

export default Feed
