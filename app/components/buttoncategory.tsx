import { Link } from "@remix-run/react";

export default function ButtonCategory(props: any) {
  return (
    <Link to={`./${props.slug}`}>
      <button
        type="button"
        className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
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
    </Link>
  );
}
