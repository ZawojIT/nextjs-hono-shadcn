import { AppLayout } from '../../components/app-layout'
import { PostForm } from '../components/post-form'

export default function CreatePostPage() {
  return (
    <>
      <div className="mx-auto max-w-2xl">
        <PostForm />
      </div>
    </>
  )
}
