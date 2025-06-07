'use client'

import { Button } from '@/components/elements/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/elements/form'
import { Input } from '@/components/elements/input'
import { Textarea } from '@/components/elements/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Skeleton } from '@/components/elements/skeleton'
import { usersSchemas, useCreateUser } from '@/hooks/users'
import { toast } from '@/hooks/shadcn/use-toast'
import { z } from 'zod'

type UserFormInput = z.infer<typeof usersSchemas.createUser.input>

export function UserForm() {
  const form = useForm<UserFormInput>({
    resolver: zodResolver(usersSchemas.createUser.input),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const mutation = useCreateUser()

  const onSubmit = (data: UserFormInput) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset()
        toast({
          title: 'Success',
          description: 'Form submitted successfully!',
        })
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      },
    })
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {mutation.isPending ? (
            <>
              <Skeleton className="h-[70px] w-full" />
              <Skeleton className="h-[70px] w-full" />
              <Skeleton className="h-[120px] w-full" />
              <Skeleton className="h-10 w-24" />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Sending...' : 'Send'}
              </Button>
            </>
          )}
        </form>
      </Form>

      {mutation.data && (
        <div className="mt-6 rounded-lg border p-4">
          <h3 className="mb-2 font-semibold">Server response:</h3>
          <pre className="rounded bg-gray-100 p-2">
            {JSON.stringify(mutation.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
