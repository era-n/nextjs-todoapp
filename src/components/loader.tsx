type Props = {
  w: string;
  h: string;
};

export default function Loader({ w, h }: Props) {
  return (
    <div
      className={`${w} ${h} animate-spin rounded-full border-2 border-solid border-secondary border-l-transparent`}
    ></div>
  );
}
