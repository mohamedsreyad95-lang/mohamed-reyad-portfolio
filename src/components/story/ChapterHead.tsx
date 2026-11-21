type ChapterHeadProps = {
  n: string;
  name: string;
  centered?: boolean;
};

/** The index marker every chapter opens with: outlined number + name + rule. */
export function ChapterHead({ n, name, centered }: ChapterHeadProps) {
  return (
    <header className={centered ? "chead c7h" : "chead"} data-rv>
      <span className="chn">{n}</span>
      <span className="chl">{name}</span>
    </header>
  );
}
