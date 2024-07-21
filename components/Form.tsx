import { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'

interface Params {
  type: string
  post: Post
  setPost: Dispatch<SetStateAction<Post>>
  submitting: boolean
  handleSubmit: (e: any) => Promise<void>
}

interface Post {
  prompt: string
  tag: string
}

const Form = ({ type, post, setPost, submitting, handleSubmit }: Params) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world and let your imagination
        flourish with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here"
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Prompt Field
            <span className="font-normal">
              (#product #webdevelopment #idea)
            </span>
          </span>
          <textarea
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_textarea"
          />
        </label>
        <div className="flex-end mx-3 gap-4">
          <Link href="/" className="text-gray-500">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
        <div className="flex-end"></div>
      </form>
    </section>
  )
}

export default Form
