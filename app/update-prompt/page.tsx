'use client'

import { ChangeEvent, useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

function UpdatePrompt() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })

  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const res = await fetch(`/api/prompt/${promptId}`)
        if (res.ok) {
          const data = await res.json()
          setPost({ prompt: data.prompt, tag: data.tag })
        } else {
          throw new Error('Failed to fetch prompt details')
        }
      } catch (error) {
        console.error('Error fetching prompt details:', error)
      }
    }

    if (promptId) getPromptDetails()
  }, [promptId])

  async function updatePrompt(e: ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault()
    setSubmitting(true)

    if (!promptId) return alert('Prompt ID not found')

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

      if (res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  )
}

export default UpdatePrompt
