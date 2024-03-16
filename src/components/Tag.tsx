export function Tag(props: { text: string }) {
  return (
    <div className="w-fit rounded-lg border border-black bg-gray-50 p-1 text-xs">
      {props.text}
    </div>
  );
}
