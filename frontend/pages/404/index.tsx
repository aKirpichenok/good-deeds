import { useEffect, useState } from "react";
import styles from "./Error.module.sass";
import { useRouter } from "next/router";

export default function Error() {
  const [timeToRedirect, setTimeToRedirect] = useState(5);
  const router = useRouter();

  useEffect(() => {
    let id = setInterval(() => setTimeToRedirect(timeToRedirect - 1), 1000);
    if (timeToRedirect === 0) {
      router.push("/");
    }
    return () => clearInterval(id);
  });
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Страница не найдена</p>

      <h3>Возврат на главную через {timeToRedirect}</h3>
    </div>
  );
}
