export default function Category(props: any) {
  function handleClick(e: any) {
    console.log(e.target.value);
  }
  return (
    <div className="mx-2">
      <button
        type="button"
        value={props.slug}
        onClick={props.onclick ? props.onclick : handleClick}
        className="text-blue-700 w-full hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm px-5 py-2 text-left mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      >
        {props.name}
      </button>
    </div>
  );
}
