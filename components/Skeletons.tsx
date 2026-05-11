export function PostCardSkeleton() {
  return (
    <div className="border-b border-[#2D2D42] px-5 py-5">
      <div className="flex gap-4">
        <div className="skeleton w-14 h-14 rounded-full flex-shrink-0"></div>
        <div className="flex-1">
          <div className="skeleton h-2.5 w-20 mb-3 rounded"></div>
          <div className="skeleton h-3.5 w-full mb-2 rounded"></div>
          <div className="skeleton h-3.5 w-4/5 mb-2 rounded"></div>
          <div className="skeleton h-3.5 w-2/3 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export function FeedSkeleton() {
  return <>{[1,2,3,4].map(i => <PostCardSkeleton key={i} />)}</>
}

export function PageSkeleton() {
  return (
    <div className="p-6 max-w-2xl">
      <div className="skeleton h-8 w-32 mb-2 rounded"></div>
      <div className="skeleton h-3 w-48 mb-8 rounded"></div>
      {[1,2,3].map(i => (
        <div key={i} className="skeleton h-24 rounded-2xl mb-4"></div>
      ))}
    </div>
  )
}