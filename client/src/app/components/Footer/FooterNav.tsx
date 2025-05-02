import { childrenFooterLinkType } from "@/app/links";

function FooterNav({
  title,
  link,
}: {
  title: string;
  link: childrenFooterLinkType[];
}) {
  return (
    <section className="flex-column gap-5 flex-1">
      <h3 className="uppercase font-semibold text-xl">{title}</h3>
      <ul className="flex-column gap-2.5">
        {link.map((l: childrenFooterLinkType) => (
          <li key={l.name}>
            <a href={l.url} className="hover:text-primary">
              {l.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FooterNav;
