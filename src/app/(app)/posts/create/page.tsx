import { AppLayout } from '../../components/AppLayout'
import { PostForm } from '../components/PostForm'

export default function CreatePostPage() {
  return (
    <>
      <div className="mx-auto max-w-2xl">
        <PostForm />
      </div>
    </>
  )
}
