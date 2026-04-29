import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

interface Props {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-100 text-zinc-300 mb-6">
        <MagnifyingGlass size={36} weight="duotone" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-800 mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-[40ch] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
