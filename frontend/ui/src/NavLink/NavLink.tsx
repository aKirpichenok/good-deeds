import Link from "next/link";

import styles from "./NavLink.module.sass";

export default function NavLink({
  text,
  href,
  props,
}: {
  text: string;
  href: string;
  props?: any;
}) {
  return (
    <Link href={href} legacyBehavior {...props}>
      <a className={styles.link}> {text} </a>
    </Link>
  );
}
