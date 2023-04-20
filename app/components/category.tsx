export default function Category(props: any) {
  return (
    <button
      type="submit"
      name="category-slug"
      value={props.slug}
      className="text-gray-900 bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:outline-none focus:ring-gray-400 focus:bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 w-full"
    >
      <svg
        className="w-4 h-4 mr-2 -ml-1 text-[#626890]"
        width="256px"
        height="255px"
        viewBox="0 0 256 255"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
        dangerouslySetInnerHTML={{ __html: props.image }}
      ></svg>
      {props.title}
    </button>
  );
}
