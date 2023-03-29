export default function Subcategory(props: any) {
  const post = props.data;
  return (
    <button
      className="text-gray-900 bg-amber-300 hover:bg-amber-400 focus:ring-2 focus:outline-none focus:ring-amber-400 focus:bg-amber-400 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex text-left mr-2 mb-2 w-full"
      onClick={(e) => props.onclick(e, post.markdown, post.title)}
    >
      {post.title}
    </button>
  );
}
