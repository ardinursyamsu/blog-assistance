export default function Main(props: any) {
  return (
    <main className="flex-grow p-12 bg-white">
      <div className="flex flex-row w-full h-full">{props.children}</div>
    </main>
  );
}
