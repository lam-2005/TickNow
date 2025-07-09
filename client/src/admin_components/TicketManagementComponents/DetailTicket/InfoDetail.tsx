export const ItemInfo = ({
  title,
  content,
  className,
}: {
  title: string;
  content: string;
  className?: string;
}) => {
  return (
    <div className="flex gap-7.5 w-full">
      <div className="flex-1 text-nowrap">{title}</div>
      <strong
        className={`flex-2 block text-foreground text-justify ${className}`}
      >
        {content}
      </strong>
    </div>
  );
};
