'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'
import { IPrompt } from '@models/prompt'

const MyProfile = () => {
  const router = useRouter()

  const [posts, setPosts] = useState<IPrompt[]>([])

  const { data: session } = useSession()

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`api/users/${session?.user?.id}/posts`)
      const data = await res.json()

      setPosts(data)
    }

    if (session?.user?.id) fetchPosts()
  }, [])

  function handleEdit(post: IPrompt) {
    router.push(`/update-prompt?id=${post._id}`)
  }

  async function handleDelete(post: IPrompt) {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        })

        const filteredPosts = posts.filter((p) => p._id !== post._id)

        setPosts(filteredPosts)
      } catch (error) {}
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
