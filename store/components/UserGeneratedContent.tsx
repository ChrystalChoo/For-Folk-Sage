import React from 'react'

interface UserContent {
  id: number;
  username: string;
  content: string;
  image: string;
}

interface UserGeneratedContentProps {
  content: UserContent[];
}

export default function UserGeneratedContent({ content }: UserGeneratedContentProps) {
  return (
    <section className="bg-[#e6f0e6] py-12 text-[#113108]">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-3xl font-semibold">Folks</h2>
        <p className="mb-8 text-lg">See what our community is saying about For Folk Sage products.</p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.map((post) => (
            <div key={post.id} className="rounded-lg bg-white p-4 text-stone-800 shadow-md">
              <img src={post.image} alt="User content" className="mb-4 w-full rounded-lg" />
              <p className="mb-2">{post.content}</p>
              <p className="text-sm text-[#113108]">{post.username}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}