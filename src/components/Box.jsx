export default function Box(props) {
  return (
    <div className="h-[100px] w-[100px] bg-blue-500 flex justify-center items-center">
      <p>
        {props.name}
        {props.order}
      </p>
    </div>
  );
}
