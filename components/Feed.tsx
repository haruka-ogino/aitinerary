'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import PromptCard from './PromptCard'
import Prompt, { IPrompt } from '@models/prompt'

interface Params {
  data: IPrompt[]
  handleTagClick: (tagName: string) => void
}

const PromptCardList = ({ data, handleTagClick }: Params) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id.toString()}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState<IPrompt[]>([])
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState<number | undefined>(
    undefined
  )
  const [searchResults, setSearchResults] = useState<IPrompt[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('api/prompt')
      const data = await res.json()

      setPosts(data)
    }
    fetchPosts()
  }, [])

  function filterPrompts(search: string) {
    const regex = new RegExp(search, 'i')
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeout(
      window.setTimeout(() => {
        const result = filterPrompts(e.target.value)
        setSearchResults(result)
      }, 500)
    )
  }

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName)

    const searchResult = filterPrompts(tagName)
    setSearchResults(searchResult)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      {/* component below will only be used inside this component so it can be created here */}
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  )
}

export default Feed
